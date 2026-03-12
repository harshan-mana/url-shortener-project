async function shortenMultiple() {
    const longUrl = document.getElementById('longUrl').value;
    const container = document.getElementById('results-container');
    if (!longUrl) return;

    const apis = [
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`,
        `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`,
        `https://v.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`
    ];

    const results = await Promise.all(apis.map(api => fetch(api).then(res => res.text())));

    
    let shortest = results[0];
    results.forEach(link => {
        if (link.length < shortest.length) {
            shortest = link;
        }
    });

    container.innerHTML = "";
    results.forEach(link => {
        const div = document.createElement('div')
        div.className = `result-item ${link === shortest ? 'highlight' : ''}`;
        div.innerText = link;
        container.appendChild(div);
    });
}
