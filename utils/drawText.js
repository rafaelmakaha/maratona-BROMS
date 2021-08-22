import canvasSingleton from '../models/Canvas.js'
import {COLORS} from '../settings/colors.js'
import { CONTANTS } from '../settings/contants.js';
import { FONTS } from '../settings/fonts.js';
import { align } from './align.js';

export function drawText(text, x, y, w, h, position='center', {fontSize=FONTS.mainTextSize, textColor=COLORS.mainTextColor}={}){
    const diff = h * Math.tan(CONTANTS.ang) / 2 // é o cateto oposto
    let [dx, dy, offset] = align(text, position, w, h, fontSize);
    const c = canvasSingleton.getInstance().getContext("2d");
    c.fillStyle = textColor;
    let maxWidth = w - diff - 2*offset;
    c.fillText(text, x + dx, y - dy, maxWidth);
}