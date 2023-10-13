import * as THREE from 'three'
import { throttle } from '../utils'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

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
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.views = []
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.renderer.setSize(this.width, this.height)
        this.mouse = new THREE.Vector2()

        window.addEventListener('scroll', () => this.onScroll())
        window.addEventListener('resize', () => this.onResize())
        window.addEventListener('mousemove', throttle(this.onMouse, 30))
    }

    onMouse = (e) => {
        let x = e.clientX
        let y = e.clientY
        this.mouse.x = x
        this.mouse.y = y
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
        this.renderer.setClearColor(0xeeeeee)
        this.renderer.setScissorTest(false)
        this.renderer.clear()

        this.renderer.setClearColor(0x000000)
        this.renderer.setScissorTest(true)

        let time = clock.getElapsedTime()

        this.views.forEach((view) => {
            if (!view.inView) return

            const { left, width, height } = view.bounds

            view.setMouse(this.mouse.x, this.mouse.y)
            view.setTime(time)
            this.renderer.setViewport(left, view.fromBottom, width, height)
            this.renderer.setScissor(left, view.fromBottom, width, height)
            this.renderer.render(view.scene, view.camera)
        })
    }
}

class View {
    constructor(el) {
        this.el = el
        this.inView = false
        this.animating = false
        this.fromBottom = 0

        this.bounds = this.el.getBoundingClientRect()
        this._effectSize = 150

        this.scene = new THREE.Scene()
        this.material = planeMaterial.clone()
        this.tex = loader.load(el.src)
        this.material.uniforms = {
            u_time: { value: 0 },
            u_radius: { value: this._effectSize / this.bounds.width },
            u_image: { type: 't', value: this.tex },
            u_mouse: { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
            u_res: {
                type: 'v2',
                value: new THREE.Vector2(this.bounds.width, this.bounds.height),
            },
        }
        this.mesh = new THREE.Mesh(geometry, this.material)
        this.scene.add(this.mesh)

        this.camera = new THREE.PerspectiveCamera(100, 1, 0.1, 3000)
        this.setCamera()
        this.setScale()
    }

    get effectSize() {
        return this._effectSize
    }

    set effectSize(size) {
        this._effectSize = size
        this.material.uniforms.u_radius.value = size / this.bounds.width
    }

    setScale() {
        this.mesh.scale.x = this.bounds.width
        this.mesh.scale.y = this.bounds.height
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
        this.material.uniforms.u_mouse.value.x = xOff / this.bounds.width
        this.material.uniforms.u_mouse.value.y = yOff / this.bounds.height
    }

    setTime(t) {
        this.material.uniforms.u_time.value = t
    }

    setCamera() {
        let { width, height } = this.bounds
        let fov = this.camera.fov * (Math.PI / 180)
        this.camera.position.z = height / 2 / Math.tan(fov / 2)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
    }
}

let parent = new ParentView()
let els = document.querySelectorAll('.img-wrap img')
for (let i = 0; i < els.length; i++) {
    let view = new View(els[i])
    parent.addView(view)
}

function animate() {
    parent.render()
    requestAnimationFrame(animate)
}

animate()

window.parent = parent
