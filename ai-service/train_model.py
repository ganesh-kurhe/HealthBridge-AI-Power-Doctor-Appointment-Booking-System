import pandas as pd
import pickle
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("symptoms_dataset.csv")

# Input and Output
X = df["symptoms"]
y_department = df["department"]
y_priority = df["priority"]

# Convert text into numerical vectors
vectorizer = TfidfVectorizer(max_features=1000, ngram_range=(1, 2))
X_vectorized = vectorizer.fit_transform(X)

# Split data for validation
X_train, X_test, y_dept_train, y_dept_test, y_pri_train, y_pri_test = train_test_split(
    X_vectorized, y_department, y_priority, test_size=0.2, random_state=42
)

# Train Department Model with Random Forest
department_model = RandomForestClassifier(n_estimators=100, random_state=42)
department_model.fit(X_train, y_dept_train)

# Train Priority Model with Random Forest
priority_model = RandomForestClassifier(n_estimators=100, random_state=42)
priority_model.fit(X_train, y_pri_train)

# Quick validation
dept_pred = department_model.predict(X_test)
pri_pred = priority_model.predict(X_test)
print(f"Department Accuracy: {accuracy_score(y_dept_test, dept_pred):.2f}")
print(f"Priority Accuracy: {accuracy_score(y_pri_test, pri_pred):.2f}")

# Save models
script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, "vectorizer.pkl"), "wb") as f:
    pickle.dump(vectorizer, f)

with open(os.path.join(script_dir, "department_model.pkl"), "wb") as f:
    pickle.dump(department_model, f)

with open(os.path.join(script_dir, "priority_model.pkl"), "wb") as f:
    pickle.dump(priority_model, f)

print("AI model trained successfully with Random Forest!")