let managedLinks = {};

function generateConfiguredLinks() {
    const longUrlInput = document.getElementById('longUrl');
    let longUrl = longUrlInput.value.trim();
    const container = document.getElementById('results-container');
    const btn = document.getElementById('generateBtn');
    const quantity = parseInt(document.getElementById('linkCount').value) || 1;
    const duration = parseInt(document.getElementById('linkExpiry').value);
    
    if (!longUrl) {
        alert("Please paste a destination URL first.");
        return;
    }

    if (!/^https?:\/\//i.test(longUrl)) {
        longUrl = 'https://' + longUrl;
    }

    btn.innerText = "Processing...";
    btn.disabled = true;
    container.innerHTML = ""; 

    const domains = ['nx.lnk', 't.ly', 'ln.kr', 'zip.id', 'short.io'];
    const epochNow = Date.now();
    const expirationTimestamp = epochNow + duration;

    for (let i = 0; i < quantity; i++) {
        const randomSlug = Math.random().toString(36).substring(2, 7);
        const selectedDomain = domains[i % domains.length];
        const displayShortUrl = `https://${selectedDomain}/${randomSlug}`;
        
        managedLinks[randomSlug] = {
            originalDestination: longUrl,
            expiresAt: expirationTimestamp,
            shortDisplay: displayShortUrl
        };

        const isShortest = i === 1 || quantity === 1; 
        
        const cardElement = document.createElement('div');
        cardElement.className = `result-item ${isShortest ? 'highlight' : ''}`;
        
        cardElement.innerHTML = `
            <div>
                <span style="display:block; font-size: 11px; font-weight: bold; color: #94a3b8; margin-bottom: 4px;">
                    VARIANT #${i + 1} (${selectedDomain})
                </span>
                <span class="result-link">${displayShortUrl}</span>
                <div class="countdown-timer" id="timer-${randomSlug}">Calculating timer...</div>
            </div>
            <div class="action-block">
                <div class="qr-holder" id="qr-${randomSlug}"></div>
                <div class="action-btn">Inspect & Open →</div>
            </div>
        `;

        container.appendChild(cardElement);

        new QRCode(document.getElementById(`qr-${randomSlug}`), {
            text: displayShortUrl,
            width: 64,
            height: 64,
            correctLevel: QRCode.CorrectLevel.M
        });

        cardElement.addEventListener('click', () => {
            executeProfessionalPreview(randomSlug);
        });

        startClockTracking(randomSlug, expirationTimestamp);
    }

    btn.innerText = "Shorten Now";
    btn.disabled = false;
}

function startClockTracking(slug, targetTime) {
    const timerElement = document.getElementById(`timer-${slug}`);
    
    const interval = setInterval(() => {
        const timeLeft = targetTime - Date.now();
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            if (timerElement) {
                timerElement.innerText = "Expired / Disabled Link";
                timerElement.style.color = "#ef4444";
                timerElement.parentElement.parentElement.classList.add('expired-card');
            }
        } else {
            const secondsTotal = Math.ceil(timeLeft / 1000);
            if (secondsTotal > 60) {
                timerElement.innerText = `Expires in: ${Math.round(secondsTotal / 60)}m`;
            } else {
                timerElement.innerText = `Expires in: ${secondsTotal}s`;
            }
        }
    }, 1000);
}

function executeProfessionalPreview(slug) {
    const record = managedLinks[slug];
    if (!record) return;

    const activeNow = Date.now();
    const runtimeExpired = activeNow > record.expiresAt;

    const previewTab = window.open("", "_blank");
    
    let pageTemplate = "";

    if (runtimeExpired) {
        pageTemplate = `
            <html>
            <head>
                <title>Link Expired | NexLink</title>
                <style>
                    body { background: #0f172a; color: white; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin:0; }
                    .wrapper { text-align: center; max-width: 450px; padding: 30px; background: #1e293b; border-radius: 12px; border: 1px solid #ef4444; }
                    h1 { color: #ef4444; margin-top: 0; }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <h1>⏱️ Access Window Closed</h1>
                    <p>The temporary URL shortener path <strong>${record.shortDisplay}</strong> has surpassed its scheduled runtime availability metric configuration limits.</p>
                </div>
            </body>
            </html>
        `;
    } else {
        pageTemplate = `
            <html>
            <head>
                <title>Secure Destination Routing Analytics Gateway</title>
                <style>
                    body { background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin:0; }
                    .container { background: #1e293b; padding: 40px; border-radius: 16px; max-width: 550px; width:100%; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5); }
                    .url-badge { background: #334155; padding: 12px 16px; border-radius: 8px; font-family: monospace; word-break: break-all; color: #3b82f6; font-size: 14px; margin: 15px 0; display: block;}
                    .btn-action { display: inline-block; width: 100%; text-align:center; background: #10b981; color: white; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px; transition: 0.2s; }
                    .btn-action:hover { background: #059669; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 style="margin-top:0;">🛡️ Secure Gateway Verification</h2>
                    <p>You requested access using virtual proxy target identity string node mapping: <span style="color:#a855f7; font-weight:bold;">${record.shortDisplay}</span></p>
                    <p>Original underlying resolution mapping destination trace addresses to:</p>
                    <span class="url-badge">${record.originalDestination}</span>
                    <a href="${record.originalDestination}" class="btn-action">Continue Forward to Target Location →</a>
                    <p style="font-size:11px; color:#64748b; margin-top:20px; text-align:center;">This staging redirection view point prevents blind fishing tracking vectors from exploiting browser identity loops instantly.</p>
                </div>
            </body>
            </html>
        `;
    }

    previewTab.document.write(pageTemplate);
    previewTab.document.close();
}
