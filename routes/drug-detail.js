var express = require('express');
var router = express.Router();
const db = require("./../models/index.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log("Req query drugId=" + req.query.drugId);

    db.drug.findByPk(req.query.drugId).then((drugDb) => {
        res.send(drugDb.get({ plain: true }));
    });
});

module.exports = router;
