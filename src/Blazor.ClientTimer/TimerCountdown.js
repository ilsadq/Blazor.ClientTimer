import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export class TimerCountdownElement extends HTMLElement {
    constructor() {
        super();
        this.interval = parseInt(this.getAttribute("interval"));
        this.format = this.getAttribute("format");
        this.end = dayjs(this.getAttribute("end"));
    }
    
    connectedCallback() {
        this.formatDate();
        
        this._timer = setInterval(() => {
            this.formatDate();
        }, this.interval);
    }
    
    disconnectedCallback() {
        clearInterval(this._timer);
    }
    
    formatDate() {
        const now = dayjs();
        
        if (this.end.isBefore(now)) {
            if(this._timer) clearInterval(this._timer);
            return;
        }
        
        this.innerText = dayjs.duration(this.end.diff(now)).format(this.format);
    }
}

customElements.define("timer-countdown", TimerCountdownElement);