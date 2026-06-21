// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Creación de la galaxia de partículas
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000; // Más partículas para mayor densidad
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i+=3) {
    // Patrón de espiral
    const radius = Math.random() * 8; // Galaxia más grande
    const theta = Math.random() * 2 * Math.PI;
    const y = (Math.random() - 0.5) * 1.0; // Mayor grosor y
    
    posArray[i] = radius * Math.cos(theta) + (Math.random() - 0.5) * 0.5; // x
    posArray[i+1] = y; // y
    posArray[i+2] = radius * Math.sin(theta) + (Math.random() - 0.5) * 0.5; // z

    // Colores: Tonos rosados, fucsias y morados
    colorsArray[i] = 1.0; // r (rojo al máximo)
    colorsArray[i+1] = 0.2 + Math.random() * 0.4; // g
    colorsArray[i+2] = 0.6 + Math.random() * 0.4; // b
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.03, // Partículas más grandes
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 7; // Alejar cámara para verla entera
camera.position.y = 3;
camera.lookAt(0, 0, 0);

// Animación constante
function animate() {
    requestAnimationFrame(animate);
    // Rotación suave de la galaxia
    particlesMesh.rotation.y -= 0.001; // Más lenta para que sea más hipnótica
    particlesMesh.rotation.x += 0.0002;
    renderer.render(scene, camera);
}
animate();

// Lógica del nuevo botón
const btnViewWorld = document.getElementById('btn-view-world');
const uiLayer = document.querySelector('.ui-layer');

btnViewWorld.addEventListener('click', () => {
    // Al pulsar el botón, ocultamos el texto y mostramos la galaxia en pantalla completa
    uiLayer.style.opacity = '0'; // Se desvanece suavemente
    setTimeout(() => {
        // Después de 1 segundo, ocultamos el texto por completo para que no interactúe
        uiLayer.style.display = 'none';
    }, 1000);
});

// Ajustar si se gira la pantalla
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
