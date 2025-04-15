// Particle Background
particlesJS("particles-js", {
  particles: {
    number: { value: 200 },
    shape: { type: "circle" },
    opacity: { value: 0.8, random: true },
    size: { value: 1.5, random: true },
    move: {
      speed: 0.5,
      out_mode: "out",
      direction: "none",
      random: true,
      attract: { enable: true, rotateX: 500, rotateY: 500 }
    },
    line_linked: { enable: false }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    },
    modes: {
      repulse: { distance: 120, duration: 0.4 }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Skill Sphere Animation
  const spheres = document.querySelectorAll('.sphere');
  const skillsBox = document.querySelector('.skills-container');

  spheres.forEach((sphere, index) => {
    sphere.style.top = index % 2 === 0 ? 'calc(100% - 240px)' : '35px';
    const spacing = (index + 1) * (100 / (spheres.length + 1));
    sphere.style.left = `calc(${spacing}% - 30px)`;
  });

  skillsBox.addEventListener('mousemove', (e) => {
    const rect = skillsBox.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    spheres.forEach(sphere => {
      sphere.classList.remove('resetting');
      const sphereX = sphere.offsetLeft + sphere.offsetWidth / 2;
      const distance = mouseX - sphereX;
      sphere.style.transform = `translateX(${distance * 0.05}px)`;
    });
  });

  skillsBox.addEventListener('mouseleave', () => {
    spheres.forEach(sphere => {
      sphere.classList.add('resetting');
      sphere.style.transform = `translateX(0px)`;
    });
  });

  // Horizontal Slider with Clones
  const slider = document.getElementById('slider');
  let slides = document.querySelectorAll('.slide');
  let currentIndex = 1;
  let slideWidth = slides[0].offsetWidth + 20;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  slides = document.querySelectorAll('.slide');

  function updateScrollPosition() {
    slideWidth = slides[0].offsetWidth + 20;
    slider.scrollLeft = currentIndex * slideWidth;
  }

  function updateActiveSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[currentIndex]) slides[currentIndex].classList.add('active');
  }

  function goToNextSlide() {
    currentIndex++;
    slider.scrollTo({ left: currentIndex * slideWidth, behavior: 'smooth' });
    setTimeout(() => {
      if (slides[currentIndex] && slides[currentIndex].classList.contains('clone')) {
        slider.scrollTo({ left: slideWidth, behavior: 'auto' });
        currentIndex = 1;
      }
      updateActiveSlide();
    }, 500);
  }

  function goToPrevSlide() {
    currentIndex--;
    slider.scrollTo({ left: currentIndex * slideWidth, behavior: 'smooth' });
    setTimeout(() => {
      if (slides[currentIndex] && slides[currentIndex].classList.contains('clone')) {
        slider.scrollTo({ left: (slides.length - 2) * slideWidth, behavior: 'auto' });
        currentIndex = slides.length - 2;
      }
      updateActiveSlide();
    }, 500);
  }

  document.getElementById('slide-left').addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    goToPrevSlide();
    autoSlideInterval = setInterval(goToNextSlide, 10000);
  });

  document.getElementById('slide-right').addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    goToNextSlide();
    autoSlideInterval = setInterval(goToNextSlide, 10000);
  });

  window.addEventListener('resize', updateScrollPosition);
  updateScrollPosition();
  updateActiveSlide();

  let autoSlideInterval = setInterval(goToNextSlide, 6000);
});

// Position slider-wrapper below box5 dynamically
function positionSliderAfterBox5() {
  const box5 = document.querySelector('.box5');
  const sliderWrapper = document.querySelector('.slider-wrapper');

  if (box5 && sliderWrapper) {
    const box5Top = box5.getBoundingClientRect().top + window.scrollY;
    const vh = window.innerHeight;
    const box5TopVH = (box5Top / vh) * 100;
    const newTop = box5TopVH + 40; // 40vh gap
    sliderWrapper.style.top = `${newTop}vh`;
  }
}

// FIX: Use ResizeObserver for reliable layout updates
const observeBox5 = () => {
  const box5 = document.querySelector('.box5');
  if (!box5) return;

  const resizeObserver = new ResizeObserver(() => {
    // Delay to allow DOM layout to settle
    setTimeout(() => {
      positionSliderAfterBox5();
    }, 50);
  });

  resizeObserver.observe(box5);
};

// Run once DOM is loaded
window.addEventListener("load", () => {
  positionSliderAfterBox5();
  observeBox5();
});

// rocket

const modelViewer = document.getElementById('rocketModel');

  function showHandPrompt() {
    // Step 1: Forcefully re-enable the prompt
    modelViewer.setAttribute('interaction-prompt', 'when-focused');

    // Step 2: Remove it shortly after to reset
    setTimeout(() => {
      modelViewer.setAttribute('interaction-prompt', 'none');
    }, 2000); // Hand stays visible for 2 seconds
  }

  // Repeat every 7 seconds
  setInterval(showHandPrompt, 7000);

//to recude the gap between proje and skills

