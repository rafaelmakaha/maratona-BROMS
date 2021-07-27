import Row from './Row.js'
import cameraSingleton from './Camera.js'
import canvasSingleton from './Canvas.js'

class Scoreboard {
  constructor(eventTitle, { duration, frozen, blind, penality }, qtdProblems, font = "30px Montserrat-MediumTypewriter") {
    this.camera = cameraSingleton.getInstance();
    this.rows = new Array(0);
    this.rowsUid = {}
    this.eventTitle = eventTitle;
    this.duration = duration;
    this.frozen = frozen;
    this.blind = blind;
    this.penality = penality;
    this.qtdProblems = parseInt(qtdProblems);
    this.totalRows = 0;
    this.rowHeight = 40;
    this.rowWidth = 0.95 * canvas.width;
    this.font = font;
    this.x = 20;
    this.y = 50;
    this.initHeader()
  }
  initHeader() {
    this.rows.push(new Row(this, NaN, ['', '', this.eventTitle], this.x, this.y, true))
  }
  draw() {
    const canvas = canvasSingleton.getInstance();
    const c = canvasSingleton.getInstance().getContext('2d');
    this.rowWidth = 0.95 * canvas.width;
    c.font = this.font;
    c.fillStyle = 'white';
    c.textAlign = "left";
    this.rows.map((row) => row.draw())
  }
  addRow({teamId, college, name}) {
    this.totalRows++;
    this.rows.push(new Row(this, this.totalRows, [teamId, college, name ], this.x, this.y + (this.totalRows * this.rowHeight)));
    this.rowsUid[teamId] = this.rows[this.totalRows]
    this.camera.update((this.totalRows + 1) * this.rowHeight);
  }
  notify(position) { }
  processRun({runId, time, teamUid, problem, verdict}) {
    // console.log(teamUid, this.rowsUid)
    const i = this.rowsUid[teamUid].position;
    const p = problem.charCodeAt(0) - 64;
    const team = this.rows[i];
    if (team.acs[p] !== 0) return
    if (verdict.charCodeAt(0) === "Y".charCodeAt(0)) {
      team.acs[p] = 1;
      team.score += 1;
      team.lastAc = time;
      team.penality += time + (this.penality * team.submissions[p]);
    } else {
      team.submissions[p] += 1;
    }
    this.rows[i] = team;
    this.rowsUid[teamUid] = team;
    this.updatePosition(i);
  }
  updatePosition(index) {
    let i = index - 1;
    while (i != 0) {
      if (this.rows[i + 1].score > this.rows[i].score ||
        this.rows[i + 1].score === this.rows[i].score && this.rows[i + 1].penality < this.rows[i].penality ||
        this.rows[i + 1].penality === this.rows[i].penality && this.rows[i + 1].lastAc < this.rows[i].lastAc) {

        // update position
        this.rows[i].position++;
        this.rows[i + 1].position--;

        // update row object
        const aux = this.rows[i];
        this.rows[i] = this.rows[i + 1];
        this.rows[i + 1] = aux;

        // update row coords
        const auxY = this.rows[i].y
        this.rows[i].y = this.rows[i + 1].y
        this.rows[i + 1].y = auxY
      } else {
        break;
      }
      i--;
    }
  }
}

export default Scoreboard;