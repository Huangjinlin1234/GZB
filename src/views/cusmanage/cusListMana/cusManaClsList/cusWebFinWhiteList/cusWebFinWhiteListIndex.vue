<template>
  <yu-tabs type="card">
    <yu-tab-pane label="名单准入与停用申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="网金客户白名单">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cusWebFinWhiteList_d1_1_BillList.vue';
import d12Billlist from './cusWebFinWhiteList_d1_2_BillList.vue';
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 彭磊   网金客户白名单
     *
     */
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // d1_1  操作
    // 修改
    doUpdate () {
      const par = this.d1_1_BillList.getSelectedRowData();
      if (!par) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      const apprStatus = par.approveStatus;// 审批状态
      const inputId = par.inputId;// 登记人
      if (!(apprStatus == '000' || apprStatus == '992') || inputId != this.$xutils.getLoginUserInfo().loginCode) {
        this.$xutils.showMsgBox('提示', '只能修改审批状态为【待发起】、【打回】且经办人是自己的网金客户白名单！');
        return;
      }
      par['opType'] = 'edit';
      var url = 'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppUpdateIndex';
      if (par.busiType == '02') {
        url = 'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListStopUpdateIndex';
      }

      this.$dialog.open(
        '网金客户白名单准入',
        url,
        -1,
        -1,
        par,
        () => {
          this.d1_1_BillList.queryDataByCondition();
        }
      );
    },

    // 新增
    doAdd () {
      this.$dialog.open(
        '',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppAddIndex',
        650,
        300,
        null,
        () => {
          this.d1_1_BillList.queryDataByCondition();
        }
      );
    },

    doDelete(){
      const par = this.d1_1_BillList.getSelectedRowData();
      if (!par) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      const apprStatus = par.approveStatus;// 审批状态
      const inputId = par.inputId;// 登记人
      if (!(apprStatus == '000' || apprStatus == '992') || inputId != this.$xutils.getLoginUserInfo().loginCode) {
        this.$xutils.showMsgBox('提示', '只能修改审批状态为【待发起】、【打回】且经办人是自己的网金客户白名单！');
        return;
      }
      this.d1_1_BillList.onBillListDelete();
    },

    // 查看
    doView () {
      const par = this.d1_1_BillList.getSelectedRowData();
      if (!par) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }
      par['opType'] = 'view';

      this.$dialog.open(
        '修改调查',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppUpdateIndex',
        -1,
        -1,
        par,
        () => {
        }
      );
    }
  }
};
</script>
