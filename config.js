const testMode = parseInt(process.env.TEST_MODE) === 1;
const isAcceptanceTestTarget = ['local', 'dev', 'development', 'test', 'qa', 'preprod'].includes(process.env.NODE_ENV);

module.exports = {
    blipp: {
        showAuth: true
    },
    jwt: {
        key: process.env.JWT_SECRET,
        verifyOptions: { algorithms: ['HS256'] }
    },
    logger: {
        level: testMode ? 'info' : 'error',
        airbrakeKey: process.env.ERRBIT_KEY,
        airbrakeHost: process.env.ERRBIT_SERVER,
        airbrakeLevel: 'error'
    },
    pg: {
        connectionString: process.env.DATABASE_URL,
        max: 5,
    },

    server: {
        port: 8009,
        router: {
            stripTrailingSlash: true
        }
    },

    isAcceptanceTestTarget
};
