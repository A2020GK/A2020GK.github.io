const sizeInput = document.getElementById("size");
const sizeOutput = document.getElementById("sizeO");
const sizeExmpl = document.getElementById("sexmpl");
const sizeRExmpl = document.getElementById("srexmpl");
const sizeiInput = document.getElementById("sizei");
const sizeiOutput = document.getElementById("sizeio");

let size = get("size") ?? 32;
let maze = get("width") ?? 5;


let max = calculateMapBlock(innerWidth, innerHeight, size);

sizeInput.value = size;
sizeOutput.innerHTML = size;
sizeExmpl.style.width = `${size}px`;
sizeExmpl.style.height = `${size}px`;
sizeRExmpl.style.width = `${maze * size}px`;
sizeRExmpl.style.height = `${maze * size}px`;
sizeiInput.value = maze;
sizeiInput.max = Math.floor(innerHeight / size);
sizeiOutput.innerHTML = maze;

sizeInput.addEventListener("input", function (e) {
    max = calculateMapBlock(innerWidth, innerHeight, size);
    size = sizeInput.value;
    sizeOutput.innerHTML = size;
    sizeExmpl.style.width = `${size}px`;
    sizeExmpl.style.height = `${size}px`;
    sizeiInput.max = max.x;
    sizeRExmpl.style.width = `${maze * size}px`;
    sizeRExmpl.style.height = `${maze * size}px`;
    sizeiInput.max = Math.floor(innerHeight / size)
});
sizeiInput.addEventListener("input", function (e) {
    maze = sizeiInput.value;
    sizeiOutput.innerHTML = maze;
    sizeRExmpl.style.width = `${maze * size}px`;
    sizeRExmpl.style.height = `${maze * size}px`;
});
addEventListener("keypress", function (e) {
    if (e.code == "KeyP") location.href = `maze.html?size=${size}&width=${maze}`;
});