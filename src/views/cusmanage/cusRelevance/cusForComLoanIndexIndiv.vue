<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button type="primary" @click="openDialog">快速创建个人客户</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="客户大类" prop="cusCatalog" data-code="STD_ZB_CUS_CATALOG"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" width="100px" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" ref="btn_importIndiv" @click="customClick('importIndiv')">确定</yu-button>
      <yu-button type="primary" ref="btn_onCancel" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
      <yu-xdialog :visible.sync="visiable" width="500px" title="快捷创建个人客户">
        <yu-xform ref="createFormRef" v-model="dialogData" label-width="120px" :rules="dialogFormRules">
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="creat" size="small">创建</el-button>
          <el-button @click="back" size="small">返回</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_CLS,STD_ZB_CUS_CATALOG,STD_CUS_STATE');
export default{
  name: 'D12BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbase/baseIndivByManageId',
      dialogFormRules: {},
      imageUrls: {},
      dialogData: {},
      visiable: false,
      baseParams: {}
    };
  },
  created () {
    var _this = this;
    let loginUser = _this.$xutils.getLoginUserInfo();
    _this.baseParams = {
      condition: JSON.stringify({'cusCatalog':'1', 'cusRankCls':'01', 'cusState':'2', managerId: loginUser.loginCode, 'source': '2' })
    };
  },
  methods: {
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(item => {
        return 'M,N,O,P,Q,R,U,V'.indexOf(item.key) == -1;
        // return 'A,B,C,D,E,F,G,H,I,J,K,L,O,S,T,W,X,Y'.indexOf(item.key) == -1;
      });
    },
    openDialog () {
      var _this = this;
      _this.visiable = true;
    },
    back () {
      var _this = this;
      _this.visiable = false;
    },

    creat () {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindiv/fastindivcreate',
        method: 'post',
        data: this.dialogData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            this.$xutils.showMsgBox('提示', '创建成功', 350, 150);
            this.visiable = false;
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
      this.visiable = false;
    }
  }
};
</script>
