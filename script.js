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
        id: "trackerv",
        name: "Tracker",
        faction: "crewmate",
        tags: ["Vanilla"],
        summary: "Plant a tracker on a Crewmate to watch their movements on the map.",
        details: "Tracker is a role in Among Us. It based on the Crewmate role, with the additional ability to track other players. They can track a player using their Track ability when near them for a limited amount of time, and can see the location of their target on their map.",
        abilities: [
            { name: "Track", effect: "The Track ability lets the Tracker track a player on their map, but only when near a player. After tracking, a player icon will appear on the personal map, and the location of the target can be seen for a limited amount of time." }
        ]
    },
    {
        id: "scientistv",
        name: "Scientist",
        faction: "crewmate",
        tags: ["Vanilla"],
        summary: "Access vitals at anytime. Complete tasks to recharge your battery.",
        details: "Scientist is a role in Among Us, first shown during the Summer Game Fest. It is based on the Crewmate role with the added ability to view the Vitals interface from anywhere on the map.",
        abilities: [
            { name: "Vitals", effect: "Scientists have a portable Vitals monitor that allows them to view the Vitals interface from anywhere on the map, including maps that otherwise do not have a stationary Vitals monitor, such as The Skeld and MIRA HQ. The portable Vitals monitor has a battery that drains upon use but recharges as the Scientist completes tasks or automatically recharges if they have completed all of their tasks." }
        ]
    },
    {
        id: "engineerv",
        name: "Engineer",
        faction: "crewmate",
        tags: ["Vanilla"],
        summary: "Engineer is a role in Among Us. It is based on the Crewmate role with the added ability to travel through vents.",
        details: "While usually an ability that is exclusive to Impostors, Engineers are also able to travel through vents. However, Engineers can only stay in a vent for a limited time and must wait for a period of time before they can use another vent. Engineers cannot travel through vents while Comms Sabotaged is active. Similar to Impostors, they also cannot enter a vent if the vent is being used for Clean Vent (however, this does not prevent the Engineer from using the vent system said vent is connected to).",
        abilities: [
            { name: "Vitals", effect: "Scientists have a portable Vitals monitor that allows them to view the Vitals interface from anywhere on the map, including maps that otherwise do not have a stationary Vitals monitor, such as The Skeld and MIRA HQ. The portable Vitals monitor has a battery that drains upon use but recharges as the Scientist completes tasks or automatically recharges if they have completed all of their tasks." }
        ]
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
    },
    {
        id: "mystic",
        name: "Mystic",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated"],
        summary: "Know where and when kills happen!",
        details: "The Mystic is alerted whenever someone dies, seeing a blue flash and a brief arrow pointing in the direction of the death.",
        abilities: [],
        displayAbilities: false
    },
    {
        id: "seer",
        name: "Seer",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "TheOtherRoles"],
        summary: "Reveal alliances to find evildoers!",
        details: "The Seer can compare the alignments of other players, learning if players are friendly or enemies by using their Intuit and Gaze abilities, or Reveal if comparing alignments only.",
        abilities: [
            { name: "Intuit", effect: "Chooses a player to compare alliances of others to. The target can be changed within the same round."},
            { name: "Gaze", effect: "Reveals the alliance between the target players when comparing alignments."},
            { name: "Reveal", effect: "Reveals the alliance of target players when revealing alignments only."}
        ]
    },
    {
        id: "snitch",
        name: "Snitch",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "TheOtherRoles", "AllTheRoles"],
        summary: "Complete your tasks to find the Impostors!",
        details: "The Snitch must race to complete their tasks in order to reveal the Impostors. Upon completing all tasks, the Impostors will be revealed to the Snitch with arrows and red names. However, the Snitch will also be revealed to the Impostors. The Snitch must survive to the next meeting and cannot be shot by the Impostors once revealed.",
        abilities: [],
        displayAbilities: false
    },
    {
        id: "tracker",
        name: "Tracker/Sonar",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "TheOtherRoles", "AllTheRoles", "StellarRolesAU"],
        summary: "Track suspicious players to see where they go!",
        details: "The Sonar can place markers on other players to track their general location. By placing a marker, the Tracker will see an arrow pointing towards the tracked player's position across the map. The arrows match the tracked player's colour, and will update at set intervals, allowing the Tracker to follow suspicious players and identify unusual movement.",
        abilities: [
            { name: "Track", effect: "Places a tracker (arrow) on a player, making it so that the player's location is visible to the Tracker, updating periodically."}
        ]
    },
    {
        id: "spy",
        name: "Spy",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "TheOtherRoles", "AllTheRoles", "StellarRolesAU"],
        summary: "Snoop around and find stuff out!",
        details: "The Spy gains extra information by using the Admin table. When viewing Admin, the Spy sees the locations of all living players across the map, identified by their colours, making it easier to track and verify locations when giving alibis. The map will update whenever a player moves from one area to another, including through vent systems, as long as they are in a named location (they will not be visible outside or in hallways). Depending on settings, the Spy may also have access to a Portable Admin table, which they can activate remotely and recharge by completing tasks.",
        abilities: [
            { name: "Admin", effect: "Opens up the admin table for a set total duration between uses."}
        ]
    },
    {
        id: "trapper",
        name: "Trapper",
        faction: "crewmate",
        tags: ["TOU: Mira", "TOU: Reactivated", "TheOtherRoles", "AllTheRoles", "StellarRolesAU"],
        summary: "Catch Killers in the Act!",
        details: "The Trapper can place traps around the map to learn the roles of other players. Players must stand in, or walk through, the trap for a set time to 'trap' their roles. The Trapper will see a list of the roles in the next meeting, in a randomised order.",
        abilities: [
            { name: "Trap", effect: "Places down a trap that detects and stores the roles of people within its range after a few seconds"}
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
