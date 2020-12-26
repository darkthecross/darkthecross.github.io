var camera, scene, renderer, stars = [], star_vs = [];
var mouse_star, plane;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    const material = new THREE.MeshBasicMaterial({ color: 0x101010, side: THREE.DoubleSide });
    plane = new THREE.Mesh(geometry, material);
    plane.position.x = 0.0;
    plane.position.y = 0.0;
    plane.position.z = -500.0;
    scene.add(plane);

    const mouse_star_geometry = new THREE.SphereGeometry(3, 32, 32)
    var mouse_star_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mouse_star = new THREE.Mesh(mouse_star_geometry, mouse_star_material)
    mouse_star.position.x = Math.random() * 1000 - 500;
    mouse_star.position.y = Math.random() * 1000 - 500;
    mouse_star.position.z = -500.0;
    scene.add(mouse_star);
}

function addSingleSphere() {
    var geometry = new THREE.SphereGeometry(0.5, 32, 32)
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphere = new THREE.Mesh(geometry, material)
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;
    sphere.position.z = -500.0;
    scene.add(sphere);
    stars.push(sphere);
    star_vs.push(new THREE.Vector2(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5));
}

function animateStars() {
    for (var i = 0; i < stars.length; i++) {
        star = stars[i];
        star.position.x += star_vs[i].x;
        star.position.y += star_vs[i].y;

        if (star.position.x < -500 || star.position.x > 500 || star.position.y < -500 || star.position.y > 500) {
            star.position.x = Math.random() * 1000 - 500;
            star.position.y = Math.random() * 1000 - 500;
            star_vs[i] = new THREE.Vector2(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
        }
    }
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function render() {
    raycaster.setFromCamera( mouse, camera );
    int_obj = raycaster.intersectObject(plane);
    int_obj.forEach((int_o)=>{
        mouse_star.position.x = int_o.point.x;
        mouse_star.position.y = int_o.point.y;
    });

    if (stars.length < 500) {
        addSingleSphere();
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    animateStars();
}

init();
render();

window.addEventListener("resize", () => {
    document.body.removeChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
});

window.addEventListener("mousemove", onMouseMove);