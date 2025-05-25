const label = document.querySelectorAll('label');
const form = document.querySelector('form');
const dateInputs = document.querySelectorAll('input');
const errorMsg = document.querySelectorAll('.error');
const ageNumber = document.querySelectorAll('.number');

const [dayInput, monthInput, yearInput] = dateInputs;

const showError = (input, index) => {
    let value = input.value;
    label[index].classList.add('active');

    if (input.id === 'days' && yearInput.value && monthInput.value && dayInput.value) {
        if (!isValidDate(yearInput.value, monthInput.value, dayInput.value)) {
            errorMsg[index].textContent = 'Must be a valid date';
            errorMsg[index].classList.add('active');
            return true;
        }
    }

    if (!value) {
        errorMsg[index].textContent = 'This field is required';
    }
    else if (input.id === 'days' && (value > 31 || value < 1)) {
        errorMsg[index].textContent = 'Must be a valid day';
    }
    else if (input.id === 'months' && (value > 12 || value < 1)) {
        errorMsg[index].textContent = 'Must be a valid month';
    }
    else if (input.id === 'years' && (value > new Date().getFullYear())) {
        errorMsg[index].textContent = 'Must be in the past';
    }
    else {
        errorMsg[index].textContent = '';
        label[index].classList.remove('active');
        errorMsg[index].classList.remove('active');
        return false;
    }

    

    errorMsg[index].classList.add('active');
    return true;
}


const setDefault = () => {
    label.forEach(label => {
        label.classList.remove('active');
        label.textContent = label.textContent.toUpperCase();
    })
    errorMsg.forEach(error => {
        error.classList.remove('active');
    })
}

const animateNumber = (element, finalValue) => {
    let start = 0;
    let duration = 1000;
    let increment = Math.ceil(finalValue / (duration / 30));
    const timer = setInterval(() => {
        start += increment;
        if (start >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        }
        else {
            element.textContent = start;
        }
    }, 30);
};

const isValidDate = (y, m, d) => {
    const date = new Date(y, m - 1, d);
    return date.getFullYear() == y &&
        date.getMonth() == m - 1 &&
        date.getDate() == d;
}



const ageCalculator = () => {
    const birthDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months -= 1;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    [years, months, days].forEach((val, index) => {
        if (isNaN(val)) {
            ageNumber[index].textContent = '--';
        } else {
            animateNumber(ageNumber[index], val);
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;
    setDefault();

    dateInputs.forEach((input, index) => {
        if (showError(input, index)) hasError = true;
    })

    if (!hasError) {
        ageCalculator();
    }
})
