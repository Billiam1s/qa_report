context('Utilities', () => {
    beforeEach(() => {
        cy.server()
        cy.route('POST', 'https://spoor-api.ft.com/px.gif?type=page:view')
            .as('page:view')
        cy.route('POST', 'https://spoor-api.ft.com/px.gif?type=brandedContent:view')
            .as('brandedContent:view')
        cy.route('POST', 'https://spoor-api.ft.com/px.gif?type=page:scrolldepth')
            .as('page:scrolldepth')
        // Example
        // cy.visit('https://www.ft.com/partnercontent/mckinsey/reimagining-emerging-asean-5-levers-to-boost-economic-recovery.html')
        cy.visit(Cypress.env('test_url'))
        // cy.visit('https://www.ft.com/partnercontent/mckinsey/reimagining-emerging-asean-5-levers-to-boost-economic-recovery.html')
        // The page shows the menu for some reason on first load
        cy.wait(1000)

        // cy.wait(1000)
    })

    // it('A page view should be requested', () => {
    //     expect()
    //     console.log()
    // })

    it('A page view should be requested', () => {
        cy.wait('@page:view').should('have.property', 'status', 202)
    })

    it('A branded view should be requested', () => {
        cy.wait('@brandedContent:view').should('have.property', 'status', 202)
    })

    it('A scroll depth should be requested', () => {
        cy.scrollTo('bottom')
        cy.wait('@page:scrolldepth').should('have.property', 'status', 202)
        // cy.wait('@page:scrolldepth').should(({ request, response }) => {
        //     // expect(request.body.context.meta).to.include({'percentagesViewed': '0'})
        //     expect(request.body.context.meta).to.include({'percentagesViewed': '50'})
        //     expect(request.body.context.meta).to.include({'percentagesViewed': '75'})
        //     expect(request.body.context.meta).to.include({'percentagesViewed': '100'})
        // })
    })

    it('Has Primary Topic', () => {
        cy.wait('@brandedContent:view').should(({ request, response }) => {
            expect(request.body.context['primaryTopic']).to.not.be.empty
        })
    })

    it('Has Secondary Topic', () => {
        cy.wait('@brandedContent:view').should(({ request, response }) => {
            expect(request.body.context['secondaryTopic']).to.not.be.empty
        })
    })

    it('Has Sponsor', () => {
        cy.wait('@brandedContent:view').should(({ request, response }) => {
            expect(request.body.context['sponsor']).to.not.be.empty
        })
    })

    it('Has Article Name', () => {
        cy.wait('@brandedContent:view').should(({ request, response }) => {
            expect(request.body.context['articleName']).to.not.be.empty
        })
    })

    it('App contains one of the following [\'stream\', \'article\', \'video\', \'audio\', \'IG\']', () => {
        cy.wait('@brandedContent:view').should(({ request, response }) => {
            // expect(request.body).to.include({'action': 'view'})
            let toContain = ['article', 'stream', 'video', 'audio', 'IG']
            let search = request.body.context.app
            expect(toContain).to.include(search)

        })
    })
})