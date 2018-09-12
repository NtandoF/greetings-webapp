let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let Greet = require('./Greet');
let flash = require('express-flash');
let session = require('express-session');

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetedNames';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let app = express();
let greet = Greet(pool);

app.use(session({
    secret: 'keyboard users',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', async function (req, res) {
    let counter = await pool.query('select count( name ) from users;');
    counter = counter.rows[0].count;

    res.render('home', {
      counter
    });
});

app.post('/greetings', async function (req, res, next) {
    try {

        let name = req.body.greetTextArea;
        let language = req.body.languageSelector;
        
                if (name === ''|| name === undefined) {
                    req.flash('info','Please enter a name');
                }
                else if (language === undefined) {
                    req.flash('info','Please select a language');
                }
        
        let greeting = {
            message: await greet.greetingFunction(name, language),
            count: await greet.greetCounter()
        }
        

        res.render('home',
             {greeting});

    } catch (error) {
        next(error)
    }


});

app.get('/actions', async function (req, res) {
    let outcome = await pool.query('SELECT * FROM users;');
    let usersGreeted = outcome.rows;
    res.render('actions', { usersGreeted });
})

app.post('/reset', function (req, res) {
    greet.reset();
    res.redirect('/');
})

app.post('/home', function (req, res) {
   

    res.redirect('/home');
})

let PORT = process.env.PORT || 3071;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});