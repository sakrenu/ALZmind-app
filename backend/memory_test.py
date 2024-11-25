# # memory_test.py
# import random
# from googletrans import Translator

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

# class MemoryTest:
#     def __init__(self, language_code='en'):
#         self.language_code = language_code
#         self.translator = Translator()
#         self.sequence = []
#         self.sequence_length = 3  # Starting length
#         self.total_trials = 5
#         self.current_trial = 0
#         self.correct_responses = 0

#     def translate_text(self, text):
#         return self.translator.translate(text, dest=self.language_code).text

#     def start_trial(self):
#         if self.current_trial < self.total_trials:
#             self.sequence = [random.randint(0, 9) for _ in range(self.sequence_length)]
#             self.current_signal = {
#                 "sequence": " ".join(map(str, self.sequence)),
#                 "instruction": self.translate_text("Enter the sequence")
#             }
#         else:
#             self.current_signal = self.get_results()

#     def evaluate_response(self, user_response):
#         response = list(map(int, user_response.split()))
#         if response == self.sequence:
#             self.correct_responses += 1
#             self.current_trial += 1
#             if self.current_trial < self.total_trials:
#                 self.sequence_length += 1  # Increase sequence length
#                 self.start_trial()
#             else:
#                 self.current_signal = self.get_results()
#         else:
#             self.start_trial()

#     def get_results(self):
#         accuracy = (self.correct_responses / self.total_trials) * 100
#         return {
#             "accuracy": accuracy,
#             "total_trials": self.total_trials,
#             "correct_responses": self.correct_responses
#         }
# memory_test.py
# import random
# from googletrans import Translator

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

# class MemoryTest:
#     def __init__(self, language_code='en'):
#         self.language_code = language_code
#         self.translator = Translator()
#         self.sequence = []
#         self.sequence_length = 3  # Starting length
#         self.total_trials = 5
#         self.current_trial = 0
#         self.correct_responses = 0

#     def translate_text(self, text):
#         return self.translator.translate(text, dest=self.language_code).text

#     def start_trial(self):
#         if self.current_trial < self.total_trials:
#             self.sequence = [random.randint(0, 9) for _ in range(self.sequence_length)]
#             self.current_signal = {
#                 "sequence": " ".join(map(str, self.sequence)),
#                 "instruction": self.translate_text("Enter the sequence")
#             }
#         else:
#             self.current_signal = self.get_results()

#     def evaluate_response(self, user_response):
#         response = list(map(int, user_response.split()))
#         if response == self.sequence:
#             self.correct_responses += 1
#         self.current_trial += 1
#         if self.current_trial < self.total_trials:
#             self.sequence_length += 1  # Increase sequence length
#             self.start_trial()
#         else:
#             self.current_signal = self.get_results()

#     def get_results(self):
#         accuracy = (self.correct_responses / self.total_trials) * 100
#         return {
#             "accuracy": accuracy,
#             "total_trials": self.total_trials,
#             "correct_responses": self.correct_responses
#         }


# memory_test.py
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

class MemoryTest:
    def __init__(self, language_code='en'):
        self.language_code = language_code
        self.translator = Translator()
        self.sequence = []
        self.sequence_length = 3  # Starting length
        self.total_trials = 5
        self.current_trial = 0
        self.correct_responses = 0

    def translate_text(self, text):
        return self.translator.translate(text, dest=self.language_code).text

    def start_trial(self):
        if self.current_trial < self.total_trials:
            self.sequence = [random.randint(0, 9) for _ in range(self.sequence_length)]
            self.current_signal = {
                "sequence": " ".join(map(str, self.sequence)),
                "instruction": self.translate_text("Enter the sequence")
            }
        else:
            self.current_signal = self.get_results()

    def evaluate_response(self, user_response):
        response = list(map(int, user_response.split()))
        if response == self.sequence:
            self.correct_responses += 1
        self.current_trial += 1
        if self.current_trial < self.total_trials:
            self.sequence_length += 1  # Increase sequence length
            self.start_trial()
        else:
            self.current_signal = self.get_results()

    def get_results(self):
        accuracy = (self.correct_responses / self.total_trials) * 100
        return {
            "accuracy": accuracy,
            "total_trials": self.total_trials,
            "correct_responses": self.correct_responses
        }
