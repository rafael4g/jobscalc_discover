const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  save(req, res) {
    // calculo do ultimo id, se é o primeiro devolver 1
    const jobs = Job.get()
    const lastId = jobs[jobs.length - 1]?.id || 0;

    // alimentando arrays
    Job.create({
      id: lastId + 1,
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
    const jobs = Job.get()
    const profile = await Profile.get()
    // busca dentro de data( dados ) um id = jobId recebido no params da url
    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
  },

  update(req, res) {
    // id que vem como parametro da requisição
    const jobId = req.params.id
    const jobs = Job.get()
    // busca dentro de data( dados ) um id = jobId
    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')
    }

    const updatedJob = {
      ...job,
      // sobreescrevendo as proproedades abaixo( criar um tratamento != null )
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    const newJobs = jobs.map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob
      }

      return job
    })

    Job.update(newJobs)

    return res.redirect('/job/' + jobId)
  },

  delete(req, res) {
    const jobId = req.params.id

    Job.delete(jobId)

    return res.redirect("/")
  },
}