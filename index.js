import Scoreboard from './models/Scoreboard.js';
import cameraSingleton from './models/Camera.js';
import { getContest, getRuns, getNewRuns, getContestEnd } from './services/api.js';
import {loadFont} from './utils/loadFont.js';
import canvasSingleton from './models/Canvas.js'

let canvas = canvasSingleton.getInstance()
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
loadFont("blogger-sans.medium")

const FILE_SEPARATOR = String.fromCharCode(28);

const camera = cameraSingleton.getInstance();
let scoreboard;

const main = async () => {
  const rawData = await getContest();
  let runs = await getRuns()
  const {
    name: eventTitle,
    duration, frozen, blind, penality,
    n_questions: qtdProblems,
    teams
  } = rawData

  // Instatiate Scoreboard
  scoreboard = new Scoreboard(eventTitle, {duration, frozen, blind, penality}, qtdProblems)

  // Instatiate teams
  teams.map((team, index) => {
    scoreboard.addRow(team)
  });

  scoreboard.draw()
  runs.map((run,i) => {
    setTimeout(() => {
      scoreboard.processRun(run)
    }, 10*i);
    redrawAll();
  });
  
  setInterval(async () => {
    if(await getContestEnd()) return 
    runs = await getNewRuns(runs[runs.length - 1]["runId"])
    runs.map((run,i) => {
      setTimeout(() => {
        scoreboard.processRun(run)
        redrawAll();
      }, 1000*i);
    })
  }, 5000);
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