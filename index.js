var THREE             = require('three/three.min');
var createOrbitViewer = require('three-orbit-viewer')(THREE);
var glslify           = require('glslify');
var dat               = require('dat-gui');

var testVert = glslify(__dirname + '/shaders/test.vert');
var testFrag = glslify(__dirname + '/shaders/test.frag');

var time = 0;
var parameters = {
    size : 1,
}

var app = createOrbitViewer({
    clearColor: 0x000000,
    clearAlpha: 1.0,
    fov: 65,
    position: new THREE.Vector3(1, 1, -2)
})

var gui = new dat.GUI();
 
var geo = new THREE.PlaneBufferGeometry(2, 2);
var mat = new THREE.ShaderMaterial({
    uniforms : {
        time       : {type : 'f', value : 0},
        resolution : {type : 'v2', value: new THREE.Vector2(app.engine.width, app.engine.height)},
        size       : {type : 'f', value: 1}
    },
    vertexShader : testVert,
    fragmentShader : testFrag
})

var box = new THREE.Mesh(geo, mat)
app.scene.add(box)

app.on('tick', function(dt) {
    mat.uniforms.time.value = (time += dt) / 1000;
    mat.uniforms.size.value = parameters.size;
})

app.on('resize', function(w, h)
{
    mat.uniforms.resolution.value = new THREE.Vector2(w, h);
});

gui.add(parameters, "size", 1, 10);
