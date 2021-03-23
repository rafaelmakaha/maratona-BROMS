export function align(text, type, width='', height='') {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = "30px MonospaceTypewriter"
  const textMetrics = ctx.measureText(text)
  const text_w = textMetrics.width
  const text_h = textMetrics.actualBoundingBoxAscent
  const ans = {
    center: [(width - text_w)/2, (height - text_h)/2],
    left: [0,(height - text_h)/2],
    right: [width - text_w, (height - text_h)/2],
  }
  console.log(text, ans[type])
  return ans[type]
}