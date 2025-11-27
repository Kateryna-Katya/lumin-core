document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const links = document.querySelectorAll('.header__link');

    burger.addEventListener('click', () => {
        nav.classList.toggle('is-open'); // Используем класс для стилизации в CSS
        burger.querySelector('i').setAttribute('data-lucide', nav.classList.contains('is-open') ? 'x' : 'menu');
        lucide.createIcons(); // Перерисовываем иконку
    });

    // Close menu when a link is clicked (for anchors)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                burger.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // 2. Cookie Pop-up Logic
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptButton = document.getElementById('accept-cookies');
    const cookieName = 'cookiesAccepted';

    // Проверяем, был ли уже принят выбор
    if (localStorage.getItem(cookieName) !== 'true') {
        // Показываем попап через короткую задержку
        setTimeout(() => {
            cookiePopup.style.display = 'block';
        }, 1000); 
    }

    // Обработчик кнопки "Принять"
    acceptButton.addEventListener('click', () => {
        localStorage.setItem(cookieName, 'true');
        cookiePopup.style.display = 'none';
    });
    
});
// 3. Custom Hero Canvas Animation (Particle Network)

document.addEventListener('DOMContentLoaded', () => {
    // ... (Existing code for Mobile Menu and Cookie Pop-up)

    // Check if canvas is present before running animation logic
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return; 

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 50;
    const connectDistance = 150;

    // Helper function to get a random number within a range
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Particle Class
    class Particle {
        constructor() {
            this.x = random(0, width);
            this.y = random(0, height);
            this.radius = random(1, 3);
            this.vx = random(-0.5, 0.5); // velocity x
            this.vy = random(-0.5, 0.5); // velocity y
            this.color = 'rgba(79, 70, 229, 0.8)'; // Primary color for particles
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Boundary checking (wrap around)
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Bounce behavior (optional, if wrapping looks weird)
            /*
            if (this.x < 0 || this.x > width) {
                this.vx *= -1;
            }
            if (this.y < 0 || this.y > height) {
                this.vy *= -1;
            }
            */
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Function to create particles
    function createParticles() {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Function to connect particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];

                // Calculate distance using the Pythagorean theorem
                const distance = Math.sqrt(
                    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2
                );

                if (distance < connectDistance) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / connectDistance);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.5})`; // Primary color for lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height); // Clear canvas

        connectParticles();

        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    // Handle resizing
    function onResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        // Recreate particles on resize if needed, but for simplicity we keep the existing ones
    }
    
    window.addEventListener('resize', onResize);

    createParticles();
    animate();
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (Existing code for Mobile Menu, Cookie Pop-up, and Canvas Animation)

    // 4. Tabs Logic (Use Cases)
    const tabButtons = document.querySelectorAll('.tabs__button');
    const tabPanes = document.querySelectorAll('.tabs__pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;

            // Remove active state from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('tabs__button--active'));
            tabPanes.forEach(pane => pane.classList.remove('tabs__pane--active'));

            // Set active state on clicked button
            button.classList.add('tabs__button--active');

            // Show the corresponding pane
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.classList.add('tabs__pane--active');
            }
        });
    });
    
});
// 5. Contact Form Logic (with Captcha Simulation)
const form = document.getElementById('contact-form');
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswerInput = document.getElementById('captcha-answer');
const successMessage = document.getElementById('success-message');
const submitButton = form ? form.querySelector('.contact__submit-btn') : null;

if (form) {
    // Function to generate a simple math question (Captcha)
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = '+'; // Keep it simple for simulation
        const question = `${num1} ${operator} ${num2} = ?`;
        const answer = num1 + num2;

        if (captchaQuestion) {
            captchaQuestion.textContent = question;
        }
        if (captchaAnswerInput) {
            captchaAnswerInput.value = answer; // Store the correct answer
        }
    }

    // Generate captcha on load
    generateCaptcha();

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userAnswer = parseInt(document.getElementById('captcha').value);
        const correctAnswer = parseInt(captchaAnswerInput.value);
        
        // 1. Check Captcha
        if (userAnswer !== correctAnswer) {
            alert('Ошибка: Неверный ответ на пример. Попробуйте снова.');
            generateCaptcha(); // Regenerate captcha on failure
            document.getElementById('captcha').value = ''; // Clear input
            return;
        }

        // 2. Simulate Form Submission
        
        // Disable button and show loading state
        if (submitButton) {
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;
        }
        
        // Simulate network delay (1.5 seconds)
        setTimeout(() => {
            // Hide the form fields
            form.querySelectorAll('.form-group, .contact__form-title, .contact__submit-btn').forEach(el => {
                el.style.display = 'none';
            });
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'flex'; 
            }

            // 3. Reset after 5 seconds (НОВИЙ БЛОК)
            setTimeout(() => {
                form.reset();
                generateCaptcha();
                
                // Re-enable form fields and title/button
                form.querySelectorAll('.form-group, .contact__form-title, .contact__submit-btn').forEach(el => {
                    // Використовуємо порожній рядок, щоб повернути стилі з CSS (блочні або флекс-елементи)
                    el.style.display = ''; 
                });
                
                if (successMessage) {
                    successMessage.style.display = 'none';
                }

                // Reset button state
                if (submitButton) {
                     submitButton.textContent = 'Узнать детали';
                     submitButton.disabled = false;
                }

            }, 3000); // 5 секунд
        
        }, 1500); // 1.5 секунд
    });
}