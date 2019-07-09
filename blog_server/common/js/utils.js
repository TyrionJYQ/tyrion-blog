const  {baseSuccess, baseFail, baseUnknown} = require('./apiConfig');

module.exports = {
  getRandom: num => String(Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1))),
  getResponseObj: () => {
    return {
      success: JSON.parse(JSON.stringify(baseSuccess)),
      fail:JSON.parse(JSON.stringify(baseFail)),
      unknown: JSON.parse(JSON.stringify(baseUnknown))
    }
   
  },
  
}