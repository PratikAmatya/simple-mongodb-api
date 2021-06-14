const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// CREATE POST
router.post('/', async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
	});

	try {
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (err) {
		res.status(422).json({
			status: 'failure',
		});
	}
});

// GET ALL THE POSTS
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});

// GET SPECIFIC POST
router.get('/:postID', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postID);
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

router.patch('/:postID', async (req, res) => {
	try {
		const updatedPost = await Post.findByIdAndUpdate(
			req.params.postID,
			req.body
		);
		await post.save();
		res.send(updatedPost);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const removedPost = await Post.remove({ _id: req.params.id });
		res.json(removedPost);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
