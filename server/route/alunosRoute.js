const express = require('express');
const router = express.Router();
const alunosService = require('../service/alunosService');


router.post('/alunos', async function (req, res, next) {
	const aluno = req.body;
	try {
		const newAluno = await alunosService.saveAluno(aluno);
		res.status(201).json(newAluno);
	} catch (e) {
		next(e);
	}
});


module.exports = router;