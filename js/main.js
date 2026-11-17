// GitHub Star Count Fetcher
fetch('https://api.github.com/repos/boxxy-dev/boxxy')
    .then(response => response.json())
    .then(data => {
        const stars = data.stargazers_count;
        const starElement = document.getElementById('github-stars');
        if (starElement && typeof stars === 'number') {
            starElement.textContent = stars.toLocaleString();
        }
    })
    .catch(() => {
        const starElement = document.getElementById('github-stars');
        if (starElement) {
            starElement.textContent = '★';
        }
    });

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Header & Mobile Docs Sidebar Toggles
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const siteMenu = document.getElementById('site-menu');
    if (mobileMenuBtn && siteMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = siteMenu.classList.toggle('is-open');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const docsMobileToggle = document.getElementById('docs-mobile-toggle');
    const docsSide = document.getElementById('docs-side');
    if (docsMobileToggle && docsSide) {
        docsMobileToggle.addEventListener('click', () => {
            const isOpen = docsSide.classList.toggle('is-open');
            docsMobileToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // 2. Installation Method Switcher (Native / Flatpak / NixOS)
    const installTabs = document.querySelectorAll('[data-install-tab]');
    const installMeta = document.getElementById('install-meta-note');
    const installPanes = {
        native: document.getElementById('install-pane-native'),
        flatpak: document.getElementById('install-pane-flatpak'),
        nixos: document.getElementById('install-pane-nixos'),
    };
    const installMetaLabels = {
        native: 'Native Nightlies · Requires GTK 4.24+',
        flatpak: 'Flatpak Nightlies · User repository',
        nixos: 'Nix Flake · Direct from GitHub (not in nixpkgs yet)',
    };

    if (installTabs.length > 0) {
        installTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const selected = tab.getAttribute('data-install-tab');
                installTabs.forEach(t => {
                    const isActive = t === tab;
                    t.classList.toggle('is-active', isActive);
                    t.setAttribute('aria-selected', String(isActive));
                });
                Object.entries(installPanes).forEach(([key, pane]) => {
                    if (pane) pane.style.display = key === selected ? 'block' : 'none';
                });
                if (installMeta && installMetaLabels[selected]) {
                    installMeta.textContent = installMetaLabels[selected];
                }
            });
        });
    }

    // 3. Copy to Clipboard Functionality
    const flashCopy = (btn, copyIcon, checkIcon) => {
        if (!copyIcon || !checkIcon) return;
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        btn.style.backgroundColor = '#7ec868';

        setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
            btn.style.backgroundColor = '';
        }, 1800);
    };

    const setupCopyButton = (btnId, commandId, copyIconId, checkIconId) => {
        const btn = document.getElementById(btnId);
        const cmdEl = document.getElementById(commandId);
        if (btn && cmdEl) {
            btn.addEventListener('click', () => {
                const codeText = cmdEl.innerText.trim();
                const copyIcon = document.getElementById(copyIconId);
                const checkIcon = document.getElementById(checkIconId);
                navigator.clipboard.writeText(codeText).then(() => {
                    flashCopy(btn, copyIcon, checkIcon);
                });
            });
        }
    };

    setupCopyButton('copy-button', 'install-command', 'copy-icon', 'check-icon');
    setupCopyButton('flatpak-copy-button', 'flatpak-install-command', 'flatpak-copy-icon', 'flatpak-check-icon');
    setupCopyButton('nixos-copy-button', 'nixos-install-command', 'nixos-copy-icon', 'nixos-check-icon');

    // Dynamic copy buttons on all <pre> blocks in documentation articles
    const contentPres = document.querySelectorAll('.content-area pre');
    contentPres.forEach(pre => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pre-copy-btn';
        btn.title = 'Copy to clipboard';
        btn.innerHTML = `
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d140a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;

        btn.addEventListener('click', () => {
            const codeEl = pre.querySelector('code');
            const codeText = (codeEl ? codeEl.innerText : pre.innerText).trim();
            const copyIcon = btn.querySelector('.copy-icon');
            const checkIcon = btn.querySelector('.check-icon');
            navigator.clipboard.writeText(codeText).then(() => {
                flashCopy(btn, copyIcon, checkIcon);
            });
        });

        pre.appendChild(btn);
    });

    // 4. Right-hand "On This Page" TOC Scroll-Spy
    const tocLinks = Array.from(document.querySelectorAll('[data-toc-link]'));
    if (tocLinks.length > 0) {
        const headingTargets = tocLinks
            .map(link => document.getElementById(link.getAttribute('data-toc-link')))
            .filter(Boolean);

        const updateActiveToc = () => {
            const offset = 115;
            let activeId = headingTargets[0]?.id;
            for (const heading of headingTargets) {
                if (heading.getBoundingClientRect().top <= offset) {
                    activeId = heading.id;
                } else {
                    break;
                }
            }
            if (activeId) {
                tocLinks.forEach(link => {
                    link.classList.toggle('is-active', link.getAttribute('data-toc-link') === activeId);
                });
            }
        };

        window.addEventListener('scroll', updateActiveToc, { passive: true });
        updateActiveToc();
    }

    // 5. Easter Eggs
    const createSpeechBubble = (parent, text, top = '-48px') => {
        if (parent.querySelector('.speech-bubble')) return;
        const bubble = document.createElement('div');
        bubble.className = 'speech-bubble';
        bubble.style.top = top;
        bubble.textContent = text;
        parent.appendChild(bubble);
        setTimeout(() => {
            bubble.style.transition = 'opacity 0.4s ease';
            bubble.style.opacity = '0';
            setTimeout(() => bubble.remove(), 400);
        }, 2800);
    };

    const boxyBadge = document.querySelector('.boxxy-badge');
    if (boxyBadge) {
        boxyBadge.addEventListener('click', () => {
            createSpeechBubble(boxyBadge, 'I use Arch btw', '-44px');
        });
    }

    const charHotspot = document.getElementById('character-hotspot');
    if (charHotspot && charHotspot.parentElement) {
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

    // 6. Clean `=highlight=` inline marker parser (strips `=` without noisy quote coloring)
    const contentNodes = document.querySelectorAll('.content-area p, .content-area li');
    contentNodes.forEach(area => {
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const val = node.nodeValue;
                const highlightRegex = /(^|[\s(])=([^ \n=](?:[^=]*?[^ \n=])?)=($|[\s.,!?;:)])/g;
                if (highlightRegex.test(val)) {
                    highlightRegex.lastIndex = 0;
                    const span = document.createElement('span');
                    const escaped = val
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    span.innerHTML = escaped.replace(
                        highlightRegex,
                        (_, before, p1, after) => `${before}<span class="highlight-text">${p1}</span>${after}`
                    );
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (!['CODE', 'PRE', 'A', 'SCRIPT', 'STYLE'].includes(node.tagName) && !node.classList.contains('highlight-text')) {
                    Array.from(node.childNodes).forEach(processNode);
                }
            }
        };
        Array.from(area.childNodes).forEach(processNode);
    });
});
