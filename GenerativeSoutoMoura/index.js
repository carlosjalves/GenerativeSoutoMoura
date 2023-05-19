/* global describe WFC WFCTool2D WFCTool3D THREE*/
var tilesets = {
    noodle3d: function(tool){
      
    tool.addTile([`\
    ___
    _@_
    ___`
    ,`\
    ___
    _@_
    ___`
    ,`\
    ___
    _@_
    ___`
    ],{transforms:['rx','rz']})
    
    tool.addTile([`\
    ___
    _#_
    ___`
    ,`\
    ___
    _#_
    ___`
    ,`\
    ___
    _#_
    ___`
    ],{transforms:['rx','rz']})
    
    tool.addTile([`\
    ___
    _@_
    ___`
    ,`\
    ___
    _@@
    ___`
    ,`\
    ___
    ___
    ___`
    ])
    
    tool.addTile([`\
    ___
    _#_
    ___`
    ,`\
    ___
    _##
    ___`
    ,`\
    ___
    ___
    ___`
    ])
    
    tool.addMaterial("@", new THREE.MeshLambertMaterial( { color: 0xffffff } ));
    tool.addMaterial("#", new THREE.MeshLambertMaterial( { color: 0xff4444 } ));  
    
    },
    
    }
    
    var worker;
    var canvas;
    var scene;
    var camera;
    var renderer;
    var root;
    
    function wfcDemo3D(tilesetName){
      if (worker){
        worker.terminate();
      }
      
      var tool = new WFCTool3D();
      tilesets[tilesetName](tool);
      
      var wave;
      
      if (canvas){
        canvas.style.display="none";
      }
      
      if (!scene){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set(10,8,10);
        camera.lookAt(0,0,0);
        renderer = new THREE.WebGLRenderer();
        
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.left = "0px";
        renderer.domElement.style.top = "0px";
        
        document.body.appendChild( renderer.domElement );
        
        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set(10,15,5);
        light.castShadow = true;
        
        scene.add( light );
        scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
    
        root = new THREE.Object3D();
        
        scene.add(root);
        
      }else{
        while (root.children.length){
          root.children.pop();
        }
      }
      renderer.domElement.style.display="block";
    
      
      var workerCode = function(){
        var wfc;
        var size;
        var increment;
        var multiply;
    
        console.log("connect")
    
        onmessage = function(e) {
          console.log(e)
          if (e.data.op == "init"){
            wfc = new WFC(e.data.wfcInput);
            size = e.data.initialSize;
            increment = e.data.increment;
            multiply = e.data.multiply
            main();
          }
        }
    
        function main(){
          setTimeout(main,1);
          if (!wfc){
            return
          }
          if (wfc.step()){
            wfc.expand([-size,-size,-size],[size,size,size]);
            size=Math.ceil((size+increment)*multiply);
          }
          postMessage({wave:wfc.readout()})
        }
      }
      
      console.log(tool.getTileFormulae())
      
      worker =new Worker(URL.createObjectURL(new Blob(["var WFC="+WFC.toString()+';('+workerCode.toString()+')()'])));// new Worker('worker.js');
    
      worker.postMessage({
        op:'init',
        wfcInput:tool.generateWFCInput(),
        initialSize:5,
        increment:0,
        multiply:1.5,
      })
    
      worker.onmessage = function(e){
        wave = e.data.wave;
      }
      
      var frame = 0;
      var done = false;
    
      function main(){
        requestAnimationFrame(main)
        if (wave){
          tool.plotWFCOutput(root,wave);
          root.rotation.setFromVector3(new THREE.Vector3(0,frame*0.01,0))
        }
        renderer.render( scene, camera );
        frame++;
      }
      main();
    
    }
    
    var select = document.createElement("select");
    for (var k in tilesets){
      var option = document.createElement("option");
      option.value = k;
      option.innerHTML = k;
      select.appendChild(option);
    }
    // select.style.position="absolute";
    // select.style.left="20px";
    // select.style.top="20px";
    select.style.background="rgba(0,0,0,0)";
    select.style.color="white"
    select.style.fontSize="16px"
    select.onchange = function(){
      if (select.value.includes("3d")){
        wfcDemo3D(select.value);
      }else{
        wfcDemo2D(select.value);
      }
    }
  

    select.value="noodle"