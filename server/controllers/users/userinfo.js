const { user, review, shop, review_pic } = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
	console.log('get userinfo')
	const logininfo = req.headers.authorization

	if (logininfo) {
		//요청 들러온 토큰 정리
		const token = logininfo.split(' ')[1]
		const data = jwt.verify(token, '1234', async (err, data) => {
			if (err) {
				res.status(400).json({ data: null, message: 'token err' })
			} else if (data) {
				const userInfo = await user.findOne({
					where: {
						user_id: data.user_id,
					},
					include: [
						{
							//all: true, nested: true
							model: review,
							include: [
								{
									model: shop,
									attributes: ['shop_name'],
								},
								{
									model: review_pic,
									attributes: ['pic_URL'],
								},
							],

							attributes: ['id', 'shop_id', 'star', 'comment', 'createdAt'],
						},
					],
				})

				res.status(200).json({
					message: 'get userinfo!',
					data: { userInfo },
				})
			}
		})
	} else {
		res.status(400).json({ message: 'login first!' })
	}
}
