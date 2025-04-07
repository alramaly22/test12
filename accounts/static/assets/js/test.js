var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");

var modal = document.getElementById("myModal");
var modalText = document.querySelector("#modalText");
var span = document.getElementsByClassName("close")[0];

function calculate() {
    // التحقق من ملء جميع الحقول
    if (!age.value || !height.value || !weight.value || (!male.checked && !female.checked)) {
        modal.style.display = "block";
        modalText.innerHTML = `All fields are required!`;
        return;
    }

    // التحقق من أن القيم المدخلة أرقام صحيحة ومقبولة
    let ageValue = Number(age.value);
    let heightValue = Number(height.value);
    let weightValue = Number(weight.value);

    if (ageValue <= 0 || heightValue <= 0 || weightValue <= 0) {
        modal.style.display = "block";
        modalText.innerHTML = `Please enter valid positive numbers!`;
        return;
    }

    countBmi(heightValue, weightValue);
}

function countBmi(height, weight) {
    // تحويل الطول إلى متر قبل الحساب
    var bmi = weight / ((height / 100) ** 2);

    var result = '';
    if (bmi < 18.5) {
        result = 'Underweight';
    } else if (bmi < 25) {
        result = 'Healthy';
    } else if (bmi < 30) {
        result = 'Overweight';
    } else if (bmi < 35) {
        result = 'Obese';
    } else {
        result = 'Extremely obese';
    }

    resultArea.style.display = "block";
    document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
    document.querySelector("#result").innerHTML = bmi.toFixed(2);
}

// إغلاق المودال عند الضغط على الزر X
span.onclick = function() {
    modal.style.display = "none";
}

// إغلاق المودال عند النقر خارج النافذة
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
        // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
        // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('shadow-header') :
        header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)