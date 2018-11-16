'use strict';

const request = require('request');
const cheerio = require('cheerio');

let baseDomain = '';
const limtedNumberOfLinks = 400;

/**
 * Set the base domain if provides
 * @param {*} url 
 */
const setBaseDomain = (url) => baseDomain = url;

/**
 * Return a list of urls
 * @param {*} url 
 * @param {*} type Default is url
 */
const getAllUrls = (url, type) => {    
    // console.log('Start getting url list from:', url);    
    return new Promise((resolve, reject) => {
        request(url, async (err, res, body) => {
            if(err) {
                reject(err.message)
            }            
            
            if(res === undefined) {                          
                reject({message: err.message});
            } else {                                
                resolve(await returnUrlList(body, url, type));                
            }             
        });
    }); 
}

/**
 * Future impliment with external urls
 * @param {*} body 
 * @param {*} url 
 */
const returnUrlListWithExternal = (body, url) => {
    return new Promise(resolve => {
        const internalUrlList = [];                    
        const externalUrlList = [];

        $ = cheerio.load(body);
        links = $('a')
        $(links).each((i, link) => {                
            let href = $(link).attr('href');
            if(href !== undefined) {
                if(!href.includes('http')) {
                    href = url + href;
                }
        
                // Only push if internal url doesn't exist in the array
                if(internalUrlList.indexOf(href) === -1 && href.includes(mainDomain)) {
                    internalUrlList.push(href);
                }

                // Only push if external url doesn't exist in the array
                if(externalUrlList.indexOf(href) === -1 && !href.includes(mainDomain)) {
                    externalUrlList.push(href);
                }
            }      
        });

        resolve({
            internalUrls: internalUrlList,
            externalUrls: externalUrlList
        });
    })
}

/**
 * Return an array of Urls
 * @param {*} body 
 * @param {*} url 
 * @param {*} type 
 */
const returnUrlList = (body, url, type) => {
    return new Promise((resolve, reject) => {
        if(body) {
            const urlList = [];                            

            let $ = cheerio.load(body);
            let links = type === 'href' ? $('a') : $('img');

            // Limit number of links that we will check
            let limitedLinks = links.slice(0, limtedNumberOfLinks);

            $(limitedLinks).each((i, link) => {                
                let href = $(link).attr(type);
                if(href !== undefined) {                                        
                    if(!href.includes('http')) {                        
                        href = baseDomain + href;                        
                    }                    
            
                    // Only push if url doesn't exist in the array
                    if(urlList.indexOf(href) === -1) {
                        urlList.push(href);
                    }    
                }      
            });
    
            resolve(urlList);
        } else {
            reject({message: `Cannot get content from ${url}`});
        }        
    })
}

/**
 * Return url with status code if it failed
 * @param {} url 
 */
const getUrlResult = (url) => {
    return new Promise(resolve => {
        request(url, (err, res, body) => {             
            if(res === undefined) {                    
                resolve({err: url, code: err.message});
            } else {                    
                if(res.statusCode !== 200) {                    
                    resolve({fail: url, code: res.statusCode});
                } else {                    
                    resolve({ok: url});
                }
            }                   
        });
    })
}

module.exports = { setBaseDomain, getAllUrls, getUrlResult };