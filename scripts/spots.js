const Spots = [
    { name: "Wallenburg", minRolls: [7, 11, 15], difficulty: "gnarly", type: "gap", allowedTrickTypes: ["flip", "tech"] },
    { name: "MACBA", minRolls: [6, 10, 14], difficulty: "technical", type: "ledges", allowedTrickTypes: ["flip", "tech", "grind"] },
    { name: "Lyon 25", minRolls: [8, 12, 16], difficulty: "gnarly", type: "gap", allowedTrickTypes: ["flip", "gnarly"] },
    { name: "South Bank", minRolls: [5, 9, 13], difficulty: "mellow", type: "banks", allowedTrickTypes: ["flip", "tech", "transition"] },
    { name: "West LA Courthouse", minRolls: [6, 10, 14], difficulty: "technical", type: "ledges", allowedTrickTypes: ["flip", "tech"] },
    { name: "El Toro", minRolls: [9, 13, 17], difficulty: "gnarly", type: "gap", allowedTrickTypes: ["flip", "gnarly"] },
    { name: "Brooklyn Banks", minRolls: [7, 11, 15], difficulty: "gnarly", type: "banks", allowedTrickTypes: ["flip", "transition", "gnarly"] },
    { name: "Hollywood High", minRolls: [6, 10, 14], difficulty: "technical", type: "ledges", allowedTrickTypes: ["flip", "tech", "grind"] },
    { name: "Carlsbad Gap", minRolls: [8, 12, 16], difficulty: "gnarly", type: "gap", allowedTrickTypes: ["flip", "gnarly"] },
    { name: "Leap of Faith", minRolls: [9, 13, 17], difficulty: "gnarly", type: "gap", allowedTrickTypes: ["flip", "gnarly"] },
    { name: "Love Park", minRolls: [5, 9, 13], difficulty: "mellow", type: "ledges", allowedTrickTypes: ["flip", "tech", "grind"] },
    { name: "China Banks", minRolls: [7, 11, 15], difficulty: "gnarly", type: "banks", allowedTrickTypes: ["flip", "transition", "gnarly"] },
    { name: "Embarcadero", minRolls: [6, 10, 14], difficulty: "technical", type: "ledges", allowedTrickTypes: ["flip", "tech", "grind"] },
    { name: "Hubba Hideout", minRolls: [7, 11, 15], difficulty: "technical", type: "ledges", allowedTrickTypes: ["grind", "tech"] },
    { name: "Rincon", minRolls: [5, 9, 13], difficulty: "mellow", type: "banks", allowedTrickTypes: ["flip", "tech", "transition"] },
    { name: "Sunset Carwash", minRolls: [6, 10, 14], difficulty: "mellow", type: "transition", allowedTrickTypes: ["transition", "flip"] },
    { name: "Burnside", minRolls: [7, 11, 15], difficulty: "technical", type: "transition", allowedTrickTypes: ["transition", "tech"] },
    { name: "J Kwon", minRolls: [8, 12, 16], difficulty: "gnarly", type: "gap", allowedTrickTypes: ["flip", "gnarly"] },
    { name: "Pyramid Ledges", minRolls: [6, 10, 14], difficulty: "technical", type: "ledges", allowedTrickTypes: ["grind", "tech", "flip"] },
    { name: "Pier 7", minRolls: [5, 9, 13], difficulty: "mellow", type: "ledges", allowedTrickTypes: ["flip", "tech", "grind"] }
];

