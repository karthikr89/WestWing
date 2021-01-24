import { ElementArrayFinder, element, by, ElementFinder, browser } from "protractor";
import { CommonPage } from "./common-page";

const timeout = browser.params.globalTimeout;

export class WishList extends CommonPage {
    private iconWishlist: ElementFinder = element(by.css('.icon-wishlist'));
    private wishlistCounter: ElementFinder = element(by.css('.qa-header-wishlist-counter'));
    private itemWishlist: ElementArrayFinder = element.all(by.css('.qaBlockListProduct'));
    private removeWishlist: ElementFinder = this.itemWishlist.get(0).element(by.css('.blockListProduct__delete'));

    private async checkWishList() {
        return Promise.resolve(expect(await this.wishlistCounter.getText()).toBe('1'))
        .then(() => {
            return this.clickItem(this.iconWishlist, 'Wishlist icon');
        })
    }

    public removeItemfromWishlist() {
        return this.checkWishList()
        .then(() => {
            return browser.wait(this.until.visibilityOf(this.itemWishlist.get(0)), timeout, 'Wish list item not visible.');
        })
        .then(async () => {
            return Promise.resolve(expect(await this.itemWishlist.get(0).getText()).toContain(process.env.Product_Name));
        })
        .then(() => {
            return this.clickItem(this.removeWishlist, 'Remove Wishlist');
        })
        .then(() => {
            return browser.wait(this.until.invisibilityOf(this.itemWishlist.get(0)), timeout, 'Item not removed from wishlist.');
        })
        .then(async () => {
            return Promise.resolve(expect(await this.itemWishlist.count()).toBe(0));
        });
    }
}

export const wishPage = new WishList;