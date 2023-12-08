/*
 * @Description: getters
 * @Author: Lewis
 * @Date: 2022-06-07 17:57:41
 * @LastEditTime: 2023-12-07 20:18:03
 * @LastEditors: Ian
 */

const getters = {
  roles: (state) => state.auth.roles,
  username: (state) => state.auth.username,
};
export default getters;
