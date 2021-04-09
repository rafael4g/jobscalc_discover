module.exports = {
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
    // diferença em milissegundos arredondando o numero inteiro - INCORRETO
    // const dayDiff = Math.floor(timeDiffInMs / dayInMs)

    // diferença em milissegundos arredondando pra baixo - CORRETO
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

    // restam x dias
    return dayDiff
  },
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}