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
sizes.offsetTop = rect.top
sizes.offsetLeft = rect.left
sizes.offsetRight = rect.right
sizes.offsetBottom = rect.bottom
sizes.rendererWidth = window.innerWidth
sizes.rendererHeight = window.innerHeight

const renderer = new THREE.WebGLRenderer({})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.rendererWidth, sizes.rendererHeight)
document.body.appendChild(renderer.domElement)

let camera = new THREE.OrthographicCamera(
	sizes.rendererWidth / -2,
	sizes.rendererWidth / 2,
	sizes.rendererHeight / 2,
	sizes.rendererHeight / -2,
	1,
	10
)
camera.position.set(0, 0, 1)

const light = new THREE.AmbientLight(0xffffff) // soft white light
scene.add(light)

let image = loader.load(theimage.src)
let uniforms = {
	u_time: { value: 0 },
	u_res: { value: new THREE.Vector2(sizes.rendererWidth, sizes.rendererHeight) },
	u_mouse: { type: 'v2', value: new THREE.Vector2() },
	u_image: { type: 't', value: image },
}

let geometry = new THREE.PlaneBufferGeometry(sizes.width, sizes.height, 1, 1)
let material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	defines: {
		PR: window.devicePixelRatio.toFixed(1),
	},
})

let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

document.onmousemove = function (e) {
	uniforms.u_mouse.value.x = e.clientX
	uniforms.u_mouse.value.y = e.clientY
}

// render loop
const onAnimationFrameHandler = (timeStamp) => {
	// controls.update();
	renderer.render(scene, camera)
	uniforms.u_time.value++
	window.requestAnimationFrame(onAnimationFrameHandler)
}
window.requestAnimationFrame(onAnimationFrameHandler)

// resize
const windowResizeHanlder = () => {
	const { innerHeight, innerWidth } = window
	renderer.setSize(innerWidth, innerHeight)
	camera.left = innerWidth / -2
	camera.right = innerWidth / 2
	camera.top = innerHeight / 2
	camera.bottom = innerHeight / -2
	camera.updateProjectionMatrix()
}
windowResizeHanlder()
window.addEventListener('resize', windowResizeHanlder)

function makePerspectiveCamera(width, height) {
	let camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000)
	camera.position.set(0, 0, 20)
	return camera
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
