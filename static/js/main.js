// GitHub Star Count Fetcher
fetch('https://api.github.com/repos/boxxy-dev/boxxy')
    .then(response => response.json())
    .then(data => {
        const stars = data.stargazers_count;
        const starElement = document.getElementById('github-stars');
        if (starElement) {
            starElement.textContent = stars;
        }
    })
    .catch(err => {
        console.error('Failed to fetch stars:', err);
        const starElement = document.getElementById('github-stars');
        if (starElement) {
            starElement.textContent = '52'; // Fallback to current
        }
    });

// Copy to Clipboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle the main installation copy buttons
    const setupCopyButton = (btnId, commandId, copyIconId, checkIconId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function() {
                const codeText = document.getElementById(commandId).innerText;
                const copyIcon = document.getElementById(copyIconId);
                const checkIcon = document.getElementById(checkIconId);

                navigator.clipboard.writeText(codeText).then(() => {
                    copyIcon.style.display = 'none';
                    checkIcon.style.display = 'block';
                    btn.style.backgroundColor = '#a6e3a1'; // Catppuccin Green
                    
                    setTimeout(() => {
                        copyIcon.style.display = 'block';
                        checkIcon.style.display = 'none';
                        btn.style.backgroundColor = '#313244';
                    }, 2000);
                });
            });
        }
    };

    setupCopyButton('copy-button', 'install-command', 'copy-icon', 'check-icon');
    setupCopyButton('flatpak-copy-button', 'flatpak-install-command', 'flatpak-copy-icon', 'flatpak-check-icon');

    // 2. Add dynamic copy buttons to all <pre> blocks in content areas
    const contentPres = document.querySelectorAll('.content-area pre');
    contentPres.forEach(pre => {
        // Create the button element
        const btn = document.createElement('button');
        btn.className = 'pre-copy-btn';
        btn.title = 'Copy to clipboard';
        
        // Add the SVG icons (copy and check)
        btn.innerHTML = `
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#11111b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;

        // Add the copy logic
        btn.addEventListener('click', () => {
            // Find the code block inside the pre and get its text
            const codeText = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
            const copyIcon = btn.querySelector('.copy-icon');
            const checkIcon = btn.querySelector('.check-icon');

            navigator.clipboard.writeText(codeText).then(() => {
                copyIcon.style.display = 'none';
                checkIcon.style.display = 'block';
                btn.style.backgroundColor = '#a6e3a1'; // Catppuccin Green
                
                setTimeout(() => {
                    copyIcon.style.display = 'block';
                    checkIcon.style.display = 'none';
                    btn.style.backgroundColor = '#313244';
                }, 2000);
            });
        });

        pre.appendChild(btn);
    });

    // 3. Easter Eggs
    const createSpeechBubble = (parent, text, top = '-50px') => {
        if (parent.querySelector('.speech-bubble')) return;
        const bubble = document.createElement('div');
        bubble.className = 'speech-bubble';
        bubble.style.top = top;
        bubble.textContent = text;
        parent.appendChild(bubble);
        setTimeout(() => {
            bubble.style.transition = 'opacity 0.5s';
            bubble.style.opacity = '0';
            setTimeout(() => bubble.remove(), 500);
        }, 3000);
    };

    const boxyBadge = document.querySelector('.boxxy-badge');
    if (boxyBadge) {
        boxyBadge.style.cursor = 'pointer';
        boxyBadge.addEventListener('click', () => {
            createSpeechBubble(boxyBadge, 'I use Arch btw');
        });
    }

    const charHotspot = document.getElementById('character-hotspot');
    if (charHotspot) {
        const phrases = [
            "Local models > Cloud models",
            "I'm just here for the prompt engineering",
            "Boxxy is my favorite terminal!",
            "Have you tried BoxxyClaw yet?",
            "Memory is everything.",
            "Stay productive!"
        ];
        charHotspot.addEventListener('click', () => {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            createSpeechBubble(charHotspot.parentElement, randomPhrase, '10%');
        });
    }

    // 4. Add special styling to quoted text and =highlights= in content areas
    const contentAreas = document.querySelectorAll('.content-area p, .content-area li');
    contentAreas.forEach(area => {
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const val = node.nodeValue;
                const quoteRegex = /"([^"]+)"|“([^”]+)”/g;
                // Highlight regex: look for =text= but ensure it's not inside an HTML tag.
                // We do this by ensuring there is a space or start-of-line before it, 
                // and a space, punctuation, or end-of-line after it to avoid matching HTML attributes.
                const highlightRegex = /(^|[\s(])=([^ \n=](?:[^=]*?[^ \n=])?)=($|[\s.,!?;:)])/g;

                if (quoteRegex.test(val) || /(^|[\s(])=([^ \n=](?:[^=]*?[^ \n=])?)=($|[\s.,!?;:)])/.test(val)) {
                    const span = document.createElement('span');
                    quoteRegex.lastIndex = 0;
                    
                    let html = val
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');

                    // First handle "quotes" (keep quotes)
                    html = html.replace(quoteRegex, (match, p1, p2) => 
                        `<span class="quoted-text">"${p1 || p2}"</span>`
                    );

                    // Then handle =highlights= (remove =), using the safer regex with boundaries
                    html = html.replace(highlightRegex, (match, before, p1, after) => 
                        `${before}<span class="highlight-text">${p1}</span>${after}`
                    );

                    span.innerHTML = html;
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Don't re-process things we've already styled
                if (!['CODE', 'PRE', 'A'].includes(node.tagName) && !node.classList.contains('quoted-text') && !node.classList.contains('highlight-text')) {
                    Array.from(node.childNodes).forEach(processNode);
                }
            }
        };
        Array.from(area.childNodes).forEach(processNode);
    });
});