// Trick Cards - categorized by type
const TrickCards = {
    flip: [
        { name: "Kickflip", modifiers: [1, 2, 3], description: "Classic flip trick", type: "flip" },
        { name: "Heelflip", modifiers: [1, 2, 3], description: "Heel-side flip", type: "flip" },
        { name: "Tre Flip", modifiers: [2, 3, 4], description: "360 flip", type: "flip" },
        { name: "Varial Flip", modifiers: [1, 2, 3], description: "Shuvit with flip", type: "flip" },
        { name: "Hardflip", modifiers: [2, 3, 4], description: "Frontside flip", type: "flip" },
        { name: "Backside Flip", modifiers: [2, 3, 4], description: "Backside 180 flip", type: "flip" },
        { name: "Frontside Flip", modifiers: [2, 3, 4], description: "Frontside 180 flip", type: "flip" },
        { name: "Fakie Flip", modifiers: [1, 2, 3], description: "Fakie kickflip", type: "flip" }
    ],
    tech: [
        { name: "Switch Flip", modifiers: [2, 3, 4], description: "Switch kickflip", type: "tech" },
        { name: "Nollie Flip", modifiers: [2, 3, 4], description: "Nollie kickflip", type: "tech" },
        { name: "Switch Flip to Switch Manual", modifiers: [3, 4, 5], description: "Technical combo", type: "tech" },
        { name: "Nollie Heelflip", modifiers: [2, 3, 4], description: "Nollie heel", type: "tech" },
        { name: "Switch Tre Flip", modifiers: [3, 4, 5], description: "Switch 360 flip", type: "tech" },
        { name: "Casper Slide", modifiers: [2, 3, 4], description: "Rail stand slide", type: "tech" }
    ],
    gnarly: [
        { name: "Laser Flip", modifiers: [3, 4, 5], description: "360 heelflip", type: "gnarly" },
        { name: "Inward Heelflip", modifiers: [2, 3, 4], description: "Inward heel", type: "gnarly" },
        { name: "Double Flip", modifiers: [4, 5, 6], description: "Double kickflip", type: "gnarly" },
        { name: "Gazelle Flip", modifiers: [4, 5, 6], description: "360 bigflip", type: "gnarly" },
        { name: "Nightmare Flip", modifiers: [5, 6, 7], description: "Varial double heel", type: "gnarly" }
    ],
    grind: [
        { name: "5-0 Grind", modifiers: [1, 2, 3], description: "Back truck grind", type: "grind" },
        { name: "Nosegrind", modifiers: [1, 2, 3], description: "Front truck grind", type: "grind" },
        { name: "Crooked Grind", modifiers: [2, 3, 4], description: "K-grind", type: "grind" },
        { name: "Smith Grind", modifiers: [2, 3, 4], description: "Feeble variation", type: "grind" },
        { name: "Feeble Grind", modifiers: [1, 2, 3], description: "Back truck over", type: "grind" },
        { name: "Boardslide", modifiers: [1, 2, 3], description: "Center slide", type: "grind" }
    ],
    transition: [
        { name: "Frontside Air", modifiers: [2, 3, 4], description: "Classic vert trick", type: "transition" },
        { name: "Backside Air", modifiers: [2, 3, 4], description: "Backside grab", type: "transition" },
        { name: "Indy Air", modifiers: [1, 2, 3], description: "Indy grab air", type: "transition" },
        { name: "Method Air", modifiers: [2, 3, 4], description: "Stylish grab", type: "transition" },
        { name: "Stalefish Air", modifiers: [2, 3, 4], description: "Back hand grab", type: "transition" }
    ]
};

// Modifier Cards - post-roll effects
const ModifierCards = [
    { name: "Perfect Timing", effect: "multiply", value: 1.5, description: "Filmer got the perfect angle! +50% to roll" },
    { name: "Security Showed Up", effect: "reroll", value: 0, description: "Security kicked you out! Come back later and roll again" },
    { name: "Filmer Missed It", effect: "reroll", value: 0, description: "Filmer wasn't ready! Roll again" },
    { name: "Crowd Hyped", effect: "add", value: 2, description: "The crowd went wild! +2 to your roll" },
    { name: "Rough Approach", effect: "subtract", value: 1, description: "Setup felt off... -1 to your roll" },
    { name: "Clean Approach", effect: "add", value: 3, description: "Perfect setup! +3 to your roll" },
    { name: "Wind Interference", effect: "subtract", value: 2, description: "Wind messed with your balance -2 to roll" },
    { name: "In the Zone", effect: "minimum", value: 10, description: "Feeling it! Minimum roll of 10" },
    { name: "Warmed Up", effect: "add", value: 1, description: "Getting loose! +1 to your roll" },
    { name: "Locked In", effect: "multiply", value: 2, description: "Fully committed! Double your roll" },
    { name: "Lunch Break", effect: "reroll", value: 0, description: "The filmer was grabbing a sandwich and missed your trick!" },
    { name: "Haters", effect: "subtract", value: 2, description: "Well, at least they didn't drop a flower pot on you... Haters begone!" },
    { name: "Flow State", effect: "multiply", value: 1.5, description: "Everything just... clicked. +50% to roll" },
    { name: "Slippery Surface", effect: "subtract", value: 3, description: "The spot is slick! -3 to your roll" },
    { name: "Adrenaline Rush", effect: "add", value: 4, description: "Pumped up! +4 to your roll" },
    { name: "Distracted", effect: "subtract", value: 4, description: "Lost focus... There's something shiny over there! -4 to your roll" },

];

