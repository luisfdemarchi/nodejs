const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write('<body><form action="/message" method="POST">');
    res.write(
      '<input type="text" name="message"/> <button type="submit">Send</button>'
    );
    res.write("</form></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunck => {
      body.push(chunck);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      fs.writeFile("message.txt", parsedBody.split("=")[1], err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body>");
  res.write("<h1>Hello from node.js<h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
