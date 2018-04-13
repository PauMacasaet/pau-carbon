const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/severityCount');

function isValidSeverity(req, res, next) {
    if (!isNaN(req.params.severity)) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res, next) => {
    const {
        severity
    } = req.query
    queries
        .getAllSeverity({
            severity
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL SEVERITIES');
            } else {
                next();
            }
            
    });
});

module.exports = router;