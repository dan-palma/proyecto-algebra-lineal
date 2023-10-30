

// Obtener los elementos del formulario y el resultado
const form = document.getElementById('equationForm');
const result = document.getElementById('result');

// resolver con la Regla de Cramer
function solveWithCramer() {
    const a = [];
    const b = [];

    // coeficientes ingresados por el usuario
    for (let i = 1; i <= 3; i++) {
        const ai = [];
        for (let j = 1; j <= 3; j++) {
            const coef = parseFloat(form['a' + i + j].value);
            ai.push(isNaN(coef) ? 0 : coef);
        }
        a.push(ai);
        const term = parseFloat(form['b' + i].value);
        b.push(isNaN(term) ? 0 : term);
    }

    // Verifica las ecuaciones se han llenado
    let n = 0;
    for (let i = 0; i < 3; i++) {
        if (a[i].some(coef => coef !== 0) || b[i] !== 0) {
            n++;
        }
    }

    // Resolver el sistema según el número de ecuaciones ingresadas
    if (n === 2) {
        // Sistema 2x2
        // Calcula el determinante principal
        const delta = a[0][0] * a[1][1] - a[0][1] * a[1][0];
        if (delta === 0) {
            result.innerHTML = 'El sistema no tiene solución única (delta = 0).';
        } else {
            const x = (b[0] * a[1][1] - a[0][1] * b[1]) /delta;
            const y= (a[0][0] * b[1] - b[0] * a[1][0]) / delta;
            result.innerHTML = `Resultado de Cramer: x = ${x}, y = ${y}`;
        }
    } else if (n === 3) {
            // Sistema 3x3
        const delta = 
            a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
            a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
            a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
            
        if (delta === 0) {
            result.innerHTML = 'El sistema no tiene solución única (delta = 0).';
         } else {
            const x = (b[0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) - a[0][1] * (b[1] * a[2][2] - a[1][2] * b[2]) + a[0][2] * (b[1] * a[2][1] - a[1][1] * b[2])) / delta;
            const y = (a[0][0] * (b[1] * a[2][2] - a[1][2] * b[2]) - b[0] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) + a[0][2] * (a[1][0] * b[2] - b[1] * a[2][0])) / delta;
            const z = (a[0][0] * (a[1][1] * b[2] - b[1] * a[2][1]) - a[0][1] * (a[1][0] * b[2] - b[1] * a[2][0]) + b[0] * (a[1][0] * a[2][1] - a[1][1] * a[2][0])) / delta;
        
            result.innerHTML = `Resultado de Cramer: x = ${x}, y = ${y}, <z> = ${z}`;
            }
        }
        
}

// Función para resolver con Gauss-Jordan
function solveWithGaussJordan() {
    const a = [];
    const b = [];

    // Obtener los coeficientes ingresados por el usuario
    for (let i = 1; i <= 3; i++) {
        const ai = [];
        for (let j = 1; j <= 3; j++) {
            const coef = parseFloat(form['a' + i + j].value);
            ai.push(isNaN(coef) ? 0 : coef);
        }
        a.push(ai);
        const term = parseFloat(form['b' + i].value);
        b.push(isNaN(term) ? 0 : term);
    }

    // Verificar cuántas ecuaciones se han llenado
    let n = 0;
    for (let i = 0; i < 3; i++) {
        if (a[i].some(coef => coef !== 0) || b[i] !== 0) {
            n++;
        }
    }

    // Resolver el sistema según el número de ecuaciones ingresadas
    if (n === 2) {
        // Sistema 2x2
        const matrix = [
            [a[0][0], a[0][1], b[0]],
            [a[1][0], a[1][1], b[1]]
        ];

        const rows = matrix.length;
        const cols = matrix[0].length;

        for (let i = 0; i < rows; i++) {
            let maxRow = i;
            for (let j = i + 1; j < rows; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                    maxRow = j;
                }
            }

            [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

            let scale = matrix[i][i];
            for (let j = i; j < cols; j++) {
                matrix[i][j] /= scale;
            }

            for (let k = 0; k < rows; k++) {
                if (k !== i) {
                    scale = matrix[k][i];
                    for (let j = i; j < cols; j++) {
                        matrix[k][j] -= scale * matrix[i][j];
                    }
                }
            }
        }

        // Las soluciones se encuentran en la última columna de la matriz
        const x = matrix[0][cols - 1];
        const y = matrix[1][cols - 1];

        result.innerHTML = `Resultado de Gauss-Jordan: x = ${x}, y = ${y}`;

    } else if (n === 3) {
        // Sistema 3x3
        const matrix = [
            [a[0][0], a[0][1], a[0][2], b[0]],
            [a[1][0], a[1][1], a[1][2], b[1]],
            [a[2][0], a[2][1], a[2][2], b[2]]
        ];

        const rows = matrix.length;
        const cols = matrix[0].length;

        for (let i = 0; i < rows; i++) {
            // Buscar la fila con el valor máximo en la columna actual
            let maxRow = i;
            for (let j = i + 1; j < rows; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                    maxRow = j;
                }
            }
    
            // Intercambiar filas para poner el valor máximo en la fila actual
            [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
    
            // Hacer que el elemento diagonal sea igual a 1
            let scale = matrix[i][i];
            for (let j = i; j < cols; j++) {
                matrix[i][j] /= scale;
            }
    
            // Hacer que todos los elementos debajo y encima de la diagonal sean igual a cero
            for (let k = 0; k < rows; k++) {
                if (k !== i) {
                    scale = matrix[k][i];
                    for (let j = i; j < cols; j++) {
                        matrix[k][j] -= scale * matrix[i][j];
                    }
                }
            }
        }
    
        // Las soluciones se encuentran en la última columna de la matriz
        const x = matrix[0][cols - 1];
        const y = matrix[1][cols - 1];
        const z = matrix[2][cols - 1];

        result.innerHTML = `Resultado de Gauss-Jordan: x = ${x}, y = ${y}, z = ${z}`;
    }
}

// Obtener una lista de todos los elementos de entrada en el formulario (celdas)
const inputElements = form.querySelectorAll('input');

// Agregar un controlador de eventos al botón "Eliminar Todo"
const deleteAllButton = document.getElementById('deleteAll');
deleteAllButton.addEventListener('click', () => {
    // Eliminar los datos de las celdas
    inputElements.forEach(input => {
        input.value = ''; // Vaciar el contenido de las celdas
    });

    // También, puedes limpiar el resultado
    result.innerHTML = ''; // Vaciar el contenido del resultado
});

// Asignar la función al botón de resolver con Gauss-Jordan
const gaussJordanButton = document.getElementById('solveGaussJordan');
gaussJordanButton.addEventListener('click', solveWithGaussJordan);
const cramerButton = document.getElementById('solveCramer');
cramerButton.addEventListener('click', solveWithCramer);