<template>
<div>
    <yu-panel title="授信批复替换列表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px"  :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="额度批复编号" ctype="input" placeholder="调查编号" name="replySerno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
     <!--   <yu-button-drop>
          <yu-button ref="btn_doView" @click="customClick('doSelect')" type="primary">选取</yu-button>
        </yu-button-drop> -->
      <yu-xtable ref="refTable" row-number  condition-key="condition" :baseParams="baseParams" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="额度批复编号" prop="replySerno" ></yu-xtable-column>
        <yu-xtable-column label="调查编号" prop="surveySerno" ></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" ></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="批复额度类型" prop="limitType" data-code="STD_LIMIT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="批复金额" prop="replyAmt" ></yu-xtable-column>
       <yu-xtable-column  fixed="right"  label="操作">
      <template slot-scope="scope">
        <yu-button  @click.native.prevent="doSelect(scope.$index, scope.row)"  type="primary"  size="small">
          选择
        </yu-button>
      </template>
    </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div>
</div></div></template>
<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // d1_BillList: null,
      dataUrl: this.$backend.cmisBiz + '/api/lmtcrdreplyinfo/selectbymodelxw',
      baseParams: {condition: {oprType: '01', replyStatus: '01', belgLine: '01', managerId: this.$store.state.oauth.loginCode, cusId: this.pageParams.cusId}, sort: 'inputDate desc'}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
    },
    doSelect (index, rows) {
      let _this = this;
      if (rows == null) {
        _this.$message({message: '请选择一条数据'});
        return;
      }
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      let s = Date.parse(rows.replyStartDate);
      let n = Date.parse(openday);
      let day = Math.floor((n - s) / (24 * 3600 * 1000));
      if (day >= 30) {
        this.$message({message: '当前批复已到期', type: 'warning'});
        return;
      }
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveychghis/replace',
        data: {contNo: _this.pageParams.contNo, replyNo: rows.replySerno},
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message({message: '替换成功！', type: 'success'});
            _this.$dialog.close(_this.dialogId, rows);
          } else {
            _this.$message({message: response.message, type: 'warning'});
          }
        }
      });
    },

    doCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
