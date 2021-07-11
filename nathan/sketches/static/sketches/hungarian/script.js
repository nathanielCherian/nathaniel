const setInfoState = (state) => {
    document.getElementById('info').style.display = state;
}

const firstTime = localStorage.getItem('firstTime');
if(firstTime == null){
    setInfoState('block')
    localStorage.setItem('firstTime', 'true');
}

document.getElementById('info__close').addEventListener("click", function (e) {
    setInfoState('none')
});

document.getElementById('question').addEventListener("click", function (e) {
    setInfoState('block')
});



function main() {

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.autoClearColor = false;

const fov = 40;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 400;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-40, 40, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));
const scene = new THREE.Scene();
scene.background = new THREE.Color( 'red' );

const controls = new THREE.OrbitControls(camera, canvas);
controls.rotateSpeed = 0.25;
controls.dampingFactor = .2;
controls.enablePan = false;
controls.minDistance = 15;
controls.maxDistance = 200;
controls.target.set(0,0,0);
controls.enableDamping = true;
controls.keys = {
    LEFT: null,
    UP: null,
    RIGHT: null,
    BOTTOM: null,
}
controls.update()

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 20, 0);
    scene.add(light);
}

{
    const geo = new THREE.BoxGeometry(400, 1, 400);
    const mat = new THREE.MeshBasicMaterial({color: 0xbab7b6});
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, -1, 0);
    scene.add(mesh);
}

// ------------- HUNAGRICIAN RINGS -------------

const COLORS = {
    RED:'red',
    BLACK:'black',
    YELLOW:'yellow',
    BLUE:'blue'
}

const DIRECTIONS = {
    CLOCKWISE:1,
    COUNTER_CLOCKWISE:-1
}

