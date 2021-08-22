import canvasSingleton from '../models/Canvas.js'
import { CONTANTS } from '../settings/contants.js';
import { FONTS } from '../settings/fonts.js';

export function align(text, type, width='', height='', fontSize=FONTS.mainTextSize) {
  const ctx = canvasSingleton.getInstance().getContext("2d");
  ctx.font = `${fontSize}px ${FONTS.mainText}`;
  const textMetrics = ctx.measureText(text)
  const text_w = textMetrics.width
  const text_h = textMetrics.actualBoundingBoxAscent
  const offset = Math.max(width * 0.02, 1);
  const diff = height * Math.tan(CONTANTS.ang) / 2 // é o cateto oposto
  const ans = {
    center: [diff + (width - diff - text_w)/2, (height - text_h)/2, offset],
    left: [offset + diff,(height - text_h)/2, offset],
    right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, (height - text_h)/2, offset],
  }
  if (text_w > width - diff) return align(text, type, width, height, fontSize-1)
  return ans[type]
}