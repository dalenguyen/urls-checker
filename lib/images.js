'use strict';

const {setBaseDomain, getAllUrls, getUrlResult} = require('./util');

/**
 * Start checking the images from the base url
 * @param {*} baseUrl 
 * @param {*} baseDomain 
 */
const imagesChecker = (baseUrl, baseDomain = '') => {
    
    baseDomain === '' ? setBaseDomain(baseUrl) : setBaseDomain(baseDomain);

    return new Promise(async (resolve, reject) => {
        if(baseUrl.includes('http')) {
            let urls;
            try {
                urls = await getAllUrls(baseUrl, 'src');                
                    
                const okUrls = [];
                const failUrls = [];
                const errorURls = [];    
        
                for (let index = 0; index < urls.length; index++) {
                    let urlResult = await getUrlResult(urls[index]);               
                                                
                    if(urlResult.err) {
                        errorURls.push([urls[index], urlResult.code]);
                    } else if (urlResult.fail) {
                        failUrls.push([urls[index], urlResult.code]);
                    } else {
                        okUrls.push(urls[index]);
                    }            
                }        
                resolve({
                    ok: okUrls,
                    fail: failUrls,
                    error: errorURls
                }) 
            } catch (error) {
                reject(error);
            }                                
        } else {
            reject('The URL is invalid!');
        }                    
    });
}

module.exports = imagesChecker;