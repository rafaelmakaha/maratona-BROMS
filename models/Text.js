import { COLORS } from "../settings/colors.js";
import { CONSTANTS } from "../settings/constants.js";
import { FONTS } from "../settings/fonts.js";
import canvasSingleton from "./Canvas.js";

class Text {
    constructor(Parent=undefined, text='', color=COLORS.mainTextColor, position='center', font=FONTS.default,  {x=0, y=0}={}) {
        this.Parent = Parent;
        this.text = text;
        this.color = color;
        this.position = position;
        this.font = font;
        this.x = x;
        this.y = y;
    }

    draw(){
        if(this.Parent){
            const diff = this.Parent.h * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
            let [dx, dy, offset] = this.align(this.text, this.position, this.Parent.w, this.Parent.h, this.font);
            const c = canvasSingleton.getInstance().getContext("2d");
            c.fillStyle = this.color;
            let maxWidth = this.Parent.w - diff - 2 * offset;
            c.fillText(this.text, this.x + dx, this.y - dy, maxWidth);
        } else {
            // implement without parent
        }
    }

    align(text, type, width='', height='', font=FONTS.default) {
        const ctx = canvasSingleton.getInstance().getContext("2d");
        ctx.font = `${font.size}px ${font.name}`;
        const textMetrics = ctx.measureText(text)
        const text_w = textMetrics.width
        const text_h = textMetrics.actualBoundingBoxAscent
        const offset = Math.max(width * 0.02, 1);
        const diff = height * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
        const ans = {
          center: [diff + (width - diff - text_w)/2, (height - text_h)/2, offset],
          left: [offset + diff,(height - text_h)/2, offset],
          right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, (height - text_h)/2, offset],
        }
        if (text_w > width - diff) return this.align(text, type, width, height, {...font, size: font.size - 1})
        return ans[type]
    }

    update(text, {color=this.color}={}) {
        this.text = text;
        this.color = color;
        this.x = this.Parent.x;
        this.y = this.Parent.y;
    }
}

export default Text;