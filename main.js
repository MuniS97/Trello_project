let close_aside = document.querySelector(".close_aside");
let open_aside = document.querySelector(".open_aside");
let aside = document.querySelector("aside");
let aside_class = document.querySelector(".aside");
let content = document.querySelector("main");

let open_modal_btn = document.querySelector('.create')
let modal_main = document.querySelector('.modal_main')
let close_modal_btn = document.querySelectorAll('.button_x')
let form_create = document.forms.create_new
let select_participants = document.querySelector('#participants')
let form_add = document.forms.add_new
let modal_add = document.querySelector('.modal_add')
let add_one = document.querySelector('.add_one')
let boxes = document.querySelectorAll('.box_avatar');


open_aside.onclick = () => {
  aside.classList.remove("hide_main");
  aside_class.classList.remove("hide_aside");
  aside_class.classList.remove("hide");
  open_aside.classList.add("hide");
  content.classList.add("contentFlex");
};

close_aside.onclick = () => {
  aside_class.classList.add("hide_aside");
  aside.classList.add("hide_main");
  content.classList.remove("contentFlex");
  setTimeout(function close_open() {
    open_aside.classList.remove("hide");
  }, 1000);

  setTimeout(function close() {
    aside_class.classList.add("hide");
  }, 1000);
};









let res = ['alex', 'adams', 'john', 'mike']

for (let key in res) {
  let option = new Option(res[key])

  select_participants.append(option)
}

open_modal_btn.onclick = () => {
  modal_main.classList.add('block')
}
close_modal_btn.forEach(btn => {
  btn.onclick = () => {
    btn.parentElement.classList.remove('block')
  }
})

add_one.onclick = () => {
  modal_add.classList.add('block')
}

form_create.onsubmit = (e) => {
  e.preventDefault();

  let arr = {}

  let fm = new FormData(form_create)

  fm.forEach((value, key) => {
    arr[key] = value
  })

  form_create.reset()
  modal_main.classList.remove('block')
  console.log(arr);
}






let choosed_avatar

boxes.forEach(box => {
  box.onclick = () => {
    boxes.forEach(box => {
      box.classList.remove('box_selected')
    })
    box.classList.add('box_selected')
    choosed_avatar = box.childNodes[1].src.split(5175).at(-1)
    console.log(box.childNodes[1].src.split('img/').at(-1));
  }
}
)

form_add.onsubmit = (e) => {
  e.preventDefault();

  let arr = {
    img: choosed_avatar
  }

  let fm = new FormData(form_add)

  fm.forEach((value, key) => {
    arr[key] = value
  })

  console.log(arr);

  form_create.reset()
  modal_add.classList.remove('block')
}


const dropdown = document.querySelector('.dropdown');
const arrowIcon = document.querySelector('.after_options');

arrowIcon.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});







document.addEventListener('DOMContentLoaded', function () {
  const tasks = document.querySelectorAll('.task');

  tasks.forEach(task => {
    task.setAttribute('draggable', true);
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragover', dragOver);
    task.addEventListener('dragenter', dragEnter);
    task.addEventListener('dragleave', dragLeave);
    task.addEventListener('drop', dragDrop);
    task.addEventListener('dragend', dragEnd);
  });

  let draggedTask = null;
  
  function dragStart() {
    draggedTask = this;
    setTimeout(() => {
      this.style.display = 'none';
    }, 0);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.classList.add('over');
  }

  function dragLeave() {
    this.classList.remove('over');
  }

  function dragDrop() {
    this.classList.remove('over');
    this.parentNode.insertBefore(draggedTask, this);
  }

  function dragEnd() {
    this.style.display = 'block';
    draggedTask = null;
  }
});