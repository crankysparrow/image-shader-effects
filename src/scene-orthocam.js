import * as THREE from 'three'

export default class Scene {
	planes = []
	mouseX = 0
	mouseY = 0

	constructor() {
		let { innerWidth, innerHeight } = window

		this.windowWidth = innerWidth
		this.windowHeight = innerHeight
		this.scene = new THREE.Scene()
		this.camera = new THREE.OrthographicCamera(0, 1, 0, -1)
		this.camera.position.set(0, 0, 1)

		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(innerWidth, innerHeight)
		this.clock = new THREE.Clock()

		this.addToDom()
		this.onResize()
		window.requestAnimationFrame(() => this.tick())
		window.addEventListener('resize', () => this.onResize())
		window.addEventListener('scroll', () => this.onScroll())
		window.addEventListener('mousemove', (e) => this.onMouse(e))
		window.addEventListener('mousemove', (e) => this.firstMouseMove(e), {
			once: true,
		})
	}

	firstMouseMove(e) {
		this.mouseX = e.clientX / this.windowWidth
		this.mouseY = e.clientY / this.windowHeight

		this.planes.forEach((plane) => {
			let xOff = this.mouseX - plane.bounds.left
			plane.mouseX = xOff / plane.bounds.scaleX
			let yOff = this.mouseY - plane.bounds.top
			plane.mouseY = yOff / plane.bounds.scaleY
		})
	}

	addPlane(plane) {
		this.scene.add(plane.mesh)
		this.planes.push(plane)
	}

	addToDom() {
		document.body.appendChild(this.renderer.domElement)
	}

	tick() {
		let time = this.clock.getElapsedTime()
		this.planes.forEach((plane, i) => {
			let xOff = this.mouseX - plane.bounds.left
			let planeMouseX = xOff / plane.bounds.scaleX
			let yOff = this.mouseY - plane.bounds.top
			let planeMouseY = yOff / plane.bounds.scaleY

			plane.tick(time, planeMouseX, planeMouseY)
			// plane.tick(time, 0.5, 0.5)
			// planeMouseX goes from 0 - 1 left to right over image
			// planeMouseY goes from 0 - 1 from top to bottom of image
		})

		this.renderer.render(this.scene, this.camera)
		window.requestAnimationFrame(() => this.tick())
	}

	onMouse(e) {
		this.mouseX = e.clientX / this.windowWidth
		this.mouseY = e.clientY / this.windowHeight
	}

	onResize() {
		let { innerWidth, innerHeight } = window
		this.renderer.setSize(innerWidth, innerHeight)
		this.camera.updateProjectionMatrix()

		this.windowWidth = innerWidth
		this.windowHeight = innerHeight

		this.planes.forEach((plane) => {
			plane.resize(innerWidth, innerHeight)
		})
	}

	onScroll() {
		this.planes.forEach((plane) => {
			plane.scroll(this.windowWidth, this.windowHeight)
		})
	}
}

function scale(input, aMin, aMax, bMin, bMax) {
	return ((input - aMin) * (bMax - bMin)) / (aMax - aMin) + bMin
}

function lerp(a, b, t) {
	return a + (b - a) * t
}
