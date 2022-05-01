const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');
const handleErrorAsync = require('../utils/handleErrorAsync');
const AppError = require('../utils/appError');

router.get('/', handleErrorAsync(async(req, res, next) =>  {

  return next(AppError(401, '您並未登入', next));

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
router.post('/', handleErrorAsync(async(req, res, next) =>  {
  const data = req.body;
  if(data.content){
      const newPost = await Post.create(
          {
              user: data.user,
              content: data.content,
              tags: data.tags,
              type:data.type
          }
      );
      res.status(200).json({
          status: 'success',
          data: newPost
      });
  } else {
      res.status(400).json({
          status: 'false',
          "message": "欄位未填寫正確，或無此 todo ID"
      });
  }
}))
module.exports = router;
