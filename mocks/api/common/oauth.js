/**
 * @created by helin3 2019-04-06
 * @updated by
 * @description 通用认证权限Mock模拟
 */
/* eslint camelcase:0 */
import Mock from 'mockjs';
import backend from '../../../src/config/constant/app.data.service';
import demoLookups from './data/data.lookup';
import menusAndContrls from './data/menus-contrls';

// const { demoMenus, demoContrls } = menusAndContrls;

const getPubkey = config => {
  var returnObj = {
    code: 0,
    rows: '7DD950AE7C53D140D44981F7A79D0E902DEA2557293506F9F793F0DA9F5B722BF3C301D7CE97BC7FE26186601C9F6FFB660FC401C53E137FD15C73EC6166CA79'
  };
  return returnObj;
};
/**
 * oauth认证获取/刷新token
 * @param {*} config 请求参数:
 * 1) post请求通过config.body
 * 2) get请求通过config.query
 */
const loginFn = config => {
  var returnObj = {};
  returnObj.code = '0';
  returnObj.data = 'Basicd2ViX2FwcDo=';
  returnObj.rows = '1234';
  return returnObj;
};
/**
 * 模拟注销会话
 */
const logoutFn = config => {
  return {
    code: 0,
    message: 'logout success!'
  };
};

/**
 * 模拟获取用户会话信息
 */
const sessionInfoFn = config => {
  console.log(config, 'fff');
  var userInfo = {
    userId: '40',
    userName: '小宇',
    userAvatar: '',
    loginCode: 'admin',
    loginTime: null,
    roles: [
      { id: '100', code: 'R001', name: '系统管理员' },
      { id: 'modelAdmin', code: 'modelAdmin', name: '模型管理员' },
      { id: 'cstManager', code: 'cstManager', name: '客户经理' }
    ],
    dpt: { id: '010', code: '011', name: '运营管委会' },
    org: { id: '500', code: '500', name: '宇信集团' },
    logicSys: { id: '203', code: '', name: '' },
    instuOrg: null,
    upOrg: null,
    upDpt: null,
    dataContr: []
  };
  return {
    code: '0',
    message: '处理成功',
    rows: userInfo,
    success: true,
    total: 0
  };
};

/**
 * 菜单和权限获取
 */
const menuandcontrFn = config => {
  return {
    code: '0',
    message: '处理成功',
    rows: menusAndContrls,
    success: true,
    total: 0
  };
};

/**
 * 字典获取
 * @param lookupCodes 字典类型参数，支持逗号分隔
 */
const lookupQueryFn = config => {
  let returnObj = {};
  const code = config.query.lookupCodes;
  if (!code) {
    returnObj = {
      code: -1,
      message: '请求参数错误'
    };
  } else {
    const codeArr = code.split(',');
    for (let i = 0, len = codeArr.length; i < len; i++) {
      const codeType = codeArr[i];
      returnObj[codeType] = demoLookups[codeType] || [];
    }
  }
  return {
    data: returnObj
  };
};

/**
 * 导出服务，{url,type,response}
 */
export default [
  {
    url: backend.uaaService + '/login/pubkey',
    type: 'post',
    response: getPubkey
  },
  {
    url: backend.uaaService + '/login/token',
    type: 'post',
    response: loginFn
  },
  {
    url: backend.uaaService + '/api/logout',
    type: 'post',
    response: logoutFn
  },
  {
    url: backend.appOcaService + '/api/session/info',
    type: 'get',
    response: sessionInfoFn
  },
  {
    url: backend.appOcaService + '/api/account/menuandcontr',
    type: 'post',
    response: menuandcontrFn
  },
  {
    url: backend.appOcaService + '/api/codeImage/verifyCodeImage',
    type: 'get',
    response: () => Mock.Random.image('320x140', '#FFF', '#000', Mock.mock({ 'regexp': /\w{4}/ }).regexp)
  },
  {
    url: backend.appCommonService + '/api/adminsmlookupitem/querylookupcode',
    type: 'get',
    response: lookupQueryFn
  }
];
