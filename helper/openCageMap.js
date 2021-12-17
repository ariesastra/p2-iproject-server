const opencage = require('opencage-api-client');

const opencageMap = (alamat, callback) => {
  opencage.geocode({ q: alamat })
  .then((data) => {
    // console.log(JSON.stringify(data));
    if (data.results.length > 0) {
      const place = data.results[0];
      
      callback(null, place)
      // save to instance db
      // instance.lat = `${place.geometry.lat}`
      // instance.long = `${place.geometry.lng}`
    } else {
      console.log('Status', data.status.message);
      console.log('total_results', data.total_results);
    }
  })
  .catch((error) => {
    // console.log(JSON.stringify(error));
    console.log('Error', error.message);
    
    if (error.status.code === 402) {
      console.log('hit free trial daily limit');
      // console.log('become a customer: https://opencagedata.com/pricing');
    }
  });
}

module.exports = { opencageMap }