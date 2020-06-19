var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
    res.send('Received a GET request, param: ' + req.params.id);
});

router.post('/', function(req, res) {
    console.log("req 데이터 :", JSON.stringify(req.body, null, 2));

    res.json({
        success: true,
        user: req.body.username,
    });
});

router.put('/', function(req, res) {
    res.status(400).json({ message: 'Hey, you. Bad Request!' });
});

router.delete('/', function(req, res) {
    res.send('Received a DELETE request');
});

module.exports = router;