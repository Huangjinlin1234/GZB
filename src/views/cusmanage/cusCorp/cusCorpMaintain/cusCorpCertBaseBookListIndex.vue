<template>
  <d1-billlist :viewType="viewType" :base-params="baseParams" ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpCertBaseBook_d1_BillList.vue';

export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    cusCorp: Object,
    dialogId: String,
    viewType: String
  },
  data () {
    return {
      d1_BillList: null,
      cusId: null,
      baseParams:{
        condition:JSON.stringify({
          cusId: (this.pageParams && this.pageParams.cusId) || (this.cusCorp && this.cusCorp.cusId) || this.$route.meta.params.cusId
        })
      }
    };
  },
  mounted () {
    this.AfterInit();
  },
  created () {
    this.cusId = (this.pageParams && this.pageParams.cusId) || (this.cusCorp && this.cusCorp.cusId) || this.$route.meta.params.cusId;
  },
  methods: {
    AfterInit () {
      // 资本构成信息
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增
    doInsect () {
      var _this = this;
      let opParams = {
        op:'ADD',
        cusIdRel: this.cusId
      }
      console.info('opParams--------', opParams)
      _this.$dialog.open('账户登记', 'cusmanage/cusCorp/cusCorpMaintain/cusCorpCertBaseBookInfoIndex', '880', '800', opParams, function () {
         _this.d1_BillList.queryDataByCondition();
      });
    },
    // 修改
    doEdit () {
      var _this = this;
      var row = _this.d1_BillList.getSelectedRowData();
      if (!row) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let opParams = {
        op:'EDIT',
        row: row
      }
      _this.$dialog.open('账户登记修改', 'cusmanage/cusCorp/cusCorpMaintain/cusCorpCertBaseBookInfoIndex', '880', '600', opParams, () => {
        _this.d1_BillList.queryDataByCondition();
      });
    },
    // 查看
    doView () {
      var _this = this;
      var row = _this.d1_BillList.getSelectedRowData();
      if (!row) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let opParams = {
        op:'VIEW',
        row: row
      }
      _this.$dialog.open('账户登记查看', 'cusmanage/cusCorp/cusCorpMaintain/cusCorpCertBaseBookInfoIndex', '880', '600', opParams, () => {
      });
    }
  }
};
</script>
