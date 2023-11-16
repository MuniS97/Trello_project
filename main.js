import { getData, postData } from "/modules/helpers";
//ASIDE CODE
let close_aside = document.querySelector(".close_aside");
let open_aside = document.querySelector(".open_aside");
let aside = document.querySelector("aside");
let aside_class = document.querySelector(".aside");
let content = document.querySelector("main");

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
// MODAL CODE
let open_modal_btn = document.querySelector(".create");
let modal_main = document.querySelector(".modal_main");
let close_modal_btn = document.querySelectorAll(".button_x");
let form_create = document.forms.create_new;
let select_participants = document.querySelector("#participants");
let form_add = document.forms.add_new;
let modal_add = document.querySelector(".modal_add");
let add_one = document.querySelector(".add_one");
let boxes = document.querySelectorAll(".box_avatar");

let res = ["alex", "adams", "john", "mike"];

for (let key in res) {
  let option = new Option(res[key]);

  select_participants.append(option);
}

open_modal_btn.onclick = () => {
  modal_main.classList.add("block");
};
close_modal_btn.forEach((btn) => {
  btn.onclick = () => {
    btn.parentElement.classList.remove("block");
  };
});

add_one.onclick = () => {
  modal_add.classList.add("block");
};

form_create.onsubmit = (e) => {
  e.preventDefault();

  let arr = {};

  let fm = new FormData(form_create);

  fm.forEach((value, key) => {
    arr[key] = value;
  });

  form_create.reset();
  modal_main.classList.remove("block");
  console.log(arr);
};

let choosed_avatar;

boxes.forEach((box) => {
  box.onclick = () => {
    boxes.forEach((box) => {
      box.classList.remove("box_selected");
    });
    box.classList.add("box_selected");
    choosed_avatar = box.childNodes[1].src.split(5175).at(-1);
    console.log(box.childNodes[1].src.split("img/").at(-1));
  };
});

form_add.onsubmit = (e) => {
  e.preventDefault();

  let arr = {
    img: choosed_avatar,
  };

  let fm = new FormData(form_add);

  fm.forEach((value, key) => {
    arr[key] = value;
  });

  console.log(arr);

  form_create.reset();
  modal_add.classList.remove("block");
};

// DRAG AND DROP CODE
let tasks = document.querySelectorAll(".task");
let item_mid = document.querySelectorAll(".item_mid");
let add_task_form = document.forms.create_new;

getData("/tasks").then((res) => {
  console.log(res.data);
  reload(res.data);
});
add_task_form.onsubmit = (e) => {
  e.preventDefault();

  let todo = {};

  let fm = new FormData(add_task_form);
  fm.forEach((value, key) => {
    todo[key] = value;
  });

  add_task_form.reset();

  postData("/tasks", todo).then((res) => {
    if (res.status !== 200 && res.status !== 201) return;
    console.log(res);
  });
};

function reload(arr) {
  tasks.forEach((task) => (task.innerHTML = ""));

  for (let item of arr) {
    let div = document.createElement("div");
    let b = document.createElement("b");
    let p = document.createElement("p");
    let deadline = document.createElement("span");
    let participants = document.createElement("p");

    div.setAttribute("id", item.id);
    div.setAttribute("class", "fill");
    b.classList.add('elem_title')
    div.setAttribute("draggable", true);

    b.innerHTML = item.name;
    p.innerHTML = item.description;
    deadline.innerHTML = item.deadline;
    participants.innerHTML = item.participants;


    div.append(b, p, deadline, participants);

    switch (item.status) {
      case "todo":
        tasks[0].append(div);
        break; 
      case "inprogress":
        tasks[1].append(div);
        break;
      case "done":
        tasks[2].append(div);
        break;
    }
    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragend", dragEnd);
  }
}
for (let task of tasks) {
  task.addEventListener("dragover", dragOver);
  task.addEventListener("dragenter", dragEnter);
  task.addEventListener("dragleave", dragLeave);
  task.addEventListener("drop", dragDrop);
}

let temp_id;

function dragStart() {
  console.log("dragStart");
  temp_id = this.id;
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
  console.log("dragEnd");
  this.className = "fill";
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  console.log("");
  event.preventDefault();
  this.className += " hovered";
}

function dragLeave() {
  console.log("dragLeave");
  this.className = "empty";
  console.log(this);
}

function dragDrop(params) {
  let temp = document.querySelectorAll(".empty div");

  this.className = "task";
  temp.forEach((item, index) => {
    if (item.id === temp_id) {
      this.append(item);
    }
  });
}
