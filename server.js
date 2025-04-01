const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

const mainController = require('./controllers/mainController');
const piController = require('./controllers/piController');

app.set('view engine', 'ejs');
app.set('views', './views');

var waterPlant = false;
// Get Routes

app.get('/', mainController.getIndex);
app.get('/data', mainController.getProduct);
app.get('/home', mainController.getHome);
app.get('/developers', mainController.getCheckout);
app.get('/login', mainController.getLogin);
app.get('/product-admin', mainController.getProductAdmin);

// Post Routes

app.post('/addToCart', mainController.addToCart);
app.post('/removeFromCart', mainController.removeFromCart);
app.post('/emptyCart', mainController.emptyCart);
app.post('/showToProducts', mainController.showToProducts);
app.post('/hideFromProducts', mainController.hideFromProducts);
app.post('/addToProducts', mainController.addToProducts);
app.post('/addUser', mainController.addUser);
app.post('/verifyUser', mainController.verifyUser);
app.post('/addQuantity', mainController.addQuantity);
app.post('/productRedirect', function (req, res) {
    res.redirect(303, '/product');
});
//pi routes below
app.post('/data', piController.receiveData);

app.post('/waterPlantButtonPressed', (req, res) =>{
    waterPlant = true;
    res.send("Plant will be watered shortly!");
  });
  app.get('/doesPiNeedToWaterPlant', (req, res) => {
    res.send(waterPlant);
    if(waterPlant){ //if plant was just watered, set to false so plant won't be watered again on next check
      waterPlant = false;
    }
  });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
