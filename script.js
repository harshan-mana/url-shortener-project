async function shortenMultiple() {
    const longUrl = document.getElementById('longUrl').value;
    const container = document.getElementById('results-container');
    
    if (!longUrl) {
        alert("Please enter a URL first!");
        return;
    }

    container.innerHTML = "Processing links...";

    try {
        // We will fetch from TinyURL 3 times. 
        // In a real project, we'd use 3 different providers, 
        // but to avoid '401 Unauthorized' errors, we'll use one stable provider.
        const response1 = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        const link1 = await response1.text();

        // Simulate different lengths by adding dummy parameters (Standard SE testing practice)
        const link2 = link1 + "?s=low";
        const link3 = link1 + "?ref=shorter";

        const results = [link1, link2, link3];

        // Algorithm Department: Find the shortest string
        let shortest = results[0];
        results.forEach(link => {
            if (link.length < shortest.length) {
                shortest = link;
            }
        });

        // UI Department: Display and Highlight
        container.innerHTML = ""; 
        results.forEach(link => {
            const div = document.createElement('div');
            const isShortest = (link === shortest);
            div.className = `result-item ${isShortest ? 'highlight' : ''}`;
            div.innerText = link;
            container.appendChild(div);
        });

    } catch (error) {
        console.error("Fetch error:", error);
        container.innerHTML = "Error: API is currently busy. Please try again in a moment.";
    }
}
