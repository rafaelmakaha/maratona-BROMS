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
  draw(){
    const c = this.scoreboard.context
    const w = this.scoreboard.rowWidth
    const h = this.scoreboard.rowHeight
    const n = this.scoreboard.qtdProblems
    // Sizes: Position, Name, Score. 
    const size = [0.04, 0.3, 0.05]
    // full row
    c.beginPath();
    c.strokeRect(this.x, this.y, w, -h);
    // Position box
    let x = this.x
    c.strokeRect(x, this.y, size[0] * w, -h)
    c.fillText(this.position, x, this.y, size[0] * w)
    // Name box
    x = this.x + size[0] * w
    c.strokeRect(x, this.y, size[1] * w, -h);
    c.fillText(this.teamName, x, this.y, size[1] * w);
    // Score with penality box
    x += size[1] * w
    let text = `${this.score}\n${this.penality}`
    c.strokeRect(x, this.y, size[2] * w, -h);
    c.fillText(text, x, this.y, size[2] * w);
    // Questions Box ############# To do: Add array positions
    x += size[2] * w
    const sum = size.reduce((a,b) => a+b)
    const problemWidth = w * (1 - sum)/(n)
    var i = 1;
    do {
      const text = `${this.acs}\n${this.submissions}`
      c.strokeRect(x, this.y, problemWidth, -h)
      c.fillText(text, x, this.y, problemWidth)
      x += problemWidth
      i++;
    }while(i <= n)
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