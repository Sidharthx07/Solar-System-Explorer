const planets = [
    {
        name: "Mercury", color: "mercury", radius: 6, distance: 80, orbitTime: 4, moons: 0,
        description: "The smallest planet in our solar system and closest to the Sun.",
        facts: [
            "A year on Mercury is just 88 days long.",
            "Mercury is the second densest planet.",
            "Only two spacecraft have ever visited Mercury."
        ]
    },
    {
        name: "Venus", color: "venus", radius: 8, distance: 120, orbitTime: 11, moons: 0,
        description: "Similar in size to Earth but with a toxic atmosphere of carbon dioxide.",
        facts: [
            "Venus rotates in the opposite direction to most planets.",
            "It's the hottest planet in our solar system.",
            "Venus has a very weak magnetic field."
        ]
    },
    {
        name: "Earth", color: "earth", radius: 8, distance: 160, orbitTime: 16, moons: 1,
        description: "Our home planet and the only known place in the universe with life.",
        facts: [
            "Earth is the only planet not named after a god.",
            "The Earth's rotation is gradually slowing.",
            "Earth has a powerful magnetic field."
        ]
    },
    {
        name: "Mars", color: "mars", radius: 7, distance: 200, orbitTime: 24, moons: 2,
        description: "The Red Planet, home to the tallest mountain in the solar system.",
        facts: [
            "Mars has the largest dust storms in the solar system.",
            "Pieces of Mars have fallen to Earth.",
            "The Sun appears about half the size on Mars as it does from Earth."
        ]
    },
    {
        name: "Jupiter", color: "jupiter", radius: 14, distance: 280, orbitTime: 48, moons: 79,
        description: "The largest planet in our solar system with a Great Red Spot storm.",
        facts: [
            "Jupiter has the shortest day of all the planets.",
            "Jupiter's Great Red Spot is a gigantic storm.",
            "Jupiter has a thin ring system."
        ]
    },
    {
        name: "Saturn", color: "saturn", radius: 12, distance: 360, orbitTime: 60, moons: 82,
        description: "Known for its beautiful ring system made of ice and rock.",
        facts: [
            "Saturn can float in water because it's mostly made of gas.",
            "Saturn has the most extensive rings in the solar system.",
            "Four spacecraft have visited Saturn."
        ]
    },
    {
        name: "Uranus", color: "uranus", radius: 10, distance: 420, orbitTime: 84, moons: 27,
        description: "An ice giant that rotates on its side with a unique tilt.",
        facts: [
            "Uranus rotates on its side.",
            "Uranus was the first planet discovered with a telescope.",
            "Uranus has 13 known rings."
        ]
    },
    {
        name: "Neptune", color: "neptune", radius: 10, distance: 480, orbitTime: 100, moons: 14,
        description: "The windiest planet with the strongest winds in the solar system.",
        facts: [
            "Neptune has the strongest winds in the solar system.",
            "Neptune was the first planet located through mathematical calculations.",
            "Neptune is the coldest planet in the solar system."
        ]
    }
];

let baseSpeed = 0.002;
let animationSpeed = 1;
let angle = 0;
let animationId;

function initSolarSystem() {
    const solarSystem = document.querySelector('.solar-system');
    solarSystem.innerHTML = '<div class="sun"></div>';
    document.querySelector('.sun').style.cssText = `width: 60px; height: 60px;`;

    // Add planets
    planets.forEach((planet, index) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = orbit.style.height = `${planet.distance * 2}px`;
        solarSystem.appendChild(orbit);

        const planetContainer = document.createElement('div');
        planetContainer.className = 'planet-container';
        planetContainer.dataset.index = index;

        const planetElement = document.createElement('div');
        planetElement.className = `planet ${planet.color}`;
        planetElement.style.cssText = `
            width: ${planet.radius}px;
            height: ${planet.radius}px;
        `;

        if (planet.name === "Saturn") {
            const ring = document.createElement('div');
            ring.className = 'saturn-ring';
            ring.style.cssText = `
                width: ${planet.radius * 1.8}px;
                height: ${planet.radius * 0.4}px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            `;
            planetElement.appendChild(ring);
        }

        const name = document.createElement('div');
        name.className = 'planet-name';
        name.textContent = planet.name;

        planetContainer.appendChild(planetElement);
        planetContainer.appendChild(name);
        solarSystem.appendChild(planetContainer);

        updatePlanetPosition(planetContainer, planet, angle);
    });

    setupEventListeners();
    animate();
}

