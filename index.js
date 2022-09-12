import Scoreboard from './models/Scoreboard.js';
import cameraSingleton from './models/Camera.js';
import { getContest, getRuns, getNewRuns, getContestEnd } from './services/api.js';
import {loadFont} from './utils/loadFont.js';
import canvasSingleton from './models/Canvas.js'
import { COLORS } from './settings/colors.js';
import eventsManager from './models/EventsManager.js';
import ScoreboardFirsts from './models/ScoreboardFirsts.js';
import ScoreboardExpanded from './models/ScoreboardExpanded.js';
import { MODE } from './appSettings.js';

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
  let contest = await getContest();

  let runs = (await getRuns()).filter(r => r.time >= 0).filter(r => r.time < Math.trunc(contest.duration ));
  // let runs = await getRuns();

  // Instatiate Scoreboard
  scoreboards = {
    default: new Scoreboard(
      contest.eventTitle, 
      contest.duration, contest.frozen, contest.blind, contest.penalty, 
      contest.qtdProblems
      // O que ja tem
    ), 
    firstHits: new ScoreboardFirsts(
      contest.eventTitle, 
      contest.duration, contest.frozen, contest.blind, contest.penalty, 
      contest.qtdProblems,
      // 'Primeiro a acertar'
    ),
    expanded: new ScoreboardExpanded(
      contest.eventTitle, 
      contest.duration, contest.frozen, contest.blind, contest.penalty, 
      contest.qtdProblems,
      // 'Primeiro a acertar'
    )
  };
  
  // Instatiate teams on base scoreboards
  contest.teams.forEach((team, _) => {
    Object.values(scoreboards).forEach((value) => {
      value.addRow(team)
    })
  });

  // Instatiate teams on region scoreboards
  // if (MODE != "CF") 
  // contest.teams.map((team, index) => {
  //   if(team.hasOwnProperty('region')){
  //     if(!scoreboards[team.region]){
  //       scoreboards[team.region] = new Scoreboard(
  //         contest.eventTitle, 
  //         contest.duration, contest.frozen, contest.blind, contest.penalty, 
  //         contest.qtdProblems,
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
    let newRuns = !runs.length ? await getRuns() : MODE == "MOCK" ? await getNewRuns(runs.length) : (await getNewRuns(runs[runs.length - 1]["runId"]));
    newRuns = newRuns.filter(r => r.time >= 0).filter(r => r.time < Math.trunc(contest.duration ));
    if(!newRuns.length) return
    if (MODE === "CF") {
      let newTeams = (await getContest()).teams.filter(nt => !contest.teams.find(t => t.teamId == nt.teamId))
      newTeams.forEach((team, _) => {
        // scoreboard.addRow(team)
        Object.values(scoreboards).forEach((value) => {
          value.addRow(team)
        })
      });
      contest.teams = contest.teams.concat(newTeams);
    }
    runs = newRuns
    runs.map((run,i) => {
      Object.keys(scoreboards).forEach((key) => {
        scoreboards[key].processRun(run)
      })
    })
  }, 2000);

  setInterval(async () => {
    updateAll();
    redrawAll();
  }, 33); // 1000/33 => 30fps
}

export const updateAll = () => {
  Object.keys(scoreboards).forEach((key) => {
    scoreboards[key].update()
  })
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
