let GreetingFactory = require('../Greet');
let assert = require('assert');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetedNames';

const pool = new Pool({
  connectionString
});

describe('Greetings languages', function () {

  beforeEach(async function () {
    await pool.query('delete from users');
  });

  it('should greet Ntando in English', async function () {
    var greeter = GreetingFactory(pool)
    let greet = await greeter.greetingFunction('Ntando', 'English')
    assert.equal(greet, 'Hello, Ntando');
  });

  it('should greet Lunga in Afrikaans', async function () {
    var greeter = GreetingFactory(pool)
    let greet = await greeter.greetingFunction('Lunga', 'Afrikaans')
    assert.equal(greet, 'Goeie Dag, Lunga');
  });

  it('should greet BlessMess in isixhosa', async function () {
    var greeter = GreetingFactory(pool)
    let greet = await greeter.greetingFunction('BlessMess', 'IsiXhosa')
    assert.equal(greet, 'Molo, BlessMess');
  }); 
  it('Greetings should return undefined when the name is undefined', async function () {
    var greeter = GreetingFactory(pool);
    let unknown = await greeter.greetingFunction("English", 'ludwe')
    assert.equal(unknown , undefined);
  });

  //  it('should return the correct number of people greeted even if greeted more then once', async function () {
  //    var greeter = GreetingFactory(pool)
  //   let count = await greeter.greetCounter('Ntando')
  //  greeter.greetingFunction('Ntando', 'English')
  //  greeter.greetingFunction('Ntando', 'English')
  //  greeter.greetingFunction('Ntando', 'English')
  //    assert.equal(count, 1);
  //  });

  //  it('should return the correct number of different people greeted', async function () {
  //    var greeter = GreetingFactory(pool)
  //    let count = await greeter.greetCounter('Yawa')
  //    greeter.greetingFunction('Yawa', 'English')
  //    greeter.greetingFunction('Yawa', 'English')
  //    greeter.greetingFunction('Ntando', 'English')
  //    greeter.greetingFunction('Ziyanda', 'English')
  //    assert.equal(count, 2);
  //  });
after (async function () {
  await pool.end();
});
 });

