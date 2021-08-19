import canvasSingleton from '../models/Canvas.js'
import {COLORS} from '../settings/colors.js'
import { align } from './align.js';

export function drawText(text, x, y, w, h, position='center', {fontSize=20, maxWidth=undefined, textColor=COLORS.mainTextColor}={}){
    let [dx, dy, offset] = align(text, position, w, h, fontSize);
    const c = canvasSingleton.getInstance().getContext("2d");
    c.fillStyle = textColor;
    c.fillText(text, x + dx, y - dy, maxWidth - offset);
}