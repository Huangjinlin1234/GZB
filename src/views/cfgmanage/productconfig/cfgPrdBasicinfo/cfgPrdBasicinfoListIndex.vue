<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgPrdBasicinfoList_d1_BillList.vue';

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
    let _this = this;
    _this.AfterInit();
  },
  methods: {
    /**
     * 产品配置列表页面
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition({ oprType: '01' });
      this.d1_BillList.setAppendSQLCondition({ oprType: '01' });
    },

    // 新增
    addFn () {
      this.$dialog.open('新增', 'cfgmanage/productconfig/cfgPrdBasicinfo/cfgPrdBasicinfoAddIndex', 900, 650, null, () => {
        this.d1_BillList.queryDataByCondition({ oprType: '01' });
      });
    },
    // 修改
    editFn () {
      let row = this.d1_BillList.getSelectedRowData();
      console.log('tttttt', JSON.stringify(row));
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      row.opType = 'edit';

      this.$dialog.open('修改', 'cfgmanage/productconfig/cfgPrdBasicinfo/cfgPrdBasicinfoDetailIndex', 1280, 960, row, () => {
        this.d1_BillList.queryDataByCondition({ oprType: '01' });
      });
    },

    // 查看
    viewFn () {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      row.opType = 'view';
      this.$dialog.open('查看', 'cfgmanage/productconfig/cfgPrdBasicinfo/cfgPrdBasicinfoDetailIndex', 1280, 960, row, null);
    },

    // 产品复制
    copyFn () {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录');
        return;
      }

      // let prdIds = 'PRD' + this.$xutils.getDefaultformulaData('$CURRTIME');
      let prdIds = 'PRD' + new Date().getTime().toString().slice(7, 12);
      row.prdId = prdIds;
      row.opType = 'copy';
      this.$dialog.open('产品复制', 'cfgmanage/productconfig/cfgPrdBasicinfo/cfgPrdBasicinfoDetailIndex', 1500, 960, row, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 逻辑删除
    deleteFn () {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$xutils.showMsgBox('提示', '你真的想删除选中的记录行? \n请谨慎操作!', 350, 150, _rt => {
        this.ajaxDelete(row);
      });
    },

    // 调用后台逻辑进行逻辑删除
    ajaxDelete (row) {
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/deleteCfgPrdBasicinfo',
        data: JSON.stringify(this.$xutils.toUpperCase(row, true)),

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, () => {
              this.d1_BillList.queryDataByCondition({ oprType: '01' });
            });
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
