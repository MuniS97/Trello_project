let base_url = 'http://localhost:8080'
import {getData} from './modules/helpers'
import {postData} from './modules/helpers'

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

let bg = document.querySelector('.black_bg')
let add_card = document.querySelectorAll('.add_card')
let item_mid = document.querySelectorAll('.item .item_mid')

function reload(arr) {
  item_mid.forEach(el => { el.innerHTML = '' })
  for (let user of arr) {
    let item_mid = document.querySelector('.item_mid')
    let task = document.createElement('div')
    let title = document.createElement('span')
    let desc = document.createElement('p')
    let deadline = document.createElement('div')
  
    task.setAttribute('id', user.id)
    task.setAttribute('class', 'task')
    task.setAttribute('draggable', true)
  
    title.innerHTML = user.title
    desc.innerHTML = user.description
    deadline.innerHTML = user.deadline
  
    item_mid.append(task)
    task.append(title, desc, deadline)
  
    task.classList.add('task')
    title.classList.add('title')
    desc.classList.add('decsription')
    deadline.classList.add('deadline')

    item_mid = allowDrop
    
    function allowDrop(e) {
      e.preventDefault();
    }

    task.ondragstart = drag;

    function drag(e) {
      e.dataTransfer.setData('id', e.target.id);
    }

    new_task.ondrop = drop;
    in_progress.ondrop = drop;
    done.ondrop = drop;

    function drop(e) {
      let itemId = e.dataTransfer.getData('id')
      e.target.append(document.getElementById(itemId))
    }
  }
}


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



let res_option = ['alex', 'adams', 'john', 'mike']

for (let key in res_option) {
  let option = new Option(res_option[key])

  select_participants.append(option)
}

add_card.forEach(btn => {
  btn.onclick = () => {
    bg.classList.add('bg_open')
    modal_main.classList.add('block')
  }
})

open_modal_btn.onclick = () => {
  modal_main.classList.add('block')
  bg.classList.add('bg_open')
}
close_modal_btn.forEach( btn => {
  btn.onclick = () => {
    btn.parentElement.classList.remove('block')
    bg.classList.remove('bg_open')
  }
})

add_one.onclick = () => {
  modal_add.classList.add('block')
  bg.classList.add('bg_open')
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
}


getData('/users')
  .then((res) => {
    if(res.status !== 200 && res.status !== 201) 
      return
      reload(res.data);
  })

form_create.onsubmit = (e) => {
  e.preventDefault();

  let user = {}
  let fm = new FormData(form_create)
  fm.forEach((value, key) => {
    user[key] = value
  })

  form_create.reset()
  modal_main.classList.remove('block')
  bg.classList.remove('bg_open')

  postData('/users', user)
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) 
      console.log(user);

      form_create.reset()
      getData('/users', user)
      .then((res) => {
        if(res.status === 200 || res.status === 201)
        reload(res.data)
    }) 
  })
}