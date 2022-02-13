import Scoreboard from './models/Scoreboard.js';
import cameraSingleton from './models/Camera.js';
import { getContest, getRuns, getNewRuns, getContestEnd } from './services/api.js';
import {loadFont} from './utils/loadFont.js';
import canvasSingleton from './models/Canvas.js'
import { COLORS } from './settings/colors.js';
import eventsManager from './models/EventsManager.js';
import ScoreboardFirsts from './models/ScoreboardFirsts.js';

const body = document.getElementsByTagName('body')
body[0].style.margin = 0;
body[0].style.backgroundColor = COLORS.bodyBackground;

let canvas = canvasSingleton.getInstance()
// canvas.width = window.innerWidth - 5;
// canvas.height = window.innerHeight - 5;
canvas.setSize(window.innerWidth - 5, window.innerHeight - 5)
loadFont("nk57-monospace")

const FILE_SEPARATOR = String.fromCharCode(28);

const VIEWS = {
  DEFAULT: 'default',
  FIRST_HITS: 'firstHits',
}

const KEYS = {
  FIRST_HITS: 'KeyF',
  DEFAULT: 'Escape',
}

const camera = cameraSingleton.getInstance();
let scoreboards;
let currentView = VIEWS.DEFAULT;

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
  scoreboards = {
    default: new Scoreboard(
      eventTitle, 
      {duration, frozen, blind, penalty}, 
      qtdProblems
      // O que ja tem
    ), 
    firstHits: new ScoreboardFirsts(
      eventTitle, 
      {duration, frozen, blind, penalty}, 
      qtdProblems,
      // 'Primeiro a acertar'
    )
  };

  // Instatiate teams
  teams.map((team, index) => {
    Object.keys(scoreboards).forEach((key) => {
      scoreboards[key].addRow(team)
    })
  });

  // scoreboard.draw()
  runs.map((run,i) => {
      // scoreboard.processRun(run)
      Object.keys(scoreboards).forEach((key) => {
        scoreboards[key].processRun(run)
      })
  });
  redrawAll();
  var refresh = setInterval(async () => {
    if(await getContestEnd()) clearInterval(refresh)
    let newRuns = await getNewRuns(runs[runs.length - 1]["runId"])
    if(!newRuns.length) return
    runs = newRuns
    runs.map((run,i) => {
      // scoreboard.processRun(run)
      Object.keys(scoreboards).forEach((key) => {
        scoreboards[key].processRun(run)
      })
    })
  }, 1000);

  setInterval(async () => {
    redrawAll();
  }, 40);
}


export const redrawAll = () => {
  canvas = canvasSingleton.getInstance();
  canvas.getContext().clearRect(0, 0, canvas.getWidth(), canvas.getHeight())
  scoreboards[currentView].draw()
}

window.addEventListener('keydown', (event) => {
  eventsManager.getInstance().onEvent('keydown', event);
  switch (event.code){
    case KEYS.DEFAULT:
      currentView = VIEWS.DEFAULT;
      break;
    case KEYS.FIRST_HITS:
      currentView = VIEWS.FIRST_HITS;
      break;
  }
}, {passive: true})

window.addEventListener('wheel', (event) => {
  eventsManager.getInstance().onEvent('wheel', event);
}, {passive: true})

window.addEventListener('resize', (event) => {
  eventsManager.getInstance().onEvent('resize', event);
}, {passive: true})

main()