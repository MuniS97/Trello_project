import { dragEnd, dragStart } from "./dragNdrop";
import { getData } from "./http";
let searcher = document.querySelector(".searcher_inp");
let main = document.querySelector(".content");
let body = document.body;
let aside = document.querySelector("aside");
let container = document.querySelector(".container");
searcher.onfocus = function () {
  //   main.classList.add("blur");
  //   aside.classList.add("blur");
  body.classList.add("blur");
  searcher.classList.add('disable_blur')
};

export function reload_tasks(arr, places) {
	places.forEach((el) => (el.innerHTML = ""));
	
	for (let item of arr) {
		let div = document.createElement("div");
    let b = document.createElement("b");
    let p = document.createElement("p");
    let deadline = document.createElement("span");
    let participants = document.createElement("p");
	
    div.classList.add("task");
    div.setAttribute("draggable", true);
    div.setAttribute("data-id", item.id);
    deadline.classList.add("deadline");
    b.classList.add("title");
    p.classList.add("description");
    participants.classList.add("participants");
	
    b.innerHTML = item.title;
    p.innerHTML = item.description;
    deadline.innerHTML = item.deadline;
    participants.innerHTML = item.participants;
	
    places[item.status].append(div);
    div.append(participants, b, p, deadline);

    // div.dataset.id;
    div.ondragstart = dragStart;
    div.ondragend = dragEnd;
}
}

export function searcher_fun(arr) {
	let tasks = document.querySelectorAll(".task");
	
	searcher.onblur = () => {
		// main.classList.remove("blur");
		// aside.classList.remove("blur");
		body.classList.remove("blur");
		searcher.classList.remove('disable_blur')
		tasks.forEach((task) => task.classList.remove("found"));
	};
	
	searcher.oninput = function () {
		for (let item of arr) {
      let val = searcher.value;
      let title = item.title;

      if (title.includes(val)) {
        tasks.forEach((task) => {
          let rect = task.getBoundingClientRect();

          if (task.dataset.id == item.id) {

			let scrollTo = task.offsetTop

			let item_mid = task.closest('.item_mid')
			item_mid.scrollTo(0, scrollTo)
			
            task.classList.add("found");
            console.log(rect.top);
            container.scrollTo({
              top: rect.top,
              behavior: "smooth",
            });
            console.log(task);
          } else {
            task.classList.remove("found");
          }
        });
      }
    }
  };
}
