// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Creación de la galaxia de partículas
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4000;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i+=3) {
    // Patrón de espiral
    const radius = Math.random() * 6;
    const theta = Math.random() * 2 * Math.PI;
    const y = (Math.random() - 0.5) * 0.8;
    
    posArray[i] = radius * Math.cos(theta) + (Math.random() - 0.5); // x
    posArray[i+1] = y; // y
    posArray[i+2] = radius * Math.sin(theta) + (Math.random() - 0.5); // z

    // Colores: Tonos rosados, fucsias y morados
    colorsArray[i] = 1.0; // r (rojo al máximo)
    colorsArray[i+1] = 0.2 + Math.random() * 0.4; // g 
    colorsArray[i+2] = 0.6 + Math.random() * 0.4; // b
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.025,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 5;
camera.position.y = 2.5;
camera.lookAt(0, 0, 0);

// Animación constante
function animate() {
    requestAnimationFrame(animate);
    // Rotación suave de la galaxia
    particlesMesh.rotation.y -= 0.0015;
    renderer.render(scene, camera);
}
animate();

// Lógica de los botones para la carta
const btnOpen = document.getElementById('btn-open');
const btnClose = document.getElementById('btn-close');
const modal = document.getElementById('modal');

btnOpen.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Ajustar si se gira la pantalla
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
