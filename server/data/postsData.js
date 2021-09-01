const database = require('../infra/database');

exports.getPosts = function () {
	return database.query('select * from acoes.post');
};

exports.getPost = function (id) {
	return database.oneOrNone('select * from acoes.post where id = $1', [id]);
};

exports.getPostByAcao = function (post) {
	return database.oneOrNone('select * from acoes.post where acao = $1', [post]);
};

exports.savePost = function (post) {
	return database.one('insert into acoes.post (acao, descricao) values ($1, $2) returning *', [post.acao, post.descricao]);
};

exports.updatePost = function (id, post) {
	return database.none('update acoes.post set acao = $1, descricao = $2 where id = $3', [post.acao, post.descricao, id]);
};

exports.deletePost = function (id) {
	return database.none('delete from acoes.post where id = $1', [id]);
};
