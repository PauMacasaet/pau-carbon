const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/glocal');

function isValidTrackingNo(req, res, next) {
    if (!isNaN(req.params.engid)) return next();
    next(new Error('Invalid Tracking No'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING ALL ACTIVITIES');
    });
});

router.get('/:trackingNo', isValidTrackingNo, (req, res) => {
    queries
        .getOne(req.params.trackingNo)
        .then(activity => {
            if(activity) {
                res.json(activity);
                console.log('Getting List by TrackingNo');
            } else {
                next();
            }
    });
});

module.exports = router;