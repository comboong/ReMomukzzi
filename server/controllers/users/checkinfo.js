const { user } = require('../../models')

module.exports = async (req, res) => {
	console.log('changeinfo')

	const newuserinfo = req.body

	// const checkid = await user.findOne({
	// 	where: { user_id: newuserinfo.user_id },
	// })

	if (!newuserinfo) {
		res.status(400).send()
	}
	const checknick = await user.findOne({
		where: {
			nickname: newuserinfo.nickname,
		},
	})
	if (checknick) {
		res.status(409).json({
			message: 'Nickname exist!',
		})
	} else {
		res.status(200).json({
			message: 'Nickname can be use',
		})
	}
}
