// Game state
let gameState = {
    steps: 0,
    distance: 0,
    energy: 100,
    maxEnergy: 100,
    walkSpeed: 1,
    energyCost: 1,
    restRate: 2,
    autoWalk: false,
    upgrades: {
        stamina: 0,
        speed: 0,
        auto: false
    },
    milestones: []
};

// Game elements
const elements = {
    steps: document.getElementById('steps'),
    distance: document.getElementById('distance'),
    energy: document.getElementById('energy'),
    walkSpeed: document.getElementById('walkSpeed'),
    progress: document.getElementById('progress'),
    journeyDescription: document.getElementById('journeyDescription'),
    walkBtn: document.getElementById('walkBtn'),
    restBtn: document.getElementById('restBtn'),
    meditateBtn: document.getElementById('meditateBtn'),
    upgradeStamina: document.getElementById('upgradeStamina'),
    upgradeSpeed: document.getElementById('upgradeSpeed'),
    upgradeAuto: document.getElementById('upgradeAuto'),
    milestonesList: document.getElementById('milestonesList'),
    traveler: document.getElementById('traveler'),
    scenery: document.getElementById('scenery'),
    stepsIcon: document.getElementById('stepsIcon'),
    distanceIcon: document.getElementById('distanceIcon'),
    energyIcon: document.getElementById('energyIcon'),
    speedIcon: document.getElementById('speedIcon')
};

// Journey descriptions based on distance
const journeyDescriptions = [
    { distance: 0, text: "Comenzando el viaje... tus primeros pasos resuenan en el silencio." },
    { distance: 10, text: "El sendero se extiende ante ti. Cada paso es una meditación." },
    { distance: 50, text: "Has encontrado tu ritmo. El mundo se vuelve más claro." },
    { distance: 100, text: "La fatiga se convierte en fuerza. Sigues adelante." },
    { distance: 200, text: "Las montañas lejanas ya no parecen tan distantes." },
    { distance: 500, text: "Tu determinación crece con cada paso. El viaje te transforma." },
    { distance: 1000, text: "Has recorrido un camino largo. La sabiduría viene con la distancia." },
    { distance: 2000, text: "El horizonte se expande. Tu espíritu se eleva." },
    { distance: 5000, text: "Eres uno con el camino. Cada paso es parte de algo mayor." },
    { distance: 10000, text: "Has alcanzado la trascendencia. El viaje nunca termina..." }
];

// Milestones
const milestones = [
    { id: 'first-steps', steps: 10, name: 'Primeros Pasos', description: 'Da tus primeros 10 pasos' },
    { id: 'century', steps: 100, name: 'Centenario', description: 'Camina 100 pasos' },
    { id: 'marathon', steps: 500, name: 'Maratón Mental', description: 'Alcanza 500 pasos' },
    { id: 'thousand', steps: 1000, name: 'Mil Pasos', description: 'El poder de la persistencia' },
    { id: 'pilgrim', steps: 2500, name: 'Peregrino', description: 'Un verdadero viajero' },
    { id: 'wanderer', steps: 5000, name: 'Vagabundo', description: 'El camino es tu hogar' },
    { id: 'sage', steps: 10000, name: 'Sabio del Sendero', description: 'Has encontrado la sabiduría' }
];

// Initialize game
function initGame() {
    initializeImages();
    updateDisplay();
    createMilestones();
    
    // Auto-walk interval
    setInterval(() => {
        if (gameState.autoWalk && gameState.energy > 0) {
            walk();
        }
    }, 1000 / gameState.walkSpeed);
    
    // Energy regeneration
    setInterval(() => {
        if (gameState.energy < gameState.maxEnergy) {
            gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + 0.1);
            updateDisplay();
        }
    }, 1000);
}

// Initialize images and icons
function initializeImages() {
    // Set up icons
    if (elements.stepsIcon) elements.stepsIcon.innerHTML = gameImages.stepsIcon;
    if (elements.distanceIcon) elements.distanceIcon.innerHTML = gameImages.distanceIcon;
    if (elements.energyIcon) elements.energyIcon.innerHTML = gameImages.energyIcon;
    if (elements.speedIcon) elements.speedIcon.innerHTML = gameImages.stepsIcon; // Using steps icon for speed
    
    // Set up traveler
    if (elements.traveler) {
        elements.traveler.innerHTML = gameImages.walker;
        elements.traveler.classList.add('walker-animated');
    }
    
    // Set up scenery
    if (elements.scenery) {
        elements.scenery.innerHTML = createScenery();
    }
}

// Walk function
function walk() {
    if (gameState.energy >= gameState.energyCost) {
        gameState.steps++;
        gameState.distance += 0.5; // Each step is 0.5 meters
        gameState.energy -= gameState.energyCost;
        
        // Add particle effect when walking
        if (elements.traveler) {
            const rect = elements.traveler.getBoundingClientRect();
            createParticles(rect.left + rect.width/2, rect.top + rect.height/2, 3);
        }
        
        updateDisplay();
        updateJourneyDescription();
        checkMilestones();
        updateUpgradeButtons();
        
        // Update scenery occasionally for variety
        if (gameState.steps % 20 === 0) {
            if (elements.scenery) {
                elements.scenery.innerHTML = createScenery();
            }
        }
    }
}

