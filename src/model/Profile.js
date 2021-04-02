// responsavel por fornecer dados
let data = {
  name: "Rafael",
  avatar: "https://avatars.githubusercontent.com/u/59876287?v=4",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 5,
  "vacation-per-year": 4,
  "value-hour": 75
}

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  },
}
