<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './templetfactorylist_d1_BillList.vue';
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
     * 模板工厂列表页面
     */

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    addFn () {
      this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/templetfactoryaddIndex', 900, 650, null, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 删除
    deleteFn () {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录');
        return;
      }

      this.$xutils.showConfirmBox('提示', '将会关联删除模板子表,请确认?', 325, 125, _isOk => {
        if (_isOk) {
          this.$xutils.request({
            url: this.$backend.cmisCfg + '/api/cfgmodelgroup/deletecas/' + row.modelGroupNo,
            type: 'post',
            success: resp => {
              if (resp.data) {
                this.$xutils.showMsgBox('提示', '删除成功', '325', '125', () => {
                  this.d1_BillList.queryDataByCondition();
                });
              }
            },

            error: () => {
              this.$xutils.showMsgBox('提示', '删除失败');
            }
          });
        }
      });
    },

    // 修改
    editFn () {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录');
        return;
      }

      row.opType = 'edit';

      this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/templetfactorydetailIndex', 900, 650, row, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 查看
    viewFn () {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录');
        return;
      }

      row.opType = 'view';

      this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/templetfactorydetailIndex', 900, 650, row, null);
    },

    // 预览
    previewFn () {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录');
        return;
      }

      const params = {};
      params.model_group_no = row.modelGroupNo;

      this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, params, null);
    }
  }
};
</script>
