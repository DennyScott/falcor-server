import https from 'https';
import basicAuth from 'basic-auth';
import user from '../data/auth.json';
import rest from '../data/rest.json';
import _ from 'lodash';

export function jira(res) {

  let headers = {
    'Authorization': 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'),
    'Content-Type': 'application/json'
  };

  let options = {
    host: rest.host,
    port: '443',
    path: rest.all,
    method: 'GET',
    headers: headers
  }

  let req = https.request(options, (jiraRes) => {
    let content = '';
    jiraRes.on('data', (chunk) => {
      content += chunk;  
    });

    jiraRes.on('end', () => {

      content = JSON.parse(content);
      _.forEach(content.issues, (issue) => {
        res.write(issue.self + '\n');
      });

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
