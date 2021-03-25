import canvasSingleton from '../models/Canvas.js'

export function align(text, type, width='', height='', font=30) {
  const ctx = canvasSingleton.getInstance().getContext("2d");
  ctx.font = `${font}px MonospaceTypewriter`;
  const textMetrics = ctx.measureText(text)
  const text_w = textMetrics.width
  const text_h = textMetrics.actualBoundingBoxAscent
  const ans = {
    center: [(width - text_w)/2, (height - text_h)/2],
    left: [0,(height - text_h)/2],
    right: [width - text_w, (height - text_h)/2],
  }
  if (text_w > width) return align(text, type, width, height, font-1)
  return ans[type]
}