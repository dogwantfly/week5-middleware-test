const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');
const handleErrorAsync = require('../utils/handleErrorAsync');

router.get('/', handleErrorAsync(async(req, res, next) =>  {
  const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
  const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
  // 測試：帶入錯誤變數 'timeSor'
  const post = await Post.find(q).populate({
    path: 'user',
    select: 'name photo'
  }).sort(timeSor);
  res.status(200).json({
    status: 'success',
    results: post.length,
    data: {
      post
    }
  });
}))

module.exports = router;
