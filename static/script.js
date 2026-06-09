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
        <h2>Results</h2>

        <div class="result-box stable">
            <h3>Merge Sort (Stable)</h3>
            <p>${formatOutput(data.merge)}</p>
            <b>Order Preserved ✅</b><br>
            Time: ${data.merge_time} ms
        </div>

        <div class="result-box unstable">
            <h3>Selection Sort (Unstable)</h3>
            <p>${formatOutput(data.selection)}</p>
            <b>Order May Change ❌</b><br>
            Time: ${data.selection_time} ms
        </div>

        <p style="margin-top:20px;">
        <b>Explanation:</b> Stable sorting preserves the order of elements with equal values, 
        while unstable sorting may change their relative order.
        </p>

        <p><i>Note: For small inputs, time difference is minimal. For large datasets, Merge Sort performs better.</i></p>
    `;
}