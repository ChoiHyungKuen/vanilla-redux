import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';


// 최대한 잘게 쪼개서 하나의 단위로 만들어줌
const addToDo = (text) => {
  return {
    type: ADD_TODO, text
  }
}
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO, id
  }
}

//mutate를 안하는게 redux 핵심! 직접수정안하고 새로운 값으로 리턴하게..
const reducer = (state = [], action) => {
  console.log(action)
  switch(action.type) {
    case ADD_TODO:
      return [{text: action.text, id: Date.now()}, ...state ];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text))
}

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
  
}

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.innerText ='DEL';
    btn.addEventListener('click', dispatchDeleteToDo);

    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn)
    ul.appendChild(li);
  });
}

store.subscribe(paintToDos);


// const createToDo = toDo => {
//   const li = document.createElement('li');
//   li.innerText = toDo;
//   ul.appendChild(li);
// }


const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
}

form.addEventListener('submit', onSubmit);