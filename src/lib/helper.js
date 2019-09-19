/* eslint-disable import/prefer-default-export */

/**
 * Check valid URL
 */
export const validURL = (str) => {
	const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
		+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
		+ '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
		+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
		+ '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
		+ '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(str);
};

/**
 * Limit characters
 */
export const limitCharacters = (str, minlength, maxlength) => {
	const words = str;
	const mnlen = minlength;
	const mxlen = maxlength;

	if (words.length < mnlen || words.length > mxlen) {
		return false;
	}
	return true;
};

/**
 * Limit characters
 */
export const limitWords = (str, limit) => {
	const numberOfWords = str.split(' ');
	if (numberOfWords.length > limit) {
		return false;
	}
	return true;
};

/**
 * Validate between number
 */
export const validateBetweenNumber = (value, min, max) => {
	if (value < min || value > max) {
		return false;
	}
	return true;
};
