let botones = document.querySelectorAll("button");
let operacionPantalla = document.querySelector("#operacion");
let resultadoPantalla = document.querySelector("p#resultado");

botones.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    if (boton.value === "DEL") {
      operacionPantalla.innerHTML = operacionPantalla.innerHTML.slice(0, -1);
    } else if (boton.value === "=") {
      calcular();
    } else {
      operacionPantalla.innerHTML += event.target.value;
    }
  });
});

function calcular() {
  let cadena = operacionPantalla.innerHTML;
  //Separo los números de los operadores
  let numerosYOperadores = separarNumerosOperadores(cadena);
  let [a, b, operacion] = numerosYOperadores;
  let resultado = 0;

  switch (operacion) {
    case "+":
      resultado = Number(a) + Number(b);
      break;
    case "-":
      resultado = a - b;
      break;
    case "*":
      resultado = a * b;
      break;
    case "/":
      resultado = a / b;
      break;
  }

  resultadoPantalla.innerHTML = resultado;
}

function separarNumerosOperadores(cadena) {
  let numerosYOperadores = [];

  //Primero me fijo que sea una operación válida
  const operacionRegex =
    /^([-]?[0-9]+[\.]?[0-9]*)[\+\*-\/]([-]?[0-9]+[\.]?[0-9]*)$/g;

  if (operacionRegex.test(cadena) === true) {
    //Regex para separar los números de las operaciones, busco un número seguido de un operador, lo que implica que es la división
    const separador = /[0-9][\+\*\/\-]/g;
    //Busco esto en la cadena
    const match = separador.exec(cadena);

    //Separo los números de la operación teniendo en cuenta el index del operador
    numerosYOperadores.push(cadena.slice(0, match.index + 1));
    numerosYOperadores.push(cadena.slice(match.index + 2));

    //Tomo la operación
    let operacion = match[0].charAt(1);
    numerosYOperadores.push(operacion);
    //Retorno el array con los 3 elementos de la operación
    return numerosYOperadores;
  } else {
    resultadoPantalla.innerHTML = "Formato de cálculo erróneo";
    return;
  }
}
