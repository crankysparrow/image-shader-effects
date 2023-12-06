import * as THREE from 'three'
import Scene from '../utils/scene'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const loader = new THREE.TextureLoader()
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const planeMaterial = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
})

const scene = new Scene()

class Plane {
	bounds = {}
	progress = 0
	animating = false
	startTime = false
	waveChangeDuration = 0.75

	constructor(el) {
		this.geometry = planeGeometry
		this.material = planeMaterial.clone()
		this.el = el
		let tex = loader.load(el.src)
		this.material.uniforms = {
			u_time: { value: 0 },
			u_image: { type: 't', value: tex },
			u_amount: { value: 0 },
		}
		this.mesh = new THREE.Mesh(this.geometry, this.material)

		this.resize()
		this.mouse()
	}

	mouse() {
		this.el.addEventListener('mouseenter', () => {
			this.animating = 'inc'
		})
		this.el.addEventListener('mouseleave', () => {
			this.animating = 'dec'
		})
	}

	setBounds() {
		const rect = this.el.getBoundingClientRect()
		this.bounds = {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
		}
	}

	setPos() {
		let scaleX = this.mesh.scale.x
		let scaleY = this.mesh.scale.y

		let posY = scene.camHeight / 2 - scaleY / 2
		posY -= (this.bounds.top / scene.windowHeight) * scene.camHeight

		let posX = -(scene.camWidth / 2) + scaleX / 2
		posX += (this.bounds.left / scene.windowWidth) * scene.camWidth

		this.mesh.position.x = posX
		this.mesh.position.y = posY
	}

	setScale() {
		this.mesh.scale.x = (scene.camWidth * this.bounds.width) / scene.windowWidth
		this.mesh.scale.y = (scene.camHeight * this.bounds.height) / scene.windowHeight
	}

	resize() {
		this.setBounds()
		this.setScale()
		this.setPos()
	}

	scroll() {
		this.setBounds()
		this.setPos()
	}

	tick(time) {
		this.material.uniforms.u_time.value = time

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

let els = document.querySelectorAll('.img-wrap img')

function initPlane(el) {
	let plane = new Plane(el)
	scene.addPlane(plane)
}
els.forEach((el) => {
	if (el.complete) {
		initPlane(el)
	} else {
		el.addEventListener('load', () => initPlane(el))
	}
})

function easeInQuart(x) {
	return x * x * x * x
}

function scale(input, aMin, aMax, bMin, bMax) {
	return ((input - aMin) * (bMax - bMin)) / (aMax - aMin) + bMin
}
