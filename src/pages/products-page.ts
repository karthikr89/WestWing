import { ElementFinder, element, by, ElementArrayFinder, browser } from "protractor";
import { CommonPage } from "./common-page";

const timeout = browser.params.globalTimeout;

export class ProductsPage extends CommonPage {
    private pageHeader: ElementFinder = element(by.css('.RegularTitle__StyledPageTitle-zjo017-0'));
    private productsGrid: ElementArrayFinder = element.all(by.css('.GenericProductBadges__ProductBadgesGrid-z1yx94-0'));
    private wishlistWrapper = this.productsGrid.get(0).element(by.css('.BadgesGrid__BadgesTopRight-kqvz9j-3'));
    private wishlist: ElementFinder = this.wishlistWrapper.element(by.css('.sc-eCApGN'));
    private productDetailName: ElementFinder = element.all(by.css('.ProductInfoBox__StyledTitle-nojqor-1')).get(0);

    public validateLoadedPage(urlHeading: string, pageHeading: string) {
        return browser.getCurrentUrl()
        .then(async (currentURL) => {
            let pageHeader = await this.pageHeader.getText()            
            return Promise.all([
                expect(currentURL).toContain(urlHeading),
                expect(pageHeader).toBe(pageHeading)
            ])
        })
    }

    private selectWishlist() {
        return browser.wait(this.until.visibilityOf(this.wishlist), timeout, `Wishlist not displayed.`)
        .then(() => {
            return this.wishlist.getAttribute('data-is-selected');
        })
        .then((attr) => {
            let boolClick = attr === 'false' ? true : false;
            if (boolClick) {
                return this.clickItem(this.wishlist, 'Wishlist');
            } else {
                return Promise.resolve();
            }
        });
    }

    public addProductToWishList() {
        return browser.wait(this.until.visibilityOf(this.productsGrid.get(0)), timeout, `Products not visible.`)
        .then(() => {
            return this.productDetailName.getText();
        })
        .then(async (txt) => {
            process.env.Product_Name = txt;
            return this.selectWishlist();
        });
    }
}

export const productPage = new ProductsPage;