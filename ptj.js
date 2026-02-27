const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// Toggle mobile menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

// Open the modal related to the clicked button by locating the nearest .services__modal
modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener("click", (e) => {
    // Prefer the modal inside the same qualification/service block
    let container = modalBtn.closest('.qualification__data') || modalBtn.closest('.services__container') || modalBtn.parentElement;
    let modalView = container ? container.querySelector('.services__modal') : null;

    // Fallbacks: next sibling or first available modal
    if (!modalView) {
      let next = modalBtn.nextElementSibling;
      if (next && next.classList && next.classList.contains('services__modal')) modalView = next;
      else modalView = document.querySelector('.services__modal');
    }

    if (modalView) {
      modalView.classList.add('active-modal');
    }
  });
});

// Close buttons: remove active-modal from any open modal
modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    document.querySelectorAll('.services__modal.active-modal').forEach((mv) => mv.classList.remove('active-modal'));
  });
});

// Close modal when clicking on overlay (the modal root itself)
document.addEventListener('click', (e) => {
  const openModal = document.querySelector('.services__modal.active-modal');
  if (!openModal) return;
  if (e.target === openModal) openModal.classList.remove('active-modal');
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const selector = `.nav__menu a[href*="${sectionId}"]`;
    const link = document.querySelector(selector);
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (window.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Helpers to get current values
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? iconTheme : "uil-moon");

// Apply stored preference if present
if (selectedTheme) {
  if (selectedTheme === "dark") document.body.classList.add(darkTheme);
  else document.body.classList.remove(darkTheme);

  if (selectedIcon === iconTheme) themeButton.classList.add(iconTheme);
  else themeButton.classList.remove(iconTheme);
}

// Toggle theme and persist selection
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/*==================== FORM VALIDATION ====================*/
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    
    // Basic validation
    if (!nameInput.value.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    if (!messageInput.value.trim()) {
      alert('Please enter your message');
      return;
    }
    
    // Email will be sent via the mailto link
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}
