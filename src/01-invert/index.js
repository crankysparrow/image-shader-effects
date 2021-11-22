import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'

import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer({})
// const controls = new OrbitControls(camera, renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const light = new THREE.AmbientLight(0xffffff) // soft white light
scene.add(light)

// let perspective = 800
// let fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI
// let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
// camera.position.set(0, 0, 20)

let orthoCamera = makeOrthoCamera(window.innerWidth, window.innerHeight)
window.orthoCamera = orthoCamera
let uMouse = new THREE.Vector2()

let theimage = document.querySelector('#theimage')
let image = loader.load(theimage.src, () => {
	let mesh = createMesh(image, uMouse)
	let rect = theimage.getBoundingClientRect()
	let width = rect.width
	let height = rect.height

	theimage.remove()

	mesh.scale.set(width, height, 1)
	scene.add(mesh)
})

document.onmousemove = function (e) {
	uMouse.x = e.pageX / window.innerWidth
	uMouse.y = e.pageY / window.innerHeight
}

// render loop
const onAnimationFrameHandler = (timeStamp) => {
	// controls.update();
	renderer.render(scene, orthoCamera)
	window.requestAnimationFrame(onAnimationFrameHandler)
}
window.requestAnimationFrame(onAnimationFrameHandler)

// resize
const windowResizeHanlder = () => {
	const { innerHeight, innerWidth } = window
	renderer.setSize(innerWidth, innerHeight)

	if (orthoCamera) {
		updateOrthoCamera(orthoCamera, innerWidth, innerHeight)
	} else {
		camera.aspect = innerWidth / innerHeight
		camera.updateProjectionMatrix()
	}
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

function createMesh(image, uMouse) {
	let uniforms = {
		u_image: { type: 't', value: image },
		u_time: { value: 0 },
		u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
		u_mouse: { type: 'v2', value: uMouse },
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

function makeOrthoCamera(width, height) {
	let camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 10)
	camera.position.set(0, 0, 1)
	return camera
}

function updateOrthoCamera(camera, width, height) {
	camera.left = width / -2
	camera.right = width / 2
	camera.top = height / 2
	camera.bottom = height / -2
	camera.updateProjectionMatrix()
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
