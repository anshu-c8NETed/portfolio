const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = 'rgba(99, 102, 241, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 - distance / 500})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let scroll;

document.addEventListener('DOMContentLoaded', function() {
  scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    smoothMobile: false,
    resetNativeScroll: true,
    lerp: 0.1
  });

  window.addEventListener('resize', () => {
    scroll.update();
  });

  setTimeout(() => {
    firstPageAnim();
  }, 100);
});

function firstPageAnim() {
  const tl = gsap.timeline();

  tl.from("#nav", {
    y: -30,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  })
  .to(".boundingelem", {
    y: 0,
    ease: "power4.out",
    duration: 1.5,
    stagger: 0.15,
  }, "-=0.8")
  .from("#herofooter", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  }, "-=0.5");
}

const cursorFollower = document.querySelector("#cursor-follower");
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  
  if (cursorFollower) {
    cursorFollower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
  }
  
  requestAnimationFrame(animateFollower);
}

animateFollower();


document.querySelectorAll('a, .elem, .skill-card').forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    if (cursorFollower) {
      gsap.to(cursorFollower, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });
  
  elem.addEventListener('mouseleave', () => {
    if (cursorFollower) {
      gsap.to(cursorFollower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });
});


const menuBtn = document.querySelector('.menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const menuOverlay = document.querySelector('.menu-overlay');

function openMenu() {
  menuBtn.classList.add('active');
  dropdownMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuBtn.classList.remove('active');
  dropdownMenu.classList.remove('active');
  document.body.style.overflow = '';
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    if (dropdownMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', closeMenu);
}

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    closeMenu();
    
    setTimeout(() => {
      if (targetElement && scroll) {
        scroll.scrollTo(targetElement);
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  });
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
    closeMenu();
  }
});

document.querySelectorAll(".elem").forEach(function (elem) {
  const img = elem.querySelector("img");
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mouseenter", function () {
    gsap.set(img, { opacity: 0 });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(img, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    const diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    
    gsap.to(img, {
      opacity: 1,
      ease: "power3.out",
      top: diff,
      left: dets.clientX,
      rotation: gsap.utils.clamp(-15, 15, diffrot * 0.3),
      duration: 0.3
    });
  });
});

if (typeof IntersectionObserver !== 'undefined') {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-card').forEach(card => {
    gsap.set(card, { opacity: 0, y: 50 });
    skillObserver.observe(card);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Skip if it's a menu link (already handled above)
    if (this.classList.contains('menu-link')) {
      return;
    }
    
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement && scroll) {
      scroll.scrollTo(targetElement);
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Update Time Function
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }) + ' IST';
  
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

updateTime();
setInterval(updateTime, 60000); 

// Parallax effect on scroll
if (scroll) {
  scroll.on('scroll', (args) => {
    const scrollY = args.scroll.y;
    
    // Parallax for hero section
    const hero = document.querySelector('#hero');
    if (hero) {
      hero.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
    

    const heroFooter = document.querySelector('#herofooter');
    if (heroFooter) {
      const opacity = Math.max(0, 1 - scrollY / 500);
      heroFooter.style.opacity = opacity;
    }
  });
}

gsap.to('.gradient-text', {
  backgroundPosition: '200% center',
  duration: 3,
  ease: 'none',
  repeat: -1,
  yoyo: true
});

// Project cards stagger animation on scroll
if (typeof IntersectionObserver !== 'undefined') {
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.from(entry.target, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
        projectObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.elem').forEach(elem => {
    projectObserver.observe(elem);
  });
}

if (typeof IntersectionObserver !== 'undefined') {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.from('.about-image-container', {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)"
        });
        
        gsap.from('#textabout > *', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3
        });
        
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
}

document.querySelectorAll(".elem").forEach(function (elem) {
  elem.addEventListener("click", function() {
    const projectTitle = elem.querySelector("h1");
    if (projectTitle) {
      const title = projectTitle.textContent.trim();
      
      if (title === "SHANSCAFE") {
        window.open("https://shanscafe.netlify.app/", "_blank");
      } else if (title === "PINSPIRE") {
        window.open("https://your-pinspire-url.com/", "_blank");
      } else if (title === "NEXUS") {
        window.open("https://nexusonweb.netlify.app/", "_blank");
      }
      else if (title === "LAZAREV.") {
        window.open("https://lazarevdigital.netlify.app/", "_blank");
      }
      else if (title === "SUNSTUDIO") {
        window.open("https://sunstudioonweb.netlify.app/", "_blank");
      }
    }
  });

  elem.style.cursor = "pointer";
});


