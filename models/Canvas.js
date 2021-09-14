import { redrawAll, updateAll } from "../index.js";
import { COLORS } from "../settings/colors.js";
import eventsManager from './EventsManager.js';

class Canvas {
    constructor(){      
        var canvas = document.getElementById('canvas');
        canvas.style.border = `0px solid ${COLORS.canvasBorder}`;
        canvas.style.margin = 0;

        let manager = eventsManager.getInstance();
        manager.registerListener('resize', this)
    }
    onEvent(eventType, event){
        var canvas = document.getElementById('canvas');
        if(eventType === 'resize'){
            // let w = event.target.innerWidth;
            // let h = event.target.innerHeight;
            console.log("EVENTO Do CANVAS " + event.w + " " + event.h)
            canvas.width = event.w;
            canvas.height = event.h;
        }
        updateAll()
        redrawAll()
    }
    getContext(){
        var canvas = document.getElementById('canvas');
        return canvas.getContext('2d')
    }
}

let canvasSingleton = (function () {
    var instance;
    function createInstance() {
        return new Canvas();
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default canvasSingleton;