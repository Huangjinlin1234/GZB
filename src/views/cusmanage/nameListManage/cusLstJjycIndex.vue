<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusLstJjyc_d1_BillList.vue';
import { request } from 'xy-utils';

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
    /**
     * 经济依存客户名单
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 批量导入
    byImport () {
      this.$dialog.open(
        '文件导入',
        'common/excelImportIndex',
        500,
        300,
        {
          templetcode: 'cus_lst_jjyc_list'
        },
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 模板下载--TODO--wangyang
    byModelDown () {
      var url = this.$backend.cmisCus + '/api/cuslstjjyc/exporttemplate?querytime=' + new Date().getTime();
      request({
        url: url,
        method: 'get'
      });
      // var elemIF = document.createElement('iframe');
      // elemIF.src = url;
      // elemIF.style.display = 'none';
      // document.body.appendChild(elemIF);
    },

    // 查看
    viewFn () {
      const row = this.d1_BillList.getSelectedRowData();
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      row.opType = 'view';
      this.$dialog.open(
        '',
        'cusmanage/nameListManage/cusLstJjycDetailIndex',
        -1,
        -1,
        row,
        null
      );
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
        }
      }
    },

    sendStartState (corp) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisCus + '/api/cuslstjjyc/updateSelective',
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
    }
  }
};
</script>
