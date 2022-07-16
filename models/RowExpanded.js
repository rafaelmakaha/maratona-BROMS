import Row, { ACS_COLORS, ROW_FIELDS } from './Row.js'
import { COLORS } from '../settings/colors.js';
import Parallelogram from './Parallelogram.js';
import PositionParallelogram from './PositionParallelogram.js';
import Text from './Text.js';
import cameraSingleton from './Camera.js';

class RowExpanded extends Row {
  constructor(scoreboard, position, [uid, college, teamName], x, y, header=false, marginY=0) {
    super(scoreboard, position, [uid, college, teamName], x, y, header, marginY)
    this.h = this.scoreboard.rowHeight * 2;
    this.n = this.scoreboard.qtdProblems + 1
    this.acsTimes = new Array(this.scoreboard.qtdProblems+1).fill(0);
  }

  buildParallelogs() {
    this.parallelogs.push(new PositionParallelogram(this, 0, this.y - this.marginY, this.size[0], this.h - 2*this.marginY, new Text(undefined, '', COLORS.positionTextColor)));
    if(this.header){
      this.parallelogs[ROW_FIELDS.POSITION].setText('#');
    }
    let fullText = this.teamName+'\n'+this.college
    // if(this.college == 'USP') fullText+= '\n'+this.college;
    // console.log("FULLTEXT", fullText)
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[1], this.h - 2*this.marginY, new Text(undefined, fullText, COLORS.mainTextColor, this.header ? 'center' : 'left')));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[2], this.h - 2*this.marginY, new Text(undefined, this.score)));
    this.parallelogs.push(new Parallelogram(this, 0, this.y - this.marginY, this.size[3], this.h - 2*this.marginY, new Text(undefined, this.accumulatedPenalty)));

    const sum = this.size.reduce((a,b) => a+b)
    const problemWidth = (1 - sum)/(this.n -1)

    for(let i = 1; i < this.n; i++) {
      if(this.header){
        this.parallelogs.push((new Parallelogram(this, 0, this.y - this.marginY, problemWidth, this.h - 2 * this.marginY, new Text(undefined, this.acs[i]))));
      } else {
        this.parallelogs.push((new Parallelogram(this, 0, this.y - this.marginY, problemWidth, this.h - 2 * this.marginY, new Text(undefined, ''), this.acs[i] ? "green" : "red")));
      }
    }
  }

  accepted(questionNumber, time, firstHit=false){
    this.acs[questionNumber] = firstHit ? 2 : 1;
    this.acsTimes[questionNumber] = time;
    this.score += 1;
    this.lastAc = time;
    this.accumulatedPenalty += time + (this.scoreboard.penalty * this.submissions[questionNumber]);
  }

  onEvent(eventType, event){
    // this.c = canvasSingleton.getInstance().getContext('2d');
    this.w = this.scoreboard.rowWidth;
    this.h = this.scoreboard.rowHeight * 2;
    this.n = this.scoreboard.qtdProblems+1;

    this.camera = cameraSingleton.getInstance()

    let x = this.x - this.camera.x
    let y = this.y - this.camera.y

    this.parallelogs[0].update(x, y);
    x = x + this.size[0] * this.w;

    this.parallelogs[1].update(x, y);
    // this.parallelogs[1].text.update(this.teamName+'\n'+this.college);
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
        let txt = '' //
        // this.submissions[i] ? '+'+this.submissions[i]+(this.acs[i] ? '\n('+this.acsTimes[i]+')' :'') : ''
        if(!this.submissions[i] && this.acs[i]) txt=`+\n${this.acsTimes[i]}`
        else if(this.submissions[i] && this.acs[i]) txt= `+${this.submissions[i]}\n${this.acsTimes[i]}`
        else if(this.submissions[i]) txt= `+${this.submissions[i]}`
        else txt=''
          
        this.parallelogs[i + 3].update(x, y, {fillColor: (this.submissions[i]||this.acs[i]) ? ACS_COLORS[this.acs[i]] : '#bebebe'})
        this.parallelogs[i + 3].text.update(txt)
      }
      x += problemWidth * this.w;
    }
  }
}

export default RowExpanded;