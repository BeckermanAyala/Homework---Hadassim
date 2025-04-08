import pandas as pd
# This file contains a helper function to load either CSV or Parquet files.


def load_data(file_path):
    if file_path.endswith(".csv"):
        return pd.read_csv(file_path, encoding="utf-8-sig")
    elif file_path.endswith(".parquet"):
        return pd.read_parquet(file_path)
    else:
        raise ValueError("Unsupported file format. Please use CSV or PARQUET.")
