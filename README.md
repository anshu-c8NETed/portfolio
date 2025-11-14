# 🚀 Anshu Raj - Creative Developer Portfolio

A modern, immersive portfolio website showcasing full-stack development projects with stunning 3D graphics, smooth animations, and premium design. Built with cutting-edge web technologies to deliver an unforgettable user experience.

---

## 📌 What's This Project About?

This is my **personal portfolio website** that goes beyond traditional portfolio sites. It's a fully interactive experience featuring a 3D GLTF model, particle systems, smooth scroll effects, and professional animations - all built with vanilla JavaScript and modern web APIs.

---

## ✨ Features & Showcase

### 🎨 Immersive Visual Experience
- **Interactive 3D Model** - Three.js powered GLTF model (Damaged Helmet) that responds to cursor/touch movements in real-time
- **Smooth Scrolling** - Locomotive Scroll implementation with lerp value of 0.1 for buttery-smooth navigation
- **GSAP Animations** - Professional timeline-based animations for page load, element reveals, and interactions
- **Dynamic Particle System** - Canvas-based floating geometric shapes (triangles, squares, hexagons, stars) with connection lines between nearby particles
- **Custom Cursor System** - Enhanced cursor with hover state detection and ripple click effects
- **Animated Gradients** - Color-shifting text using background-clip and animated background-position
- **Loading Screen** - Custom animated loader with progress bar tracking asset loading

### 📱 Responsive & Performance Optimized
- **Fully Responsive** - Adapts seamlessly from mobile (320px) to 4K displays
- **Touch-Optimized 3D** - Pinch-to-zoom and swipe rotation for mobile 3D interactions
- **Adaptive Rendering** - Particle count (5 on mobile, 10 on desktop) and pixel ratio adjustment based on device
- **Performance First** - Lazy loading images, preloading critical assets, debounced events
- **Mobile Camera** - Separate camera positioning for mobile (6 units) vs desktop (5 units) for optimal viewing

### 🎯 Portfolio Sections

#### Hero Section
- Large animated headline with gradient text effect
- Three call-to-action buttons (View Work, Collaborate, Download Resume)
- Staggered entrance animations with bounce-out easing
- Background floating shapes with blur effect

#### Agency-Like Projects
Showcasing modern web design capabilities:
- **UNIVERSE** - Modern design agency clone (React, GSAP, Locomotive)
- **ZENTRY** - Immersive gaming experience platform (React, GSAP, Tailwind)
- **GAMEBIT** - Next-gen game design agency (GSAP, Locomotive, Three.js, CSS3)
- **API LEARNING** - Creative API learning platform (GSAP, API, Canvas, CSS3)

#### Full-Stack Applications
Real working applications with backend:
- **ChessElite** - Real-time multiplayer chess (Socket.io, Chess.js, Express, Node.js)
- **Pinspire** - Pinterest-inspired platform (React, Node.js, MongoDB, Express)

#### Skills Arsenal
Four category cards with hover effects:
- Frontend & Backend (HTML5, CSS3, VanillaJS, Tailwind, React, Next.js, TypeScript, Node.js, Express, MongoDB, REST APIs)
- Tools & Animation (Git-Github, Postman, GSAP, Canvas, Three.js, Framer Motion, Blender, React3Fiber, Locomotive Scroll)
- Core Skills (DSA in C++, OOPS, JavaScript, Problem Solving, Algorithm Design)
- AI & Emerging Tech (AI API Integration, LangChain, Vector Databases, RAG Systems)

#### About Section
- Professional bio with coding philosophy
- Statistics showcase (500+ DSA problems, 15+ projects)
- Profile image with rotating gradient border animation
- Journey from DSA to full-stack to AI integration

#### Contact Section
- **Web3Forms Integration** - Serverless form handling
- Real-time validation with error messages
- Animated success/error notifications
- Direct contact information (email, LinkedIn, GitHub, LeetCode)

