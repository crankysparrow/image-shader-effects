import * as THREE from 'three'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const loader = new THREE.TextureLoader()
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const planeMaterial = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
})

class Scene {
	textures = []
	current = 0

	constructor(imgs) {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(
			10,
			this.width,
			this.height,
			0.1,
			100
		)
		this.camera.position.set(0, 0, 2)
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.width, this.height)
		this.imgs = imgs

		this.addImgs(() => {
			this.addPlane()
			this.addToDom()
		})
	}

	addToDom() {
		document.body.appendChild(this.renderer.domElement)
	}

	addPlane() {
		this.geometry = planeGeometry
		this.material = planeMaterial.clone()
		this.material.uniforms = {
			u_time: { value: 0 },
			texture1: { type: 't', value: this.textures[0] },
			texture2: { type: 't', value: this.textures[1] },
		}
		this.plane = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.plane)
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
			this.textures = res
			cb()
		})
	}

	onResize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.renderer.setSize(this.width, this.height)
		this.camera.aspect = this.width / this.height
		this.camera.updateProjectionMatrix()
	}
}

let imgs = []
let imgEls = document.querySelectorAll('img')
imgEls.forEach((img) => imgs.push(img.src))
console.log(imgs)
let scene = new Scene(imgs)
