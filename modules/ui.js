import { dragEnd, dragStart } from "./dragNdrop"
import { deleteData } from "./http"

export function reload_tasks(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for(let item of arr) {
        let task = document.createElement('div')
        let name =  document.createElement('p')
        let date = document.createElement('p')
        let description = document.createElement('p')
        let participants = document.createElement('p')

        task.classList.add('task')
        name.classList.add('task_name')
        date.classList.add('time')
        description.classList.add('description')
        participants.classList.add('participants')
        task.setAttribute('data-id', item.id)
        task.setAttribute('draggable', true)

        name.innerHTML = item.title
        date.innerHTML = item.deadline
        description.innerHTML = item.description
        participants.innerHTML = item.participants
        places[item.status].append(task)
        task.append(name,description,participants, date)

        task.ondragstart = dragStart
        task.ondragend = dragEnd
    }
}