// Famous Skate Combos - legendary trick/spot combinations
const FamousCombos = [
    {
        spotName: "West LA Courthouse",
        trickName: "Switch Flip to Switch Manual",
        title: "Alex Olson Legend",
        description: "Mastering the technical wizardry at the Courthouse... No, not the other guy.",
        superBonus: { type: "dice_bonus", value: 5 }, // +5 to each die
        rarity: "legendary"
    },
    {
        spotName: "El Toro",
        trickName: "Tre Flip",
        title: "Ali Boulala Tribute",
        description: "The gnarliest tre flip down the gnarliest set",
        superBonus: { type: "auto_success", value: 1 }, // Automatic success
        rarity: "legendary" 
    },
    {
        spotName: "Wallenburg",
        trickName: "Kickflip",
        title: "Josh Kalis Classic",
        description: "Simple perfection down the Wallenberg ledge",
        superBonus: { type: "double_points", value: 2 }, // Double spot points
        rarity: "epic"
    },
    {
        spotName: "MACBA",
        trickName: "Switch Tre Flip",
        title: "Barcelona Tech Master",
        description: "Technical switch mastery in the heart of Barcelona",
        superBonus: { type: "dice_bonus", value: 4 }, // +4 to each die
        rarity: "epic"
    },
    {
        spotName: "Love Park",
        trickName: "Kickflip",
        title: "East Coast Legend",
        description: "Paying homage to Philly's most famous spot",
        superBonus: { type: "triple_points", value: 3 }, // Triple spot points
        rarity: "epic"
    },
    {
        spotName: "Hubba Hideout",
        trickName: "Crooked Grind",
        title: "Embarcadero Era",
        description: "Classic SF ledge mastery",
        superBonus: { type: "dice_bonus", value: 3 }, // +3 to each die
        rarity: "rare"
    },
    {
        spotName: "Hollywood High",
        trickName: "5-0 Grind",
        title: "Hollywood Royalty",
        description: "Locking into the most famous ledges in LA",
        superBonus: { type: "double_points", value: 2 },
        rarity: "rare"
    },
    {
        spotName: "Burnside",
        trickName: "Frontside Air",
        title: "Burnside Warrior",
        description: "Flying high in Portland's DIY paradise",
        superBonus: { type: "dice_bonus", value: 3 },
        rarity: "rare"
    },
    {
        spotName: "Brooklyn Banks",
        trickName: "Backside Air", 
        title: "New York State of Mind",
        description: "Conquering the legendary Banks",
        superBonus: { type: "double_points", value: 2 },
        rarity: "rare"
    },
    {
        spotName: "Embarcadero",
        trickName: "Boardslide",
        title: "EMB Legend",
        description: "Sliding into skateboarding history",
        superBonus: { type: "dice_bonus", value: 2 },
        rarity: "common"
    }
];

// Achievement System
let PlayerAchievements = JSON.parse(localStorage.getItem('playerAchievements')) || {
    unlockedTitles: [],
    comboCount: 0,
    rareComboCount: 0,
    epicComboCount: 0,
    legendaryComboCount: 0
};

let spotPoints = 0;
let selectedSpots = [];
let currentSpotIndex = 0;
let currentTrickCard = null;
let currentModifierCard = null;

