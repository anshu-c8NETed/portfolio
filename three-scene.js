// ====== THREE.JS 3D SCENE WITH INTERACTIVE GLTF MODEL ======
class ThreeScene {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.model = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.modelRotation = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.init();
  }

  init() {
    console.log('Three.js: Initializing interactive scene with GLTF model...');
    
    // Check if THREE is available
    if (typeof THREE === 'undefined') {
      console.error('Three.js: THREE is not defined!');
      return;
    }
    
    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 5);

    // Renderer setup
    const canvas = document.getElementById('three-canvas');
    if (!canvas) {
      console.error('Three.js: Canvas element not found!');
      return;
    }
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setClearColor(0x0a0a0a, 0);

    // OrbitControls setup (disabled by default for cursor interaction)
    if (THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enabled = false; // Disable orbit controls for cursor interaction
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      console.log('Three.js: OrbitControls available (cursor mode active)');
    }

    // Add lights
    this.setupLights();

    // Create particle background
    this.createParticleSystem();

    // Load Model
    this.loadModel();

    // Event listeners
    this.addEventListeners();

    // Start animation
    this.animate();
    
    console.log('Three.js: Scene initialized successfully');
  }

  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Directional lights for dramatic effect
    const light1 = new THREE.DirectionalLight(0x6366f1, 1.5);
    light1.position.set(5, 5, 5);
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xec4899, 1.2);
    light2.position.set(-5, -5, 5);
    this.scene.add(light2);

    const light3 = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    light3.position.set(0, 5, -5);
    this.scene.add(light3);

    // Spotlight following the model
    const spotlight = new THREE.SpotLight(0xffffff, 1);
    spotlight.position.set(0, 10, 10);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.3;
    this.scene.add(spotlight);
  }

  loadModel() {
    // Check if GLTFLoader is available
    if (typeof THREE.GLTFLoader === 'undefined') {
      console.error('Three.js: GLTFLoader not available, creating fallback geometry');
      this.createFallbackModel();
      return;
    }

    const loader = new THREE.GLTFLoader();
    
    console.log('Three.js: Loading GLTF model...');
    
    loader.load(
      'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
      (gltf) => {
        this.model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim;
        
        this.model.scale.setScalar(scale);
        this.model.position.sub(center.multiplyScalar(scale));
        this.model.scale.setScalar(scale);
        this.model.position.sub(center.multiplyScalar(scale));
        
        // Position the model to the right side
        this.model.position.x = 12; // Move even further to right
        this.model.position.y = 1;
        this.model.position.z = -1;
        
        this.scene.add(this.model);
        console.log('Three.js: GLTF model loaded and positioned to the right');
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(2);
        console.log('Three.js: Loading model... ' + percent + '%');
      },
      (error) => {
        console.error('Three.js: Error loading GLTF model:', error);
        this.createFallbackModel();
      }
    );
  }

  createFallbackModel() {
    console.log('Three.js: Creating fallback geometry (torus knot)');
    
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x6366f1,
      emissiveIntensity: 0.2
    });
    
    this.model = new THREE.Mesh(geometry, material);
    this.model.position.set(6, 0.5, -2); // Position to the right
    this.scene.add(this.model);
    
    console.log('Three.js: Fallback model created and positioned');
  }

  createParticleSystem() {
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x6366f1);
    const color2 = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  addEventListeners() {
    window.addEventListener('mousemove', (e) => {
      // Normalized mouse coordinates
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Calculate target rotation based on mouse position
      // Reduced rotation for subtle effect
      this.targetRotation.y = this.targetMouse.x * Math.PI * 0.07; // Reduced from 0.3
      this.targetRotation.x = this.targetMouse.y * Math.PI * 0.04; // Reduced from 0.2
    });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth mouse tracking
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Smooth rotation interpolation (slower/smoother)
    this.modelRotation.x += (this.targetRotation.x - this.modelRotation.x) * 0.05; // Reduced from 0.1
    this.modelRotation.y += (this.targetRotation.y - this.modelRotation.y) * 0.05; // Reduced from 0.1

    // Apply rotation to model based on cursor position
    if (this.model) {
      // Base slow rotation
      this.model.rotation.y += 0.003; // Slightly increased base rotation
      
      // Add subtle cursor-based rotation
      this.model.rotation.x = this.modelRotation.x * 0.5; // Reduced influence
      this.model.rotation.y += this.modelRotation.y * 0.3; // Reduced influence
      
      // Subtle floating animation
      this.model.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      // Slight scale pulsing
      const scale = 1 + Math.sin(Date.now() * 0.0015) * 0.02;
      this.model.scale.setScalar(scale * 2.5 / 2); // Keep base scale
    }

    // Animate particle system
    if (this.particleSystem) {
      this.particleSystem.rotation.y += 0.0002;
      this.particleSystem.rotation.x = this.mouse.y * 0.15;
    }

    // Subtle camera movement
    this.camera.position.x = this.mouse.x * 0.15; // Reduced from 0.3
    this.camera.position.y = this.mouse.y * 0.15; // Reduced from 0.3
    this.camera.lookAt(6, 0.5, -2); // Look at model position

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize Three.js scene
function initThreeScene() {
  if (window.innerWidth > 768) {
    console.log('Three.js: Starting initialization...');
    
    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
      new ThreeScene();
    } else {
      console.error('Three.js: Library not loaded!');
    }
  } else {
    console.log('Three.js: Skipped (mobile device)');
  }
}

// Wait for loader to complete
if (typeof window !== 'undefined') {
  window.addEventListener('loaderComplete', () => {
    console.log('Three.js: Loader complete, initializing...');
    setTimeout(initThreeScene, 500);
  });
  
  // Fallback if loader event doesn't fire
  window.addEventListener('load', () => {
    setTimeout(() => {
      const canvas = document.getElementById('three-canvas');
      if (canvas && canvas.getContext) {
        console.log('Three.js: Fallback initialization...');
        initThreeScene();
      }
    }, 2000);
  });
}