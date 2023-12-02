import superagent from 'superagent';

const service = superagent.agent();
service.use((req) => {
    const base = isRunningOnLocalhost()
        ? 'http://efarming.test/api'
        : 'https://api.i-farm.site/api';
    req.url = base + req.url;
    req.set('Content-Type', 'application/json');
    // req.set('Access-Control-Allow-Origin', '*');
});

export const isRunningOnLocalhost = (): boolean => {
    return (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    );
};

export default service;
