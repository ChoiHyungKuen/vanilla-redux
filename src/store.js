import {createStore} from 'redux';
import { createAction, createReducer, configureStore, createSlice } from '@reduxjs/toolkit';

/*
    기존 redux-toolkit이 없는 경우 

*/

// const addToDo = (text) => {
//   return {
//     type: ADD, text
//   }
// }
// const deleteToDo = (id) => {
//   return {
//     type: DELETE, id
//   }
// }

// const ADD = 'ADD';
// const DELETE = 'DELETE';


// const reducer = (state = [], action) => {
//     console.log(action)
//     switch(action.type) {
//       case addToDo.type:
//         return [{text: action.payload, id: Date.now()}, ...state ];
//       case deleteToDo.type:
//         return state.filter(toDo => toDo.id !== action.payload);
//       default:
//         return state;
//     }
// };

// const store = createStore(reducer);


/*
    redux-toolkit을 활용하면 createAction, createReducer, configureStore, createSlice를 활용해 코드가 단순해짐!
*/

// redux-toolkit에서의 createAction은 위에쓰는 코드를 줄여줌과 동시에 좀더 로직을 단순하게 바꿔줌! => 나중에 비동기에서 어떻게 되는지 확인해봐야함
// export const addToDo = createAction('ADD');
// export const deleteToDo = createAction('DELETE');



// redux-toolkit에서의 createReducer는 기존 reducer보다 코드가 단순하고 직관적이게 변함은 물론이고,
// 항상 직접변경이 불가능(immutable 객체 유지)했는데 이걸 통해 변경도 되고 기존에 사용하던 새로운 Object를 리턴하는 것도 가능하게 해줌!
// createAction을 사용해서 action을 생성했으면 아래처럼 [action](key) + callback(value) 객체로 문법을 사용해주어야한다! - 또한, 다음처럼 두가지 방식으로 사용가능!!!

// 1)
// const reducer = createReducer([] , {
//     [addToDo]: (state, action) => {
//         state.push({text: action.payload, id: Date.now()}); // 이렇게 state를 직접변경할 수 있는 이유는 redux-toolkit이 immer.js를 기반으로 작동하기 때문에 안에서 바꿔 동작해줌..
//     },
//     [deleteToDo]: (state, action) =>  state.filter(toDo => toDo.id !== action.payload)
// });


// 2)
// const reducer = createReducer([] , (builder) => {
//     builder
//     .addCase(addToDo, (state, action) => {
//         state.push({text: action.payload, id: Date.now()}); // 이렇게 state를 직접변경할 수 있는 이유는 redux-toolkit이 immer.js를 기반으로 작동하기 때문에 안에서 바꿔 동작해줌..
//     })
//     .addCase(deleteToDo, (state, action) =>  state.filter(toDo => toDo.id !== action.payload))
//     .addDefaultCase((state, action) => [])
// });




// 위에 createAction, createReducer를 하나로 줄여주는 함수가 createSlice임!!
const toDos = createSlice({
    name: 'toDosReducer',   
    initialState: [],
    reducers: {
        addToDo(state, action) {
                    state.push({text: action.payload, id: Date.now()}); // 이렇게 state를 직접변경할 수 있는 이유는 redux-toolkit이 immer.js를 기반으로 작동하기 때문에 안에서 바꿔 동작해줌..
        },
        deleteToDo(state, action) { return state.filter(toDo => toDo.id !== action.payload) }
    }
});


// const store = configureStore({reducer});
// const store = configureStore({reducer: toDos.reducer}); // 위처럼 createSlice를 썼을 때..
// export const actionCreators = {
//     addToDo,
//     deleteToDo
// }
// export const actionCreators = toDos.actions


export const { addToDo, deleteToDo } = toDos.actions;       // createSlice에서는 actions를 통해 action도 같이 제공해줄 수 있음!!
export default configureStore({reducer:toDos.reducer});