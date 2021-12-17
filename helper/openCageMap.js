const opencage = require('opencage-api-client');

const opencageMap = (alamat) => {
  return opencage.geocode({ q: alamat })
  .then((data) => {
    if (data.results.length > 0) {
      const place = data.results[0];
      return Promise.resolve(place)
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
    }
  });
}

module.exports = { opencageMap }