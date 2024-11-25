
from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
from cognitive_test import GoNoGoTest
from stroop_test import StroopTest
from memory_test import MemoryTest
from datetime import datetime
import os
import requests
from hugchat import hugchat
from hugchat.login import Login
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.layers import Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications import ResNet50
from PIL import Image
import numpy as np
import io
import pandas as pd
from dotenv import load_dotenv
load_dotenv()


# API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
# KEYWORD = "Alzheimers"

API_KEY = os.getenv("API_KEY")
KEYWORD = os.getenv("KEYWORD")

app = Flask(__name__)
CORS(app)

def resnet50_pretrained():
    image_input = ResNet50(
        include_top=False,
        weights='imagenet',
        input_shape=(224, 224, 3)
    )
    for layer in image_input.layers:
        layer.trainable = False
        if hasattr(layer, '_name'):
            layer._name = layer._name + '_img'

    x = Flatten()(image_input.output)
    x = Dense(1024, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.5)(x)
    output = Dense(3, activation='softmax')(x)

    model = tf.keras.models.Model(inputs=image_input.input, outputs=output)
    return model

# Recreate the model and load weights
model = resnet50_pretrained()
model.load_weights('./models/row.h5', by_name=True, skip_mismatch=True)

# Define class labels
class_labels = ['MCI', 'CN', 'AD']

# Alzheimer’s Prediction Model (PKL)
alz_model = joblib.load('./models/alzheimer_model.pkl')

