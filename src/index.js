import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'

import vertexShader from './shaders/1-vert.glsl'

// const vertexShader = `varying vec2 v_uv;

// void main() {
//     v_uv = uv;

//     gl_Position = projectionMatrix * modelViewMatrix *
// 		vec4(position, 1.0);
// }`;

const fragmentShader = `
 uniform vec2 u_res;
 
 uniform sampler2D u_image;
 
 uniform float u_time;
 
 varying vec2 v_uv;
 
 void main() {
   vec2 res = u_res * PR;
   vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
   st.y *= u_res.y / u_res.x;
 
   vec4 image = texture2D(u_image, v_uv);
   gl_FragColor = image;
 }
 `

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer({})
// const controls = new OrbitControls(camera, renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const light = new THREE.AmbientLight(0xffffff) // soft white light
scene.add(light)

let perspective = 800
let fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 0, 10)

let theimage = document.querySelector('#theimage')
let image = loader.load(theimage.src, () => {
	let mesh = createMesh(image)

	// imageEl.style.opacity = '0'
	// imageEl.style.width = '500px'

	let rect = theimage.getBoundingClientRect()
	let width = rect.width
	let height = rect.height

	theimage.remove()

	mesh.scale.set(width / 50, height / 50, 1)
	scene.add(mesh)
})

// render loop
const onAnimationFrameHandler = (timeStamp) => {
	// controls.update();
	renderer.render(scene, camera)
	window.requestAnimationFrame(onAnimationFrameHandler)
}
window.requestAnimationFrame(onAnimationFrameHandler)

// resize
const windowResizeHanlder = () => {
	const { innerHeight, innerWidth } = window
	renderer.setSize(innerWidth, innerHeight)
	camera.aspect = innerWidth / innerHeight
	camera.updateProjectionMatrix()
}
windowResizeHanlder()
window.addEventListener('resize', windowResizeHanlder)

// dom
document.body.style.margin = 0
document.body.appendChild(renderer.domElement)

function randomImg() {
	// url for random picture of square size of 256
	const url_base = 'https://picsum.photos/256?random='

	// index to access in the picsum as random
	let index = 128
	const img_plane = new Image()
	img_plane.crossOrigin = '' // ask for CORS permission
	img_plane.src = url_base + index + '.jpg' // get the image!
	// texture variable &activation to update it
	const texture_plane = new THREE.Texture(img_plane)
	img_plane.onload = () => {
		texture_plane.needsUpdate = true
	}

	// plane to display
	const geometry_plane = new THREE.PlaneGeometry(512, 512, 1)
	const mesh_plane = new THREE.Mesh(
		geometry_plane,
		new THREE.MeshLambertMaterial({ map: texture_plane })
	)

	return mesh_plane
}

function createMesh() {
	let uniforms = {
		u_image: { type: 't', value: image },
		u_time: { value: 0 },
		u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
	}

	let geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
	let material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		defines: {
			PR: window.devicePixelRatio.toFixed(1),
		},
	})

	let mesh = new THREE.Mesh(geometry, material)

	return mesh
}

function orthoCamera() {
	let camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 10)
	camera.position.set(0, 0, 1)
	return camera
}

function cameraGUI() {
	let gui = new dat.GUI()
	let camGUI = gui.addFolder('Camera')
	console.log(camera)
	camGUI.add(camera, 'left', -width, width).onChange(function (val) {
		camera.left = val
		camera.updateProjectionMatrix()
	})
	camGUI.add(camera, 'right', -width, width).onChange(function (val) {
		camera.right = val
		camera.updateProjectionMatrix()
	})
	camGUI.add(camera, 'top', -height, height).onChange(function (val) {
		camera.top = val
		camera.updateProjectionMatrix()
	})
	camGUI.add(camera, 'bottom', -height, height).onChange(function (val) {
		camera.bottom = val
		camera.updateProjectionMatrix()
	})

	camGUI.open()
}
