import { ElementFinder, browser, ExpectedConditions, element, by } from "protractor";

const timeout = browser.params.globalTimeout;

export class CommonPage {

    public until = ExpectedConditions;
    private homeBanner: ElementFinder = element(by.id('onetrust-banner-sdk'));
    private bannerAccept: ElementFinder = this.homeBanner.element(by.id('onetrust-accept-btn-handler'));
    private promotions: ElementFinder = element(by.css('.ScrollableArea__StyledScrollableContainer-v545jt-0'));
    private promotionLogin: ElementFinder = this.promotions.element(by.css('.LoginSwitch__StyledLoginButton-sc-6baxht-1'));
    private promotionClose: ElementFinder = this.promotions.element(by.css('.StyledIcons__StyledDismissIcon-sc-1rxt1jc-3'));

    public scrollToElement(obj: ElementFinder) {
        return browser.actions().mouseMove(obj).perform();
    }

    public checkForElement(elm: ElementFinder, time: number) {
        return elm.isPresent()
        .then((elmSts) => {
            if (elmSts) {
                return true;
            } else {
                if (time > 100) {
                    return false;
                } else {
                    time++;
                    return this.checkForElement(elm, time);
                }
            }
        })
    }

    public clickItem(elem: ElementFinder, elemName: string) {
        return browser.wait(this.until.visibilityOf(elem), timeout, `${elemName} not available to click.`)
        .then(() => {
            return browser.wait(this.until.elementToBeClickable(elem), timeout, `${elemName} not clickable.`);
        })
        .then(() => {
            return elem.click();
        })
    }

    public typeInput(elem: ElementFinder, elemName: string, typeValue: string) {
        return browser.wait(this.until.visibilityOf(elem), timeout, `${elemName} not available to click.`)
        .then(() => {
            return browser.wait(this.until.elementToBeClickable(elem), timeout, `${elemName} not clickable.`);
        })
        .then(() => {
            return elem.sendKeys(typeValue);
        })
    }

    public closeBanner() {
        return this.checkForElement(this.bannerAccept, 0)
        .then((bool: boolean) => {
            if (bool) {
                return this.clickItem(this.bannerAccept, 'Accept Cookies');
            } else {
                return Promise.resolve();
            }
        })        
    }

    public closePromotions() {
        return this.checkForElement(this.promotionLogin, 0)
        .then((bool: boolean) => {
            if (bool) {
                return this.clickItem(this.promotionLogin, 'Login Link')
                .then(() => {
                    return this.clickItem(this.promotionClose, 'Close Promo');
                });
            } else {
                return Promise.resolve();
            }
        })        
    }
}