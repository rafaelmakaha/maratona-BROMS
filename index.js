import Scoreboard from './models/Scoreboard.js';
import cameraSingleton from './models/Camera.js';
import { getContest, getRuns, getNewRuns, getContestEnd } from './services/api.js';
import {loadFont} from './utils/loadFont.js';
import canvasSingleton from './models/Canvas.js'
import { COLORS } from './settings/colors.js';
import eventsManager from './models/EventsManager.js';

const body = document.getElementsByTagName('body')
body[0].style.margin = 0;
body[0].style.backgroundColor = COLORS.bodyBackground;

let canvas = canvasSingleton.getInstance()
// canvas.width = window.innerWidth - 5;
// canvas.height = window.innerHeight - 5;
canvas.setSize(window.innerWidth - 5, window.innerHeight - 5)
loadFont("nk57-monospace")

const FILE_SEPARATOR = String.fromCharCode(28);

const camera = cameraSingleton.getInstance();
let scoreboard;

eventsManager.getInstance()

const main = async () => {
  const rawData = await getContest();
  let runs = await getRuns()
  const {
    name: eventTitle,
    duration, frozen, blind, penalty,
    n_questions: qtdProblems,
    teams
  } = rawData

  // Instatiate Scoreboard
  scoreboard = new Scoreboard(eventTitle, {duration, frozen, blind, penalty}, qtdProblems)

  // Instatiate teams
  teams.map((team, index) => {
    scoreboard.addRow(team)
  });

  updateAll();
  scoreboard.draw()
  runs.map((run,i) => {
      scoreboard.processRun(run)
  });
  updateAll();
  redrawAll();
  var refresh = setInterval(async () => {
    console.log(await getContestEnd())
    if(await getContestEnd()) clearInterval(refresh)
    let newRuns = await getNewRuns(runs[runs.length - 1]["runId"])
    if(!newRuns.length) return
    console.log('passei')
    runs = newRuns
    runs.map((run,i) => {
        scoreboard.processRun(run)
        updateAll();
    })
  }, 1000);

  setInterval(async () => {
    updateAll();
    redrawAll();
  }, 40);
}

export const updateAll = () => {
  scoreboard.update()
}

export const redrawAll = () => {
  canvas = canvasSingleton.getInstance();
  canvas.getContext().clearRect(0, 0, canvas.getWidth(), canvas.getHeight())
  scoreboard.draw()
}

window.addEventListener('keydown', (event) => {
  eventsManager.getInstance().onEvent('keydown', event);
}, {passive: true})

window.addEventListener('wheel', (event) => {
  eventsManager.getInstance().onEvent('wheel', event);
}, {passive: true})

window.addEventListener('resize', (event) => {
  eventsManager.getInstance().onEvent('resize', event);
}, {passive: true})

main()