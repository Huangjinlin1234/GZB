<template>
  <!--
    @created by creazyCder 2021-05-20 10:08:43
    @updated by 2021-05-20 10:08:43
    @updated by 2021-05-20 10:08:43
    @description 还款计划变更申请-增删改查
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="还款计划变更协议签订" name="first">
        <yu-panel panel-type="normal">
          <yu-xform related-table-name="refTable1" form-type="search" v-model="searchFormdata" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <template panel-type="simple">
            <yu-button-drop style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('export')" @click="printFn">打印</yu-button>
              <yu-button type="primary" v-if="checkCtrl('sign')" @click="onUpdate(true,1)">签订</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="onUpdate(false, 1)">详情</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable1" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" :base-params="{ condition: { approveStatus:'997',contapply: 'Y' } ,'sort':'inputDate desc'}">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="原还款方式" prop="oldRepayMode" data-code="STD_REPAY_MODE"></yu-xtable-column>
            <yu-xtable-column label="变更后还款方式" prop="repayMode" data-code="STD_REPAY_MODE"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="协议状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xdialog :visible.sync="visiable" width="400px" title="还款计划变更引导界面">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata">
            <yu-xform-group :column="3">
              <yu-xform-item label="原借据编号" colspan="24" ctype="yu-xloan" name="billNo" rules="required" placeholder="原借据编号" :mapping="{ billNo: 'billNo', accStatus: 'accStatus' }" width="960" height="480" @select-fn="commonSelectFn"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="doNextStep">下一步</yu-button>
            <yu-button type="primary" @click="visiable = !visiable">返回</yu-button>
          </yu-form-buttons>
        </yu-xdialog>
      </yu-tab-pane>
      <yu-tab-pane label="还款计划变更申请历史" name="seconed">
        <yu-panel panel-type="normal">
          <yu-xform related-table-name="refTable2" form-type="search" v-model="searchFormdata" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <template panel-type="simple">
            <yu-button-drop style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="onUpdate(false, 2)">详情</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable2" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" :base-params="{ condition: {approveStatus:'997', conthistory: 'Y' } ,'sort':'inputDate desc'}">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="原还款方式" prop="oldRepayMode" data-code="STD_REPAY_MODE"></yu-xtable-column>
            <yu-xtable-column label="变更后还款方式" prop="repayMode" data-code="STD_REPAY_MODE"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="协议状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="contApproveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE,STD_CONT_STATUS,STD_ZB_APPR_STATUS,STD_REPAY_MODE');
export default {
  components: {},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/',
      updateUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/update',
      addUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/iqprepaywaychg/batchdelete/',
      formdata: {},
      visiable: false,
      formDisabled: false,
      activeName: 'first',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      _this.visiable = true;
    },
    printFn: function () {
      var _this = this;
      let row = this.$refs['refTable' + 1].selections[0];
      if (row == null) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      
      console.log(row);
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpf';
      row.src = _this.$backend.frptRptService + 'buchong-1.cpt&type=3&serno=' + row.iqpSerno + '&billNo=' + row.billNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '还款计划变更签订',
        // 传递的业务数据，可选配置
        data: row
      });
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqprepaywaychg/iqpRepayWayChgSignMain',
        key: 'custom2_view_' + key + '_' + new Date().getTime() ,
        title: title,
        data: params
      });
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    /**
     * 修改
     */
    onUpdate (updateFlag, index) {
      let _this = this;
      let row = this.$refs['refTable' + index].selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if(updateFlag){
        if(row.contApproveStatus !='000' && row.contApproveStatus !='992'){
          this.$xutils.showMsgBox('提示', '该条记录不是待发起或打回状态，无法修改！');
          return;
        }
      }
      row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
      row.opDetialType = 'SIGN';
      row.callback = function () {
        _this.$refs['refTable' + index].remoteData();
      };
      this.opendTab(row, updateFlag ? '还款计划协议签订' : '还款计划协议查看', row.billNo);
    }
  }
};
</script>
