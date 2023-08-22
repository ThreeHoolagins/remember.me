import * as http from 'http';
import * as fs from 'node:fs';
import sendReminderEmail from './sendReminderEmail';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  setInterval(() => {
    console.log("Running Daily")
    sendBirthdayReminderEmails()
  }, 86400000)
});

function sendBirthdayReminderEmails() {

    let birthdayData = getBirthdayList();

    birthdayData.forEach(data => {
      let date = new Date();
      let number = parseInt(data[3])
      switch (data[2]) {
          case "Day":
            date.setDate(date.getDate() + number);
            break;
          case "Month":
            date.setMonth(date.getMonth() + number);
            break;
          default:
            date.setMonth(date.getMonth() + number);
            break;
      }

      let birthDateTime = new Date(data[1]);
      console.log(data, date);
      if (birthDateTime.getMonth() === date.getMonth() && birthDateTime.getDate() === date.getDate()) {
        let emailSubject = `Heads up! It's ${data[0]} birthday in ${data[3] + " " + data[2] + "(s)"}`;
        let emailText = `Let ${data[0]} know you love them by remembering thier birthday in ${data[3] + " " + data[2] + "(s)"}`;
        sendReminderEmail(emailSubject, emailText)
      }
    });
};

function getBirthdayList() {
  let allText = fs.readFileSync('./Data/birthdayReminderStore.csv', 'ascii');
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(',');
  var lines = [] as string[][];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [] as string[];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    return lines;
}