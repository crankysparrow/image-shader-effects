import * as THREE from 'three'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const scenes = []

const clock = new THREE.Clock()
const loader = new THREE.TextureLoader()
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
const planeMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
})
const canvas = document.getElementById('c')
let renderer

init()

function init() {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    let views = document.querySelectorAll('.img-wrap img')
    for (let i = 0; i < views.length; i++) {
        let scene = new THREE.Scene()
        let material = planeMaterial.clone()
        let tex = loader.load(views[i].src)
        material.uniforms = {
            u_time: { value: 0 },
            u_image: { type: 't', value: tex },
            u_amount: { value: 0 },
        }

        let mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        const camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000)

        let clientHeight = views[i].clientHeight
        let clientWidth = views[i].clientWidth
        let fov = camera.fov * (Math.PI / 180)
        let z = clientHeight / 2 / Math.tan(fov / 2)

        camera.position.z = z
        camera.aspect = clientWidth / clientHeight
        camera.updateProjectionMatrix()

        scene.userData.animating = false
        scene.userData.startTime = false

        scene.userData.view = views[i]
        scene.userData.geometry = geometry
        scene.userData.material = material
        scene.userData.mesh = mesh
        scene.userData.camera = camera

        scenes.push(scene)
    }

    animate()
}

function updateSize() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    if (canvas.width !== width || canvas.height != height) {
        renderer.setSize(width, height, false)
    }
}

function render() {
    updateSize()

    renderer.setClearColor(0xaaaaaa)
    renderer.setScissorTest(false)
    renderer.clear()

    renderer.setClearColor(0x000000)
    renderer.setScissorTest(true)

    scenes.forEach((scene) => {
        const { bottom, top, right, left, width, height } =
            scene.userData.view.getBoundingClientRect()
        if (
            bottom < 0 ||
            top > renderer.domElement.clientHeight ||
            right < 0 ||
            left > renderer.domElement.clientWidth
        ) {
            return
        }

        let time = clock.getElapsedTime()
        scene.userData.material.uniforms.u_time.value = time

        scene.userData.camera.aspect = width / height
        scene.userData.camera.updateProjectionMatrix()
        const yUpBottom = renderer.domElement.clientHeight - bottom

        scene.userData.mesh.scale.x = width
        scene.userData.mesh.scale.y = height

        renderer.setViewport(left, yUpBottom, width, height)
        renderer.setScissor(left, yUpBottom, width, height)
        renderer.render(scene, scene.userData.camera)
    })
}

function animate() {
    render()
    requestAnimationFrame(animate)
}
