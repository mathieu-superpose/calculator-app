const setTheme = (theme) => {
    localStorage.setItem('calc--theme', `theme-${theme}`);
    document.documentElement.className = `theme-${theme}`;
}

const getValue = () => {
	let value = 1;
	switch (localStorage.getItem('calc--theme')) {
	  case 'theme-1':
	    setTheme('1');
	    break;
	  case 'theme-2':
	  	value = 2;
	    setTheme('2');
	    break;
	  case 'theme-3':
	  	value = 3;
	    setTheme('3');
	    break;
	  default:
	    setTheme('1');
	}
	return value;
}

const slider = document.querySelector(".calculator__head__right__themes__selector");
slider.value = getValue();
