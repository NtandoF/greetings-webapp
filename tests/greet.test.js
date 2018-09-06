describe('Greetings languages', function() {
  it('should greet Ntando in English', function() {
    var greeter = GreetingFactory()
    assert.equal(greeter.greeting('Ntando', 'English'), 'Hello, Ntando');
  });
  it('should greet Lunga in Afrikaans', function() {
    var greeter = GreetingFactory()
    assert.equal(greeter.greeting('Lunga', 'Afrikaans'), 'Hallo, Lunga');
  });
  it('should greet BlessMess in French', function() {
    var greeter = GreetingFactory()
    assert.equal(greeter.greeting('BlessMess','French'), 'Bonjour, BlessMess');
  });
  it('Greetings should return undefined when the name is undefined', function() {
    var greeter = GreetingFactory();
   assert.equal(greeter.greeting("English", ''), undefined);
});
  });

  describe('Greetings Counter', function() {
    it('should return the correct number of people greeted even if greeted more then once', function() {
      var greeter = GreetingFactory()
      greeter.greeting('Ntando', 'English')
      greeter.greeting('Ntando', 'English')
      greeter.greeting('Ntando', 'English')
      assert.equal(greeter.counter(), 1);
    });

      it('should return the correct number of different people greeted', function() {
        var greeter = GreetingFactory()
        greeter.greeting('Yawa', 'English')
        greeter.greeting('Ntando', 'English')
        greeter.greeting('Ziyanda', 'English')
        assert.equal(greeter.counter(), 3);
      });
        });
        describe('Greetings Object', function() {
          it('should return the correct number of users inside the localstorage', function() {
          var greeter = GreetingFactory({"Druza":0,"Tido":0})
          greeter.greeting('Tido', 'English')
          greeter.greeting('Ntando', 'English')
          assert.equal(greeter.counter() ,3);
          });
});
