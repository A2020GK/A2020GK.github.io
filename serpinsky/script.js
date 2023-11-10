const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const range=document.getElementById("width");
const ranger=document.getElementById("widthr");

canvas.width=innerHeight*0.75;
canvas.height=innerHeight*0.75;

let iter=5;
function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let width=canvas.height/iter;
    for(let y=iter;y>0;y--) {
        for(let x=y;x>0;x--) {
            let iterCof=iter-y;
            let rx=x*width+(iterCof*width)/2;
            sTriangle(ctx,rx-width,y*width-width,width);
        }
    }
}

range.addEventListener("input",function(e) {
    iter=this.value;
    ranger.innerHTML=iter;
    render();
});
render();