import express from 'express';
import {jira} from './core/jira';
import passport from 'passport';
import AtlassianOAuth from 'passport-atlassian-oauth';

let app = express();

app.get('/', function(req, res) {
  jira(res);
});

app.listen('3000', function() {
  console.log('Started frontend server');
});
