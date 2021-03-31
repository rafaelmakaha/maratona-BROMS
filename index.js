import Scoreboard from './models/Scoreboard.js';
import cameraSingleton from './models/Camera.js';
import { getContest, getRuns } from './services/api.js';
import loadFont from './utils/loadFont.js';
import canvasSingleton from './models/Canvas.js'

let canvas = canvasSingleton.getInstance()
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
loadFont("MonospaceTypewriter")

const FILE_SEPARATOR = String.fromCharCode(28);

const camera = cameraSingleton.getInstance();
let scoreboard;

const main = async () => {
  const rawData = await getContest('./sample/contest');
  const runs = await getRuns('./sample/runs');
  const {
    eventTitle,
    eventInfo,
    qtdProblems,
    teams
  } = rawData

  // Instatiate Scoreboard
  scoreboard = new Scoreboard(eventTitle, eventInfo, qtdProblems)

  // Instatiate teams
  teams.map((team, index) => {
    let teamInfo = team.split(FILE_SEPARATOR)
    scoreboard.addRow(teamInfo)
  })
  
  scoreboard.draw()
}

const redrawAll = () => {
  canvas = canvasSingleton.getInstance();
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  scoreboard.draw()
}

window.addEventListener('wheel', (event) => {
  if (event.deltaY < 0) {
    camera.move(0, camera.y - 20)
    redrawAll()
  }
  else if (event.deltaY > 0) {
    camera.move(0, camera.y + 20)
    redrawAll()
  }
}, {passive: true})

window.addEventListener('keydown', (event) => {
  if (event.code === "ArrowUp") {
    camera.move(0, camera.y - 40)
    redrawAll()
  }else if (event.code === "ArrowDown") {
    camera.move(0, camera.y + 40)
    redrawAll()
  }
}, {passive: true})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight - 5;
  const camera = cameraSingleton.getInstance().updateSize(window.innerWidth, window.innerHeight)
  redrawAll()
}, {passive: true})

main()