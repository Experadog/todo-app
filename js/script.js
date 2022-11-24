window.addEventListener("load", () => {
  if(localStorage.getItem("isAuth") === "false") {
    window.open("../register.html", "_self")
  }
})

const signOut = document.querySelector(".signOut")

signOut.addEventListener("click", () => {
  localStorage.setItem("isAuth", "false")
  window.open("../register.html", "_self")
})

const title = document.querySelector(".title")
const description = document.querySelector(".description")
const image = document.querySelector(".image")
const addTodo = document.querySelector(".addTodo")
const error = document.querySelector(".error")
const row = document.querySelector(".row")

window.addEventListener("load", () => {
  if(!localStorage.getItem("todo")) {
    localStorage.setItem("todo", JSON.stringify([]))
  } else {
    const todo = JSON.parse(localStorage.getItem("todo"))
    const todosWithID = todo.map((item, index) => {
      return {...item, id: index}
    })

    localStorage.setItem("todo", JSON.stringify(todosWithID))

    const newTodo = JSON.parse(localStorage.getItem("todo"))

    card(newTodo)
  }
})



addTodo.addEventListener("click", (event) => {
  event.preventDefault();

  if(title.value !== "" && description.value !== "" && image.value !== "") {
    const data = {
      title: title.value,
      description: description.value,
      image: image.value
    }
    const todo = JSON.parse(localStorage.getItem("todo"))

    localStorage.setItem("todo", JSON.stringify(
      [
        ...todo,
        data
      ]
    ))

    window.location.reload()

  } else {
    error.innerHTML = "Все поля должны быть заполнены!"
  }
})

function card(base) {
  const template = base.map(({title, description, image}) => {
    return `
      <div class="boxes">
        <h4>${title}</h4>

        <img src=${image} alt="">

        <p>
          ${description}
        </p>
      </div>
    `
  }).join(" ")

  row.innerHTML = template
}
