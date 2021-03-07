import Row from './Row.js'

class Scoreboard {
  constructor(canvas, qtdProblems, font="30px Roboto" ) {
    this.rows = new Array(1)
    this.context = canvas.getContext('2d');
    this.qtdProblems = qtdProblems;
    this.totalRows = 0;
    this.rowHeight = 40;
    this.rowWidth = 0.95 * canvas.width;
    this.font = font;
    this.x = 20;
    this.y = 20;
  }
  header() {
    this.rows.push(new Row(this, ))
  }
  draw() {
    const c = this.context
    c.fillStyle = 'red';
    c.textAlign = "left";
    c.font = this.font;
    // Desenhar o header
    this.drawHeader()
    this.rows.slice(1,this.totalRows+1).map((row) => row.draw()) 
  }
  drawHeader() {
  }
  addRow(teamInfo){
    this.totalRows++;
    this.rows.push(new Row(this, this.totalRows, teamInfo, this.x, this.y + (this.totalRows * this.rowHeight)));
  }
   // Método para mudança de posicoes
  notify(position){}
}

export default Scoreboard;