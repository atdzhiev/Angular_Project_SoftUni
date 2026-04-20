require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: process.env.MONGO_URI || 'mongodb://localhost:27017/events',
        origin: ['http://localhost:5555', 'http://localhost:4200']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.MONGO_URI,
        origin: ['https://eventsapp-0eaf.onrender.com']
    }
};

module.exports = config[env];
