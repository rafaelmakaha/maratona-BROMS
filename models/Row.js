import {align} from '../utils/align.js';
import {drawText} from '../utils/drawText.js';
import cameraSingleton from './Camera.js';
import canvasSingleton from './Canvas.js';
import { CONSTANTS } from '../settings/constants.js';
import { COLORS } from '../settings/colors.js';
import Parallelogram from './Parallellogram.js';
import Text from './Text.js';

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
    this.n = this.scoreboard.qtdProblems + 1;
    this.parallelogs = new Array();

    this.buildParallelogs();
  }

  getPositionColor() {
    let positionColor;
    if(this.position <= 3){
      positionColor = COLORS.goldPosition;
    }else if(this.position <= 6){
      positionColor = COLORS.silverPosition;
    }else if(this.position <= 10){
      positionColor = COLORS.bronzePosition;
    }else{
      positionColor = COLORS.defaultPosition;
    }
    return positionColor;
  }

  buildParallelogs() {
    let positionColor = this.getPositionColor();
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[0], this.h - 2*this.marginY, new Text(undefined, this.position, COLORS.positionTextColor), positionColor));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[1], this.h - 2*this.marginY, new Text(undefined, this.teamName, COLORS.mainTextColor, this.header ? 'center' : 'left')));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[2], this.h - 2*this.marginY, new Text(undefined, this.score)));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[3], this.h - 2*this.marginY, new Text(undefined, this.penality)));

    const sum = this.size.reduce((a,b) => a+b)
    const problemWidth = (1 - sum)/(this.n -1)

    for(let i = 1; i < this.n; i++) {
      if(this.header){
        this.parallelogs.push((new Parallelogram(this, 0, this.y - this.marginY, problemWidth, this.h - 2 * this.marginY, new Text(undefined, this.acs[i]))));
      } else {
        this.parallelogs.push((new Parallelogram(this, 0, this.y - this.marginY, problemWidth, this.h - 2 * this.marginY, undefined, this.acs[i] ? "green" : "red")));
      }
    }
  }

  draw(){
    this.c = canvasSingleton.getInstance().getContext('2d');
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems+1;

    const a = Math.max(this.camera.y, this.y)
    const b = Math.min(this.camera.y + this.camera.h, this.y + this.h)

    if (b - a <= 0) return 

    let x = this.x - this.camera.x
    let y = this.y - this.camera.y

    // this.drawPosition(this.position, x, y)
    let positionColor = this.getPositionColor();
    this.parallelogs[0].update(x, y, {fillColor: positionColor});
    this.parallelogs[0].text.update(this.position);
    this.parallelogs[0].draw()
    x = x + this.size[0] * this.w;

    // this.drawName(this.teamName, x, y)
    this.parallelogs[1].update(x, y);
    this.parallelogs[1].text.update(this.teamName);
    this.parallelogs[1].draw()
    x += this.size[1] * this.w;

    // this.drawScore(this.score, x, y)
    this.parallelogs[2].update(x, y)
    this.parallelogs[2].text.update(this.score);
    this.parallelogs[2].draw()
    x += this.size[2] * this.w;

    // this.drawPenality(this.penality, x, y)
    this.parallelogs[3].update(x, y)
    this.parallelogs[3].text.update(this.penality);
    this.parallelogs[3].draw()
    x += this.size[3] * this.w;

    const sum = this.size.reduce((a,b) => a+b)
    const problemWidth = (1 - sum)/(this.n -1)
    // this.drawQuestions(x, y, problemWidth)
    for(let i = 1; i < this.n; i++) {
      if(this.header){
        this.parallelogs[i + 3].update(x, y)
        this.parallelogs[i + 3].text.update(this.acs[i])
      } else {
        this.parallelogs[i + 3].update(x, y, {fillColor:this.acs[i] ? "green" : "red"})
      }
      this.parallelogs[i + 3].draw()
      x += problemWidth * this.w;
    }
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