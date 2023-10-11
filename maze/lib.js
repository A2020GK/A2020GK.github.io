function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
function calculateMapBlock(x, y, size) {
    return {
        x: Math.floor(x / size),
        y: Math.floor(y / size),
    }
}
function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function log(str) {
    console.log(str);
}
function debug(str) {
    log(`[Debug] ${str}`);
}
function error(str) {
    console.error(`[Error] ${str}`);
}