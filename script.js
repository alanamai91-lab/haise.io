/* ============================================ */
/*            HAISE - INDIE GAME WEBSITE        */
/*            script.js                         */
/* ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    //          MOBILE NAV TOGGLE
    // ========================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });

        // Close nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        });
    }

    // ========================================
    //          FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function () {
            // Close other open items
            faqItems.forEach(function (other) {
                if (other !== item && other.classList.contains('open')) {
                    other.classList.remove('open');
                    other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            item.classList.toggle('open');
            const isOpen = item.classList.contains('open');
            question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // ========================================
    //       SCREENSHOT LIGHTBOX
    // ========================================
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentScreenshot = 0;
    const screenshotSources = [];

    // Collect screenshot sources
    screenshotItems.forEach(function (item, index) {
        const img = item.querySelector('img');
        if (img) {
            screenshotSources.push(img.src);
        }

        item.addEventListener('click', function () {
            currentScreenshot = index;
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        if (screenshotSources[index]) {
            lightboxImg.src = screenshotSources[index];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function (e) {
            e.stopPropagation();
            currentScreenshot = (currentScreenshot - 1 + screenshotSources.length) % screenshotSources.length;
            lightboxImg.src = screenshotSources[currentScreenshot];
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function (e) {
            e.stopPropagation();
            currentScreenshot = (currentScreenshot + 1) % screenshotSources.length;
            lightboxImg.src = screenshotSources[currentScreenshot];
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentScreenshot = (currentScreenshot - 1 + screenshotSources.length) % screenshotSources.length;
            lightboxImg.src = screenshotSources[currentScreenshot];
        } else if (e.key === 'ArrowRight') {
            currentScreenshot = (currentScreenshot + 1) % screenshotSources.length;
            lightboxImg.src = screenshotSources[currentScreenshot];
        }
    });

    // ========================================
    //    BETA ACCESS GATE (Play Now)
    // ========================================
    const downloadBtn = document.getElementById('download-btn');
    const navDownloadBtn = document.getElementById('nav-download-btn');
    const betaPopup = document.getElementById('beta-popup');
    const betaCodeInput = document.getElementById('beta-code-input');
    const betaSubmitBtn = document.getElementById('beta-submit-btn');
    const betaPopupClose = document.getElementById('beta-popup-close');
    const betaCodeError = document.getElementById('beta-code-error');

    // DOWNLOAD LINK: Replace with your actual Windows download link.
    // Example: 'https://your-host.com/HAISE-beta-v0.3.2.zip'
    const BETA_DOWNLOAD_URL = '#';

    const BETA_CODE = 'betatester22';

    function openBetaPopup() {
        if (!betaPopup) return;
        betaPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (betaCodeError) {
            betaCodeError.hidden = true;
        }
        if (betaCodeInput) {
            betaCodeInput.value = '';
            setTimeout(function () {
                betaCodeInput.focus();
            }, 0);
        }
    }

    function closeBetaPopup() {
        if (!betaPopup) return;
        betaPopup.classList.remove('active');
        document.body.style.overflow = '';
    }

    function startBetaDownload() {
        const link = document.createElement('a');
        link.href = BETA_DOWNLOAD_URL;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeBetaPopup();
    }

    function submitBetaCode() {
        if (!betaCodeInput) return;

        if (betaCodeInput.value.trim() === BETA_CODE) {
            startBetaDownload();
            return;
        }

        if (betaCodeError) {
            betaCodeError.hidden = false;
        }
        betaCodeInput.focus();
        betaCodeInput.select();
    }

    [downloadBtn, navDownloadBtn].forEach(function (btn) {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openBetaPopup();
            });
        }
    });

    if (betaSubmitBtn) {
        betaSubmitBtn.addEventListener('click', submitBetaCode);
    }

    if (betaCodeInput) {
        betaCodeInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitBetaCode();
            }
        });

        betaCodeInput.addEventListener('input', function () {
            if (betaCodeError && !betaCodeError.hidden) {
                betaCodeError.hidden = true;
            }
        });
    }

    if (betaPopupClose) {
        betaPopupClose.addEventListener('click', closeBetaPopup);
    }

    if (betaPopup) {
        betaPopup.addEventListener('click', function (e) {
            if (e.target === betaPopup) {
                closeBetaPopup();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && betaPopup && betaPopup.classList.contains('active')) {
            closeBetaPopup();
        }
    });

    // ========================================
    //    FEEDBACK POPUP (Fake Login)
    // ========================================
    const btnFeedback = document.getElementById('btn-leave-feedback');
    const feedbackPopup = document.getElementById('feedback-popup');
    const popupCloseFeedback = document.getElementById('popup-close-feedback');

    if (btnFeedback && feedbackPopup) {
        btnFeedback.addEventListener('click', function () {
            feedbackPopup.classList.add('active');
        });
    }

    if (popupCloseFeedback && feedbackPopup) {
        popupCloseFeedback.addEventListener('click', function () {
            feedbackPopup.classList.remove('active');
        });

        feedbackPopup.addEventListener('click', function (e) {
            if (e.target === feedbackPopup) {
                feedbackPopup.classList.remove('active');
            }
        });
    }

    // ========================================
    //          EASTER EGG
    //    Click HAISE logo/title 5 times
    // ========================================
    let easterEggClicks = 0;
    const easterEggTargets = [
        document.getElementById('hero-title'),
        document.getElementById('hero-logo'),
        document.getElementById('nav-logo-link')
    ];
    const easterEggPopup = document.getElementById('easter-egg-popup');
    const popupCloseEaster = document.getElementById('popup-close-easter');

    easterEggTargets.forEach(function (target) {
        if (target) {
            target.addEventListener('click', function (e) {
                e.preventDefault();
                easterEggClicks++;

                if (easterEggClicks >= 5) {
                    easterEggClicks = 0;
                    if (easterEggPopup) {
                        easterEggPopup.classList.add('active');
                    }
                }
            });
        }
    });

    if (popupCloseEaster && easterEggPopup) {
        popupCloseEaster.addEventListener('click', function () {
            easterEggPopup.classList.remove('active');
        });

        easterEggPopup.addEventListener('click', function (e) {
            if (e.target === easterEggPopup) {
                easterEggPopup.classList.remove('active');
            }
        });
    }

    // ========================================
    //    GAMEPLAY VIDEO — HOVER TO PLAY
    // ========================================
    const gameplayVideo = document.querySelector('.gameplay-gif');
    const gifFrame = document.querySelector('.gif-frame');

    if (gameplayVideo && gifFrame) {
        gameplayVideo.controls = false;
        gameplayVideo.muted = true;

        gifFrame.addEventListener('mouseenter', function () {
            gameplayVideo.play().catch(function () {});
        });

        gifFrame.addEventListener('mouseleave', function () {
            gameplayVideo.pause();
            gameplayVideo.currentTime = 0;
        });
    }

    // ========================================
    //    GAMEPLAY GIF VISIBILITY
    //    Show the GIF if src is provided
    // ========================================
    const gameplayGif = document.getElementById('gameplay-gif');
    const gifPlaceholder = document.getElementById('gif-placeholder');

    if (gameplayGif && gameplayGif.src && gameplayGif.src !== window.location.href) {
        // If a real src is set (not empty), show the GIF and hide the placeholder
        gameplayGif.style.display = 'block';
        if (gifPlaceholder) {
            gifPlaceholder.style.display = 'none';
        }
    }

    // ========================================
    //    NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(23, 27, 23, 0.95)';
        } else {
            navbar.style.background = 'rgba(23, 27, 23, 0.88)';
        }
    });

    // ========================================
    //    SMOOTH SCROLL FOR NAV LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

});
