// SVG Images for the So Long Game
const gameImages = {
    // Walking character SVG
    walker: `
    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#357abd;stop-opacity:1" />
            </linearGradient>
        </defs>
        <!-- Head -->
        <circle cx="40" cy="20" r="8" fill="#fdbcb4"/>
        <!-- Body -->
        <rect x="35" y="28" width="10" height="25" rx="5" fill="url(#bodyGradient)"/>
        <!-- Arms -->
        <rect x="25" y="30" width="8" height="3" rx="1.5" fill="url(#bodyGradient)" class="arm-left"/>
        <rect x="47" y="30" width="8" height="3" rx="1.5" fill="url(#bodyGradient)" class="arm-right"/>
        <!-- Legs -->
        <rect x="32" y="53" width="4" height="15" rx="2" fill="#2c3e50" class="leg-left"/>
        <rect x="44" y="53" width="4" height="15" rx="2" fill="#2c3e50" class="leg-right"/>
        <!-- Feet -->
        <ellipse cx="34" cy="72" rx="3" ry="2" fill="#8b4513" class="foot-left"/>
        <ellipse cx="46" cy="72" rx="3" ry="2" fill="#8b4513" class="foot-right"/>
    </svg>`,

    // Landscape elements
    tree: `
    <svg width="40" height="60" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Trunk -->
        <rect x="17" y="40" width="6" height="20" fill="#8b4513"/>
        <!-- Leaves -->
        <circle cx="20" cy="25" r="15" fill="#228b22"/>
        <circle cx="15" cy="30" r="12" fill="#32cd32"/>
        <circle cx="25" cy="30" r="12" fill="#32cd32"/>
    </svg>`,

    bush: `
    <svg width="30" height="25" viewBox="0 0 30 25" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="15" r="8" fill="#228b22"/>
        <circle cx="15" cy="12" r="10" fill="#32cd32"/>
        <circle cx="22" cy="15" r="8" fill="#228b22"/>
    </svg>`,

    mountain: `
    <svg width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
                <stop offset="60%" style="stop-color:#708090;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2f4f4f;stop-opacity:1" />
            </linearGradient>
        </defs>
        <polygon points="10,60 30,10 50,60" fill="url(#mountainGradient)"/>
        <polygon points="40,60 60,20 80,60" fill="url(#mountainGradient)"/>
        <polygon points="70,60 90,15 100,60" fill="url(#mountainGradient)"/>
    </svg>`,

    flower: `
    <svg width="20" height="25" viewBox="0 0 20 25" xmlns="http://www.w3.org/2000/svg">
        <!-- Stem -->
        <line x1="10" y1="25" x2="10" y2="15" stroke="#228b22" stroke-width="2"/>
        <!-- Petals -->
        <circle cx="10" cy="12" r="3" fill="#ff69b4"/>
        <circle cx="7" cy="9" r="2" fill="#ff1493"/>
        <circle cx="13" cy="9" r="2" fill="#ff1493"/>
        <circle cx="7" cy="15" r="2" fill="#ff1493"/>
        <circle cx="13" cy="15" r="2" fill="#ff1493"/>
        <!-- Center -->
        <circle cx="10" cy="12" r="1.5" fill="#ffd700"/>
    </svg>`,

    // UI Elements
    energyIcon: `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ff8c00;stop-opacity:1" />
            </linearGradient>
        </defs>
        <polygon points="12,2 15,8 22,8 16,14 18,22 12,18 6,22 8,14 2,8 9,8" fill="url(#energyGradient)"/>
    </svg>`,

    stepsIcon: `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14,12l-4,4l-1.41-1.41L11.17,12L8.59,9.41L10,8L14,12z" fill="#4a90e2"/>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#4a90e2" stroke-width="2"/>
    </svg>`,

    distanceIcon: `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,2L2,7V17L12,22L22,17V7L12,2M12,4.14L19.25,8L12,11.86L4.75,8L12,4.14M4,9.96L11,13.82V20.14L4,16.28V9.96M13,20.14V13.82L20,9.96V16.28L13,20.14Z" fill="#2ecc71"/>
    </svg>`,

    // Particle effects
    sparkle: `
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8,1L9,6L14,7L9,8L8,13L7,8L2,7L7,6L8,1Z" fill="#ffd700" opacity="0.8"/>
    </svg>`
};

// Animation CSS for the walking character
const walkerAnimations = `
    @keyframes walkCycle {
        0% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-3px) rotate(1deg); }
        50% { transform: translateY(0px) rotate(0deg); }
        75% { transform: translateY(-3px) rotate(-1deg); }
        100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes armSwing {
        0% { transform: rotate(10deg); }
        50% { transform: rotate(-10deg); }
        100% { transform: rotate(10deg); }
    }
    
    @keyframes legStep {
        0% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-2px) rotate(5deg); }
        50% { transform: translateY(0px) rotate(0deg); }
        75% { transform: translateY(-1px) rotate(-3deg); }
        100% { transform: translateY(0px) rotate(0deg); }
    }
    
    .walker-animated {
        animation: walkCycle 1.5s ease-in-out infinite;
    }
    
    .walker-animated .arm-left {
        transform-origin: 25px 31px;
        animation: armSwing 1.5s ease-in-out infinite;
    }
    
    .walker-animated .arm-right {
        transform-origin: 55px 31px;
        animation: armSwing 1.5s ease-in-out infinite reverse;
    }
    
    .walker-animated .leg-left {
        transform-origin: 34px 53px;
        animation: legStep 1.5s ease-in-out infinite;
    }
    
    .walker-animated .leg-right {
        transform-origin: 46px 53px;
        animation: legStep 1.5s ease-in-out infinite reverse;
    }
`;

// Function to create scenery elements
function createScenery() {
    const sceneryTypes = [
        { type: 'tree', svg: gameImages.tree },
        { type: 'bush', svg: gameImages.bush },
        { type: 'flower', svg: gameImages.flower },
        { type: 'mountain', svg: gameImages.mountain }
    ];
    
    let sceneryHTML = '';
    for (let i = 0; i < 20; i++) {
        const randomType = sceneryTypes[Math.floor(Math.random() * sceneryTypes.length)];
        sceneryHTML += `<div class="scenery-item ${randomType.type}">${randomType.svg}</div>`;
    }
    
    return sceneryHTML;
}

// Function to create particle effects
function createParticles(x, y, count = 5) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.left = x + 'px';
    particleContainer.style.top = y + 'px';
    particleContainer.style.pointerEvents = 'none';
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = gameImages.sparkle;
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.animation = `particleFloat 1s ease-out forwards`;
        particle.style.animationDelay = (i * 0.1) + 's';
        
        const angle = (Math.PI * 2 * i) / count;
        const distance = 20 + Math.random() * 20;
        particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    setTimeout(() => {
        particleContainer.remove();
    }, 1500);
}

// Additional CSS for particles and scenery
const additionalCSS = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0);
            opacity: 0;
        }
    }
    
    .scenery-item {
        display: inline-block;
        margin: 0 10px;
        animation: sceneryFloat 3s ease-in-out infinite;
    }
    
    .scenery-item.tree {
        animation-delay: 0s;
    }
    
    .scenery-item.bush {
        animation-delay: 0.5s;
    }
    
    .scenery-item.flower {
        animation-delay: 1s;
    }
    
    .scenery-item.mountain {
        animation-delay: 1.5s;
    }
    
    @keyframes sceneryFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    .icon-with-image {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .stat-icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }
`;

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gameImages, walkerAnimations, additionalCSS, createScenery, createParticles };
}