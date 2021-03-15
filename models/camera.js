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
    }
    move(x, y){
        this.x = Math.min(this.xMax,Math.max(x, this.xMin));
        this.y = Math.min(this.yMax,Math.max(y, this.yMin));
    }
    update(scoreH){
        this.yMax = Math.max(0, scoreH - this.h)
    }
}

export default Camera