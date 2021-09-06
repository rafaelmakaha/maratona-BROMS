import Parallelogram from './Parallelogram.js';
import { COLORS } from '../settings/colors.js';

class PositionParallelogram extends Parallelogram {
    constructor(Parent=undefined, x, y, wRel, h, text=undefined, fillColor='white', borderColor='black'){
        super(Parent, x, y, wRel, h, text, fillColor, borderColor)
        this.setText(text);
    }

    setText(text, {selfAlign=this.text.selfAlign}={}) {
        let rank = Number(text);
        this.text.setText(text, selfAlign);
        if(rank <= 3){
            this.fillColor = COLORS.goldPosition;
        }else if(rank <= 6){
            this.fillColor = COLORS.silverPosition;
        }else if(rank <= 10){
            this.fillColor = COLORS.bronzePosition;
        }else{
            this.fillColor = COLORS.defaultPosition;
        }
    }
}

export default PositionParallelogram;