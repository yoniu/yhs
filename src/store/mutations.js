import { GET_BLOG_LIST, GET_OPTIONS, GET_CURRENT_USER } from './actionType'

export default {

  [GET_OPTIONS](state, value){
    let arr = {};
    value.forEach((option)=>{
      arr[option.get('option')] = option.get('value');
    });
    state.option = arr;
  },

  [GET_CURRENT_USER](state, value){
    state.currentUser = value;
  }

}