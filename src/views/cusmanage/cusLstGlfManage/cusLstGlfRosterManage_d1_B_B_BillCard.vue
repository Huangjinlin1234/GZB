<template>
  <div id="d1_B_B_BillCard">
    <div id="d1_B_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联方类型" ctype="select" rules="required" data-code="STD_ZB_RELATED_PARTY_TYPE" placeholder="关联方类型" name="relatedPartyType" @blur="getCusId"></yu-xform-item>
          <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName" rules="required"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" @blur="getCusId"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" @blur="getCusId"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="境内/境外" ctype="select" rules="required" data-code="STD_LCAOS" placeholder="境内/境外" name="lcaos"></yu-xform-item>
          <yu-xform-item label="归属组别" ctype="select" placeholder="归属组别" name="belongGroup" rules="required" :colspan="20" :options="belongGroupOptions"></yu-xform-item>
          <yu-xform-item ctype="custom" :colspan="4">
            <yu-button style="padding: 9px 10px;" @click="addBelongGroup">新增组别</yu-button>
          </yu-xform-item>
          <yu-xform-item label="层级标识" ctype="select" rules="required" data-code="STD_ZB_LEVELS_FLAG" placeholder="层级标识" name="levels"></yu-xform-item>
          <yu-xform-item label="上一级关联方名称" ctype="input" placeholder="上一级关联方名称" name="parebtRelatedPartyName" rules="required" ></yu-xform-item>
          <yu-xform-item label="上一级关联方证件号码" ctype="input" placeholder="上一级关联方证件号码" name="parebtRelatedPartyCertNo" rules="required" ></yu-xform-item>
          <yu-xform-item label="与上一级关联方关系" ctype="select" rules="required" data-code="STD_CUS_PAREBT_RELATED_PARTY_RELA" placeholder="与上一级关联方关系" name="parebtRelatedPartyRela"></yu-xform-item>
          <yu-xform-item label="与上一级之间是否有权益份额" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="与上一级之间是否有权益份额" name="parebtBetweenIsRightsShare"></yu-xform-item>
          <yu-xform-item label="持有比例" ctype="input" placeholder="持有比例" name="holdPerc" rules="required"></yu-xform-item>
          <yu-xform-item label="关联关系说明" ctype="input" placeholder="关联关系说明" name="correMemo"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" rules="required" disabled data-code="STD_ZB_STATUS" placeholder="状态" name="status"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('OnClose')">关闭</yu-button>
    </yu-form-buttons>
    <yu-xdialog ref="editLookupItemsDialog" class="edit-lookup-items-dialog" :center="true" title="新增归属组别" :visible.sync="isShowEditLookupItemsDialog" size="small" height="360px">
      <div class="btn-box">
        <yu-button @click="pushLookupItem">新增字典项</yu-button>
      </div>
      <yu-xtable ref="editLookupItemTable" row-number :data="currentLookupItems" :pageable="false" :rules="lookupItemRule">
        <yu-xtable-column prop="lookupItemCode" ctype="input" label="key" placeholder="key"></yu-xtable-column>
        <yu-xtable-column prop="lookupItemName" ctype="input" label="value" placeholder="value"></yu-xtable-column>
        <yu-xtable-column class="handle-box" label="操作" width="180px">
          <template slot-scope="scope">
            <yu-button type="text" @click="deleteLookupItem(scope)" :disabled="currentLookupItems.length === 1">删除</yu-button>
            <yu-button type="text" v-if="scope.$index != 0" @click="moveUp(scope.$index)">上移</yu-button>
            <yu-button type="text" v-if="scope.$index < currentLookupItems.length - 1" @click="moveDown(scope.$index)">下移</yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
      <div slot="footer" class="yu-grpButton">
        <yu-button type="primary" v-norepeat.disabled @click="addLookupItems">保存</yu-button>
        <yu-button @click="closeEditLookupItemsDialog">取消</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { parseTime } from '@/utils/util';
