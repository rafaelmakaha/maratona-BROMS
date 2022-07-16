import Scoreboard from './models/Scoreboard.js';
import cameraSingleton from './models/Camera.js';
import { getContest, getRuns, getNewRuns, getContestEnd } from './services/api.js';
import {loadFont} from './utils/loadFont.js';
import canvasSingleton from './models/Canvas.js'
import { COLORS } from './settings/colors.js';
import eventsManager from './models/EventsManager.js';
import ScoreboardFirsts from './models/ScoreboardFirsts.js';
import ScoreboardExpanded from './models/ScoreboardExpanded.js';

const body = document.getElementsByTagName('body')
body[0].style.margin = 0;
body[0].style.backgroundColor = COLORS.bodyBackground;

let canvas = canvasSingleton.getInstance()
let keyCombo = null;
// canvas.width = window.innerWidth - 5;
// canvas.height = window.innerHeight - 5;
canvas.setSize(window.innerWidth - 5, window.innerHeight - 5)
loadFont("nk57-monospace")

const FILE_SEPARATOR = String.fromCharCode(28);

const VIEWS = {
  DEFAULT: 'default',
  FIRST_HITS: 'firstHits',
  EXPANDED: 'expanded',
}

const KEYS = {
  DEFAULT: 'Escape',
  FIRST_HITS: 'Digit1',
  EXPANDED: 'Digit2',
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
    ),
    expanded: new ScoreboardExpanded(
      eventTitle, 
      {duration, frozen, blind, penalty}, 
      qtdProblems,
      // 'Primeiro a acertar'
    )
  };

  // Instatiate teams on base scoreboards
  teams.map((team, index) => {
    Object.keys(scoreboards).forEach((key) => {
      scoreboards[key].addRow(team)
    })
  });

  // Instatiate teams on region scoreboards
  // teams.map((team, index) => {
  //   if(team.hasOwnProperty('region')){
  //     if(!scoreboards[team.region]){
  //       scoreboards[team.region] = new Scoreboard(
  //         eventTitle, 
  //         {duration, frozen, blind, penalty}, 
  //         qtdProblems,
  //         // 'Scoreboard da região'
  //       )
  //       let viewKey = '';
  //       team.region.toUpperCase().split('').forEach((keyValue) => {
  //         viewKey += 'Key'+keyValue;
  //       })
  //       // Ex: 'KeyDKeyF' => 'df'
  //       VIEWS[viewKey] = team.region;
  //     }
  //     scoreboards[team.region].addRow(team)
  //   }
  // });
  
  runs.map((run,i) => {
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
      Object.keys(scoreboards).forEach((key) => {
        scoreboards[key].processRun(run)
      })
    })
  }, 1000);

  setInterval(async () => {
    redrawAll();
  }, 50); // 20 fps
}


export const redrawAll = () => {
  canvas = canvasSingleton.getInstance();
  canvas.getContext().clearRect(0, 0, canvas.getWidth(), canvas.getHeight())
  scoreboards[currentView].draw()
}

function switchView(code){
  switch (code){
    case KEYS.DEFAULT:
      currentView = VIEWS.DEFAULT;
      keyCombo = null;
      break;
    case KEYS.FIRST_HITS:
      currentView = VIEWS.FIRST_HITS;
      keyCombo = null;
      break;
    case KEYS.EXPANDED:
      currentView = VIEWS.EXPANDED;
      keyCombo = null;
      break;
    case 'F10':
      console.log("DEFAULT: ", scoreboards[VIEWS.DEFAULT])
      console.log('scoreboards: ', Object.keys(scoreboards));
      break;
    default:
      // console.log("switchView", keyCombo, '+', code);
      let codeCombo = code;
      if(keyCombo){
        codeCombo = keyCombo + codeCombo;
        // console.log("Fizemos um combo:", codeCombo);
        keyCombo = null;
      } else {
        keyCombo = code;
      }
      // console.log('tentativa = ', codeCombo);
      if(VIEWS[codeCombo]){
        // console.log('>> currentView = ', codeCombo);
        currentView = VIEWS[codeCombo];
      }
      break;
  }
}

window.addEventListener('keydown', (event) => {
  eventsManager.getInstance().onEvent('keydown', event);
  switchView(event.code);
}, {passive: true})

window.addEventListener('wheel', (event) => {
  eventsManager.getInstance().onEvent('wheel', event);
}, {passive: true})

window.addEventListener('resize', (event) => {
  eventsManager.getInstance().onEvent('resize', event);
}, {passive: true})

main()
