
### Setup and run

To setup and run this project start setup lightsail box through the aws console. Once the box has been setup connect to 
the box and run the commands in the start.bash file. 

This will download the project repo into the box and then install dependencies and run the project. 



### server.js
server.js is as the name suggests the server file which will run for this project. It contains the logic for the 
api endpoints and is responsible for spawning the cypress subprocess which the tests will run.


### /cypress/integration/spoorApiChecks.spec.js
This file contains the tests that will be run. 

The test starts by registering which url requests it will search for and then alias the name. 

`cy.route('POST', 'https://spoor-api.ft.com/px.gif?type=page:view').as('page:view')`

`cy.route('POST', 'https://spoor-api.ft.com/px.gif?type=brandedContent:view').as('brandedContent:view')`

`cy.route('POST', 'https://spoor-api.ft.com/px.gif?type=page:scrolldepth').as('page:scrolldepth')`

example of test
```
it('A page view should be requested', () => {
    cy.wait('@page:view').should('have.property', 'status', 202)
})
```
`@page:view` is referencing the route we aliased in the previous step 
`have.property` is checking the property of the url request
`status` the field key its looking for
`202` the value to check is matched





@Evtimiy Mihaylov is the person who helped me with this initially, if you need help he would be a good person to contact 