import { genUUID } from '@/utils';
export default{
  name: 'D1BBBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      belongGroupOptions: [],
      currentLookupItems: [{ lookupItemCode: '', lookupItemName: '' }], // 当前的字典项
      lookupItemRule: {
        lookupItemCode: [{ required: true, message: '必填项'}, { validator: this.codeKeyValid, trigger: 'blur'}],
        lookupItemName: [{ required: true, message: '必填项'}]
      },
      isShowEditLookupItemsDialog: false,
      updateUrl: this.$backend.cmisCus + '/api/cuslstglf/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstglf/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      saveLookUpObj: {
        lookupItemBos: null,
        lookupItemsString: '',
        lookupItemId: '',
        lookupCode: 'STD_BELONG_GROUP',
        lookupName: '',
        lookupTypeId: '',
        lookupTypeName: ''
      }

    };
  },
  created () {
    this.getLookupItems();
  },
  methods: {
    // 添加数据字典项 打开弹窗
    addBelongGroup () {
      this.isShowEditLookupItemsDialog = true;
      // clone(row, this.editLookupFormData);
      this.getLookupItemInfo(true);
      // this.currentLookupItems = [];
      // this.$nextTick(function () {
      //   this.$refs.editLookupItemTable.clearValidateMessage();
      //   this.pushLookupItem();
      // });
    },
    // 查询某条数据字典下的所有字典项
    getLookupItems () {
      var _this = this;
      _this.$request({
        url: backend.appOcaService + '/api/adminsmlookupdict/list?keyWord=' + _this.saveLookUpObj.lookupCode,
        method: 'get',
        data: {}
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code === '0' && data && Array.isArray(data) && data.length >= 1) {
          _this.$utils.clone(data[0], _this.saveLookUpObj);
          _this.getLookupItemInfo(true);
        }
      });
    },

    // 查询某条数据字典下的所有字典项
    getLookupItemInfo (isEditLookupFormData) {
      var _this = this;
      _this.$request({
        url: backend.appOcaService + '/api/adminsmlookupdict/info/' + _this.saveLookUpObj.lookupItemId,
        method: 'post',
        data: {}
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code === '0' && data && Array.isArray(data)) {
          if (isEditLookupFormData) {
            _this.currentLookupItems = data;
            _this.$refs.editLookupItemTable && _this.$refs.editLookupItemTable.clearValidateMessage();
          }
          _this.belongGroupOptions = [];
          var newLookupItems = data.map(item => {
            _this.belongGroupOptions.push({ key: item.lookupItemCode, value: item.lookupItemName });
            return { key: item.lookupItemCode, value: item.lookupItemName };
          });
          _this.saveLookUpObj.lookupItemsString = JSON.stringify(newLookupItems);
        }
      });
    },

    pushLookupItem () {
      var isLookupItemValidateOk = false;
      this.$refs.editLookupItemTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isLookupItemValidateOk = true;
        }
      });
      if (isLookupItemValidateOk) {
        var row = { lookupItemCode: '', lookupItemName: '' };
        this.currentLookupItems.push(row);
        this.$refs.editLookupItemTable.setCurrentRow(row);
      }
    },
    deleteLookupItem (scope) {
      if (this.currentLookupItems.length > 1) {
        this.currentLookupItems.splice(scope.$index, 1);
      }
    },

    moveUp (index) {
      if (index > 0) {
        const update = this.currentLookupItems[index - 1];
        this.currentLookupItems.splice(index - 1, 1);
        this.currentLookupItems.splice(index, 0, update);
      } else {
        this.$message({ message: this.$t('lookupdict.bksy'), type: 'error' });
      }
    },

    moveDown (index) {
      if (this.currentLookupItems.length > index + 1) {
        const downDate = this.currentLookupItems[index + 1];
        this.currentLookupItems.splice(index + 1, 1);
        this.currentLookupItems.splice(index, 0, downDate);
      } else {
        this.$message({ message: this.$t('lookupdict.bkxy'), type: 'error' });
      }
    },

    addLookupItems () {
      var _this = this, isLookupItemValidateOk = false;
      this.$refs.editLookupItemTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isLookupItemValidateOk = true;
        }
      });
      if (isLookupItemValidateOk) {
        var params = this.saveLookUpObj;
        params.lookupItemBos = this.currentLookupItems;
        params.lookupItemsString = this.saveLookUpObj.lookupItemsString;
        _this.$request({
          url: backend.appOcaService + '/api/adminsmlookupdict/update',
          method: 'post',
          data: params
        }).then(({code, message, data}) => {
          // 处理请求成功的情况
          if (code === '0') {
            _this.$message({ message: _this.$t('lookupdict.bccg'), type: 'success' });
            _this.isShowEditLookupItemsDialog = false;
            _this.getLookupItemInfo(true);
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        });
      }
    },

    closeEditLookupItemsDialog () {
      this.isShowEditLookupItemsDialog = false;
    },
    codeKeyValid (rule, value, callbackFn) {
      var _this = this;
      var arr = _this.currentLookupItems.filter(function (item) {
        return item.lookupItemCode === value;
      });
      if (arr.length > 1) {
        callbackFn(new Error(_this.$t('lookupdict.kbncf')));
      } else {
        callbackFn();
      }
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.status = '1';
    },
    getCusId () {
      var relatedPartyType = this.formdata.relatedPartyType;
      var certType = this.formdata.certType;
      var certCode = this.formdata.certCode;
      if (certType && certCode && relatedPartyType) {
        let url = '';
        if (relatedPartyType == '01') {
          url = this.$backend.cmisCus + '/api/cuspubrelinvest/getRel';
        } else {
          url = this.$backend.cmisCus + '/api/cusindivsocial/getCusMsg';
        }
        let rqData = {};
        rqData['certType'] = certType;
        rqData['certCode'] = certCode;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data) {
              this.formdata.cusId = response.data.cusId;
            } else {
              console.log('客户编号获取失败');
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      }
    }
  }
};
</script>