// Game state management
const GameState = {
    selectedSpots: [],
    currentSpotIndex: 0,
    trickAttempts: 0,
    spotPoints: 0,
    isGameStarted: false,
    currentCombo: null
};

// Card selection functions
function drawRandomTrickCard() {
    const currentSpot = getCurrentSpot();
    if (!currentSpot) return null;
    
    // Get available tricks based on spot's allowed types
    const availableTricks = [];
    currentSpot.allowedTrickTypes.forEach(trickType => {
        if (TrickCards[trickType]) {
            availableTricks.push(...TrickCards[trickType]);
        }
    });
    
    if (availableTricks.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableTricks.length);
    return availableTricks[randomIndex];
}

function drawRandomModifierCard() {
    const randomIndex = Math.floor(Math.random() * ModifierCards.length);
    return ModifierCards[randomIndex];
}

// Check for famous combos
function checkForFamousCombo(spotName, trickName) {
    const combo = FamousCombos.find(combo => 
        combo.spotName === spotName && combo.trickName === trickName
    );
    return combo || null;
}

// Apply super bonus effects
function applySuperBonus(rolls, superBonus) {
    let modifiedRolls = [...rolls];
    let autoSuccess = false;
    let pointsMultiplier = 1;
    
    switch (superBonus.type) {
        case 'dice_bonus':
            modifiedRolls = rolls.map(roll => Math.min(6, roll + superBonus.value));
            break;
        case 'auto_success':
            autoSuccess = true;
            break;
        case 'double_points':
            pointsMultiplier = 2;
            break;
        case 'triple_points':
            pointsMultiplier = 3;
            break;
    }
    
    return {
        modifiedRolls: modifiedRolls,
        autoSuccess: autoSuccess,
        pointsMultiplier: pointsMultiplier
    };
}

// Unlock achievement
function unlockAchievement(combo) {
    if (PlayerAchievements.unlockedTitles.includes(combo.title)) {
        return false; // Already unlocked
    }
    
    PlayerAchievements.unlockedTitles.push(combo.title);
    PlayerAchievements.comboCount++;
    
    switch (combo.rarity) {
        case 'common':
            // No additional counter
            break;
        case 'rare':
            PlayerAchievements.rareComboCount++;
            break;
        case 'epic':
            PlayerAchievements.epicComboCount++;
            break;
        case 'legendary':
            PlayerAchievements.legendaryComboCount++;
            break;
    }
    
    // Save to localStorage
    localStorage.setItem('playerAchievements', JSON.stringify(PlayerAchievements));
    
    // Update display
    updateAchievementsDisplay();
    
    return true; // Newly unlocked
}

// Get current spot data
function getCurrentSpot() {
    if (GameState.currentSpotIndex < GameState.selectedSpots.length) {
        return Spots.find(spot => spot.name === GameState.selectedSpots[GameState.currentSpotIndex]);
    }
    return null;
}

// Get minimum roll for current dice count and spot
function getMinimumRoll(numDice, trickCard = null) {
    const currentSpot = getCurrentSpot();
    if (!currentSpot) return 0;
    
    let baseMinimum = currentSpot.minRolls[numDice - 2]; // 2 dice = index 0, 3 dice = index 1, etc.
    
    if (trickCard) {
        baseMinimum += trickCard.modifiers[numDice - 2];
    }
    
    return baseMinimum;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    updateAchievementsDisplay();
});

function initializeGame() {
    const spotSelect = document.getElementById('spotSelect');
    Spots.forEach(spot => {
        const option = document.createElement('option');
        option.value = spot.name;
        option.textContent = `${spot.name} (${spot.minRolls.join('/')}) - ${spot.type}`;
        spotSelect.appendChild(option);
    });
    updateSpotPoints();
    showSpotSelectionUI();
}

