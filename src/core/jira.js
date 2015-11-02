import https from 'https';
import basicAuth from 'basic-auth';
import user from './auth.json';

export function jira(res) {

  let headers = {
    'Authorization': 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'),
    'Content-Type': 'application/json'
  };

  let options = {
    host: user.host,
    port: '443',
    path: user.path,
    method: 'GET',
    headers: headers
  }

  let req = https.request(options, (jiraRes) => {
    jiraRes.on('data', (chunk) => {
      res.write(chunk);
    });

    jiraRes.on('end', () => {
      res.end();
    });

    jiraRes.on('error', (err) => {
      res.write(err);
      res.end();
    });
  });
  req.end();
  
  req.on('error', (err) => {
    console.error(err);
  })
}

export function calculate(one, two) {
  return one + two;
}
