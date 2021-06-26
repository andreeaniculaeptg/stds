var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var DRUGS = require("./db-init-data/drugs.json");
var HOW = require("./db-init-data/how.json");
var WHY = require("./db-init-data/why.json");
var HIV = require("./db-init-data/Drugs-HIV-ALL.json");
var LACTATION = require("./db-init-data/DrugsL-ALL.json");
var LIVER = require("./db-init-data/DrugsLiver-ALL.json");
var PACKAGER = require("./db-init-data/DrugsLabels-ALL.json");
var CATEGORY = require("./db-init-data/DrugsCategory-ALL.json");
var CLINICALSTUDIES = require("./db-init-data/DrugsClinicalStudies-ALL.json");

const db = require("./models/index.js");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   initialize();
// });

function initialize() {

  DRUGS = DRUGS.slice(0, 1000);

  var drugsDb = DRUGS.map(drugOcto => {
    var drugDb = {
      name: drugOcto.Title,
      url: drugOcto.Title_URL,
      description: drugOcto.Field
    }

    var why = WHY.find(why => why.Page_URL == drugDb.url);
    drugDb.why = why ? why.Text1 : "";

    var how = HOW.find(how => how.Page_URL == drugDb.url);
    drugDb.how = how ? how.Text1 : "";

    var hiv = HIV.find(hiv => hiv.Link_HIV == drugDb.url);
    drugDb.hiv = hiv ? hiv.Text_HIV : "";
    drugDb.hivurl = hiv ? hiv.Page_URL_HIV : "";

    var lactation = LACTATION.find(lactation => lactation.URL_LINK == drugDb.url);
    drugDb.lactation = lactation ? lactation.Text1 : "";
    drugDb.lactationurl = lactation ? lactation.Page_URL : "";

    var liver = LIVER.find(liver => liver.URL_LINK == drugDb.url);
    drugDb.liver = liver ? liver.Text1 : "";
    drugDb.liverurl = liver ? liver.Page_URL : "";

    var packager = PACKAGER.find(packager => packager.URL_LINK == drugDb.url);
    drugDb.packager = packager ? packager.Text1 : "";
    drugDb.packagerurl = packager ? packager.Page_URL : "";

    var category = CATEGORY.find(category => category.URL_LINK == drugDb.url);
    drugDb.category = category ? category.Category : "";
    drugDb.categorydrugurl = category ? category.Page_URL : "";
    drugDb.categorydrugdesc = category ? category.Text1 : "";

    var clinicalstudies = CLINICALSTUDIES.find(clinicalstudies => clinicalstudies.URL_LINK == drugDb.url);
    drugDb.clinicalstudiesurl = clinicalstudies ? clinicalstudies.Page_URL : "";

    return drugDb;
  })

  drugsDb.forEach(drugDb => db.drug.create(drugDb));

  // db.drug.create({
  //   name: "drug name 1 mgw",
  //   why: "why 1 mgw",
  //   how: "how 1 mgw",
  //   url: "link 1 mgw",
  //   description: "abcd mgw",
  // });
}

var usersRouter = require("./routes/users");
var drugsRouter = require("./routes/drug-list");
var drugDetailRouter = require("./routes/drug-detail");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/drug-list", drugsRouter);
app.use("/api/drug-detail", drugDetailRouter);
app.use(express.static(path.join(__dirname, "./client/build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
