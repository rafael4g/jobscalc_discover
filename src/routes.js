const express = require("express")
const routes = express.Router()
const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Rafael",
    avatar: "https://avatars.githubusercontent.com/u/59876287?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },

  controllers: {
    index(req, res) {
     return res.render(views + "/profile", { profile: Profile.data })
    },

    update(){
      // req.body para pegar os dados
      // definir quantas semanas tem num ano
      // remover as semanas de férias do ano
      // quantas horas por semana estou trabalhando
      // total de horas no mes
    },
  },  

}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    }
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        // ajustes no job
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: Profile.data["value-hour"] * job["total-hours"]
        }
      })

      return res.render(views + "/index", { profile: Profile.data, jobs: updatedJobs })
    },

    save(req, res) {
      // calculo do ultimo id, se é o primeiro devolver 1
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      // alimentando arrays
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
      })

      return res.redirect("/")
    },

    create(req, res){
      res.render(views + "/job")
    },

  },

  services: {
    remainingDays(job) {
      // ajuste no job
      // calculo de tempo restante .toFixed() arredondamento
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

      // pega a data de criação do job
      const createdDate = new Date(job.created_at)
      // cria o dia em data futura em milissegundos
      const dueDay = createdDate.getDate() + Number(remainingDays)
      // cria um numero em milissegundos
      const dueDateInMs = createdDate.setDate(dueDay)
      // diferença do tempo q ira vencer - o agora
      const timeDiffInMs = dueDateInMs - Date.now()
      // transformar um dia em milissegundos
      const dayInMs = 1000 * 60 * 60 * 24
      // diferença em milissegundos arredondando pra baixo
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)

      // restam x dias
      return dayDiff
    }
  }
}

// request, response
routes.get("/", Job.controllers.index)
routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)
routes.get("/job/edit", (req, res) => res.render(views + "/job-edit"))
routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)


module.exports = routes;