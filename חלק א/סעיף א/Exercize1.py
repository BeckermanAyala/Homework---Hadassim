import os
from collections import Counter
import heapq

# Function to split the file into smaller files
piece_size  = 100_000
def split_file(file_path):
    new_files = []
    with open(file_path, 'r') as file:
        file_number=0
        while True:
            lines=[file.readline() for _ in range(piece_size)]
            lines = [line for line in lines if line]
            if not lines:
                break
            file_name = f'file{file_number}.txt'
            with open (file_name, 'w') as new_file:
                new_file.writelines(lines)
            new_files.append(file_name)
            file_number +=1

        return new_files
    



# Function that counts the number of errors in each file
def count_errors_in_file(file_name):
    with open(file_name ,'r') as file:
        return Counter(
            line.strip().split("Error: ")[1].strip()
            for line in file
            if "Error: " in line
        )
# Function that sums up all the error counts from all the files
def count_errors_in_all_files(list_of_counter):
    final_sum = Counter()
    for c in list_of_counter:
        final_sum.update(c)
    return final_sum

# Function that finds the most frequent errors
def max_n_errors(counter, n):
    return counter.most_common(n)

# Running all the functions
def main(file_path, n):
    chunk_files = split_file(file_path)
    list_of_counter = [count_errors_in_file(chunk) for chunk in chunk_files]
    total_counter = count_errors_in_all_files(list_of_counter)
    return max_n_errors(total_counter, n)

            
if __name__ == "__main__":
    result = main("logs.txt", 5) 
    print(result)
