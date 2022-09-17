
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-客户经理待办审批
  -->
  <div>
  <yu-tabs v-model="activeName2" type="card">
      <yu-tab-pane label="调额申请" name="preIn">
      <yu-xform ref="refForm" label-width="160px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="卡号" placeholder="卡号" required clearable :rules="cardNoRule" name="cardNo" ctype="input"></yu-xform-item>
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
      </yu-tab-pane>
      <yu-tab-pane label="影像录入" name="videoIn">
        <imageSystem ref="imageSystemRef" :authority="authority" s="1" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史" name="his">
        <adjustment-Judge   :nodes="childParams" ></adjustment-Judge>
      </yu-tab-pane>
      <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </yu-tabs>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { mapState } from 'vuex';
import {clone, lookup, dateFormat} from '@/utils';
import adjustmentJudge from '@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/AdjustmentJudge';
lookup.reg('STD_ZB_CERT_TYP,STD_CARD_APPLY_CARD_PRD');
export default {
  name: 'AdjustmentApplyAdd',
  components: {yufpNwfInit, imageSystem, adjustmentJudge},
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    let _this = this;
    // 异步验证输入卡号是否存在
    var checkCardNo = function (rule, value, callback) {
      if (value) {
        _this.$request({
          url: _this.checkCardNoUrl,
          method: 'POST',
          data: {cardNo: value}
        }).then(({code, message, data}) => {
          if (code == '0') { // 卡号存在
            // 表单身份相关信息赋值
            clone(data, _this.formdata);
            callback();
          } else { // 卡号不存在
            callback(new Error('卡号不存在'));
          }
        });
      } else {
        callback(new Error('不能为空'));
      }
    };
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/save',
      checkCardNoUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/findcardbycardno',
      creditReportUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/getcreditreportinfo',
      queryCusUrl: this.$backend.cmisCus + '/api/cusbase/queryCusInfo',
      queryUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/selectbyserno',
      formdata: {},
      activeName2: 'preIn',
      cusId: '',
      cardNoRule: [
        { required: true, message: '卡号不能为空'},
        {validator: checkCardNo, trigger: 'blur'}
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
    const data = this.bizPageData || this.$route.params;
    this.$request({
      url: this.queryUrl,
      method: 'POST',
      data: {serno: data.instanceInfo.bizId}
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data, _this.formdata);
      } else {
        this.$message({message: message || '保存失败', type: 'error'});
      }
    });
    // this.parentRoutName = this.$route.meta.params.name;
    // this.viewType = this.$route.meta.params.actionType;
    // clone(_this.pageParams, this.formdata);
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    }),
    childParams: function () {
      const data = this.bizPageData || this.$route.params;
      const params = {
        bizId: data.instanceInfo.bizId,
        certCode: data.instanceInfo.param.certCode,
        nodeId: data.instanceInfo.nodeId,
        currentNode: data.flowParam.whichNode,
        instanceId: data.instanceInfo.instanceId,
        pageType: data.instanceInfo.pageType,
        currentUserId: this.userCode,
        flowParam: data.flowParam,
        optypeOptions: data.optypeOptions,
        applayCardType: data.instanceInfo.param.applayCardType,
        returnBackFuncId: data.instanceInfo.returnBackFuncId
      };
      return params;
    },
    imageBizParam () {
      const data = this.bizPageData || this.$route.params;
      let imageBizParam = [
        {
          'top_outsystem_code': 'xyk',
          'outsystem_code': 'xyktezl',
          'index': {
            'docid': data.instanceInfo.bizId,
            'custname': '',
            'cardno': '',
            'custphone': ''
          }
        }
      ];
      return imageBizParam;
    },
    authority () {
      return 'import;scan;delImg';
    }
  },


  watch: {
    formdata: {
      deep: true,
      handler (oldVal, newVal) {
        this.$emit('changeParams', newVal);
      }
    },
    'imageBizParam': function (val) {
      this.$nextTick(function () {
        this.$refs.imageSystemRef.getImageSrc();
      });
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
      startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
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
