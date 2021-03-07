import Scoreboard from './models/Scoreboard.js';
import Row from './models/Row.js'
import { getContest } from './services/api.js'

const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FILE_SEPARATOR = String.fromCharCode(28);

(async () => {
  const rawData = await getContest('./sample/contest')
  // Instatiate Scoreboard
  const scoreboard = new Scoreboard(canvas, 13)

  // Instatiate teams
  rawData.teams.map((team, index) => {
    let [ref, college, teamName] = team.split(FILE_SEPARATOR)
    scoreboard.addRow(ref, college, teamName)
  })
  scoreboard.draw()
  // const c = canvas.getContext('2d')
  // c.strokeRect(0,0,100,100)
  // c.strokeRect(200,50,100,100)
  // c.fillText('teste',200,50)
})()