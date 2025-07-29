from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # <-- Add this


# Load the trained model
model = joblib.load('backend/food_demand_model.pkl')

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return 'Welcome to the Food Demand Predictor API!'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Extract features from request
        day_of_week = data['DayOfWeek']
        prev_day_sales = data['PreviousDaySales']
        three_day_avg = data['ThreeDayAverage']

        # Make prediction
        features = np.array([[day_of_week, prev_day_sales, three_day_avg]])
        prediction = model.predict(features)[0]

        return jsonify({
            'predicted_quantity': round(prediction, 2)
        })

    except KeyError as e:
        return jsonify({'error': f'Missing field: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
