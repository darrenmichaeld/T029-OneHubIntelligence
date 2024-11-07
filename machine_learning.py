import pandas as pd
import json
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from datetime import datetime

# Load JSON data
with open("db-tester.json", "r") as f:
    data = json.load(f)

# Extract flights data from the JSON
if 'flights' in data:
    df = pd.json_normalize(data['flights'])
else:
    raise ValueError("JSON does not contain 'flights' key.")

# Handle columns dynamically, checking if they exist
required_columns = ['actual_departure', 'estimated_departure', 'actual_arrival', 'estimated_arrival',
                    'aircraft_type', 'aircraft_capacity', 'status', 'price_per_kg', 
                    'departure_origin', 'arrival_place', 'flight_number']

missing_columns = [col for col in required_columns if col not in df.columns]
if missing_columns:
    print(f"Warning: Missing columns in dataset: {missing_columns}")
    # Create empty columns for missing ones to avoid errors
    for col in missing_columns:
        df[col] = None

# Ensure datetime conversion
for time_col in ['actual_departure', 'estimated_departure', 'actual_arrival', 'estimated_arrival']:
    if time_col in df.columns:
        df[time_col] = pd.to_datetime(df[time_col], errors='coerce')

# Calculate schedule changes if columns are present
if 'actual_departure' in df.columns and 'estimated_departure' in df.columns:
    df['departure_delay'] = (df['actual_departure'] - df['estimated_departure']).dt.total_seconds() / 60

if 'actual_arrival' in df.columns and 'estimated_arrival' in df.columns:
    df['arrival_delay'] = (df['actual_arrival'] - df['estimated_arrival']).dt.total_seconds() / 60

# Visualization: Distribution of Delays
if 'departure_delay' in df.columns and 'arrival_delay' in df.columns:
    plt.figure(figsize=(14, 6))
    sns.histplot(df['departure_delay'].dropna(), bins=30, kde=True, color="blue", label='Departure Delay (minutes)')
    sns.histplot(df['arrival_delay'].dropna(), bins=30, kde=True, color="orange", label='Arrival Delay (minutes)')
    plt.xlabel("Delay (minutes)")
    plt.ylabel("Frequency")
    plt.title("Distribution of Departure and Arrival Delays")
    plt.legend()
    plt.show()

# 1. Aircraft Type Change Detection
df['aircraft_type_change'] = df['aircraft_type'].ne(df['aircraft_type'].shift()).astype(int)
features = ['departure_delay', 'arrival_delay', 'aircraft_capacity', 'price_per_kg']
features = [f for f in features if f in df.columns]
df = df.dropna(subset=features + ['aircraft_type_change'])

X = df[features]
y = df['aircraft_type_change']
model_aircraft = RandomForestClassifier(random_state=0)
model_aircraft.fit(X, y)
y_pred_aircraft = model_aircraft.predict(X)
print("Classification Report for Aircraft Type Changes:")
print(classification_report(y, y_pred_aircraft))

# Visualization: Aircraft Type Changes over Time
if 'estimated_departure' in df.columns:
    plt.figure(figsize=(12, 6))
    sns.scatterplot(data=df, x='estimated_departure', y='aircraft_capacity', hue='aircraft_type_change', palette='coolwarm')
    plt.xlabel("Estimated Departure Date")
    plt.ylabel("Aircraft Capacity")
    plt.title("Aircraft Type Changes Over Time")
    plt.legend(title='Aircraft Type Change')
    plt.show()

# 2. Route Frequency Analysis
if 'flight_number' in df.columns and 'departure_origin' in df.columns and 'arrival_place' in df.columns:
    df['date'] = df['estimated_departure'].dt.date
    key_routes = df[['date', 'departure_origin', 'arrival_place', 'flight_number']]
    frequency_by_route = key_routes.groupby(['date', 'departure_origin', 'arrival_place'])['flight_number'].count().unstack()
    print("Route Frequency Table:")
    print(frequency_by_route.head())

    # Visualization: Heatmap of Route Frequencies
    plt.figure(figsize=(12, 8))
    sns.heatmap(frequency_by_route.fillna(0), cmap="YlGnBu", annot=True, fmt=".0f", cbar=True)
    plt.title("Frequency of Flights by Route and Date")
    plt.xlabel("Arrival Place")
    plt.ylabel("Departure Date")
    plt.show()

# 3. Dynamic Pricing Model
if 'price_per_kg' in df.columns:
    features_pricing = ['departure_delay', 'arrival_delay', 'aircraft_capacity', 'status']
    features_pricing = [f for f in features_pricing if f in df.columns]
    df['status'] = df['status'].astype('category').cat.codes  # Encode status if it's categorical
    
    df_pricing = df.dropna(subset=features_pricing + ['price_per_kg'])
    X_pricing = df_pricing[features_pricing]
    y_pricing = df_pricing['price_per_kg']
    
    pricing_model = LinearRegression()
    pricing_model.fit(X_pricing, y_pricing)
    print("Pricing Model Coefficients:", pricing_model.coef_)

    y_pred_pricing = pricing_model.predict(X_pricing)
    df_pricing['predicted_price_per_kg'] = y_pred_pricing
    print("Sample Predictions for Dynamic Pricing:")
    print(df_pricing[['price_per_kg', 'predicted_price_per_kg']].head())

    # Visualization: Actual vs. Predicted Prices
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x=df_pricing['price_per_kg'], y=df_pricing['predicted_price_per_kg'])
    plt.plot([df_pricing['price_per_kg'].min(), df_pricing['price_per_kg'].max()],
             [df_pricing['price_per_kg'].min(), df_pricing['price_per_kg'].max()],
             color="red", linestyle="--", label="Perfect Prediction")
    plt.xlabel("Actual Price per Kg")
    plt.ylabel("Predicted Price per Kg")
    plt.title("Actual vs. Predicted Price per Kg")
    plt.legend()
    plt.show()
