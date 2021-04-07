const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) { 
    return res.render("profile", { profile: await Profile.get() })
  },

  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body
    // definir quantas semanas tem num ano
    const weeksPerYear = 52
    // remover as semanas de férias do ano, para pegar quantas semana tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
    // total de horas trabalhadas por semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    // total de horas no mes
    const monthlyTotalHours = weekTotalHours * weeksPerMonth
    //qual sera o valor da minha hora
    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

    const profile = await Profile.get()
    
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    })

    return res.redirect('profile')
  },
}