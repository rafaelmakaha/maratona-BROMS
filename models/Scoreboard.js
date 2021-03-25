import Row from './Row.js'
import cameraSingleton from './Camera.js'
import canvasSingleton from './Canvas.js'

class Scoreboard {
  constructor(eventTitle, {duration, frozen, blind, penality}, qtdProblems, font="30px MonospaceTypewriter" ) {
    this.camera = cameraSingleton.getInstance();
    this.rows = new Array(0);
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
    // this.drawHeader()
    // console.log(this.rows.slice(this.totalRows))
    c.fillStyle = 'blue';
    c.textAlign = "left";
    this.rows.map((row) => row.draw()) 
  }
  addRow(teamInfo){
    this.totalRows++;
    this.rows.push(new Row(this, this.totalRows, teamInfo, this.x, this.y + (this.totalRows * this.rowHeight)));
    this.camera.update((this.totalRows+1) * this.rowHeight);
  }
   // Método para mudança de posicoes
  notify(position){}
}

export default Scoreboard;