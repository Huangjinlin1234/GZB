<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './dedkkhInfo_d1_BillList.vue';
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
    this.afterInit();
  },
  methods: {
    /**
     * 大额贷款客户名单页面
     */
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    insert () {
      this.$dialog.open('大额贷款客户名单', 'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex', -1, -1, {op: 'add'}, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 修改
    update () {
      let selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      const statusCus = selectedRowData.status;
      if (statusCus == '1' || statusCus == '0') {
        this.$xutils.showMsgBox('提示', '已生效失效数据不可修改!');
        return;
      }
      selectedRowData['op'] = 'edit';
      this.$dialog.open(
        '大额贷款客户名单',
        'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
        -1,
        -1,
        selectedRowData,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 查看
    view () {
      let selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }
      selectedRowData['op'] = 'details';
      this.$dialog.open(
        '大额贷款客户名单详细信息',
        'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
        -1,
        -1,
        selectedRowData
      );
    },

    // 启用
    start () {
      var _this = this;
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (selectedRowData.status == '1') {
        this.$xutils.showMsgBox('提示', '该客户已被启用!');
        return;
      }
      // if (selectedRowData.status == '2') {
      //   this.$xutils.showMsgBox('提示', '暂存客户无法进行启用!');
      //   return;
      // }
      var result = '';
      selectedRowData.status = '1';
      result = _this.sendStartState(selectedRowData);
      if (result != '1') {
        this.$xutils.showMsgBox('提示', '启用成功');
      }
    },

    // 停用
    stop () {
      var _this = this;
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (selectedRowData.status == '0') {
        this.$xutils.showMsgBox('提示', '该客户已被停用!');
        return;
      }
      if (selectedRowData.status == '2') {
        this.$xutils.showMsgBox('提示', '暂存客户无法进行停用!');
        return;
      }
      var result = '';
      selectedRowData.status = '0';
      result = _this.sendStartState(selectedRowData);
      if (result != '1') {
        this.$xutils.showMsgBox('提示', '停用成功');
      }
    },

    sendStartState (data) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cuslstdedkkh/updateselective',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['data'] = response.data;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.responseJSON.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      return rsPars;
    }
  }
};
</script>
