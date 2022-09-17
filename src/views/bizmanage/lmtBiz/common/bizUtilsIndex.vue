<template>
  <div></div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**流程业务工具类**/
    /**
       * 时间字符串格式化-该方法仅适用与操作时间类型为STD_ZB_CHAGE_TYP
       * date为时间字符串
       * operType为操作时间类型 001-年，002-月，003-日
       * operNum为时间加减天数
       **/
    getTimeOperator(date, operType, operNum) {
      //将时间字符串转化为时间对象
      if (String(operNum).indexOf('.') != -1) {
        this.$xutils.showMsgBox('提示', '不支持小数部分的日期运算！');
        return;
      }

      let formatDate = new Date(date.replace('/-/g', '/'));

      if (operType == '001') {
        //年份计算
        formatDate = formatDate.setYear(formatDate.getFullYear() + operNum * 1);
      } else if (operType == '002') {
        //月份计算
        formatDate = formatDate.setMonth(formatDate.getMonth() + operNum * 1);
      } else if (operType == '003') {
        //日期计算
        formatDate = formatDate.setDate(formatDate.getDate() + operNum * 1);
      }

      const newFormatDate = new Date(formatDate);
      const newDateYear = newFormatDate.getFullYear();
      let newDateMonth = newFormatDate.getMonth() + 1;

      if (newFormatDate.length == 1) {
        newDateMonth = '0' + newDateMonth;
      }

      let newDateDay = newFormatDate.getDate();

      if (newDateDay.length == 1) {
        newDateDay = '0' + newDateDay;
      }

      return this.$xutils.formatDate(new Date(newDateYear + '-' + newDateMonth + '-' + newDateDay));
    },

    /**查询模块 隐藏/展示  查询/重置/灵活查询  按钮
       * BillQueryName-查询模块的名称，如：d1_BillQuery
       * type-按钮类型，query-查询按钮 reset-重置按钮 flexQuery-灵活查询
       * visiable是否可见  可见-true  不可见-false
       * **/
    hideOrShowBillQueryQueryBtn(BillQueryName, type, visiable) {
      let btnName = '';

      if (type == 'query') {
        btnName = 'YuXPUtil.reflectCall(\'' + BillQueryName + '\',\'onBillQuerySearch\',\'\',this,event);';
      } else if (type == 'reset') {
        btnName = 'YuXPUtil.reflectCall(\'' + BillQueryName + '\',\'resetBillQueryData\',\'\',this,event);';
      } else if (type == 'flexQuery') {
        btnName = 'YuXPUtil.reflectCall(\'' + BillQueryName + '\',\'onBillQueryMore\',\'\',this,event);';
      }

      const btnDom = this.self.document.querySelector('button[onclick="' + btnName + '"]');

      if (btnDom) {
        btnDom.style.display = visiable ? '' : 'none';
      }
    },

    /**
       * 判断传入的值是否为null,'',undefined
       * **/
    isNull(str) {
      return str == null || str == '' || str == undefined ? true : false;
    },

    /**
       * 通过表格列名获取该列所在的列数
       * BillList- 对应的列表对象，例如：d1_BillList
       * colName - 列的字段名
       */
    getBillListColIndex(BillList, colName) {
      const cols = BillList.getBillListColumns();
      let colNum = 0;

      for (let i = 0; i < cols.length; i++) {
        if (cols[i].itemkey === colName) {
          colNum = i;
          break;
        }
      }

      return colNum;
    },

    /**
       * 通过客户编号校验客户是否为不宜贷款户
       * @param {客户编号} cusId
       */
    checkCusData4App(cusId) {
      let rtnData = {};

      //调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisCus + '/api/cuspubblacklistrs/checkCusPubBlacklistRs/' + cusId,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      if (JSON.stringify(rtnData) == '{}') {
        return false;
      }

      return rtnData;
    },

    //获取适用产品名称
    getSuitPrdName(param) {
      //保存操作
      let rtnData = '';

      let rtnFlag = true;

      //调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/getSuitPrdName',
        data: JSON.stringify(param),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            this.$xutils.showMsgBox('提示', '错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '错误信息：' + b); // 弹出提示
        }
      });

      //针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!rtnFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return '';
      }

      return rtnData;
    }
  }
};
</script>
