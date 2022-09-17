/**
 * @created by pan
 * @updated by helin3 2019-04-15
 * @description 全局路由权限拦截管理
 */
/* eslint no-param-reassign:0*/
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Message } from 'yuwp-ui';
import { isdebug } from '@/config/index';
import { logger } from '@/utils';
import { menuLog } from '@/utils/util';
import { getToken } from '@/utils/oauth'; // get token from sessionStore
import getPageTitle from '@/utils/get-page-title';
import settings from '@/config';
NProgress.configure({ showSpinner: true }); // NProgress 配置

// TODO 如果系统不需要进行权限验证
// 路由白名单（不作权限过滤），不跳转路由
const whiteList = settings.whiteList;
// 路由前置拦截器
router.beforeEach(async (to, from, next) => {
  if (to.path === '/') {
    next({ path: '/404' });
  }
  isdebug && logger.warn(`【router-beforeEach】from ${from.fullPath} to ${to.fullPath}`);
  NProgress.start();
  // set page title
  // console.log(`当前路由信息${JSON.stringify(to)}`)
  // $route.replace方法修复 by luyq1 @2021-04-26  暂时注释掉  工作流待办页面无法进入
  // const toR = {... to};
  // const fromR = {...from};
  // toR.matched = null;
  // fromR.matched = null;
  // window.sessionStorage.setItem('route', JSON.stringify({to: toR, from: fromR}));
  document.title = getPageTitle(to.meta.title);
  // 1.获取Token信息，判定是否已登录
  const hasToken = getToken();
  /* 2.不存在token信息，当前状态是未登录 */
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      // 2-1.当前访问路由，在免登录白名单中，直接访问当前
      next();
    } else {
      // 2-2.当前访问路由，不在免登录白名单中，重定向跳转登录路由（页面），并附带参数存储当前路由信息
      next(`/login?redirect=${to.redirectedFrom}`);
      NProgress.done();
    }
    return;
  }
  /* 记录菜单 页面访问日志 */
  // const devEnv = process.env.NODE_ENV === 'development' // 开发环境
  // if(devEnv) { // toto 开发环境暂时打开日志方便测试 实际应生产环境打开
  //   menuLog(to);
  // }
  // menuLog(to);
  /* 3.存在token信息，当前状态是已登录 */
  // 3-1.当前访问路由，是登录路由（页面）；由于会话已登录，直接重定向到首页
  if (to.path === '/login') {
    next({ path: '/' });
    NProgress.done();
    return;
  }
  // 3-2.当前访问路由，不是登录（页面）路由；则判断用户权限是否已初始化（主要是处理F5刷新页面情况）
  // 3-2-1.若已初始化，则直接访问，
  if (settings.mustRole && (store.getters.roles && store.getters.roles.length < 1)) {
    await store.dispatch('oauth/getAccessInfo');
    if (to.redirectedFrom && to.path === '/404') {
      to = { path: to.redirectedFrom };
      next({ ...to, replace: true });
    } else {
      next();
    }
    // hack method to ensure that addRoutes is complete
    // 设置 replace 属性true，导航后不会留下 history 记录。
    return;
  }
  const hasRoles = store.getters.roles && store.getters.roles.length > 0;
  if (hasRoles) {
    next();
    return;
  }
  // 角色非必须时，刷新页面重新请求用户信息
  if (!settings.mustRole && store.getters.userName) {
    await store.dispatch('oauth/getAccessInfo');
    next();
    return;
  }

  // 3-2-2.若权限未初始化，则等待权限初始化，然后再继续访问
  try {
    // 远程获取会话用户信息，并且动态添加权限路由
    await store.dispatch('oauth/getAccessInfo');

    // 为何要添加此判断？因@/router 初始化时添加通配符*，redirect: /404
    // 若F5刷新页面，路由丢失，可能会跳转至/404，这时获取会话后，重新跳转至原路由即可
    if (to.redirectedFrom && to.path === '/404') {
      to = { path: to.redirectedFrom };
    }

    // hack method to ensure that addRoutes is complete
    // 设置 replace 属性true，导航后不会留下 history 记录。
    next({ ...to, replace: true });
  } catch (error) {
    // 权限初始化异常，跳转登录页面，重新登录
    await store.dispatch('oauth/resetToken');

    Message.error(error || 'Has Error');
    next(`/login?redirect=${to.redirectedFrom}`);
    NProgress.done();
  }
});

// 路由后置拦截器
router.afterEach(() => {
  NProgress.done();
});