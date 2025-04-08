import sys
sys.path.append(".")

from functions.analyze_csv import analyze_time_series
from functions.split_by_day import split_by_day
from functions.merge_hourly import process_all_daily_files
from datetime import datetime

def main():
    print("Step 1: Analyzing the full time series file...")
    summary = analyze_time_series("data/time_series.csv")
    print(summary.head())

    print("\nStep 2: Splitting into daily chunks...")
    split_by_day("data/time_series.csv")

    print("\nStep 3: Processing daily files and generating hourly summary...")
    process_all_daily_files()

if __name__ == "__main__":
    main()
