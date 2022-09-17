<template>
  <d1-billlist ref="bRightsaarList"></d1-billlist>
</template>
<script>
import d1Billlist from './bRightsaar_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      bRightsaarList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       业务权申领页面
       */
    afterInit () {
      this.bRightsaarList = this.$refs.bRightsaarList;
    },
    onAppStart () {
      this.$dialog.open('业务权申领信息', 'cusmanage/biz_rights_aar/bRightsaarEditIndex', 1000, 800, {operate: 'add'}, () => { this.bRightsaarList.queryDataByCondition() });
    },
    update () {
      let selectedRowData = this.bRightsaarList.getSelectedRowData();
      if (!(selectedRowData.approveStatus == '000' || selectedRowData.approveStatus == '992')) {
        this.$xutils.showMsgBox('提示', '审批中流程不可修改!');
        return false;
      }
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      selectedRowData.operate = 'update';
      this.$dialog.open(
        '业务权申领信息修改',
        'cusmanage/biz_rights_aar/bRightsaarEditIndex',
        1000,
        800,
        selectedRowData,
        () => { this.bRightsaarList.queryDataByCondition() }
      );
    },
    onDelete () {
      const appSerno = this.bRightsaarList.getSelectedRowData().aarAppSerno;
      if (this.bRightsaarList.getSelectedRowData().approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '发起审批后流程不可删除!');
        return false;
      }
      const rsPars = {};
      this.$xutils.request({
        async: true,
        url: this.$backend.cmisCus + '/api/cusbizaarapp/delete/' + appSerno,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.bRightsaarList.queryDataByCondition();
            this.$xutils.showMsgBox('提示', '删除成功', 400, 200);
          } else {
            this.$xutils.showMsgBox('提示', '删除失败！', 400, 300);
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
    },
    view () {
      let selectedRowData = this.bRightsaarList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      selectedRowData.operate = 'details';
      this.$dialog.open(
        '业务权申领信息',
        'cusmanage/biz_rights_aar/bRightsaarEditIndex',
        1000,
        800,
        selectedRowData
      );
    }
  }
};
</script>
