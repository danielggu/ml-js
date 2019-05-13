/* global module */

const _isInteger = number => number === Math.floor(number);

module.exports = {

	/**
	 * Returns a random integer between provided values (both included)
	 * Values passed must be integers
	 * 
	 * @param {number} min minimum range value
	 * @param {number} max maximum range value
	 */
	randomInteger(min, max) {
		const bothIntegers = [min, max].reduce((acc, curr) => acc && _isInteger(curr), true);
		if (!bothIntegers) throw 'Invalid arguments for randomInteger function: values must be integers';

		const diff = max - min;
		return min + Math.round(diff * Math.random());
	},

	/**
	 * Returns euclidean distance between given points
	 * Assumes coordinates are referred to the same coordinate system
	 * 
	 * @param {Object} a object representing the first point
	 * @param {Object} b object representing the second point
	 */
	euclideanDistance(a, b) {
		const aCoordinates = a['coordinates'];
		const bCoordinates = b['coordinates'];

		if (aCoordinates && bCoordinates && aCoordinates.length === bCoordinates.length) {
			const sumOfSquares = aCoordinates.reduce((acc, curr, idx) => 
				acc + Math.pow(curr - bCoordinates[idx], 2)
			, 0);

			return Math.sqrt(sumOfSquares);
		} else {
			throw 'Invalid arguments for euclideanDistance function: some object does not have coordinates'
				+ ' or objects coordinates do not have the same lentgh';
		}
	},

	/**
	 * Returns mean value of given data
	 * 
	 * @param {Array<number>} data 
	 */
	mean(data) {
		return data.reduce((acc, curr) => acc + curr, 0) / data.length;
	}
}