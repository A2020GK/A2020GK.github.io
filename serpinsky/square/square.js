function square(ctx,x,y,width) {
    ctx.fillRect(x,y,width,width);
}

function sSquare(ctx,x,y,width,iter) {
    if(iter>0) {
        iter--;
        sSquare(ctx,x,y,width/3,iter);
        sSquare(ctx,x+width/3,y,width/3,iter);
        sSquare(ctx,x+width/3*2,y,width/3,iter);
        
        sSquare(ctx,x,y+width/3,width/3,iter);
        sSquare(ctx,x+width/3*2,y+width/3,width/3,iter);

        sSquare(ctx,x,y+width/3*2,width/3,iter);
        sSquare(ctx,x+width/3,y+width/3*2,width/3,iter);
        sSquare(ctx,x+(width/3)*2,y+width/3*2,width/3,iter);
    } else {
        square(ctx,x,y,width/3);
        square(ctx,x+width/3,y,width/3);
        square(ctx,x+width/3*2,y,width/3);
        
        square(ctx,x,y+width/3,width/3);
        square(ctx,x+width/3*2,y+width/3,width/3);

        square(ctx,x,y+width/3*2,width/3);
        square(ctx,x+width/3,y+width/3*2,width/3);
        square(ctx,x+(width/3)*2,y+width/3*2,width/3);
    }
}