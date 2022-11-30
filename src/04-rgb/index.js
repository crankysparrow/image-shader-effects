import * as THREE from 'three'
import Scene from '../scene-orthocam'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const loader = new THREE.TextureLoader()
const planeGeometry = new THREE.PlaneGeometry(1, 1)
const planeMaterial = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
	defines: {
		PR: window.devicePixelRatio.toFixed(1),
	},
})

const scene = new Scene()
window.scene = scene

class Plane {
	bounds = {}

	constructor(el) {
		this.el = el
		this.img = el.querySelector('img')
		this.geometry = planeGeometry
		this.material = planeMaterial.clone()

		this.mesh = new THREE.Mesh(this.geometry, this.material)

		let tex = loader.load(this.img.src)
		this.setBounds()
		this.setPos()

		this.material.uniforms = {
			u_time: { value: 0 },
			u_image: { type: 't', value: tex },
			u_amount: { value: 0 },
			u_mouse: { type: 'v2', value: new THREE.Vector2() },
			u_res: {
				type: 'v2',
				value: new THREE.Vector2(this.bounds.width, this.bounds.height),
			},
		}
	}

	setBounds() {
		const rect = this.img.getBoundingClientRect()
		this.bounds = {
			left: rect.left / scene.windowWidth,
			right: rect.right / scene.windowWidth,
			width: rect.width,
			scaleX: rect.width / scene.windowWidth,
			top: rect.top / scene.windowHeight,
			bottom: rect.bottom / scene.windowHeight,
			height: rect.height,
			scaleY: rect.height / scene.windowHeight,
		}
	}

	setPos() {
		this.mesh.scale.set(this.bounds.scaleX, this.bounds.scaleY)
		this.mesh.position.x = this.bounds.left + this.bounds.scaleX / 2
		this.mesh.position.y = -this.bounds.top - this.bounds.scaleY / 2
	}

	resize() {
		this.setBounds()
		this.setPos()
	}

	scroll() {
		this.setBounds()
		this.setPos()
	}

	tick(time, mouseX, mouseY) {
		this.material.uniforms.u_time.value = time
		this.material.uniforms.u_mouse.value = [mouseX, mouseY]
	}
}

let els = document.querySelectorAll('.plane-wrap')
window.planes = []

function initPlane(el) {
	let plane = new Plane(el)
	scene.addPlane(plane)
	window.planes.push(plane)
}
els.forEach((el) => {
	let img = el.querySelector('img')
	if (img.complete) {
		initPlane(el)
	} else {
		img.addEventListener('load', () => initPlane(el))
	}
})
