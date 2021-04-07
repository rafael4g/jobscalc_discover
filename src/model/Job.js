const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const jobs = await db.all(`SELECT * FROM jobs`)

    await db.close()

    const data = await jobs.map( job => {
      return {
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
      };
    })

    return data;
  },
  update(newJob) {
    data = newJob;
  },
  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id))
  },
  create(newJob) {
    data.push(newJob)
  }
}