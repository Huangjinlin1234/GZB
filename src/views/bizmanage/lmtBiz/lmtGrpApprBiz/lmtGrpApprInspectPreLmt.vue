<template>
  <div>
    <yu-panel title="审查报告"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
              <yu-panel title="一、审查内容" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="审查内容" ctype="textarea"  name="reviewContent"></yu-xform-item>
              </yu-panel>
              <yu-panel title="二、授信用途合理性分析" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="主键" ctype="input" name="pkId" hidden="true"></yu-xform-item>
                  <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                  <yu-xform-item label="授信用途合理性分析" ctype="textarea"  name="analysisRationalLmtUse"></yu-xform-item>
              </yu-panel>
              <yu-panel title="三、风险因素" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="风险因素" ctype="textarea"  name="riskFactor"></yu-xform-item>
              </yu-panel>
              <yu-panel title="四、评审结论" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="评审结论" ctype="radio"  name="reviewConclustion" data-code="STD_ZB_CONC"></yu-xform-item>
                  <yu-xform-item label="结论性描述" ctype="textarea"  name="restDesc"></yu-xform-item>
                  <yu-xform-item label="是否重组贷款" ctype="radio"  name="reviewConclustion" data-code="STD_ZB_YSE_NO"></yu-xform-item>
              </yu-panel>
              <div v-for="(item,index) in list" :key="index">
                  <lmtApprInspectPreLmtModel :serno="item"></lmtApprInspectPreLmtModel>
              </div>
              <yu-panel title="6.其他" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="是否超限额管理要求" ctype="radio"  name="isOutLmtQuotaMana" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="其他说明" ctype="input"  name="otherDesc"></yu-xform-item>
              </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'" type="primary" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
import lmtApprInspectPreLmtModel from './lmtApprInspectPreLmtModel';
export default {
  components: {lmtApprInspectPreLmtModel},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null,
      dialogVisible: false,
      effType: '',
      list: [],
      baseFormdata1: {}
    };
  },
  created () {
    let _this = this;
    // var serno = _this.getFactory().contextData.grpSerno;
    var grpSerno = 'LMT202106230001165';
    // var op = _this.getFactory().contextData.op;
    // _this.type = op;
    if (!grpSerno || grpSerno === '') {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
    }
    this.baseFormdata1.grpSerno = grpSerno;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpappr/querySernoByGrpSerno',
      data: grpSerno,
      callback: function (code, message, response) {
        _this.$nextTick(function () {
          response.data.forEach(function (item) {
            _this.list.push(item);
          });
        });
      }
    });
  },
  mounted () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      // var serno = _this.getFactory().contextData.grpSerno;
      var grpSerno = 'LMT202106230001165';
      // var op = _this.getFactory().contextData.op;
      // _this.type = op;
      if (!grpSerno || grpSerno === '') {
        grpSerno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.grpSerno = grpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpappr/queryInfoByGrpSerno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
        }
      });
    },
    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpappr/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    // 取消并返回上一页面
    print: function () {
      this.$xutils.showMsgBox('提示', '开发中！'); // 弹出提示
    },
    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.$router.go(-1);
    },
    // 弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    }

  }
};
</script>
