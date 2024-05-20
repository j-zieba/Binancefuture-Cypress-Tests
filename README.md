# Binance Futures Cypress Tests

## Description
This project contains end-to-end (E2E) tests for the Binance Futures platform using Cypress. The tests verify various functionalities of the website, such as logging in, placing orders, and checking order history.

## Installation
To install necessary dependencies, run:
```bash
npm install
```

## File Structure
- `cypress/e2e/login.cy.ts` - Tests related to login functionality.
- `cypress/e2e/trade.cy.ts` - Tests related to placing orders on the market.
- `cypress/pageObjects/LoginPage.ts` - Page objects for login.
- `cypress/pageObjects/MarketPage.ts` - Page objects for placing orders on the market.

## Dependencies
All project dependencies are listed in the package.json file:

- Cypress
- TypeScript
- ts-node
- Node.js and Mocha types

## Configuration
Configure the cypress.config.ts file according to the project's needs. An example configuration can be found in the cypress.config.ts.example file.

## Running Tests
To run Cypress in interactive mode, use:
```bash
npm run cy:open
```