import { dragEnd, dragStart } from "./dragNdrop"

export function reload_tasks(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for(let item of arr) {
        let div = document.createElement('div')
        let title = document.createElement('span')
        let desc = document.createElement('p')
        let deadline = document.createElement('p')

        div.classList.add('task')
        title.classList.add('title')
        desc.classList.add('description')
        deadline.classList.add('deadline')
        div.setAttribute('data-id', item.id)
        div.setAttribute('draggable', true)


        title.innerHTML = item.title
        desc.innerHTML = item.description
        deadline.innerHTML = item.deadline

        div.append(title, desc, deadline)
        places[item.status].append(div)

        div.ondragstart = dragStart
        div.ondragend = dragEnd
    }
}
