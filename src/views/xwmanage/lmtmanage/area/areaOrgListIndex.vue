<template>
  <div>
    <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="区域编号" ctype="input" placeholder="区域编号" name="areaNo" disabled></yu-xform-item>
          <yu-xform-item label="区域名称" ctype="input" placeholder="区域名称" name="areaName" rules="required"></yu-xform-item>
          <yu-xform-item label="签约方式" ctype="select" name="signMode" rules="required" data-code="STD_SIGN_MODE" placeholder="签约方式"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="select" placeholder="是否启用" name="isBegin" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="memo" :rows="3" placeholder="备注"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doUpdate">保存</yu-button>
      <yu-button type="primary" @click="onConfirm">返回</yu-button>
    </yu-form-buttons>
   </div>

  <div>
    <yu-panel title="微贷区域机构关联列表" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_add" @click="add">新增</yu-button>
          <yu-button ref="btn_$delete" @click="doDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" v-model="tableData" :base-params="baseParams" selection-type="radio" :pageable="true" request-type="POST" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="机构码" prop="orgNo"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="orgName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_SIGN_MODE,STD_ZB_YES_NO');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/areaorg/queryall',
      baseParams: {condition: {}},
      tableData: []
    };
  },
  created: function () {
    this.baseParams.condition = {'areaNo': this.$route.meta.params.params.areaNo};
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      微贷区域信息
      */
    AfterInit () {
      yufp.clone(this.$route.meta.params.params, this.formdata);
    },

    // 修改
    doUpdate () {
      this.$xutils.request({
        method: 'POST',
        // 新增
        url: this.$backend.cmisBiz + '/api/areamanager/update',
        data: this.formdata,
        success: (response, status, xhr) => {
          if (response.data != null) {
            yufp.clone(response.data, this.formdata);
            this.$xutils.showMsgBox('提示', '操作成功');
          } else {
            this.$xutils.showMsgBox('提示', '操作失败');
          }
        }
      });
    },
    // 新增
    add () {
      var _this = this;
      let jsoPar = this.formdata;
      jsoPar.tableData = this.$refs.refTable.tabledata;
      this.$dialog.open('基本信息', 'xwmanage/lmtmanage/area/areaOrgAddIndex', 1000, 1000, jsoPar, function () {
        _this.$refs.refTable.remoteData();
      });
    },
    doDelete () {
      var _this = this;
      let jsoPar = this.$refs.refTable.selections[0];
      this.$xutils.request({
        method: 'POST',
        // 删除
        url: this.$backend.cmisBiz + '/api/areaorg/deleteone',
        data: { pkId: jsoPar.pkId},
        success: (response, status, xhr) => {
          if (response.data == '1') {
            this.$xutils.showMsgBox('提示', '操作成功');
            _this.$refs.refTable.remoteData();
          } else {
            this.$xutils.showMsgBox('提示', '操作失败');
          }
        }
      });
    },

    // 取消
    onConfirm () {
      var _this = this;
      _this.$refs.refForm.resetFields();
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
