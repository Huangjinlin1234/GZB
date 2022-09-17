<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpAppList_d1_BillList.vue';
export default {
  components: {d1Billlist},
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
    // 集团客户认定申请
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition();
    },

    // 集团客户认定新增
    doInsert () {
      this.$dialog.open('集团客户认定申请', 'cusmanage/cusgrp/cusgrpapp/cusGrpAppAddIndex', 500, 400, null, this.callBack);
    },

    // 集团客户认定修改
    doUpdate () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 判断流程审批
      const approveStatus = params.approveStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的集团客户可以修改!');
        return;
      }

      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000245';
      params['op'] = 'update';
      this.$dialog.open('集团客户认定', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, params, this.callBack);
    },

    // 删除集团记录，逻辑删除
    doDelete () {
      // 判断流程审批
      const params = this.d1_BillList.getSelectedRowData();
      const approveStatus = params.approveStatus;

      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.inputId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的集团客户可以删除!');
        return;
      }

      // 进行逻辑删除操作
      this.d1_BillList.onBillListLogicDelete();
    },

    doView () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000245';
      params['op'] = 'view';
      this.$dialog.open('集团客户', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, params, this.callBack);
    },

    callBack () {
      this.d1_BillList.queryDataByCondition({appType: '01'});
    }
  }
};
</script>
