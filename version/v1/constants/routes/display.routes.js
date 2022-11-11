module.exports = app => {

    const  proses  = require("../../features/controllers/display.controller")
    let routes = require("express").Router()
    // const { auth } = require("../../features/middleware")

    // routes.use((req, res, next) => {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next()
    // })

    routes.get("/", proses.getHome)
    routes.get("/detailproduk", proses.getDetailProduk)

    app.use("/api/1/display", routes)
}