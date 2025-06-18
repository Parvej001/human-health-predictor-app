import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv("../dataset/Training.csv")  # Updated path

# Print to debug
print("Columns:", df.columns)

# Extract all symptoms (excluding the target column)
symptoms = df.columns[df.columns != "prognosis"].tolist()

# Save to .npy file
np.save("symptoms.npy", symptoms)

print(f"✅ Saved {len(symptoms)} symptoms to symptoms.npy")
