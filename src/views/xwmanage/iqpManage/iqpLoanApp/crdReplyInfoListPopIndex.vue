<template>
<div>
    <yu-panel title="授信批复POP" :hideFilter="false" :collapseHide="false">
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
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="批复额度类型" prop="limitType" data-code="STD_LIMIT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="批复金额" prop="replyAmt" ></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="管护人" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="管护机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="管护人" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="管护机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="是否无还本续贷" prop="isWxbxd"  hide-column></yu-xtable-column>
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
import d1Billlist from './crdReplyInfoListPop_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // d1_BillList: null,
      dataUrl: this.$backend.cmisBiz + '/api/lmtcrdreplyinfo/selectbymodelxw',
      // 批复状态=生效。
      // 只显示存在手工新增合同场景的产品批复。
      // 小微条线的
      // 只能选自己的批复 , managerId: this.$store.state.oauth.loginCode
      baseParams: {condition: {oprType: '01', replyStatus: '01', belgLine: '01', managerId: this.$store.state.oauth.loginCode, managerBrId: this.$store.state.oauth.org.code}, sort: 'inputDate desc'}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增合同申请界面 下一步/取消按钮*/
    afterInit () {
      // this.d1_BillList = this.$refs.d1_BillList;
      // this.queryReplyList();
    },


    // /* 选择*/
    // doSelect () {
    //   const params = this.d1_BillList.getSelectedRowData();
    //   if (params == null) {
    //     this.$xutils.showMsgBox('提示', '请选择一条数据!');
    //     return;
    //   }
    //   let s = new Date(params.inputDate).getTime();
    //   let n = new Date().getTime();
    //   let day = Math.floor((n - s) / (24 * 3600 * 1000));
    //   if (day >= 30) {
    //     this.$xutils.showMsgBox('提示', '当前批复已到期!');
    //     return;
    //   }
    //   this.$dialog.close(this.dialogId, params);
    // },
    /* 选择*/
    doSelect (index, rows) {
      if (rows == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      // debugger;
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      let s = Date.parse(rows.replyStartDate);
      let n = Date.parse(openday);
      let day = Math.floor((n - s) / (24 * 3600 * 1000));
      if (day >= 30) {
        this.$message({message: '当前批复已到期'});
        return;
      }
      this.$dialog.close(this.dialogId, rows);
    },

    doCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
