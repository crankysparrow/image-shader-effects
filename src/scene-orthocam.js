import * as THREE from 'three'

export default class Scene {
	planes = []
	camWidth = 0
	camHeight = 0
	id = 1
	mouseX = 0
	mouseY = 0

	constructor() {
		let { innerWidth, innerHeight } = window
		this.windowWidth = innerWidth
		this.windowHeight = innerHeight

		this.scene = new THREE.Scene()
		this.camera = new THREE.OrthographicCamera(0, innerWidth, 0, -innerHeight)
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
	}

	addPlane(plane) {
		this.scene.add(plane.mesh)
		this.planes.push(plane)
		plane.resize()
	}

	addToDom() {
		document.body.appendChild(this.renderer.domElement)
	}

	tick() {
		let time = this.clock.getElapsedTime()
		this.planes.forEach((plane, i) => {
			let planeMouseX = scale(
				this.mouseX,
				0,
				this.windowWidth,
				plane.bounds.left,
				plane.bounds.right
			)
			let planeMouseY = scale(
				this.mouseY,
				0,
				this.windowHeight,
				plane.bounds.top,
				plane.bounds.bottom
			)
			plane.tick(time, planeMouseX, planeMouseY)

			// if (i === 0 && time > 3 && time < 3.1) console.log(plane)
		})

		this.renderer.render(this.scene, this.camera)
		window.requestAnimationFrame(() => this.tick())
	}

	mouse() {
		document.addEventListener('mousemove', (e) => {
			this.mouseX = e.clientX
			this.mouxeY = e.clientY
		})
	}

	onResize() {
		let { innerWidth, innerHeight } = window
		this.renderer.setSize(innerWidth, innerHeight)
		this.camera.right = innerWidth
		this.camera.bottom = -innerHeight
		this.camera.updateProjectionMatrix()

		this.windowWidth = innerWidth
		this.windowHeight = innerHeight

		this.planes.forEach((plane) => {
			plane.resize()
		})
	}

	onScroll() {
		this.planes.forEach((plane) => {
			plane.scroll()
		})
	}
}

function scale(input, aMin, aMax, bMin, bMax) {
	return ((input - aMin) * (bMax - bMin)) / (aMax - aMin) + bMin
}
