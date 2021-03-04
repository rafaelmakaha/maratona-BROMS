class Scoreboard {
  constructor(rows, canvas, font="30px Comic Sans MS" ) {
    this.rows = rows;
    this.context = canvas.getContext('2d');
    this.font = font;
    console.log('zeca')
  }
  drawRows() {
    this.context.beginPath();
    this.context.fillStyle = 'red';
    this.context.textAlign = "center";
    this.context.font = this.font;
    this.context.fillText(this.rows.map((row) => {
      return row.teamName, row.positionX, row.positionY
    }));
  }
}

export default Scoreboard;