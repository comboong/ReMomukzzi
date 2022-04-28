const { user } = require('../../models')

module.exports = async (req, res) => {
	console.log('changeinfo')
	console.log(req.body)
	const newuserinfo = req.body

	await user
		.update(newuserinfo, { where: { user_id: newuserinfo.user_id } })
		.then(result => {
			if (result[0] === 1) {
				console.log(result)
				res.status(200).json({
					message: 'userinfo changed !',
					data: {
						user_id: newuserinfo.user_id,
					},
				})
			} else {
				res.status(400).json({
					message: 'not be change, No such user',
				})
			}
		})
		.catch(
			err => {
				console.log(err)
			}
			// res.status(400).json({
			//     message : "not be change",
			// })
		)
}