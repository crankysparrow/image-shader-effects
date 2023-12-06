import * as THREE from 'three'

import frag from './frag.glsl'
import vert from './vert.glsl'

const size = 800

let width = size
let height = size

const loader = new THREE.TextureLoader()
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

let tex1 = loader.load(`https://picsum.photos/${size}?random=1`)
let tex2 = loader.load(`https://picsum.photos/${size}?random=2`)

let uniforms = {
	u_image: { type: 't', value: tex1 },
	u_image2: { type: 't', value: tex2 },
	u_time: { value: 0 },
	u_res: { value: new THREE.Vector2(width, height) },
	u_mouse: { value: new THREE.Vector2(0, 0) },
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
window.mouse = mouse
let rect = renderer.domElement.getBoundingClientRect()
window.rect = rect

document.addEventListener('mousemove', (e) => {
	mouse.x = e.pageX - rect.left
	mouse.y = e.pageY - rect.top
})

function animate() {
	mesh.material.uniforms.u_time.value += 1
	mesh.material.uniforms.u_mouse.value = mouse
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()

const windowResizeHandler = () => {
	rect = renderer.domElement.getBoundingClientRect()
	// const { innerWidth, innerHeight } = window
	// renderer.setSize(innerWidth, innerHeight)

	// camera.left = innerWidth / -2
	// camera.right = innerWidth / 2
	// camera.top = innerHeight / 2
	// camera.bottom = innerHeight / -2

	// mesh.material.uniforms.u_res.value = new THREE.Vector2(innerWidth, innerHeight)
	// mesh.scale.set(innerWidth, innerHeight, 1)

	// camera.updateProjectionMatrix()
}

window.addEventListener('resize', windowResizeHandler)
