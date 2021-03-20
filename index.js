import Scoreboard from './models/Scoreboard.js';
import Camera from './models/Camera.js';
import { getContest } from './services/api.js'
import loadFont from './utils/loadFont.js'

const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
loadFont("MonospaceTypewriter")

const FILE_SEPARATOR = String.fromCharCode(28);

const camera = new Camera(0, 0)

let Singleton = (function () {
  var instance;

  function createInstance(canvas, camera, eventTitle, eventInfo, qtdProblems) {
      var object = new Scoreboard(canvas, camera, eventTitle, eventInfo, qtdProblems);
      return object;
  }

  return {
      getInstance: function (canvas, camera, eventTitle, eventInfo, qtdProblems) {
          if (!instance) {
              instance = createInstance(canvas, camera, eventTitle, eventInfo, qtdProblems);
          }
          return instance;
      }
  };
})();

let scoreboard;

const main = async () => {
  const rawData = await getContest('./sample/contest')
  const {
    eventTitle,
    eventInfo,
    qtdProblems,
    teams
  } = rawData

  // Instatiate Scoreboard
  scoreboard = Singleton.getInstance(canvas, camera, eventTitle, eventInfo, qtdProblems)

  // Instatiate teams
  teams.map((team, index) => {
    let teamInfo = team.split(FILE_SEPARATOR)
    scoreboard.addRow(teamInfo)
  })
  
  scoreboard.draw()
}

const redrawAll = () => {
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
  console.log(camera.y)
  if (event.code === "ArrowUp") {
    camera.move(0, camera.y - 40)
    redrawAll()
  }else if (event.code === "ArrowDown") {
    camera.move(0, camera.y + 40)
    redrawAll()
  }
}, {passive: true})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  redrawAll()
}, {passive: true})

main()