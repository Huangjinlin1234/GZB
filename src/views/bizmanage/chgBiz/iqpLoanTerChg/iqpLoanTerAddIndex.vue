<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpLoanTerAdd_d1_BillList.vue'
/**贷款投向调整新增页面**/
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    //下一步操作
    //保存+跳转修改页面
    doNextStep() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      //判断合同状态是否正常 cont_status
      const contStatus = params.cont_status;

      if (contStatus != '200') {
        this.$xutils.showMsgBox('提示', '该合同不允许进行贷款投向变更!');
        return;
      }

      //生成业务流水号
      const iqp_serno = this.$xutils.getSEQWithParamFromServer('IQP_REPAY_SERNO');

      params['iqp_serno'] = iqp_serno;

      //调用后端生成放款申请记录的ajax请求
      let rtnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqpLoanTerAdd/saveIqpLoanTerInfo',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (response, result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      //针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(rtnData) == '{}') {
        return;
      }

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'refreshBillListData');

        //办理人员列表的关联主键名称为iqp_serno
        // params['iqp_serno'] = params.iqp_serno;

        params['model_group_no'] = 'CMG000068';//贷款投向调整模板
        params['op'] = 'EDIT';

        this.$dialog.open(
          '贷款投向调整修改页面',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      });
    },

    //返回操作
    cancel() {
      //刷新父级页面数据
      this.$xutils.getParentPage(this, null, 'refreshBillListData');

      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
