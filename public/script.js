const acceptButton = document.querySelector('#accept-button')
const configureButton = document.querySelector('#configure-button')
const closeButton = document.querySelector('#close-button')
const confirmButton = document.querySelector('#confirm-button')
const banner = document.querySelector('.banner')
const modal = document.querySelector('.modal')
const skipLink = document.querySelector('[href="#main"]')

let focusables = []

/* Hide banner if user accepts cookies */
acceptButton.addEventListener('click', () => {
	banner.hidden = true
})

/* Open modal if user wants to configure cookies */
configureButton.addEventListener('click', () => {
	modal.hidden = false
	closeButton.focus()
	document.body.style.overflow = 'hidden'
	focusables = Array.from(modal.querySelectorAll('button, a, input, textarea, select'))
	
	document.addEventListener('keydown', handleModalKeyboard)
})

/* Close modal on close */
closeButton.addEventListener('click', () => {
	modal.hidden = true
	document.body.style.overflow = 'initial'
	document.removeEventListener('keydown', handleModalKeyboard)
	configureButton.focus()
})

/* Close modal on confirm */
confirmButton.addEventListener('click', () => {
	banner.hidden = true
	modal.hidden = true
	document.body.style.overflow = 'initial'
	document.removeEventListener('keydown', handleModalKeyboard)
	skipLink.focus()
})

const handleModalKeyboard = e => {
	if (e.key === 'Escape') {
		modal.hidden = true
		configureButton.focus()
	}
	
	if (e.key === 'Tab') {
		e.preventDefault()

		let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
		console.log(index)
    if (e.shiftKey === true) {
      index--
    } else {
      index++
    }
    if (index >= focusables.length) {
      index = 0
    }
    if (index < 0) {
      index = focusables.length - 1
    }
    focusables[index].focus()
	}
}