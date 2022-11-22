import * as THREE from 'three'

import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()

let theimage = document.getElementById('theimage')
let rect = theimage.getBoundingClientRect()

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let camera = new THREE.OrthographicCamera()
camera.position.set(0, 0, 1)

let image = loader.load(theimage.src)
let uniforms = {
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { type: 'v2', value: new THREE.Vector2() },
    u_image: { type: 't', value: image },
}

let geometry = new THREE.PlaneBufferGeometry(rect.width, rect.height, 1, 1)
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
const windowResizeHanlder = () => {
    const { innerHeight, innerWidth } = window
    renderer.setSize(innerWidth, innerHeight)
    uniforms.u_res.value.x = innerWidth
    uniforms.u_res.value.y = innerHeight

    camera.left = innerWidth / -2
    camera.right = innerWidth / 2
    camera.top = innerHeight / 2
    camera.bottom = innerHeight / -2
    camera.updateProjectionMatrix()
}
windowResizeHanlder()
window.addEventListener('resize', windowResizeHanlder)
