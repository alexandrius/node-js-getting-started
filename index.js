const http = require("http");
const url = require("url");
const fs = require("fs");
const dayjs = require("dayjs");

const logfile = "./log.json";

const row = (html) => `<tr>\n${html}</tr>\n`,
   heading = (object) =>
      row(
         Object.keys(object).reduce(
            (html, heading) => html + `<th>${heading}</th>`,
            ""
         )
      ),
   datarow = (object) =>
      row(
         Object.values(object).reduce(
            (html, value) => html + `<td>${value}</td>`,
            ""
         )
      );

function htmlTable(dataList) {
   return `<table>
            ${heading(dataList[0])}
            ${dataList.reduce((html, object) => html + datarow(object), "")}
          </table>`;
}

function writeChanges(res, method, data) {
   fs.readFile(logfile, function (err, buf) {
      if (data) {
         const output = `[${method}] | Temperature data written = ${data}`;
         res.write(`Current - ${output}`);
         // res.write("</br>");
         // res.write("</br>");
         // res.write("</br>");
         // const logArray = [
         //    { date: dayjs().format(), value: output },
         //    ...JSON.parse(buf.toString()),
         // ];
         // res.write(htmlTable(logArray));
         // fs.writeFileSync(logfile, JSON.stringify(logArray));
      } else {
         // res.write(htmlTable(JSON.parse(buf.toString())));
      }

      res.end();
   });
}

http
   .createServer(function (req, res) {
      res.writeHead(200, { "Content-Type": "text/html" });
      if (req.url.includes("writeTemp")) {
         if (req.method === "GET") {
            const current_url = new URL("http://host.com" + req.url);
            const search_params = current_url.searchParams;
            writeChanges(res, req.method, search_params);
         } else {
            let body = "";
            req.on("data", function (data) {
               body += data;
               console.log("Partial body: " + body);
            });
            req.on("end", function () {
               writeChanges(res, req.method, JSON.stringify(body));
            });
         }
      } else if (req.url === "/readTemp") {
         writeChanges(res, req.method);
      } else {
         res.write("endpoint not found");
         res.end();
      }
   })
   .listen(process.env.PORT || 5000);
