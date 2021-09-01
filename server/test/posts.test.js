const crypto = require('crypto');
const axios = require('axios');
const postsService = require('../service/postsService');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Should get posts', async function () {
	const post1 = await postsService.savePost({ acao: generate(), descricao: generate() });
	const post2 = await postsService.savePost({ acao: generate(), descricao: generate() });
	const post3 = await postsService.savePost({ acao: generate(), descricao: generate() });
	const response = await request('http://localhost:3000/posts', 'get');
	expect(response.status).toBe(200);
	const posts = response.data;
	expect(posts).toHaveLength(3);
	await postsService.deletePost(post1.id);
	await postsService.deletePost(post2.id);
	await postsService.deletePost(post3.id);
});

test('Should save a post', async function () {
	const data = { acao: generate(), descricao: generate() };
	const response = await request('http://localhost:3000/posts', 'post', data);
	expect(response.status).toBe(201);
	const post = response.data;
	expect(post.acao).toBe(data.acao);
	expect(post.descricao).toBe(data.descricao);
	await postsService.deletePost(post.id);
});

test('Should not save a post', async function () {
	const data = { acao: generate(), descricao: generate() };
	const response1 = await request('http://localhost:3000/posts', 'post', data);
	const response2 = await request('http://localhost:3000/posts', 'post', data);
	expect(response2.status).toBe(409);
	const post = response1.data;
	await postsService.deletePost(post.id);
});

test('Should update a post', async function () {
	const post = await postsService.savePost({ acao: generate(), descricao: generate() });
	post.acao = generate();
	post.descricao = generate();
	const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
	expect(response.status).toBe(204);
	const updatedPost = await postsService.getPost(post.id);
	expect(updatedPost.acao).toBe(post.acao);
	expect(updatedPost.descricao).toBe(post.descricao);
	await postsService.deletePost(post.id);
});

test('Should not update a post', async function () {
	const post = {
		id: 1
	};
	const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
	expect(response.status).toBe(404);
});

test('Should delete a post', async function () {
	const post = await postsService.savePost({ acao: generate(), descricao: generate() });
	const response = await request(`http://localhost:3000/posts/${post.id}`, 'delete');
	expect(response.status).toBe(204);
	const posts = await postsService.getPosts();
	expect(posts).toHaveLength(0);
});