// Update achievements display
function updateAchievementsDisplay() {
    // Update stats
    document.getElementById('totalCombos').textContent = PlayerAchievements.comboCount;
    document.getElementById('rareCombos').textContent = PlayerAchievements.rareComboCount;
    document.getElementById('epicCombos').textContent = PlayerAchievements.epicComboCount;
    document.getElementById('legendaryCombos').textContent = PlayerAchievements.legendaryComboCount;
    
    // Update recent titles (show last 5)
    const recentTitles = document.getElementById('recentTitles');
    if (!recentTitles) return; // Element might not exist
    
    if (PlayerAchievements.unlockedTitles.length === 0) {
        recentTitles.innerHTML = '<div class="no-achievements">No famous combos unlocked yet. Try to hit some legendary trick/spot combinations!</div>';
        return;
    }
    
    const lastFiveTitles = PlayerAchievements.unlockedTitles.slice(-5).reverse();
    recentTitles.innerHTML = '';
    
    lastFiveTitles.forEach(title => {
        const combo = FamousCombos.find(c => c.title === title);
        if (combo) {
            const badge = document.createElement('div');
            badge.className = `title-badge ${combo.rarity}`;
            badge.textContent = title;
            badge.title = `${combo.spotName} + ${combo.trickName}: ${combo.description}`;
            recentTitles.appendChild(badge);
        }
    });
}

function showSpotSelectionUI() {
    document.getElementById('spotSelectionPhase').style.display = 'block';
    document.getElementById('gamePhase').style.display = 'none';
    
    // Add click event listeners to spot selection
    const spotSelect = document.getElementById('spotSelect');
    spotSelect.addEventListener('change', handleSpotSelection);
}

function handleSpotSelection() {
    const spotSelect = document.getElementById('spotSelect');
    const selectedOptions = Array.from(spotSelect.selectedOptions);
    
    // Update selected spots array
    GameState.selectedSpots = selectedOptions.map(option => option.value);
    
    // Update UI
    updateSelectedSpotsDisplay();
    
    // Enable start button if exactly 10 spots selected
    const startButton = document.getElementById('startGameButton');
    startButton.disabled = GameState.selectedSpots.length !== 10;
}

