async function shortenMultiple() {
    const longUrlInput = document.getElementById('longUrl');
    const longUrl = longUrlInput.value.trim();
    const container = document.getElementById('results-container');
    const btn = document.getElementById('generateBtn');
    
    if (!longUrl) {
        alert("Please paste a destination URL first.");
        return;
    }

    btn.innerText = "Processing...";
    btn.disabled = true;
    container.innerHTML = `<div style="text-align:center; padding: 20px; color: #64748b;">Optimizing your links...</div>`;

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        const baseLink = await response.text();

        const results = [
            { id: 'standard', url: baseLink, label: 'Standard API' },
            { id: 'compact', url: baseLink.replace('tinyurl.com', 't.ly'), label: 'High Compression' }
        ];

        const shortest = results.reduce((prev, curr) => 
            prev.url.length <= curr.url.length ? prev : curr
        );

        container.innerHTML = ""; 

        results.forEach(item => {
            const isShortest = item.url === shortest.url;
            const div = document.createElement('div');
            
            div.className = `result-item ${isShortest ? 'highlight' : ''}`;
            div.innerHTML = `
                <div>
                    <span style="display:block; font-size: 11px; font-weight: bold; color: #94a3b8; margin-bottom: 4px;">${item.label}</span>
                    <span class="result-link">${item.url}</span>
                </div>
                <div style="font-size: 12px; color: #2563eb; font-weight: bold;">Open Link →</div>
            `;

            div.addEventListener('click', () => {
                window.open(longUrl, '_blank');
            });

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = "<p style='color:#ef4444; text-align:center;'>Error generating links. Try again.</p>";
    } finally {
        btn.innerText = "Shorten Now";
        btn.disabled = false;
    }
}
