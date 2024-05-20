// cypress/pages/MarketPage.ts

interface Transaction {
    time: string;
    side: string;
    amount: string;
}

export class MarketPage {
    private bidTypeMarket = '#tab-MARKET > .tab'; // Zmień tryb składania pozycji na Market
    private bidTypeLimit = '#tab-LIMIT > .tab'; // Zmień tryb składania pozycji na Limit
    private bidTypeStop = '#tab-STOP > .tab'; // Zmień tryb składania pozycji na Stop
    private amountInput = '.order-form-input[name=unitAmount]'; // Selektor pola ilości
    private buyButton = 'form > div button:first-child'; // Brzydki selector dla przycisku kupna
    private positionBody = '.position-row.body'; // Kontener, który przechowuje pozycje
    private currentWallet = '.size-buy'; // Aktualna suma pozycji
    private closePositionContainer = '.closePosition';
    private closePositionMarketButton = '.closePosition > div > button:first-child'; // Przycisk zamknięcia po cenie marketu
    private closePositionLimitButton = '.closePosition > div > button:nth-child(2)'; // Przycisk zamknięcia po cenie limitu
    private limitPriceInput = '.closePosition > div > div > input[type="number"]'; // Pole wejściowe ceny limitu
    private btcAmountInput = '.closePosition > div > div > div > input'; // Pole wejściowe ilości BTC
    private orderHistoryTab = 'div[data-testid="OrderHistory"]'; // Tab for order history
    private positionTab = 'div[data-testid="Positions"]'; // Tab for Posistions 
    private transactionRow = '[data-testid="DataTable"] > div:nth-child(2) > div:nth-child(2) > div.css-16vu25q';
    private transactionColumns = 'div.css-pru252 > div';
    
    selectBidType(type: string) {
        switch (type.toLowerCase()) {
            case 'market':
                cy.get(this.bidTypeMarket).click();
                break;
            case 'limit':
                cy.get(this.bidTypeLimit).click();
                break;
            case 'stop':
                cy.get(this.bidTypeStop).click();
                break;
            default:
                throw new Error('Invalid bid type');
        }
    }

    buy(amount: string) {
        cy.get(this.amountInput).type(amount);
        cy.get(this.buyButton).should('be.visible');
        cy.get(this.buyButton).click();
    }

    verifyPosition(amount: string) {
        cy.get(this.positionBody, { timeout: 20000 }).should('exist');
        cy.get(this.currentWallet).should('contain.text', amount);
    }

    closePosition(type: string, limitPrice?: string, btcAmount?: string) {
        cy.get(this.positionTab).click()
        cy.get(this.closePositionContainer, { timeout: 20000 }).should('exist');

        if (type.toLowerCase() === 'market') {
            cy.get(this.closePositionMarketButton).click();
        } else if (type.toLowerCase() === 'limit') {
            if (!limitPrice || !btcAmount) {
                throw new Error('Limit price and BTC amount are required for limit close');
            }
            cy.get(this.limitPriceInput).clear().type(limitPrice);
            cy.get(this.btcAmountInput).clear().type(btcAmount);
            cy.get(this.closePositionLimitButton).click();
        } else {
            throw new Error('Invalid close type');
        }

        cy.get(this.positionBody, { timeout: 20000 }).should('not.exist');
    }
    verifyLastTransactions(transactionNumber: number, side: string, amount: string) {
        cy.get(this.orderHistoryTab).click();
        cy.get(`${this.transactionRow}:nth-of-type(${transactionNumber}) ${this.transactionColumns}`, { timeout: 10000 }).then(columns => {
            cy.wrap(columns[4]).should('contain.text', side);
            cy.wrap(columns[8]).should('contain.text', amount);
        });
    }
}