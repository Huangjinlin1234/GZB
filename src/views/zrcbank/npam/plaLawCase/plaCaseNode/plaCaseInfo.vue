<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" v-model="formdata" :disabled="viewType == 'DETAIL'" label-width="150px">
        <yu-panel title="基本信息" :collapseHide="false" :hideFilter="false">
          <yu-xform-group>
            <yu-xform-item label="客户编号"  name="cusId"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称"  name="cusName"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="标的币种"  name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" rules="required"></yu-xform-item>
            <yu-xform-item label="标的金额（元）"  name="totalAmt" ctype="num" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="本金总额（元）"  name="capAmt" ctype="num" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="拖欠利息总额（元）"  name="totalTqlxAmt" ctype="num" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="案由"  name="caseReason" ctype="select" rules="required" data-code="STD_CASE_REASON"></yu-xform-item>
            <yu-xform-item label="其他案由说明" colspan="24" name="otherCaseExt" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="保全情况"  name="preserveCase" ctype="select" rules="required" data-code="STD_PRESERVE_CASE"></yu-xform-item>
            <yu-xform-item label="保全日期"  name="preserveDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="案件编号"  name="caseNo"  rules="required"></yu-xform-item>
            <yu-xform-item label="立案日期"  name="filingDate" ctype="datepicker" rules="required"></yu-xform-item>
            <yu-xform-item label="案件进程"  name="caseProcess" ctype="select" rules="required" data-code="STD_LAW_CASE_PROCESS"></yu-xform-item>
            <yu-xform-item label="诉讼类型"  name="lawsuitType" ctype="select" rules="required" data-code="STD_LAWSUIT_TYPE"></yu-xform-item>
            <yu-xform-item label="我行身份"  name="bankRole" ctype="select" rules="required" data-code="STD_PARTY_ROLE"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group>
            <yu-xform-item label="我行涉诉机构"  ctype="input" placeholder="我行涉诉机构" name="bankIvlLawOrg" rules="required" ></yu-xform-item>
            <yu-xform-item label="当事人是否有其他涉诉"  name="isPartyIvlOthLaw" ctype="select" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="诉讼请求" colspan="24" name="lawsuitReq" ctype="textarea" placeholder="1000个字符以内" rules="required"></yu-xform-item>
            <yu-xform-item label="案件基本情况" colspan="24" name="caseBase" ctype="textarea" placeholder="1000个字符以内"></yu-xform-item>
            <yu-xform-item label="备注" colspan="24" name="memo" ctype="textarea" placeholder="请说明该客户名下其他借据另外立案的原因：（借据不全的时候）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :collapseHide="false" :hideFilter="false">
          <yu-xform-group>
            <yu-xform-item label="登记人"  name="inputIdName"  disabled></yu-xform-item>
            <yu-xform-item label="登记机构"  name="inputBrIdName"  disabled></yu-xform-item>
            <yu-xform-item label="责任人"  name="managerIdName"  disabled></yu-xform-item>
            <yu-xform-item label="责任机构"  name="managerBrIdName"  disabled></yu-xform-item>
            <yu-xform-item label="登记日期"  name="inputDate"  disabled></yu-xform-item>
          </yu-xform-group>
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="doSave" v-if="viewType == 'EDIT'">保存</yu-button>
            <yu-button type="primary" @click="doBack">返回</yu-button>
          </yu-form-buttons>
        </yu-panel>
      </yu-xform>
    </div>

  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO,STD_PARTY_ROLE,STD_LAWSUIT_TYPE,STD_LAW_CASE_PROCESS,STD_PRESERVE_CASE,STD_CASE_REASON,STD_ZB_CUR_TYP,DATA_STS');
export default {
  mixins: [mixinForm, popList],
  data: function () {
    return {
      dialogformdata: {},
      dataUrl: backend.appOcaService + '/api/adminsmorg/querypage',
      formdata: {},
      viewType: 'EDIT'
    };
  },
  props: {
    cusCorp: Object,
    dialogId: String
  },
  mounted () {
    this.$emit('liuquan');
    var _this = this;
    var caseSerno = _this.$route.meta.params.caseSerno;
    var viewType = _this.$route.meta.params.viewType;
    if (_this.cusCorp) {
      _this.viewType = viewType;
    }
    let data = {};
    data.caseSerno = caseSerno;
    yufp.service.request({
      method: 'POST',
      url: `${backend.cmisNpam}/api/plalawcaseinfo/queryPlaLawCaseInfo`,
      data: data,
      callback: function (code, message, response) {
        if (response.code == 0) {
          yufp.clone(response.data, _this.formdata);
        } else {
          _this.$message({ message: '操作失败：', type: 'error' });
        }
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawcasebillrel/queryByPlaLawCaseBillRel',
          data: { condition: JSON.stringify({ caseSerno: _this.$route.meta.params.caseSerno}) },
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.formdata.bankIvlLawOrg = response.data[0].managerBrIdName;
            } else {
              _this.$message({ message: '操作失败：', type: 'error' });
            }
          }
        });
      }
    });
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit;
    }
  },

  methods: {


    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      let jsoRt = null;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return;
        }
        var model = _this.formdata;
        model.caseSerno = _this.cusCorp.caseSerno;
        if (_this.formdata.inputDate || _this.formdata.inputDate == '') {
          _this.formdata['inputDate'] = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
          model.inputDate = _this.formdata.inputDate;
        }
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawcaseinfo/update',
          async: false,
          data: model,
          callback: function (code, message, response) {
            if (response.code == 0) {
              jsoRt = response;
              _this.$message('操作成功');
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      });
      return jsoRt;
    }
  }
};
</script>
