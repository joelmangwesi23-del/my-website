/* =========================================================
   MASTER JAVASCRIPT FILE (Kwa Kurasa Zote)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------
    // 1. DARK / LIGHT MODE TOGGLE
    // -----------------------------------------------------
    // Tengeneza kitufe cha Dark/Light Mode na kukiweka kwenye Header
    const header = document.querySelector('header') || document.body;
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeToggleBtn';
    themeBtn.setAttribute('aria-label', 'Badilisha Muonekano');
    
    // Mtindo wa kitufe cha Theme
    themeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: transparent;
        border: 2px solid white;
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.3s ease;
        z-index: 1001;
    `;

    header.style.position = 'relative'; // Hakikisha header ina nafasi sahihi
    header.appendChild(themeBtn);

    // Kagua kama mtumiaji alishachagua Dark Mode awali
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '☀️ Light';
    } else {
        themeBtn.innerHTML = '🌙 Dark';
    }

    // Mtumiaji akibonyeza kitufe cha Theme
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeBtn.innerHTML = '☀️ Light';
            localStorage.setItem('portfolioTheme', 'dark');
        } else {
            themeBtn.innerHTML = '🌙 Dark';
            localStorage.setItem('portfolioTheme', 'light');
        }
    });


    // -----------------------------------------------------
    // 2. MOBILE NAVIGATION (Hamburger Menu ya Simu)
    // -----------------------------------------------------
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    if (nav && navUl) {
        // Tengeneza kitufe cha Hamburger (☰)
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.id = 'hamburgerBtn';
        hamburgerBtn.innerHTML = '☰';
        hamburgerBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 26px;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
        `;

        nav.insertBefore(hamburgerBtn, navUl);

        // Onyesha/Ficha Menu mtumiaji akibonyeza Hamburger
        hamburgerBtn.addEventListener('click', () => {
            navUl.classList.toggle('nav-active');
            hamburgerBtn.innerHTML = navUl.classList.contains('nav-active') ? '✖' : '☰';
        });
    }


    // -----------------------------------------------------
    // 3. ACTIVE LINK INDICATOR (Kutambua Ukurasa Uliopo)
    // -----------------------------------------------------
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else if (currentPage !== '') {
            link.classList.remove('active');
        }
    });


    // -----------------------------------------------------
    // 4. TYPING EFFECT (Ukurasa wa Home)
    // -----------------------------------------------------
    const typingElement = document.querySelector('.hero-subtitle') || document.querySelector('.typing-text');
    
    if (typingElement) {
        const roles = ["Web Developer", "Frontend Engineer", "Problem Solver"];
        let roleIndex = 0, charIndex = 0, isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }


    // -----------------------------------------------------
    // 5. SKILLS ANIMATION (Ukurasa wa Skills)
    // -----------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress, .progress-bar');
    
    if (skillBars.length > 0) {
        window.addEventListener('scroll', () => {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (barPosition < screenPosition) {
                    const percentage = bar.getAttribute('data-progress') || '85%';
                    bar.style.width = percentage;
                    bar.style.transition = 'width 1.5s ease-in-out';
                }
            });
        });
    }


    // -----------------------------------------------------
    // 6. CONTACT FORM HANDLING (Ukurasa wa Contact)
    // -----------------------------------------------------
    const contactForm = document.querySelector('.contact-form form') || document.getElementById('myForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const name = nameInput ? nameInput.value : 'Mgeni';

            let statusMessage = document.getElementById('statusMessage');
            if (!statusMessage) {
                statusMessage = document.createElement('div');
                statusMessage.id = 'statusMessage';
                statusMessage.style.cssText = `
                    padding: 15px;
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: bold;
                `;
                contactForm.parentNode.insertBefore(statusMessage, contactForm);
            }

            statusMessage.style.display = 'block';
            statusMessage.textContent = `Ahsante ${name}! Ujumbe wako umepokelewa vizuri.`;

            contactForm.reset();

            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        });
    }


    // -----------------------------------------------------
    // 7. BACK TO TOP BUTTON
    // -----------------------------------------------------
    const backBtn = document.createElement('button');
    backBtn.id = 'backToTopBtn';
    backBtn.innerHTML = '↑';
    backBtn.style.cssText = `
        display: none;
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        border: none;
        outline: none;
        background-color: #80726a;
        color: white;
        cursor: pointer;
        padding: 12px 18px;
        border-radius: 50%;
        font-size: 18px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: background-color 0.3s, transform 0.2s;
    `;
    document.body.appendChild(backBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backBtn.style.display = 'block';
        } else {
            backBtn.style.display = 'none';
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // -----------------------------------------------------
    // 8. DYNAMIC FOOTER YEAR
    // -----------------------------------------------------
    const yearSpan = document.getElementById('year') || document.querySelector('footer span');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});