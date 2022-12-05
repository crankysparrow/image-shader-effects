import { Kampos, effects, Ticker, noise, transitions } from 'kampos'

// https://css-tricks.com/nailing-that-cool-dissolve-transition/
function loadImage(src) {
	return new Promise((resolve) => {
		const img = new Image()
		img.onload = function () {
			resolve(this)
		}
		img.src = src
	})
}

// const imageFrom = document.getElementById('source-from').src
// const imageTo = document.getElementById('source-to').src

// const promisedImages = [loadImage(imageFrom), loadImage(imageTo)]

// const WIDTH = 800
// const HEIGHT = 480
// const CELL_FACTOR = 5
// const AMPLITUDE = CELL_FACTOR / WIDTH

// const turbulence = effects.turbulence({
// 	noise: noise.perlinNoise,
// })

// turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE }
// turbulence.octaves = 8
// turbulence.isFractal = true

// const mapTarget = document.createElement('canvas')
// mapTarget.width = WIDTH
// mapTarget.height = HEIGHT

// const dissolveMap = new Kampos({
// 	target: mapTarget,
// 	effects: [turbulence],
// 	noSource: true,
// })

// dissolveMap.draw()

// const dissolve = transitions.dissolve()
// dissolve.map = mapTarget
// dissolve.high = 0.02

// const target = document.getElementById('target')
// const hippo = new Kampos({ target, effects: [dissolve] })

// Promise.all(promisedImages)
// 	.then(([fromImage, toImage]) => {
// 		hippo.setSource({ media: fromImage, width: WIDTH + 20, height: HEIGHT })
// 		dissolve.to = toImage
// 	})
// 	.then(function () {
// 		hippo.play((time) => {
// 			dissolve.progress = Math.abs(Math.sin(time * 0.0007))
// 		})
// 	})

const target1 = document.getElementById('target')
const target2 = document.getElementById('target2')
const media1 = document.getElementById('source-from')
const media2 = document.getElementById('source-to')

const hueSat = effects.hueSaturation()
hueSat.hue = 90

const brightCont = effects.brightnessContrast()
brightCont.contrast = 2.0

const ticker = new Ticker()
const kampos1 = new Kampos({ target: target1, effects: [hueSat], ticker })
const kampos2 = new Kampos({ target: target2, effects: [brightCont], ticker })

kampos1.setSource(media1)
kampos2.setSource(media2)
ticker.start()
