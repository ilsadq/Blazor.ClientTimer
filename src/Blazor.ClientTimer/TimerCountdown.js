import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export class TimerCountdownElement extends HTMLElement {
    static get observedAttributes() {
        return ["end", "interval", "format", "locale"];
    }
    
    constructor() {
        super();
        this.interval = parseInt(this.getAttribute("interval"));
        this.format = this.getAttribute("format");
        this.end = dayjs(this.getAttribute("end"));
        this.end.locale(this.locale);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "end":
                this.end = dayjs(newValue);
                break;
            case "interval":
                this.interval = parseInt(newValue);
                break;
            case "format":
                this.format = newValue;
                break;
        }
        
        this.formatDate();
    }
    
    connectedCallback() {
        if (this._timer) this.clearTimer();
        
        this.formatDate();
        
        this._timer = setInterval(() => {
            this.formatDate();
        }, this.interval);
    }
    
    disconnectedCallback() {
        this.clearTimer();
    }
    
    clearTimer() {
        if(this._timer) clearInterval(this._timer);
        this._timer = null;
    }
    
    formatDate() {
        const now = dayjs();
        
        if (this.end.isBefore(now)) {
            this.clearTimer();
            return;
        }
        
        this.innerText = dayjs.duration(this.end.diff(now)).format(this.format);
    }
}

customElements.define("timer-countdown", TimerCountdownElement);