import { looseEqual, toMappingFn, clone } from '@/utils'

/**
 * 将数组数据转换为树结构数据
 */
 export const genTreeData = function(data) {
  var cloneData = clone(data, []);
  var attr = { data: cloneData, id: 'id', label: 'name', pid: 'pid'};
  return transformTozTreeFormat(attr, cloneData);
}

const nodeChildren = function(setting, node, newChildren) {
  if (!node) {
    return null;
  }
  // var key = 'children' || setting.children;
  var key = 'children';
  if (typeof newChildren !== 'undefined') {
    node[key] = newChildren;
  }
  return node[key];
};

const transformTozTreeFormat = function(setting, sNodes) {
  var i;
  var l;
  var key = setting.id;
  var parentKey = setting.pid;
  if (!key || key === '' || !sNodes) return [];

  if (Array.isArray(sNodes)) {
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      sNodes[i].label = sNodes[i][setting.label];
      sNodes[i].mId = sNodes[i][setting.id];
      sNodes[i].mPid = sNodes[i][setting.pid];
      sNodes[i].routeId = sNodes[i]['funcId'];
      sNodes[i].routeUrl = sNodes[i]['funcUrl'];
      sNodes[i].mType = sNodes[i]['menuType'];
      tmpMap[sNodes[i][key]] = sNodes[i];
      sNodes[i].children = [];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i][parentKey]];
      if (p && sNodes[i][key] !== sNodes[i][parentKey]) {
        var children = nodeChildren(setting, p);
        if (!children) {
          children = nodeChildren(setting, p, []);
        }
        children.push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  } else {
    return [sNodes];
  }
};

/**
 * 校验子模板节点是否可见
 * 【==】等于  例如【show_conditon==1,2,3,4】show_conditon值为1、2、3、4其中一项时显示
 * 【!=】不等于  例如【show_conditon!=1,2,3,4】show_conditon值不为1、2、3、4其中一项时显示
 * 【%=】以什么开头 例如【show_conditon%=s,h,o,w】show_conditon值为类似son、hello、old、wow等以s、h、o、w其中任意字母开头时显示
 * PS：
 * 根据当前登录用户角色判断：$LoginRoleCode == XX1,XX2或者$LoginRoleCode != XX1,XX2
 * 根据当前登录用户岗位判断：$LoginDutyCode == XX1,XX2或者$LoginDutyCode != XX1,XX2
 * @param {*} route
 * @param {*} context
 */
export function checkVisiable (route, context) {
  var visiable = true; // 默认可见
  var singleFieldChackFn = function (itemCondi) {
    if (!itemCondi || (itemCondi.indexOf('==') == -1 && itemCondi.indexOf('!=') == -1 && itemCondi.indexOf('%=') == -1) || itemCondi == '无') {
      return true;
    }
    var condiType;
    var resultFlag = true;
    var itemCondi;
    if (showCond.indexOf('==') > -1) {
      itemCondi = showCond.split('==');
      resultFlag = true;
      condiType = 'eq';
    } else if (showCond.indexOf('!=') > -1) {
      itemCondi = showCond.split('!=');
      resultFlag = false;
      condiType = 'not';
    } else if (showCond.indexOf('%=') > -1) {
      itemCondi = showCond.split('%=');
      condiType = 'first';
    }
    var key = itemCondi[0];
    if (context.hasOwnProperty(key)) {
      var currentValue = context[key];
      var value = itemCondi[1];
      if (condiType == 'first') {
        if (value.indexOf(',') > -1) {
          var values = value.split(',');
          for (var j = 0; j < values.length; j++) {
            var tempVal = values[j];
            if (currentValue.indexOf(tempVal) === 0) {
              return true;
            }
          }
          return false;
        } else {
          return currentValue.indexOf(value) === 0;
        }
      } else {
        if (value.indexOf(',') > -1) {
          var values = value.split(',');
          if (values.indexOf(currentValue) > -1) {
            return resultFlag;
          } else {
            return !resultFlag;
          }
        } else {
          return value == currentValue ? resultFlag : !resultFlag;
        }
      }
    }
    // else if (key == '$LoginRoleCode') { // 根据登录人角色
    //   var userInfo = YuXPUtil.getLoginUserInfo();
    //   if (userInfo.roles && userInfo.roles.length > 0) {
    //     var value = itemCondi[1];
    //     if (value.indexOf(',') > -1) {
    //       var values = value.split(',');
    //       for (var i = 0; i < userInfo.roles.length; i++) {
    //         var tempRole = userInfo.roles[i];
    //         var currentValue = tempRole.code;
    //         if (values.indexOf(currentValue) > -1) {
    //           return resultFlag;
    //         }
    //       }
    //       return !resultFlag;
    //     } else {
    //       for (var i = 0; i < userInfo.roles.length; i++) {
    //         var tempRole = userInfo.roles[i];
    //         var currentValue = tempRole.code;
    //         if (value == currentValue) {
    //           return resultFlag;
    //         }
    //       }
    //       return !resultFlag;
    //     }
    //   } else {
    //     console.error('前端缓存缺少用户角色信息，页签不显示，请检查显示条件配置！');
    //     return false;
    //   }
    // } else if (key == '$LoginDutyCode') { // 根据登录人岗位
    //   var userInfo = YuXPUtil.getLoginUserInfo();
    //   if (userInfo.dutys && userInfo.dutys.length > 0) {
    //     var value = itemCondi[1];
    //     if (value.indexOf(',') > -1) {
    //       var values = value.split(',');
    //       for (var i = 0; i < userInfo.dutys.length; i++) {
    //         var tempRole = userInfo.dutys[i];
    //         var currentValue = tempRole.code;
    //         if (values.indexOf(currentValue) > -1) {
    //           return resultFlag;
    //         }
    //       }
    //       return !resultFlag;
    //     } else {
    //       for (var i = 0; i < userInfo.dutys.length; i++) {
    //         var tempRole = userInfo.dutys[i];
    //         var currentValue = tempRole.code;
    //         if (value == currentValue) {
    //           return resultFlag;
    //         }
    //       }
    //       return !resultFlag;
    //     }
    //   } else {
    //     console.error('前端缓存缺少用户岗位信息，页签不显示，请检查显示条件配置！');
    //     return false;
    //   }
    // } else {
    //   console.error('主页面数据缺少字段【' + key + '】的数据，页签不显示，请检查显示条件配置！');
    //   return false;
    // }
  };
  if (route.showCond) {
    var showCond = route.showCond;
    if (showCond.indexOf(';') > -1) {
      var showConds = showCond.split(';');
      for (var i = 0; i < showConds.length; i++) {
        var element = showConds[i];
        var singleResult = singleFieldChackFn(element);
        if (singleResult) {
          continue;
        } else {
          visiable = false;
          break;
        }
      }
    } else {
      visiable = singleFieldChackFn(showCond);
    }
  } else {
    visiable = singleFieldChackFn();
  }
  route['visiable'] = visiable;
  return visiable;
}