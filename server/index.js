const express = require('express');
const next = require('next');
const routes = require('../routes');
const mongoose = require('mongoose')


//SERVICES
const authService = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config')
const bodyParser = require('body-parser')

const wordRoutes = require('./routes/words')

const secretData = [
    {
        title: 'secretData1',
        description: 'plans to destroy the world'
    },
    {
        title: 'secretData2',
        description: 'plans to restore the world'
    }
]

mongoose.connect(config.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database connected"))
.catch(err => console.log(err))


app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.json())

  server.use('/api/v1/words', wordRoutes)

  server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
    return res.json(secretData)
  })

  server.get('/api/v1/onlysitewoner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
    console.log(req.user)
    return res.json(secretData)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title: 'unauthorized', detail: 'unauthorized access'});
    }
  });

const PORT = process.env.PORT || 3000

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on '+PORT)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
