import * as THREE from 'three'
import Scene from './scene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
let views, renderer

init()
function init() {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    views = document.querySelectorAll('.img-wrap img')
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

        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10)
        camera.position.z = 1
        // const controls = new OrbitControls(camera, views[i])

        scene.userData.view = views[i]
        scene.userData.geometry = geometry
        scene.userData.material = material
        // scene.userData.controls = controls
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
        const rect = scene.userData.view.getBoundingClientRect()
        if (
            rect.bottom < 0 ||
            rect.top > renderer.domElement.clientHeight ||
            rect.right < 0 ||
            rect.left > renderer.domElement.clientWidth
        ) {
            return
        }

        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = renderer.domElement.clientHeight - rect.bottom

        renderer.setViewport(left, bottom, width, height)
        renderer.setScissor(left, bottom, width, height)
        renderer.render(scene, scene.userData.camera)
    })
}

function animate() {
    render()
    requestAnimationFrame(animate)
}
