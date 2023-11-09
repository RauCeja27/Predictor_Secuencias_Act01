const probabilityMap = {
    '000': { '0': 0, '1': 3 },
    '001': { '0': 10, '1': 5 },
    '010': { '0': 13, '1': 18 },
    '011': { '0': 5, '1': 2 },
    '100': { '0': 3, '1': 12 },
    '101': { '0': 20, '1': 3 },
    '110': { '0': 2, '1': 5 },
    '111': { '0': 2, '1': 1 },
};

function makePrediction(sequence, trainingSet) {
    let computerGuesses = '';
    let correctGuesses = 0;
    
    const trainingLength = 3; // Longitud de la secuencia de entrenamiento
    const testLength = sequence.length - trainingLength; // Longitud de la secuencia de prueba

    
    for (let i = 0; i < testLength; i++) {
        const trainingSequence = sequence.substring(i, i + trainingLength);
        const nextBit = trainingSet[trainingSequence] && trainingSet[trainingSequence]['1'] > trainingSet[trainingSequence]['0'] ? '1' : '0';
        computerGuesses += nextBit;
        
        if (nextBit === sequence[i + trainingLength]) {
            correctGuesses++;
        }
    }
    
    return {
        computerGuesses,
        correctGuesses,
        accuracy: (correctGuesses / testLength) * 100,
    };
}

const form = document.getElementById('sequence-form');
const input = document.getElementById('sequence-input');
const resultSection = document.getElementById('result-section');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const sequence = input.value;
    
    if (/^[01]+$/.test(sequence) && sequence.length > 3) {
        const result = makePrediction(sequence, probabilityMap);
        const resultText = `Predictions: ${result.computerGuesses}<br>Computer guessed right ${result.correctGuesses} out of ${sequence.length - 3} symbols (${result.accuracy.toFixed(2)} %)`;
        resultSection.innerHTML = resultText;
    } else {
        resultSection.innerHTML = 'La secuencia debe contener solo ceros (0) y unos (1) y tener más de 3 dígitos.';
    }
});