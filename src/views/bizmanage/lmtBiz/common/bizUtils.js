import * as xutils from '@/utils/xutils.js';
import backend from '@/config/constant/app.data.service';
/**流程业务工具类**/
/**
 * 时间字符串格式化-该方法仅适用与操作时间类型为STD_ZB_CHAGE_TYP
 * date为时间字符串
 * operType为操作时间类型 001-年，002-月，003-日
 * operNum为时间加减天数
 **/
export function getTimeOperator(date, operType, operNum){
    //将时间字符串转化为时间对象
    if(String(operNum).indexOf('.') != -1){
      xutils.showMsgBox('提示', '不支持小数部分的日期运算！');
      return;
    }
    var formatDate = new Date(date.replace("/-/g", '/'));
    if(operType == '001'){//年份计算
      formatDate = formatDate.setYear(formatDate.getFullYear() + operNum * 1);
    }else if(operType == '002'){//月份计算
      formatDate = formatDate.setMonth(formatDate.getMonth() + operNum * 1);
    }else if(operType == '003'){//日期计算
      formatDate = formatDate.setDate(formatDate.getDate() + operNum * 1);
    }

    var newFormatDate = new Date(formatDate);
    var newDateYear = newFormatDate.getFullYear();
    var newDateMonth = newFormatDate.getMonth() + 1;
    if(newFormatDate.length == 1){
      newDateMonth = "0" + newDateMonth;
    }
    var newDateDay = newFormatDate.getDate();
    if(newDateDay.length == 1){
      newDateDay = "0" + newDateDay;
    }
    return xutils.formatDate(new Date(newDateYear + "-" + newDateMonth + "-" + newDateDay));
  }

  /**查询模块 隐藏/展示  查询/重置/灵活查询  按钮
   * BillQueryName-查询模块的名称，如：d1_BillQuery
   * type-按钮类型，query-查询按钮 reset-重置按钮 flexQuery-灵活查询
   * visiable是否可见  可见-true  不可见-false
   * **/
  export function hideOrShowBillQueryQueryBtn(BillQueryName, type, visiable){
    var btnName = '';
    if(type == 'query'){
      btnName = "xutils.reflectCall('" + BillQueryName + "','onBillQuerySearch','',this,event);";
    }else if(type == 'reset'){
      btnName = "xutils.reflectCall('" + BillQueryName + "','resetBillQueryData','',this,event);";
    }else if(type == 'flexQuery'){
      btnName = "xutils.reflectCall('" + BillQueryName + "','onBillQueryMore','',this,event);";
    }
    var btnDom = window.document.querySelector('button[onclick="' + btnName + '"]');
    if (btnDom) {
      btnDom.style.display = visiable ? '' : 'none';
    }
  }

  /**
   * 判断传入的值是否为null,'',undefined
   * **/
  export function isNull(str){
    return (str == null || str == '' || str == undefined) ? true : false;
  }

/**
 * 判断传入的值如果不是（null,'',undefined）
 * **/
  export function isNotNull(str){
    return !isNull(str);
  }

  /**
   * 通过表格列名获取该列所在的列数
   * BillList- 对应的列表对象，例如：d1_BillList
   * colName - 列的字段名
   */
  export function getBillListColIndex(BillList, colName){
    var cols = BillList.getBillListColumns();
    var colNum = 0;
    for(var i = 0;i < cols.length;i++){
      if(cols[i].itemkey === colName){
        colNum = i;
        break;
      }
    }
    return colNum;
  }


  /**
   * 通过客户编号校验客户是否为不宜贷款户
   * @param {客户编号} cusId
   */
  export function checkCusData4App(cusId){
    var rtnData = {};
    //调用ajax请求落地后端接口数据
    xutils.request({
      async: false, // 同步请求
      type:'get',
      url: backend.cmisCus + '/api/cuspubblacklistrs/checkCusPubBlacklistRs/' + cusId,
      success: function (response, status, xhr) {
        console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
        if (response.code == '0') {
            rtnData = response.data;
        } else {
          xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
        }
      },
      error: function (result, b) {
          console.log(result + '；错误信息：' + b);
        xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      }
    });

    if(JSON.stringify(rtnData) === '{}'){
        return false;
    }

    return rtnData;
  }

//获取适用产品名称
export function getSuitPrdName(param){
  //保存操作
  var rtnData = '';
  var rtnFlag = true;
  //调用ajax请求落地后端接口数据
  xutils.request({
      async: false, // 同步请求
      url: backend.cmisCfg + '/api/cfgprdbasicinfo/getSuitPrdName',
      data:JSON.stringify(param),
      success: function (response, status, xhr) {
          console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            xutils.showMsgBox('提示', '错误信息：' + response.message);
          }
      },
      error: function (result, b) {
          console.log(result + '；错误信息：' + b);
        xutils.showMsgBox('提示', '错误信息：' + b); // 弹出提示
      }
  });

  //针对异常的场景，rtnData未赋值，直接返回不进行后续处理
  if(!rtnFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == ''){
    return '';
  }
  return rtnData;

}
