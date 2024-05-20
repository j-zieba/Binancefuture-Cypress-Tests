// cypress/e2e/trade.cy.ts
import { LoginPage } from '../pageObjects/LoginPage';
import { MarketPage } from '../pageObjects/MarketPage';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Market Orders Tests', () => {
  const marketPage = new MarketPage();
  const loginPage = new LoginPage();
  const X_BTC = '0.020';
  const Y_BTC = '0.040';
  const TOTAL_BTC = '0.060';
  const email = Cypress.env('username');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.session('loginSession', () => {
      loginPage.visit();
      loginPage.fillEmail(email);
      loginPage.fillPassword(password);
      loginPage.submit();
      cy.wait(20000)

      // Verify successful login
      cy.url().should('include', 'en/futures/BTCUSDT'); 
    });

    cy.visit('en/futures/BTCUSDT');
  });

  // it('should buy X BTC at market price', () => {
  //     marketPage.selectBidType('market');
  //     marketPage.buy(X_BTC);
  //     marketPage.verifyPosition(X_BTC);
  // });

  // it('should buy additional Y BTC at market price', () => {
  //     marketPage.selectBidType('market');
  //     marketPage.buy(Y_BTC);
  //     marketPage.verifyPosition(TOTAL_BTC);
  // });

  // it('should close position at market price', () => {
  //     marketPage.closePosition('market');
  // });

  it('should verify order history for correct transactions', () => {
    marketPage.verifyLastTransactions(2, 'Sell', TOTAL_BTC);
    marketPage.verifyLastTransactions(3, 'Buy', Y_BTC);
    marketPage.verifyLastTransactions(4, 'Buy', X_BTC);
    });
});


