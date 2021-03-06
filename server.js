require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')

//run our

require('./db/db')


app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use(session({
	secret: "this is stored",
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false}
}))


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


const photosController = require('./controllers/photos');
app.use('/photos', photosController)


const usersController = require('./controllers/users');
app.use('/users', usersController)

const poemsController = require('./controllers/poems');
app.use('/poems', poemsController)

const authController = require('./controllers/auth');
app.use('/auth', authController)


app.get('/', (req, res) => {
	res.redirect('/auth/login')
})

app.get('/example', (req, res) => {
	res.send(req.query)
})

const PORT = 3000;


app.listen(process.env.PORT || PORT, () => {
	 console.log('server is running')
})