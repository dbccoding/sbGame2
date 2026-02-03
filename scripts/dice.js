// Initialize trickAttempts, totalScore, and rollingTotal
if (typeof window.trickAttempts === 'undefined') {
    window.trickAttempts = 0;
}
if (typeof window.totalScore === 'undefined') {
    window.totalScore = 0;
}
if (typeof window.rollingTotal === 'undefined') {
    window.rollingTotal = 0;
}

// Function to simulate rolling dice
function rollDice(numDice) {
    if (![2, 3, 4].includes(numDice)) {
        throw new Error("Invalid number of dice. Please choose 2, 3, or 4 dice.");
    }

    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }

    // Store the rolls in localStorage
    localStorage.setItem('diceRolls', JSON.stringify(rolls));

    // Record the Trick Attempt
    recordTrickAttempt(rolls);

    return rolls;
}

// Function to sum the values of the dice rolls
function sumDiceRolls(rolls) {
    return rolls.reduce((sum, roll) => sum + roll, 0);
}

// Function to record a 'Trick Attempt' with a unique ID
function recordTrickAttempt(rolls) {
    const trickAttempts = JSON.parse(localStorage.getItem('trickAttempts')) || [];
    const uniqueID = `trick_${Date.now()}`;
    trickAttempts.push({ id: uniqueID, rolls: rolls });
    localStorage.setItem('trickAttempts', JSON.stringify(trickAttempts));
}

// Function to calculate spot points
function calculateSpotPoints(numDice, sum) {
    let points = 0;
    if (numDice === 2 && sum > 8) {
        points = 1;
    } else if (numDice === 3 && sum > 12) {
        points = 2;
    } else if (numDice === 4 && sum > 16) {
        points = 3;
    }
    return points;
}

// Function to check for all 6s or all 1s
function checkSpecialRolls(rolls) {
    const allSixes = rolls.every(roll => roll === 6);
    const allOnes = rolls.every(roll => roll === 1);
    let message = '';

    if (allSixes) {
        message = '<p>Nailed it! WOW!</p>';
    } else if (allOnes) {
        message = '<p>BAIL. You good bro?</p>';
    }

    return { allSixes, allOnes, message };
}

