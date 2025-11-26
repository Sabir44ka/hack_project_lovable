// Typing Animation for Terminal
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.observer = new IntersectionObserver(
            (entries) => this.handleCounterIntersection(entries),
            { threshold: 0.5 }
        );
        
        this.init();
    }
    
    init() {
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    handleCounterIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                const suffix = counter.parentElement.querySelector('.stat-label').textContent.includes('%') ? '%' : '';
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, 20);
    }
}

// Matrix Rain Background Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
        this.charArray = this.chars.split('');
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const fontSize = 14;
        const columns = this.canvas.width / fontSize;
        
        for (let i = 0; i < columns; i++) {
            this.drops[i] = 1;
        }
        
        this.ctx.font = fontSize + 'px monospace';
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(text, i * 14, this.drops[i] * 14);
            
            if (this.drops[i] * 14 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Screen Hack Simulator
class ScreenHackSimulator {
    constructor() {
        this.contactBtn = document.getElementById('contactHackBtn');
        this.screenCrack = document.getElementById('screenCrack');
        this.bsodScreen = document.getElementById('bsodScreen');
        this.hackingMessage = document.getElementById('hackingMessage');
        this.creepySmile = document.getElementById('creepySmile');
        this.finalContact = document.getElementById('finalContact');
        this.isHacking = false;
        
        this.init();
    }
    
    init() {
        if (this.contactBtn) {
            this.contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.isHacking) {
                    this.startHackSequence();
                }
            });
        }
    }
    
    startHackSequence() {
        this.isHacking = true;
        
        // Disable scrolling
        document.body.style.overflow = 'hidden';
        
        // Step 1: Screen cracks (1 second)
        this.showScreenCracks();
        
        setTimeout(() => {
            // Step 2: Blue Screen of Death (3 seconds)
            this.showBSOD();
            
            setTimeout(() => {
                // Step 3: Hacking message (2 seconds)
                this.showHackingMessage();
                
                setTimeout(() => {
                    // Step 4: Creepy smile (3 seconds)
                    this.showCreepySmile();
                    
                    setTimeout(() => {
                        // Step 5: Final contact info
                        this.showFinalContact();
                    }, 3000);
                }, 2000);
            }, 3000);
        }, 1000);
    }
    
    showScreenCracks() {
        this.screenCrack.classList.add('active');
        
        // Add screen shake effect
        document.body.style.animation = 'screen-shake 1s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    }
    
    showBSOD() {
        this.screenCrack.style.display = 'none';
        this.bsodScreen.classList.add('active');
        
        // Animate percentage counter
        const percentageEl = this.bsodScreen.querySelector('.error-percentage');
        let percentage = 0;
        const interval = setInterval(() => {
            percentage += Math.floor(Math.random() * 15) + 1;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);
            }
            percentageEl.textContent = `${percentage}% complete`;
        }, 200);
    }
    
    showHackingMessage() {
        this.bsodScreen.classList.remove('active');
        this.hackingMessage.classList.add('active');
        
        // Add random screen flicker
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
            document.body.style.filter = flickerCount % 2 === 0 ? 'brightness(1.5)' : 'brightness(0.5)';
            flickerCount++;
            if (flickerCount > 6) {
                clearInterval(flickerInterval);
                document.body.style.filter = '';
            }
        }, 100);
    }
    
    showCreepySmile() {
        this.hackingMessage.classList.remove('active');
        this.creepySmile.classList.add('active');
        
        // Make smile follow mouse
        this.startMouseTracking();
    }
    
    showFinalContact() {
        this.creepySmile.classList.remove('active');
        this.finalContact.classList.add('active');
        
        // Stop mouse tracking
        this.stopMouseTracking();
        
        // Add dramatic sound effect (console log)
        console.log('%c🚨 SYSTEM COMPROMISED! 🚨', 'color: #ff0040; font-family: monospace; font-size: 24px; font-weight: bold;');
        console.log('%c💀 Your data belongs to us now...', 'color: #ffff00; font-family: monospace; font-size: 16px;');
    }
    
    startMouseTracking() {
        this.mouseTrackingHandler = (e) => {
            const smile = this.creepySmile;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            smile.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
            
            // Make eyes follow more intensely
            const eyeLeft = smile.querySelector('.eye-left');
            const eyeRight = smile.querySelector('.eye-right');
            
            const eyeDeltaX = (e.clientX - centerX) * 0.05;
            const eyeDeltaY = (e.clientY - centerY) * 0.05;
            
            if (eyeLeft && eyeRight) {
                eyeLeft.style.transform = `translate(${eyeDeltaX}px, ${eyeDeltaY}px)`;
                eyeRight.style.transform = `translate(${eyeDeltaX}px, ${eyeDeltaY}px)`;
            }
        };
        
        document.addEventListener('mousemove', this.mouseTrackingHandler);
    }
    
    stopMouseTracking() {
        if (this.mouseTrackingHandler) {
            document.removeEventListener('mousemove', this.mouseTrackingHandler);
        }
    }
    
    escapeHack() {
        // Reset all elements
        this.screenCrack.classList.remove('active');
        this.bsodScreen.classList.remove('active');
        this.hackingMessage.classList.remove('active');
        this.creepySmile.classList.remove('active');
        this.finalContact.classList.remove('active');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
        
        // Stop mouse tracking
        this.stopMouseTracking();
        
        // Reset flag
        this.isHacking = false;
        
        // Add escape effect
        document.body.style.animation = 'escape-glitch 1s ease-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
        
        console.log('%c✅ You escaped... this time.', 'color: #00ff41; font-family: monospace; font-size: 16px;');
    }
}

