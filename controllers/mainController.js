const dataModel = require('../models/dataModel');


const mainController = {
  // Function to render the landing page
  getIndex: (req, res) => {
    const data = dataModel.dataModel.getData();
    res.render('index', { data });
  },
  // Function to render the home page
  getHome: (req, res) => {
    res.render('home');
  },

  async getDevelopers(req, res) {
    const user_id = req.cookies.user_id;

    res.render('developers', { user_id });
  },
  // Function that verifies that a user is in the db and if so issues a cookie and logs them in, otherwise returns an unauthorized error
  async verifyUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userModel.verifyUser(username, password);
    const verified = result.acctype;
    const id = result.id;
    if(id !== -1) {
      res.cookie('user_id', id, {
        maxAge: 900000, httpOnly: false, SameSite: 'None',
      })

      return res.status(200).json({ verified });
    }

    return res.status(401).json({error: 'Unauthorized'});
  },
  // Function that adds a user into the database
  async addUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userModel.addUser(username, password);
    return res.status(200);
  },
  // Function that fetches all products from the product database to display to a user
  async getData(req, res) {
    try {
      const user_id = req.cookies.user_id;
      const data = await dataModel.getSensorData(); 
      res.render('data', { user_id, data });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Function that gets the login page
  getLogin: (req, res) => {
    res.render('login');
  },
};

module.exports = mainController;