const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to process water plant form data for plant id

const mainController = require('./controllers/mainController');
const piController = require('./controllers/piController');

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Routes

app.get('/', mainController.getIndex);
app.get('/data', mainController.getData);
// app.get('/home', mainController.getHome);
app.get('/developers', mainController.getDevelopers);
app.get('/login', mainController.getLogin);

// Post Routes

app.post('/addUser', mainController.addUser);
app.post('/verifyUser', mainController.verifyUser);
app.post('/productRedirect', function (req, res) {
    res.redirect(303, '/product');
});
//pi routes below
app.post('/data', piController.receiveData);

app.post('/waterPlantButtonPressed', piController.waterPlantButtonPressed); 

app.get('/doesPiNeedToWaterPlant', piController.checkToWater); 
 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
