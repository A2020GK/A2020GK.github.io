const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const range=document.getElementById("width");

canvas.width=innerHeight*0.75;
canvas.height=innerHeight*0.75;

let iter=5;
function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    sTriangle(ctx,0,0,canvas.width,iter);
}

range.addEventListener("change",function(e) {
    iter=this.value;
    render();
});
render();