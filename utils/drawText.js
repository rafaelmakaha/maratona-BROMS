import canvasSingleton from '../models/Canvas.js'
import {COLORS} from '../settings/colors.js'

export function drawText(text, x, y, maxWidth=undefined, textColor=COLORS.text){
    const c = canvasSingleton.getInstance().getContext("2d");
    c.fillStyle = textColor;
    c.fillText(text, x, y, maxWidth);
}