// انتظر حتى يتم تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {
    /*=============== SHOW MENU ===============*/
    const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

    /*===== MENU SHOW =====*/
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    /*===== MENU HIDDEN =====*/
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll('.nav__link');
    const linkAction = () => {
        navMenu.classList.remove('show-menu');
    };
    navLink.forEach(n => n.addEventListener('click', linkAction));

    /*=============== ADD SHADOW HEADER ===============*/
    const shadowHeader = () => {
        const header = document.getElementById('header');
        window.scrollY >= 50 ? header.classList.add('shadow-header') :
            header.classList.remove('shadow-header');
    };
    window.addEventListener('scroll', shadowHeader);

    /*=============== INITIALIZE SWIPERS ===============*/
    // انتظر حتى يتم تحميل Swiper.js بالكامل
    if (typeof Swiper !== 'undefined') {
        // Swiper للبطاقات
        let swiperCards = new Swiper(".card__content", {
            loop: true,
            spaceBetween: 32,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                600: { slidesPerView: 2 },
                968: { slidesPerView: 3 }
            }
        });

        // Swiper للشهادات
        let swiperTestimonial = new Swiper(".testimonial__swiper", {
            spaceBetween: 16,
            grabCursor: true,
            loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            breakpoints: {
                1150: {
                    slidesPerView: 3,
                    centeredSlides: false
                }
            }
        });
    } else {
        console.error('Swiper library not loaded!');
    }

    /*=============== SHOW SCROLL UP ===============*/
    const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up');
        window.scrollY >= 350 ? scrollUp.classList.add('show-scroll') :
            scrollUp.classList.remove('show-scroll');
    };
    window.addEventListener('scroll', scrollUp);

    /*=============== QUESTIONS ACCORDION ===============*/
    const accordionItems = document.querySelectorAll('.questions__item');
    const toggleItem = (item) => {
        const accordionContent = item.querySelector('.questions__content');
        if (item.classList.contains('accordion-open')) {
            accordionContent.removeAttribute('style');
            item.classList.remove('accordion-open');
        } else {
            accordionContent.style.height = accordionContent.scrollHeight + 'px';
            item.classList.add('accordion-open');
        }
    };

    accordionItems.forEach((item) => {
        const accordionHeader = item.querySelector('.questions__header');
        accordionHeader.addEventListener('click', () => {
            const openItem = document.querySelector('.accordion-open');
            toggleItem(item);
            if (openItem && openItem !== item) {
                toggleItem(openItem);
            }
        });
    });

    /*=============== SCROLL SECTIONS ACTIVE LINK (معلق حالياً) ===============*/
    /*
    const sections = document.querySelectorAll('section[id]');
    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                  sectionTop = current.offsetTop - 58,
                  sectionId = current.getAttribute('id'),
                  sectionsClass = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        });
    };
    window.addEventListener('scroll', scrollActive);
    */
});

// تهيئة AOS للانيميشنز
if (typeof AOS !== 'undefined') {
    AOS.init({
        offset: 200,
        duration: 1500
    });
}