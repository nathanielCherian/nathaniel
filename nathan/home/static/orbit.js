
import * as THREE from '/static/home/three/three.module.js';
import {OrbitControls} from '/static/home/three/OrbitControls.js';


function main() {

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas, alpha:true});

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f1f1f);









    let CAMERA_INITIAL_Z = 7;

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 200;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.lookAt(0,0,0)
    camera.position.set(10,3,0);
    const camera_scene = new THREE.Object3D();
    camera_scene.add(camera)


    const mouse = new THREE.Vector2();
    var MOUSE_STATE = false;
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
    document.addEventListener( 'mousemove', onMouseMove, false );
    function onMouseMove( event ) {
        console.log(mouse)
        mouse.x = ( event.clientX - windowHalf.x );
        mouse.y = ( event.clientY - windowHalf.y );
        MOUSE_STATE = true;
    
    }


    document.addEventListener( 'mouseleave', onMouseLeave, false );
    function onMouseLeave( event ) {
        console.log(mouse)
        //mouse.x = 0;
        //mouse.y = 0;
        MOUSE_STATE = false;

    
    }



    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 100, -20);
    light.lookAt(0,0,0)
    scene.add(light);




    const loader = new THREE.TextureLoader();


    const radius = 1;
    const widthSegments = 20;
    const heightSegments = 20;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshBasicMaterial({ map: loader.load('/static/home/anim/purp.png')});  // greenish blue
    const centerSphere = new THREE.Mesh(geometry, material);
    scene.add(centerSphere);
    

    centerSphere.add(camera_scene);

    const junkOrbit = new THREE.Object3D();
    junkOrbit.scale.set(.1,.1,.1);
    centerSphere.add(junkOrbit);



    const junkObjects = []
    function addJunkObject(x, z, speed){

        const size = Math.random() * 3;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshPhongMaterial({color:0x334a34});
        const object = new THREE.Mesh(geometry, material);
        

        object.position.x = x;
        object.position.z = z;
        object.position.y = randomNumber(-3,3);

        object.rotation.x = randomNumber(0, 2*Math.PI);
        object.rotation.y = randomNumber(0, 2*Math.PI);
        object.rotation.z = randomNumber(0, 2*Math.PI);

        junkOrbit.add(object);
        
        junkObjects.push({
            object:object,
            speed: speed,
            state:0
        })


        return object;
    }


    function randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }  



    function createJunkObjectInRing(radius){
        let noise = radius/3;
        let r2 = radius*radius;

        const x = randomNumber(-radius, radius);

        const z = Math.sqrt(r2 - (x*x)) * (Math.round(Math.random()) * 2 - 1);
        
        addJunkObject(x, z+randomNumber(-noise,noise), randomNumber(.999,.9999));

        
    }



    function createJunkRing(radius){


        let noise = radius/3;
        let r2 = radius*radius;

        for(let x =-radius;x<radius;x++){
            const z = Math.sqrt(r2 - (x*x))
            
            addJunkObject(x, z+randomNumber(-noise,noise), randomNumber(.999,.9999));
            addJunkObject(x, -z+randomNumber(-noise,noise), randomNumber(.999,.9999));


        }
    }

    createJunkRing(30);
    createJunkRing(60);
    createJunkRing(90);




    createStars();

    function createStars(){


        for(let i=0;i<200;i++){
            
            const geo = new THREE.BoxGeometry(.05,.05,.05);
            const mat = new THREE.MeshBasicMaterial({color:0xffffff});
            const mesh = new THREE.Mesh(geo, mat);


            const radius = 17;
            let r2 = radius*radius;


            const x = randomNumber(-radius, radius);
            //const z = Math.sqrt(r2 - (x*x)) * (Math.round(Math.random()) * 2 - 1);
            const z = randomNumber(-radius, radius);
            const y = Math.sqrt(r2 - (x*x) - (z*z)) * (Math.round(Math.random()) * 2 - 1);


            mesh.position.set(x, y, z);


            scene.add(mesh);
        }

    }






    function render(time){
        let count = time;
        time *= 0.001;

        if(resizeRendererToDisplaYSize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }


        //Render code goes here

        {
        
            camera_scene.rotation.y = time*0.1
            camera_scene.position.y = 1 + Math.sin(time*.5);


            if(!MOUSE_STATE){
                mouse.x *= 0.99;
                mouse.y *= 0.99;
            }


            camera.lookAt(mouse.x * 0.002,-mouse.y * 0.002,0)


            /*
            if(MOUSE_STATE){
                camera.rotation.x +=  mouse.x * 0.0002
                camera.rotation.y +=  mouse.y * 0.0002
            }else{
                camera
            }

            */


            /*
            target.x = ( 1 - mouse.x ) * 0.002;
            target.y = ( 1 - mouse.y ) * 0.002;
            
            camera.rotation.y += 0.05 * ( target.y - camera.rotation.x );
            camera.rotation.x += 0.05 * ( target.x - camera.rotation.y );
            */

        }




        let gravity = time*0.1;
        
    
        { //moving object 


            for(var i=junkObjects.length-1;i>=0; i--){
                
                const block = junkObjects[i];

                if (Math.abs(block.object.position.x) < 8 && Math.abs(block.object.position.z) < 8){
                    junkOrbit.remove(block.object);
                    junkObjects.splice(i, 1);

                    createJunkObjectInRing(randomNumber(30,90));
                }


                if(block.state <= 0){
                    block.object.position.x = block.object.position.x * block.speed //* 0.99;
                    block.object.position.y = block.object.position.y * block.speed //* 0.99;
                    block.object.position.z = block.object.position.z * block.speed //* 0.99;

                }else{

                    block.object.position.x = block.object.position.x * randomNumber(1,1.001);
                    block.object.position.y = block.object.position.y * randomNumber(1,1.001);
                    block.object.position.z = block.object.position.z * randomNumber(1,1.001);
                }

                block.state -= 1

                if(Math.random() < 0.0005){
                    block.state = randomNumber(0,100);
                }


            }

        }





        // Render code ends here

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