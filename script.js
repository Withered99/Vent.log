// 1. DATABASE
const roles = [
    {
        id: "crewmate",
        name: "Crewmate",
        faction: "crewmate",
        tags: ["Vanilla"],
        summary: "The standard Crewmate.",
        details: "Do tasks or vote out Imposters to win.",
        abilities: [],
        displayAbilities: false
    },
    {
        id: "impostor",
        name: "Impostor",
        faction: "impostor",
        tags: ["Vanilla"],
        summary: "The standard Imposter.",
        details: "A master of deception and sabotage.",
        abilities: [
            { name: "Kill", effect: "Eliminate a player." },
            { name: "Sabotage", effect: "Sabotage different parts of the ship to make doing tasks harder." },
            { name: "Vent", effect: "Move through the vents for fast travel." }
        ]
    },
    {
        id: "aurial",
        name: "Aurial",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated"],
        summary: "Sense disturbances in your aura!",
        details: "The Aurial can sense when someone nearby uses an ability of any kind, and will see an arrow pointing towards the location where the ability was used. If the ability is used within the Aurial's aura (range), the arrow will match the colour of the player, revealing their identity. If the ability is used further away, the Aurial will see a white arrow.",
        abilities: [],
        displayAbilities: false
    },
    {
        id: "forensic",
        name: "Forensic",
        faction: "crewmate",
        tags: ["TOU: Mira"],
        summary: "Inspect crime scenes to catch the killer!",
        details: "The Forensic can inspect crime scenes and examine players to see if they were at the scene. When examining a player, the screen will flash red if the player was near the crime scene.",
        abilities: [
            { name: "Inspect", effect: "Inspect a crime to gain insight on who was nearby." },
            { name: "Examine", effect: "Examine a player to see if they were near one of the crime scenes that was investigated earlier." }
        ]
    },
    {
        id: "investigator",
        name: "Investigator",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "StellarRolesAU", "AllTheRoles"],
        summary: "Find all evildoers by examining footprints!",
        details: "The Investigator is able to see the footprints of other players during each round, helping them investigate whereabouts and alibis. Note: Swooper footprints are concealed.",
        abilities: [],
        displayAbilities: false
    },
    {
        id: "lookout",
        name: "Lookout",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated"],
        summary: "Keep your eyes wide open!",
        details: "The Lookout can watch other players during rounds, and will discover which roles interacted with the watched players during meetings.",
        abilities: [
            { name: "Watch", effect: "Watch a player, or multiple. In the next meeting, you will know which roles interacted with each watched player." }
        ]
    },
    {
        id: "medium",
        name: "Medium",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "TheOtherRoles", "AllTheRoles"],
        summary: "Become one with the ghosts!",
        details: "The Medium can become a ghost temporarily by using their Mediate ability, projecting their spirit outside of their body to investigate and discover clues. While Mediating, the Medium's body is left behind, still and unprotected, but their spirit can pass through walls and see other ghosts. Once time is up, their spirit will return to their body, and they can no longer see ghosts of other players.",
        abilities: [
            { name: "Mediate", effect: "Project your spirit outside your body for some time to uncover clues. Once time is up, return to your mortal flesh, and ghosts will disappear." }
        ]
    }
];

// 2. CONFIG & STATE
let activeTag = null;
const factionPriority = { "crewmate": 1, "impostor": 2, "neutral": 3 };

// 3. MASTER FILTER & SORT LOGIC
function filterAndSort() {
    const query = document.getElementById('roleSearch').value.toLowerCase();
    const sortMode = document.getElementById('sortSelect').value;

    // Filter Logic
    let filtered = roles.filter(role => {
        const matchesSearch = role.name.toLowerCase().includes(query) || 
                              role.faction.toLowerCase().includes(query) ||
                              role.summary.toLowerCase().includes(query);
        const matchesTag = activeTag ? role.tags.includes(activeTag) : true;
        return matchesSearch && matchesTag;
    });

    // Sorting Logic (Default is now Faction Priority)
    if (sortMode === "default") {
        filtered.sort((a, b) => factionPriority[a.faction] - factionPriority[b.faction]);
    } else if (sortMode === "alpha") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayRoles(filtered);
}

// 4. UI RENDERING
function displayRoles(data) {
    const grid = document.getElementById('roleGrid');
    grid.innerHTML = data.map(role => `
        <div class="role-card ${role.faction}" onclick="showDetail('${role.id}')">
            <div style="font-weight:bold; font-size:1.2rem;">${role.name}</div>
            <div style="font-size:0.8rem; opacity:0.7; color:var(--${role.faction})">${role.faction.toUpperCase()}</div>
            <p style="font-size:0.9rem;">${role.summary}</p>
            <div style="margin-top:10px;">
                ${role.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderTagFilters() {
    const container = document.getElementById('tagFilters');
    // Extract unique tags from the database
    const allTags = [...new Set(roles.flatMap(role => role.tags))];
    
    container.innerHTML = allTags.map(tag => `
        <button class="filter-tag-btn" onclick="toggleTag('${tag}', this)">${tag}</button>
    `).join('');
}

function toggleTag(tag, btn) {
    if (activeTag === tag) {
        activeTag = null;
        btn.classList.remove('active');
    } else {
        document.querySelectorAll('.filter-tag-btn').forEach(b => b.classList.remove('active'));
        activeTag = tag;
        btn.classList.add('active');
    }
    filterAndSort();
}

// 5. NAVIGATION
function showDetail(roleId) {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    const content = document.getElementById('role-content');
    
    // Ability Logic: Only builds HTML if displayAbilities isn't false AND there are abilities
    let abilitiesHTML = "";
    if (role.displayAbilities !== false && role.abilities && role.abilities.length > 0) {
        abilitiesHTML = `
            <h3>Abilities</h3>
            <div class="ability-list">
                ${role.abilities.map(ab => `
                    <div class="ability-item">
                        <strong>${ab.name}</strong>
                        <span>${ab.effect}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    content.innerHTML = `
        <div class="detail-header">
            <h1 style="color:var(--${role.faction})">${role.name}</h1>
            <div style="color:var(--${role.faction}); font-weight:bold; letter-spacing:1px;">${role.faction.toUpperCase()}</div>
            <div style="margin-top:10px;">
                ${role.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        </div>
        <div class="detail-body">
            <h3>Overview</h3>
            <p>${role.details}</p>
            ${abilitiesHTML}
        </div>
    `;

    document.getElementById('catalog-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    window.scrollTo(0,0);
}

function showCatalog() {
    document.getElementById('catalog-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
}

// 6. INITIALIZE ON LOAD
renderTagFilters();
filterAndSort(); // This ensures roles are sorted by faction right away