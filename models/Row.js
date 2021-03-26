import {align} from '../utils/align.js';
import cameraSingleton from './Camera.js';
import canvasSingleton from './Canvas.js';

class Row {
  constructor(scoreboard, position, [uid, college, teamName], x, y, header=false) {
    this.header = header;
    this.camera = cameraSingleton.getInstance();
    this.scoreboard = scoreboard;
    this.position = header ? '' : position;
    this.uid = uid;
    this.college = college;
    this.teamName = header ? 'Equipe': teamName;
    this.score = header ? 'Score' : 0;
    this.penality = header ? 'Penality' : 0;
    this.acs = header ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, this.scoreboard.qtdProblems+1) : new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.submissions = new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.x = x;
    this.y = y;
    this.size = [0.07, 0.3, 0.05, 0.05]; //Sizes: Position, Name, Score, Penality
    this.c = this.scoreboard.context;
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems;
  }
  drawPosition(text, x, y) {
    this.c.strokeRect(x, y, this.size[0] * this.w, -this.h);;
    let [dx, dy] = align(text, 'center', this.size[0] * this.w, this.h);
    this.c.fillText(text, x + dx, y -dy);
  }
  drawName(text, x, y) {
    this.c.strokeRect(x, y, this.size[1] * this.w, -this.h);
    let [dx, dy] = align(text, 'left', this.size[1] * this.w, this.h);
    this.c.fillText(text, x + dx, y -dy);  
  }
  drawScore(text, x, y) {
    this.c.strokeRect(x, y, this.size[2] * this.w, -this.h);
    let [dx, dy] = align(text, 'right', this.size[2] * this.w, this.h);
    this.c.fillText(text, x + dx, y - dy);
  }
  drawPenality(text, x, y) {
    this.c.strokeRect(x, y, this.size[3] * this.w, -this.h);
    let [dx, dy] = align(text, 'right', this.size[2] * this.w, this.h);
    this.c.fillText(text, x + dx, y - dy);
  }
  drawQuestions(x, y, w) {
    let i = 0;
    while(i < this.n) {
      this.c.strokeRect(x, y, w, -this.h);
      let [dx, dy] = align(this.acs[i], 'center', w, this.h)
      this.c.fillText(this.acs[i], x + dx, y - dy, w)
      x += w
      i++;
    }
  }
  draw(){
    this.c = canvasSingleton.getInstance().getContext('2d');
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems;

    const a = Math.max(this.camera.y, this.y)
    const b = Math.min(this.camera.y + this.camera.h, this.y + this.h)

    if (b - a <= 0) return 

    let x = this.x - this.camera.x
    let y = this.y - this.camera.y
    this.c.strokeRect(x,y,this.w,-this.h)

    this.drawPosition(this.position, x, y)

    x = x + this.size[0] * this.w;
    this.drawName(this.teamName, x, y)

    x += this.size[1] * this.w;
    this.drawScore(this.score, x, y)

    x += this.size[2] * this.w;
    this.drawPenality(this.penality, x, y)

    x += this.size[2] * this.w;
    const sum = this.size.reduce((a,b) => a+b)
    const problemWidth = this.w * (1 - sum)/(this.n)
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