const http = require('http');
const url = require('url');
// const fs = require('fs');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if(req.url.includes('writeTemp')){
    

    const current_url = new URL('http://host.com'+req.url);
    const search_params = current_url.searchParams;


    res.write(`Temperature data written ${search_params}`)
    // fs.writeFile('data.json', '[{}]', function (err) {
    //   if (err) return console.log(err);
    // });
  }else{
    res.write('endpoint not found')
  }

  res.end();
}).listen(5000);