const express = require('express');
const {create,allList,update,remove} = require("../controllers/todo.controllers.js");
const {todoMessage} = require("../config/message");

const router = express.Router();

router.post('/', create);
router.get('/', allList);
router.put('/:id', update);
router.delete('/:id', remove);

router.get('*', (req, res) => {
    res.send('Handling unconventional todo route');
    return res.status(400).json({ message: todoMessage.error.handleUnconvational });
});

module.exports = router;
