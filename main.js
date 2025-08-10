
        function init() {
            // Remove loading message
            const loading = document.getElementById('loading');
            const dis = document.getElementById('disrend');
            loading.style.display = 'none';

            // Create scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x111111);

            // Create camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(5, 5, 5);

            // Create renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, 500);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            dis.appendChild(renderer.domElement);

            // Add orbit controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.autoRotate = false;
            controls.autoRotateSpeed = 1.0;

            // Auto rotate toggle
            const autoRotateBtn = document.getElementById('autoRotateBtn');
            autoRotateBtn.addEventListener('click', () => {
                controls.autoRotate = !controls.autoRotate;
                autoRotateBtn.textContent = `Auto Rotate: ${controls.autoRotate ? 'ON' : 'OFF'}`;
                autoRotateBtn.classList.toggle('bg-gray-700', !controls.autoRotate);
                autoRotateBtn.classList.toggle('bg-blue-600', controls.autoRotate);
            });

            // Add lights
            const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 10, 7);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            scene.add(directionalLight);

            // Add room
            createRoom(scene);

            // Add desk and chair
            createDesk(scene);
            createChair(scene);

            // Add computer setup
            createComputerSetup(scene);

            // Add accessories
            createAccessories(scene);

            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, 4);
            });

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
        }

        function createRoom(scene) {
            // Floor
            const floorGeometry = new THREE.PlaneGeometry(20, 20);
            const floorMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.8,
                metalness: 0.2
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            scene.add(floor);

            // Walls
            const wallGeometry = new THREE.PlaneGeometry(20, 10);
            const wallMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x555555,
                roughness: 0.7
            });

            // Back wall
            const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
            backWall.position.y = 5;
            backWall.position.z = -10;
            backWall.receiveShadow = true;
            scene.add(backWall);

            // Right wall
            const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
            rightWall.position.y = 5;
            rightWall.position.x = 10;
            rightWall.rotation.y = Math.PI / 2;
            rightWall.receiveShadow = true;
            scene.add(rightWall);

            // Left wall
            const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
            leftWall.position.y = 5;
            leftWall.position.x = -10;
            leftWall.rotation.y = Math.PI / 2;
            leftWall.receiveShadow = true;
            scene.add(leftWall);

            // Ceiling
            const ceiling = new THREE.Mesh(floorGeometry, wallMaterial);
            ceiling.position.y = 10;
            ceiling.rotation.x = Math.PI / 2;
            ceiling.receiveShadow = true;
            scene.add(ceiling);
        }

        function createDesk(scene) {
            // Desk top
            const deskTopGeometry = new THREE.BoxGeometry(6, 0.2, 3);
            const deskTopMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x654321,
                roughness: 0.4,
                metalness: 0.1
            });
            const deskTop = new THREE.Mesh(deskTopGeometry, deskTopMaterial);
            deskTop.position.set(0, 2.2, 0);
            deskTop.castShadow = true;
            deskTop.receiveShadow = true;
            scene.add(deskTop);

            // Desk legs
            const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
            const legMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.7,
                metalness: 0.5
            });

            // Front left leg
            const leg1 = new THREE.Mesh(legGeometry, legMaterial);
            leg1.position.set(-2.9, 1.1, 1.4);
            leg1.castShadow = true;
            leg1.receiveShadow = true;
            scene.add(leg1);

            // Front right leg
            const leg2 = new THREE.Mesh(legGeometry, legMaterial);
            leg2.position.set(2.9, 1.1, 1.4);
            leg2.castShadow = true;
            leg2.receiveShadow = true;
            scene.add(leg2);

            // Back left leg
            const leg3 = new THREE.Mesh(legGeometry, legMaterial);
            leg3.position.set(-2.9, 1.1, -1.4);
            leg3.castShadow = true;
            leg3.receiveShadow = true;
            scene.add(leg3);

            // Back right leg
            const leg4 = new THREE.Mesh(legGeometry, legMaterial);
            leg4.position.set(2.9, 1.1, -1.4);
            leg4.castShadow = true;
            leg4.receiveShadow = true;
            scene.add(leg4);
        }

        function createChair(scene) {
            // Chair seat
            const seatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
            const seatMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                roughness: 0.6
            });
            const seat = new THREE.Mesh(seatGeometry, seatMaterial);
            seat.position.set(0, 1, 3);
            seat.castShadow = true;
            seat.receiveShadow = true;
            scene.add(seat);

            // Chair back
            const backGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);
            const backMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                roughness: 0.6
            });
            const back = new THREE.Mesh(backGeometry, backMaterial);
            back.position.set(0, 1.6, 3.6);
            back.castShadow = true;
            back.receiveShadow = true;
            scene.add(back);

            // Chair legs
            const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
            const legMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x444444,
                roughness: 0.5,
                metalness: 0.7
            });

            // Front left leg
            const leg1 = new THREE.Mesh(legGeometry, legMaterial);
            leg1.position.set(-0.6, 0.5, 3.6);
            leg1.rotation.x = Math.PI / 1;
            leg1.castShadow = true;
            leg1.receiveShadow = true;
            scene.add(leg1);

            // Front right leg
            const leg2 = new THREE.Mesh(legGeometry, legMaterial);
            leg2.position.set(0.6, 0.5, 3.6);
            leg2.rotation.x = Math.PI / 1;
            leg2.castShadow = true;
            leg2.receiveShadow = true;
            scene.add(leg2);

            // Back left leg
            const leg3 = new THREE.Mesh(legGeometry, legMaterial);
            leg3.position.set(-0.6, 0.5, 2.4);
            leg3.rotation.x = Math.PI / 1;
            leg3.castShadow = true;
            leg3.receiveShadow = true;
            scene.add(leg3);

            // Back right leg
            const leg4 = new THREE.Mesh(legGeometry, legMaterial);
            leg4.position.set(0.6, 0.5, 2.4);
            leg4.rotation.x = Math.PI / 1;
            leg4.castShadow = true;
            leg4.receiveShadow = true;
            scene.add(leg4);

            // Wheels
            const wheelGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const wheelMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                roughness: 0.3,
                metalness: 0.8
            });

            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
                wheel.position.set(
                    Math.cos(angle) * 0.5,
                    0.1,
                    Math.sin(angle) * 0.5 + 1.8
                );
                wheel.castShadow = true;
                wheel.receiveShadow = true;
                scene.add(wheel);
            }
        }

        function createComputerSetup(scene) {
            // Monitor
            const monitorGeometry = new THREE.BoxGeometry(2, 1.5, 0.1);
            const monitorMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                roughness: 0.3,
                metalness: 0.5
            });
            const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
            monitor.position.set(0, 3.5, -0.5);
            monitor.castShadow = true;
            monitor.receiveShadow = true;
            scene.add(monitor);

            // Monitor screen
            const screenGeometry = new THREE.PlaneGeometry(1.8, 1.3);
            const screenMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x000000,
                emissive: 0x00aaff,
                emissiveIntensity: 0.3,
                roughness: 0.1
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.position.set(0, 3.5, -0.42);
            screen.rotation.z = Math.PI;
            screen.receiveShadow = true;
            scene.add(screen);

            // Add some code to the screen
            const codeTexture = createCodeTexture();
            const codeMaterial = new THREE.MeshStandardMaterial({ 
                map: codeTexture,
                emissive: 0x00aaff,
                emissiveIntensity: 0.2,
                roughness: 0.1,
                transparent: true
            });
            const codeScreen = new THREE.Mesh(screenGeometry, codeMaterial);
            codeScreen.position.set(0, 3.51, -0.41);
            codeScreen.rotation.z = Math.PI;
            scene.add(codeScreen);

            // Monitor stand
            const standGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.5, 8);
            const standMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.4,
                metalness: 0.6
            });
            const stand = new THREE.Mesh(standGeometry, standMaterial);
            stand.position.set(0, 2.5, -0.5);
            stand.castShadow = true;
            stand.receiveShadow = true;
            scene.add(stand);

            // Keyboard
            const keyboardGeometry = new THREE.BoxGeometry(1.8, 0.1, 0.6);
            const keyboardMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x111111,
                roughness: 0.5
            });
            const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
            keyboard.position.set(0, 2.4, 0.5);
            keyboard.castShadow = true;
            keyboard.receiveShadow = true;
            scene.add(keyboard);

            // Mouse
            const mouseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
            const mouseMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                roughness: 0.4
            });
            const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
            mouse.position.set(1.3, 2.4, 0.8);
            mouse.rotation.z = -Math.PI ;
            mouse.castShadow = true;
            mouse.receiveShadow = true;
            scene.add(mouse);

            // Laptop (closed)
            const laptopBaseGeometry = new THREE.BoxGeometry(1.5, 0.1, 1);
            const laptopBaseMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.3,
                metalness: 0.7
            });
            const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopBaseMaterial);
            laptopBase.position.set(-2, 2.4, -0.6);
            laptopBase.castShadow = true;
            laptopBase.receiveShadow = true;
            scene.add(laptopBase);
        }

        function createAccessories(scene) {
            // Coffee mug
            const mugGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
            const mugMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xffffff,
                roughness: 0.2
            });
            const mug = new THREE.Mesh(mugGeometry, mugMaterial);
            mug.position.set(1.9, 2.4, 0.8);
            mug.castShadow = true;
            mug.receiveShadow = true;
            scene.add(mug);

            // Coffee liquid
            const coffeeGeometry = new THREE.CylinderGeometry(0.28, 0.28, 0.4, 32);
            const coffeeMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x6F4E37,
                roughness: 0.7,
                metalness: 0.1
            });
            const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
            coffee.position.set(1.9, 2.6, 0.8);
            scene.add(coffee);

            // Notebook
            const notebookGeometry = new THREE.BoxGeometry(0.8, 0.05, 1);
            const notebookMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xf5f5dc,
                roughness: 0.8
            });
            const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
            notebook.position.set(2, 2.3, -0.8);
            notebook.rotation.z = Math.PI;
            notebook.castShadow = true;
            notebook.receiveShadow = true;
            scene.add(notebook);

            // Pen
            const penGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 16);
            const penMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x0000ff,
                roughness: 0.3
            });
            const pen = new THREE.Mesh(penGeometry, penMaterial);
            pen.position.set(1.7, 2.35, -0.6);
            pen.rotation.x = Math.PI / 2;
            pen.rotation.z = Math.PI / 8;
            pen.castShadow = true;
            pen.receiveShadow = true;
            scene.add(pen);

            // Headphones
            const headphoneGeometry = new THREE.TorusGeometry(0.4, 0.05, 16, 100);
            const headphoneMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                roughness: 0.4
            });
            const headphones = new THREE.Mesh(headphoneGeometry, headphoneMaterial);
            headphones.position.set(-1.5, 2.79, 0.8);
            headphones.rotation.y = Math.PI / 2;
            headphones.castShadow = true;
            headphones.receiveShadow = true;
            scene.add(headphones);

            // Phone
            const phoneGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.4);
            const phoneMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x111111,
                roughness: 0.2,
                metalness: 0.8
            });
            const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
            phone.position.set(-1.5, 2.3, 0.8);
            phone.castShadow = true;
            phone.receiveShadow = true;
            scene.add(phone);
        }

        function createCodeTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const context = canvas.getContext('2d');

            // Background
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Code text
            context.font = '12px monospace';
            context.fillStyle = 'white';
            
            const codeLines = [
                "function init() {",
                "  const scene = new THREE.Scene();",
                "  const camera = new THREE.PerspectiveCamera();",
                "  const renderer = new THREE.WebGLRenderer();",
                "",
                "  // Add objects",
                "  createRoom(scene);",
                "  createDesk(scene);",
                "  createComputer(scene);",
                "",
                "  // Animation loop",
                "  function animate() {",
                "    requestAnimationFrame(animate);",
                "    renderer.render(scene, camera);",
                "  }",
                "  animate();",
                "}"
            ];

            for (let i = 0; i < codeLines.length; i++) {
                context.fillText(codeLines[i], 20, 30 + i * 20);
            }

            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        }












