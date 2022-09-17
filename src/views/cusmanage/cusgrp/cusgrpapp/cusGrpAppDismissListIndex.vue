<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpAppDismissList_d1_BillList.vue';
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
    /*
      集团客户认定申请
      */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;

      //
      this.d1_BillList.queryDataByCondition();
    },

    // 集团解散新增
    doInsert () {
      const jsoPar = {};

      // 解散
      jsoPar['appType'] = '03';

      // 页面跳转
      this.$dialog.open(
        '集团客户解散申请',
        'cusmanage/cusgrp/cusgrpapp/cusGrpAppChgAddIndex',
        500,
        400,
        jsoPar,
        this.callBack
      );
    },

    // 集团客户认定修改
    doUpdate () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params['appType'] = '03';
      params['op'] = 'edit';
      // 判断流程审批
      const approveStatus = params.approveStatus;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((approveStatus && !(approveStatus == '000' || approveStatus == '992')) || loginCode != params.managerId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的集团客户可以修改!');
        return;
      }

      // 页面跳转
      // YuXP.openDialog('集团客户认定修改', '/yuxp/product/pages/cusmanage/cusgrp/cusgrpapp/cusGrpAppUpdate.js', -1, -1, params, null);

      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000245';

      // params['op'] = 'view';

      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    },

    // 删除集团记录，逻辑删除
    doDelete () {
      // 进行逻辑删除操作
      var row = this.d1_BillList.getSelectedRowData();
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      if ((row.approveStatus && !(row.approveStatus == '000' || row.approveStatus == '992')) || loginCode != row.managerId) {
        this.$xutils.showMsgBox('提示', '仅【待发起】及【打回】且经办人是自己的集团客户可以删除!');
        return;
      }
      this.d1_BillList.onBillListLogicDelete();
    },

    // 回调函数
    callBack () {
      this.d1_BillList.queryDataByCondition({appType: '03'});
    },

    doView () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();   

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      params['appType'] = '03';
      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000245';

      params['op'] = 'view';

      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        this.callBack,
        true,
        true
      );
    }
  }
};
</script>
