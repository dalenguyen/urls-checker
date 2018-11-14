'use strict';

const request = require('request');
const cheerio = require('cheerio');

/**
 * Return a list of urls
 * @param {*} url 
 */
const getAllUrls = (url) => {    
    // console.log('Start getting url list from:', url);    
    return new Promise((resolve, reject) => {
        request(url, async (err, res, body) => {
            if(err) {
                reject(err.message)
            }            
            
            if(res === undefined) {                          
                reject({message: err.message})
            } else {
                resolve(await returnUrlList(body, url));                 
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
 */
const returnUrlList = (body, url) => {
    return new Promise((resolve, reject) => {
        if(body) {
            const urlList = [];                            

            let $ = cheerio.load(body);
            let links = $('a')
            $(links).each((i, link) => {                
                let href = $(link).attr('href');
                if(href !== undefined) {
                    if(!href.includes('http')) {
                        href = url + href;
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

/**
 * Start checking the base url
 * @param {} baseUrl 
 */
const urlsChecker = (baseUrl) => {
    return new Promise(async (resolve, reject) => {
        if(baseUrl.includes('http')) {
            let urls;
            try {
                urls = await getAllUrls(baseUrl);      
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

module.exports = urlsChecker;