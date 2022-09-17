
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-新增申请
  -->
  <div>
      <yu-xform ref="refForm" label-width="160px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="卡号" placeholder="卡号" required clearable :rules="cardNoRule" name="cardNo" ctype="input" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
            <yu-button type="primary" @click="getCardNo">获取</yu-button>
          </yu-xform-item>
          <yu-xform-item label="卡产品" placeholder="卡产品" name="cardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD" disabled></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="原始信用额度" placeholder="原始信用额度" name="origCreditCardLmt" ctype="num" disabled></yu-xform-item>
          <yu-xform-item label="新信用额度" placeholder="新信用额度" required :rules="newCreditCardLmtRule" name="newCreditCardLmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="是否提供增信证明" placeholder="是否提供增信证明" required clearable :rules="isIncreaseRule" name="isIncrease" ctype="select" :options="isIncreaseOption"></yu-xform-item>
          <yu-xform-item colspan="24" label="备注" placeholder="备注" name="remarks" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="datepicker" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户号" placeholder="客户号" name="cusId" ctype="input" hidden></yu-xform-item>
           <yu-xform-item label="流水号" placeholder="流水号" name="serno" ctype="input"  hidden></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="clear">清空</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
      <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { mapState } from 'vuex';
import {clone, lookup, dateFormat} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_CARD_APPLY_CARD_PRD');
export default {
  name: 'AdjustmentApplyAdd',
  components: {yufpNwfInit},
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/save',
      checkCardNoUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/findcardbycardno',
      creditReportUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/getcreditreportinfo',
      queryCusUrl: this.$backend.cmisCus + '/api/cusbase/queryCusInfo',
      formdata: {},
      cusId: '',
      cardNoRule: [
        { required: true, message: '卡号不能为空'}
      ],
      newCreditCardLmtRule: [
        { required: true, message: '新信用额度不能为空' }
      ],
      isIncreaseRule: [
        { required: true, message: '是否提供增信证明不能为空' }
      ],
      isIncreaseOption: [
        {key: '0', value: '否'},
        {key: '1', value: '是'}
      ],
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      formDisabled: false,
      viewType: 'DETAIL',
      saveBtnShow: true,
      submitBtnShow: true
    };
  },
  mounted () {
    let _this = this;
    this.parentRoutName = this.$route.meta.params.name;
    this.viewType = this.$route.meta.params.actionType;
    clone(_this.pageParams, this.formdata);
    if (this.viewType === 'ADD') {
      this.$nextTick(() => {
        _this.formdata.inputIdName = _this.userInfo;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      });
    }
    if (this.viewType === 'DETAIL') {
      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  watch: {
    formdata: {
      deep: true,
      handler (oldVal, newVal) {
        this.$emit('changeParams', newVal);
      }
    },
    'formdata.certCode': function (val, oldVal) {
      if (val) {
        var _this = this;
        this.$request({
          method: 'POST',
          url: _this.queryCusUrl,
          data: val
        }).then(({cusId}) => {
          _this.formdata.cusId = cusId;
        });
      }
    }
  },
  methods: {
    getCardNo: function () {
      var _this = this;
      if (this.formdata.cardNo == null) {
        this.$message({ message: '请输入卡号！', type: 'warning'});
      }
      _this.$request({
        url: _this.checkCardNoUrl,
        method: 'POST',
        data: {cardNo: this.formdata.cardNo}
      }).then(({code, message, data}) => {
        if (code == '0') { // 卡号存在
          // 表单身份相关信息赋值
          clone(data, _this.formdata);
        } else { // 卡号不存在
          _this.$message({ message: '卡号不存在', type: 'error'});
        }
      });
    },
    /**
     * 返回
     */
    cancelFn: function () {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({name: this.parentRoutName});
    },
    // 清空
    clear: function () {
      this.formdata.cardNo = '';
      this.formdata.newCreditCardLmt = '';
      this.formdata.isIncrease = '';
      this.formdata.remarks = '';
    },
    /**
     * 更新编辑成功返回
     */
    successCancelFn: function () {
      yufp.globalEventBus.$emit('refreshAdjustmentApplyTable');
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({name: this.parentRoutName});
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.addSaveFn('SAVE');
    },
    submitFn: function () {
      this.addSaveFn('SUBMIT');
    },

    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      // 发送进行征信查询
      this.$request({
        method: 'POST',
        url: _this.creditReportUrl,
        data: _this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
      const bizType = params.adjustmentChnl === '01' ? 'XK004' : 'XK003'; // XK003信用卡调额申请审批流程-分支机构、 XK004信用卡调额申请审批流程-总行部门
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno;
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt, cardNo: this.formdata.cardNo};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      // yufp.frame.removeTab(this.$route.path);
      this.successCancelFn();
    },

    /**
     * 新增-保存 actionType:save or submit
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      if (this.formdata.newCreditCardLmt < 0) {
        _this.$message({message: '输入额度不可以小于0', type: 'warning'});
        return;
      }
      _this.$refs.refForm.validate(function (valid) {
        if (valid) {
          _this.$request({
            url: _this.addUrl,
            method: 'POST',
            data: model
          }).then(({code, message, data}) => {
            if (code == '0') {
              _this.$message({message: '操作成功', type: 'success'});
              _this.formdata.adjustmentChnl = data.adjustmentChnl;
              _this.formdata.serno = data.serno;
              if (actionType === 'SUBMIT') {
                let params = {
                  adjustmentChnl: _this.formdata.adjustmentChnl,
                  serno: data.serno,
                  certCode: data.certCode,
                  newCreditCardLmt: data.newCreditCardLmt
                };
                _this.submitProcessFun(params);
              }
            } else {
              _this.$message({message: message || '操作失败', type: 'error'});
            }
          });
        } else {
          return;
        }
      });
    },

    /**
     * 更新-保存 actionType:save or submit
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      _this.$refs.refForm.validate(function (valid) {
        if (valid) {
          _this.$request({
            url: _this.updateUrl,
            method: 'POST',
            data: model
          }).then(({code, message, data}) => {
            if (code == '0') {
              _this.$message({message: '数据更新成功！', type: 'success'});
              if (actionType === 'SUBMIT') {
                let params = {
                  adjustmentChnl: _this.formdata.adjustmentChnl,
                  serno: _this.formdata.serno,
                  certCode: _this.formdata.certCode,
                  newCreditCardLmt: _this.formdata.newCreditCardLmt
                };
                _this.submitProcessFun(params);
              }
            } else {
              _this.$message({message: message || '数据更新失败！', type: 'error'});
            }
          });
        } else {
          return;
        }
      });
    }
  }
};
</script>
