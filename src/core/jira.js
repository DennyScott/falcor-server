import https from 'https';
import basicAuth from 'basic-auth';
import user from '../data/auth.json';
import rest from '../data/rest.json';
import _ from 'lodash';

export function queryJira(res, query, jql='') {

  let headers = {
    'Authorization': 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64'),
    'Content-Type': 'application/json'
  };
  
  jql = cleanJql(jql);
  let builtQuery = rest.all + query + jql;

  let options = {
    host: rest.host,
    port: '443',
    path: builtQuery,
    method: 'GET',
    headers: headers
  }

  let promise = new Promise((resolve, reject) => {
    let req = https.request(options, (jiraRes) => {
      let content = '';
      jiraRes.on('data', (chunk) => {
        content += chunk;  
      });
      jiraRes.on('end', () => {
        res.end();
        resolve(JSON.parse(content));
      });

      jiraRes.on('error', (err) => {
        res.write(err);
        res.end();
        reject();
      });
    });
    req.end();

    req.on('error', (err) => {
      console.error(err);
    });
  });

  return promise;
}

export function buildQuery(type, data = []) {
  let query = type + '%3D';
  if(data.constructor === Array) {
    _.forEach(data, (param, index) => {
      query += (data.length - 1 !== index 
        ? addParameterToQuery(param, true) : addParameterToQuery(param));
    });
  } else {
    query += addParameterToQuery(data);
  }
  return query;
}

function addParameterToQuery(param, and = false) {
  return and ? param + 'AND' : param; 
}

function cleanJql(jql) {
  jql = jql.replace('=', '%3D')
  return jql !== '' ? '?jql=' + jql : jql;
}
