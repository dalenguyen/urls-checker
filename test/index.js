'use strict';

const urlsChecker = require('../index');
const expect = require('chai').expect;

describe('Urls Checker Test:', () => {
    it('Get URLs result', async () => {        
        let results = await urlsChecker('https://google.ca');
        expect(results.ok.length).to.be.above(0);
    });    
})