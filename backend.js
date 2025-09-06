

const year = new Date().getFullYear()


document.addEventListener('DOMContentLoaded', () => {
            const loadingScreen = document.getElementById('loading-screen');
            const countdownNumber = document.getElementById('countdown-number');
            const mainContent = document.getElementById('main-content');
            const skipButton = document.getElementById('skip-button');
            const bottomNav = document.querySelector('.bottom-nav');
            const creditstext = document.getElementById('credits-text')

            // New elements for the phone functionality
            const phoneButton = document.getElementById('phone-button');
            const phonePopup = document.getElementById('phone-popup');
            
            let count = 3;
            let countdownInterval = null;

            const revealContent = () => {
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                }
                
                loadingScreen.classList.add('hidden-loading');

                setTimeout(() => {
                    loadingScreen.style.zIndex = -1;
                    mainContent.classList.add('visible');
                    initializePageEffects();
                }, 300);
            };
            var audio = new Audio('2x-clock-tick-102235.mp3')
            
            countdownInterval = setInterval(() => {
                if (count > 0) {
                    countdownNumber.textContent = count;
                    count--;
                    audio.play();
                } else if (count === 0) {
                    countdownNumber.textContent = 'ACTION';
                    count--;
                    audio.play();
                } else {
                    revealContent();
                }
            }, 1000);


            // Artistic Section Background & Parallax
            const artisticSection = document.getElementById("artistic-section");
            const moreText = document.getElementById("more-than-a");

            window.addEventListener("scroll", () => {
                const rect = artisticSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    const scrollProgress = 1 - rect.top / windowHeight;

                    // scale from 1x to max 6x
                    const scale = Math.min(1 + scrollProgress * 5, 6); // Big big
                    moreText.style.transform = `scale(${scale})`;

                    // Optional: add some vertical offset for smooth effect
                    moreText.style.marginTop = `${scrollProgress * 40}vh`;
                } else {
                    moreText.style.transform = `scale(1)`;
                    moreText.style.marginTop = `0`;
                }
                

                if (rect.top < windowHeight / 2 ) {
                        // Section is in the viewport → make background beige
                    document.body.style.backgroundColor = "#001433";
                } else {
                        // Section is above/below → revert to default background
                    document.body.style.backgroundColor = "#1a1a1a";
                }

            });

            window


            skipButton.addEventListener('click', revealContent);

            function initializePageEffects() {
                const mainName = document.getElementById('main-name');
                const heroText = document.getElementById('hero-text');
                const introSection = document.getElementById('intro');
                const contentSections = document.querySelectorAll('.content-section');
                const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
                const sections = document.querySelectorAll('section, footer');
                const parallaxItems = document.querySelectorAll('.parallax-item');
                const firstlink = bottomNavLinks[0]

                firstlink.classList.add('active')
                
                const introSectionTop = introSection.offsetTop;
                const introSectionHeight = introSection.offsetHeight;
                
                function handleScroll() {
                    const scrollY = window.scrollY;
                    const heroContainer = document.getElementById('hero-container');

                    mainName.style.transform = `scale(${1 - scrollY * 0.002}) translateY(${scrollY * 0.3}px)`;
                    mainName.style.opacity = 1 - scrollY * 0.005;

                    parallaxItems.forEach((item, index) => {
                        const speed = (index % 2 === 0) ? -0.2 : 0.2;
                        item.style.transform = `translateX(${scrollY * speed}px)`;
                    });

                    if (scrollY > introSectionTop) {
                        heroText.style.transform = `translateY(${(scrollY - introSectionTop) * 0.5}px)`;
                    } else {
                        heroText.style.transform = `translateY(0px)`;
                    }

                    contentSections.forEach(section => {
                        const sectionTop = section.getBoundingClientRect().top;
                        const windowHeight = window.innerHeight;

                        const isVisible = sectionTop < windowHeight && sectionTop > -section.offsetHeight;

                        if (isVisible) {
                            section.classList.add('visible');
                        } else {
                            section.classList.remove('visible');
                        }
                    });

                    sections.forEach((section, index) => {
                        const rect = section.getBoundingClientRect();
                        const link = bottomNavLinks[index];
                        
                        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                            bottomNavLinks.forEach(link => link.classList.remove('active'));
                            link.classList.add('active');
                        } else if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
                            bottomNavLinks.forEach(link => link.classList.remove('active'));
                            bottomNavLinks[bottomNavLinks.length - 1].classList.add('active');
                        }
                    });

                    if (scrollY > heroContainer.offsetHeight) {
                        bottomNav.classList.add('show-nav');
                    } else {
                        bottomNav.classList.remove('show-nav');
                    }
                }
                creditstext.innerHTML = year+' krk2183 All rights reserved.'


                

                window.addEventListener('scroll', handleScroll);
                window.addEventListener('DOMContentLoaded', handleScroll);

                // New event listener for the phone button
                if (phoneButton) {
                    phoneButton.addEventListener('click', () => {
                        const phoneNumber = phoneButton.getAttribute('data-phone');
                        
                        navigator.clipboard.writeText(phoneNumber).then(() => {
                            phonePopup.textContent = 'Phone number copied! '+phoneNumber;
                            phonePopup.classList.add('opacity-100', 'scale-y-100');
                            
                            setTimeout(() => {
                                phonePopup.classList.remove('opacity-100', 'scale-y-100');
                                phonePopup.textContent = phoneNumber; // Reset text for next time
                            }, 3000);
                        }).catch(err => {
                            console.error('Could not copy text: ', err);
                        });
                    });
                };
            };
        });
