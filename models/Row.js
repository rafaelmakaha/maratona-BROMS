import cameraSingleton from './Camera.js';
import canvasSingleton from './Canvas.js';
import { COLORS } from '../settings/colors.js';
import Parallelogram from './Parallelogram.js';
import PositionParallelogram from './PositionParallelogram.js';
import Text from './Text.js';
import eventsManager from './EventsManager.js';

export const ROW_FIELDS = {
  POSITION: 0,
  TEAM: 1,
  SCORE: 2,
  PENALTY: 3,
}

export const ACS_COLORS = {
	'0': 'red',
	'1': 'green',
	'2': 'blue',
}

class Row {
  constructor(scoreboard, position, [uid, college, teamName], x, y, header=false, marginY=0) {
    this.header = header;
    this.lastAc = 0;
    this.camera = cameraSingleton.getInstance();
    this.scoreboard = scoreboard;
    this.uid = uid;
    this.college = college;
    this.teamName = header ? 'TEAM': teamName;
    this.score = header ? 'SCORE' : 0;
    this.accumulatedPenalty = header ? 'PENALTY' : 0;
    this.acs = header ? ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, this.scoreboard.qtdProblems+1) : new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.submissions = new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.x = x;
    this.y = y;
    this.size = [0.05, 0.45, 0.07, 0.09]; //Sizes: Position, Name, Score, accumulatedPenalty
    this.marginY = marginY;
    this.c = canvasSingleton.getInstance().getContext();
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems + 1;
    this.parallelogs = new Array();

    this.buildParallelogs();

    let manager = eventsManager.getInstance();
    manager.registerListener('scoreboardResize', this)
		manager.registerListener('processRun', this)
    manager.registerListener('cameraMovement', this)
  }

  buildParallelogs() {
    this.parallelogs.push(new PositionParallelogram(this, 0, this.y - this.marginY, this.size[0], this.h - 2*this.marginY, new Text(undefined, '', COLORS.positionTextColor)));
    if(this.header){
      this.parallelogs[ROW_FIELDS.POSITION].setText('#');
    }
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[1], this.h - 2*this.marginY, new Text(undefined, this.teamName, COLORS.mainTextColor, this.header ? 'center' : 'left')));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[2], this.h - 2*this.marginY, new Text(undefined, this.score)));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[3], this.h - 2*this.marginY, new Text(undefined, this.accumulatedPenalty)));

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

  setRank(rank){
    this.parallelogs[ROW_FIELDS.POSITION].setText(String(rank))
  }

  accepted(questionNumber, time, firstHit=false){
    this.acs[questionNumber] = firstHit ? 2 : 1;
    this.score += 1;
    this.lastAc = time;
    this.accumulatedPenalty += time + (this.scoreboard.penalty * this.submissions[questionNumber]);
  }

  failed(questionNumber){
    this.submissions[questionNumber] += 1;
  }

  onEvent(eventType, event){
    // this.c = canvasSingleton.getInstance().getContext('2d');
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight;
    this.n = this.scoreboard.qtdProblems+1;

    this.camera = cameraSingleton.getInstance()

    let x = this.x - this.camera.x
    let y = this.y - this.camera.y

    this.parallelogs[0].update(x, y);
    x = x + this.size[0] * this.w;

    this.parallelogs[1].update(x, y);
    this.parallelogs[1].text.update(this.teamName);
    x += this.size[1] * this.w;


    this.parallelogs[2].update(x, y)
    this.parallelogs[2].text.update(this.score);
    x += this.size[2] * this.w;

    this.parallelogs[3].update(x, y)
    this.parallelogs[3].text.update(this.accumulatedPenalty);
    x += this.size[3] * this.w;

    const sum = this.size.reduce((a,b) => a+b)
    const problemWidth = (1 - sum)/(this.n -1)
    for(let i = 1; i < this.n; i++) {
      if(this.header){
        this.parallelogs[i + 3].update(x, y)
        this.parallelogs[i + 3].text.update(this.acs[i])
      } else {
        // this.parallelogs[i + 3].update(x, y, {fillColor:this.acs[i] ? "green" : "red"})
        this.parallelogs[i + 3].update(x, y, {fillColor: ACS_COLORS[this.acs[i]]})
      }
      x += problemWidth * this.w;
    }
  }

  draw(){
    const a = Math.max(this.camera.y, this.y)
    const b = Math.min(this.camera.y + this.camera.h, this.y + this.h)

    if (b - a <= 0) return 

    this.parallelogs.map((parallelog) => parallelog.draw())
  }

  updateCoords(x, y){
    this.x = x;
    this.y = y;
  }

}

export default Row;