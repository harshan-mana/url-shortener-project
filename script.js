async function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const resultBox = document.getElementById('result');
    const shortLinkAnchor = document.getElementById('shortLink');

    if (!longUrl) {
        alert("Please paste a URL first!");
        return;
    }

    shortLinkAnchor.innerText = "Shortening...";
    resultBox.style.display = 'block';

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        
        if (response.ok) {
            const data = await response.text();
            shortLinkAnchor.href = data;
            shortLinkAnchor.innerText = data;
        } else {
            alert("API Error. Please check your link and try again.");
            resultBox.style.display = 'none';
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Connection failed. Check your internet.");
        resultBox.style.display = 'none';
    }
}
