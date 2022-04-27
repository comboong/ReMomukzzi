const { review } = require('../../models')

module.exports = async (req, res) => {
	console.log('delete review')
	console.log(req.body)

	const targetreview = await review.findOne({
		where: {
			id: req.body.review_id,
		},
	})

	if (targetreview) {
		review
			.destroy({
				where: {
					id: req.body.review_id,
				},
			})
			.then(
				res
					.status(200)
					.json({ message: `review id ${req.body.review_id} has deleted!` })
			)
	} else {
		res.status(400).json({ message: 'no review' })
	}
}
