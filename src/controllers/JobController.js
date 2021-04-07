const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async save(req, res) {
    // calculo do ultimo id, se é o primeiro devolver 1
    const jobs = await Job.get()
    /**
     * logica para data estatica
     * const lastId = jobs[jobs.length - 1]?.id || 0;
     */

    // alimentando arrays
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now()
    })

    return res.redirect("/")
  },

  create(req, res) {
    res.render("job")
  },

  async show(req, res) {
    // id que vem como parametro da requisição
    const jobId = req.params.id
    const jobs = await Job.get()
    // busca dentro de data( dados ) um id = jobId recebido no params da url
    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')
    }

    const profile = await Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
  },

  async update(req, res) {
    // id que vem como parametro da requisição
    const jobId = req.params.id

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    await Job.update(updatedJob, jobId)

    return res.redirect('/job/' + jobId)
  },

  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    return res.redirect("/")
  },
}