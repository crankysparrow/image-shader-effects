import * as THREE from 'three'

export default class Scene {
    planes = []
    camWidth = 0
    camHeight = 0
    id = 1

    constructor() {
        let { innerWidth, innerHeight } = window
        this.windowWidth = innerWidth
        this.windowHeight = innerHeight

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 5)
        this.camera.position.z = 2

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
        this.planes.forEach((plane) => plane.tick(time))

        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => this.tick())
    }

    onResize() {
        let { innerWidth, innerHeight } = window
        this.renderer.setSize(innerWidth, innerHeight)
        this.camera.aspect = innerWidth / innerHeight
        this.camera.updateProjectionMatrix()

        const vFov = (this.camera.fov * Math.PI) / 180
        const camHeight = Math.tan(vFov) * this.camera.position.z
        const camWidth = camHeight * this.camera.aspect

        this.camWidth = camWidth
        this.camHeight = camHeight
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
