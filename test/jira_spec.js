import {expect} from 'chai';

import {jira, calculate} from '../src/core/jira';

describe('jira logic', () => {
  it('first test', () => {
    expect(true).to.equal(true);
  });

  it('adds correctly', () => {
    expect(calculate(1,1)).to.equal(2);
  });
});
