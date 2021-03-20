export function alignCenter(text, width='', height='') {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "30px MonospaceTypewriter"
  const textMetrics = ctx.measureText(text)
  const text_w = textMetrics.width
  const text_h = textMetrics.actualBoundingBoxAscent
  // console.log(textMetrics)
  // console.log('valores:',text_w,text_h)
  return [(width - text_w)/2, (height - text_h)/2]
  // return [text_w, text_h]
}