import canvasSingleton from '../models/Canvas.js'
import { CONTANTS } from '../settings/contants.js';
import { FONTS } from '../settings/fonts.js';

export function align(text, type, width='', height='', fontSize=20) {
  const ctx = canvasSingleton.getInstance().getContext("2d");
  ctx.font = `bold ${fontSize}px ${FONTS.mainText}`;
  const textMetrics = ctx.measureText(text)
  const text_w = textMetrics.width
  const text_h = textMetrics.actualBoundingBoxAscent
  const offset = Math.max(width * 0.02, 0);
  const diff = height * CONTANTS.ang // é o cateto oposto
  const ans = {
    center: [(width - text_w + diff)/2, (height - text_h)/2, offset + diff],
    left: [offset + diff,(height - text_h)/2, offset + diff],
    right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, (height - text_h)/2, offset + diff],
  }
  if (text_w > width) return align(text, type, width, height, fontSize-1)
  return ans[type]
}