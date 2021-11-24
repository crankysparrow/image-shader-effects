import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'

import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()

let sizes = {}

let theimage = document.querySelector('#theimage')
let rect = theimage.getBoundingClientRect()
sizes.width = rect.width
sizes.height = rect.height
theimage.remove()

const renderer = new THREE.WebGLRenderer({})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

sizes.offsetTop = renderer.domElement.offsetTop
sizes.offsetLeft = renderer.domElement.offsetLeft
console.log(sizes)

let orthoCamera = makeOrthoCamera(sizes.width, sizes.height)

const light = new THREE.AmbientLight(0xffffff) // soft white light
scene.add(light)

let uniforms = {
	u_time: { value: 0 },
	u_res: { value: new THREE.Vector2(sizes.width, sizes.height) },
	u_mouse: { type: 'v2', value: new THREE.Vector2() },
}

let image = loader.load(theimage.src, () => {
	let mesh = createMesh(image, uniforms)
	mesh.scale.set(sizes.width, sizes.height, 1)
	scene.add(mesh)
})

document.onmousemove = function (e) {
	if (e.target == renderer.domElement) {
		uniforms.u_mouse.value.x = (e.clientX - sizes.offsetLeft) / sizes.width
		uniforms.u_mouse.value.y = (e.clientY - sizes.offsetTop) / sizes.height
	} else {
		uniforms.u_mouse.value.x = 0
		uniforms.u_mouse.value.y = 0
	}
}

// render loop
const onAnimationFrameHandler = (timeStamp) => {
	// controls.update();
	renderer.render(scene, orthoCamera)
	uniforms.u_time.value++
	window.requestAnimationFrame(onAnimationFrameHandler)
}
window.requestAnimationFrame(onAnimationFrameHandler)

// resize
const windowResizeHanlder = () => {
	const { innerHeight, innerWidth } = window
	// renderer.setSize(innerWidth, innerHeight)

	if (orthoCamera) {
		// updateOrthoCamera(orthoCamera, innerWidth, innerHeight)
	} else {
		camera.aspect = innerWidth / innerHeight
		camera.updateProjectionMatrix()
	}
}
windowResizeHanlder()
window.addEventListener('resize', windowResizeHanlder)

function createMesh(image, uniforms) {
	uniforms.u_image = { type: 't', value: image }

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
