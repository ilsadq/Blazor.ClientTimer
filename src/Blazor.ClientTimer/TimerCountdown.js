export class TimerCountdownElement extends HTMLElement {
    /**
     * Timer instance
     * @private {number}
     */
    _timer;
    
    constructor() {
        super();
    }   
    
    connectedCallback() {
        const end = parseInt(this.getAttribute("max"));
        const interval = parseInt(this.getAttribute("interval"));

        const dateFormat = new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "UTC",
        });

        this._timer = setInterval(() => {
            this.innerText = dateFormat.format(new Date(end - new Date().getMilliseconds()));
        }, interval);
    }
    
    disconnectedCallback() {
        clearInterval(this._timer);
    }
}

customElements.define("timer-countdown", TimerCountdownElement);