// Function to display the results in a popup
function displayResultsPopup(originalRolls, modifiedRolls, originalSum, finalSum, points, requiredRoll, success, modifierCard, combo, comboUnlocked, autoSuccess) {
    const { allSixes, allOnes, message } = checkSpecialRolls(originalRolls);
    
    let comboHTML = '';
    if (combo) {
        comboHTML = `
            <div class="combo-result ${combo.rarity}">
                <div class="combo-header">
                    <h3>🏆 ${combo.title}</h3>
                    <span class="combo-rarity">${combo.rarity.toUpperCase()}</span>
                </div>
                <p class="combo-desc">${combo.description}</p>
                ${comboUnlocked ? '<p class="new-title">🎉 NEW TITLE!</p>' : '<p class="repeat-title">Already unlocked</p>'}
            </div>
        `;
    }
    
    // Show dice and calculation in a compact horizontal layout
    const diceHTML = `
        <div class="roll-result">
            <div class="dice-display">
                ${originalRolls.map(roll => `<img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image">`).join('')}
            </div>
            <div class="calculation">
                <div class="calc-line">
                    <span class="label">Roll:</span>
                    <span class="value">${originalSum}</span>
                </div>
                ${originalRolls !== modifiedRolls ? `
                    <div class="calc-line bonus">
                        <span class="label">+ Super Bonus:</span>
                        <span class="value">${sumDiceRolls(modifiedRolls) - originalSum}</span>
                    </div>
                    <div class="calc-line">
                        <span class="label">= Modified:</span>
                        <span class="value">${sumDiceRolls(modifiedRolls)}</span>
                    </div>
                ` : ''}
                ${originalSum !== finalSum && !combo ? `
                    <div class="calc-line modifier">
                        <span class="label">After Modifier:</span>
                        <span class="value">${finalSum}</span>
                    </div>
                ` : ''}
                <div class="calc-line required">
                    <span class="label">Required:</span>
                    <span class="value">${requiredRoll}</span>
                </div>
            </div>
        </div>
    `;
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content compact">
            ${comboHTML}
            
            <div class="content-row">
                <div class="left-col">
                    ${diceHTML}
                    ${autoSuccess ? '<div class="auto-success-badge">🎯 AUTO SUCCESS!</div>' : ''}
                </div>
                
                <div class="right-col">
                    <div class="modifier-card-compact">
                        <h4>${modifierCard.name}</h4>
                        <p>${modifierCard.description}</p>
                        <div class="contextual-outcome">
                            <em>${getContextualOutcomeMessage(modifierCard, success, true)}</em>
                        </div>
                    </div>
                    
                    <div class="result-status ${success ? 'success' : 'failure'}">
                        <h3>${success ? '✓ LANDED!' : '✗ BAILED'}</h3>
                        ${points > 0 ? `<p>+${points} Point${points > 1 ? 's' : ''}!</p>` : ''}
                    </div>
                </div>
            </div>
            
            ${message}
            
            <div class="button-row">
                <button class="button primary" onclick="moveToNextSpot()">
                    ${GameState.currentSpotIndex + 1 >= GameState.selectedSpots.length ? 'Finish Session' : 'Next Spot'}
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    disableAllButtons();
}

function disableAllButtons() {
    document.querySelectorAll('button').forEach(button => {
        if (!button.closest('.popup-content')) {
            button.disabled = true;
        }
    });
}

// Function to handle dice rolling and displaying results
function handleRollDice(numDice) {
    const rolls = rollDice(numDice);
    let sum = sumDiceRolls(rolls);
    let modifiedRolls = [...rolls];
    let autoSuccess = false;
    let comboPointsMultiplier = 1;
    let comboUnlocked = false;
    
    GameState.trickAttempts++;
    
    // Check for famous combo and apply super bonus
    if (GameState.currentCombo) {
        const superBonusResult = applySuperBonus(rolls, GameState.currentCombo.superBonus);
        modifiedRolls = superBonusResult.modifiedRolls;
        autoSuccess = superBonusResult.autoSuccess;
        comboPointsMultiplier = superBonusResult.pointsMultiplier;
        
        // Recalculate sum if rolls were modified
        if (modifiedRolls !== rolls) {
            sum = sumDiceRolls(modifiedRolls);
        }
        
        // Unlock achievement
        comboUnlocked = unlockAchievement(GameState.currentCombo);
    }
    
    // Draw modifier card
    currentModifierCard = drawRandomModifierCard();
    
    // Apply modifier effects (unless auto-success from combo)
    let modifierResult;
    if (!autoSuccess) {
        modifierResult = applyModifierCard(modifiedRolls, sum, currentModifierCard);
        
        // Handle reroll case
        if (modifierResult.needsReroll) {
            displayModifierRerollPopup(modifiedRolls, sum, currentModifierCard, numDice);
            return;
        }
    } else {
        // Skip modifier effects for auto-success
        modifierResult = {
            modifiedSum: sum,
            needsReroll: false,
            pointsMultiplier: 1,
            originalSum: sum
        };
    }
    
    // Check if roll beats the required minimum
    const requiredRoll = getMinimumRoll(numDice, currentTrickCard);
    const finalSum = modifierResult.modifiedSum;
    const success = autoSuccess || finalSum >= requiredRoll;
    
    // Calculate points
    let points = 0;
    if (success) {
        points = 1; // Base spot point for success
        const { allSixes } = checkSpecialRolls(rolls);
        if (allSixes) {
            points += 1; // Bonus for perfect roll
        }
        points *= modifierResult.pointsMultiplier; // Apply modifier multipliers
        points *= comboPointsMultiplier; // Apply combo multipliers
    }
    
    GameState.spotPoints += points;
    updateSpotPoints();
    
    // Record the attempt
    const currentSpot = getCurrentSpot();
    const resultsList = document.getElementById('resultsList');
    const resultItem = document.createElement('li');
    
    // Show original vs modified rolls if different
    const rollsHTML = rolls !== modifiedRolls ? 
        `${rolls.map(roll => `<img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image">`).join(' ')} → ${modifiedRolls.map(roll => `<img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image">`).join(' ')}` :
        `${modifiedRolls.map(roll => `<img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image">`).join(' ')}`;
    
    resultItem.innerHTML = `
        <strong>${currentSpot.name}:</strong> 
        ${rollsHTML}
        = ${sum} ${modifierResult.originalSum !== modifierResult.modifiedSum ? `→ ${finalSum}` : ''} 
        ${success ? `✓ (+${points} pts)` : '✗'}
        ${GameState.currentCombo ? ` 🔥${GameState.currentCombo.rarity.toUpperCase()}🔥` : ''}
    `;
    resultsList.appendChild(resultItem);
    
    // Display results popup
    displayResultsPopup(rolls, modifiedRolls, sum, finalSum, points, requiredRoll, success, currentModifierCard, GameState.currentCombo, comboUnlocked, autoSuccess);
}

function displayModifierRerollPopup(rolls, sum, modifierCard, numDice) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Modifier Card</h2>
            <div class="modifier-card">
                <h3>${modifierCard.name}</h3>
                <p>${modifierCard.description}</p>
            </div>
            <h3>Original Roll</h3>
            <ul>
                ${rolls.map((roll, index) => `<li>Dice ${index + 1}: <img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image"></li>`).join('')}
            </ul>
            <p>Sum: ${sum}</p>
            <button class="button" onclick="rerollDice(${numDice})">Roll Again</button>
        </div>
    `;
    document.body.appendChild(popup);
    disableAllButtons();
}

function rerollDice(numDice) {
    // Remove current popup
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
    
    // Re-enable buttons and roll again
    enableAllButtons();
    
    // Roll again (this time without the reroll modifier)
    const rolls = rollDice(numDice);
    const sum = sumDiceRolls(rolls);
    
    // Check success normally (no modifier card on reroll)
    const requiredRoll = getMinimumRoll(numDice, currentTrickCard);
    const success = sum >= requiredRoll;
    
    let points = 0;
    if (success) {
        points = 1;
        const { allSixes } = checkSpecialRolls(rolls);
        if (allSixes) {
            points += 1;
        }
    }
    
    GameState.spotPoints += points;
    updateSpotPoints();
    
    // Record the attempt
    const currentSpot = getCurrentSpot();
    const resultsList = document.getElementById('resultsList');
    const resultItem = document.createElement('li');
    resultItem.innerHTML = `
        <strong>${currentSpot.name} (Reroll):</strong> 
        ${rolls.map(roll => `<img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image">`).join(' ')} 
        = ${sum} ${success ? `✓ (+${points} pts)` : '✗'}
    `;
    resultsList.appendChild(resultItem);
    
    // Show regular results popup
    displayResultsPopup(rolls, sum, sum, points, requiredRoll, success, { name: "Reroll", description: "Second chance!" });
}

// Function to handle dice rolling with a delay
function handleRollDiceWithDelay(numDice) {
    setTimeout(() => {
        handleRollDice(numDice);
    }, 1000);
}

function updateSpotPoints() {
    document.getElementById('spotPoints').textContent = `Spot Points: ${spotPoints}`;
}

function disableDiceButtons() {
    document.getElementById('diceButtons').style.display = 'none';
    document.getElementById('roll2DiceButton').disabled = true;
    document.getElementById('roll3DiceButton').disabled = true;
    document.getElementById('roll4DiceButton').disabled = true;
}

function showFinalScorePopup(spotPoints, trickAttempts) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    // Calculate performance rating
    let rating = '';
    let ratingClass = '';
    if (spotPoints >= 8) {
        rating = 'PRO STATUS! 🔥';
        ratingClass = 'pro-rating';
    } else if (spotPoints >= 6) {
        rating = 'AM FLOW 📈';
        ratingClass = 'am-rating';
    } else if (spotPoints >= 4) {
        rating = 'GETTING THERE 🛹';
        ratingClass = 'progress-rating';
    } else {
        rating = 'KEEP PRACTICING 💪';
        ratingClass = 'practice-rating';
    }
    
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Session Complete!</h2>
            
            <div class="final-stats">
                <h3>Your Performance</h3>
                <p><strong>Spots Attempted:</strong> ${GameState.selectedSpots.length}</p>
                <p><strong>Total Spot Points:</strong> ${spotPoints}/10</p>
                <p><strong>Success Rate:</strong> ${Math.round((spotPoints / 10) * 100)}%</p>
                
                <div class="performance-rating ${ratingClass}">
                    <h3>${rating}</h3>
                </div>
            </div>
            
            <div class="session-summary">
                <h4>Spots You Conquered:</h4>
                <div class="spots-completed">
                    ${GameState.selectedSpots.map((spotName, index) => {
                        const completed = index < GameState.currentSpotIndex || (index === GameState.currentSpotIndex && spotPoints > 0);
                        return `<span class="spot-badge ${completed ? 'completed' : 'missed'}">${spotName}</span>`;
                    }).join('')}
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="button primary" onclick="event.stopPropagation(); playAgain();">New Session</button>
                <button class="button" onclick="event.stopPropagation(); goHome();">Main Menu</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Disable non-popup buttons to prevent conflicts
    disableAllButtons();
}

function playAgain() {
    // Prevent event bubbling
    event?.stopPropagation();
    event?.preventDefault();
    
    // Remove ALL popups more aggressively
    document.querySelectorAll('.popup').forEach(popup => {
        popup.remove();
    });
    
    // Clear any popup-related styles that might persist
    document.body.classList.remove('popup-open');
    
    // Re-enable all buttons
    enableAllButtons();
    
    // Store the score
    storeUserScores(GameState.spotPoints, GameState.trickAttempts);
    
    // Reset game state
    GameState.selectedSpots = [];
    GameState.currentSpotIndex = 0;
    GameState.trickAttempts = 0;
    GameState.spotPoints = 0;
    GameState.isGameStarted = false;
    
    // Clear UI
    document.getElementById('resultsList').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    updateSpotPoints();
    
    // Use setTimeout to ensure DOM updates complete before showing spot selection
    setTimeout(() => {
        // Show spot selection again
        showSpotSelectionUI();
        
        // Update previous runs
        displayPreviousRuns();
    }, 10);
}

function goHome() {
    // Prevent event bubbling
    event?.stopPropagation();
    event?.preventDefault();
    
    // Remove ALL popups and enable buttons before navigation
    document.querySelectorAll('.popup').forEach(popup => {
        popup.remove();
    });
    document.body.classList.remove('popup-open');
    enableAllButtons();
    
    window.location.href = 'index.html';
}

// Add enableAllButtons function to dice.js for consistency
function enableAllButtons() {
    document.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
}

// Remove the old moveToNextSpot function - it's now in spots.js

// yet again, nothing change, no help at all