---

## 🛠️ Technologies & Implementation

### Core Technologies
- **HTML5** - Semantic markup with proper meta tags and Open Graph
- **CSS3** - Custom properties, gradients, backdrop-filter, grid layouts
- **Vanilla JavaScript (ES6+)** - Class-based architecture, async/await, ES modules

### 3D Graphics & Animation
- **Three.js (r128)** - Complete 3D scene setup and rendering
- **GLTFLoader** - Loading 3D models from external sources
- **OrbitControls** - Camera control system (disabled for custom interaction)
- **GSAP 3.11.5** - Timeline animations, easing functions, element transforms
- **Locomotive Scroll 3.5.4** - Smooth scroll with momentum and lerp

### APIs & Services
- **Web3Forms API** - Contact form submission handling
- **Canvas API** - Particle system rendering with connection lines

### Development Tools
- **Service Worker** - PWA capabilities for offline access
- **Web App Manifest** - Installable app configuration

---

## 🎓 What I Learned Building This

### Three.js & 3D Graphics
- **Scene Setup** - Creating scene, camera (PerspectiveCamera), and WebGLRenderer
- **GLTF Model Loading** - Loading external 3D models with progress tracking
- **Lighting System** - Ambient, Directional, and Spotlight setup for dramatic effects
- **Camera Controls** - Building custom mouse/touch-based camera movement
- **Particle Systems** - Creating BufferGeometry with custom attributes
- **Performance Optimization** - Reducing vertex count, adjusting pixel ratio, conditional rendering
- **Fallback Handling** - Creating procedural geometry (TorusKnot) when model fails to load

### Advanced Animation Techniques
- **GSAP Timelines** - Sequencing multiple animations with delays and staggers
- **Easing Functions** - Using power3.out, back.out(1.7) for natural motion
- **Transform Properties** - Animating translateY, scale, rotation for element reveals
- **Scroll-Triggered Animations** - IntersectionObserver for scroll-based reveals
- **Stagger Animations** - Animating lists with incremental delays (0.1s, 0.15s, etc.)

### Canvas Particle System
- **FloatingShape Class** - OOP approach to particle management
- **Particle Physics** - Velocity, collision detection, boundary wrapping
- **Shape Rendering** - Drawing triangles, squares, hexagons, stars with Path2D
- **Connection Lines** - Drawing lines between particles within 200px radius
- **Mouse Interaction** - Particles repelled by cursor within 150px
- **Performance** - RequestAnimationFrame loop optimization

### Smooth Scroll Implementation
- **Locomotive Scroll** - Configuration with smooth: true, lerp: 0.1
- **ScrollTo Method** - Programmatic scrolling to sections
- **Update Method** - Recalculating scroll on window resize
- **Data Attributes** - Using data-scroll-section for section detection
- **Mobile Handling** - Disabling smooth scroll on mobile for performance

### Form Handling & Validation
- **Web3Forms API** - Serverless form submission
- **Async/Await** - Handling promises with try-catch blocks
- **Form Validation** - Email regex, required fields, field length
- **User Feedback** - Success/error notifications with 5s auto-dismiss
- **Loading States** - Button text change during submission

### Responsive Design Patterns
- **Mobile-First CSS** - Base styles for mobile, media queries for larger screens
- **Breakpoints** - 480px, 600px, 768px, 1024px, 1400px
- **Flexible Layouts** - CSS Grid with auto-fit and minmax()
- **Clamp Function** - Fluid typography with clamp(60px, 10vw, 140px)
- **Touch Events** - Separate event listeners for touch vs mouse
- **Viewport Units** - Using vw/vh for full-screen sections

### Performance Optimization
- **Lazy Loading** - Images load only when entering viewport
- **Preloading** - Critical fonts and scripts marked with rel="preload"
- **Debouncing** - Scroll and resize events throttled to reduce calls
- **Conditional Rendering** - Different rendering for mobile vs desktop
- **Asset Optimization** - Compressed images, minimized JavaScript
- **Request Animation Frame** - Using RAF for smooth 60fps animations

