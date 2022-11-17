const newsModel = require("../model/articleModel");

exports.createArticles = async (req, res) => {

  let { title, description } = req.body; 
  const news = new newsModel({
    title: title,
    description: description,
    image: "/" + req.files.newsImage[0].path,
  });

  await news.save((err, result) => {
    if (err) {
      return res.json({
        code: 500,
        message: "Database Error",
        error: err,
      });
    } else {
      return res.json({
        code: 200,
        message: "News added Successfully",
        data: result,
      });
    }
  });
};

exports.articleAllFetch = async (req, res) => {
  newsModel.find({ deleted: "N" }, async (err, result) => {
    if (err) {
      return res.json({
        code: 500,
        message: "Database Fetch Error",
        error: err,
      });
    } else {
      return res.json({
        code: 200,
        message: "All News Details",
        data: result,
      });
    }
  });
};


exports.updateArticles = async (req, res) => {
  const { id, title, description } = req.body;
  const updateDoc = {
    $set: {
      title: title,
      description: description,
      updatedOn: Date.now(),
    },
  };
  newsModel.findOneAndUpdate(
    { _id: id },
    updateDoc,
    { new: true },
    async (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          message: "Database Fetch Error",
          error: err,
        });
      } else {
        return res.json({
          code: 200,
          message: "Update News Successful",
          data: result,
        });
      }
    }
  );
};

exports.deleteArticles = async (req, res) => {
  const { id } = req.body;

  const updateDoc = {
    $set: {
      deleted: "Y",
    },
  };

  newsModel.findOneAndUpdate(
    { _id: id },
    updateDoc,
    { new: true },
    async (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          message: "Database Fetch Error",
          error: err,
        });
      } else {
        return res.json({
          code: 200,
          message: "News Deleted",
          data: result,
        });
      }
    }
  );
};

