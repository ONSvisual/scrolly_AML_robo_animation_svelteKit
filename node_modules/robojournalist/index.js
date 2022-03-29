const ordinal = i => {
	if (i < 10) {
		return [
			'',
			'first',
			'second',
			'third',
			'fourth',
			'fifth',
			'sixth',
			'seventh',
			'eighth',
			'ninth'
		][i];
	}

	const j = i % 10;
	const k = i % 100;
	if (j === 1 && k !== 11) {
		return i + 'st';
	}

	if (j === 2 && k !== 12) {
		return i + 'nd';
	}

	if (j === 3 && k !== 13) {
		return i + 'rd';
	}

	return i + 'th';
};

const ordinalExcludingFirst = i => {
	if (i === 1) {
		return '';
	}

	return ordinal(i) + ' ';
};

const numberWord = i => {
	if (i === Math.floor(i) && i >= 1 && i <= 9) {
		return [
			'',
			'one',
			'two',
			'three',
			'four',
			'five',
			'six',
			'seven',
			'eight',
			'nine'
		][i];
	}

	return i;
};

const addAOrAn = n => {
	n = String(n);
	const useAn = n === '11' || n === '18' || n[0] === '8' || n[0] === 'e';
	return useAn ? 'an ' + n : 'a ' + n;
};

// https://stackoverflow.com/a/2901298/3347737
const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const possessive = s => {
	if (s[s.length - 1] === 's') {
		return s + '\'';
	}

	return s + '\'s';
};

const createText = (template, dict) => {
	// This is based on Douglas Crockford's old json_parse https://github.com/douglascrockford/JSON-js/blob/03157639c7a7cddd2e9f032537f346f1a87c0f6d/json_parse.js

	if (typeof template !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof template}`);
	}

	let at = 1;
	let ch = template.charAt(0);

	const getCh = function () {
		// Just to keep xo happy
		return ch;
	};

	const error = function (m) {
		throw JSON.stringify({
			name: 'Robo-journalist error',
			message: m,
			at,
			text: template
		});
	};

	const next = function (c) {
		// If a c parameter is provided, verify that it matches the current character.
		if (c && c !== ch) {
			error('Expected \'' + c + '\' instead of \'' + ch + '\'');
		}

		// Get the next character. When there are no more characters,
		// return the empty string.
		ch = template.charAt(at);
		at += 1;
		return ch;
	};

	const getValue = function (key) {
		const parts = key.split('.');
		let d = dict;
		for (const part of parts) {
			try {
				d = d[part];
			} catch {
				error(`${key} is not in the data dictionary.`);
			}
		}

		return d;
	};

	const rpn = function (key) {
		const tokens = key.split(' ');
		const binaryOperators = {
			'+': (a, b) => a + b,
			'-': (a, b) => a - b,
			'*': (a, b) => a * b,
			'/': (a, b) => a / b,
			'<': (a, b) => a < b,
			'>': (a, b) => a > b,
			'<=': (a, b) => a <= b,
			'>=': (a, b) => a >= b,
			'===': (a, b) => a === b
		};
		const unaryOperators = {
			'\'': a => possessive(a),
			',': a => numberWithCommas(a),
			'.-2': a => (a / 100).toFixed(0) * 100,
			'.-1': a => (a / 10).toFixed(0) * 10,
			'.0': a => a.toFixed(0),
			'.1': a => a.toFixed(1),
			'.2': a => a.toFixed(2),
			'~abs': a => Math.abs(a),
			'~ord': a => ordinal(Number(a)),
			'~ord\'': a => ordinalExcludingFirst(Number(a)),
			'~word': a => numberWord(Number(a)),
			'~aan': a => addAOrAn(a)
		};
		const stack = [];
		for (const token of tokens) {
			if (/^-?\d+$/.test(token)) {
				// An integer literal
				stack.push(Number(token));
			} else if (token in binaryOperators) {
				const b = Number(stack.pop());
				const a = Number(stack.pop());
				stack.push(binaryOperators[token](a, b));
			} else if (token in unaryOperators) {
				const a = stack.pop();
				stack.push(unaryOperators[token](a));
			} else if (token.charAt(0) === '^') {
				stack[stack.length - 1] = getValue(token.slice(1))(stack[stack.length - 1]);
			} else {
				stack.push(getValue(token));
			}
		}

		if (stack.length !== 1) {
			error('Invalid RPN');
		}

		return stack[0];
	};

	const eitherOr = function (which) {
		next('?');
		const first = parse();
		next(':');
		const second = parse();
		next('}');
		return which ? first : second;
	};

	const braced = function () {
		next('{');
		if (ch === ':') {
			// {:} adds a colon to the output
			next(':');
			next('}');
			return ':';
		}

		if (ch === '?') {
			// {?} adds a colon to the output
			next('?');
			next('}');
			return '?';
		}

		let varName = '';
		while (getCh()) {
			if (ch === '}') {
				next('}');
				return rpn(varName);
			}

			if (ch === '?') {
				return eitherOr(rpn(varName));
			}

			varName += ch;
			next();
		}

		error('Braces not closed');
	};

	const parse = function () {
		let result = '';
		while (getCh()) {
			if (ch === ':' || ch === '}') {
				return result;
			}

			if (ch === '{') {
				result += braced();
				continue;
			}

			result += ch;
			next();
		}

		return result;
	};

	const result = parse();
	if (ch !== '') {
		error(`Didn't expect '${ch}'`);
	}

	return result;
};

export default createText;
