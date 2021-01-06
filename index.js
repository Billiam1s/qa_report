'use strict'
const express = require('express')
const app = express()
const { spawn } = require('child_process')
const { Transform } = require('stream')

const createTransformer = () => {
    return new Transform({
        runFinished: false,
        transform: (chunk, encoding, done) => {
            // console.log(chunk.toString())
            let result = chunk.toString()
            if (result.search('Running:  ') !== -1) {
                this.runFinished = true
            }

            if (!this.runFinished) {
                done (null, null)
                return;
            }
            //
            // result = result.replace(/\(Run Starting\)(.*)\┘/g, '')
            // result = result.replace(/Tests(.*)Duration/gms, 'Duration')
            // result = result.replace(/Spec Ran\:(.*)something /g, '')
            // result = result.replace(/\.spec\.js/g, '        ')
            // result = result.replace(/at Context(.*)\)/g, '')

            done(null, result)
            // console.log(chunk.toString())
        }
    })
}

app.get('/', (req, res) => {
    res.send(`
    Please enter URL address:
    <form action="/" method="POST">
      <input type="text" name="test_url">
      <button type="submit">Submit</button>
    </form>
  `)
})

app.post('/', express.urlencoded({ extended: true }), (req, res) => {
    res.charset = 'utf-8';
    res.set('Content-Type', 'text/plain')
    const child = spawn(
        './node_modules/.bin/cypress',
        [
            'run',
            '--env', `test_url=${req.body.test_url}`,
            //'--reporter', 'mochawesome',
            //'--reporter-options', `reportDir="cypress/results",overwrite=false,html=false,json=true`,
            '--config', 'video=false,screenshotOnRunFailure=false',
        ]
    )
    res.write(`Testing: ${req.body.test_url} \n`)
    child.stdout.setEncoding('utf-8')
        .pipe(createTransformer())
        .pipe(res)

})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})