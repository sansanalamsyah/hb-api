var d = new Date();
var second = (d.getSeconds().toString().length == 1 ? "0" + d.getSeconds() : d.getSeconds());
var hr = (d.getHours().toString().length == 1 ? "0" + d.getHours() : d.getHours());
var min = (d.getMinutes().toString().length == 1 ? "0" + d.getMinutes() : d.getMinutes());
var date = (d.getDate().toString().length == 1 ? "0" + d.getDate() : d.getDate());
var month = (d.getMonth().toString().length == 1 ? "0" + d.getMonth() : d.getMonth());
var year = (d.getFullYear().toString().length == 1 ? "0" + d.getFullYear() : d.getFullYear());

module.exports = year + "-" + month + "-" + date + " " + hr + ":" + min + ":" + second