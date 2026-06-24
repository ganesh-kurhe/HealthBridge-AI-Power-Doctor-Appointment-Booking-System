import requests
import json

# Test the API with various symptoms
test_symptoms = [
    'chest pain',
    'skin rash',
    'headache',
    'stomach pain',
    'joint pain',
    'fever',
    'tooth pain',
    'ear pain'
]

print('Testing AI Symptom Checker with balanced dataset:')
print('=' * 50)

for symptom in test_symptoms:
    try:
        response = requests.post('http://localhost:5000/predict',
                               json={'symptoms': symptom},
                               timeout=5)
        if response.status_code == 200:
            result = response.json()
            print(f'Symptom: {symptom}')
            print(f'  Department: {result.get("department", "N/A")}')
            print(f'  Priority: {result.get("priority", "N/A")}')
            print(f'  Confidence: {result.get("confidence", "N/A"):.2f}')
            print()
        else:
            print(f'Error for {symptom}: {response.status_code}')
    except Exception as e:
        print(f'Failed to test {symptom}: {e}')