# Categories for one-hot encoding
APOE_CATEGORIES = ['APOE Genotype_2,2', 'APOE Genotype_2,3', 'APOE Genotype_2,4', 'APOE Genotype_3,3', 'APOE Genotype_3,4', 'APOE Genotype_4,4']
PTHETHCAT_CATEGORIES = ['PTETHCAT_Hisp/Latino', 'PTETHCAT_Not Hisp/Latino', 'PTETHCAT_Unknown']
IMPUTED_CATEGORIES = ['imputed_genotype_True', 'imputed_genotype_False']
PTRACCAT_CATEGORIES = ['PTRACCAT_Asian', 'PTRACCAT_Black', 'PTRACCAT_White']
PTGENDER_CATEGORIES = ['PTGENDER_Female', 'PTGENDER_Male']
APOE4_CATEGORIES = ['APOE4_0', 'APOE4_1', 'APOE4_2']
ABBREVIATION = {
    "AD": "Alzheimer's Disease",
    "LMCI": "Late Mild Cognitive Impairment",
    "CN": "Cognitively Normal"
}
CONDITION_DESCRIPTION = {
    "AD": "This indicates Alzheimer's disease characteristics.",
    "LMCI": "This indicates Late Mild Cognitive Impairment, progressing towards Alzheimer's.",
    "CN": "This indicates normal cognitive functioning."
}

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint for MRI image classification.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    try:
        # Load and preprocess the image
        img = Image.open(file).convert('RGB')
        img = img.resize((224, 224))  # Match input size of the model
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Make predictions
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        confidence = float(np.max(predictions))

        return jsonify({
            "class": class_labels[predicted_class],
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict-alz', methods=['POST'])
def predict_alz():
    try:
        def convert_to_one_hot(selected_category, all_categories, user_input):
            one_hot = [1 if category == selected_category else 0 for category in all_categories]
            user_input.extend(one_hot)

        model = joblib.load('./models/alzheimer_model.pkl')
        print("Model loaded successfully!")

        # Sample input data
        age = 65
        education = 16
        mmse = 27
        gender = "PTGENDER_Male"
        ethnicity = "PTETHCAT_Not Hisp/Latino"
        race_cat = "PTRACCAT_White"
        apoe_allele_type = "APOE4_1"
        apoe_genotype = "APOE Genotype_3,3"
        imputed_genotype = "imputed_genotype_True"

        # Prepare input data
        user_input = [age, education, mmse]
        print("HELLO")
        # Convert categorical variables to one-hot encodings
        convert_to_one_hot(race_cat, PTRACCAT_CATEGORIES, user_input)
        convert_to_one_hot(apoe_genotype, APOE_CATEGORIES, user_input)
        convert_to_one_hot(ethnicity, PTHETHCAT_CATEGORIES, user_input)
        convert_to_one_hot(apoe_allele_type, APOE4_CATEGORIES, user_input)
        convert_to_one_hot(gender, PTGENDER_CATEGORIES, user_input)
        convert_to_one_hot(imputed_genotype, IMPUTED_CATEGORIES, user_input)
        print("THUSAR")
        # Convert input to a DataFrame
        input_df = pd.DataFrame([user_input])
        # Make a prediction
        print("Making a prediction...")
        prediction = model.predict(input_df)[0]
        print("ALOMSR DONE")
        # Define condition mappings
        ABBREVIATION = {
            "AD": "Alzheimer's Disease",
            "LMCI": "Late Mild Cognitive Impairment",
            "CN": "Cognitively Normal"
        }
        CONDITION_DESCRIPTION = {
            "AD": "This indicates characteristics commonly associated with Alzheimer's disease.",
            "LMCI": "This suggests a stage of mild cognitive impairment progressing towards Alzheimer's disease.",
            "CN": "This suggests normal cognitive functioning without impairments."
        }

        # Output the prediction result
        print(f"Prediction: {ABBREVIATION[prediction]}")
        print(f"Description: {CONDITION_DESCRIPTION[prediction]}")
        print("SUCCESSFUL")
        return jsonify({
            "condition": ABBREVIATION[prediction],
            "condition_description": CONDITION_DESCRIPTION[prediction]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400



app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config['UPLOAD_FOLDER'] = os.getenv("UPLOAD_FOLDER")
app.secret_key = os.getenv("SECRET_KEY")

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

test_sessions = {}


HF_GMAIL = os.getenv("HF_GMAIL")
HF_PASS = os.getenv("HF_PASS")
HF_TOKEN = os.getenv("HF_TOKEN")
BASE_PROMPT = os.getenv("BASE_PROMPT")
cookie_path_dir = os.getenv("COOKIE_PATH_DIR")

# Initialize HuggingFace login and chatbot
sign = Login(HF_GMAIL, HF_PASS)
cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
chatbot = hugchat.ChatBot(cookies=cookies.get_dict())

# Function to get news from the API
def _get_news():
    response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
    return response.json().get('articles', [])

@app.route('/news', methods=['GET'])
def news_page():
    articles = _get_news()
    return render_template('news.html', articles=articles)


def generate_response(prompt_input):
    """
    Function to generate LLM response from the provided input.
    """
    prompt_input = BASE_PROMPT + prompt_input
    message_result = chatbot.chat(prompt_input)
    response = message_result.wait_until_done()  # blocking call
    return str(response).strip('`')

@app.route("/chat", methods=["GET", "POST"])
def chat_bot():
    """
    Main chat bot function to interact with the user and generate responses.
    """
    if "messages" not in session:
        session["messages"] = [{"role": "assistant", "content": "Hi! How may I help you?"}]

    if request.method == "POST":
        prompt = request.form["user_input"]
        session["messages"].append({"role": "user", "content": prompt})

        if session["messages"][-1]["role"] != "assistant":
            response = generate_response(prompt)
            session["messages"].append({"role": "assistant", "content": response})

            return jsonify({"response": response, "messages": session["messages"]})

    return render_template("chat.html", messages=session["messages"])

@app.route('/start-test', methods=['POST'])
def start_test():
    session_id = request.json.get("session_id")
    test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop", "Memory"
    language_code = request.json.get("language_code", "en")  # Default to English

    if test_type == "GoNoGo":
        test_sessions[session_id] = GoNoGoTest()
    elif test_type == "Stroop":
        test_sessions[session_id] = StroopTest(language_code)
    elif test_type == "Memory":
        test_sessions[session_id] = MemoryTest(language_code)
    else:
        return jsonify({"error": "Invalid test type"}), 400

    test_sessions[session_id].start_trial()
    return jsonify({"signal": test_sessions[session_id].current_signal})

@app.route('/submit-response', methods=['POST'])
def submit_response():
    session_id = request.json.get("session_id")
    response = request.json.get("response")

    if session_id not in test_sessions:
        return jsonify({"error": "Invalid session"}), 400

    test = test_sessions[session_id]
    test.evaluate_response(response)

    if test.current_trial >= test.total_trials:
        results = test.get_results()
        del test_sessions[session_id]
        return jsonify({"results": results})

    return jsonify({"signal": test.current_signal})

if __name__ == '__main__':
    app.run(debug=True, host = '127.0.0.1', port= 5000)