---

## 📦 Project Architecture

```
portfolio/
├── index.html                 # Main HTML (semantic, SEO-optimized)
├── style.css                  # Main styles (~1500 lines)
├── loader.css                 # Loading screen styles
├── loader.js                  # Loader animation logic
├── script.js                  # Main JavaScript (~600 lines)
├── three-scene.js             # Three.js 3D scene (~400 lines)
├── custom-cursor.js           # Custom cursor implementation
├── image-optimizer.js         # Image optimization utilities
├── sw.js                      # Service worker (PWA)
├── manifest.json              # Web app manifest
├── favicon.png                # Site icon
└── assets/
    ├── images/                # Project screenshots
    │   ├── lazarev.png       # UNIVERSE project
    │   ├── zentry.png        # ZENTRY project
    │   ├── gamebit.png       # GAMEBIT project
    │   ├── sunstudio.png     # SUNSTUDIO project
    │   ├── chesselite.png    # ChessElite project
    │   ├── nfl.png           # Pinspire project
    │   ├── cafe.png          # ShansCafe project
    │   └── anshu.png         # Profile photo
    └── models/                # 3D models (if self-hosted)
```

---

## 🚀 Key Technical Implementations

### Three.js Scene Setup
```javascript
// Scene initialization with optimized settings
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
renderer = new THREE.WebGLRenderer({ 
  alpha: true, 
  antialias: !isMobile 
});
renderer.setPixelRatio(isMobile ? 1 : Math.min(devicePixelRatio, 2));
```

### GSAP Animation Timeline
```javascript
tl.from("#nav", { y: -30, opacity: 0, duration: 1.2 })
  .to(".boundingelem", { y: 0, stagger: 0.15 })
  .from("#herofooter", { y: 30, opacity: 0 }, "-=0.5");
```

### Locomotive Scroll Configuration
```javascript
scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
  lerp: 0.1,
  smartphone: { smooth: false }
});
```

