function storeUserScores(totalScore, spotPoints) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = {
        date: new Date().toLocaleString(),
        totalScore: totalScore,
        spotPoints: spotPoints
    };
    highScores.push(newScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayPreviousRuns() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const previousRunsList = document.getElementById('previousRunsList');
    previousRunsList.innerHTML = '';

    highScores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `Date: ${score.date}, Total Score: ${score.totalScore}, Spot Points: ${score.spotPoints}`;
        previousRunsList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayPreviousRuns();
});