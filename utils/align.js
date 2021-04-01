import canvasSingleton from '../models/Canvas.js'

export function align(text, type, width='', height='', font=25) {
  const ctx = canvasSingleton.getInstance().getContext("2d");
  ctx.font = `${font}px MonospaceTypewriter`;
  const textMetrics = ctx.measureText(text)
  const text_w = textMetrics.width
  const text_h = textMetrics.actualBoundingBoxAscent
  const offset = Math.max(width * 0.02, 10);
  const ans = {
    center: [(width - text_w)/2, (height - text_h)/2, offset],
    left: [offset,(height - text_h)/2, offset],
    right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, (height - text_h)/2, offset],
  }
  if (text_w > width) return align(text, type, width, height, font-1)
  return ans[type]
}