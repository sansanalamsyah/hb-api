exports.display = {
  home: "SELECT * FROM mst_user_retail limit 0",
  imagebanner: "select NamaAssets,UrlImg from mst_assets where Tipe = 'banner' and status = 'Aktif'",
  imageproduk: (data) => `select NamaAssets,UrlImg from mst_assets where Tipe = 'product' and status = 'Aktif' and Groups = '${data.Produk}'`,
  listkategori: `SELECT Alias Kategori,UrlImg FROM(
    SELECT DISTINCT Alias FROM mst_group 
  )kategori JOIN mst_assets b ON kategori.Alias = b.NamaAssets`,
  trending: `SELECT produk.*,b.UrlImg,ROUND(c.HNA+(c.HNA*0.11)) Harga FROM (
    SELECT KodeProduk,NamaProduk,SUM(Qty)Jumlah FROM trs_order_detail_sales a WHERE 
    STATUS IN('Order','Kiriman','Pembayaran','Selesai') /*AND 
    DATE_FORMAT(AddDate,'%Y-%m') =DATE_FORMAT(CURDATE(),'%Y-%m')*/ GROUP BY KodeProduk ORDER BY jumlah DESC LIMIT 5 
    )produk JOIN mst_assets b ON produk.KodeProduk = b.NamaAssets
    JOIN mst_harga c ON produk.KodeProduk = c.Produk`,
  semuaproduk: (data = null) => {
    let produk = ``;
    let _select = ``
    if (data != null) {
      produk = ` and a.Kode_Produk = '${data.Produk}' `
     _select = ` ,a.Kategori,a.Dot,a.Satuan,a.Bentuk,a.Kandungan,a.Farmalkes,a.Ijin_Edar,a.Deskripsi `
    }
    return `SELECT a.Kode_Produk KodeProduk,IFNULL(a.Nama_Lain,a.Produk) NamaProduk,b.UrlImg,ROUND( c.HNA+(c.HNA*0.11)) Harga,IFNULL(sale.jumlah,0)Jual ${_select}  
    FROM mst_produk a 
        JOIN mst_assets b ON a.Kode_Produk = b.NamaAssets
        JOIN mst_harga c ON a.Kode_Produk= c.Produk
        LEFT JOIN (
        SELECT KodeProduk,SUM(Qty)jumlah FROM trs_order_detail_sales a WHERE 
        STATUS IN('Order','Kiriman','Pembayaran','Selesai') AND 
        DATE_FORMAT(ADDDATE,'%Y-%m') =DATE_FORMAT(CURDATE(),'%Y-%m') GROUP BY KodeProduk 
        )sale ON sale.KodeProduk = a.Kode_Produk
        WHERE a.Status_Aktif = 'Ya'  ${produk} `
  },
  detailproduk: (data) => {
    return `SELECT a.Kode_Produk KodeProduk, a.Produk NamaProduk,(b.HNA +(b.HNA * 0.11)) Harga FROM mst_produk a 
    JOIN mst_harga b ON a.Kode_Produk = b.Produk
    WHERE a.Kode_Produk= '${data.Produk}' AND a.Status_Aktif = 'Ya' ;`
  },
  detailprodukgroup: (data) => {
    return `SELECT b.KodeGroup,b.NamaGroup,b.KodeProduk,b.NamaProduk,b.Alias AliasGroup,d.UrlImg,
    ROUND(c.HNA +(c.HNA * 0.11))Harga,IFNULL(sale.jumlah,0)Jual
    FROM mst_group a 
    LEFT JOIN mst_group b ON a.KodeGroup = b.KodeGroup
    JOIN mst_harga c ON b.KodeProduk = c.Produk
    LEFT JOIN mst_assets d ON d.NamaAssets = b.KodeProduk
    LEFT JOIN (
    SELECT KodeProduk,SUM(Qty)jumlah FROM trs_order_detail_sales a WHERE 
    STATUS IN('Order','Kiriman','Pembayaran','Selesai') AND 
    DATE_FORMAT(ADDDATE,'%Y-%m') =DATE_FORMAT(CURDATE(),'%Y-%m') GROUP BY KodeProduk 
    )sale ON sale.KodeProduk = b.KodeProduk
    WHERE a.KodeProduk = '${data.Produk}';`
  },
  detailprodukgroupdiskon: (data) => {
    return `SELECT a.KodeGroup,a.NamaGroup, b.Qty1,b.Qty2,b.TglAwal,b.TglAkhir FROM mst_group a
    LEFT JOIN mst_diskon_online b ON a.KodeGroup = b.KodeProduk AND CURDATE() BETWEEN b.TglAwal AND b.TglAkhir
    WHERE a.KodeProduk = '${data.Produk}';`
  },
  detailprodukdiskon: (data) => {
    return `SELECT KodeProduk,NamaProduk,Qty1,Qty2,DiscPri,DiscCab,TglAwal,TglAkhir FROM mst_diskon_online WHERE 
    KodeProduk = '${data.Produk}' AND CURDATE() BETWEEN TglAwal AND TglAkhir ;`
  },
  detailprodukgroupbonus: (data) => {
    return `select a.KodeGroup,a.NamaGroup,a.KodeProduk,a.NamaProduk,
    b.KodeProdukBonus,b.NamaProdukBonus, b.Kelipatan, b.QtyBonus from mst_group a left join(
    select a.KodeBonus,a.NamaBonus,a.KodeProduk,a.NamaProduk,a.Kelipatan,a.QtyBonus,
    b.KodeProduk KodeProdukBonus,b.NamaProduk NamaProdukBonus
    from mst_bonus a join mst_bonus_detail b on a.Bonus = b.Bonus
    where curdate() between a.Tanggal1 and a.Tanggal2
    ) b on a.KodeGroup = b.KodeProduk
    where a.KodeProduk = '${data.Produk}';`
  },
  detailprodukbonus: (data) => {
    return `select a.KodeBonus,a.NamaBonus,a.KodeProduk,a.NamaProduk,a.Kelipatan,a.QtyBonus,
    b.KodeProduk KodeProdukBonus,b.NamaProduk NamaProdukBonus
    from mst_bonus a join mst_bonus_detail b on a.Bonus = b.Bonus
    where a.KodeProduk = '${data.Produk}' and curdate() between a.Tanggal1 and a.Tanggal2;`
  }

}
