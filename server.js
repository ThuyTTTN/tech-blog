//import/export modules  
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const session = require("express-session");

//Middleware
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const helpers = require('./utils/helpers');

//helper variables for handlebars
const hbs = exphbs.create({ helpers });

app.use(session(sess));
//use handlebars
app.engine("handlebars", hbs.engine);
//set handlebars as the default engine
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);
//serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