function updateSelectedSpotsDisplay() {
    const selectedSpotsList = document.getElementById('selectedSpotsList');
    const selectedCount = document.getElementById('selectedCount');
    
    selectedCount.textContent = GameState.selectedSpots.length;
    selectedSpotsList.innerHTML = '';
    
    GameState.selectedSpots.forEach((spotName, index) => {
        const spot = Spots.find(s => s.name === spotName);
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${spot.name} (${spot.minRolls.join('/')})</span>
            <button class="remove-spot" onclick="removeSpot('${spotName}')">×</button>
        `;
        selectedSpotsList.appendChild(li);
    });
}

function removeSpot(spotName) {
    GameState.selectedSpots = GameState.selectedSpots.filter(name => name !== spotName);
    
    // Update the multi-select
    const spotSelect = document.getElementById('spotSelect');
    Array.from(spotSelect.options).forEach(option => {
        option.selected = GameState.selectedSpots.includes(option.value);
    });
    
    updateSelectedSpotsDisplay();
    
    // Update start button
    const startButton = document.getElementById('startGameButton');
    startButton.disabled = GameState.selectedSpots.length !== 10;
}

function startGame() {
    GameState.isGameStarted = true;
    GameState.currentSpotIndex = 0;
    GameState.trickAttempts = 0;
    GameState.spotPoints = 0;
    
    // Switch to game phase
    document.getElementById('spotSelectionPhase').style.display = 'none';
    document.getElementById('gamePhase').style.display = 'block';
    
    // Initialize first spot
    updateCurrentSpotDisplay();
    resetTrickCard();
    
    console.log('Game started with spots:', GameState.selectedSpots);
}

function updateCurrentSpotDisplay() {
    const currentSpot = getCurrentSpot();
    if (!currentSpot) return;
    
    document.getElementById('currentSpotName').textContent = currentSpot.name;
    document.getElementById('currentSpotNumber').textContent = GameState.currentSpotIndex + 1;
    document.getElementById('minRollsDisplay').textContent = currentSpot.minRolls.join('/');
    
    updateRequiredRollsDisplay();
}

function drawTrickCard() {
    const currentSpot = getCurrentSpot();
    currentTrickCard = drawRandomTrickCard();
    
    if (!currentTrickCard) {
        console.error('No trick card available for this spot type');
        return;
    }
    
    // Check for famous combo
    const famousCombo = checkForFamousCombo(currentSpot.name, currentTrickCard.name);
    
    const trickCardDisplay = document.getElementById('selectedTrickCard');
    const drawButton = document.getElementById('drawTrickCardButton');
    
    let comboHTML = '';
    if (famousCombo) {
        const isAlreadyUnlocked = PlayerAchievements.unlockedTitles.includes(famousCombo.title);
        comboHTML = `
            <div class="combo-alert-compact ${famousCombo.rarity}">
                <div class="combo-alert-header">
                    <span class="combo-icon">🔥</span>
                    <strong>${famousCombo.title}</strong>
                    <span class="combo-rarity-badge">${famousCombo.rarity.toUpperCase()}</span>
                </div>
                <p class="combo-bonus">${getSuperBonusDescription(famousCombo.superBonus)}</p>
                ${isAlreadyUnlocked ? '<p class="already-unlocked">✓ Already unlocked</p>' : '<p class="new-unlock">NEW TITLE AVAILABLE!</p>'}
            </div>
        `;
    }
    
    trickCardDisplay.innerHTML = `
        <h5>${currentTrickCard.name}</h5>
        <p>${currentTrickCard.description}</p>
        <p>Adds: ${currentTrickCard.modifiers.join('/')} (2/3/4 dice)</p>
        <p class="trick-type">Type: ${currentTrickCard.type.toUpperCase()}</p>
        ${comboHTML}
    `;
    
    trickCardDisplay.style.display = 'block';
    drawButton.style.display = 'none';
    
    // Store the combo for later use
    GameState.currentCombo = famousCombo;
    
    // Update required rolls and enable dice buttons
    updateRequiredRollsDisplay();
    enableDiceButtons();
}

function getSuperBonusDescription(superBonus) {
    switch (superBonus.type) {
        case 'dice_bonus':
            return `+${superBonus.value} to each die roll!`;
        case 'auto_success':
            return 'Automatic success!';
        case 'double_points':
            return 'Double spot points!';
        case 'triple_points':
            return 'Triple spot points!';
        default:
            return 'Unknown bonus';
    }
}

function resetTrickCard() {
    currentTrickCard = null;
    currentModifierCard = null;
    GameState.currentCombo = null; // Clear combo state
    
    // Reset trick card UI
    const selectedCard = document.getElementById('selectedTrickCard');
    const drawButton = document.getElementById('drawTrickCardButton');
    
    if (selectedCard) {
        selectedCard.style.display = 'none';
    }
    
    if (drawButton) {
        drawButton.style.display = 'block';
        drawButton.disabled = false; // Explicitly enable the button
    }
    
    // Clear required rolls display
    const requiredRollDisplay = document.getElementById('requiredRollDisplay');
    if (requiredRollDisplay) {
        requiredRollDisplay.textContent = '-';
    }
    
    // Clear individual dice requirements
    document.getElementById('need2Dice').textContent = '-';
    document.getElementById('need3Dice').textContent = '-';
    document.getElementById('need4Dice').textContent = '-';
    
    disableDiceButtons();
}

function updateRequiredRollsDisplay() {
    const currentSpot = getCurrentSpot();
    if (!currentSpot || !currentTrickCard) return;
    
    const need2 = getMinimumRoll(2, currentTrickCard);
    const need3 = getMinimumRoll(3, currentTrickCard);
    const need4 = getMinimumRoll(4, currentTrickCard);
    
    document.getElementById('need2Dice').textContent = need2;
    document.getElementById('need3Dice').textContent = need3;
    document.getElementById('need4Dice').textContent = need4;
}

function enableDiceButtons() {
    document.getElementById('diceButtons').style.display = 'flex';
    document.getElementById('roll2DiceButton').disabled = false;
    document.getElementById('roll3DiceButton').disabled = false;
    document.getElementById('roll4DiceButton').disabled = false;
}

function disableDiceButtons() {
    document.getElementById('diceButtons').style.display = 'none';
    document.getElementById('roll2DiceButton').disabled = true;
    document.getElementById('roll3DiceButton').disabled = true;
    document.getElementById('roll4DiceButton').disabled = true;
}

function moveToNextSpot() {
    GameState.currentSpotIndex++;
    
    if (GameState.currentSpotIndex >= GameState.selectedSpots.length) {
        // Game over - all spots completed
        showFinalScorePopup(GameState.spotPoints, GameState.trickAttempts);
        return;
    }
    
    // Remove any existing popups first
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
    
    // Re-enable all buttons
    enableAllButtons();
    
    // Move to next spot
    updateCurrentSpotDisplay();
    resetTrickCard();
    
    // Ensure the draw trick card button is enabled and visible
    const drawButton = document.getElementById('drawTrickCardButton');
    if (drawButton) {
        drawButton.disabled = false;
        drawButton.style.display = 'block';
    }
}

// Get contextual outcome message based on modifier and success
function getContextualOutcomeMessage(modifierCard, success, tricksSuccess) {
    const outcomes = {
        "Perfect Timing": {
            success: "The filmer caught every detail of your perfect landing!",
            failure: "Great angle, but couldn't quite pull it off this time."
        },
        "Clean Approach": {
            success: "Perfect setup led to a butter landing!",
            failure: "Great approach, but couldn't stick the landing."
        },
        "Rough Approach": {
            success: "Somehow made it work despite the sketchy setup!",
            failure: "The rough approach made it too difficult to land clean."
        },
        "Locked In": {
            success: "Total commitment paid off with a perfect make!",
            failure: "Full send, but sometimes that's not enough."
        },
        "Crowd Hyped": {
            success: "The crowd erupts as you stomp it clean!",
            failure: "The crowd was behind you, but it wasn't meant to be."
        },
        "Flow State": {
            success: "Everything clicked perfectly - flawless execution!",
            failure: "Almost had that flow state, but lost it at the end."
        },
        "In the Zone": {
            success: "Locked in and landed it perfectly!",
            failure: "Even in the zone, this one was too difficult."
        },
        "Adrenaline Rush": {
            success: "Pure adrenaline carried you to a perfect landing!",
            failure: "Adrenaline wasn't enough to overcome the difficulty."
        }
    };
    
    const cardOutcomes = outcomes[modifierCard.name];
    if (cardOutcomes) {
        return cardOutcomes[success ? 'success' : 'failure'];
    }
    
    // Default contextual messages
    if (success) {
        return "Despite the conditions, you managed to land it clean!";
    } else {
        return "The conditions made it too difficult to pull off.";
    }
}

// Apply modifier card effects to dice roll
function applyModifierCard(rolls, sum, modifierCard) {
    let modifiedSum = sum;
    let needsReroll = false;
    let pointsMultiplier = 1;
    
    switch (modifierCard.effect) {
        case 'add':
            modifiedSum += modifierCard.value;
            break;
        case 'subtract':
            modifiedSum = Math.max(2, modifiedSum - modifierCard.value); // Never go below 2
            break;
        case 'multiply':
            modifiedSum = Math.round(modifiedSum * modifierCard.value);
            break;
        case 'minimum':
            modifiedSum = Math.max(modifiedSum, modifierCard.value);
            break;
        case 'reroll':
            needsReroll = true;
            break;
        case 'double_points':
            pointsMultiplier = 2;
            break;
    }
    
    return {
        modifiedSum: modifiedSum,
        needsReroll: needsReroll,
        pointsMultiplier: pointsMultiplier,
        originalSum: sum
    };
}

function updateSpotPoints() {
    document.getElementById('spotPoints').textContent = `Spot Points: ${GameState.spotPoints}`;
}

// Utility functions for button management
function enableAllButtons() {
    document.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
}

function disableAllButtonsExceptPopup() {
    document.querySelectorAll('button').forEach(button => {
        if (!button.closest('.popup-content')) {
            button.disabled = true;
        }
    });
}