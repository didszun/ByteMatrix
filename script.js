const Width = 8
const Height = 8

document.body.onload = function () {
    BuildMatrix()
    CalculateData()
}

function BuildMatrix() {
    const block = document.getElementById("blockmatrix")

    for (let h = 1; h <= Height; h++) {
        let innerblock = '';
        for (let w = 1; w <= Width; w++) {
            innerblock += '<div class="block inactive" onClick="Toggle(' + w + ',' + h + ');" id="' + h + '_' + w + '"></div>'
        }
        block.innerHTML += '<div class="blockwrapper" style="clear: both;">' + innerblock + '</div>'
    }
}

function CalculateData() {
    let btmatrix = document.getElementById("bitmatrix")
    let btarray = document.getElementById("bytearray")

    btmatrix.innerHTML = "";
    btarray.innerHTML = "";

    for (let h = 1; h <= Height; h++) {
        let thisline = ""
        for (let w = 1; w <= Width; w++) {
            thisline += (document.getElementById(h + "_" + w).classList.contains("active")) ? "1" : "0"
        }

        btmatrix.innerHTML += thisline + "<br/>"

        let by = parseInt(thisline, 2).toString(16).toUpperCase()
        if (by.length < 2) by = "0" + by;
        btarray.innerHTML += "0x" + by + ","
    }
}

function Toggle(x, y) {
    let px = document.getElementById(y + '_' + x);

    if (px.classList.contains("active")) {
        px.classList.remove("active")
        px.classList.add("inactive")
    } else if (px.classList.contains("inactive")) {
        px.classList.remove("inactive")
        px.classList.add("active")
    }
    CalculateData()
}

function ClearAll() {
    for (let h = 1; h <= Width; h++) {
        for (let w = 1; w <= Height; w++) {
            if (document.getElementById(h + '_' + w).classList.contains("active")) Toggle(w, h);
        }
    }
}

function FillAll() {
    for (let h = 1; h <= Width; h++) {
        for (let w = 1; w <= Height; w++) {
            if (document.getElementById(h + '_' + w).classList.contains("inactive")) Toggle(w, h);
        }
    }
}

function Invert() {
    for (let h = 1; h <= Width; h++) {
        for (let w = 1; w <= Height; w++) {
            Toggle(w, h);
        }
    }
}

function Rotate() {

    let binary = document.getElementById("bitmatrix").innerHTML + "";

    binary = binary.replaceAll("<br>", "")
    let bin = binary.split("")

    let c = 0

    let matrix = createMatrix(Height);

    for (let y = 0; y < Height; y++) {

        for (let x = 0; x < Width; x++) {
            matrix[y][x] = parseInt(bin[c])
            c++;
        }
    }

    matrix = rotateMatrix(matrix)

    for (let h = 0; h < Height; h++) {
        for (let w = 0; w < Width; w++) {

            let px = document.getElementById((h + 1) + '_' + (w + 1));

            if (parseInt(matrix[h][w]) === parseInt("0")) {
                px.classList.remove("active")
                px.classList.add("inactive")
            } else {
                px.classList.remove("inactive")
                px.classList.add("active")
            }
        }
    }

    CalculateData()
}

function createMatrix(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }

    return arr;
}

function rotateMatrix(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    matrix.length = 0;
    matrix.push(...result);
    return matrix;
}