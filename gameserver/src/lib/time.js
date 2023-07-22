var offset = 0;

class Time {
    constructor() {
        this.offset = global.config.TIME_OFFSET || 0;
    }
    
    milliseconds() {
        return Date.now() + this.offset;
    }

    seconds() {
        return Math.floor(this.milliseconds() / 1000);
    }

    secondsDouble() {
        return (this.milliseconds() / 1000);
    }

    day() {
        return new Date(this.milliseconds()).getUTCDay();
    }

    hours() {
        return new Date(this.milliseconds()).getUTCHours();
    }

    minutes() {
        return new Date(this.milliseconds()).getUTCMinutes();
    }

    round(time = this.milliseconds()) {
        return Math.round(time * 1000) / 1000
    }

    serverTime() {
        
    }
}

module.exports = new Time();