//going clockwise https://www.sfu.ca/~jtmulhol/math302/images/hungarianrings-labeled-nocolor.png
const LEFT_CYCLE = [1, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
const RIGHT_CYCLE = [1, 38, 37, 36, 35, 6, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21]

const CYCLE_RADIUS = 10;
const center_dif = CYCLE_RADIUS * Math.cos((2.5/20) * Math.PI * 2); // reduced from CYCLE_RADIUS * Math.cos((3/20) * Math.PI * 2)

const left_ring = new THREE.Object3D();
left_ring.position.set(0, 0, 0-center_dif)
scene.add(left_ring)

const right_ring = new THREE.Object3D();
right_ring.position.set(0, 0, center_dif)
scene.add(right_ring)

// {
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshPhongMaterial({color:'white'});
//     const cube = new THREE.Mesh(geometry, material);
//     cube.position.y = -1
//     scene.add(cube);
//     // scene.remove(cube);
//     // right_ring.attach(cube)
//     // right_ring.rotation.y = -Math.PI/2
// }

const createMaterial = (color) =>  {
    return new THREE.MeshPhongMaterial({color});
}

class Bead {
    constructor(color, origin) {
        this.color = color;
        this.origin = origin;

        this.createBead();
    }
    
    addToRing(ring) {
        scene.remove(this.mesh);
        ring.attach(this.mesh);
    }

    rotate(center){
        const relX = this.mesh.position.z-center;
        const relY = this.mesh.position.x;

        var angle = Math.atan2(relY, relX);
        
        angle -= (1/10)*Math.PI;

        const x = CYCLE_RADIUS * Math.cos(angle);
        const y = CYCLE_RADIUS * Math.sin(angle);

        //this.mesh.position.set(y, 0, center+x);

    }

    // This is awful 🤮🤮🤮 please fix
    createBead(){
        if(this.origin <= 20) {
            const tem = .1 * this.origin
            var geometry = new THREE.SphereGeometry(1, 14, 14);
            var material;
            if(this.origin <= 10){
                material = createMaterial(COLORS.RED)
            }else {
                material = createMaterial(COLORS.BLUE)
            }

            const mesh = new THREE.Mesh(geometry, material);

            const leftCenter = 0-center_dif;
            const theta = (1/10) * (this.origin-3.5) * Math.PI; // reduced from (1/20) * (this.origin-1) * 2 * Math.PI
            this.theta = theta;

            const relX = CYCLE_RADIUS * Math.cos(theta);
            const y = CYCLE_RADIUS * Math.sin(theta);
            mesh.position.set(y, 0, leftCenter + relX)
            scene.add(mesh);
            this.mesh = mesh;
        }else {
            const tem = .1 * (this.origin-15)
            var geometry = new THREE.SphereGeometry(1, 14, 14);
            var material;
            if(this.origin <= 30){
                material =createMaterial(COLORS.YELLOW)
            }else {
                material = createMaterial(COLORS.BLACK)
            }
            const mesh = new THREE.Mesh(geometry, material);

            // ----- dont touch this -----
            const rightCenter = 0 + center_dif;
            const t = this.origin - 20;
            var p1 = (1/10) * (t-7.5);
            if(this.origin > 34){
                p1 += 1/10
            }
            var theta =  p1 * Math.PI; // reduced from (1/20) * (this.origin-1) * 2 * Math.PI
            
            this.theta = theta;

            const relX = CYCLE_RADIUS * Math.cos(theta);
            const y = CYCLE_RADIUS * Math.sin(theta);
            mesh.position.set(y, 0, rightCenter + relX)
            scene.add(mesh);
            this.mesh = mesh;
        }
    }
}


class Game {
    constructor() {
        this.__init();
        this.queue = [];

        this.FULL_ROTATION = (1/10 * Math.PI)
        this.DIVISOR = 10;

        this.__initValues();

    }

    __init(){
        this.beads = {}
        for(let i=1;i<39;i++){
            this.beads[i] = new Bead(COLORS.RED, i)
        }
    }

    __initValues() {
        this.isBusy = false;
        this.toRotate = null;
        this.initialAngle = 0;
        this.finalAngle = 0;
        this.counter = 0;
        this.increment =  this.FULL_ROTATION/this.DIVISOR;
    }


    enQueue(command){
        if(this.queue.length < 3){
            this.queue.push(command)
        }
    }

    deQueue(){
        if(this.queue.length > 0){
            return this.queue.shift()
        }
        return null
    }


    // do not access this directly Abstract interface
    rotate(command) {

        this.isBusy = !this.isBusy; // start animation

        const {circle, direction} = command;
        var cycle, center, ring;

        if(circle == 'left'){
            cycle = [...LEFT_CYCLE];
            center = 0-center_dif;
            ring = left_ring;
        }else if(circle == 'right'){
            cycle = [...RIGHT_CYCLE];
            center = center_dif;
            ring = right_ring;
        }
    
        if(direction < 0) { //it is counter-clockwise
            cycle = cycle.reverse();
        }

        console.log({LEFT_CYCLE, RIGHT_CYCLE})
        this.toRotate = ring;
        this.initialAngle = ring.rotation.y;
        this.finalAngle = this.initialAngle - (this.FULL_ROTATION*direction);
        this.increment *= direction;
        
        // Rotate all the beads
        var temp = this.beads[cycle[0]];
        for(let i=0; i<cycle.length; i++){
            const thisIndex = cycle[i];
            const nextIndex = cycle[(i+1)%cycle.length];

            const tt = this.beads[nextIndex];
            this.beads[nextIndex] = temp;
            this.beads[nextIndex].addToRing(ring);
            temp = tt;
        }

        // Now update the mesh positions of induvidual beasds
        for (let i = 0; i < cycle.length; i++) {
            const index = cycle[i];
            this.beads[index].rotate(center);
        }

    }

    // do not access directly
    // rotateClockwise(circle, direction) {

    //     this.isBusy = !this.isBusy;

    //     var cycle, center, ring;

    //     if(circle == 'left'){
    //         cycle = LEFT_CYCLE;
    //         center = 0-center_dif;
    //         ring = left_ring;
    //     }else if(circle == 'right'){
    //         cycle = RIGHT_CYCLE;
    //         center = center_dif;
    //         ring = right_ring;
    //     }

    //     this.toRotate = ring;
    //     this.initialAngle = ring.rotation.y;
    //     this.finalAngle = this.initialAngle - this.FULL_ROTATION;

    //     // Rotate all the beads
    //     var temp = this.beads[cycle[0]];
    //     for(let i=0; i<cycle.length; i++){
    //         const thisIndex = cycle[i];
    //         const nextIndex = cycle[(i+1)%cycle.length];

    //         const tt = this.beads[nextIndex];
    //         this.beads[nextIndex] = temp;
    //         this.beads[nextIndex].addToRing(ring);
    //         temp = tt;
    //     }

    //     // Now update the mesh positions of induvidual beasds
    //     for (let i = 0; i < cycle.length; i++) {
    //         const index = cycle[i];
    //         this.beads[index].rotate(center);
    //     }

    // }

    render() {
        if(!this.isBusy) {
            const command = this.deQueue();
            if(command){
                console.log("executing: ", command)
                this.rotate(command)
            }
            return;
        }

        this.toRotate.rotation.y -= this.increment;
        this.counter++;

        if(this.counter >= this.DIVISOR){
            this.toRotate.rotation.y = this.finalAngle;
            this.__initValues();
        }
    }

    print(){
        console.log(JSON.parse(JSON.stringify(this.beads)))
    }
}

const g = new Game();

document.getElementById('left-clock').addEventListener("click", function (e) {
    g.enQueue({circle:'left', direction: DIRECTIONS.CLOCKWISE})
});
document.getElementById('left-counter').addEventListener("click", function (e) {
    g.enQueue({circle:'left', direction: DIRECTIONS.COUNTER_CLOCKWISE})
});
document.getElementById('right-clock').addEventListener("click", function (e) {
    g.enQueue({circle:'right', direction: DIRECTIONS.CLOCKWISE})
});
document.getElementById('right-counter').addEventListener("click", function (e) {
    g.enQueue({circle:'right', direction: DIRECTIONS.COUNTER_CLOCKWISE})
});

// ------------- END HUNAGRIAN RINGS -------------

// ------------- EVENT LISTENERS -------------

const KEY_CODES = {
    LEFT: [37, 68],
    RIGHT: [39, 70],
    UP: [38, 75],
    DOWN: [40, 74],
}

document.addEventListener('keyup', function (e) {

    const key = e.keyCode;
    if(KEY_CODES.LEFT.includes(key)){
        g.enQueue({circle:'left', direction: DIRECTIONS.COUNTER_CLOCKWISE})
    } else if(KEY_CODES.RIGHT.includes(key)) {
        g.enQueue({circle:'left', direction: DIRECTIONS.CLOCKWISE})
    } else if(KEY_CODES.UP.includes(key)) {
        g.enQueue({circle:'right', direction: DIRECTIONS.CLOCKWISE})
    } else if(KEY_CODES.DOWN.includes(key)) {
        g.enQueue({circle:'right', direction: DIRECTIONS.COUNTER_CLOCKWISE})
    }else if(key == 27){
        setInfoState('none');
    }
});




function render(time) {
    time *= 0.001;  // convert to seconds

    if(resizeRendererToDisplaYSize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    g.render();

    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);



function resizeRendererToDisplaYSize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize){
        renderer.setSize(width, height, false);
    }
    return needResize;
}
}

main();