<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNext">下一步</yu-button>
      <yu-button type="primary" @click="onClose">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billlist from './guarSelect_d2_BillList.vue';
/* 抵押注销申请-押品选取*/
let userInfo;

let parm = {};

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      parm = this.pageParams;
      userInfo = this.$xutils.getLoginUserInfo();
      // regType 01抵押登记 02抵押注销
      // regState01已登记 02 未登记 03已注销
      // var regState = parm.regType === '01' ? '02' : '01';
      // 展示担保合同下所有抵押品
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.baseParams = {condition: {
        guarContNo: parm.guarContNo,
        //    regState: regState,
        regType: '02'
      }};
      // this.d1_BillList.queryDataByCondition({ guarContNo: parm.guarContNo });
    },

    /** *下一步****/
    doNext () {
      // 选择押品后保存到抵押登记押品明细表（可多选）
      const jsoPar = this.d1_BillList.getSelectedRowsData();
      if (parm.type == 'ADD') {
        if (jsoPar == null || jsoPar == '') {
          this.$xutils.showMsgBox('提示', '必须选择至少一条记录进行操作!\r\n请重新操作!', -1, -1);
          return;
        }
        // 判断当前担保合同有没有发起过抵押登记申请，如果已发起提示在途
        // const booleanFlag = this.isExistByGuarContNo(parm.guarContNo);
        // const booleanFlag = false;
        // if (booleanFlag) {
        //   this.$xutils.showMsgBox('提示', '当前担保合同存在一笔待发起的抵押登记申请!', -1, -1);
        //   return;
        // }
      }
      // 字段映射
      jsoPar.forEach(item => {
        item['guarTypeCdName'] = item.newlabel;
      });

      var opJso = {};
      var title = '抵押注销新增';

      // 调用后台代码，检查该押品的权证状态是否符合要求
      // const flag = this.checkData();

      // if (!flag) {
      //   return;
      // }

      opJso['guarCont'] = this.pageParams;
      opJso['guar'] = jsoPar;
      opJso['type'] = this.pageParams.type;
      opJso['regType'] = '02';

      this.$dialog.open(title, 'guarmanage/registerManage/guarMortgageRegisterAppFormIndex.vue', -1, -1, opJso, () => {
        this.$dialog.close(this.dialogId);
      });
    },

    isExistByGuarContNo (guarContNo) {
      let saveFlag = false;

      // var rtnData = {};
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/isExistByGuarContNo',
        data: guarContNo,
        success: (response, status, xhr) => {
          if (response.code == '000000') {
            saveFlag = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return saveFlag;
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
      // this.$dialog.closeAll();
    },

    // 添加校验，判断该核心客户是否有信贷业务记录
    checkData () {
      let flag = false;
      const param = this.d1_BillCard.getBillCardValue();
      const jsoPar = this.d1_BillList.getSelectedRowsData();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisLmt + '/api/apprstrmtableinfo/selectByCusId',
        data: {cusId: param.coreCusId},

        success: (response, status, xhr) => {
          const data = response.data;

          if (data.rtnCode != 'ECL070000') {
            this.$xutils.showMsgBox('提示', '错误信息：' + data.rtnMsg, 450, 300, () => {
              flag = false;
            });
          } else {
            flag = true;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '处理异常： ' + JSON.stringify(result), 450, 300);
        }
      });

      return flag;
    },

    // 入库检查押品是否被未审批通过的抵押登记引用
    checkGuarStatus (guarNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarmortgagemanageapp/selectByGuarNo/' +
          guarNo,

        success: (response, status, xhr) => {
          if (response.data == null || response.data == '') {
            returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该押品1【' + guarNo + '】关联的流水号为【' + response.data + '】的抵押登记未审批通过!', 350, 150);
          }
        }
      });

      return returnData;
    },
    // 入库检查该押品是否有在途的权证入库申请
    checkIsOnTheWay (guarNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarwarrantmanageapp/checkGuarNoIsOnTheWay/' +
          guarNo,

        success: (response, status, xhr) => {
          if (response.data == 'noExist') {
            returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该押品【' + guarNo + '】有在途的权证入库申请!', 350, 150);
          }
        }
      });

      return returnData;
    }
  }
};
</script>