// Rest function
function rest() {
    gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + gameState.restRate * 5);
    updateDisplay();
}

// Meditate function
function meditate() {
    if (gameState.steps >= 10) {
        gameState.steps -= 10;
        gameState.maxEnergy += 5;
        gameState.energy = gameState.maxEnergy;
        
        // Add special particle effect for meditation
        if (elements.traveler) {
            const rect = elements.traveler.getBoundingClientRect();
            createParticles(rect.left + rect.width/2, rect.top + rect.height/2, 8);
        }
        
        updateDisplay();
    }
}

// Update all display elements
function updateDisplay() {
    elements.steps.textContent = gameState.steps.toLocaleString();
    elements.distance.textContent = Math.floor(gameState.distance).toLocaleString();
    elements.energy.textContent = `${Math.floor(gameState.energy)}/${gameState.maxEnergy}`;
    elements.walkSpeed.textContent = gameState.walkSpeed;
    
    // Update progress bar (arbitrary scale for visual effect)
    const progressPercent = Math.min(100, (gameState.distance / 100) % 100);
    elements.progress.style.width = progressPercent + '%';
    
    // Update button states
    elements.walkBtn.disabled = gameState.energy < gameState.energyCost;
    elements.meditateBtn.disabled = gameState.steps < 10;
}

// Update journey description
function updateJourneyDescription() {
    const currentDistance = gameState.distance;
    let description = journeyDescriptions[0].text;
    
    for (let i = journeyDescriptions.length - 1; i >= 0; i--) {
        if (currentDistance >= journeyDescriptions[i].distance) {
            description = journeyDescriptions[i].text;
            break;
        }
    }
    
    elements.journeyDescription.textContent = description;
}

// Create milestone elements
function createMilestones() {
    elements.milestonesList.innerHTML = '';
    
    milestones.forEach(milestone => {
        const milestoneEl = document.createElement('div');
        milestoneEl.className = 'milestone';
        
        if (gameState.steps >= milestone.steps) {
            milestoneEl.classList.add('completed');
            if (!gameState.milestones.includes(milestone.id)) {
                gameState.milestones.push(milestone.id);
            }
        } else {
            milestoneEl.classList.add('locked');
        }
        
        milestoneEl.innerHTML = `
            <h4>${milestone.name}</h4>
            <p>${milestone.description}</p>
            <small>${milestone.steps} pasos</small>
        `;
        
        elements.milestonesList.appendChild(milestoneEl);
    });
}

// Check and update milestones
function checkMilestones() {
    createMilestones();
}

// Upgrade functions
function upgradeStamina() {
    const cost = 5 * (gameState.upgrades.stamina + 1);
    if (gameState.steps >= cost) {
        gameState.steps -= cost;
        gameState.upgrades.stamina++;
        gameState.energyCost = Math.max(0.1, 1 - (gameState.upgrades.stamina * 0.1));
        gameState.maxEnergy += 10;
        updateDisplay();
        updateUpgradeButtons();
    }
}

function upgradeSpeed() {
    const cost = 15 * (gameState.upgrades.speed + 1);
    if (gameState.steps >= cost) {
        gameState.steps -= cost;
        gameState.upgrades.speed++;
        gameState.walkSpeed++;
        updateDisplay();
        updateUpgradeButtons();
    }
}

function upgradeAuto() {
    if (gameState.steps >= 50 && !gameState.upgrades.auto) {
        gameState.steps -= 50;
        gameState.upgrades.auto = true;
        gameState.autoWalk = true;
        
        elements.upgradeAuto.textContent = 'Activado ✓';
        elements.upgradeAuto.disabled = true;
        updateDisplay();
    }
}

// Update upgrade button states and costs
function updateUpgradeButtons() {
    const staminaCost = 5 * (gameState.upgrades.stamina + 1);
    const speedCost = 15 * (gameState.upgrades.speed + 1);
    
    elements.upgradeStamina.textContent = `Mejorar (${staminaCost} pasos)`;
    elements.upgradeStamina.disabled = gameState.steps < staminaCost;
    
    elements.upgradeSpeed.textContent = `Mejorar (${speedCost} pasos)`;
    elements.upgradeSpeed.disabled = gameState.steps < speedCost;
    
    elements.upgradeAuto.disabled = gameState.steps < 50 || gameState.upgrades.auto;
}

// Event listeners
elements.walkBtn.addEventListener('click', walk);
elements.restBtn.addEventListener('click', rest);
elements.meditateBtn.addEventListener('click', meditate);
elements.upgradeStamina.addEventListener('click', upgradeStamina);
elements.upgradeSpeed.addEventListener('click', upgradeSpeed);
elements.upgradeAuto.addEventListener('click', upgradeAuto);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
        case 'w':
            e.preventDefault();
            if (!elements.walkBtn.disabled) walk();
            break;
        case 'r':
            rest();
            break;
        case 'm':
            if (!elements.meditateBtn.disabled) meditate();
            break;
    }
});

// Auto-save game state
function saveGame() {
    localStorage.setItem('soLongGame', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('soLongGame');
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
}

// Save game every 10 seconds
setInterval(saveGame, 10000);

// Load game on start
window.addEventListener('load', () => {
    loadGame();
    initGame();
});

// Save game before closing
window.addEventListener('beforeunload', saveGame);

// Initialize the game
initGame();