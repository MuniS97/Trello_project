
export function dragStart() {
    this.id = "marked"
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
}

export function dragEnd() {
    this.removeAttribute('id')
    this.className = 'task'
}


export function dragOver(event) {
    event.preventDefault()
}

export function dragEnter(event) {
    event.preventDefault()
    this.className += ' hovered'
}


export function dragLeave() {
    this.className = 'item_mid'
}

export function dragDrop() {
    let marked_div = document.getElementById('marked')
    this.className = 'item_mid'

    this.append(marked_div)
}






