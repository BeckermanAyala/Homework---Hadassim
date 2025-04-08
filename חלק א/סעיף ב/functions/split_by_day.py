import pandas as pd
import os
from functions.load_data import load_data
# This function splits the dataset into separate CSV files by day.


def split_by_day(file_path, output_dir="daily_parts"):
    df = load_data(file_path)
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df = df.dropna(subset=['timestamp', 'value'])

    os.makedirs(output_dir, exist_ok=True)
    df['date'] = df['timestamp'].dt.date

    for date, group in df.groupby('date'):
        group.to_csv(f"{output_dir}/data_{date}.csv", index=False)
        print(f"Saved file for {date} → {output_dir}/data_{date}.csv")
