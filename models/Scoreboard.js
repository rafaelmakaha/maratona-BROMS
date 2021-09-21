import Row, { ROW_FIELDS } from './Row.js'
import cameraSingleton from './Camera.js'
import canvasSingleton from './Canvas.js'
import eventsManager from './EventsManager.js';

class Scoreboard {
  constructor(eventTitle, { duration, frozen, blind, penalty }, qtdProblems, font = "") {
    this.camera = cameraSingleton.getInstance();
    this.rows = new Array(0);
    this.eventTitle = eventTitle;
    this.duration = duration;
    this.frozen = frozen;
    this.blind = blind;
    this.penalty = penalty;
    this.qtdProblems = parseInt(qtdProblems);
    this.totalRows = 0;
    this.marginX = 5;
    this.marginY = 5;
    this.rowHeight = 40 + 2 * this.marginY;
    this.rowWidth = 0.95 * canvasSingleton.getInstance().getWidth();
    this.x = 20;
    this.y = 50;
    this.initHeader()

    let manager = eventsManager.getInstance();
    manager.registerListener('canvasResize', this)
    manager.notify('scoreboardResize', this)
  }
  initHeader() {
    this.rows.push(new Row(this, NaN, ['', '', this.eventTitle], this.x, this.y, true, this.marginY))
  }
  onEvent(eventType, event) {
    if(eventType === 'canvasResize') {
      this.rowWidth = 0.95 * event.w;
      // this.rows.map((row) => row.update())

      let manager = eventsManager.getInstance();
      manager.notify('scoreboardResize', this)
    }
  }
  update() {
    // this.rows.map((row) => row.update())
  }
  draw() {
    // this.rowWidth = 0.95 * canvasSingleton.getInstance().getWidth();
    this.rows.map((row) => row.draw())
  }
  addRow({teamId, college, name}) {
    this.totalRows++;
    this.rows.push(new Row(this, this.totalRows, [teamId, college, name ], this.x, this.y + (this.totalRows * this.rowHeight), false, this.marginY));
    this.rows[this.totalRows].parallelogs[ROW_FIELDS.POSITION].setText(this.totalRows);
    let manager = eventsManager.getInstance();
    manager.notify('scoreboardResize', this)
  }
  notify(position) { }
  processRun({runId, time, teamUid, problem, verdict}) {
    let i;
    for(i = 0; i < this.totalRows; i++){
      if(this.rows[i].uid === teamUid) break;
    }
    
    const questionNumber = problem.charCodeAt(0) - 64;

    if (this.rows[i].acs[questionNumber] !== 0) return

    if (verdict.charCodeAt(0) === "Y".charCodeAt(0)) {
      this.rows[i].accepted(questionNumber, time);
    } else {
      this.rows[i].failed(questionNumber);
    }
    this.updatePosition(i);
    let manager = eventsManager.getInstance();
    manager.notify('scoreboardResize', this)
  }
  updatePosition(index) {
    let i = index - 1;
    while (i != 0) {
      if (this.rows[i + 1].score > this.rows[i].score ||
        this.rows[i + 1].score === this.rows[i].score && this.rows[i + 1].accumulatedPenalty < this.rows[i].accumulatedPenalty ||
        this.rows[i + 1].accumulatedPenalty === this.rows[i].accumulatedPenalty && this.rows[i + 1].lastAc < this.rows[i].lastAc) {

        // update position
        //this.rows[i].position++;
        //this.rows[i + 1].position--;
        this.rows[i].setRank(i+1)
        this.rows[i+1].setRank(i)

        // update row object
        const aux = this.rows[i];
        this.rows[i] = this.rows[i + 1];
        this.rows[i + 1] = aux;

        // update row coords
        const auxY = this.rows[i].y
        this.rows[i].updateCoords(this.rows[i].x, this.rows[i + 1].y)
        this.rows[i + 1].updateCoords(this.rows[i + 1].x, auxY)
      } else {
        break;
      }
      i--;
    }
  }
}

export default Scoreboard;