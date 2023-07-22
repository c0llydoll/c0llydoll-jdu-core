/**
 * Time handles dates, seconds and milliseconds!
 */
class Time {
    constructor() {
        this.offset = global.config?.TIME_OFFSET || 0;
    };

    seconds() {
        return Math.floor(this.milliseconds() / 1000);
    };

    secondsDouble() {
        return (this.milliseconds() / 1000);
    };
    
    milliseconds() {
        return Date.now() + this.offset;
    };

    day() {
        return new Date(this.milliseconds()).getUTCDay();
    };

    hours() {
        return new Date(this.milliseconds()).getUTCHours();
    };

    minutes() {
        return new Date(this.milliseconds()).getUTCMinutes();
    };

    round(time = this.milliseconds()) {
        return Math.round(time * 1000) / 1000;
    };
}

module.exports = new Time();