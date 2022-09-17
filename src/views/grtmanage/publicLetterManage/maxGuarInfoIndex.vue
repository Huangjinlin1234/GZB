<template>
  <d1-billlist :page-params="pageParams" ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './maxGuarInfo_d1_BillList.vue';
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
       *
       担保合同信息(对公用信管理)
       *  @author 刘权
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    insert () {
      let rowData = {};
      if (this.getFactory().contextData) {
        rowData = this.getFactory().contextData;
      } else {
        yufp.clone(this.pageParams, rowData);
      }

      this.$dialog.open(
        '担保合同新增向导',
        'grtmanage/publicLetterManage/maxGuarInsertIndex',
        900,
        650,
        rowData,
        () => {
          this.refreshBillListData();
        }
      );
    },

    refreshBillListData () {
      this.d1_BillList.queryDataByCondition();
    },

    // 引入
    OnImport () {
      let rowData = {};
      if (this.getFactory().contextData) {
        rowData = this.getFactory().contextData;
      } else {
        yufp.clone(this.pageParams, rowData);
      }
      this.$dialog.open(
        '担保合同(引入)',
        'grtmanage/publicLetterManage/maxGuarImportIndex',
        900,
        650,
        rowData,
        () => {
          this.refreshBillListData();
        }
      );
    },

    // 取消引入
    offImport () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      // 操作类型赋值为02
      params.opr_type = '02';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        type: 'post',

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
              // 列表刷新
              this.d1_BillList.queryDataByCondition();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },

    // 修改
    update () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      this.$dialog.open(
        '担保合同修改',
        'grtmanage/publicLetterManage/maxGuarUpdateIndex',
        900,
        650,
        params
      );
    },

    // 签订
    sign () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      if (params.guarContState == '101') {
        this.$xutils.showMsgBox('提示', '只能签订未生效的合同!', 350, 150);
        return;
      }

      // 合同状态赋值已生效
      params.guarContState = '101';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        type: 'post',

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '签订成功', 350, 150, () => {
              // 列表刷新
              this.d1_BillList.queryDataByCondition();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    },

    // 查看
    check () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      this.$dialog.open(
        '担保合同信息查看',
        'grtmanage/publicLetterManage/maxGuarCheckIndex',
        900,
        650,
        params
      );
    },

    // 删除
    Ondelete () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '请选择一条数据!', 350, 150);
        return;
      }

      if (params.guarContState == '101') {
        this.$xutils.showMsgBox('提示', '只能删除未生效的合同!', 350, 150);
        return;
      }

      // 操作类型赋值为02
      params.opr_type = '02';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/update',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        type: 'post',

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
              // 列表刷新
              this.d1_BillList.queryDataByCondition();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
    }
  }
};
</script>
