import pandas as pd
from functions.load_data import load_data
# This function calculates hourly averages from a full time series dataset
def analyze_time_series(file_path):
    df = load_data(file_path)

    if 'timestamp' not in df.columns or 'value' not in df.columns:
        raise ValueError("Missing required columns in file.")

    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
    df['value'] = pd.to_numeric(df['value'], errors='coerce')

    df = df.dropna(subset=['timestamp', 'value'])
    df = df.drop_duplicates()

    df['hour'] = df['timestamp'].dt.floor('h')
    hourly = df.groupby('hour')['value'].mean().reset_index()
    hourly.columns = ['timestamp', 'AverageValue']

    return hourly
