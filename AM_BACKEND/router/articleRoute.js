const express = require("express");
const router = express.Router();
const controller = require("../controller/articleController");
const uploadController = require("../controller/userController");

router.post("/createArticle",uploadController.upload.fields([
    {name:'newsImage',maxCount:1},
]), controller.createArticles);

router.get('/fetchAll',controller.articleAllFetch);
router.post('/updateArticle',controller.updateArticles);
router.post('/deleteArticle',controller.deleteArticles);

module.exports = router;