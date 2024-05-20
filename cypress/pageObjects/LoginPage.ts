// cypress/pages/LoginPage.ts
export class LoginPage {
    private emailInput = 'input[name="email"]';
    private passwordInput = 'input[name="password"]';
    private loginButton = '#login_input_login';

    visit() {
        cy.visit('https://testnet.binancefuture.com/en/login');
    }

    fillEmail(email: string) {
        cy.get(this.emailInput).type(email);
    }

    fillPassword(password: string) {
        cy.get(this.passwordInput).type(password);
    }

    submit() {
        cy.get(this.loginButton).should('not.be.disabled')
        cy.get(this.loginButton).click();
    }
}
