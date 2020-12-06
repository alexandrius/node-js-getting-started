const http = require('http');
const url = require('url');
// const fs = require('fs');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if(req.url.includes('writeTemp')){
    if(req.method === 'GET'){
      const current_url = new URL('http://host.com'+req.url);
      const search_params = current_url.searchParams;
      res.write(`[GET] = Temperature data written ${search_params}`)
      res.end();
    }else{
      var body = ''
      req.on('data', function(data) {
        body += data
        
        console.log('Partial body: ' + body)
      })

      req.on('end', function() {
        res.write(`[POST] = Temperature data written ${JSON.stringify(body)}`)
        res.end();
      })
    }
  }else{
    res.write('endpoint not found')
    res.end();
  }

}).listen(process.env.PORT || 5000);