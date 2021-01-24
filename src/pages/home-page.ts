import { ElementFinder, element, by, ElementArrayFinder, browser } from "protractor";
import { CommonPage } from "./common-page";

const timeout = browser.params.globalTimeout;

export class HomePage extends CommonPage {

    private logoClubTab: ElementFinder = element(by.css('.OneHeader__StyledWestwingNowLogo-d0qgmn-5'));
    private searchInput: ElementFinder = element(by.css('.qa-header-search-input'));
    private searchSuggestionWrapper: ElementFinder = element(by.css('.qa-header-search-suggestion'));
    private searchSuggestions: ElementArrayFinder = this.searchSuggestionWrapper.all(by.css('.Containers__WideFlexContainer-lq83ym-0'));

    public validateHomePage() {
        return browser.wait(this.until.visibilityOf(this.logoClubTab), timeout, 'Home page logo not displayed.')
    }

    private selectSuggestions(item: string) {
        return browser.wait(this.until.visibilityOf(this.searchSuggestionWrapper), timeout, `Suggestions not displayed.`)
        .then(() => {
            return this.searchSuggestions.filter((sug) => {
                return sug.getText()
                .then((sugText) => {
                    return sugText === item;
                })
            }).first().click();
        });
    }

    public searchForItem(item: string) {
        return this.typeInput(this.searchInput, 'search field', item)
        .then(() => {
            return this.selectSuggestions(item);
        })
    }  
}

export const homePage = new HomePage;