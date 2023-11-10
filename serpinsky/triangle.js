function triangle(ctx,x,y,width) {
    ctx.beginPath();
    ctx.moveTo(x,y+width);
    ctx.lineTo(x+width,y+width);
    ctx.lineTo(x+width/2,y);
    ctx.closePath();
    ctx.stroke();
}
function sTriangle(ctx,x,y,width) {
    triangle(ctx,x,y+width/2,width/2);
    triangle(ctx,x+width/2,y+width/2,width/2);
    triangle(ctx,x+width/4,y,width/2);
}