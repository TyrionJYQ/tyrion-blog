module.exports = {
  getRandom: num => String(Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1)))
}