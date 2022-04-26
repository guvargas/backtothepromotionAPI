const express = require('express');
const router = express.Router();
const postsService = require('../service/falas_salvasService');


router.post('/posts', async function (req, res, next) {
	const post = req.body;
	try {
		const newPost = await postsService.savePost(post);
		res.status(201).json(newPost);
	} catch (e) {
		next(e);
	}
});