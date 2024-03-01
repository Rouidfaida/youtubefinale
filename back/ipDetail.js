const axios = require('axios');
const { getCode, getName } = require('country-list');

function getRealIP(request) {
    let ipaddress = '';

    if (request.headers['http_client_ip']) {
        ipaddress = request.headers['http_client_ip'];
    } else if (request.headers['x-forwarded-for']) {
        ipaddress = request.headers['x-forwarded-for'].split(',')[0]; // Peut contenir plusieurs adresses IP
    } else if (request.headers['x-forwarded']) {
        ipaddress = request.headers['x-forwarded'];
    } else if (request.headers['forwarded-for']) {
        ipaddress = request.headers['forwarded-for'];
    } else if (request.headers['forwarded']) {
        ipaddress = request.headers['forwarded'];
    } else {
        ipaddress = request?.connection?.remoteAddress || request?.socket?.remoteAddress;
    }

    if (ipaddress === '::1') {
        ipaddress = '127.0.0.1';
    }

    return ipaddress;
}

async function ipDetails(ip, useragent) {
    try {
        const url = `http://extreme-ip-lookup.com/json/${ip}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': useragent,
                'Referer': 'https://google.com'
            }
        });

        const ipData = response.data;

        if (ipData && ipData.status === 'success') {
            return {
                country: ipData.country,
                country_code: ipData.countryCode,
                region: ipData.region,
                city: ipData.city,
                latitude: ipData.lat,
                longitude: ipData.lon,
                isp: ipData.isp,
            };
        } else {
            throw new Error('Data not found');
        }
    } catch (error) {
        return {
            country: "Unknown",
            country_code: "XX",
            region: "Unknown",
            city: "Unknown",
            latitude: "0",
            longitude: "0",
            isp: "Unknown",
        };
    }
}

async function ipCountry(ip, useragent) {
    try {
        const url = `http://ip.nf/${ip}.json`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': useragent,
                'Referer': 'https://google.com'
            }
        });

        const ipData = response.data;

        if (ipData.ip.country_code != null) {
            return ipData.ip.country_code;
        } else {
            throw new Error('Country code not found');
        }
    } catch (error) {
        return "XX";
    }
}

function ipCountryName(code) {
    return getName(code);
}

module.exports = {
    ipDetails,
    ipCountry,
    ipCountryName,
    getRealIP,
};
