describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
      browser.get("http://juliemr.github.io/protractor-demo/");
      element(by.model("first")).sendKeys("5");
      element(by.model("second")).sendKeys("5");
      element(by.id("gobutton")).click();
      expect(element(by.className("ng-binding")).getText()).toEqual("20");
    });
  });