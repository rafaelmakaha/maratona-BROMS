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

    draw(){
        const c = canvasSingleton.getInstance().getContext("2d");
        const ang = CONSTANTS.ang
        c.beginPath()
        
        const dx = -this.h * Math.tan(ang) / 2;
    
        c.lineWidth = 3
        c.strokeStyle = this.borderColor
        c.fillStyle = this.fillColor
    
        c.moveTo(this.x, this.y)
        c.lineTo(this.x + this.w, this.y)
        c.lineTo(this.x + this.w - dx, this.y - this.h)
        c.lineTo(this.x - dx, this.y - this.h)
        c.lineTo(this.x, this.y)
    
        c.fill()
        c.closePath()
        c.stroke()
        
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