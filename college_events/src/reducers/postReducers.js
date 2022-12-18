import { CREATE , FETCH_ALL ,LIKE,DELETE, UPDATE, FETCH_BY_SEARCH ,START_LOADING,STOP_LOADING, FETCH_POST, ADD_COMMENT} from "../actions/actionTypes"

const postReducer =  (state = {posts:[],isLoadingTrue:true} , action) => { //posts=state
  switch(action.type){
    case START_LOADING :
      return {...state,isLoadingTrue:true}
    case STOP_LOADING :
      return {...state,isLoadingTrue:false}
    case FETCH_ALL :
      return {
        ...state ,
        posts : action.payload.data,
        currentPage : action.payload.currentPage,
        numberOfPages : action.payload.numberOfPages
      }
    case FETCH_POST:
      return {...state , post : action.payload.data}
    case FETCH_BY_SEARCH:
      return {...state , posts : action.payload.data}
    case CREATE :
      return [...state,action.payload]
    case LIKE :
      return {...state , posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
    case ADD_COMMENT :
      return {...state , posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
    case DELETE :
      return {...state , posts :  state.posts.filter((post) => post._id !== action.payload)}
    case UPDATE :
      return {...state , posts :  state.posts.map((post) => (post._id === action.payload.id ? action.payload : post))}
    default :
      return state
  }
}

export default postReducer