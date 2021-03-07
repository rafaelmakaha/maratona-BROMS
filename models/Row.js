class Row {
  constructor(scoreboard, position, [uid, college, teamName], x, y) {
    this.scoreboard = scoreboard;
    this.position = position;
    this.uid = uid;
    this.college = college;
    this.teamName = teamName;
    this.score = 0;
    this.penality = 0;
    this.acs = new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.submissions = new Array(this.scoreboard.qtdProblems+1).fill(0);
    this.x = x;
    this.y = y;
  }
  draw(context){
    context.beginPath();
    const text = `${this.teamName}`
    context.fillText(text, this.positionX, this.positionY);
    context.moveTo(this.positionX, this.positionY);
    context.strokeRect(this.positionX, this.positionY, this.scoreboard.rowWidth, this.scoreboard.rowHeight);
  }
  update(problemNum, ok, time){
    if(this.acs[problemNum] == 0) {
      this.submissions[problemNum] += 1
      if(ok){
        this.acs[problemNum] = 1;
        this.score += 1;
        this.penality += time + (20 * (this.submissions[problemNum] - 1))
        this.scoreboard.notify(this.position)
      }
    }
  }
}

export default Row;