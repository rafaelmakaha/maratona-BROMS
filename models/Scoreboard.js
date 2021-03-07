import Row from './Row.js'

class Scoreboard {
  constructor(canvas, totalProblems, font="30px Comic Sans MS" ) {
    this.rows = new Array(1)
    this.context = canvas.getContext('2d');
    this.totalProblems = totalProblems;
    this.totalRows = 0;
    this.rowHeight = 40;
    this.rowWidth = 0.9 * window.innerWidth;
    this.font = font;
    this.x = 20;
    this.y = 20;
  }
  draw() {
    this.context.fillStyle = 'red';
    this.context.textAlign = "left";
    this.context.font = this.font;
    this.rows.slice(1,this.totalRows+1).map((row) => row.draw(this.context))
  }
  addRow(uid, college, teamName){
    this.totalRows++;
    this.rows.push(new Row(this, this.totalRows, uid, college, teamName, this.x, this.y + (this.totalRows * this.rowHeight), this.totalProblems));
  }
  notify(position){}
}

export default Scoreboard;