import * as THREE from 'three'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const loader = new THREE.TextureLoader()
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32)

class Scene {
	textureData = []
	current = -1
	next = 1

	constructor(el, imgs) {
		this.el = el
		this.width = el.offsetWidth
		this.height = el.offsetHeight
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(
			10,
			this.width / this.height,
			0.1,
			100
		)
		this.camera.position.z = 5
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.width, this.height)
		this.imgs = imgs

		this.clock = new THREE.Clock()

		this.addImgs(() => {
			this.addPlane()
			this.addToDom()
			this.onResize()
			window.requestAnimationFrame(() => this.tick())
			window.addEventListener('resize', () => this.onResize())
		})
	}

	addToDom() {
		this.el.appendChild(this.renderer.domElement)
	}

	tick() {
		let time = this.clock.getElapsedTime()
		let len = this.textureData.length
		let progress = Math.max(0, (time % 4) - 2) / 2
		let slide = Math.floor((time / 4) % len)

		if (slide !== this.current) {
			let next = (slide + 1) % len

			this.material.uniforms.u_tex1.value = this.textureData[slide].texture
			this.material.uniforms.u_tex2.value = this.textureData[next].texture

			this.material.uniforms.u_scale1.value = this.textureData[slide].scale
			this.material.uniforms.u_scale2.value = this.textureData[next].scale

			this.current = slide
			this.next = next
		}
		this.material.uniforms.u_time.value = time
		this.renderer.render(this.scene, this.camera)
		window.requestAnimationFrame(() => this.tick())
	}

	addPlane() {
		this.geometry = planeGeometry
		this.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				u_time: { value: 0 },
				u_tex1: { type: 't', value: this.textureData[0].texture },
				u_tex2: { type: 't', value: this.textureData[1].texture },
				u_res: { value: new THREE.Vector2(this.width, this.height) },
				u_scale1: { value: new THREE.Vector2() },
				u_scale2: { value: new THREE.Vector2() },
			},
		})
		this.plane = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.plane)
		console.log(this)
	}

	addImgs(cb) {
		const promises = []
		this.imgs.forEach((url, i) => {
			let promise = new Promise((resolve) => {
				loader.load(url, resolve)
			})
			promises.push(promise)
		})

		Promise.all(promises).then((res) => {
			res.forEach((tex) => {
				let aspect = tex.image.width / tex.image.height
				this.textureData.push({
					texture: tex,
					aspect,
					scale: this.setScale(aspect),
				})
			})
			cb()
		})
	}

	setScale(aspectImg) {
		let aspectPlane = this.camera.aspect
		let scaleX, scaleY

		if (aspectPlane > aspectImg) {
			scaleX = 1
			scaleY = aspectImg / aspectPlane
		} else {
			scaleX = aspectPlane / aspectImg
			scaleY = 1
		}

		return { x: scaleX, y: scaleY }
	}

	onResize() {
		this.width = this.el.offsetWidth
		this.height = this.el.offsetHeight
		this.renderer.setSize(this.width, this.height)
		this.camera.aspect = this.width / this.height

		this.material.uniforms.u_res.value.x = this.width
		this.material.uniforms.u_res.value.y = this.height

		this.textureData.forEach((item) => {
			item.scale = this.setScale(item.aspect)
		})
		this.current = false

		let height = 1
		let distance = this.camera.position.z
		this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * distance))

		this.plane.scale.x = this.camera.aspect
		this.plane.scale.y = 1

		this.camera.updateProjectionMatrix()
	}
}

let imgs = []
let imgEls = document.querySelectorAll('img')
imgEls.forEach((img) => imgs.push(img.src))

let el = document.getElementById('slider-container')
let scene = new Scene(el, imgs)
