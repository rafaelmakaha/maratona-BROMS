import {alignCenter} from '../utils/align.js'

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
  draw(camera){
    const c = this.scoreboard.context
    const w = this.scoreboard.rowWidth
    const h = this.scoreboard.rowHeight
    const n = this.scoreboard.qtdProblems


    const a = Math.max(camera.y, this.y)
    const b = Math.min(camera.y + camera.h, this.y + h)

    if (b - a <= 0) return 

    let x = this.x - camera.x
    let y = this.y - camera.y
    


    // Sizes: Position, Name, Score. 
    const size = [0.07, 0.3, 0.05]
    // full row
    c.beginPath();
    c.strokeRect(x, y, w, -h);
    // Position box
    let [dx, dy] = alignCenter(this.position, size[0] * w, h)
    console.log(this.position, size[0] * w, h)
    console.log(x,y)
    console.log(dx,dy)
    // c.strokeRect(400, 400, dx, dy)
    console.log('size * w', size[0] * w)
    c.fillText(this.position, x + dx, y -dy)
    // Name box
    x = x + size[0] * w
    c.strokeRect(x, y, size[1] * w, -h);
    c.fillText(this.teamName, x, y, size[1] * w);
    // Score with penality box
    x += size[1] * w
    let text = `${this.score}\n${this.penality}`
    c.strokeRect(x, y, size[2] * w, -h);
    c.fillText(text, x, y, size[2] * w);
    // Questions Box ############# To do: Add array positions
    x += size[2] * w
    const sum = size.reduce((a,b) => a+b)
    const problemWidth = w * (1 - sum)/(n)
    var i = 1;
    while(i <= n) {
      const text = `${this.acs}\n${this.submissions}`
      c.strokeRect(x, y, problemWidth, -h)
      c.fillText(text, x, y, problemWidth)
      x += problemWidth
      i++;
    }
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