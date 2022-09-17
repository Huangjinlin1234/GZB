<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpAppChgList_d1_BillList.vue';
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
    // 集团客户变更申请
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition();
    },

    // 集团客变更新增
    doInsert () {
      const jsoPar = {};

      // 变更
      jsoPar['appType'] = '02';
      // 页面跳转
      this.$dialog.open('集团客户变更申请', 'cusmanage/cusgrp/cusgrpapp/cusGrpAppChgAddIndex', 500, 400, jsoPar, this.callBack);
    },

    // 集团客户变更修改
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
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.managerId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的集团客户可以修改!');
        return;
      }
      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000307';

      // 标识修改进入，修改页面可以进行修改
      params['op'] = 'update';

      // 标识变更进入，返回时只查询变更数据
      params['appType'] = 'chg';
      this.$dialog.open('集团客户变更', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, params, this.callBack);
    },

    // 删除集团记录，逻辑删除
    doDelete () {
      const params = this.d1_BillList.getSelectedRowData();

      // 判断流程审批
      const approveStatus = params.approveStatus;

      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.managerId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的集团客户可以删除!');
        return;
      }
      // 进行逻辑删除操作
      this.d1_BillList.onBillListLogicDelete();
    },

    // 回调函数
    callBack () {
      this.d1_BillList.queryDataByCondition({appType: '02'});
    },

    // 查看
    doView () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000307';

      params['op'] = 'view';

      this.$dialog.open('集团客户变更', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, params, this.callBack);
    }
  }
};
</script>
