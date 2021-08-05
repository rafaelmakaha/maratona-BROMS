export function loadFont(fontname){
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "4px "+fontname;
  ctx.fillText("text", 0, 8);
}