function updatePlanetPosition(container, planet, currentAngle) {
    const planetAngle = currentAngle / (planet.orbitTime / 16);
    const x = Math.cos(planetAngle) * planet.distance;
    const y = Math.sin(planetAngle) * planet.distance;
    container.style.transform = `translate(${x}px, ${y}px)`;
}

function animate() {
    angle += baseSpeed * animationSpeed;
    document.querySelectorAll('.planet-container').forEach((container, i) => {
        updatePlanetPosition(container, planets[i], angle);
    });
    animationId = requestAnimationFrame(animate);
}

function setupEventListeners() {
    document.querySelectorAll('.planet-container').forEach((el, i) => {
        el.addEventListener('click', () => showPlanetInfo(i));
    });

    document.getElementById('speed-up').addEventListener('click', () => {
        animationSpeed = Math.min(animationSpeed * 1.5, 10);
        updateSpeedControls();
    });

    document.getElementById('slow-down').addEventListener('click', () => {
        animationSpeed = Math.max(animationSpeed / 1.5, 0.1);
        updateSpeedControls();
    });

    document.getElementById('reset-speed').addEventListener('click', () => {
        animationSpeed = 1;
        updateSpeedControls();
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('planet-modal').style.display = 'none';
    });

    const toggle = document.getElementById('dark-mode-toggle');
    toggle.addEventListener('click', () => {
        const body = document.body;
        const dark = body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode', !dark);
        toggle.textContent = dark ? '🌞 Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('darkMode', dark ? 'true' : 'false');
    });

    if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.getElementById('dark-mode-toggle').textContent = '🌙 Dark Mode';
    }
}

function updateSpeedControls() {
    document.querySelectorAll('.controls button').forEach(btn => btn.classList.remove('active'));
    const speedUp = document.getElementById('speed-up');
    const slowDown = document.getElementById('slow-down');
    const reset = document.getElementById('reset-speed');

    if (animationSpeed > 1) speedUp.classList.add('active');
    else if (animationSpeed < 1) slowDown.classList.add('active');
    else reset.classList.add('active');

    speedUp.textContent = `Speed Up (${animationSpeed.toFixed(1)}x)`;
}

function showPlanetInfo(index) {
    const planet = planets[index];
    const modal = document.getElementById('planet-modal');
    const info = document.getElementById('planet-info');

    info.innerHTML = `
        <div class="planet-header">
            <div class="planet-icon ${planet.color}" style="width: ${planet.radius * 4}px; height: ${planet.radius * 4}px;"></div>
            <h2 class="planet-name-modal">${planet.name}</h2>
        </div>
        <p>${planet.description}</p>
        <div class="planet-detail"><span class="detail-label">Actual Distance:</span><span class="detail-value">${planet.distance * 5} million km</span></div>
        <div class="planet-detail"><span class="detail-label">Orbital Period:</span><span class="detail-value">${(planet.orbitTime / 16).toFixed(1)} Earth years</span></div>
        <div class="planet-detail"><span class="detail-label">Moons:</span><span class="detail-value">${planet.moons}</span></div>
        <div class="planet-detail"><span class="detail-label">Facts:</span></div>
        <ul class="planet-facts">${planet.facts.map(f => `<li>${f}</li>`).join('')}</ul>
    `;

    modal.style.display = 'flex';
}

window.addEventListener('load', initSolarSystem);
