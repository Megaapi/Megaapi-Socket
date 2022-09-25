const axios = require('axios').default;

async function sendPost(json){

   var r = axios.post('http://localhost/socket/index.php', {
        json: json
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      //return r;

}

module.exports = {

    sendPost
}