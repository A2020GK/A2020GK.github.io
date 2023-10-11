log("Maze by Antony Karasev.")
log("v0.0.2");
let points = 0;
let doAuto=false;
debug("Getting canvas");
const canvas = document.getElementById("game");
debug("Getting rendering context")
const ctx = canvas.getContext("2d");
debug("Getting counter field")
const counter=document.getElementById("counteee");

debug("Reading parameters");
const size = get("size") ?? 32;
const mazes = get("width") ??5;

debug("Configuring canvas");
canvas.width = mazes*size;
canvas.height = mazes*size;

debug("Initializing player");
const player = {
    x: 0,
    y: 0,
}
function finishe() {
    player.x=finishPoint.x;
    player.y=finishPoint.y
    console.log("Warn! Cheating!")
}
function createNewFinishPoint() {
    debug("Creating finish point");
    finishPoint = {
        x: randomInt(0, mazes - 1),
        y: randomInt(0, mazes - 1)
    }
}
let finishPoint = {
    x: randomInt(0, mazes - 1),
    y: randomInt(0, mazes - 1)
}

debug("Initializing keyboard");
const controls = {
    keyboard: {
        w: false,
        a: false,
        s: false,
        d: false,
        press(e) {
            const code = e.code;
            if (code == "KeyP") location.href = `settings.html?size=${size}&width=${mazes}`;
            if (code == "KeyW") handleMovement(code);
            if (code == "KeyA") handleMovement(code);
            if (code == "KeyS") handleMovement(code);
            if (code == "KeyD") handleMovement(code);
        }
    }
}

debug(`IMPORTANT! Generating ${mazes}x${mazes} maze using Eller's algorythm`);
const maze = generateMaze(mazes, mazes).maze;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, mazes * size, mazes * size);
    for (let y = 0; y != maze.length; y++) {
        for (let x = 0; x != maze[y].length; x++) {
            let cell = maze[y][x];
            ctx.fillStyle = "black";
            if (cell.top) ctx.fillRect(x * size, y * size, size, 1);
            if (cell.right) ctx.fillRect(x * size + size, y * size, 1, size);
            if (cell.bottom) ctx.fillRect(x * size, y * size + size, size, 1);
            if (cell.left) ctx.fillRect(x * size, y * size, 1, size);
        }
    }
    ctx.fillStyle = "blue";
    ctx.fillRect(finishPoint.x * size + size / 4, finishPoint.y * size + size / 4, size / 2, size / 2)

    ctx.fillStyle = "red";
    ctx.fillRect(player.x * size + size / 4, player.y * size + size / 4, size / 2, size / 2);

    counter.innerHTML=points;
}


function handleMovement(dir) {
    let cango = {
        up: true,
        right: true,
        down: true,
        left: true
    }

    if (player.x - 1 < 0) cango.left = false; else {
        if (maze[player.y][player.x].left) cango.left = false;
    }
    if (player.x + 1 == maze[0].length) cango.right = false; else {
        if (maze[player.y][player.x].right) cango.right = false;
    }
    if (player.y - 1 < 0) cango.up = false; else {
        if (maze[player.y][player.x].top) cango.up = false;
    }
    if (player.y + 1 == maze.length) cango.down = false; else {
        if (maze[player.y][player.x].bottom) cango.down = false;
    }

    if (dir == "KeyW"|| dir=="up") if (cango.up) player.y--; else error("Cannot go up!");
    if (dir == "KeyD"||dir=="right") if (cango.right) player.x++; else error("Cannot go right!");
    if (dir == "KeyS"||dir=="bottom") if (cango.down) player.y++; else error("Cannot go down!");
    if (dir == "KeyA"||dir=="left") if (cango.left) player.x--; else error("Cannot go left!");
}

function game() {
    //finishe()
    if (player.x == finishPoint.x && player.y == finishPoint.y) {
        doAuto=false;
        createNewFinishPoint();
        points++;
    }
    render();
    requestAnimationFrame(game);
}

debug("Registering events");
addEventListener("keypress", controls.keyboard.press);
document.getElementById("bu").addEventListener("click",(e)=>{handleMovement("up")});
document.getElementById("br").addEventListener("click",(e)=>{handleMovement("right")})
document.getElementById("bl").addEventListener("click",(e)=>{handleMovement("left")})
document.getElementById("bd").addEventListener("click",(e)=>{handleMovement("bottom")})
document.getElementById("cnf").addEventListener("click",(e)=>{location.href = `settings.html?size=${size}&width=${mazes}`;});
debug("IMPORTANT! Launching the game");
game();