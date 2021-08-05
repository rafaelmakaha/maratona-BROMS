import canvasSingleton from '../models/Canvas.js'
import { CONTANTS } from '../settings/contants.js';

export const paralelog = (x,y,w,h, fillColor= 'silver', borderColor = 'black', ) => {
    const c = canvasSingleton.getInstance().getContext("2d");
    const ang = CONTANTS.ang
    c.beginPath()
    
    const dx = h*Math.tan(ang);
  
    c.lineWidth = 5
    c.strokeStyle = borderColor
    c.fillStyle = fillColor
  
    c.moveTo(x,y)
    c.lineTo(x+w, y)
    c.lineTo(x + w - h*Math.tan(ang), y+h)
    c.lineTo(x - h * Math.tan(ang), y+h)
    c.lineTo(x,y)
  
    c.fill()
    c.closePath()
    c.stroke()
}