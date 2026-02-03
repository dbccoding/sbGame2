function storeUserScores(spotPoints, trickAttempts) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = {
        date: new Date().toLocaleString(),
        spotPoints: spotPoints,
        trickAttempts: trickAttempts,
        spotsPlayed: GameState.selectedSpots.length,
        successRate: Math.round((spotPoints / GameState.selectedSpots.length) * 100)
    };
    highScores.push(newScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayPreviousRuns() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const previousRunsList = document.getElementById('previousRunsList');
    
    if (!previousRunsList) return; // Element might not exist on index page
    
    previousRunsList.innerHTML = '';

    // Show most recent 5 sessions
    const recentScores = highScores.slice(-5).reverse();
    
    recentScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="session-summary">
                <strong>Session ${highScores.length - index}</strong> - ${score.date}<br>
                <span class="score-details">
                    ${score.spotPoints}/${score.spotsPlayed} spots (${score.successRate}% success rate)
                </span>
            </div>
        `;
        previousRunsList.appendChild(listItem);
    });
    
    if (recentScores.length === 0) {
        const listItem = document.createElement('li');
        listItem.innerHTML = '<em>No sessions completed yet. Start your first session!</em>';
        previousRunsList.appendChild(listItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayPreviousRuns();
});