import pandas as pd
import os
# This file reads all daily files and combines them into one hourly summary.


def process_all_daily_files(input_dir="daily_parts", output_file="hourly_summary.csv"):
    all_dfs = []

    for file_name in os.listdir(input_dir):
        if file_name.endswith(".csv"):
            df = pd.read_csv(os.path.join(input_dir, file_name))
            if 'timestamp' not in df.columns or 'value' not in df.columns:
                continue
            df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
            df['value'] = pd.to_numeric(df['value'], errors='coerce')
            df = df.dropna(subset=['timestamp', 'value'])

            df['hour'] = df['timestamp'].dt.floor('h')
            hourly_avg = df.groupby('hour')['value'].mean().reset_index()
            hourly_avg.columns = ['timestamp', 'AverageValue']

            all_dfs.append(hourly_avg)

    if all_dfs:
        final_df = pd.concat(all_dfs).sort_values('timestamp')
        final_df.to_csv(output_file, index=False)
        print(f"Hourly summary saved as: {output_file}")
    else:
        print("No valid files found to process.")
