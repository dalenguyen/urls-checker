'use strict';

const linksChecker = require('./util');

/**
 * Start checking the base url
 * @param {*} baseUrl 
 * @param {*} baseDomain 
 */
const urlsChecker = (baseUrl, baseDomain = '') => {
    return linksChecker(baseUrl, baseDomain, 'href')
}

module.exports = urlsChecker;