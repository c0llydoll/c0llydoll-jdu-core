const schedule = require('node-schedule');

const Agenda = require("agenda");
const uuid = require("uuid");

const time = require("time");
const sessionDb = require("./models/session");
const wdfScoreDb = require("./models/wdf-score");

class Scheduler {
    constructor() {
        this.agenda = new Agenda({ 
            mongo: global.dbClient.db("scheduler"),
            lockLimit: 0
        });
        this.agenda.on('ready', async () => {
            global.logger.success(`Scheduler is ready!`)
        });
    }

    newJob(def = "No definiton", time, fn) {
        const date = new Date(time);

        schedule.scheduleJob(def, date, fn);

        global.logger.info(`Scheduler: New job assigned for ${time}: ${def}`);
        return;

    }

    cancelJob(def) {
        const jobs = schedule.scheduledJobs || [];
        if (!jobs[def]) {
            global.logger.warn(`Scheduler: ${def} is not an existing job, can't cancel!`);
            return;
        }
        const job = jobs[def];
        job.cancel();
        global.logger.info(`Scheduler: Canceled ${def} job!`)
    }

    async botScoreJob(sid, fn) {
        const def = `update bot score ${sid}`;
        this.agenda.define(def, fn);
        await this.agenda.start();
        await this.agenda.every("5 seconds", def);
    }

    /**
     * Creates a new job and deletes dead session
     * We use this because MongoDB's TTL function only gets called every 60s
     * and our session TTL is 30 seconds
     */
    async sessionJob() {
        const hash = uuid.v4();
        this.agenda.define(`remove dead sessions ${hash}`, async (job, done) => {
            const expiration = new Date(Date.now() - global.gs.EXPIRED_SESSION_INTERVAL);
            
            const sessions = await sessionDb.find({
                updatedAt: { $lt: expiration }
            });
            const scores = await wdfScoreDb.find({
                updatedAt: { $lt: expiration }
            });
            const sessionIds = sessions.map(s => s.sessionId);

            const { deletedCount: sessionCount } = await sessionDb.deleteMany({
                sessionId: sessions.map(s => s.sessionId)
            });

            const { deletedCount: scoreCount } = await wdfScoreDb.deleteMany({
                sessionId: scores.map(s => s.sessionId)
            });

            if (sessionCount > 0)
                global.logger.info(`Scheduler deleted ${sessionCount} inactive sessions.`);
            if (scoreCount > 0)
                global.logger.info(`Scheduler deleted ${scoreCount} inactive scores.`);
            

            done();
        });
        await this.agenda.start();
        await this.agenda.every("30 seconds", `remove dead sessions ${hash}`);
    }
}

module.exports = new Scheduler();