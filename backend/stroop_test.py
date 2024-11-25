# # stroop_test.py
# import random
# from googletrans import Translator
# import time

# # Supported Indian language codes
# supported_languages = {
#     'en': 'English',
#     'hi': 'Hindi',
#     'bn': 'Bengali',
#     'te': 'Telugu',
#     'mr': 'Marathi',
#     'ta': 'Tamil',
#     'gu': 'Gujarati',
#     'kn': 'Kannada',
#     'ml': 'Malayalam',
#     'pa': 'Punjabi'
# }

# class StroopTest:
#     def __init__(self, language_code='en'):
#         self.language_code = language_code
#         self.translator = Translator()
#         self.color_words = ["Red", "Blue", "Green", "Yellow"]
#         self.display_colors = ["red", "blue", "green", "yellow"]
#         self.correct_responses = 0
#         self.total_trials = 10
#         self.current_trial = 0
#         self.current_word = ""
#         self.current_color = ""
#         self.start_time = 0

#     def translate_text(self, text):
#         return self.translator.translate(text, dest=self.language_code).text

#     def start_trial(self):
#         if self.current_trial < self.total_trials:
#             self.current_word = random.choice(self.color_words)
#             self.current_color = random.choice(self.display_colors)
#             self.current_signal = {
#                 "word": self.translate_text(self.current_word),
#                 "color": self.current_color
#             }
#             self.start_time = time.time()
#         else:
#             self.current_signal = self.get_results()

#     def evaluate_response(self, user_response):
#         if user_response == self.current_color:
#             self.correct_responses += 1
#         self.current_trial += 1
#         self.start_trial()

#     def get_results(self):
#         accuracy = (self.correct_responses / self.total_trials) * 100
#         return {
#             "accuracy": accuracy,
#             "total_trials": self.total_trials,
#             "correct_responses": self.correct_responses
#         }
# stroop_test.py
import random
from googletrans import Translator

# Supported Indian language codes
supported_languages = {
    'en': 'English',
    'hi': 'Hindi',
    'bn': 'Bengali',
    'te': 'Telugu',
    'mr': 'Marathi',
    'ta': 'Tamil',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'pa': 'Punjabi'
}

class StroopTest:
    def __init__(self, language_code='en'):
        self.language_code = language_code
        self.translator = Translator()
        self.color_words = ["Red", "Blue", "Green", "Yellow"]
        self.display_colors = ["red", "blue", "green", "yellow"]
        self.correct_responses = 0
        self.total_trials = 10
        self.current_trial = 0
        self.current_word = ""
        self.current_color = ""

    def translate_text(self, text):
        return self.translator.translate(text, dest=self.language_code).text

    def start_trial(self):
        if self.current_trial < self.total_trials:
            self.current_word = random.choice(self.color_words)
            self.current_color = random.choice(self.display_colors)
            self.current_signal = {
                "word": self.translate_text(self.current_word),
                "color": self.current_color
            }
        else:
            self.current_signal = self.get_results()

    def evaluate_response(self, user_response):
        if user_response == self.current_color:
            self.correct_responses += 1
        self.current_trial += 1
        self.start_trial()

    def get_results(self):
        accuracy = (self.correct_responses / self.total_trials) * 100
        return {
            "accuracy": accuracy,
            "total_trials": self.total_trials,
            "correct_responses": self.correct_responses
        }
