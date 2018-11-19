'use strict';

const linksChecker = require('./util');

/**
 * Start checking the images from the base url
 * @param {*} baseUrl 
 * @param {*} baseDomain 
 */
const imagesChecker = (baseUrl, baseDomain = '') => {
    return linksChecker(baseUrl, baseDomain, 'src');
}

module.exports = imagesChecker;