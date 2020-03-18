const http = require('http')

const htmlcode = `
<html>
<head>
<title> My First Page</title>
</head>
<body>
<form action='/message' method='POST'> 
    <input type="textbox" name='message' />
    <button type='submit'> Submit</button>
</form>
</body>
</html>
`;
const server = http.createServer((req,res) => {
    console.log('req',req.url, req.method)
    if (req.url === '/') {
        res.setHeader('content-Type', 'text/html')
        res.write(htmlcode)
        return res.end()
    }
    else if (req.url === '/message' && req.method ==='POST') {
        const body = []
        req.on('data',(chunk) => {
            body.push(chunk)
        })
        req.on('end',()=> {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parseBody',parsedBody)
        })
        return res.end()
    } 
})

server.listen(3002)
