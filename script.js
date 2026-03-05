async function shortenUrl() {

    const longUrl = document.getElementById("longUrl").value;
    const resultBox = document.getElementById("result");
    const list = document.getElementById("shortLinksList");

    if (!longUrl) {
        alert("Please paste a URL first!");
        return;
    }

    list.innerHTML = "<li>Generating links...</li>";
    resultBox.style.display = "block";

    try {

        list.innerHTML = "";

        const numberOfLinks = 3;   // number of shortened URLs

        for (let i = 0; i < numberOfLinks; i++) {

            const response = await fetch(
                `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
            );

            if (response.ok) {

                const shortUrl = await response.text();

                const li = document.createElement("li");

                const a = document.createElement("a");

                a.href = shortUrl;
                a.innerText = shortUrl;
                a.target = "_blank";

                li.appendChild(a);
                list.appendChild(li);

            }

        }

    } catch (error) {

        console.error("Error:", error);
        alert("Connection failed. Check your internet.");

        resultBox.style.display = "none";

    }

}
