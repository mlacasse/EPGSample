// pdp.page.js
// http://webdriver.io/guide/testrunner/pageobjects.html

import Page from './page';

// This class contains Page Object Locators and methods for the Screen.
// It inherits from Page.
class PDPScreen extends Page {

  /**
  * define elements
  */
  
  // '$' is equivalent to 'browser.element'
  // http://webdriver.io/api/utility/$.html
  // http://webdriver.io/guide/usage/selectors.html
  // To search for name: $('name:mySelector') or $('~mySelector')
  // To search for class name: $('class name:mySelector')
  // To search for id: $('id:mySelector')

  get btn_next()  { return $("~Btn-Next"); }
  get btn_previous()  { return $("~Btn-Previous"); }
  get title_text()  { return $("~Title-Text"); }
  get details_text()  { return $("~Details-Text"); }
  get body_text()  { return $("~Body-Text"); }
  get poster_image()  { return $("~Image-2x3"); }
  get background_image()  { return $("~Image-16x9"); }

  /**
   * your page specific methods
   */


}

export default new PDPScreen()
