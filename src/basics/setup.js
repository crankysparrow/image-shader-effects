import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

function createCamera() {
	// https://codepen.io/trusktr/pen/EbOoNx
	let perspective = 800
	let fov = (180 * (2 * Math.atan(innerHeight / 2 / perspective))) / Math.PI
	let camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(0, 0, perspective)
	return camera
}

function createMesh(texture) {
	let geometry = new THREE.PlaneGeometry(500, 333)
	let material = new THREE.MeshBasicMaterial({
		map: texture,
	})
	let mesh = new THREE.Mesh(geometry, material)
	return mesh
}

function createRenderer() {
	let renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
	// renderer.outputEncoding = THREE.sRGBEncoding
	document.body.appendChild(renderer.domElement)
	return renderer
}

function loadImageAsTexture(src) {
	const loader = new THREE.TextureLoader()
	let texture = loader.load(src)
	return texture
}

function createComposer(renderer, scene, camera) {
	let composer = new EffectComposer(renderer)
	let renderPass = new RenderPass(scene, camera)
	composer.addPass(renderPass)
	return composer
}

function createShaderPass(effect, composer) {
	let customPass = new ShaderPass(effect)
	customPass.renderToScreen = true
	composer.addPass(customPass)
	return customPass
}

export default makeStuff = {
	createCamera,
	createMesh,
	createRenderer,
	loadImageAsTexture,
	createComposer,
	createShaderPass,
}
