// cypress/e2e/login.cy.ts
import { LoginPage } from '../pageObjects/LoginPage';

describe('Login Test', () => {
    const loginPage = new LoginPage();   
    const email = Cypress.env('username');
    const password = Cypress.env('password');
  

    it('should prevent SQL injection attacks', () => {
        loginPage.visit();
        loginPage.fillEmail('\' OR 1=1 --');
        loginPage.fillPassword('password');
        loginPage.submit();

        cy.url().should('not.include', '/dashboard'); 
        cy.get(':nth-child(1) > .bnc-form-item > .bnc-form-item-help').should('contain', 'Please enter a correct email address.');
    });

    it('should prevent login with lack of password', () => {
        loginPage.visit();
        loginPage.fillEmail('your-email@example.com');
        loginPage.submit();

        cy.url().should('not.include', '/dashboard');
        cy.get(':nth-child(2) > .bnc-form-item > .bnc-form-item-help').should('contain', 'Please enter your password.'); 
    });

    it('should show error with invalid credentials', () => {
        loginPage.visit();
        loginPage.fillEmail('invalid-email@example.com');
        loginPage.fillPassword('invalid-password');
        loginPage.submit();

        cy.get('.error-message').should('contain', 'Invalid email or password'); 
    });

    it('should log in successfully with valid credentials', () => {
        loginPage.visit();
        loginPage.fillEmail(email);
        loginPage.fillPassword(password);
        loginPage.submit();

        cy.url().should('include', 'en/futures/BTCUSDT'); 
    });
});
