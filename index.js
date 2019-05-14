const mathUtils = require('./lib/math-utils');
const KMeansClassifier = require('./lib/k-means/k-means.runner');

const getInputData = dimension => {
	const samples = [];
	for (let i = 0; i < 100; i ++) {
		let sample = [];
		for (let j = 0; j < dimension; j ++) {
			sample.push(mathUtils.randomInteger(1, 50));
		}
		samples.push(sample);
	}

	return samples;
};

(async () => {
	const inputData = await getInputData(2);
	await KMeansClassifier.run(inputData, 2);
})();