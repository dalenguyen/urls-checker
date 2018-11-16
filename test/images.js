'use strict';

const { imagesChecker } = require('../index');
const expect = require('chai').expect;

describe('Images Checker Test:', () => {
    it('Get Ok Images result', async () => {        
        let results = await imagesChecker('https://www.google.com/');  
        expect(results.ok.length).to.be.above(0);                          
    });
    it('Check for separate domain', async () => {        
        let results = await imagesChecker('https://www.google.com/', 'https://www.google.ca/');  
        expect(results.ok[0]).include('https://www.google.ca/')                            
    });       
    it('Test for invalid URL without http/https', async () => {        
        try {
            await imagesChecker('google');
        } catch (error) {            
            expect(error).to.equal('The URL is invalid!')
        }
    });    
    it('Test Invalid URL', async () => {        
        try {
            await imagesChecker('https://gooasdfagle.ca') ;
        } catch (error) {            
            expect(error).to.equal('getaddrinfo ENOTFOUND gooasdfagle.ca gooasdfagle.ca:443')
        }
    });  
})