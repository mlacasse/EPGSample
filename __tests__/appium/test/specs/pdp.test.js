// https://www.chaijs.com/
import { expect } from 'chai';  // Using Expect style.
import movies from '../../../../movies.js'

import PDPScreen from '../pageobjects/pdp.page'

// http://webdriver.io/api/protocol/timeoutsImplicitWait.html
browser.timeoutsImplicitWait(30000);

const pdp_title_1 = movies[0].title;
const pdp_title_2 = movies[1].title;

// This group represents the tests for the screen.
describe('PDP Tests', function() {

  context('when in PDP', () => {
    it('displays title', function() {
      // Wait until the screen is loaded and displayed.
      browser.waitUntil(function () {
        return PDPScreen.title_text.getAttribute("isdisplayed") === true
      }, 30000, 'expected title to be displayed after 30s');

      expect(PDPScreen.title_text.getAttribute("isdisplayed")).to.be.true;
    });
    it('displays correct text for title', function() {
      expect(PDPScreen.title_text.getText()).to.equal(movies[0].title);
    });

    it('displays details', function() {
      expect(PDPScreen.details_text.getAttribute("isdisplayed")).to.be.true;
    });
    it('displays correct text for details', function() {
      expect(PDPScreen.details_text.getText()).to.equal(movies[0].details);
    });

    it('displays body', function() {
      expect(PDPScreen.body_text.getAttribute("isdisplayed")).to.be.true;
    });
    it('displays correct text for body', function() {
      expect(PDPScreen.body_text.getText()).to.equal(movies[0].synopsis);
    });

    it('displays NEXT button', function() {
      expect(PDPScreen.btn_next.getAttribute("isdisplayed")).to.be.true;
    });
    it('displays correct text for NEXT button', function() {
      expect(PDPScreen.btn_next.getText()).to.equal("Next");
    });

    it('displays PREVIOUS button', function() {
      expect(PDPScreen.btn_previous.getAttribute("isdisplayed")).to.be.true;
    });
    it('displays correct text for PREVIOUS button', function() {
      expect(PDPScreen.btn_previous.getText()).to.equal("Previous");
    });

    it('displays poster image', function() {
      expect(PDPScreen.poster_image.getAttribute("isdisplayed")).to.be.true;
    });
    it('displays background image', function() {
      expect(PDPScreen.background_image.getAttribute("isdisplayed")).to.be.true;
    });
  });

  context('when clicking on NEXT button and PREVIOUS buttons', () => {
    it('transitions to another PDP', function() {

      let original_title = PDPScreen.title_text.getText();
      expect(original_title).to.equal(pdp_title_1);

      PDPScreen.yi_click(PDPScreen.btn_next);

      // Wait until the screen transitions.
      browser.waitUntil(function () {
        return PDPScreen.title_text.getText() !== original_title
      }, 30000, 'expected text to be different after 30s');

      expect(PDPScreen.title_text.getText()).to.equal(pdp_title_2);

      // Take a screenshot
      PDPScreen.saveScreenshot('./screenshots/', 'pdp2.png');
    });
    it('transitions back to the original PDP', function() {
      PDPScreen.yi_click(PDPScreen.btn_previous);  

      //Wait until the screen transitions.
      browser.waitUntil(function () {
        return PDPScreen.title_text.getText() === pdp_title_1
      }, 30000, 'expected text to be different after 30s');
      
      expect(PDPScreen.title_text.getText()).to.equal(pdp_title_1);

      // Take a screenshot
      PDPScreen.saveScreenshot('./screenshots/', 'pdp1.png');
    });
  });
})
