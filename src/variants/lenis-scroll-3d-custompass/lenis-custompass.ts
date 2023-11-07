import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import Lenis from '@studio-freight/lenis'

import fragmentShader from '../../shaders/bubble/frag.glsl'
import vertexShader from '../../shaders/bubble/vert.glsl'

const loader = new THREE.TextureLoader()
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

const lerp = (a: number, b: number, n: number) => a + (b - a) * n

class Scene {
	views: View[] = []
	camWidth = 0
	camHeight = 0
	doRender = true
	width = window.innerWidth
	height = window.innerHeight
	renderer: THREE.WebGLRenderer
	camera: THREE.PerspectiveCamera
	scene = new THREE.Scene()
	mouse = new THREE.Vector2()
	followMouse = new THREE.Vector2()
	mousePrev = new THREE.Vector2()
	mouseSpeed = 0
	mouseVel = 0
	mouseHasMoved = false
	mouseAngle = 0
	composer: EffectComposer
	renderPass: RenderPass
	customPass: ShaderPass
	_effectSize = 120
	_type = 1

	constructor(canvas: HTMLCanvasElement) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.width, this.height)

		this.camera = new THREE.PerspectiveCamera(10, this.width / this.height, 0.1, 100)
		this.camera.position.z = 50

		this.composer = new EffectComposer(this.renderer)
		this.renderPass = new RenderPass(this.scene, this.camera)
		this.composer.addPass(this.renderPass)

		this.customPass = new ShaderPass({
			uniforms: {
				tDiffuse: { value: null },
				u_res: { value: new THREE.Vector2(this.width, this.height) },
				u_mouse: { value: new THREE.Vector2(-10, -10) },
				u_time: { value: 0 },
				u_radius: { value: this._effectSize / this.width },
				u_vel: { value: 0 },
				u_angle: { value: Math.PI * 0.75 },
				u_type: { value: this._type },
			},
			vertexShader,
			fragmentShader,
			defines: {
				PR: window.devicePixelRatio.toFixed(1),
			},
		})
		this.customPass.renderToScreen = true
		this.composer.addPass(this.customPass)

		this.onResize()

		// window.addEventListener('scroll', this.onScroll)
		window.addEventListener('resize', this.onResize)
		document.body.addEventListener('mousemove', this.onMouse)
	}

	get effectSize() {
		return this._effectSize
	}

	set effectSize(size) {
		this._effectSize = size
		this.customPass.uniforms.u_radius.value = size / this.width
	}

	get type() {
		return this._type
	}

	set type(type) {
		this._type = type
		this.customPass.uniforms.u_type.value = type
	}

	onScroll = () => {
		this.doRender = true
		this.views.forEach((view) => view.scroll())
	}

	onMouse = (e: MouseEvent) => {
		this.doRender = true

		this.mouse.x = e.clientX / this.width
		this.mouse.y = 1.0 - e.clientY / this.height

		this.mouseHasMoved = true
	}

	getMouseSpeed = () => {
		this.mouseSpeed = this.mouse.distanceTo(this.mousePrev)

		this.mouseVel = lerp(this.mouseVel, this.mouseSpeed, 0.05)
		this.followMouse.x = lerp(this.followMouse.x, this.mouse.x, 0.06)
		this.followMouse.y = lerp(this.followMouse.y, this.mouse.y, 0.06)

		let angle = Math.atan2(
			this.followMouse.y - this.mousePrev.y,
			this.followMouse.x - this.mousePrev.x
		)
		this.mouseAngle = lerp(this.mouseAngle, angle, 0.06)

		this.mousePrev.x = this.mouse.x
		this.mousePrev.y = this.mouse.y
	}

	onResize = () => {
		this.doRender = true
		let { innerWidth, innerHeight } = window
		this.renderer.setSize(innerWidth, innerHeight)
		this.camera.aspect = innerWidth / innerHeight
		this.camera.updateProjectionMatrix()

		let fov = (this.camera.fov * Math.PI) / 180
		this.camHeight = Math.tan(fov) * this.camera.position.z
		this.camWidth = this.camHeight * this.camera.aspect

		this.width = innerWidth
		this.height = innerHeight

		this.views.forEach((view) => view.resize())
	}

	addImage = (image: HTMLImageElement) => {
		let view = new View(image, this, () => (this.doRender = true))
		this.scene.add(view.mesh)
		this.views.push(view)
		view.resize()
	}

	render = () => {
		if (this.doRender) {
			this.getMouseSpeed()
			this.customPass.uniforms.u_mouse.value = {
				x: this.followMouse.x,
				y: this.followMouse.y,
			}
			this.customPass.uniforms.u_angle.value = this.mouseAngle
			this.customPass.uniforms.u_vel.value = Math.min(this.mouseVel, 0.1)
			this.composer.render()

			if (this.mouseVel > 0.001) {
				this.mouseVel *= 0.99
			} else {
				this.mouseVel = 0
				this.doRender = false
			}
		}
	}
}

class View {
	bounds = { top: 0, width: 0, height: 0, left: 0 }
	scene: Scene
	el: HTMLImageElement
	material = new THREE.MeshBasicMaterial()
	mesh: THREE.Mesh

	constructor(image: HTMLImageElement, scene: Scene, loadTexCb?: () => void) {
		this.scene = scene
		this.el = image
		this.bounds = this.el.getBoundingClientRect()
		this.mesh = new THREE.Mesh(geometry, this.material)

		let texture = loader.load(this.el.src, loadTexCb)
		this.material.map = texture
	}

	setBounds = () => {
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

		let posY = (this.scene.camHeight - scaleY) / 2
		posY -= (this.bounds.top / this.scene.height) * this.scene.camHeight

		let posX = (-this.scene.camWidth + scaleX) / 2
		posX += (this.bounds.left / this.scene.width) * this.scene.camWidth

		this.mesh.position.x = posX
		this.mesh.position.y = posY
	}

	setScale = () => {
		this.mesh.scale.x = (this.scene.camWidth * this.bounds.width) / this.scene.width
		this.mesh.scale.y = (this.scene.camHeight * this.bounds.height) / this.scene.height
	}

	resize = () => {
		this.setBounds()
		this.setScale()
		this.setPos()
	}

	scroll = () => {
		this.setBounds()
		this.setPos()
	}
}

function init() {
	const lenis = new Lenis()

	const canvas = document.getElementById('c')
	if (!(canvas instanceof HTMLCanvasElement)) return

	const scene = new Scene(canvas)
	document.querySelectorAll<HTMLImageElement>('.img-wrap img').forEach((el) => scene.addImage(el))

	lenis.on('scroll', () => {
		scene.onScroll()
	})

	const typeSel = document.getElementById('type-sel')
	if (typeSel instanceof HTMLSelectElement) {
		typeSel.addEventListener('change', (e) => {
			scene.type = parseInt(typeSel.value)
		})
	}

	function animate(time = 0) {
		lenis.raf(time)
		scene.render()
		requestAnimationFrame(animate)
	}

	animate()
}

init()
