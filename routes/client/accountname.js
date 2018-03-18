const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/client/client');

function isValidClient(req, res, next) {
    if (req.params.accountName) return next();
    next(new Error('Invalid Client'));
}

function validClient(client) {
    const hasAccoutname = typeof client.accountName == 'string' && client.accountName.trim() != '';
    const hasContact = typeof client.contact_details == 'array' && client.contact_details.trim() != '';
    const hasAddress = typeof client.company_address == 'string' && client.company_address.trim() != '';
    const hasManager = typeof client.accountManager == 'string' && client.accountManager.trim() != '';
    return hasAccoutname && hasContact && hasAddress && hasManager;
}

router.get('/', (req, res) => {
    queries.getAll().then(clients => {
        res.json(clients);
        console.log('GETTING ALL CLIENTS');
    })
});

router.get('/:accountName', isValidClient, (req, res) => {
    queries.getOne(req.params.accountName).then(client => {
        if(client) {
            res.json(client);
            console.log('Getting Clients by Accountname');
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if(validClient(req.body)) {
        queries.create(req.body).then(client => {
            res.json({
                'create client': 'client created'
            }); //malabo error
            res.json(client[0]);
        });
    } else {
        next(new Error('Invalid Client'));
    }
});

router.put('/:accountName', (req, res, next) => {
    queries.update(req.params.accountName, req.body).then(client => {
        res.json({
            'update client': 'client updated'
        });
        res.json(client[0]);
    });
});

router.delete('/:accountName', isValidClient, (req, res, next) => {
    queries.delete(req.params.accountName).then(() => {
        res.json({
            'delete client': 'client deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;