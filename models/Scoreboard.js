import Row from './Row.js'

class Scoreboard {
  constructor(canvas, eventTitle, {duration, frozen, blind, penality}, qtdProblems, font="30px Roboto" ) {
    this.rows = new Array(1)
    this.context = canvas.getContext('2d');
    this.eventTitle = eventTitle;
    this.duration = duration;
    this.frozen = frozen;
    this.blind = blind;
    this.penality = penality;
    this.qtdProblems = qtdProblems;
    this.totalRows = 0;
    this.rowHeight = 40;
    this.rowWidth = 0.95 * canvas.width;
    this.font = font;
    this.x = 20;
    this.y = 50;
  }
  header() {
    this.rows.push(new Row(this, ))
  }
  draw() {
    const c = this.context
    c.font = this.font;
    this.drawHeader()
    c.fillStyle = 'blue';
    c.textAlign = "left";
    // Desenhar o header
    this.rows.slice(1,this.totalRows+1).map((row) => row.draw()) 
  }
  drawHeader() {
    const c = this.context
    const w = this.rowWidth
    const h = this.rowHeight
    const n = this.qtdProblems
    const size = [0.04, 0.3, 0.05]
    let text = '';
    // Full box
    let x = this.x + this.rowWidth * size[0]
    c.beginPath();
    c.strokeRect(x, this.y, (w -x + this.x), -h);
    // Teams
    c.fillStyle = "green"
    text = this.eventTitle
    c.fillText(text, x, this.y, size[1] * w)
    c.strokeRect(x, this.y, size[1] * w, -h);
    // Score
    x += size[1] * w
    text = "Score"
    c.fillText(text, x, this.y, size[2] * w)
    c.strokeRect(x, this.y, size[2] * w, -h)
    // Questions
    x += size[2] * w
    const sum = size.reduce((a,b) => a+b)
    const problemWidth = w * (1 - sum)/(n)
    var i = 1;
    do {
      text = String.fromCharCode(64+i)
      c.fillText(text, x, this.y, problemWidth)
      c.strokeRect(x, this.y, problemWidth, -h)
      x += problemWidth
      i++
    }while(i <= n)
  }
  addRow(teamInfo){
    this.totalRows++;
    this.rows.push(new Row(this, this.totalRows, teamInfo, this.x, this.y + (this.totalRows * this.rowHeight)));
  }
   // Método para mudança de posicoes
  notify(position){}
}

export default Scoreboard;