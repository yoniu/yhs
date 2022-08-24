import {
  GET_BLOG_LIST,
  GET_BLOG_SORT,
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

  async [GET_BLOG_SORT]({ commit }){
    try {
      const sortTable = new Query('sort')
      const result = await sortTable.find()
      const table = []
      result.map((obj) => {
        table.push({
          id: obj.id,
          name: obj.get('name'),
          description: obj.get('description')
        })
      })
      commit(GET_BLOG_SORT, { state: 1, table })
    } catch (e) {
      commit(GET_BLOG_SORT, { state: 0, message: e.message })
    }
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