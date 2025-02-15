const UserRouter = require('./UserRouter')
const MealRouter = require('./MealRouter')

const routes = (app) => {
    app.use("/api/user", UserRouter)
    app.use("/api/meal", MealRouter)
}

module.exports = routes