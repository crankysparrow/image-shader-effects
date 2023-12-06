import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import frag2 from './frag2.glsl'
import frag from './frag.glsl'
import vert from './vert.glsl'

const loader = new THREE.TextureLoader()

var camera, scene, renderer, composer, renderPass, customPass
var geometry,
	material,
	mesh,
	texture,
	u_mouse = new THREE.Vector2(0, 0)

let theimage = document.getElementById('texture')
texture = loader.load(theimage.src)

init()
animate()

function init() {
	scene = new THREE.Scene()

	// https://codepen.io/trusktr/pen/EbOoNx
	let perspective = 800
	let fov = (180 * (2 * Math.atan(innerHeight / 2 / perspective))) / Math.PI
	camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(0, 0, perspective)

	geometry = new THREE.PlaneGeometry(500, 333)
	material = new THREE.MeshBasicMaterial({
		map: texture,
	})
	mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
	// renderer.outputEncoding = THREE.sRGBEncoding
	document.body.appendChild(renderer.domElement)

	window.renderer = renderer

	// post processing
	composer = new EffectComposer(renderer)
	renderPass = new RenderPass(scene, camera)
	composer.addPass(renderPass)

	var myEffect = {
		uniforms: {
			tDiffuse: { value: null },
			u_res: {
				value: new THREE.Vector2(window.innerWidth, window.innerHeight),
			},
			// resolution: { value: new THREE.Vector2(1, window.innerHeight / window.innerWidth) },
			u_mouse: { value: new THREE.Vector2(-10, -10) },
			u_time: { value: 0 },
		},
		vertexShader: vert,
		fragmentShader: frag,
		defines: {
			PR: window.devicePixelRatio.toFixed(1),
		},
	}

	customPass = new ShaderPass(myEffect)
	customPass.renderToScreen = true
	composer.addPass(customPass)
}

document.addEventListener('mousemove', (e) => {
	// mousemove / touchmove
	// u_mouse.x = e.clientX / window.innerWidth
	// u_mouse.y = 1 - e.clientY / window.innerHeight
	u_mouse.x = e.clientX
	u_mouse.y = e.clientY
})

function animate() {
	customPass.uniforms.u_mouse.value = u_mouse
	customPass.uniforms.u_time.value++
	requestAnimationFrame(animate)

	// renderer.render(scene, camera)
	composer.render()
}