function downl(){
        const downloadLink = document.createElement('a');
downloadLink.href = 'quadriResume.pdf';
downloadLink.download = "quadriResume";
downloadLink.click();
        }
        
                // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            formMessage.classList.remove('hidden', 'bg-red-500', 'bg-green-500');
            formMessage.textContent = 'Sending message...';
            
            // Simulate form submission (in a real scenario, you would use AJAX to send to server)
            setTimeout(() => {
                formMessage.textContent = 'Message was not sent, please contact us on our e-mail/Other platform till we fix the issue';
                formMessage.classList.add('bg-red-500');
                
                // Reset form
                document.getElementById('contactForm').reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
        
        // Animate the glowing border on the popular course card
        const popularCard = document.querySelector('.glow');
        setInterval(() => {
            popularCard.classList.toggle('border-blue-500');
            popularCard.classList.toggle('border-purple-500');
        }, 2000);
        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateOnScroll = () => {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (barPosition < screenPosition) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        
        // Trigger animation on page load if skills are already visible
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial width to 0
            skillBars.forEach(bar => {
                bar.style.width = '0';
            });
            
            // Check if skills section is visible
            animateOnScroll();
        });

     // Scroll animation
        const fadeElements = document.querySelectorAll('.fade-in, .fade-right, .fade-left');
        
        const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                    element.classList.add('visible1');
                    element.classList.add("visible2")
                }
            });
        };
        
        // Check on initial load
        fadeInOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', fadeInOnScroll);
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        mobileMenu.classList.remove('open');
                    }
                }
            });
        });
        
        // Update active nav link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active-nav');
                }
            });
        });
        
        // Hero canvas animation
        function initHeroCanvas() {
            const canvas = document.getElementById('hero-canvas');
            if (!canvas) return;
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Create particles
            const particleCount = 1000;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 2000;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
                
                colors[i * 3] = Math.random() * 0.5 + 0.5; // R
                colors[i * 3 + 1] = Math.random() * 0.3 + 0.7; // G
                colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
            }
            
            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            const particleSystem = new THREE.Points(particles, particleMaterial);
            scene.add(particleSystem);
            
            camera.position.z = 500;
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                particleSystem.rotation.x += 0.0005;
                particleSystem.rotation.y += 0.001;
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            
            window.addEventListener('resize', onWindowResize);
            
            // Start animation
            animate();
        }
        
        // Initialize hero canvas
        initHeroCanvas();
   init();