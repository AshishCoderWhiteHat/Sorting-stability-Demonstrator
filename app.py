from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

# ---------- Sorting Algorithms ----------

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i][1] <= right[j][1]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def selection_sort(arr):
    arr = arr.copy()
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j][1] < arr[min_idx][1]:
                min_idx = j
        
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr


# ---------- Time Function ----------
def measure_time(func, arr):
    start = time.time()
    result = func(arr)
    end = time.time()
    return result, round((end - start)*1000, 5)


# ---------- Routes ----------
@app.route('/')
def home():
    return render_template("index.html")


@app.route('/sort', methods=['POST'])
def sort():
    data = request.json['input']
    
    arr = []
    for item in data.split(','):
        key, val = item.split(':')
        arr.append((key.strip(), int(val)))
    
    merge_result, merge_time = measure_time(merge_sort, arr)
    selection_result, selection_time = measure_time(selection_sort, arr)
    
    return jsonify({
        "merge": merge_result,
        "merge_time": merge_time,
        "selection": selection_result,
        "selection_time": selection_time
    })


if __name__ == "__main__":
    app.run(debug=True)