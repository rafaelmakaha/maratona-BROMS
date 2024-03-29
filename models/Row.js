import {align} from '../utils/align.js';
import {paralelog} from '../utils/paralelog.js';
import {drawText} from '../utils/drawText.js';
import cameraSingleton from './Camera.js';
import canvasSingleton from './Canvas.js';
import { CONTANTS } from '../settings/contants.js';
import { COLORS } from '../settings/colors.js';

class Row {
  constructor(scoreboard, position, [uid, college, teamName], x, y, header=false, marginY=0) {
    this.header = header;
    this.lastAc = 0;
    this.camera = cameraSingleton.getInstance();
    this.scoreboard = scoreboard;
    this.position = header ? '#' : position;
    this.uid = uid;
    this.college = college;
    this.teamName = header ? 'TEAM': teamName;
    this.score = header ? 'SCORE' : 0;
    this.penality = header ? 'PENALTY' : 0;
    this.acs = header ? ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, this.scoreboard.qtdProblems+1) : new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.submissions = new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.x = x;
    this.y = y;
    this.size = [0.05, 0.45, 0.07, 0.09]; //Sizes: Position, Name, Score, Penality
    this.marginY = marginY;
    this.c = this.scoreboard.context;
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems +1;
  }
  drawPosition(text, x, y) {
    let color;
    // if (this.header){
    // paralelog(x, y - this.marginY, this.size[0] * this.w, - (this.h - 2*this.marginY));
    if(this.position <= 3){
      color = COLORS.goldPosition;
    }else if(this.position <= 6){
      color = COLORS.silverPosition;
    }else if(this.position <= 10){
      color = COLORS.bronzePosition;
    }else{
      color = COLORS.defaultPosition;
    }
    paralelog(x, y - this.marginY, this.size[0] * this.w, -(this.h - 2*this.marginY), color);
    let [dx, dy] = align(text, 'center', this.size[0] * this.w, this.h);
    
    drawText(text, x + dx, y -dy, undefined, COLORS.positionTextColor);
  }
  drawName(text, x, y) {
    paralelog(x, y - this.marginY, this.size[1] * this.w, -(this.h - 2*this.marginY));
    let [dx, dy, offset] = align(text, 'left', this.size[1] * this.w, this.h);
    drawText(text, x + dx, y -dy, this.size[1] * this.w - offset);
  }
  drawScore(text, x, y) {
    paralelog(x, y - this.marginY, this.size[2] * this.w, -(this.h - 2*this.marginY));
    let [dx, dy] = align(text, 'center', this.size[2] * this.w, this.h);
    if (this.header) [dx, dy] = align(text, 'center', this.size[2] * this.w, this.h);
    drawText(text, x + dx, y - dy, this.size[2] * this.w);
  }
  drawPenality(text, x, y) {
    paralelog(x, y - this.marginY, this.size[3] * this.w, -(this.h - 2*this.marginY));
    let [dx, dy] = align(text, 'center', this.size[3] * this.w, this.h);
    if (this.header) [dx, dy] = align(text, 'center', this.size[3] * this.w, this.h);
    drawText(text, x + dx, y - dy);
  }
  drawQuestions(x, y, w) {
    let i = 1;
    while(i < this.n) {
      if(this.header){
        paralelog(x, y - this.marginY, w, -(this.h - 2*this.marginY));
        let [dx, dy] = align(this.acs[i], 'center', w, this.h)
        drawText(this.acs[i], x + dx, y - dy, w)
      } else {
        paralelog(x, y - this.marginY, w, -(this.h - 2*this.marginY), this.acs[i] ? "green" : "red");
      }
      x += w
      i++;
    }
  }
  draw(){
    this.c = canvasSingleton.getInstance().getContext('2d');
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems+1;

    // this.c.strokeStyle = 'red'

    const a = Math.max(this.camera.y, this.y)
    const b = Math.min(this.camera.y + this.camera.h, this.y + this.h)

    if (b - a <= 0) return 

    let x = this.x - this.camera.x
    let y = this.y - this.camera.y
    // this.c.strokeRect(x,y,this.w,-this.h)
    // paralelog(x,y,this.w,this.h)

    this.drawPosition(this.position, x, y)

    x = x + this.size[0] * this.w;
    this.drawName(this.teamName, x, y)

    x += this.size[1] * this.w;
    this.drawScore(this.score, x, y)

    x += this.size[2] * this.w;
    this.drawPenality(this.penality, x, y)

    x += this.size[3] * this.w;
    const sum = this.size.reduce((a,b) => a+b)
    const problemWidth = this.w * (1 - sum)/(this.n -1)
    this.drawQuestions(x, y, problemWidth)
  }
  update(problemNum, ok, time){
    if(this.acs[problemNum] == 0) {
      this.submissions[problemNum] += 1
      if(ok){
        this.acs[problemNum] = 1;
        this.score += 1;
        this.penality += time + (20 * (this.submissions[problemNum] - 1))
        this.scoreboard.notify(this.position)
      }
    }
  }
}

export default Row;