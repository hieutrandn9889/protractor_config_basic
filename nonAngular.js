describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
    browser.get("http://seleniumpractise.blogspot.com/2016/09/complete-registration-form.html");
    element(by.name("first_name")).sendKeys("5");
    element(by.name("last_name")).sendKeys("5");
    element(by.name("maths")).click();
    });
  });

