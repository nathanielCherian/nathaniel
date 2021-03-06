
var RUNNING = true,
PAUSED = true;

const oscilators = [] // reference in second script
var scaleRad;

document.getElementById("play-pause").addEventListener('click', function(){
    PAUSED = !PAUSED;
    if(PAUSED){
        this.className = "fa fa-play";
        document.getElementById("pp-text").innerHTML = "play";
    }else{
        this.className = "fa fa-pause";
        document.getElementById("pp-text").innerHTML = "pause";
    }

    document.getElementById("start-text").style.display = "none";

}, false);

document.getElementById("play-text").addEventListener('click', function(){
    PAUSED = false;
    document.getElementById("play-pause").className = "fa fa-pause";
    document.getElementById("pp-text").innerHTML = "pause";
    document.getElementById("start-text").style.display = "none";

}, false);


document.getElementById("toggle-controls").addEventListener('click', function(){
if(document.getElementById("controls").style["z-index"] == -1){
    document.getElementById("controls").style["z-index"] = 100;
    document.getElementById("tag").style.display = "none";
    return;
}
document.getElementById("controls").style["z-index"] = -1;
document.getElementById("tag").style.display = "block";

});

var K_VALUE = .1;
var K_BY_N = K_VALUE / oscilators.length;

document.getElementById('k-value').addEventListener('input', function () {
const val = parseFloat(this.value);
document.getElementById("k-val__text").innerHTML = val;
K_VALUE = val;
K_BY_N = K_VALUE / oscilators.length;
}, false);




