'use strict';

import {queryJira, buildQuery} from './jira.js';

export function getProjectsInOrganization(res) {
  return queryJira(res, 'project');
}

export function getIssuesByProjectKey(res, projectKey) {
  return queryJira(res, 'search', buildQuery('project', projectKey));
}

export function getProjectByName(res, projectName) {
  getIssuesByProjectKey(res, projectName);
}
