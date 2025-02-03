const scoreDisplay = document.getElementById('score');
const scoreContainer = document.getElementById('score-container');
const photoDisplay = document.getElementById('photo');
const nameDisplay = document.getElementById('player-name');

const refreshButton = document.querySelector('#refresh-button');
const careerButton = document.querySelectorAll('.career-button');
const doubleButton = document.querySelectorAll('.double-button');
const tripleButton = document.querySelectorAll('.triple-button');
const quadrupleButton = document.getElementById('quadruple-button');
const quintupleButton = document.getElementById('quintuple-button');

let playerGoals;
let playerName;
let totalRows;
let list = [];
let score = 0;
let count = 0;

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/api/total')
        .then(response => response.json())
        .then(data => {
            totalRows = data.totalRows;
            generatePlayer(totalRows, list);
        });
})

function generatePlayer(totalRows, list) {
    let id;
    do {
        id = Math.floor(Math.random() * totalRows) + 1;
    } while (list.includes(id));

    list.push(id);
    fetch(`http://localhost:3000/api/player?id=${id}`)
        .then(response => response.json())
        .then(data => {
            nameDisplay.textContent = data[0].name;
            playerName = data[0].name;
            photoDisplay.src = data[0].photo_url;
            playerGoals = data[0].goals;
            count += 1; 
        });
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function checkWin() {
    if (score >= 10000) {
        scoreContainer.style.color = 'green';
        scoreDisplay.style.color = 'green';
    }
}

refreshButton.addEventListener('click', () => {
    score = 0;
    count = 0;
    list = [];
    updateScore();
    scoreContainer.style.color = 'black';
    scoreDisplay.style.color = 'red';

    generatePlayer(totalRows, list);

    careerButton.forEach((button) => {
        button.textContent = "Career";
        button.disabled = false;
    });

    doubleButton.forEach((button) => {
        button.textContent = "Double";
        button.disabled = false;
    });
    
    tripleButton.forEach((button) => {
        button.textContent = "Triple";
        button.disabled = false;
    });
    
    quadrupleButton.textContent = "Quadruple";
    quadrupleButton.disabled = false;
    quintupleButton.textContent = "Quintuple";
    quintupleButton.disabled = false;
});

careerButton.forEach((button) => {
    button.addEventListener('click', function() {
        score += playerGoals;
        updateScore();
        checkWin();
        this.disabled = true;
        this.textContent = "Career: " + playerName + " (" + playerGoals + ")";

        if (count < 10) {
            generatePlayer(totalRows, list);
        }
    });
});

doubleButton.forEach((button) => {
    button.addEventListener('click', function() {
        score += playerGoals * 2;
        updateScore();
        checkWin();
        this.disabled = true;
        this.textContent = "Double: " + playerName + " (" + (playerGoals * 2) + ")";

        if (count < 10) {
            generatePlayer(totalRows, list);
        }
    });
});

tripleButton.forEach((button) => {
    button.addEventListener('click', function() {
        score += playerGoals * 3;
        updateScore();
        checkWin();
        this.disabled = true;
        this.textContent = "Triple: " + playerName + " (" + (playerGoals * 3) + ")";
        
        if (count < 10) {
            generatePlayer(totalRows, list);
        }
    });
});

quadrupleButton.addEventListener('click', function() {
    score += playerGoals * 4;
    updateScore();
    checkWin();
    this.disabled = true;
    this.textContent = "Quadruple: " + playerName + " (" + (playerGoals * 4) + ")";
    
    if (count < 10) {
        generatePlayer(totalRows, list);
    }
});

quintupleButton.addEventListener('click', function() {
    score += playerGoals * 5;
    updateScore();
    checkWin();
    this.disabled = true;
    this.textContent = "Quintuple: " + playerName + " (" + (playerGoals * 5) + ")";
    
    if (count < 10) {
        generatePlayer(totalRows, list);
    }
});