function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA)

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 400;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 5, 20);


    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI/5;
    controls.maxPolarAngle = Math.PI/2;

    //controls.enableDamping = true;
    controls.update()


    let MET_COLOR = 0x454545,
        STICK_COLOR = 0x9e9e9e,
        HAMMER_COLOR = 0xb3b3b3,
        DARK_WOOD_COLOR = 0xcaa472;
    

    const loader = new THREE.TextureLoader()
    const woodMaterial = () => {
        const cube =  new THREE.MeshStandardMaterial({
            map:loader.load('/static/sketches/kuramoto/wood.jpg')
        });
        cube.color.convertSRGBToLinear();
        return cube;
    }


    const getRandomRad = () => {
        return Math.random() * Math.PI * 2;
    }

    const pendulumSpace = new THREE.Object3D();
    scene.add(pendulumSpace);

    const PENDULUM_LENGTH = 2;
    const MAX_ROTATION = Math.PI/4;

    scaleRad = (rad) => {
        const scale = Math.cos(rad);
        return (scale*MAX_ROTATION) + Math.PI/2;               
    }


    const addOscilatorRad = (initialRad, nf) => {

        //CREATE BLOCK
        const metSpace = new THREE.Object3D();
        metSpace.position.x = PENDULUM_LENGTH*oscilators.length*2;
        pendulumSpace.add(metSpace);

        //CREATE METERNOME
        const metGeo = new THREE.CylinderGeometry( .2, 1, PENDULUM_LENGTH*1.5, 3 );
        const metMat = new THREE.MeshPhongMaterial( {color: MET_COLOR} );
        const metMesh = new THREE.Mesh( metGeo, metMat );
        metMesh.position.set(0, PENDULUM_LENGTH*.75, -.5);
        //metMesh.position.set(PENDULUM_LENGTH*oscilators.length*2, PENDULUM_LENGTH*.75, 0)
        metMesh.rotation.y = Math.PI/3;
        metSpace.add( metMesh );


        //CREATE PIVOT CENTER
        const metPGeo = new THREE.CylinderGeometry( .60, .70, PENDULUM_LENGTH*.2, 3, 1, false, 0, 3.1 );
        const metPMat = new THREE.MeshPhongMaterial( {color: MET_COLOR} );
        const metPMesh = new THREE.Mesh( metPGeo, metPMat );
        metPMesh.position.set(0,PENDULUM_LENGTH*.1,-.25)
        metPMesh.rotation.y = -Math.PI/2
        metSpace.add( metPMesh );


        //CREATE ROTATING SPACE
        const oscilatorSpace = new THREE.Object3D();
        metSpace.add(oscilatorSpace);


        //CREATE HAMMER
        const hamGeo = new THREE.CylinderGeometry(.2,.35,.5,4,1)
        const hamMat = new THREE.MeshPhongMaterial( { color: HAMMER_COLOR } );
        const hammerMesh = new THREE.Mesh(hamGeo, hamMat);
        hammerMesh.rotation.z = Math.PI/2;
        hammerMesh.rotation.x = Math.PI/4;
        hammerMesh.position.set(PENDULUM_LENGTH,0,0);
        oscilatorSpace.add( hammerMesh );



        //CREATE BAR    
        const pivotGeo = new THREE.BoxGeometry(PENDULUM_LENGTH*1.5,.1,.1);
        const pivotMat = new THREE.MeshLambertMaterial({color:STICK_COLOR}); //bar
        const pivotMesh = new THREE.Mesh(pivotGeo, pivotMat);
        pivotMesh.position.set(PENDULUM_LENGTH/1.5,0,0);
        oscilatorSpace.add(pivotMesh);


        const data = {
            rad:initialRad,
            nf:nf,
            h:1,
            mesh:hammerMesh,
            space:oscilatorSpace
        }

        data.space.rotation.z = scaleRad(data.rad);
        oscilators.push(data);
    }

    addOscilatorRad(getRandomRad(),1)
    addOscilatorRad(getRandomRad(),1)
    addOscilatorRad(getRandomRad(),1)
    addOscilatorRad(getRandomRad(),1)


    const oscilatorControls = new CreateControl();


    //CREATE TABLES
    {
        const blockGeo = new THREE.BoxGeometry(oscilators.length*PENDULUM_LENGTH*2, .5, 4);
        const blockMat =  woodMaterial(); //new THREE.MeshBasicMaterial({color:DARK_WOOD_COLOR});
        const blockMesh = new THREE.Mesh(blockGeo, blockMat);
        blockMesh.position.set((oscilators.length - 1)*PENDULUM_LENGTH, -.25, -.5);
        camera.lookAt(blockMesh.position);
        controls.target.set(blockMesh.position.x, blockMesh.position.y, blockMesh.position.z);
        pendulumSpace.add(blockMesh);
    }




    
    //CREATE ROOM
    const r = oscilators.length*PENDULUM_LENGTH*6;
    /*
    const roomGeo = new THREE.CylinderGeometry(r,r,r*2,20,1,false,0);
    const roomMat = new THREE.MeshPhongMaterial({color:'red', side:THREE.DoubleSide});
    const roomMesh = new THREE.Mesh(roomGeo, roomMat);
    roomMesh.rotation.y = Math.PI/2;
    roomMesh.position.set(r/6,0,0)
    scene.add(roomMesh);*/
    controls.maxDistance = r*.95;
    controls.minDistance = r/6;


    //LIGHT
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(r, r, 0);
    camera.add(light);
    scene.add(camera);

    

    const T = .05; //Time
    //const K = .01*10; //coupling factor
    const naturalFrequency = 1;
    const N = oscilators.length;
    //const kByN = K/N;
    K_BY_N = K_VALUE / oscilators.length;

    const iterateOscilator = () => {
        const toAdd = [];

        for(var i=0;i<N;i++){

            var sigma = 0;
            for(var j=0;j<N;j++){
                sigma += Math.sin(oscilators[j].rad - oscilators[i].rad);
            }

            const term2 = K_BY_N * sigma;
            const dThetaDt = oscilators[i].nf + term2;
            toAdd.push(dThetaDt*T);
        }


        var blockDiff = 0;

        toAdd.map((val, j) => {
            oscilators[j].rad += val; // Increment radians
            oscilators[j].space.rotation.z = scaleRad(oscilators[j].rad); //Set scaled rotation
            
            blockDiff += Math.cos(oscilators[j].rad) * PENDULUM_LENGTH;
        });

        pendulumSpace.position.x = blockDiff*.1
    }

    
    function render(time){
        time *= 0.001;

        if(resizeRendererToDisplaYSize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        oscilatorControls.draw();

        if(RUNNING && !PAUSED){ 
            iterateOscilator()
        }else{
            var blockDiff = 0;
            oscilators.map((oscilator) => {
                oscilator.space.rotation.z = scaleRad(oscilator.rad);
                blockDiff += Math.cos(oscilator.rad) * PENDULUM_LENGTH;
            });
            pendulumSpace.position.x = blockDiff*.1
        };


        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }





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

    requestAnimationFrame(render);
    
    }



    main();



