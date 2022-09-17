<template>
  <!--
    @created by creazyCder 2021-05-20 10:08:43
    @updated by 2021-05-20 10:08:43
    @updated by 2021-05-20 10:08:43
    @description 还款计划变更申请-增删改查
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="还款计划变更申请列表" name="first">
        <yu-panel panel-type="normal">
          <yu-xform related-table-name="refTable1" form-type="search" v-model="searchFormdata" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <template panel-type="simple">
            <yu-button-drop style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="onUpdate(true,1)">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="onUpdate(false,1)">详情</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable1" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" :base-params="{ condition: { apply: 'Y' },'sort':'inputDate desc' }">
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
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xdialog :visible.sync="visiable" width="400px" title="还款计划变更引导界面">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata">
            <yu-xform-group :column="3">
              <yu-xform-item label="原借据编号" colspan="24" ctype="yu-xloan" name="billNo" rules="required" placeholder="原借据编号" :parms="{condition: {'managerId':managerId, 'accStatus': '1'}}" :mapping="{ billNo: 'billNo', accStatus: 'accStatus' }" width="1060" height="480" @select-fn="commonSelectFn"></yu-xform-item>
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
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <template panel-type="simple">
            <yu-button-drop style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="onUpdate(false,2)">详情</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable2" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" :base-params="{ condition: { history: 'Y' } ,'sort':'inputDate desc'}">
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
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE,STD_REPAY_MODE,STD_ZB_APPR_STATUS');
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
      saveBtnShow: true,
      managerId: this.$xutils.getDefaultformulaData("$LoginLoginCode")
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
    doNextStep () {
      let _this = this;
      let row = {};
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const selPars = this.formdata;
      if (selPars.accStatus != '1') {
        this.$xutils.showMsgBox('提示', '该借据不允许进行还款计划调整', 350, 150);
        return;
      }
      // 调用序列号生成的规则，生成放款申请序列号
      const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO');
      const iqpratechgapp = {
        billNo: selPars.billNo,
        iqpSerno: rateCHGSerno
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqprepaywaychg/create',
        data: iqpratechgapp,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            row = yufp.clone(response.data);
            row['opType'] = 'EDIT';
            row['iqpSerno'] = rateCHGSerno;
            row.callback = function () {
              _this.$refs.refTable.remoteData();
            };
            this.opendTab(row, '还款计划变更申请', row.billNo);
            _this.visiable = false;
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示','保存失败'); // 弹出提示
        }
      });
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqprepaywaychg/iqpRepayWayChgMain',
        key: 'custom_view_' + key + '_' + new Date().getTime(),
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
      if (index == '2') {
        row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
        row.callback = function () {
          _this.$refs['refTable' + index].remoteData();
        };
        this.opendTab(row, updateFlag ? '还款计划变更修改' : '还款计划变更查看', row.billNo);
        return;
      }
      if(updateFlag){
        if (row == null || row.approveStatus == '000' || row.approveStatus == '992') {
          row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
          row.callback = function () {
            _this.$refs['refTable' + index].remoteData();
          };
          this.opendTab(row, updateFlag ? '还款计划变更修改' : '还款计划变更查看', row.billNo);
        } else {
          this.$xutils.showMsgBox('提示', '只有待发起和打回状态才能进行修改！');
          return;
        }
      }else{
        row['opType'] = 'VIEW';
          row.callback = function () {
            _this.$refs['refTable' + index].remoteData();
          };
          this.opendTab(row, '还款计划变更查看', row.billNo);
      }
    },
    deleteFn () {
      let _this = this;
      let selections = _this.$refs.refTable1.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selections[0].approveStatus != '000' && selections[0].approveStatus != '992') {
        _this.$message({
          message: '只能删除待发起和打回的数据',
          type: 'warning'
        });
        return;
      }
      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].iqpSerno);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/iqprepaywaychg/batchdelete/' + arr.join(','),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info' });
                  _this.$refs.refTable1.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
