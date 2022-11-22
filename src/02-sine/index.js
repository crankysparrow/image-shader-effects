import * as THREE from 'three'

import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()

let theimage = document.getElementById('theimage')
let rect = theimage.getBoundingClientRect()
theimage.remove()

const renderer = new THREE.WebGLRenderer({})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(rect.width, rect.height)
document.body.appendChild(renderer.domElement)

let camera = new THREE.OrthographicCamera(
	rect.width / -2,
	rect.width / 2,
	rect.height / 2,
	rect.height / -2
)
camera.position.set(0, 0, 1)

let uniforms = {
	u_time: { value: 0 },
	u_res: { value: new THREE.Vector2(rect.width, rect.height) },
	u_mouse: { type: 'v2', value: new THREE.Vector2() },
}

let image = loader.load(theimage.src, () => {
	uniforms.u_image = { type: 't', value: image }
	let geometry = new THREE.PlaneBufferGeometry()
	let material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
		defines: {
			PR: window.devicePixelRatio.toFixed(1),
		},
	})
	let mesh = new THREE.Mesh(geometry, material)
	mesh.scale.set(rect.width, rect.height, 1)
	scene.add(mesh)
})

document.onmousemove = function (e) {
	if (e.target == renderer.domElement) {
		uniforms.u_mouse.value.x =
			(e.clientX - renderer.domElement.offsetLeft) / rect.width
		uniforms.u_mouse.value.y =
			(e.clientY - renderer.domElement.offsetTop) / rect.height
	} else {
		uniforms.u_mouse.value.x = 0
		uniforms.u_mouse.value.y = 0
	}
}

// render loop
const onAnimationFrameHandler = (timeStamp) => {
	renderer.render(scene, camera)
	uniforms.u_time.value++
	window.requestAnimationFrame(onAnimationFrameHandler)
}
window.requestAnimationFrame(onAnimationFrameHandler)
