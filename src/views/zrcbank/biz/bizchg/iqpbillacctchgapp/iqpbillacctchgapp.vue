<template>
 <div>
   <yu-tabs v-model="activeName">
    <yu-tab-pane label="还款账号变更" name="first">
    <yu-panel panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('add')" @click="onInsert">新增</yu-button>
          <yu-button type="primary" v-if="checkCtrl('edit')" @click="onUpdate(true)">修改</yu-button>
          <yu-button type="primary" v-if="checkCtrl('delete')" @click="onDelete">删除</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="onUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="{'condition':{'apply': 'Y'},'sort':'inputDate desc'}" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="120"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
         <yu-xtable-column label="原还款账号" prop="oldRepayAccno" width="120"></yu-xtable-column>
         <yu-xtable-column label="变更后还款账号" prop="repayAccno" width="120"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl" width="120" data-code="STD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="还款账号变更历史" name="second">
    <yu-panel panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refOldTable">
        <yu-xform-group :column="3">
          <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="onUpdate2(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refOldTable" row-number condition-key="condition" selection-type="radio" :base-params="{'condition':{'history':'Y'},'sort':'inputDate desc'}" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="120"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
         <yu-xtable-column label="原还款账号" prop="oldRepayAccno" width="120"></yu-xtable-column>
         <yu-xtable-column label="变更后还款账号" prop="repayAccno" width="120"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl" width="120" data-code="STD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
  </yu-tabs>
    <yu-xdialog :visible.sync="visiable"  width="400px" title="请选择贷款借据" >
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="3">
        <yu-xform-item label="借据编号" colspan="24" ctype="yu-xloan" name="billNo" rules="required" placeholder="借据编号" :parms="{condition: {'managerId':managerId, 'accStatus': '1'}}" :mapping="{'billNo':'billNo','accStatus':'accStatus'}" @select-fn="commonSelectFn"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">下一步</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_APP_CHNL,STD_ZB_APPR_STATUS');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/',
      visiable: false,
      formdata: {},
      activeName: 'first',
      managerId: this.$xutils.getDefaultformulaData("$LoginLoginCode")
    };
  },
  methods: {
    onInsert () {
      this.visiable = true;
    },
    onCancel: function () {
      this.visiable = false;
      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
      });
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
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
        this.$xutils.showMsgBox('提示', '该借据不允许进行利率调整', 350, 150);
        return;
      }
      // 调用序列号生成的规则，生成放款申请序列号
      const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO');
      const data = {
        'billNo': selPars.billNo,
        'iqpSerno': rateCHGSerno
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/create',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            row = yufp.clone(response.data);
            row['opType'] = 'EDIT';
            row['iqpSerno'] = rateCHGSerno;
            row.callback = function () {
              _this.$refs.refTable.remoteData();
            };
            this.opendTab(row, '还款账号变更申请', row.billNo);
            _this.visiable = false;
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpbillacctchgapp/accChangeInfo',
        key: 'custom_view_' + key+ '_' + new Date().getTime(),
        title: title,
        data: params
      });
    },
    onDelete () {
      let row = this.$refs.refTable.selections;
      if (row == null) {
        this.$message('必须选择一条记录进行操作！');
        return;
      }
      row = this.$refs.refTable.selections[0];
      if (row.approveStatus != '000') {
        this.$message({type: 'warning', message: '仅有待发起状态可以删除！'});
        return;
      }
      // 进行逻辑删除
      this.delete(row.iqpSerno);
    },
    delete: function (id) {
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            _this.$request({
              url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/batchdelete/' + id,
              method: 'post'
            }).then((response) => {
              if (response.code == '0') {
                _this.$refs.refTable.remoteData();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    },
    /**
       * 修改
       */
    onUpdate (updateFlag) {
      let _this = this;
      let row = this.$refs.refTable.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if(updateFlag){
        if (row == null || row.approveStatus == '000' || row.approveStatus == '992') {
          row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, updateFlag ? '还款账号变更申请修改' : '还款账号变更申请查看', row.billNo);
        } else {
          this.$xutils.showMsgBox('提示', '只有待发起和打回状态才能进行修改！');
          return;
        }
      }else{
        row['opType'] = 'VIEW';
        row.callback = function () {
          _this.$refs.refTable.remoteData();
        };
        this.opendTab(row, '还款账号变更申请查看', row.billNo);
      }
    },
    onUpdate2 (updateFlag) {
      let _this = this;
      let row = this.$refs.refOldTable.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['opType'] = 'VIEW';
      row.callback = function () {
        _this.$refs.refOldTable.remoteData();
      };
      this.opendTab(row, '还款账号变更申请查看', row.billNo);
    }
  }
};
</script>
