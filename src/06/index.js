import * as THREE from 'three'
import makeStuff from '../basics/setup.js'

import frag from './frag.glsl'
import vert from './vert.glsl'

if (module.hot) {
	module.hot.dispose(() => {
		window.location.reload()
	})
}

let width = window.innerWidth
let height = window.innerHeight

const loader = new THREE.TextureLoader()
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

let tex1 = loader.load('https://picsum.photos/1024?random=1')

let uniforms = {
	u_image: { type: 't', value: tex1 },
	u_time: { value: 0 },
	u_res: { value: new THREE.Vector2(width, height) },
}

let geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
let material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: vert,
	fragmentShader: frag,
	defines: {
		PR: window.devicePixelRatio.toFixed(1),
	},
})

let mesh = new THREE.Mesh(geometry, material)
mesh.scale.set(width, height, 1)
scene.add(mesh)

let camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 10)
camera.position.set(0, 0, 1)

renderer.render(scene, camera)

let mouse = new THREE.Vector2(0, 0)
document.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX
	mouse.y = e.clientY
})

function animate() {
	mesh.material.uniforms.u_time.value += 1
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()