// Logo Glitch Effect
class LogoGlitchEffect {
    constructor() {
        this.logo = document.getElementById('mainLogo');
        this.init();
    }
    
    init() {
        if (this.logo) {
            this.logo.addEventListener('mouseenter', () => this.startGlitch());
            this.logo.addEventListener('mouseleave', () => this.stopGlitch());
        }
    }
    
    startGlitch() {
        // Add logo glitch
        this.logo.classList.add('logo-glitch-active');
        
        // Add page glitch
        document.body.classList.add('page-glitch');
        
        // Random glitch intervals
        this.glitchInterval = setInterval(() => {
            if (Math.random() < 0.3) {
                document.body.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 100);
            }
        }, 200);
    }
    
    stopGlitch() {
        this.logo.classList.remove('logo-glitch-active');
        document.body.classList.remove('page-glitch');
        
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
        }
        
        document.body.style.filter = '';
    }
}

// Store global reference
let globalHackSimulator = null;

// Global escape function
function escapeHack() {
    if (globalHackSimulator) {
        globalHackSimulator.escapeHack();
    } else {
        // Fallback reset
        document.querySelectorAll('.screen-crack, .bsod-screen, .hacking-message, .creepy-smile, .final-contact').forEach(el => {
            el.classList.remove('active');
        });
        document.body.style.overflow = '';
        console.log('%c✅ Emergency escape activated.', 'color: #00ff41; font-family: monospace; font-size: 16px;');
    }
}

// Service Hack Buttons Handler
function initServiceHackButtons() {
    const serviceButtons = document.querySelectorAll('.hack-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Darken the screen
            const overlay = document.createElement('div');
            overlay.className = 'hack-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            
            document.body.appendChild(overlay);
            
            // Show overlay
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            // Show animated evil smile
            const creepySmile = document.getElementById('creepySmile');
            if (creepySmile) {
                creepySmile.classList.add('active', 'laughing');
                creepySmile.style.zIndex = '10000';
                
                // Add evil laugh sound effect (visual animation)
                const laughSound = document.createElement('div');
                laughSound.className = 'laugh-text';
                laughSound.innerHTML = 'HAHAHAHA<br>MWAHAHAHA<br>SYSTEM PWNED!';
                laughSound.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 120%;
                    transform: translateY(-50%);
                    color: #ff0040;
                    font-family: Orbitron, monospace;
                    font-weight: bold;
                    font-size: 1.2rem;
                    text-shadow: 0 0 10px #ff0040;
                    animation: laugh-appear 0.5s ease-out forwards;
                    z-index: 10001;
                `;
                creepySmile.appendChild(laughSound);
            }
            
            // Wait for smile animation, then show contact form
            setTimeout(() => {
                // Hide smile
                if (creepySmile) {
                    creepySmile.classList.remove('active', 'laughing');
                    const laughText = creepySmile.querySelector('.laugh-text');
                    if (laughText) {
                        laughText.remove();
                    }
                }
                
                // Show contact modal
                showContactModal(overlay);
            }, 3000);
        });
    });
}

function showContactModal(overlay) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-content">
            <button class="contact-close">&times;</button>
            <div class="contact-header">
                <h2>СИСТЕМА ВЗЛОМАНА</h2>
                <p>Оставьте ваши контактные данные для получения доступа</p>
            </div>
            <form class="contact-form-hack" id="hackContactFormService">
                <div class="form-group">
                    <label for="serviceName">Имя</label>
                    <input type="text" id="serviceName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="serviceEmail">Email</label>
                    <input type="email" id="serviceEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="servicePhone">Телефон</label>
                    <input type="tel" id="servicePhone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="serviceMessage">Сообщение</label>
                    <textarea id="serviceMessage" name="message" rows="3" placeholder="Опишите ваши потребности..."></textarea>
                </div>
                <button type="submit" class="btn-submit-hack">
                    <span>ПЕРЕДАТЬ ДАННЫЕ</span>
                </button>
            </form>
        </div>
    `;
    
    overlay.appendChild(modal);
    
    // Handle close button
    const closeBtn = modal.querySelector('.contact-close');
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });
    
    // Handle form submission
    const form = modal.querySelector('#hackContactFormService');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        overlay.remove();
    });
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain Background
    new MatrixRain();
    
    // Initialize Typing Animation for Terminal
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, [
            'whoami',
            'nmap -sS target.com',
            'hydra -l admin -P passwords.txt ssh://target',
            'sqlmap -u "http://target.com" --dbs',
            'msfconsole',
            'nc -lvp 4444'
        ], 80);
    }
    
    // Initialize Counter Animation
    new CounterAnimation();
    
    // Initialize Service Hack Buttons
    initServiceHackButtons();
    
    // Initialize Screen Hack Simulator
    globalHackSimulator = new ScreenHackSimulator();
    
    // Initialize Logo Glitch Effect
    new LogoGlitchEffect();
    
    // Handle window resize for matrix background
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('matrix-bg');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
    
    console.log('%cWelcome to Cyber.NET Security 🔒', 'color: #00ff41; font-family: monospace; font-size: 16px; font-weight: bold;');
    console.log('%cUnauthorized access is prohibited!', 'color: #ff0040; font-family: monospace; font-size: 12px;');
});