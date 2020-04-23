const prod = process.env.NODE_ENV === 'production'
// const prod = process.env.NODE_ENV === 'production'


module.exports = {
    'process.env.BASE_URL': prod ? 'https://rongeezy-dev.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': prod ? 'https://rongeezy-dev.herokuapp.com' : 'http://localhost:3000',
    'process.env.CLIENT_ID': 'NyPpgYDS3BjIG8fUDpvrrlToISdQUoFR'
}