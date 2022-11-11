const model = require('../../features/models/display.model')
const utils = require('../../utils/data.return')

exports.getHome = async (req, res) => {
    const user = req.query.user ?? "";
    const cabang = req.query.cabang ?? "";

    const data = {
        Metode: "home",
        User: user,
        Cabang: cabang,
    }
    const dataReturn = await model.view(data)
    utils.dataRetrun(res, dataReturn)

}

exports.getDetailProduk = async (req, res) => {

    const user = req.query.user ?? "";
    const cabang = req.query.cabang ?? "";
    const produk= req.query.produk ?? "";

    const data = {
        Metode: "detailproduk",
        User: user,
        Cabang: cabang,
        Produk: produk,
    }

    const dataReturn = await model.view(data)
    utils.dataRetrun(res, dataReturn)

}