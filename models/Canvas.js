import { COLORS } from "../settings/colors.js";
import eventsManager from './EventsManager.js';

class Canvas {
    constructor(){      
        this.canvas = document.getElementById('canvas');
        this.canvas.style.border = `0px solid ${COLORS.canvasBorder}`;
        this.canvas.style.margin = 0;

        let manager = eventsManager.getInstance();
        manager.registerListener('resize', this)
    }
    onEvent(eventType, event){
        this.canvas = document.getElementById('canvas');
        if(eventType === 'resize'){
            this.canvas.width = event.target.innerWidth - 5;
            this.canvas.height = event.target.innerHeight - 5;
        }
    }
    getContext(){
        this.canvas = document.getElementById('canvas');
        return this.canvas.getContext('2d')
    }
    setSize(w, h){
        this.canvas.width = w;
        this.canvas.height = h;
    }
    getWidth(){
        this.canvas = document.getElementById('canvas');
        return this.canvas.width;
    }
    getHeight(){
        this.canvas = document.getElementById('canvas');
        return this.canvas.height;
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