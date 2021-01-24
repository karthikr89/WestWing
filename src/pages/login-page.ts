import { ElementFinder, element, by, ElementArrayFinder, browser } from "protractor";
import { CommonPage } from "./common-page";

const timeout = browser.params.globalTimeout;

export class LoginPage extends CommonPage {

    private popup: ElementFinder = element(by.css('.Wrapper__StyledPopUpWrapper-sc-2n43ye-0'));
    private loginEmail: ElementFinder = element(by.css('[name="email"]'));
    private loginPassword: ElementFinder = element(by.css('[name="password"]'));
    private checkBox: ElementFinder = element(by.css('.StyledCheckbox__StyledInput-sc-19upj2m-0'));
    private loginButton: ElementFinder = element(by.css('.sc-bdnylx'));
    private userAccount: ElementFinder = element(by.css('.qa-header-account-link'));

    public loginToApplication(email: string, password: string, name: string) {
        return this.typeInput(this.loginEmail, 'Email', email)
        .then(() => {
            return this.typeInput(this.loginPassword, 'Password', password);
        })
        .then(() => {
            return this.clickItem(this.checkBox, 'Check Box');
        })
        .then(() => {
            return this.clickItem(this.loginButton, 'Login Button');
        })
        .then(() => {
            return browser.wait(this.until.invisibilityOf(this.popup), timeout, 'Popup displayed even after valid login attempt.');
        })
        .then(() => {
            return browser.wait(this.until.visibilityOf(this.userAccount), timeout, 'User account not visible post login.');
        })
        .then(() => {
            return this.userAccount.getText();
        })
        .then((usrText) => {
            return Promise.resolve(expect(usrText).toContain(name));
        });
    }
}

export const loginPage = new LoginPage;
