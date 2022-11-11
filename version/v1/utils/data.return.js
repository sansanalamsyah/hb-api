exports.dataRetrun = (data, valid) => {
    if(valid.valid){
        data.send({
            status: valid.valid,
            head: valid.head,
            data: valid.data,
            token: valid.token,
        })
    }else{
        data.status(401).send({
            status: valid.valid,
            data: valid.pesan
        })
    }
}

exports.dataRetrunDih = (data, valid, offset) => {
    if(valid.valid){
        data.send({
            status: valid.valid,
            data: valid.pesan,
            offset:offset,
        })
    }else{
        data.status(401).send({
            status: valid.valid,
            data: valid.pesan,
            offset:offset,
        })
    }
}

exports.dataValidReturnInfo = (data) => {
    let retrunData = {}
        if (data) {
            retrunData.valid = false
            retrunData.pesan = data.code
        } else {
            retrunData.valid = true
            retrunData.pesan = "sukses"
        }
        return retrunData
}