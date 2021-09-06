import { COLORS } from "../settings/colors.js";
import { CONSTANTS } from "../settings/constants.js";
import { FONTS } from "../settings/fonts.js";
import canvasSingleton from "./Canvas.js";

class Text {
    constructor(Parent=undefined, value='', color=COLORS.mainTextColor, selfAlign='center', font=FONTS.default,  {x=0, y=0}={}) {
        this.Parent = Parent;
        this.value = value;
        this.color = color;
        this.selfAlign = selfAlign;
        this.font = font;
        this.x = x;
        this.y = y;
    }

    setText(value, {selfAlign=this.selfAlign}={}){
        this.value = value;
        this.selfAlign = selfAlign;
    }

    draw(){
        const ctx = canvasSingleton.getInstance().getContext("2d");
        ctx.fillStyle = this.color;
        if(this.Parent){
            const diff = this.Parent.h * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
            let [dx, dy, offset] = this.align(this.value, this.selfAlign, this.Parent.w, this.Parent.h, this.font);
            let maxWidth = this.Parent.w - diff - 2 * offset;
            ctx.fillText(this.value, this.Parent.x + dx, this.Parent.y - dy, maxWidth);
        } else {
            ctx.fillText(this.value, this.x + dx, this.y - dy, maxWidth);
        }
    }

    align(value, type, width='', height='', font=FONTS.default) {
        const ctx = canvasSingleton.getInstance().getContext("2d");
        ctx.font = `${font.size}px ${font.name}`;
        const textMetrics = ctx.measureText(value)
        const text_w = textMetrics.width
        const text_h = textMetrics.actualBoundingBoxAscent
        const offset = Math.max(width * 0.02, 1);
        const diff = height * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
        const ans = {
          center: [diff + (width - diff - text_w)/2, (height - text_h)/2, offset],
          left: [offset + diff,(height - text_h)/2, offset],
          right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, (height - text_h)/2, offset],
        }
        if (text_w > width - diff) return this.align(value, type, width, height, {...font, size: font.size - 1})
        return ans[type]
    }

    update(value, {color=this.color}={}) {
        this.value = value;
        this.color = color;
    }
}

export default Text;