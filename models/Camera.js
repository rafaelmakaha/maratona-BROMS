import eventsManager from './EventsManager.js';

class Camera {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.xMin = 0;
        this.yMin = 0;
        this.xMax = 0;
        this.ymax = 0;

        let manager = eventsManager.getInstance();
        manager.registerListener('keydown', this)
        manager.registerListener('wheel', this)
        manager.registerListener('resize', this)
        manager.registerListener('scoreboardResize', this)
    }
    move(x, y){
        this.x = Math.min(this.xMax,Math.max(x, this.xMin));
        this.y = Math.min(this.yMax,Math.max(y, this.yMin));
    }
    setYMax(scoreH){
        this.yMax = Math.max(0, scoreH - this.h)
    }
    resize(w,h){
        this.w = w;
        this.h = h;
    }

    onEvent(eventType, event){
        if(eventType === 'keydown'){
            if (event.code === "ArrowUp") {
                this.move(0, this.y - 50)
            }else if (event.code === "ArrowDown") {
                this.move(0, this.y + 50)
            }
            let manager = eventsManager.getInstance();
            manager.notify('cameraMovement', this)
        }else if(eventType === 'wheel'){
            if (event.deltaY < 0) {
                this.move(0, this.y - 25)
            }
            else if (event.deltaY > 0) {
                this.move(0, this.y + 25)
            }
            let manager = eventsManager.getInstance();
            manager.notify('cameraMovement', this)
        }else if(eventType === 'resize'){
            this.resize(event.target.innerWidth, event.target.innerHeight);
        }else if(eventType === 'scoreboardResize'){
            this.setYMax((event.totalRows + 1) * event.rowHeight + 4);
        }
    }
}

let cameraSingleton = (function () {
    var instance;
    function createInstance() {
        var object = new Camera(0,0)
        return object;
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


export default cameraSingleton;