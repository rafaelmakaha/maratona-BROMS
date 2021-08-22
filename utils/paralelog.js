import canvasSingleton from '../models/Canvas.js'
import { CONTANTS } from '../settings/contants.js';

export const paralelog = (x,y,w,h, fillColor= 'white', borderColor = 'black', ) => {
    const c = canvasSingleton.getInstance().getContext("2d");
    const ang = CONTANTS.ang
    c.beginPath()
    
    const dx = h*Math.tan(ang) / 2;
  
    c.lineWidth = 3
    c.strokeStyle = borderColor
    c.fillStyle = fillColor
  
    c.moveTo(x,y)
    c.lineTo(x+w, y)
    c.lineTo(x + w - dx, y+h)
    c.lineTo(x - dx, y+h)
    c.lineTo(x,y)
  
    c.fill()
    c.closePath()
    c.stroke()
}