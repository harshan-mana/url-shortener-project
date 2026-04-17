async function shortenMultiple() {
    const longUrl = document.getElementById('longUrl').value;
    const container = document.getElementById('results-container');
    const btn = document.getElementById('generateBtn');
    
    if (!longUrl) {
        alert("Please enter a valid URL.");
        return;
    }

    // UI Feedback
    btn.innerText = "Generating...";
    btn.disabled = true;
    container.innerHTML = `<div class="loading">Fetching secure links...</div>`;

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        const baseLink = await response.text();

        // Simulated results for different providers/lengths
        const results = [
            { provider: 'TinyURL', url: baseLink },
            { provider: 'Bitly-Sim', url: baseLink + "?s=1" },
            { provider: 'Rebrandly-Sim', url: baseLink.replace('tinyurl.com', 't.ly') }
        ];

        // Find shortest
        const shortestUrl = results.reduce((prev, curr) => 
            prev.url.length <= curr.url.length ? prev : curr
        ).url;

        container.innerHTML = ""; 

        results.forEach(item => {
            const isShortest = item.url === shortestUrl;
            const div = document.createElement('div');
            div.className = `result-item ${isShortest ? 'highlight' : ''}`;
            
            div.innerHTML = `
                <div>
                    <small style="display:block; color:#64748b">${item.provider}</small>
                    <span class="result-link">${item.url}</span>
                </div>
                <span class="copy-hint">Click to copy</span>
            `;

            // Add click-to-copy functionality
            div.onclick = () => {
                navigator.clipboard.writeText(item.url);
                const hint = div.querySelector('.copy-hint');
                hint.innerText = "Copied!";
                setTimeout(() => hint.innerText = "Click to copy", 2000);
            };

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = "<p style='color:red'>Failed to connect to API providers.</p>";
    } finally {
        btn.innerText = "Generate Links";
        btn.disabled = false;
    }
}
