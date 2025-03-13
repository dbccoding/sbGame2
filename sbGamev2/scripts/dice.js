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
function displayResultsPopup(rolls, sum, points, message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Roll Results</h2>
            <ul>
                ${rolls.map((roll, index) => `<li>Dice ${index + 1}: <img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image"></li>`).join('')}
            </ul>
            <p>Trick Value: ${sum}</p>
            ${points > 0 ? `<p>You scored ${points} spot points!</p>` : ''}
            ${message}
            <button class="button" onclick="moveToNextSpot()">Move to the next spot</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Disable all other buttons
    document.querySelectorAll('button').forEach(button => {
        if (!button.classList.contains('popup-content')) {
            button.disabled = true;
        }
    });
}

// Function to handle dice rolling and displaying results
function handleRollDice(numDice) {
    const rolls = rollDice(numDice);
    const sum = sumDiceRolls(rolls);
    window.trickAttempts++;
    window.totalScore += sum;
    window.rollingTotal += sum;
    localStorage.setItem('rollingTotal', window.rollingTotal);

    const selectedSpot = document.getElementById('spotSelect').value;
    const resultsList = document.getElementById('resultsList');
    const resultItem = document.createElement('li');
    resultItem.innerHTML = `Spot: ${selectedSpot}, Rolls: ${rolls.map(roll => `<img src="../assets/die${roll}.png" alt="Die ${roll}" class="dice-image">`).join(' ')}, Sum: ${sum}`;
    resultsList.appendChild(resultItem);

    let points = calculateSpotPoints(numDice, sum);
    const { allSixes, allOnes, message } = checkSpecialRolls(rolls);

    if (allSixes) {
        points += 1;
    }

    spotPoints += points;
    updateSpotPoints();

    displayResultsPopup(rolls, sum, points, message);

    if (window.trickAttempts >= 10) {
        disableDiceButtons();
        showFinalScorePopup(window.rollingTotal, spotPoints);
    }
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

function showFinalScorePopup(totalScore, spotPoints) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Game Over</h2>
            <p>Your final score is: ${totalScore}</p>
            <p>Your total spot points are: ${spotPoints}</p>
            <button class="button" onclick="playAgain()">Play Again</button>
            <button class="button" onclick="goHome()">Go Home</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function playAgain() {
    storeUserScores(window.rollingTotal, spotPoints);
    window.trickAttempts = 0;
    window.totalScore = 0;
    window.rollingTotal = 0;
    localStorage.setItem('rollingTotal', window.rollingTotal);
    spotPoints = 0;
    updateSpotPoints();
    document.getElementById('resultsList').innerHTML = '';
    document.getElementById('results').innerHTML = ''; // Clear the results display
    document.querySelector('.popup').remove();
    displayPreviousRuns(); // Update the previous runs section
}

function goHome() {
    window.location.href = 'index.html';
}

function moveToNextSpot() {
    // Enable all buttons
    document.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });

    // Remove the popup
    document.querySelector('.popup').remove();

    // Reset the spot selector dropdown
    document.getElementById('spotSelect').selectedIndex = 0;
    document.getElementById('hitTheSpotButton').disabled = true;
    document.getElementById('diceButtons').style.display = 'none';
}

// yet again, nothing change, no help at all
