import * as THREE from 'three'
import { throttle } from '../../utils'

import fragmentShader from '../../shaders/wavey/frag.glsl'
import vertexShader from '../../shaders/wavey/vert.glsl'

let animateAll = false

const clock = new THREE.Clock()
const loader = new THREE.TextureLoader()
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const planeMaterial = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
})

const canvas = document.getElementById('c')

class ParentView {
	constructor() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.views = []
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.renderer.setSize(this.width, this.height)
		this.mouse = new THREE.Vector2()

		window.addEventListener('scroll', this.onScroll.bind(this))
		window.addEventListener('resize', () => this.onResize())
		window.addEventListener('mousemove', throttle(this.onMouse, 30))
	}

	onMouse = (e) => {
		this.mouse.x = e.clientX
		this.mouse.y = e.clientY
	}

	onResize() {
		this.updateSize()
		this.views.forEach((view) => {
			view.resetBounds(this.height)
			view.setInView(this.width, this.height)
			view.setScale()
			view.setCamera()
		})
	}

	onScroll() {
		this.views.forEach((view) => {
			view.resetBounds(this.height)
			view.setInView(this.width, this.height)
		})
	}

	addView(view) {
		this.views.push(view)
		view.resetBounds(this.height)
		view.setInView(this.width, this.height)
	}

	updateSize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.renderer.setSize(this.width, this.height)
	}

	render() {
		this.renderer.setClearColor(0xeeeeee, 0.0)
		this.renderer.setScissorTest(false)
		this.renderer.clear()

		this.renderer.setClearColor(0x000000)
		this.renderer.setScissorTest(true)

		let time = clock.getElapsedTime()

		this.views.forEach((view) => {
			if (!view.inView) return

			const { left, width, height } = view.bounds
			const { fromBottom } = view

			view.setMouse(this.mouse.x, this.mouse.y)
			view.tick(time)

			this.renderer.setViewport(left, fromBottom, width, height)
			this.renderer.setScissor(left, fromBottom, width, height)
			this.renderer.render(view.scene, view.camera)
		})
	}
}

class View {
	inView = false
	hasMouse = false
	startTime = false
	waveAmountMax = 2
	fromBottom = 0
	fixCameraZ = true

	constructor(el) {
		this.el = el

		this.bounds = this.el.getBoundingClientRect()

		this.scene = new THREE.Scene()
		this.material = planeMaterial.clone()
		this.tex = loader.load(el.src)

		this.material.uniforms = {
			u_time: { value: 0 },
			u_amount: { value: 0 },
			u_image: { type: 't', value: this.tex },
			u_mouse: { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
			u_res: {
				type: 'v2',
				value: new THREE.Vector2(this.bounds.width, this.bounds.height),
			},
		}

		this.mesh = new THREE.Mesh(geometry, this.material)
		this.scene.add(this.mesh)

		this.camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000)
		this.camera.position.z = 50
		this.setCamera()
		this.setScale()
	}

	setScale() {
		if (this.fixCameraZ) {
			this.mesh.scale.x = this.camWidth
			this.mesh.scale.y = this.camHeight
		} else {
			this.mesh.scale.x = this.bounds.width
			this.mesh.scale.y = this.bounds.height
		}
	}

	resetBounds(height) {
		this.bounds = this.el.getBoundingClientRect()
		this.material.uniforms.u_res.value.x = this.bounds.width
		this.material.uniforms.u_res.value.y = this.bounds.height
		if (height) this.fromBottom = height - this.bounds.bottom
	}

	setInView(width, height) {
		this.inView = this.bounds.top < height && this.bounds.bottom > 0
	}

	setMouse(x, y) {
		let xOff = x - this.bounds.left
		let yOff = y - this.bounds.top

		if (
			xOff > 0 &&
			xOff < this.bounds.width &&
			yOff > 0 &&
			yOff < this.bounds.height
		) {
			if (!this.hasMouse) {
				this.hasMouse = true
			}
		} else {
			if (this.hasMouse) {
				this.hasMouse = false
			}
		}
	}

	tick(time) {
		this.material.uniforms.u_time.value = time

		if (animateAll || this.hasMouse) {
			this.material.uniforms.u_amount.value = this.waveAmountMax
		} else {
			this.material.uniforms.u_amount.value = 0
		}
	}

	setCameraMoveZ() {
		let { width, height } = this.bounds
		let fov = (this.camera.fov * Math.PI) / 180
		this.camera.aspect = width / height
		this.camera.position.z = height / 2 / Math.tan(fov / 2)
		this.camera.updateProjectionMatrix()
	}

	setCamera() {
		if (this.fixCameraZ) {
			this.setCameraFixedZ()
		} else {
			this.setCameraMoveZ()
		}
	}

	setCameraFixedZ() {
		let { width, height } = this.bounds
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()

		const fov = this.camera.fov * (Math.PI / 180)
		this.camHeight = Math.tan(fov / 2) * this.camera.position.z * 2
		this.camWidth = this.camHeight * this.camera.aspect
	}
}

let controlsAnimateAll = document.getElementById('controls-animate-all')
if (controlsAnimateAll.checked) {
	animateAll = true
} else {
	animateAll = false
}

controlsAnimateAll.addEventListener('change', (e) => {
	animateAll = e.target.checked
})

let parent = new ParentView()
window.parent = parent
let els = document.querySelectorAll('.img-wrap img')
els.forEach((el) => {
	let view = new View(el)
	parent.addView(view)
})

function animate() {
	parent.render()
	requestAnimationFrame(animate)
}

animate()

function scale(input, aMin, aMax, bMin, bMax) {
	return ((input - aMin) * (bMax - bMin)) / (aMax - aMin) + bMin
}
