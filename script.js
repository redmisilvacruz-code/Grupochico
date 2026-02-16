// ===================================
// CHICO PROJECTS - JAVASCRIPT
// Era dos Chicos 2026 🔥
// ===================================

// Estado Global
let rgbEnabled = true;
let currentTheme = 'dark';

// ============ SETTINGS PANEL ============

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('active');
}

// Fechar painel ao clicar fora
document.addEventListener('click', (e) => {
    const panel = document.getElementById('settingsPanel');
    const settingsBtn = document.querySelector('.settings-btn');
    
    if (!panel.contains(e.target) && !settingsBtn.contains(e.target)) {
        panel.classList.remove('active');
    }
});

// ============ RGB TOGGLE ============

function toggleRGB() {
    const rgbBg = document.getElementById('rgbBackground');
    const toggle = document.getElementById('rgbToggle');
    
    rgbEnabled = toggle.checked;
    
    if (rgbEnabled) {
        rgbBg.classList.remove('disabled');
        localStorage.setItem('rgbEnabled', 'true');
    } else {
        rgbBg.classList.add('disabled');
        localStorage.setItem('rgbEnabled', 'false');
    }
}

// ============ THEME CHANGER ============

const themes = {
    dark: {
        bgPrimary: '#0a0a0a',
        bgSecondary: '#141414',
        bgCard: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        border: '#2a2a2a'
    },
    blue: {
        bgPrimary: '#001a33',
        bgSecondary: '#002647',
        bgCard: '#003366',
        textPrimary: '#ffffff',
        textSecondary: '#b3d9ff',
        border: '#004080'
    },
    purple: {
        bgPrimary: '#1a0033',
        bgSecondary: '#260047',
        bgCard: '#330066',
        textPrimary: '#ffffff',
        textSecondary: '#d9b3ff',
        border: '#4d0099'
    },
    green: {
        bgPrimary: '#001a0d',
        bgSecondary: '#002614',
        bgCard: '#003320',
        textPrimary: '#ffffff',
        textSecondary: '#b3ffcc',
        border: '#004d26'
    }
};

function changeTheme(themeName) {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    // Aplicar cores do tema
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--bg-card', theme.bgCard);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--border', theme.border);
    
    // Atualizar botões ativos
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-theme="${themeName}"]`).classList.add('active');
    
    // Salvar no localStorage
    currentTheme = themeName;
    localStorage.setItem('theme', themeName);
}

// ============ ACCENT COLOR ============

function changeAccent(color) {
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('accentColor', color);
}

// ============ SMOOTH SCROLL ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Altura da navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Atualizar link ativo
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ============ NAVBAR SCROLL ============

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============ INTERSECTION OBSERVER ============

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar cards de projetos
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============ PROGRESS BAR ANIMATION ============

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.progress-fill');
            const width = fill.style.width;
            fill.style.width = '0%';
            
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.project-progress').forEach(progress => {
    progressObserver.observe(progress);
});

// ============ TYPING EFFECT (HERO) ============

const texts = [
    "Desenvolvendo projetos insanos desde 2026 🔥",
    "Minecraft • Roblox • Plugins • Hacks 💻",
    "Era dos Chicos! 👑",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        subtitle.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex > 0) {
        subtitle.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeWriter, isDeleting ? 1000 : 2000);
    }
}

// Iniciar typing effect
setTimeout(typeWriter, 1000);

// ============ PARTICLES BACKGROUND (OPCIONAL) ============

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--accent)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.opacity = '0.5';
    
    document.body.appendChild(particle);
    
    const duration = 3000 + Math.random() * 2000;
    const distance = window.innerHeight + 20;
    
    particle.animate([
        { transform: 'translateY(0px)', opacity: 0.5 },
        { transform: `translateY(${distance}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Criar partículas a cada 500ms
setInterval(() => {
    if (Math.random() > 0.5) createParticle();
}, 500);

// ============ EASTER EGGS ============

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    alert('🎉 EASTER EGG ATIVADO! Era dos Chicos desbloqueou modo TURBO! 🔥');
    
    // Ativar efeitos loucos
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ============ LOAD PREFERENCES ============

window.addEventListener('DOMContentLoaded', () => {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    changeTheme(savedTheme);
    
    // Carregar RGB preference
    const savedRGB = localStorage.getItem('rgbEnabled');
    if (savedRGB === 'false') {
        document.getElementById('rgbToggle').checked = false;
        document.getElementById('rgbBackground').classList.add('disabled');
        rgbEnabled = false;
    }
    
    // Carregar cor de destaque
    const savedAccent = localStorage.getItem('accentColor');
    if (savedAccent) {
        document.getElementById('accentColor').value = savedAccent;
        changeAccent(savedAccent);
    }
    
    console.log('%c👑 ERA DOS CHICOS 🔥', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
    console.log('%cSite desenvolvido por Lorenzo, CorlesDaChico & Gustavoxrz', 'color: #b0b0b0; font-size: 12px;');
    console.log('%cTente o código Konami: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #fbbf24; font-size: 10px;');
});

// ============ CURSOR TRAIL (OPCIONAL) ============

let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (!rgbEnabled) return;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    if (cursorTrail.length > maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 10);
    
    setTimeout(() => trail.remove(), 500);
});

// Adicionar CSS para cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        transform: translate(-50%, -50%);
        transition: all 0.5s ease-out;
        z-index: 9999;
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============ CONSOLE ART ============

console.log(`
 ██████╗██╗  ██╗██╗ ██████╗ ██████╗ 
██╔════╝██║  ██║██║██╔════╝██╔═══██╗
██║     ███████║██║██║     ██║   ██║
██║     ██╔══██║██║██║     ██║   ██║
╚██████╗██║  ██║██║╚██████╗╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝ 
`);
