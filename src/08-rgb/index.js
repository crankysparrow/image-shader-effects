import * as THREE from 'three'
import Scene from '../scene-orthocam'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const loader = new THREE.TextureLoader()
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const planeMaterial = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
})

const scene = new Scene()
window.scene = scene

class Plane {
	bounds = {}
	progress = 0
	animating = false
	startTime = false
	waveChangeDuration = 0.75

	constructor(el) {
		this.el = el

		this.setBounds()
		this.geometry = new THREE.PlaneGeometry(
			this.bounds.width,
			this.bounds.height
		)
		this.material = planeMaterial.clone()

		let img = el.querySelector('img')
		let tex = loader.load(img.src)
		this.material.uniforms = {
			u_time: { value: 0 },
			u_image: { type: 't', value: tex },
			u_amount: { value: 0 },
			u_mouse: { type: 'v2', value: new THREE.Vector2() },
		}
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.resize()
	}

	setBounds() {
		const rect = this.el.getBoundingClientRect()
		this.bounds = {
			top: rect.top,
			left: rect.left,
			right: rect.right,
			bottom: rect.bottom,
			width: rect.width,
			height: rect.height,
			bottom: rect.bottom,
		}
	}

	setPos() {
		this.mesh.position.x = this.bounds.left + this.bounds.width / 2
		this.mesh.position.y = -this.bounds.top - this.bounds.height / 2
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

		if (this.animating) {
			if (!this.startTime) this.startTime = time

			let elapsed = time - this.startTime
			if (elapsed >= this.waveChangeDuration) {
				this.animating = false
				this.startTime = false
			} else {
				let newVal = scale(elapsed, 0, this.waveChangeDuration, 0, 1)
				this.material.uniforms.u_amount.value =
					this.animating === 'inc' ? newVal : 1 - newVal
			}
		}
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

function easeInQuart(x) {
	return x * x * x * x
}

function scale(input, aMin, aMax, bMin, bMax) {
	return ((input - aMin) * (bMax - bMin)) / (aMax - aMin) + bMin
}
