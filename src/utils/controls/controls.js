// function controls() {
//     let controls = document.querySelectorAll('.controls-btn input[type="checkbox"]')
//     controls.forEach((control) => {
//         if (control.dataset.hasOwnProperty('noCss')) {
//             return
//         }

//         let prop = control.dataset.prop
//         if (control.checked) {
//             document.body.classList.add(prop)
//         }

//         control.addEventListener('change', (e) => {
//             if (e.target.checked) {
//                 document.body.classList.add(prop)
//             } else {
//                 document.body.classList.remove(prop)
//             }
//         })
//     })
// }

function createElement(tagName, text, attributes) {
    let el = document.createElement(tagName)
    if (text) el.textContent = text

    if (attributes) {
        for (let attr in attributes) {
            el.setAttribute(attr, attributes[attr])
        }
    }

    return el
}

function controls() {
    let controls = document.querySelectorAll('.controls-btn')
    controls.forEach((control) => {
        let data = control.dataset
        let prop = data.prop
        let defaultChecked = data.default
        let checkedText = data.checked
        let uncheckedText = data.unchecked
        let manual = data.hasOwnProperty('manual')
        let checkboxId = `controls-${prop}`

        let checkbox = createElement('input', '', {
            type: 'checkbox',
            id: checkboxId,
        })
        if (defaultChecked === 'on') checkbox.checked = true
        let label = createElement('label', '', { for: checkboxId })
        let spanChecked = createElement('span', checkedText, { class: 'controls-checked' })
        let spanUnchecked = createElement('span', uncheckedText, { class: 'controls-unchecked' })

        label.appendChild(spanChecked)
        label.appendChild(spanUnchecked)

        control.appendChild(checkbox)
        control.appendChild(label)

        if (manual) return

        if (defaultChecked === 'on') {
            document.body.classList.add(prop)
        }

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add(prop)
            } else {
                document.body.classList.remove(prop)
            }
        })
    })
}

controls()
