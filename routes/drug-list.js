var express = require("express");
var router = express.Router();
const db = require("./../models/index.js");
const { Op } = require("sequelize");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(
    "Filter drug list by name string " +
    req.query["searchedText"] + " " +
    req.query["cat1"] + " " +
    req.query["cat2"]
  );

  //see all
  if (req.query["cat1"] === "null") {
    db.drug
      .findAll({
        order: [["id", "ASC"]],
      })
      .then((drugListDb) => {
        res.send(drugListDb);
      });
  }

  let whereClauseName = {
    name: {
      [Op.substring]:
        req.query["searchedText"] !== "null"
          ? req.query["searchedText"]
          : "",
    }
  };
  
  // asset_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('asset_name')), 'LIKE', '%' + lookupValue + '%')
  // sequelize.fn('LOWER', sequelize.col('asset_name'))

  if (req.query["cat2"].indexOf("hiv") > -1) {
    whereClauseName.hiv = {
      [Op.ne]: ""
    }
  }

  if (req.query["cat2"].indexOf("breastfeeding") > -1) {
    whereClauseName.lactation = {
      [Op.eq]: ""
    }
  }

  if (req.query["cat2"].indexOf("liver") > -1) {
    whereClauseName.liver = {
      [Op.eq]: ""
    }
  }

  if (req.query["cat1"] === "name") {
    db.drug
      .findAll({
        order: [["createdAt", "DESC"]],
        where: whereClauseName
      })
      .then((drugListDb) => {
        res.send(drugListDb);
      });
  }

  let whereClauseCategory = {
    category: {
      [Op.substring]:
        req.query["searchedText"] !== "null"
          ? req.query["searchedText"]
          : "",
    },

  };

  if (req.query["cat2"].indexOf("hiv") > -1) {
    whereClauseCategory.hiv = {
      [Op.ne]: ""
    }
  }

  if (req.query["cat2"].indexOf("breastfeeding") > -1) {
    whereClauseCategory.lactation = {
      [Op.eq]: ""
    }
  }

  if (req.query["cat2"].indexOf("liver") > -1) {
    whereClauseCategory.liver = {
      [Op.eq]: ""
    }
  }

  if (req.query["cat1"] === "category") {
    db.drug
      .findAll({
        order: [["createdAt", "DESC"]],
        where: whereClauseCategory
      })
      .then((drugListDb) => {
        res.send(drugListDb);
      });
  }

  // if (
  //   req.query["cat1"] === "category" &&
  //   req.query["searchedText"] !== "null"
  // ) {
  //   db.drug
  //     .findAll({
  //       order: [["createdAt", "DESC"]],
  //       where: {
  //         hiv: {
  //           [Op.substring]:
  //             req.query["cat2"].indexOf("hiv") > -1
  //               ? req.query["searchedText"]
  //               : "",
  //         },

  //         lactation: {
  //           [Op.substring]:
  //             req.query["cat2"].indexOf("breastfeeding") > -1
  //               ? req.query["searchedText"]
  //               : "",
  //         },

  //         liver: {
  //           [Op.substring]:
  //             req.query["cat2"].indexOf("liver") > -1
  //               ? req.query["searchedText"]
  //               : "",
  //         },
  //       },
  //     })
  //     .then((drugListDb) => {
  //       res.send(drugListDb);
  //     });
  // }


});

module.exports = router;
