import { COLORS } from "../settings/colors.js";
import { CONSTANTS } from "../settings/constants.js";
import { FONTS } from "../settings/fonts.js";
import canvasSingleton from "./Canvas.js";

class TextExpanded {
    constructor(Parent=undefined, value='', color=COLORS.mainTextColor, selfAlign='center', font=FONTS.default,  {x=0, y=0}={}) {
        this.Parent = Parent;
        this.value = value;
        this.color = color;
        this.selfAlign = selfAlign;
        this.font = font;
        this.x = x;
        this.y = y;
        this.lineHeight = 40;
    }

    setText(value, {selfAlign=this.selfAlign}={}){
        this.value = value;
        this.selfAlign = selfAlign;
    }

    draw(){
        const ctx = canvasSingleton.getInstance().getContext();
        ctx.fillStyle = this.color;
        if(this.Parent){
            const diff = this.Parent.h * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
            const lines = typeof this.value == 'string' ? this.value.split('\n') : [];
            const linesLength = lines.length;
            if(linesLength > 1){
                let [dx, dy, offset, textH] = this.multiAlign(lines[0], this.selfAlign, this.Parent.w, this.Parent.h, this.font, lines.length);
                let maxWidth = this.Parent.w - diff - 2 * offset;

                for(let i=0; i<linesLength; i++){
                    // if(lines[1]=='UFPE') console.log('///', i * textH, dy)
                    ctx.fillText(lines[i], this.Parent.x + dx, this.Parent.y - ((linesLength-i) * dy) - ((linesLength-i-1) * textH), maxWidth);
                }

            }else{
                let [dx, dy, offset] = this.align(this.value, this.selfAlign, this.Parent.w, this.Parent.h, this.font, lines.length);
                let maxWidth = this.Parent.w - diff - 2 * offset;
                ctx.fillText(this.value, this.Parent.x + dx, this.Parent.y - dy, maxWidth);
            }
        } else {
            ctx.fillText(this.value, this.x + dx, this.y - dy, maxWidth);
        }
    }

    multiAlign(value, type, width='', height='', font=FONTS.default, lineCount=1) {
        /*
            Dividir a altura disponivel deixando espaçamento entre as linhas igual
        */
        const ctx = canvasSingleton.getInstance().getContext();
        ctx.font = `${font.size}px ${font.name}`;
        const textMetrics = ctx.measureText(value)
        const text_w = textMetrics.width
        const text_h = textMetrics.actualBoundingBoxAscent
        const offset = Math.max(width * 0.02, 1);
        const diff = height * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
        const baseHeigth = (height - (text_h*lineCount))/3
        // if(value=='UFPE') console.log('///', height, text_h, lineCount)

        const ans = {
          center: [diff + (width - diff - text_w)/2, baseHeigth, offset, text_h],
          left: [offset + diff,baseHeigth, offset, text_h],
          right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, baseHeigth, offset, text_h],
        }
        if (text_w > width - diff) return this.multiAlign(value, type, width, height, {...font, size: font.size - 1}, lineCount)
        return ans[type]
    }

    align(value, type, width='', height='', font=FONTS.default) {
        const ctx = canvasSingleton.getInstance().getContext();
        ctx.font = `${font.size}px ${font.name}`;
        const textMetrics = ctx.measureText(value)
        const text_w = textMetrics.width
        const text_h = textMetrics.actualBoundingBoxAscent
        const offset = Math.max(width * 0.02, 1);
        const diff = height * Math.tan(CONSTANTS.ang) / 2 // é o cateto oposto
        
        const finalLength = (height - text_h)/2;
        const ans = {
          center: [diff + (width - diff - text_w)/2, finalLength, offset],
          left: [offset + diff,finalLength, offset],
          right: [width - text_w - offset < 0 ? width - text_w : width - text_w - offset, finalLength, offset],
        }
        if (text_w > width - diff) return this.align(value, type, width, height, {...font, size: font.size - 1})
        return ans[type]
    }

    update(value, {color=this.color}={}) {
        this.value = value;
        this.color = color;
    }
}

export default TextExpanded;