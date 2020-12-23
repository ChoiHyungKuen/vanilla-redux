import {createStore} from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;

// 이렇게 변수로 쓰면 오타를 쳤을때 에러가 발생함..
const ADD = 'ADD';
const MINUS = 'MINUS';

const countModifier = (count = 0, action) => {
  console.log(count, action)
  switch(action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count -1;
    default:
      return count;
  }
}

const countStore = createStore(countModifier);

const onChange = () => {
  console.log(' 변경됬습니다 ' + countStore.getState())
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange)

const handleAdd = () => {
  countStore.dispatch({type: ADD})
}

const handleMinus = () => {
  countStore.dispatch({type: MINUS})
}

add.addEventListener('click', handleAdd );
minus.addEventListener('click', handleMinus);

