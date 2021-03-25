import {align} from '../utils/align.js'
import cameraSingleton from './Camera.js'

class Row {
  constructor(scoreboard, position, [uid, college, teamName], x, y) {
    this.camera = cameraSingleton.getInstance();
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
    let dx, dy, text;

    const a = Math.max(this.camera.y, this.y)
    const b = Math.min(this.camera.y + this.camera.h, this.y + h)

    if (b - a <= 0) return 

    let x = this.x - this.camera.x
    let y = this.y - this.camera.y

    // Sizes: Position, Name, Score. 
    const size = [0.07, 0.3, 0.05, 0.05]
    // full row
    c.beginPath();
    c.strokeRect(x, y, w, -h);
    // Position box
    [dx, dy] = align(this.position, 'center', size[0] * w, h)
    c.fillText(this.position, x + dx, y -dy)
    // Name box
    x = x + size[0] * w;
    c.strokeRect(x, y, size[1] * w, -h);
    [dx, dy] = align(this.teamName, 'right', size[1] * w, h)
    console.log(this.teamName.length, this.teamName)
    c.fillText(this.teamName, x + dx, y -dy);
    // Score box
    x += size[1] * w;
    [dx, dy] = align(this.score, 'right', size[2] * w, h)
    c.strokeRect(x, y, size[2] * w, -h);
    c.fillText(this.score, x + dx, y - dy, size[2] * w);
    // Penality box
    x += size[2] * w;
    [dx, dy] = align(this.penality, 'right', size[3] * w, h)
    c.strokeRect(x, y, size[3] * w, -h);
    c.fillText(this.penality, x + dx, y - dy, size[3] * w);
    // Questions Box ############# To do: Add array positions
    x += size[2] * w;
    const sum = size.reduce((a,b) => a+b)
    const problemWidth = w * (1 - sum)/(n)
    var i = 1;
    while(i <= n) {
      c.strokeRect(x, y, problemWidth, -h);
      [dx, dy] = align(this.acs, 'center', problemWidth, h)
      c.fillText(this.acs, x + dx, y - dy, problemWidth)
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