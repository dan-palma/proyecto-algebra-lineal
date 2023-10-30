function multiplicarMatrices1() {
    const a00 = parseFloat(document.getElementById("a00").value);
    const a01 = parseFloat(document.getElementById("a01").value);
    const a10 = parseFloat(document.getElementById("a10").value);
    const a11 = parseFloat(document.getElementById("a11").value);
  
    const b00 = parseFloat(document.getElementById("b00").value);
    const b01 = parseFloat(document.getElementById("b01").value);
    const b10 = parseFloat(document.getElementById("b10").value);
    const b11 = parseFloat(document.getElementById("b11").value);
  
    // Realiza la multiplicación de matrices
    const resultA = a00 * b00 + a01 * b10;
    const resultB = a00 * b01 + a01 * b11;
    const resultC = a10 * b00 + a11 * b10;
    const resultD = a10 * b01 + a11 * b11;
  
    // Muestra el resultado en la página
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = `Resultado: [${resultA}, ${resultB}, ${resultC}, ${resultD}]`;
  }
    
 