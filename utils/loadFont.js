import canvasSingleton from "../models/Canvas.js";

export function loadFont(fontname){
  var canvas = canvasSingleton.getInstance();
  var ctx = canvas.getContext();
  ctx.font = "4px "+fontname;
  ctx.fillText("text", 0, 8);
}