const UserRouter = require('./UserRouter')
const MealRouter = require('./MealRouter')
const BookingRouter = require('./BookingRouter')
const RestaurantRouter = require('./RestaurantRouter')
const CheckoutRouter = require('./CheckoutRouter')

const routes = (app) => {
    app.use("/api/user", UserRouter)
    app.use("/api/meal", MealRouter)
    app.use("/api/booking/", BookingRouter)
    app.use("/api/restaurant/", RestaurantRouter)
    app.use("/api/checkout/", CheckoutRouter)
}
console.log("hieu da o day la route")
module.exports = routes