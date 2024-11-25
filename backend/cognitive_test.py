# import random
# import time
# import statistics

# class GoNoGoTest:
#     def __init__(self):
#         self.go_no_go_signals = ["Go", "No-Go"]
#         self.response_times = []
#         self.correct_responses = 0
#         self.true_positives = 0
#         self.false_positives = 0
#         self.total_trials = 10
#         self.current_trial = 0
#         self.current_signal = None
#         self.start_time = None

#     def start_trial(self):
#         self.current_trial += 1
#         self.current_signal = random.choice(self.go_no_go_signals)
#         self.start_time = time.time()

#     def evaluate_response(self, is_go_response):
#         response_time = time.time() - self.start_time
#         self.response_times.append(response_time)

#         if self.current_signal == "Go":
#             if is_go_response:
#                 self.correct_responses += 1
#                 self.true_positives += 1
#         elif self.current_signal == "No-Go":
#             if is_go_response:
#                 self.false_positives += 1
#             else:
#                 self.correct_responses += 1

#         if self.current_trial < self.total_trials:
#             self.start_trial()

#     def get_results(self):
#         accuracy = (self.correct_responses / self.total_trials) * 100
#         precision = (self.true_positives / (self.true_positives + self.false_positives)) * 100 if self.true_positives + self.false_positives > 0 else 0
#         avg_response_time = sum(self.response_times) / len(self.response_times) if self.response_times else 0
#         response_time_variability = statistics.stdev(self.response_times) if len(self.response_times) > 1 else 0

#         return {
#             "accuracy": accuracy,
#             "precision": precision,
#             "avg_response_time": avg_response_time,
#             "response_time_variability": response_time_variability
#         }
# from flask import Flask, request, jsonify
import random
import time
import statistics

# app = Flask(__name__)

class GoNoGoTest:
    def __init__(self):
        self.go_no_go_signals = ["Go", "No-Go"]
        self.response_times = []
        self.correct_responses = 0
        self.true_positives = 0
        self.false_positives = 0
        self.total_trials = 10
        self.current_trial = 0
        self.current_signal = None
        self.start_time = None

    def start_trial(self):
        self.current_trial += 1
        self.current_signal = random.choice(self.go_no_go_signals)
        self.start_time = time.time()

    def evaluate_response(self, is_go_response):
        response_time = time.time() - self.start_time
        self.response_times.append(response_time)

        if self.current_signal == "Go":
            if is_go_response:
                self.correct_responses += 1
                self.true_positives += 1
        elif self.current_signal == "No-Go":
            if is_go_response:
                self.false_positives += 1
            else:
                self.correct_responses += 1

        if self.current_trial < self.total_trials:
            self.start_trial()

    def get_results(self):
        accuracy = (self.correct_responses / self.total_trials) * 100
        precision = (self.true_positives / (self.true_positives + self.false_positives)) * 100 if self.true_positives + self.false_positives > 0 else 0
        avg_response_time = sum(self.response_times) / len(self.response_times) if self.response_times else 0
        response_time_variability = statistics.stdev(self.response_times) if len(self.response_times) > 1 else 0

        return {
            "accuracy": accuracy,
            "precision": precision,
            "avg_response_time": avg_response_time,
            "response_time_variability": response_time_variability
        }

# Global test instance
# test_instance = GoNoGoTest()

# @app.route('/start', methods=['POST'])
# def start():
#     test_instance.start_trial()
#     return jsonify({
#         "current_trial": test_instance.current_trial,
#         "current_signal": test_instance.current_signal
#     })

# @app.route('/respond', methods=['POST'])
# def respond():
#     data = request.json
#     is_go_response = data.get("isGoResponse", False)
#     test_instance.evaluate_response(is_go_response)
#     if test_instance.current_trial <= test_instance.total_trials:
#         return jsonify({
#             "current_trial": test_instance.current_trial,
#             "current_signal": test_instance.current_signal
#         })
#     else:
#         results = test_instance.get_results()
#         return jsonify({"results": results, "test_complete": True})

# @app.route('/results', methods=['GET'])
# def results():
#     return jsonify(test_instance.get_results())

# if __name__ == '__main__':
#     app.run(debug=True)
