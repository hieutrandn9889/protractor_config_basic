describe('angularjs homepage todo list', function() {
    it('should add a todo C2 for non angular', function() {
    browser.driver.get("http://seleniumpractise.blogspot.com/2016/09/complete-registration-form.html");
    browser.driver.findElement(by.name("first_name")).sendKeys("5");
    browser.driver.findElement(by.name("last_name")).sendKeys("5");
    browser.driver.findElement(by.name("maths")).click();
    });
  });