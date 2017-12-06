const express = require('express');
const router = express.Router();

const User = require("../models/user").User;

/* GET home page. */
router.get('/', function (req, res, next) {
    User.find({}, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result)
        }
    });
});

// router.get(
//     "/",
//     res.json({ dafne: 'olca' });
//     // User.checkCredentials("username")
// );


// router.get("/", (req, res, next) => {
//     res.json({ username });
// });



module.exports = router;