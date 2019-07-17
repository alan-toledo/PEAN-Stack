const express = require('express');
const userRoutes = express.Router();
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
})

userRoutes.route('/').get(function (req, res) {
	pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
		if (error) {
			throw error
		}else{
			res.status(200).json(results.rows)
		}
	})
});

userRoutes.route('/add').post(function (req, res) {
	const { user_name } = req.body
	pool.query('INSERT INTO users (user_name) VALUES ($1)', [user_name], (error) => {
		if (error) {
		  throw error
		}else{
			res.status(200).json({'user': 'user in added successfully'});
		}
	})
});

userRoutes.route('/edit/:id').get(function (req, res) {
	let id = req.params.id;
	pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
		if (error) {
		  throw error
		}else{
			res.status(200).json(results.rows)
		}
	})
});

userRoutes.route('/update/:id').put(function (req, res) {
	const id = parseInt(req.params.id)
  	const { user_name } = req.body
	pool.query(
		'UPDATE users SET user_name = $1 WHERE user_id = $2', [user_name, id], (error) => {
			if (error) {
				throw error
			}else{
				res.status(200).json({'user': 'user updated successfully'});
			}
		}
	)
});

userRoutes.route('/delete/:id').delete(function (req, res) {
	const id = parseInt(req.params.id)
	pool.query('DELETE FROM users WHERE user_id = $1', [id], (error) => {
		if (error) {
			throw error
		}else{
			res.status(200).json('User deleted')
		}
	})
});

module.exports = userRoutes;