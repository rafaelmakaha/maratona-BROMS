import canvasSingleton from './Canvas.js'
import { CONSTANTS } from '../settings/constants.js';

class Parallelogram {
    constructor(Parent=undefined, x, y, wRel, h, text=undefined, fillColor='white', borderColor='black'){
        this.Parent = Parent;
        this.x = x;
        this.y = y;
        this.wRel = wRel;
        this.h = h;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.text = text;

        if(this.text) this.text.Parent = this;
        this.w = this.wRel * this.Parent.w;
    }

    setText(text, {selfAlign=this.text.selfAlign}={}){
        this.text.setText(text, selfAlign);
    }

    draw(){
        const ctx = canvasSingleton.getInstance().getContext();
        const ang = CONSTANTS.ang
        ctx.beginPath()
        
        const dx = -this.h * Math.tan(ang) / 2;
    
        ctx.lineWidth = 3
        ctx.strokeStyle = this.borderColor
        ctx.fillStyle = this.fillColor
    
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.w, this.y)
        ctx.lineTo(this.x + this.w - dx, this.y - this.h)
        ctx.lineTo(this.x - dx, this.y - this.h)
        ctx.lineTo(this.x, this.y)
    
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
        
        if(this.text){
            this.text.draw()
        }
    }

    update(x, y, {fillColor=this.fillColor}={}) {
        this.w = this.wRel * this.Parent.w;
        this.x = x;
        this.y = y;
        this.fillColor = fillColor;
    }
}

export default Parallelogram;