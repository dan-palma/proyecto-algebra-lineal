
document.getElementById('matriztama').addEventListener('input', creatematrizinput);

function creatematrizinput() {
    const matriztama = parseInt(document.getElementById('matriztama').value); 
    const matrizinput = document.getElementById('matrizinput'); 
    matrizinput.innerHTML = '';

    for (let i = 0; i < matriztama; i++) {
        for (let j = 0; j < matriztama; j++) {
            const input = document.createElement('input'); 
            input.setAttribute('type', 'numero');
            input.setAttribute('id', `input_${i}_${j}`);
            input.setAttribute('placeholder', `Elemento ${i + 1},${j + 1}`);
            matrizinput.appendChild(input);
        }
        matrizinput.appendChild(document.createElement('br'));
    }
}

document.getElementById('calcularboton').addEventListener('click', calculateInverse);

function calculateInverse() {
    const matriztama = parseInt(document.getElementById('matriztama').value);
    const matrice = [];

    for (let i = 0; i < matriztama; i++) {
        const row = [];
        for (let j = 0; j < matriztama; j++) {
            const input = document.getElementById(`input_${i}_${j}`);
            row.push(parseFloat(input.value));
        }
        matrice.push(row);
    }

    try {
        const inverse = numeric.inv(matrice); 
        displayResult(inverse);               
    } catch (error) {
        displayResult("La matriz no tiene inversa.");
    }
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Resultado: <br>';
    if (typeof result === 'string') {
        resultDiv.innerHTML += result;
    } else {
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                resultDiv.innerHTML += result[i][j] + ' ';
            }
            resultDiv.innerHTML += '<br>';
        }
    }
}