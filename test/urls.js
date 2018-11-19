'use strict';

const { urlsChecker } = require('../index');
const expect = require('chai').expect;

describe('Urls Checker Test:', () => {
    it('Get URLs result', async () => {        
        let results = await urlsChecker('https://google.com');        
        expect(results.ok.length).to.be.above(0);        
    });    
    it('Test for invalid URL without http/https', async () => {        
        try {
            await urlsChecker('google');
        } catch (error) {            
            expect(error).to.equal('google is invalid!')
        }
    });    
    it('Test Invalid URL', async () => {        
        try {
            await urlsChecker('https://gooasdfagle.ca') ;
        } catch (error) {
            expect(error).to.equal('getaddrinfo ENOTFOUND gooasdfagle.ca gooasdfagle.ca:443')
        }
    });    
})