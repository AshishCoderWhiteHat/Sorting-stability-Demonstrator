function formatOutput(arr) {
    return arr.map(item => `${item[0]}:${item[1]}`).join(", ");
}

async function runSort() {
    const input = document.getElementById("inputData").value;

    const res = await fetch("/sort", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({input})
    });

    const data = await res.json();

    document.getElementById("output").innerHTML = `
    <h2 class="results-title">Results</h2>

    <div class="results-grid">

        <div class="card stable-card">
            <h3>Merge Sort (Stable)</h3>

            <div class="output-data">
                ${formatOutput(data.merge)}
            </div>

            <span class="badge success">
                Order Preserved ✅
            </span>

            <div class="time">
                Time: ${data.merge_time} ms
            </div>
        </div>

        <div class="card unstable-card">
            <h3>Selection Sort (Unstable)</h3>

            <div class="output-data">
                ${formatOutput(data.selection)}
            </div>

            <span class="badge danger">
                Order May Change ❌
            </span>

            <div class="time">
                Time: ${data.selection_time} ms
            </div>
        </div>

    </div>

    <div class="explanation">
        <strong>Explanation:</strong><br>
        Stable sorting preserves the order of elements with equal values,
        while unstable sorting may change their relative order.

        <br><br>

        <strong>Complexities:</strong><br>
        Merge Sort → O(n log n)<br>
        Selection Sort → O(n²)
    </div>
`;
}