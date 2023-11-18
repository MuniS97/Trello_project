import { dragEnd, dragStart } from "./dragNdrop";

export function reload_tasks(arr, places) {
    
    places.forEach(el => el.innerHTML = "");

    for (let item of arr) {
        let div = document.createElement('div');

        div.classList.add('task');
        div.setAttribute('data-id', item.id);
        div.setAttribute('draggable', true);

        div.innerHTML = item.title;

        places[item.status].append(div);

        div.ondragstart = dragStart;
        div.ondragend = dragEnd;
    }


    const deleteTaskImages = document.querySelectorAll('.delete_task img');
    deleteTaskImages.forEach(img => {
        img.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
        img.addEventListener('drop', (e) => {
            e.preventDefault();
            const task = e.dataTransfer.getData('text');
            const taskElement = document.querySelector(`[data-id=${task}]`);
            if (taskElement) {
                taskElement.remove();
            }
        });
    });

    
    
}