function positionSkillsAfterAbout() {
  const aboutSection = document.querySelector('#about');
  const skillsContainer = document.querySelector('#skills');

  if (aboutSection && skillsContainer) {
    const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY;
    const aboutHeight = aboutSection.offsetHeight;
    const newTop = aboutTop + aboutHeight + 100; // 100px gap
    skillsContainer.style.position = 'absolute';
    skillsContainer.style.top = `${newTop}px`;
  }
}

function positionProjectsAfterSkills() {
  const skillsSection = document.querySelector('#skills');
  const projectsContainer = document.querySelector('#proje');

  if (skillsSection && projectsContainer) {
    const skillsTop = skillsSection.getBoundingClientRect().top + window.scrollY;
    const skillsHeight = skillsSection.offsetHeight;
    const newTop = skillsTop + skillsHeight + 100; // 100px gap
    projectsContainer.style.position = 'absolute';
    projectsContainer.style.top = `${newTop}px`;
  }
}

function observeSection(sectionId, callback) {
  const section = document.querySelector(sectionId);
  if (!section) return;

  const resizeObserver = new ResizeObserver(() => {
    setTimeout(callback, 50);
  });

  resizeObserver.observe(section);
}

window.addEventListener("load", () => {
  positionSkillsAfterAbout();
  positionProjectsAfterSkills();

  observeSection('#about', positionSkillsAfterAbout);
  observeSection('#skills', positionProjectsAfterSkills);
});
//redgap of contact and slider

function positionAfter(referenceSelector, targetSelector, gap = 100) {
  const ref = document.querySelector(referenceSelector);
  const target = document.querySelector(targetSelector);

  if (ref && target) {
    const refTop = ref.getBoundingClientRect().top + window.scrollY;
    const refHeight = ref.offsetHeight;
    const newTop = refTop + refHeight + gap;
    target.style.position = 'absolute';
    target.style.top = `${newTop}px`;
  }
}

function observePositioning(referenceSelector, updateFunction) {
  const ref = document.querySelector(referenceSelector);
  if (!ref) return;

  const resizeObserver = new ResizeObserver(() => {
    setTimeout(updateFunction, 50);
  });

  resizeObserver.observe(ref);
}

window.addEventListener("load", () => {
  // Skills after About
  const updateSkills = () => positionAfter('#about', '#skills', 100);
  updateSkills();
  observePositioning('#about', updateSkills);

  // Projects after Skills
  const updateProjects = () => positionAfter('#skills', '#proje', 100);
  updateProjects();
  observePositioning('#skills', updateProjects);

  // Slider after box5
  const updateSlider = () => positionAfter('.box5', '.slider-wrapper', 100);
  updateSlider();
  observePositioning('.box5', updateSlider);

  // Contact Footer after Slider
  const updateContact = () => positionAfter('.slider-wrapper', '#contact', 100);
  updateContact();
  observePositioning('.slider-wrapper', updateContact);
});
//redgap for aboutme and skills
function positionElementAfter(referenceSelector, targetSelector, gap = 100) {
  const reference = document.querySelector(referenceSelector);
  const target = document.querySelector(targetSelector);

  if (reference && target) {
    const referenceTop = reference.getBoundingClientRect().top + window.scrollY;
    const referenceHeight = reference.offsetHeight;
    const newTop = referenceTop + referenceHeight + gap;
    target.style.position = 'absolute';
    target.style.top = `${newTop}px`;
  }
}

function observeElementResize(referenceSelector, targetSelector, gap = 100) {
  const reference = document.querySelector(referenceSelector);
  if (!reference) return;

  const resizeObserver = new ResizeObserver(() => {
    positionElementAfter(referenceSelector, targetSelector, gap);
  });

  resizeObserver.observe(reference);
}

function updatePosition() {
  // Position Skills after About
  positionElementAfter('#about', '#skills', 100);

  // Position Projects after Skills
  positionElementAfter('#skills', '#proje', 100);
}

window.addEventListener("load", () => {
  // Initial positioning
  updatePosition();

  // Observe resizing for About → Skills
  observeElementResize('#about', '#skills', 100);

  // Observe resizing for Skills → Projects
  observeElementResize('#skills', '#proje', 100);
});

// Continuously check and update position when window size changes
window.addEventListener("resize", () => {
  updatePosition();
});

//.model
// Already defined functions:
function positionAfter(referenceSelector, targetSelector, gap = 100) {
  const ref = document.querySelector(referenceSelector);
  const target = document.querySelector(targetSelector);

  if (ref && target) {
    const refTop = ref.getBoundingClientRect().top + window.scrollY;
    const refHeight = ref.offsetHeight;
    const newTop = refTop + refHeight + gap;
    target.style.position = 'absolute';
    target.style.top = `${newTop}px`;
  }
}

function observePositioning(referenceSelector, updateFunction) {
  const ref = document.querySelector(referenceSelector);
  if (!ref) return;

  const resizeObserver = new ResizeObserver(() => {
    setTimeout(updateFunction, 50);
  });

  resizeObserver.observe(ref);
}

// Call for placing the model after the slider
function updateModelPosition() {
  positionAfter('#slider', '#twomodel', 100); // adjust gap if needed
}
observePositioning('#slider', updateModelPosition);
window.addEventListener('load', updateModelPosition);
window.addEventListener('resize', updateModelPosition);