function CreateControl(){
    console.log("created controls...")

    var c = document.getElementById("control-canvas");
    var ctx = c.getContext("2d");

    const circles = [];
    const LENGTH =  c.offsetWidth/2.5;//150;
    const CENTER_X = c.width/2;
    const CENTER_Y = c.height/2;

    const START_ANGLE = 0;
    const END_ANGLE = Math.PI*2;
    const RADIUS = LENGTH/10;

    const FILL = ()=>'#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    const TEMP_FILL = "red";
    const STROKE = "black";


    oscilators.map((oscilator) => {
        oscilator.isFocused = false;
        oscilator.fill = FILL();
        oscilator.x = -99999;
        oscilator.y = -99999;
    })


    document.addEventListener('mousemove', move, false);
    document.addEventListener('mousedown', setFocus, false);
    document.addEventListener('mouseup', setFocus, false);

    document.addEventListener('touchmove', moveTouch, false);
    document.addEventListener('touchend', setFocus, false);
    document.addEventListener('touchstart', setFocus, false);

    var mousePosition = {
        x:-1111111,
        y:-1111111
    };
    var isMouseDown = false;



    const dragOscilator = (oscilator) => {
        const rad = Math.atan2((mousePosition.y-CENTER_Y) , (mousePosition.x-CENTER_X));
        oscilator.rad = rad;
        //oscilator.space.rotation.z = scaleRad(oscilator.rad);
    }

    const drawOscilator = (oscilator) => {
        const x = Math.cos(oscilator.rad)*LENGTH;
        const y = Math.sin(oscilator.rad)*LENGTH;

        oscilator.x = x + CENTER_X;
        oscilator.y = y + CENTER_Y;

        let r = RADIUS;
        if(oscilator.isFocused) r*=2;

        ctx.beginPath();
        ctx.arc(oscilator.x, oscilator.y, r, START_ANGLE, END_ANGLE);
        ctx.fillStyle = oscilator.fill;
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.strokeStyle = STROKE;
        ctx.stroke();
    }



    function moveTouch(e){
        e = e.touches[0];
        setMousePosition(e);
    }

    function move(e){
        setMousePosition(e);
    }

    function setFocus(e){
        if(e.type === "mousedown" || e.type === "touchstart"){
            isMouseDown = true;
            //console.log("touched")
        }else{
            isMouseDown = false;
        }
    }

    function setMousePosition(e) {
        var rect = c.getBoundingClientRect();
        mousePosition = {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        }
    }

    function intersects(oscilator){
        var areaX = mousePosition.x - oscilator.x;
        var areaY = mousePosition.y - oscilator.y;
        return areaX * areaX + areaY * areaY <= RADIUS * RADIUS;
    }


    this.draw = function(){
        //clear
        ctx.clearRect(0, 0, c.width, c.height); 

        //Back circle
        ctx.beginPath();
        ctx.arc(CENTER_X, CENTER_Y, LENGTH, 0, 2*Math.PI);
        ctx.stroke();

        //Draw circles
        drawCircles();
    }

    function drawCircles() {

        
        for(const oscilator of oscilators){

            if(!isMouseDown){
                //
                RUNNING = true;
                oscilator.isFocused = false;
                document.getElementById("control-canvas").style.cursor = "default";
            }else if(oscilator.isFocused || intersects(oscilator)){
                dragOscilator(oscilator)
                console.log("grabbed")
                document.getElementById("control-canvas").style.cursor = "grab";
                oscilator.isFocused = true;
                RUNNING = false;
            }


            drawOscilator(oscilator);
        }

        return;
    }

}
