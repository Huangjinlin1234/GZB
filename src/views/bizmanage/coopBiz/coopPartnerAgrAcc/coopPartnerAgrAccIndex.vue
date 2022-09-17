<template>
  <div>
    <yu-panel title="合作方协议台账" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refCoopTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType"></yu-xform-item>
          <yu-xform-item label="协议状态" ctype="select" data-code="COOP_PARTNER_AGR_STS" placeholder="协议状态" name="agrStatus"></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="经办日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="yu-xuser" placeholder="经办人" @select-fn="commonSelectFn" :mapping="{ loginCode: 'inputId' }" name="inputId"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="yu-xorg" placeholder="经办机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'inputBrId' }" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" v-if="checkCtrl('delete')" @click="invalid">作废</yu-button>
        <yu-button type="primary" v-if="checkCtrl('view')" @click="lookup">查看</yu-button>
      </template>
      <yu-xtable ref="refCoopTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="{sort: 'inputDate desc'}" request-type="post">
        <yu-xtable-column label="协议编号" prop="coopAgrNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="协议金额" prop="coopAgrAmt"></yu-xtable-column>
        <yu-xtable-column label="协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
        <yu-xtable-column label="协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
        <yu-xtable-column label="协议签订日" prop="coopAgrSignDate"></yu-xtable-column>
        <yu-xtable-column label="协议状态" prop="agrStatus" data-code="COOP_PARTNER_AGR_STS"></yu-xtable-column>
        <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/query'
    };
  },
  methods: {
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    invalid () {
      const rowData = this.$refs.refCoopTable.selections[0];
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      const agrStatus = rowData.agrStatus; // 协议状态
      const inputId = rowData.inputId;
      if (agrStatus != '01' || inputId != this.$xutils.getLoginUserInfo().loginCode) {
        this.$xutils.showMsgBox('提示', '只能作废生效的且责任人是自己的协议!');
        return;
      }
      this.$xutils.showConfirmBox('提示', '你真的想作废选中的记录行?\r\n请谨慎操作!', 350, 150, _isOK => {
        if (_isOK) {
          rowData.agrStatus = '02';
          this.$xutils.request({
            url: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/update',
            data: JSON.stringify(rowData),
            type: 'POST',
            async: true,
            success: (response, status, xhr) => {
              if (response.code == 0) {
                this.$xutils.showMsgBox('提示', '作废成功', '300', '150', () => {
                  // 删除成功后刷新列表
                  this.$refs.refCoopTable.remoteData();
                });
              }
            }
          });
        }
      });
    },
    lookup () {
      const rowData = this.$refs.refCoopTable.selections[0];
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      let title = '合作方协议台账查看';
      let jsonParam = yufp.clone(rowData, {});
      jsonParam.op = 'details';
      jsonParam.from = 'coopPartnerAgrAcc';
      jsonParam.serno = jsonParam.coopAgrSerno;
      jsonParam.isFromAgrMenu = true;
      this.$router.addTab({
        name: 'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppDetailIndex',
        key: 'custom_view_' + jsonParam.serno,
        title: title,
        data: jsonParam
      });
    }
  }
};
</script>
