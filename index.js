window.addEventListener("DOMContentLoaded", init);

function init(){
    const width = 800;
    const height = 600;

    const renderer = new WebGLRenderer();
    document.body.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;

    const scene = new THREE.scene();

    const camera = new THREE.PerspectiveCamera(45, width/height);
    camera.position.set(0, 0, 5);

    const controls = new THREE.OrbitContorols(camera, document.body);

    const directionalLightM = new THREE.directionalLight(0xffffff, 0.3);
    directionalLightM.position.set(0, 10, -5);
    directionalLightM.castShadow = true;

    scene.add(directionalLightM);

    const light = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 20, 0.2);
    light.castShadow = true;

    const directionalLightS = new THREE.directionalLight(0xffffff, 0.3);
    directionalLightS.position.set(-1, -1, 1);
    //scene.add(directionalLightS);

    // helper
    //const gridHelper = new THREE.GridHelper(2,10); // size, step
    //scene.add(gridHelper);
    const axisHelper = new THREE.AxisHelper(2); //軸の長さ　X：赤、Y：緑、z：青
    scene.add(axisHelper);

    //平面を作成
    const planeGeometry = new THREE.PlaneGeometry(10,10);
    //const planeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true; 
    plane.rotation.set( -Math.PI/2, 0, 0 );
    plane.position.set(0,-1.5,-2);
    scene.add(plane);

    // 箱を作成
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true; //影ができる
    box.position.set(1,0,0);
    scene.add(box);

    update();

    function update(){
        renderer.render(scene, camera);
        requestAnimationFrame(update);

        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    }
}