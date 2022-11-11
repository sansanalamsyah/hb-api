exports.printlog = (data) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log(dateTime + " " + (data.Cabang ?? "") + " " + JSON.stringify(data));
}

exports.secret = "best-sansan"

exports.removed = {
    removeSpesial: (str) => {
        return str.replace(/[^a-zA-Z1-9 ]/g, "")
    },
    removeSpesialAndUpper: (str) => {
        return str.replace(/[^a-zA-Z1-9 ]/g, "").toUpperCase()
    }
}