const Spots = [
    "Wallenburg",
    "MACBA",
    "Lyon 25",
    "South Bank",
    "West LA Courthouse",
    "El Toro",
    "Brooklyn Banks",
    "Hollywood High",
    "Carlsbad Gap",
    "Leap of Faith",
    "Love Park",
    "China Banks",
    "Embarcadero",
    "Hubba Hideout",
    "Rincon",
    "Sunset Carwash",
    "Burnside",
    "J Kwon",
    "Pyramid Ledges",
    "Pier 7"
];

let spotPoints = 0;

document.addEventListener('DOMContentLoaded', () => {
    const spotSelect = document.getElementById('spotSelect');
    Spots.forEach(spot => {
        const option = document.createElement('option');
        option.value = spot;
        option.textContent = spot;
        spotSelect.appendChild(option);
    });
    updateSpotPoints();
});

function enableHitTheSpotButton() {
    document.getElementById('hitTheSpotButton').disabled = false;
}

function enableDiceButtons() {
    document.getElementById('diceButtons').style.display = 'flex';
    document.getElementById('roll2DiceButton').disabled = false;
    document.getElementById('roll3DiceButton').disabled = false;
    document.getElementById('roll4DiceButton').disabled = false;
    document.getElementById('hitTheSpotButton').disabled = true;
}

function disableDiceButtons() {
    document.getElementById('diceButtons').style.display = 'none';
    document.getElementById('roll2DiceButton').disabled = true;
    document.getElementById('roll3DiceButton').disabled = true;
    document.getElementById('roll4DiceButton').disabled = true;
    document.getElementById('hitTheSpotButton').disabled = true;
}

function handleRollDice(numDice) {
    if (typeof window.trickAttempts === 'undefined') {
        window.trickAttempts = 0;
    }

    const rolls = rollDice(numDice);
    const sum = sumDiceRolls(rolls);
    window.trickAttempts++;

    const selectedSpot = document.getElementById('spotSelect').value;
    const resultsList = document.getElementById('resultsList');
    const resultItem = document.createElement('li');
    resultItem.textContent = `Spot: ${selectedSpot}, Rolls: ${rolls.join(', ')}, Sum: ${sum}`;
    resultsList.appendChild(resultItem);

    // Calculate spot points
    let points = 0;
    if (numDice === 2 && sum > 8) {
        points = 1;
    } else if (numDice === 3 && sum > 12) {
        points = 2;
    } else if (numDice === 4 && sum > 16) {
        points = 3;
    }

    // Check for all 6s or all 1s
    const allSixes = rolls.every(roll => roll === 6);
    const allOnes = rolls.every(roll => roll === 1);
    let message = '';

    if (allSixes) {
        points += 1;
        message = '<p>Nailed it! WOW!</p>';
    } else if (allOnes) {
        message = '<p>BAIL. You good bro?</p>';
    }

    spotPoints += points;
    updateSpotPoints();

    // Display the results
    const results = document.getElementById('results');
    results.innerHTML = '<ul>';
    rolls.forEach((roll, index) => {
        results.innerHTML += `<li>Dice ${index + 1}: ${roll}</li>`;
    });
    results.innerHTML += `<li><strong>Sum of rolls: ${sum}</strong></li>`;
    results.innerHTML += '</ul>' + message;

    document.getElementById('results').innerHTML = `
        <p>Rolls: ${rolls.join(', ')}</p>
        <p>Sum of rolls: ${sum}</p>
        <p>Trick Attempts: ${window.trickAttempts}/10</p>
    `;

    if (window.trickAttempts >= 10) {
        disableDiceButtons();
        showFinalScorePopup(sum, spotPoints);
    } else {
        disableDiceButtons();
    }
}

function updateSpotPoints() {
    document.getElementById('spotPoints').textContent = `Spot Points: ${spotPoints}`;
}