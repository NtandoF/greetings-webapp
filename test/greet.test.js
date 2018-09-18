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
    let greet = await greeter.greetingFunction('Blessmess', 'IsiXhosa')
    assert.equal(greet, 'Molo, Blessmess');
  }); 
  it('Greetings should return undefined when the name is undefined', async function () {
    var greeter = GreetingFactory(pool);
    let unknown = await greeter.greetingFunction("English", 'ludwe')
    assert.equal(unknown , undefined);
  });

  
after (async function () {
  await pool.end();
});
 });

