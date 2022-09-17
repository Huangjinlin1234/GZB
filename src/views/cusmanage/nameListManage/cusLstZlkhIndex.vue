<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusLstZlkh_d1_BillList.vue';

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
    /**
       * 战略客户名单
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },


    // 查看
    viewFn () {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      row.opType = 'view';
      this.$dialog.open('', 'cusmanage/nameListManage/cusLstZlkhDetailIndex', -1, -1, row, null);
    },

    // 删除
    deleteFn () {
      var row = this.d1_BillList.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      this.$request({
        method: 'POST',
        url: this.$backend.cmisCus + '/api/cuslstzlkh/delete/' + row.serno,
      }).then((response) => {
         if (response.code == '0') {
          this.d1_BillList.queryDataByCondition();
          this.$message('删除成功!');
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '删除失败!', type: 'error' });
      });;
    },

    // 启用
    EnableButton () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '1') {
          this.$xutils.showMsgBox('提示', '该客户已被启用!');
          return;
        } else {
          selectedRowData.status = '1';
          this.sendStartState(selectedRowData);
          let rowData = selectedRowData
          rowData.statusDispV = '启用'
          rowData.oldStatus = '0'
          rowData.oldStatusDispV = '停用'
          this.UTraceSet(rowData);
        }
      }
    },

    // 停用
    StopUsingButton () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();
      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      } else {
        if (selectedRowData.status == '0') {
          this.$xutils.showMsgBox('提示', '该客户已被停用!');
          return;
        } else {
          selectedRowData.status = '0';
          this.sendStartState(selectedRowData);
          let rowData = selectedRowData
          rowData.statusDispV = '停用'
          rowData.oldStatus = '1'
          rowData.oldStatusDispV = '启用'
          this.UTraceSet(rowData);
        }
      }
    },
    sendStartState (corp) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cuslstzlkh/updateSelective',
        data: JSON.stringify(this.$xutils.toUpperCase(corp, true)),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('启用/停用 提示', '操作成功');
          this.d1_BillList.queryDataByCondition();
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
    },
    UTraceSet (rowData) {
      let params = {
        mFieldId: "status",
        mFieldNm: "状态",
        mMenuId: "cuslstzlkh",
        mNewDispV: rowData.statusDispV,
        mNewV: rowData.status,
        mOldDispV: rowData.oldStatusDispV,
        mOldV: rowData.oldStatus,
        mPkV: "cusbankbase_form" + rowData.serno,
        orgId: this.$xutils.getDefaultformulaData("$LoginOrgId"),
        usrId: this.$xutils.getDefaultformulaData("$LoginLoginCode"),
      }
      let arr = [];
      arr[0] = params
      console.info('arr[0]', arr[0])
      this.$request({
        url: this.$backend.appOcaService + "/api/utrace/save",
        method: "POST",
        data: arr,
      }).then(({ code, data }) => {
        if (code == "0") {
          // this.userList = data;
        }
        
      });
    },
  }
};
</script>
