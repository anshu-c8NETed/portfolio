// ====== UNIQUE 3D FLOATING SHAPES BACKGROUND ======
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class FloatingShape {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 60 + 40;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.type = Math.floor(Math.random() * 4); // 4 different shapes
    this.opacity = Math.random() * 0.3 + 0.1;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.pulsePhase += this.pulseSpeed;

    // Bounce off edges
    if (this.x > canvas.width + 50 || this.x < -50) this.speedX *= -1;
    if (this.y > canvas.height + 50 || this.y < -50) this.speedY *= -1;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
    const size = this.size * pulse;
    
    // Create gradient for each shape
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    gradient.addColorStop(0, `rgba(99, 102, 241, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(139, 92, 246, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(236, 72, 153, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.strokeStyle = `rgba(99, 102, 241, ${this.opacity * 0.5})`;
    ctx.lineWidth = 2;

    ctx.beginPath();
    
    switch(this.type) {
      case 0: // Triangle
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.closePath();
        break;
      case 1: // Square
        ctx.rect(-size / 2, -size / 2, size, size);
        break;
      case 2: // Hexagon
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = Math.cos(angle) * size / 2;
          const y = Math.sin(angle) * size / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
      case 3: // Star
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
          const x = Math.cos(angle) * size / 2;
          const y = Math.sin(angle) * size / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          
          const innerAngle = angle + Math.PI / 5;
          const innerX = Math.cos(innerAngle) * size / 4;
          const innerY = Math.sin(innerAngle) * size / 4;
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        break;
    }
    
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

const shapes = [];
const shapeCount = window.innerWidth < 768 ? 5 : 10;
for (let i = 0; i < shapeCount; i++) {
  shapes.push(new FloatingShape());
}

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    
    if (i % 2 === 0) {
      for (let j = i + 1; j < shapes.length; j++) {
        const dx = shapes[i].x - shapes[j].x;
        const dy = shapes[i].y - shapes[j].y;
        const distanceSquared = dx * dx + dy * dy;
        
        if (distanceSquared < 40000) {
          const distance = Math.sqrt(distanceSquared);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 200)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(shapes[i].x, shapes[i].y);
          ctx.lineTo(shapes[j].x, shapes[j].y);
          ctx.stroke();
        }
      }
    }
    
    const dxMouse = shapes[i].x - mouseX;
    const dyMouse = shapes[i].y - mouseY;
    const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    
    if (distanceToMouse < 150) {
      const force = (150 - distanceToMouse) / 150;
      shapes[i].x += (dxMouse / distanceToMouse) * force * 2;
      shapes[i].y += (dyMouse / distanceToMouse) * force * 2;
    }
    
    shapes[i].draw();
  }
  
  requestAnimationFrame(animateShapes);
}

animateShapes();

let resizeTimeout;
window.addEventListener('resize', () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  
  resizeTimeout = setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const newShapeCount = window.innerWidth < 768 ? 5 : 10;
    if (shapes.length !== newShapeCount) {
      shapes.length = 0;
      for (let i = 0; i < newShapeCount; i++) {
        shapes.push(new FloatingShape());
      }
    }
  }, 200);
});

// ====== LOCOMOTIVE SCROLL SETUP ======
let scroll;

document.addEventListener('DOMContentLoaded', function() {
  scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    smoothMobile: false,
    resetNativeScroll: true,
    lerp: 0.1,
    multiplier: 1,
    smartphone: {
      smooth: false
    },
    tablet: {
      smooth: false
    }
  });

  window.addEventListener('resize', () => {
    scroll.update();
  });

  window.addEventListener('loaderComplete', () => {
    setTimeout(() => {
      firstPageAnim();
    }, 100);
  });
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
  }, "-=0.5")
  .set("#herofooter", {
    clearProps: "all"
  });
  
  setTimeout(() => {
    if (scroll) {
      scroll.update();
    }
  }, 100);
}

// ====== ENHANCED MAGNETIC CURSOR WITH RIPPLES ======
const cursorFollower = document.querySelector("#cursor-follower");
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  
  if (Math.random() > 0.95) {
    createRipple(e.clientX, e.clientY);
  }
});

function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'cursor-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 1000);
}

function animateFollower() {
  followerX += (cursorX - followerX) * 0.15;
  followerY += (cursorY - followerY) * 0.15;
  
  if (cursorFollower) {
    cursorFollower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
  }
  
  requestAnimationFrame(animateFollower);
}

animateFollower();

document.querySelectorAll('a, .elem, .skill-card, .menu-btn').forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    if (cursorFollower) {
      gsap.to(cursorFollower, {
        scale: 2,
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });
  
  elem.addEventListener('mouseleave', () => {
    if (cursorFollower) {
      gsap.to(cursorFollower, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });
});

// ====== MENU FUNCTIONALITY ======
const menuBtn = document.querySelector('.menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const menuOverlay = document.querySelector('.menu-overlay');

function openMenu() {
  menuBtn.classList.add('active');
  dropdownMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (scroll) scroll.stop();
}

function closeMenu() {
  menuBtn.classList.remove('active');
  dropdownMenu.classList.remove('active');
  document.body.style.overflow = '';
  if (scroll) scroll.start();
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

// ====== PROJECT HOVER EFFECTS ======
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

// ====== SKILL CARDS ANIMATION ======
if (typeof IntersectionObserver !== 'undefined') {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)"
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

// ====== SMOOTH SCROLL ANCHORS ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// ====== DYNAMIC TIME UPDATE ======
function updateTime() {
  const now = new Date();
  
  // Format: 12:05 AM IST
  const timeString = now.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }) + ' IST';

  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    // Force DOM update
    timeElement.innerHTML = timeString;
  }
}

// Initialize immediately
document.addEventListener('DOMContentLoaded', updateTime);

// Update every minute for better performance
setInterval(updateTime, 60000);

// Update when page becomes visible
if (typeof document.hidden !== "undefined") {
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      updateTime();
    }
  });
}


// ====== GRADIENT TEXT ANIMATION ======
gsap.to('.gradient-text', {
  backgroundPosition: '200% center',
  duration: 3,
  ease: 'none',
  repeat: -1,
  yoyo: true
});

// ====== PROJECT CARDS SCROLL ANIMATION ======
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

// ====== ABOUT SECTION ANIMATION ======
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
      
      // Full-Stack Projects
      if (title === "CHESSELITE") {
        window.open("https://chess-fe9w.onrender.com/", "_blank");
      } else if (title === "PINSPIE") {
        window.open("https://your-pinspire-url.com/", "_blank");
      } else if (title === "CODEXSPACE") {
        window.open("https://codex-space-frontend.vercel.app/", "_blank");
      } 
      // Agency Projects
      else if (title === "ZENTRY") {
        window.open("https://animated-website-gilt-seven.vercel.app/", "_blank");
      }
      else if (title === "GAMEBIT") {
        window.open("https://gamebitdev.netlify.app/", "_blank");
      } 
      else if (title === "HYPERSPACE RUSH") {
        window.open("https://hyperspacerush.netlify.app/", "_blank");
      }
      else if (title === "SSS API LEARNING") {
        window.open("https://madeforsss.netlify.app/", "_blank");
      }
    }
  });

  elem.style.cursor = "pointer";
});

// ====== WEB3FORMS CONTACT FORM ======
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        showNotification('Thank you! I will get back to you soon.', 'success');
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      
      submitBtn.innerHTML = '<span>Failed to Send ✗</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      
      showNotification('Oops! Something went wrong. Please try again.', 'error');
      
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 4000);
    }
  });
}

function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 20px;">
        ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
      </span>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    padding: 18px 26px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                  type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                  'linear-gradient(135deg, #6366f1, #8b5cf6)'};
    color: white;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    z-index: 100001;
    animation: slideIn 0.4s ease;
    max-width: 400px;
    cursor: pointer;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 5000);
  
  notification.addEventListener('click', () => notification.remove());
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(450px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(450px); opacity: 0; }
  }
`;
document.head.appendChild(style);











