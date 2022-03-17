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
  const contest = await getContest();
  
  let runs = (await getRuns()).filter(r => r.time <= contest.duration/60);

  // Instatiate Scoreboard
  scoreboard = new Scoreboard(contest.eventTitle, contest.duration, contest.frozen, contest.blind, contest.penalty, contest.qtdProblems)

  // Instatiate teams
  contest.teams.map((team, _) => {
    scoreboard.addRow(team)
  });

  scoreboard.draw()
  runs.map((run,i) => {
      scoreboard.processRun(run)
  });
  redrawAll();
  var refresh = setInterval(async () => {
    if(await getContestEnd()) clearInterval(refresh)
    let newRuns = !runs.length ? await getRuns() : (await getNewRuns(runs[runs.length - 1]["runId"])).filter(r => r.time <= contest.duration / 60) ?? [];
    if(!newRuns.length) return
    runs = newRuns
    runs.map((run,i) => {
        scoreboard.processRun(run)
    })
  }, 10000);

  setInterval(async () => {
    redrawAll();
  }, 40);
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