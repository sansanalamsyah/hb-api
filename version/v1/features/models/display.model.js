const connection = require('../../../../config/local.database')
const dbstring = require('../../constants/string.database').display
const logprint = require('../../utils/add.string')

exports.view = async (data) => {

    let dataSql = {}
    let dataReturn = {}
    if (data.Metode == "home") {

        dataSql.banner = dbstring.imagebanner
        dataSql.kategori = dbstring.listkategori
        dataSql.treding = dbstring.trending
        dataSql.produk = dbstring.semuaproduk()
    }

    if (data.Metode == "detailproduk") {
        dataSql.asset = dbstring.imageproduk(data)
        dataSql.produk = dbstring.semuaproduk(data)
        dataSql.group = dbstring.detailprodukgroup(data)
        dataSql.groupdiskon = dbstring.detailprodukgroupdiskon(data)
        dataSql.produkdiskon = dbstring.detailprodukdiskon(data)
        dataSql.groupbonus = dbstring.detailprodukgroupbonus(data)
        dataSql.produkbonus = dbstring.detailprodukbonus(data)
    }

    for (const value in dataSql) {
        
        let result = await connection.awaitQuery(dataSql[value])
        
        dataReturn[value] = JSON.parse(JSON.stringify(result))
    }

    return ({ valid: true, head: data.Metode, data: dataReturn })

}
