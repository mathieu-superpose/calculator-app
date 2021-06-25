let display = document.querySelector('.calculator__display__total');
let operator = document.querySelector('.calculator__display__operator');

let total = new Number();
let currentDisplay = '';

const filterNumber = (number) => {
	if (/^0[0-9]/.test(number)) {
		number = number[1];
		currentDisplay = number;
	}
	return number === '0' ? ['0', '', '0', undefined] : number.match(/(-?)([0-9]{1,})(.[0-9]{1,3})?/)
}

const addComma = (number) => {
	const reversedNum = number.split('').reverse().join('');
	const filledRevNum = reversedNum.match(/[0-9]{1,3}/g).join(',');
	return filledRevNum.split('').reverse().join('');
}

const displayNumber = (number) => {
	if (number.includes('e')) return number;
	const filteredNum = filterNumber(number);
	if (filteredNum[2] && filteredNum[2].length > 9) return filteredNum[1] + scientificNotation(filteredNum[2]);
	if (filteredNum[3] == undefined) return filteredNum[1] + addComma(filteredNum[0]) + '.';
	return filteredNum[1] + addComma(filteredNum[2]) + filteredNum[3];
}

const scientificNotation = (number) => {
	return number[0] + '.' + number[1] +  number[2] +  number[3] + ',' + number[4] + number[5] + number[6] + ',' + number[7] + number[8] + number[9] + 'e' + (number.length-1);
}

const displayOp = (op) => {
	operator.style.visibility = "visible";
	operator.innerHTML = op;
}

const removeOp = () => {
	operator.innerHTML = '';	
	operator.style.visibility = "hidden";
}

const pressNum = (num) => {
	currentDisplay += num;
	display.innerHTML = displayNumber(currentDisplay);
}

const pressDot = () => {
	if(filterNumber(currentDisplay)[3] == undefined) {
		currentDisplay += '.';
	}
}

const compute = (op) => {
	switch (op) {
		case '+':
			total += Number(currentDisplay);
		break;
		case '-':
			total -= Number(currentDisplay);
		break;
		case 'x':
			total *= Number(currentDisplay);
		break;
		case '÷':
			total /= Number(currentDisplay);
		break;
		default:
	}
	display.innerHTML = displayNumber(total+'');
	currentDisplay = '';
}

const pressOp = (op) => {
	if (operator.innerHTML && typeof total !== 'object') {
		compute(operator.innerHTML);
	}
	if(typeof total == 'object') {
		total = Number(currentDisplay)
		currentDisplay = '';
	}
	displayOp(op);
}

const pressDel = () => {
	if(currentDisplay.length === 1) {
		currentDisplay = '0';
		display.innerHTML = '0';
	}
	if(currentDisplay!='') {
		const newDisplay = currentDisplay.split('');
		newDisplay.pop();
		currentDisplay = newDisplay.join('');
		display.innerHTML = displayNumber(currentDisplay);
	}
}

const pressRes = () => {
	currentDisplay = '';
	display.innerHTML = displayNumber('0');
	removeOp();
	total = new Number();
}

const pressTot = () => {
	if (operator.innerHTML && typeof total !== 'object') {
		compute(operator.innerHTML);
		removeOp();
	}
}

window.addEventListener('keydown', (e) => {
	let keyPressed = document.querySelector(`button[data-key="${e.keyCode}"]`);

	switch (keyPressed && keyPressed.className) {
		case 'calculator__numpad__key':
		case 'calculator__numpad__op':
		case 'calculator__numpad__num':
	    keyPressed.style.boxShadow = "0 1px var(--key-sdw-main)";
	    keyPressed.style.transform = "translateY(3px)";
	    break;
	  case 'calculator__numpad__delKey':
	  case 'calculator__numpad__resetKey':
	    keyPressed.style.boxShadow = "0 1px var(--key-sdw-accent)";
	    keyPressed.style.transform = "translateY(3px)";
	    break;
	  case 'calculator__numpad__equalKey':
	    keyPressed.style.boxShadow = "0 1px var(--key-sdw-important)";
	    keyPressed.style.transform = "translateY(3px)";
	    break;
	  default:
	}

	if (e.keyCode == '88') {
		keyPressed = document.querySelector(`button[data-key="221"]`);
		keyPressed.style.boxShadow = "0 1px var(--key-sdw-main)";
	    keyPressed.style.transform = "translateY(3px)";
	}

	switch (e.keyCode) {
		case 48:
			pressNum('0');
		break;
		case 49:
			pressNum('1');
		break;
		case 50:
			pressNum('2');
		break;
		case 51:
			pressNum('3');
		break;
		case 52:
			pressNum('4');
		break;
		case 53:
			pressNum('5');
		break;
		case 54:
			pressNum('6');
		break;
		case 55:
			pressNum('7');
		break;
		case 56:
			pressNum('8');
		break;
		case 57:
			pressNum('9');
		break;
		case 190:
		case 188:
			pressDot('.');
	    break;
		case 187:
			pressOp('+');
		break;
		case 189:
			pressOp('-');
		break;
		case 186:
		case 191:
			pressOp('÷');
		break;
		case 221:
		case 88:
			pressOp('x');
		break;
		case 8:
			pressDel();
		break;
		case 82:
			pressRes();
		break;
	  	case 13:
	  		pressTot();
	    break;
	  default:
	}
});

window.addEventListener('keyup', (e) => {
	let keyReleased = document.querySelector(`button[data-key="${e.keyCode}"]`);
	switch (keyReleased && keyReleased.className) {
		case 'calculator__numpad__key':
		case 'calculator__numpad__op':
		case 'calculator__numpad__num':
		case 'calculator__numpad__delKey':
	  	case 'calculator__numpad__resetKey':
	  	case 'calculator__numpad__equalKey':
	    keyReleased.style.boxShadow = "";
	    keyReleased.style.transform = "";
	    break;
	  	default:
	}

	if (e.keyCode == '88') {
		keyReleased = document.querySelector(`button[data-key="221"]`);
		keyReleased.style.boxShadow = "";
	    keyReleased.style.transform = "";
	}
});
