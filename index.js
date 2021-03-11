import Scoreboard from './models/Scoreboard.js';
import { getContest } from './services/api.js'

const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FILE_SEPARATOR = String.fromCharCode(28);

const main = async () => {
  const rawData = await getContest('./sample/contest')
  const {
    eventTitle,
    eventInfo,
    qtdProblems,
    teams
  } = rawData
  // Instatiate Scoreboard
  const scoreboard = new Scoreboard(canvas, eventTitle, eventInfo, qtdProblems)

  // Instatiate teams
  teams.map((team, index) => {
    let teamInfo = team.split(FILE_SEPARATOR)
    scoreboard.addRow(teamInfo)
  })
  scoreboard.draw()
  // const c = canvas.getContext('2d')
  // c.strokeRect(0,0,100,100)
  // c.strokeRect(200,50,100,100)
  // c.fillText('teste',200,50)
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  main()
})

main()