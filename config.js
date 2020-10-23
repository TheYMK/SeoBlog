import getConfig from 'next/config'; // So we can access configuration variables

const { publicRuntimeConfig } = getConfig();

// This way later it will be easy to access our api routes by just bringin API from this config file
export const API = publicRuntimeConfig.PRODUCTION
	? publicRuntimeConfig.API_PRODUCTION
	: publicRuntimeConfig.API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
	? publicRuntimeConfig.DOMAIN_PRODUCTION
	: publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;

export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;
// DOMAIN_DEVELOPMENT: 'http://localhost:3000',
// DOMAIN_PRODUCTION: 'https://seoblog.com'
