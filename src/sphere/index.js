import * as THREE from 'three'
import frag from './frag.glsl'
import vert from './vert.glsl'

const WIDTH = 400,
	HEIGHT = 300
const VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000

let renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(WIDTH, HEIGHT)
document.body.appendChild(renderer.domElement)

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
camera.position.z = 300

let shaderMaterial = new THREE.ShaderMaterial({
	vertexShader: vert,
	fragmentShader: frag,
})

let radius = 50,
	segments = 16,
	rings = 16

let geometry = new THREE.SphereGeometry(radius, segments, rings)

let sphere = new THREE.Mesh(geometry, shaderMaterial)

scene.add(sphere)

renderer.render(scene, camera)
