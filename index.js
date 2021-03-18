import Scoreboard from './models/Scoreboard.js';
import Camera from './models/camera.js';
import { getContest } from './services/api.js'

const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FILE_SEPARATOR = String.fromCharCode(28);

const camera = new Camera(0, 600)

let scoreboard = Scoreboard

const main = async () => {
  const rawData = await getContest('./sample/contest')
  const {
    eventTitle,
    eventInfo,
    qtdProblems,
    teams
  } = rawData
  // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  // Instatiate Scoreboard
  scoreboard = new Scoreboard(canvas, camera, eventTitle, eventInfo, qtdProblems)

  // Instatiate teams
  teams.map((team, index) => {
    let teamInfo = team.split(FILE_SEPARATOR)
    scoreboard.addRow(teamInfo)
  })
  
  scoreboard.draw()
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  main()
})  

window.addEventListener('keydown', (event) => {
  if (event.code === "ArrowUp")        camera.move(0, camera.y - 40)
  else if (event.code === "ArrowDown") camera.move(0, camera.y + 40)
  else if (event.code === 'Escape') done = true
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  scoreboard.draw()
})

main()