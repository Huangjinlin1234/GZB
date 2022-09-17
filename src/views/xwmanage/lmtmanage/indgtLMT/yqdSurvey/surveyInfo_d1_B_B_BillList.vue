<template>
  <div>
  <el-divider></el-divider>
    <yu-panel title="借款人资产说明" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAddDebitAsset" @click="customClick('doAddDebitAsset')" v-if="lookPage">新增</yu-button>
          <yu-button type="primary" ref="btn_doUpdateDebitAsset" @click="customClick('doUpdateDebitAsset')" v-if="lookPage">修改</yu-button>
          <yu-button type="primary" ref="btn_deletebypkid" @click="deletebypkid" v-if="lookPage">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" request-type="POST" :base-params="baseParams" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="资产性质" prop="assetCha" data-code="STD_XD_YQD_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column label="资产说明" prop="assetExpl"></yu-xtable-column>
        <yu-xtable-column label="主键" prop="pkId" v-if="false"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
<yu-xdialog title="资产情况"  :visible.sync="dialogVisible"  :before-close="handleClose">
   <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules">

          <yu-xform-group :column="1">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled v-if="show"></yu-xform-item>
            <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno" disabled ></yu-xform-item>
            <yu-xform-item label="资产性质" ctype="select" name="assetCha" rules="required" data-code="STD_XD_YQD_ASSET_TYPE" placeholder="资产性质"></yu-xform-item>
            <yu-xform-item label="资产说明" ctype="input" placeholder="资产说明" name="assetExpl" rules="required"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>

      </yu-xform>
      <span slot="footer" class="dialog-footer">
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">保存</yu-button>

    </yu-form-buttons>
  </span>
</yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BBBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtdebitassetmemo/selectbymodel',
      baseParams: {condition: {surveySerno: this.getSurveySerno()}},
      formdata: {},
      formRules: {},
      imageUrls: {},
      lookPage: false,
      File: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 新增界面 下一步/取消按钮*/
    afterInit () {
      if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        this.lookPage = true;
      }
    },

    /* 保存按钮*/
    doNextStep () {
      // 先进行校验
      var validate = false, _this = this;
      _this.$refs['refForm'].validate(function (valid) {
        validate = valid;
        valid ? 1 : _this.$message({message: '验证失败', type: 'error'});
      });
      if (!validate) {
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtdebitassetmemo/saveorupdate',
        data: this.formdata
      }).then((res) => {
        // 请求成功
        if (res.data == 1) {
          // 操作成功
          this.$message({ message: '保存成功', type: 'success' });
          this.$refs.refForm.resetFields();
          this.dialogVisible = false;
          this.$refs.refTable.remoteData();
        } else {
          // 操作失败
          this.$message({ message: '保存失败', type: 'warning' });
        }
      });
    },

    deletebypkid () {
      let rowData = this.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据!'});
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtdebitassetmemo/deletebypkid',
        data: rowData
      }).then((res) => {
        // 请求成功
        if (res.data == 1) {
          // 操作成功
          this.$message({ message: '删除成功', type: 'success' });
          this.$refs.refTable.remoteData();
        } else {
          // 操作失败
          this.$message({ message: '删除失败', type: 'warning' });
          this.$refs.refTable.remoteData();
        }
      });
    },
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    getSurveySerno () {
      let _this = this;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        return _this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
      } catch (e) {
        // 走审批模版工厂
        return _this.getFactory().bizPageData.instanceInfo.bizId;
      }
    }
  }
};
</script>