### Particle System with Connection Lines
```javascript
// Draw lines between nearby particles
if (distance < 200) {
  ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 200)})`;
  ctx.beginPath();
  ctx.moveTo(shapes[i].x, shapes[i].y);
  ctx.lineTo(shapes[j].x, shapes[j].y);
  ctx.stroke();
}
```

---

## 🎨 Design System

### Color Palette
```css
--primary: #6366f1;      /* Indigo */
--secondary: #8b5cf6;    /* Purple */
--accent: #ec4899;       /* Pink */
--bg-dark: #0a0a0a;      /* Near black */
--text-light: #e5e7eb;   /* Light gray */
```

### Animation Easing
- **Entrances**: `power3.out`, `back.out(1.7)`
- **Exits**: `power3.in`
- **Hovers**: `power2.out`
- **Scroll**: `ease-out` with 0.1s lerp

### Typography
- **Headings**: Space Grotesk (700-800 weight)
- **Body**: Poppins (300-600 weight)
- **Accents**: Montserrat (700-900 weight)

---

## 🔧 Special Features Explained

### Mouse/Touch-Based 3D Rotation
The 3D model rotation responds to cursor/touch position with smooth interpolation:
- Normalized coordinates calculated from mouse/touch position
- Target rotation set based on position (-0.15 to 0.15 radians)
- Smooth interpolation with 0.05 lerp for natural feel
- Separate handling for mobile touch events including pinch-to-zoom

### Dropdown Navigation Menu
Full-screen overlay menu with:
- Slide-in animation from right side
- Staggered link animations (0.05s increments)
- Glassmorphism background effect
- Close on link click or ESC key
- Smooth scroll to section after closing

### Project Hover Image Preview
Interactive project cards that show preview image on hover:
- Image follows cursor position
- Rotation based on mouse movement direction
- Fade in/out with GSAP
- Clamped rotation (-15° to 15°)

### Web3Forms Integration
Serverless contact form:
- No backend required
- Custom subject lines
- Spam protection with hidden botcheck field
- Async submission with fetch API
- Success/error state handling

### Real-Time Clock (IST)
Dynamic time display:
- Updates every 60 seconds
- Formatted in 12-hour format with AM/PM
- Asia/Kolkata timezone
- Updates when page becomes visible again

---

## 🎯 Performance Metrics

- **Initial Load**: < 2s on 4G
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **3D Model Size**: ~3.5MB (Damaged Helmet GLTF)
- **Particle Count**: 5 (mobile) / 10 (desktop)
- **Animation Frame Rate**: Locked at 60fps

---

## 🌐 Browser Compatibility

✅ Chrome 90+ (Full support)  
✅ Firefox 88+ (Full support)  
✅ Safari 14+ (Full support)  
✅ Edge 90+ (Full support)  
✅ Mobile Safari iOS 14+ (Touch-optimized)  
✅ Chrome Mobile (Touch-optimized)  

---

## 📱 Mobile Optimizations

- **Reduced Particle Count** - 5 particles vs 10 on desktop
- **Lower Pixel Ratio** - 1.0 vs up to 2.0 on desktop
- **Disabled Antialiasing** - Performance boost on mobile GPUs
- **Touch Event Handlers** - Separate touch vs mouse logic
- **Pinch to Zoom** - Gesture support for 3D model
- **Disabled Smooth Scroll** - Native scroll on mobile for better performance
- **Smaller Model Scale** - 2.5 units vs 4.5 on desktop
- **Centered Model Position** - Better fit for portrait screens

---

## 🐛 Fallback & Error Handling

- **GLTF Load Failure** - Fallback to procedural TorusKnot geometry
- **Three.js Not Loaded** - Console error with user-friendly message
- **Form Submission Error** - Toast notification with retry option
- **Image Load Failure** - Native browser broken image handling
- **Service Worker Failure** - Graceful degradation to online-only mode

---

## 🔮 Future Enhancements

- [ ] Blog section with MDX content
- [ ] Dark/Light theme toggle
- [ ] More 3D models for different projects
- [ ] Case studies with detailed project breakdowns
- [ ] Testimonials section
- [ ] Achievement badges/certifications
- [ ] Analytics integration
- [ ] A/B testing for CTA optimization

---

## 📊 Project Stats

- **Total Lines of Code**: ~3000+
- **Components**: 7 main sections
- **Projects Showcased**: 7
- **Technologies Used**: 15+
- **Animations**: 20+
- **3D Elements**: 1 GLTF model + particle system
- **Contact Methods**: 4 (Email, LinkedIn, GitHub, LeetCode)

---

## 🎓 Key Takeaways

This project taught me:
1. **3D Graphics** - How to integrate Three.js in production websites
2. **Performance** - Optimizing for mobile without sacrificing design
3. **Animations** - Creating professional animations with GSAP
4. **Architecture** - Structuring large JavaScript applications
5. **User Experience** - Balancing visual flair with usability

---

## 📄 License

MIT License - Free to use for learning and personal projects.

---

## 👤 Connect With Me

**Anshu Raj** - Full-Stack Developer & Creative Coder

- 🌐 Portfolio: [https://anshu-rajportfolio.netlify.app]
- 📧 Email: rajanshu2123@gmail.com
- 💼 LinkedIn: [linkedin.com/in/anshu-raj-tech](https://www.linkedin.com/in/anshu-raj-tech/)
- 💻 GitHub: [@anshu-c8NETed](https://github.com/anshu-c8NETed)
- 🎯 LeetCode: [anshxu](https://leetcode.com/u/anshxu/)

---

⭐ **If you found this helpful, consider giving it a star!**

Made with ❤️, ☕, and countless hours of debugging by Anshu Raj
