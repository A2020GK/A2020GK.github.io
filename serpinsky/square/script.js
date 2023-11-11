const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const range=document.getElementById("iter");
const ranger=document.getElementById("iterr");

canvas.width=innerHeight*0.75;
canvas.height=innerHeight*0.75;

let iter=0;
function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    sSquare(ctx,0,0,canvas.width,iter);
}

range.addEventListener("input",function(e) {
    iter=this.value;
    ranger.innerHTML=iter;
    render();
})
render();