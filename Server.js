  /*
//creating a server(http-hyper text transfer protocole)
const http = require("http");
const fs = require("fs");
const Server = http.createServer((req, res) => {
  //res.write('<h1>Node js</h1>');
if(req.url=='/'){
        res.write('Home Page');
    }
    else if(req.url=='/about'){
        res.write('About Page');
    }
    else{
        res.write('404 Not Found');
    }
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.write("Error in loading");
    } else {
      res.writeHead(200, { "content-Type": "text/html" });
      res.write(data);
     
    }
     res.end();
  });
});
Server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

const fs=require('fs')
fs.writeFile('output.txt','hello',(err)=>{
    if(err)throw err;
    console.log('File has been created');
})
})
*/
const http = require('http')
let data = [];
http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let finalData = JSON.parse(body);
            data.push(finalData)
            console.log(data)
            res.statusCode = 200;
            res.end('Data inserted')
        });
    }
    /*if(req.method == 'GET'){
        res.statusCode=200;
        res.end(JSON.stringify(data));
    }*/
    if (req.method == 'GET') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            if (body) {
                let parsed = JSON.parse(body);
                if (parsed.rollNo) {
                    let result = data.find(s => s.rollNo === parsed.rollNo);
                    res.end(JSON.stringify(result || {}));
                    return;

                }
            }
            res.end(JSON.stringify(data));
        })
    }
    if (req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
           let parsed = JSON.parse(body);
           let index = data.findIndex(s => s.rollNo === parsed.rollNo);
           data.splice(index,1);
           console.log(data);
           res.end("Data Deleted")
        });
    }
    if (req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
           let parsed = JSON.parse(body);
           let index = data.findIndex(s => s.rollNo === parsed.rollNo);
           data[index]=parsed;
           console.log(data);
           res.end("Data updated")
        });
    }
     /*if(req.method == 'GET'){
        res.statusCode=200;
        res.end(JSON.stringify(data));
    }*/
    if (req.method == 'GET') {
        if (req.url === '/getStudentByRollNo') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                if (body) {
                    let parsed = JSON.parse(body);
                    if (parsed.rollNo) {
                        let result = data.find(s => s.rollNo === parsed.rollNo);
                        res.end(JSON.stringify(result || {}));
                        return;

                    }
                }
            });
        }
        else {
            res.end(JSON.stringify(data));
        }
    }

    
}).listen(3000);