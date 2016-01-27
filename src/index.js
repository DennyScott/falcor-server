import express from 'express';
import {getIssuesByProjectKey, getProjectsInOrganization} from './core/project.js';
import passport from 'passport';
import AtlassianOAuth from 'passport-atlassian-oauth';
import _ from 'lodash';

let app = express();

app.get('/', function(req, res) {
  getProjectsInOrganization(res)
  .then((data) => {
    _.forEach(data, project => {
      console.log(project.name);
    }); 
  });
});


app.listen('3000', function() {
  console.log('Started frontend server');
});
