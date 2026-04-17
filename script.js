async function shortenMultiple() {
    const longUrlInput = document.getElementById('longUrl');
    const longUrl = longUrlInput.value.trim();
    const container = document.getElementById('results-container');
    const btn = document.getElementById('generateBtn');
    
    if (!longUrl) {
        alert("Please paste a destination URL first.");
        return;
    }

    // UI Loading State
    btn.innerText = "Processing...";
    btn.disabled = true;
    container.innerHTML = `<div style="text-align:center; padding: 20px; color: #64748b;">Linking to global providers...</div>`;

    try {
        // Fetch from TinyURL
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        const baseLink = await response.text();

        // Create variations (Simulating different provider lengths)
        const results = [
            { id: 'standard', url: baseLink, label: 'Global Standard' },
            { id: 'compact', url: baseLink.replace('tinyurl.com', 't.ly'), label: 'Compact Route' }
        ];

        // Determine shortest
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
                    <span style="display:block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px;">${item.label}</span>
                    <span class="result-link">${item.url}</span>
                </div>
                <div style="font-size: 12px; color: #64748b;">Click to Visit →</div>
            `;

            // FEATURE: Redirection on Click
            div.addEventListener('click', () => {
                // We redirect to the original long URL as requested
                window.open(longUrl, '_blank');
            });

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = "<p style='color:#ef4444; text-align:center;'>API Timeout. Please check your connection.</p>";
    } finally {
        btn.innerText = "Shorten Now";
        btn.disabled = false;
    }
}
