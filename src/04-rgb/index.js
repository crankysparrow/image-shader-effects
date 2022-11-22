import * as THREE from 'three'

import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()

let sizes = {}

let theimage = document.querySelector('#theimage')
let rect = theimage.getBoundingClientRect()
sizes.width = rect.width
sizes.height = rect.height
sizes.rendererWidth = window.innerWidth
sizes.rendererHeight = window.innerHeight

const renderer = new THREE.WebGLRenderer({})
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

let camera = new THREE.OrthographicCamera()
camera.position.set(0, 0, 1)

let image = loader.load(theimage.src)
let uniforms = {
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(sizes.rendererWidth, sizes.rendererHeight) },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
    u_image: { type: 't', value: image },
}

let geometry = new THREE.PlaneBufferGeometry(sizes.width, sizes.height, 1, 1)
let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    defines: {
        PR: window.devicePixelRatio.toFixed(1),
    },
})

let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.clientX
    uniforms.u_mouse.value.y = e.clientY
}

// render loop
const onAnimationFrameHandler = (timeStamp) => {
    renderer.render(scene, camera)
    uniforms.u_time.value++
    window.requestAnimationFrame(onAnimationFrameHandler)
}
window.requestAnimationFrame(onAnimationFrameHandler)

// resize
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window
    renderer.setSize(innerWidth, innerHeight)
    camera.left = innerWidth / -2
    camera.right = innerWidth / 2
    camera.top = innerHeight / 2
    camera.bottom = innerHeight / -2
    camera.updateProjectionMatrix()
}
windowResizeHandler()
window.addEventListener('resize', windowResizeHandler)
