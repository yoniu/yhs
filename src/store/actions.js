import {
  GET_BLOG_LIST,
  GET_OPTIONS,
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT
} from './actionType'
import AV from 'leancloud-storage'
const { Query, User } = AV
import { leancloud } from '../config'

AV.init({
  appId: leancloud.appId,
  appKey: leancloud.appKey,
  serverURL: leancloud.restAPI
});

export default {

  async [GET_BLOG_LIST]({ commit }){

  },

  async [GET_OPTIONS]({ commit }){
    try{
      const query = new Query('option');
      const result = await query.find();
      commit(GET_OPTIONS, result);
    }catch(e){
      commit(GET_OPTIONS, []);
    }
  },

  async [GET_CURRENT_USER]({ commit }){
    try{
      const currentUser = User.current();
      commit(GET_CURRENT_USER, currentUser);
    }catch(e){
      commit(GET_CURRENT_USER, {});
    }
  },

  async [LOGIN]({ commit }, data){
    const user = data.username;
    const pwd = data.password;
    try{
      const result = await User.logIn(user, pwd);
      commit(GET_CURRENT_USER, result);
    }catch(e){
      commit(GET_CURRENT_USER, { err: e.message });
    }
  },
  async [LOGOUT]({ commit }){
    try{
      await User.logOut();
      commit(GET_CURRENT_USER, { err: '已退出' });
    }catch(e){
      commit(GET_CURRENT_USER, { err: e.message });
    }
  }

}