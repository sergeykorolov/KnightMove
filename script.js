var chessField = [];
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
var possibleMoves = document.getElementsByClassName("possibleMoves")[0];
var currentPosition;

//заполняем массив коорндинатами ячеек как на шахмотной доске
for (var i = 0; i < 8; i++) {
    chessField[i] = [];
    for (var j = 0; j < 8; j++) {
        chessField[i][j] = alphabet[j] + (8 - i);
    }
}

//разбор введенноо исходного положения
function parseInput() {

    var arrayMoves;
    var positionInput = document.getElementById("currentPosition");

    // преобразование строки в верхний регистр, чтобы можно было вводить координаты и с большой и с маленькой буквы
    currentPosition = positionInput.value.toUpperCase();

    //если ввод корректный и функция inputValidation() возвращает true, то
    if (inputValidation()) {
        var y;
        var x;
        // находим нужную ячейку в двумерном массиве
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (chessField[i][j] === currentPosition) {
                    y = i;
                    x = j;
                }
            }
        }
        positionInput.value = "";  // очищаем строку ввода
        arrayMoves = moves(y, x);
        possibleMoves.innerHTML = arrayMoves.toString().replace(/,/g, " ");
    }
    document.getElementsByClassName("popup")[0].style.display = "block";
}

// Определяем возможные ходы и записываем их в массив
function moves(y, x) {

    var possibleMoves = [];

    if (y - 2 >= 0 && x - 1 >= 0) {
        possibleMoves.push(chessField[y - 2][x - 1]);
    }
    if (y - 2 >= 0 && x + 1 < 8) {
        possibleMoves.push(chessField[y - 2][x + 1]);
    }
    if (y - 1 >= 0 && x - 2 >= 0) {
        possibleMoves.push(chessField[y - 1][x - 2]);
    }
    if (y - 1 >= 0 && x + 2 < 8) {
        possibleMoves.push(chessField[y - 1][x + 2]);
    }
    if (y + 1 < 8 && x - 2 >= 0) {
        possibleMoves.push(chessField[y + 1][x - 2]);
    }
    if (y + 1 < 8 && x + 2 < 8) {
        possibleMoves.push(chessField[y + 1][x + 2]);
    }
    if (y + 2 < 8 && x - 1 >= 0) {
        possibleMoves.push(chessField[y + 2][x - 1]);
    }
    if (y + 2 < 8 && x + 1 < 8) {
        possibleMoves.push(chessField[y + 2][x + 1]);
    }
    return possibleMoves;
}

// Проверка корректности ввода
function inputValidation() {

    var firstChar = currentPosition.charAt(0);
    var column = alphabet.indexOf(firstChar);
    var row = parseInt(currentPosition.charAt(1));

    if (currentPosition === null || currentPosition.length !== 2 || isNaN(row)) {
        possibleMoves.innerHTML = "Неверный ввод! Введите букву(A-H) и число(1-8)";
        return false;
    } else if (row < 1 || row > 8 || column < 0 || column > 7) {
        possibleMoves.innerHTML = "Недопустимые координаты! Введите букву(A-H) и число(1-8)";
        return false;
    }
    return true;
}

//Убираем окно с вариантами ходов после нажатия на кнопку ОК
function buttonOk() {
    document.getElementsByClassName("popup")[0].style.display = "none";
}