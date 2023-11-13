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
let modal_bg = document.querySelectorAll('.modal_bg')


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
  modal_bg.forEach(modal => {
    modal.classList.add('bg_for_modal')
  })
}
close_modal_btn.forEach( btn => {
  btn.onclick = () => {
    btn.parentElement.classList.remove('block')
    modal_bg.forEach(modal => {
      modal.classList.remove('bg_for_modal')
    })
  }
})

add_one.onclick = () => {
  modal_add.classList.add('block')
  modal_bg.forEach(modal => {
    modal.classList.add('bg_for_modal')
  })
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
  modal_bg.forEach(modal => {
    modal.classList.remove('bg_for_modal')
  })
}






let choosed_avatar

boxes.forEach(box => {
  box.onclick = () => {
    boxes.forEach(box=> {
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
  modal_bg.forEach(modal => {
    modal.classList.remove('bg_for_modal')
  })
}


let item_mids = document.querySelectorAll('.item_mid')
let tasks = document.querySelectorAll('.task')
let selected

console.log(item_mids);

item_mids.forEach(item => {
  item.ondragenter = (e) => {
    e.preventDefault()
  }
  item.ondragover = (e) => {
    e.preventDefault()
  }
  item.ondrop = () => {
    item.append(selected)
    selected = null
  }
})

tasks.forEach(task=> {
  task.ondragstart = (e) => {
    selected = e.target
    setTimeout(()=> {
      task.style.display = 'none'
    }, 0)
  }
  task.ondragend = (ev) => {
    task.style.display = 'block'

    const {x, y} = ev

    task.style.top = y+'px'
    task.style.left = x+'px'
  }
})

