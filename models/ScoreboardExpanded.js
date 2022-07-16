import Row, { ROW_FIELDS } from './Row.js'
import cameraSingleton from './Camera.js'
import canvasSingleton from './Canvas.js'
import eventsManager from './EventsManager.js';
import Scoreboard from './Scoreboard.js';
import RowExpanded from './RowExpanded.js';

class ScoreboardExpanded extends Scoreboard {
  constructor(eventTitle, { duration, frozen, blind, penalty }, qtdProblems, font = "") {
    super(eventTitle, { duration, frozen, blind, penalty }, qtdProblems, font)
    this.rowHeight = 80 + 2 * this.marginY;
  }

  addRow({teamId, college, name, region=''}) {
    this.totalRows++;
    this.rows.push(new RowExpanded(this, this.totalRows, [teamId, college, name ], this.x, this.y + (this.totalRows * this.rowHeight), false, this.marginY));
    this.rows[this.totalRows].parallelogs[ROW_FIELDS.POSITION].setText(this.totalRows);
    let manager = eventsManager.getInstance();
    manager.notify('scoreboardResize', this)
  }

  
}

export default ScoreboardExpanded;