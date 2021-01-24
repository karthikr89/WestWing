import { homePage } from '../pages/home-page';
import { productPage } from '../pages/products-page';
import { loginPage } from '../pages/login-page';
import { wishPage } from '../pages/wishlist-page';
const fs = require('fs');
const decrypt = require('encryptjs');

const searchData = JSON.parse(fs.readFileSync('src/data/products-data.json'));
const loginData =  JSON.parse(fs.readFileSync('src/data/login-data.json'));

describe('Search for products, add them to wishlist and delete wishlist', () => {
    let searchItem = searchData.category;

    beforeAll(() => {
        return homePage.closeBanner();
    })
       
    it(`Navigate to home page and search for a product`, () => {
        return homePage.validateHomePage()
        .then(() => {
            return homePage.searchForItem(searchItem)
        })
    });

    it(`Add item to wishlist`, () => {
        const urlHeading = searchData.urlRef;
        const email = loginData.email;
        const password = decrypt.decrypt(loginData.password, loginData.decryptText, 256);
        const user = loginData.name;
        return productPage.validateLoadedPage(urlHeading, searchItem)
        .then(() => {
            return loginPage.loginToApplication(email, password, user);
        })
        .then(() => {
            return productPage.addProductToWishList();
        });
    });

    it(`Remove item from wishlist`, () => {
        return wishPage.removeItemfromWishlist();        
    })
});