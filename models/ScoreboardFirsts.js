import Row, { ROW_FIELDS } from './Row.js'
import cameraSingleton from './Camera.js'
import canvasSingleton from './Canvas.js'
import eventsManager from './EventsManager.js';
import Scoreboard from './Scoreboard.js';

class ScoreboardFirsts extends Scoreboard {
  constructor(eventTitle, { duration, frozen, blind, penalty }, qtdProblems, font = "") {
    super(eventTitle, { duration, frozen, blind, penalty }, qtdProblems, font)
  }

  draw() {
    this.rows.forEach((row) => {
      if(row.score) row.draw()
    })
  }

  processRun({runId, time, teamUid, problem, verdict}) {
    let i;
    for(i = 0; i < this.totalRows; i++){
      if(this.rows[i].uid === teamUid) break;
    }
    
    const questionNumber = problem.charCodeAt(0) - 64;

    if (this.rows[i].acs[questionNumber] !== 0) return
    // descobre que é primeiro acerto
    
    if (verdict.charCodeAt(0) === "Y".charCodeAt(0) && !this.firstHits[questionNumber]) {
      this.firstHits[questionNumber] = i+1;
      this.rows[i].accepted(questionNumber, time, true);
    } else {
      this.rows[i].failed(questionNumber);
    }
    this.updatePosition(i);
    let manager = eventsManager.getInstance();
    manager.notify('processRun', this)
  }

}

export default ScoreboardFirsts;