
            import {OBJLoader2} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/loaders/OBJLoader2.js';
            import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/loaders/MTLLoader.js';
            import {MtlObjBridge} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

            var current_level = 0;

            var controls;

            //Listeners
            var start = false;
            $(".play").click( event => {

                start = true;
                $(".home-screen").fadeOut(1000);
                $('.restart').fadeIn(1000);

                controls.autoRotate = false;
            });


            $(window).on('load', function () {
                $("#question").click(function(){
                    $(".popup").show();
                });

                $(".popup").click(function(){
                    $(".popup").hide();
                });

                $(".close-button").click(function(){
                    $(".popup").hide();
                });

                document.addEventListener('keyup', (e) => {
                    if (e.keyCode == 27){
                        $(".popup").hide();
                    }

                });

            });



            function main() {
                const canvas = document.querySelector('#c');
                const renderer = new THREE.WebGLRenderer({canvas});

                const scene = new THREE.Scene();
                scene.background = new THREE.Color(0x19f7dd)


                const fov = 45;
                const aspect = 2;  // the canvas default
                const near = 0.1;
                const far = 300;
                const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

                const cameraScene = new THREE.Object3D();
                scene.add(cameraScene)
                cameraScene.add(camera);
                camera.position.set(10, 10, 10);
                camera.lookAt(0,0,0)


                controls = new THREE.OrbitControls(camera, canvas);
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.5;
                controls.enableKeys = false;
                controls.rotateSpeed = 0.25;
                controls.dampingFactor = .2;
                controls.target.set(0,0,0);
                controls.enableDamping = true;
                controls.update()


                const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1.5);
                scene.add( light );



                {
                    const mtlLoader = new MTLLoader();
                    mtlLoader.load('/static/sketches/rush_hour/models/city/city.mtl', (mtlParseResult) => {
                    const objLoader = new OBJLoader2();
                    const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
                    objLoader.addMaterials(materials);
                    objLoader.load('/static/sketches/rush_hour/models/city/city.obj', (root) => {

                        root.scale.set(1,1,1)
                        scene.add(root);

                    });
                    });
                }




                const planeGeo = new THREE.PlaneGeometry(6,6,10);
                const texture = new THREE.TextureLoader().load( "/static/sketches/rush_hour/grid1.svg" );
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set( 6, 6 );

                const planeMat = new THREE.MeshBasicMaterial({map:texture, side:THREE.DoubleSide});
                //const planeMat = new THREE.MeshBasicMaterial({color:0x616161, side:THREE.DoubleSide});
                const planeMesh = new THREE.Mesh(planeGeo, planeMat);
                planeMesh.rotation.x = Math.PI/2;

                planeMesh.position.x += .2;
                planeMesh.position.y -= 1.1;
                planeMesh.position.z += .2;

                planeMesh.scale.set(1.075,1.075,1.075)
                scene.add(planeMesh);


                const carSpace = new THREE.Object3D();
                carSpace.position.x -= 3
                carSpace.position.y -= 3
                carSpace.position.z -= .5
                planeMesh.add(carSpace);
                
                function clearCarSpace(){
                    for( var i = carSpace.children.length - 1; i >= 0; i--) { 
                        const obj = carSpace.children[i];
                        carSpace.remove(obj); 
                    }
                }


                var carGrid = [];
                createCarGrid();
                function createCarGrid(){
                    for(var x=0;x<6;x++){
                        const row = [];
                        for(var y=0;y<6;y++){
                            row.push(0);
                        }
                        carGrid.push(row);
                    }
                }

                function resetCarGrid(){
                    carGrid = [];
                    createCarGrid();
                }


                const carColors = [
                    0x9e21d9,
                    0x2121d9,
                    0x23c24d,
                    0xc4bf21,
                    0xc47021,
                    0x2fc6de
                ]


                class Car{
                    constructor(x,y, FACING, LENGTH){
                        this.x = x;
                        this.y = y;

                        this.length = LENGTH;
                        this.dims = [];
                        this.FACING = FACING;

                        this._calcDims();
                        this._setObjPaths();
                        this._createMesh();
                        this.setGrid();
                    }

                    _calcDims(){
                        if(this.FACING == "N"){
                            this.dims = [this.length, 1,1]
                        }else{
                            this.dims = [1,this.length,1]
                        }

                        this.height = (this.length-2)/2;

                    }

                    _setObjPaths(){
                        this.path= ["/static/sketches/rush_hour/models/car/Car_" + THREE.MathUtils.randInt(0,2)+".mtl", "/static/sketches/rush_hour/models/car/Car.obj"];
                        
                        if(this.length == 3){
                            this.path = ["/static/sketches/rush_hour/models/truck/Truck.mtl", "/static/sketches/rush_hour/models/truck/Truck.obj"];
                        }
                    }

                    _createMesh(){

                        const mtlLoader = new MTLLoader();
                        mtlLoader.load(this.path[0], (mtlParseResult) => {
                        const objLoader = new OBJLoader2();
                        const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
                        objLoader.addMaterials(materials);
                        objLoader.load(this.path[1], (root) => {

                            if(this.length == 2){
                                root.scale.set(.023,.023,.023)
                                carSpace.add(root);

                                root.position.x = this.x;
                                root.position.y = this.y;

                                root.rotation.x = -Math.PI/2;
                                root.position.z += .5;


                                if(this.FACING == "N"){
                                    root.rotation.y = Math.PI/2;
                                    root.position.x += 1;
                                    root.position.y += .5;
                                }else{
                                    root.position.x += .5;
                                    root.position.y += 1;
                                    //root.rotation.y = Math.PI;

                                }

                            }else if(this.length == 3){
                                root.scale.set(.14,.14,.14)
                                carSpace.add(root);

                                root.position.x = this.x;
                                root.position.y = this.y;

                                root.rotation.x = -Math.PI/2;
                                root.position.z += .5;

                                if(this.FACING == "N"){
                                    root.rotation.y = Math.PI;
                                    root.position.y += .5
                                    root.position.x += 1.4
                                }else{
                                    root.rotation.y = Math.PI/2;
                                    root.position.y += 1.4
                                    root.position.x += .5
                                }
                            }


                            //this._randomFlipMesh(root);
                            root.carClass = this;
                            this.mesh = root;


                        });
                        });

                    }

                    _randomFlipMesh(root){
                        
                        if(THREE.MathUtils.randInt(0,1) == 0) return;

                        if(this.FACING == 'N'){

                            if(this.length == 2){
                                root.rotation.y = -Math.PI/2;
                            }else{
                                root.rotation.y = Math.PI*2;
                                root.position.x += .25
                            }

                        }else{

                            if(this.length == 2){
                                root.rotation.y = Math.PI;
                            }else{
                                root.rotation.y = -Math.PI/2;
                                root.position.y += .25;
                            }

                        }

                    }


                    getCenterPosCalc(){
                        //Only call after _createPointer has been called (instantiation)
                        if(this.FACING == "N"){
                            return new THREE.Vector2(
                                this.x+this.length/2,
                                this.y+1/2,
                            )

                        }else{
                            return new THREE.Vector2(
                                this.x+1/2,
                                this.y+this.length/2,
                            )
                        }
                    }

                    getPosCalc(x,y){
                        //Only call after _createPointer has been called (instantiation)
                        if(this.FACING == "N"){
                            return new THREE.Vector2(
                                x+this.length/2,
                                y+1/2,
                            )

                        }else{
                            return new THREE.Vector2(
                                x+1/2,
                                y+this.length/2,
                            )
                        }
                    }


                    setGrid(state=1){
                        if(this.FACING == "N"){
                            for(var i=0;i<this.length;i++){
                                carGrid[this.x + i][this.y] = state;
                            }
                        }else{
                            for(var i=0;i<this.length;i++){
                                carGrid[this.x][this.y+i] = state;
                            }  
                        }
                    }

                    spaceFree(x, y){
                        if(x<0 || y<0 || x>5 || y>5){
                            return false;
                        }

                        if(carGrid[x][y] != 0){
                            return false;
                        }

                        return true;
                    }


                    moveAttempt(dir){

                        if(this.FACING == "N"){
                            var nx = this.x+dir;

                            if(dir > 0){
                                nx += this.length-1
                            }

                            if(this.spaceFree(nx, this.y)){
                                //console.log("MOVE SUCCESFUL!")
                                this.setGrid(0);
                                this.move(dir);
                                this.setGrid();
                            }else{
                                //console.log("MOVE FAILED!", this.x, this.y, nx)
                            }

                        }else{
                            var ny = this.y+dir;

                            if(dir > 0){
                                ny += this.length-1
                            }

                            if(this.spaceFree(this.x, ny)){
                                //console.log("MOVE SUCCESFUL!")
                                this.setGrid(0);
                                this.move(dir);
                                this.setGrid();
                            }else{
                                //console.log("MOVE FAILED!")
                            }
                        }
                    }

                    move(dir){
                        if(this.FACING == "N"){
                            this.x += dir;
                            this.mesh.position.x += dir;
                        }else{
                            this.y += dir;
                            this.mesh.position.y += dir;
                        }


                    }




                }


                class PlayerCar extends Car{

                    constructor(x,y, FACING){
                        super(x,y,FACING,2);
                        this._createSpline();

                        this.cve = 0;
                        this.completed = false;
                    }

                    _setObjPaths(){
                        this.path= ["/static/sketches/rush_hour/models/car/Car_red.mtl", "/static/sketches/rush_hour/models/car/Car.obj"];
                    }
                    
                    _randomFlipMesh(root){
                        //do not flip the players car, always facing west
                        return;
                    }



                    _createSpline(){

                        const curve = new THREE.SplineCurve([
                            this.getPosCalc(3,5),
                            this.getPosCalc(4,6.5),
                            //this.getPosCalc(3,7),
                            this.getPosCalc(7.5,6.5),
                            this.getPosCalc(7.5,-5),

                        ])

                        this.curve = curve;
                        //console.log(this.getPosCalc(3,5));


                    }

                    spaceFree(x, y){
                        if(x<0 || y<0 || x>5 || y>5){
                            if(x == 3 && y>5){
                                return true;
                            }
                            return false;
                        }

                        if(carGrid[x][y] != 0){
                            return false;
                        }

                        return true;
                    }

                    move(dir){
                        if(this.FACING == "N"){
                            this.x += dir;
                            this.mesh.position.x += dir;
                        }else{
                            this.y += dir;
                            this.mesh.position.y += dir;
                        }


                        if(this.x == 3 && this.y == 5){
                            this.completed = true;
                            this.callback();
                        }

                    }


                    setOnCompleteCallback(callback){
                        this.callback = callback;
                    }

                    
                    

                    onComplete(time){
                        if(this.completed){

                            if(this.cve <= 1){
                                this.cve += .005
                                const vec = this.curve.getPoint(this.cve)
                                //console.log(this.curve.getTangent(this.cve))
                                this.mesh.position.x = vec.x;
                                this.mesh.position.y = vec.y;
                                //this.mesh.position.z = 5;


                                const rot = this.curve.getTangent(this.cve).normalize()

                                const up = new THREE.Vector2(0, 1);
                                const yrot = Math.acos(up.dot( rot ));

                                this.mesh.rotation.y = yrot

                            }else{
                                onLevelComplete();
                                this.completed = false;
                            }

                        }

                    }

                }



                function onLevelComplete(){

                    $(".level-complete").fadeIn(1000)
                    $(".restart").fadeOut(1000)


                }



                var playerCar;
                var chosenCar = playerCar;


                //const playerCar = new PlayerCar(3,4, "W");
                //addCar(2,0,"W",3)
                //addCar(3,2,"N",3)
                //addCar(5,4,"W",2)
                //addCar(0,5,"N",3)


                function addCar(x, y, dir, length){
                    const car = new Car(x,y,dir,length);
                }


                class Pointer{
                    constructor(){

                        this._createMesh();
                    }

                    _createMesh(){

                        const geo = new THREE.OctahedronGeometry(.5, 0);
                        const mat = new THREE.MeshPhongMaterial({color:0x9e21d9});
                        const mesh = new THREE.Mesh(geo, mat)
                        mesh.position.z = -1.5;
                        mesh.visible = false;
                        mesh.scale.set(.5,.5,1)
                        carSpace.add(mesh);
                        this.mesh = mesh;
                    }

                    setPosition(car){
                        const pos = car.getCenterPosCalc();
                        this.mesh.position.x = pos.x;
                        this.mesh.position.y = pos.y;
                        this.height = -1.5 - car.height;
                        this.mesh.position.z = this.height;
                        this.mesh.visible = true;
                    }


                    update(time){
                        this.mesh.position.z = this.height +  Math.sin(time*2)/2;
                        this.mesh.rotation.z = time;

                        if(this.invisible){
                            this.mesh.visible = false;
                        }
                    }



                }   


                var pointer = new Pointer();
                function setInvisible(){
                    pointer.invisible = true;
                }


                function resetPointer(){
                    pointer = new Pointer();
                }

                function createBoard(block){

                    const cp = block.playerCar;
                    playerCar = new PlayerCar(cp.x,cp.y, cp.dir);
                    playerCar.setOnCompleteCallback(setInvisible);
                    chosenCar = playerCar;

                    for(const car of block.cars){
                        addCar(car.x, car.y, car.dir, car.length);
                    }

                    pointer.setPosition(chosenCar);
                
                }
                

                var carData = null;
                function loadJSON(){
                    $.getJSON('/static/sketches/rush_hour/rushCarConf.json', function(data) {
                        carData = data;
                        createBoard(data[current_level])
                    });
                }



                loadJSON();


                function destroy(){
                    clearCarSpace();
                    resetCarGrid();
                    resetPointer();
                    createBoard(carData[current_level]);
                }

                $("#reset").click( event => {
                    destroy();
                });

                $("#restart").click( event => {
                    destroy();
                    $(".level-complete").fadeOut(1000);
                });


                $(".next-level").click( event => {
                    current_level+=1;
                    current_level %= carData.length;
                    destroy();
                    $(".level-complete").fadeOut(1000);
                    $(".restart").fadeIn(1000);
                });


                const pickPosition = {x: 0, y: 0};
                clearPickPosition();
                function clearPickPosition() {
                    pickPosition.x = -100000;
                    pickPosition.y = -100000;
                }
                function setPickPosition(event) {
                    const pos = getCanvasRelativePosition(event);
                    pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
                    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
                }
                function getCanvasRelativePosition(event) {
                    const rect = canvas.getBoundingClientRect();
                    return {
                        x: (event.clientX - rect.left) * canvas.width  / rect.width,
                        y: (event.clientY - rect.top ) * canvas.height / rect.height,
                    };
                }

                class PickHelper {
                    constructor() {
                        this.raycaster = new THREE.Raycaster();
                        this.pickedObject = null;
                        this.pickedObjectSavedColor = 0;
                    }

                    pick(normalizedPosition, scene, camera) {

                        // cast a ray through the frustum
                        this.raycaster.setFromCamera(normalizedPosition, camera);
                        // get the list of objects the ray intersected

                        const intersectedObjects = this.raycaster.intersectObjects(scene.children, true);
                        if (intersectedObjects.length) {
                            //console.log(intersectedObjects[0].object.parent.uuid);
                            //console.log(intersectedObjects[0].object.parent.carClass);
                            const cc = intersectedObjects[0].object.parent.carClass;
                            if(cc) chosenCar = intersectedObjects[0].object.parent.carClass;
                            pointer.setPosition(chosenCar);
                        }

                        clearPickPosition()
                    }

                }

                const pickHelper = new PickHelper();
                window.addEventListener('click', poo);
                function poo(event){
                    if(!playerCar.completed && start){
                        setPickPosition(event);
                        pickHelper.pick(pickPosition, carSpace, camera);
                    }
                }


                window.addEventListener("keyup", (event) => {
                    if(!playerCar.completed && start){
                        console.log(chosenCar);
                        if(event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 87){
                            chosenCar.moveAttempt(1);
                            pointer.setPosition(chosenCar);
                        }else if(event.keyCode  == 40 || event.keyCode == 37 || event.keyCode == 83){
                            chosenCar.moveAttempt(-1);
                            pointer.setPosition(chosenCar);
                        }
                    }
                });








                function render(time){
                    time *= 0.001;

                    if(resizeRendererToDisplaYSize(renderer)){
                        const canvas = renderer.domElement;
                        camera.aspect = canvas.clientWidth / canvas.clientHeight;
                        camera.updateProjectionMatrix();
                    }





                    pointer.update(time);

                    if(playerCar){
                        playerCar.onComplete(time);
                    }
                    
                    controls.update()
                    renderer.render(scene, camera);
                    requestAnimationFrame(render);
                }





                controls.update()



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

            main()
