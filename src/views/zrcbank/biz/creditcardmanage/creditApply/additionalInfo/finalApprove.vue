<template>
  <div class="final-approve">
    <yu-xform ref="finalForm" label-width="200px" v-model="approveFormdata" :rules="rules" :disabled="node.pageType!=='TODO'">
      <yu-collapse v-model="activeNames">
        <yu-collapse-item title="卡产品审批信息" name="1">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请卡产品" name="applyCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD"  @change="cardTypeChange" disabled></yu-xform-item>
            <yu-xform-item label="是否同时申请普通信用卡" name="isApplyCommonCard" ctype="select" data-code="STD_ZB_YES_NO" @change="isApplyCommonCardChange" disabled></yu-xform-item>
            <yu-xform-item label="额度建议" name="lmtAdvice" disabled></yu-xform-item>
            <yu-xform-item label="核准额度" name="approveAmt" rules="required" :disabled="approveflag" :hidden="hideflag"></yu-xform-item>
            <yu-xform-item label="大写标准额度" name="bigApproveAmt" disabled :hidden="hideflag"></yu-xform-item>
            <yu-xform-item label="日费率" name="dailyFeeRate" :colspan="12" :hidden="dailyFeeRateHid" :precision="6"  ctype="yu-num"  sign="%" :multiple="100" :disabled="approveflag"></yu-xform-item>
            <yu-xform-item label="审批结果" name="approveResult" ctype="select" :colspan="12" data-code="STD_CARD_APPROVE_RESULT" rules="required" @change="conclusionChange" :disabled="approveflag"></yu-xform-item>
            <yu-xform-item label="拒绝原因" name="refuseReason" ctype="select" data-code="STD_CARD_FINAL_REFUSE_REASON" :hidden="refuseReasonHid" :disabled="approveflag"></yu-xform-item>
          </yu-xform-group>
        </yu-collapse-item>
        <yu-collapse-item title="卡产品审批信息" name="2" :hidden="commonCardHid" >
          <yu-xform-group :column="2">
            <yu-xform-item label="普通信用卡申请卡产品" name="commonCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD"></yu-xform-item>
            <yu-xform-item label="额度建议" name="commonLmtAdvice" disabled></yu-xform-item>
            <yu-xform-item label="核准额度" name="commonCardApproveAmt" :required="!commonCardHid"  @change="amtChange"  :disabled="comApproveflag"  :hidden="comhideflag"></yu-xform-item>
            <yu-xform-item label="大写标准额度" name="commonBigApproveAmt"  :colspan="12" disabled  :hidden="comhideflag"></yu-xform-item>
            <yu-xform-item label="审批结果" name="commonCardApproveResult"  :required="!commonCardHid" ctype="select"  data-code="STD_CARD_APPROVE_RESULT" :colspan="12"  @change="commonApproveConclusionChange" :disabled="comApproveflag"></yu-xform-item>
            <yu-xform-item label="拒绝原因" name="commonCardRefuseReason" ctype="select" data-code="STD_CARD_FINAL_REFUSE_REASON" :hidden="commonRefuseReasonHid" :disabled="comApproveflag"></yu-xform-item>
          </yu-xform-group>
        </yu-collapse-item>
        <yu-collapse-item title="终审审批意见" name="3">
          <yu-xform-group :column="2">
            <yu-xform-item label="审批结论" name="approveConclusion" ctype="select" :options="opDict" rules="required" @change="approveConclusionChange" :colspan="12"></yu-xform-item>
            <yu-xform-item label="" name="" ctype="custom" :colspan="12"></yu-xform-item>
            <yu-xform-item label="退回原因" name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"   :hidden="returnHid" :colspan="12"></yu-xform-item>
            <yu-xform-item label="" name="" ctype="custom" :colspan="12" :hidden="returnHid"></yu-xform-item>
            <yu-xform-item label="终审备注" name="finalJudgRemark" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="终审阶段" name="finalPostFlag" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-collapse-item>
      </yu-collapse>
      <div class="yu-grpButton" v-if="node.pageType=='TODO'">
        <yu-button type="primary" @click="getFirstApproveFn" v-if="showFirstApprove">终审一岗审批意见详情</yu-button>
        <yu-button type="primary" @click="saveFn(null)">保存</yu-button>
        <yu-button type="primary" @click="saveFn('submitFn')">提交</yu-button>
        <yu-button type="primary" @click="returnFn">返回</yu-button>
      </div>
    </yu-xform>
    <yu-xdialog title="核准额度" size="tiny" :visible.sync="dialogVisible">
      <yu-xform ref="refFormDemo" label-width="120px" v-model="rForm" disabled>
        <yu-xform-group :column="1">
          <yu-xform-item :label="rForm.mainCard + '核准额度'" name="approveAmt" :hidden="!refuseReasonHid"></yu-xform-item>
          <yu-xform-item :label="rForm.supCard + '核准额度'" name="commonCardApproveAmt" :hidden="approveFormdata.isApplyCommonCard !== '1' || !commonRefuseReasonHid"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <span slot="footer" class="dialog-footer">
        <yu-button @click="dialogVisible = false">取 消</yu-button>
        <yu-button type="primary" @click="doCheckFn">确 定</yu-button>
      </span>
    </yu-xdialog>
    <yu-xdialog title="终审一岗审批意见详情"  style="wid" :visible.sync="firstApprovedialogVisible">
      <yu-xform ref="firstApproveForm"  v-model="firstForm" disabled>
         <yu-panel title="卡产品审批信息" is-collapse panel-type="normal">
            <yu-xform-group :column="2">
            <yu-xform-item label="申请卡产品" name="applyCardPrd" :colspan="12" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD"  @change="cardTypeChange" disabled></yu-xform-item>
            <yu-xform-item label="核准额度" name="approveAmt" :colspan="12"  disabled></yu-xform-item>
            <yu-xform-item label="日费率" name="dailyFeeRate" :colspan="12"  :hidden="dailyFeeRateHid" ctype="yu-num" sign="‰" disabled></yu-xform-item>
             <yu-xform-item label="审批结果" name="approveResult" ctype="select" :colspan="12" data-code="STD_CARD_APPROVE_RESULT"></yu-xform-item>
            <yu-xform-item label="拒绝原因" name="refuseReason" ctype="select" :colspan="12" data-code="STD_CARD_FINAL_REFUSE_REASON" :hidden="firstRefuseflag"></yu-xform-item>
            </yu-xform-group>
         </yu-panel>
         <yu-panel title="普卡产品审批信息" v-show="!commonCardHid" is-collapse panel-type="normal" >
            <yu-xform-group :column="2">
            <yu-xform-item label="普通信用卡申请卡产品" name="commonCardPrd" :colspan="12" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD"></yu-xform-item>
            <yu-xform-item label="核准额度" name="commonCardApproveAmt" :colspan="12" @change="amtChange" ></yu-xform-item>
            <yu-xform-item label="审批结果" name="commonCardApproveResult"  ctype="select" data-code="STD_CARD_APPROVE_RESULT" :colspan="12"></yu-xform-item>
            <yu-xform-item label="拒绝原因" name="commonCardRefuseReason" :colspan="12" ctype="select" data-code="STD_CARD_FINAL_REFUSE_REASON" :hidden="firstComRefuseflag"></yu-xform-item>
          </yu-xform-group>
         </yu-panel>
        <yu-panel title="终审审批意见" is-collapse panel-type="normal">
        <yu-xform-group :column="1">
          <yu-xform-item label="审批结论" name="approveConclusion" ctype="select" :options="opDict" @change="ftApprConcChange"></yu-xform-item>
          <yu-xform-item label="退回原因" name="returnReason" ctype="select" :required="returnReasonFlag" data-code="STD_CARD_RETURN_REASON" :hidden="ftReturnHid"></yu-xform-item>
          <yu-xform-item label="终审备注" name="finalJudgRemark" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <span slot="footer" class="dialog-footer">
        <yu-button @click="firstApprovedialogVisible = false">取 消</yu-button>
      </span>
    </yu-xdialog>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import { moneyToUpper } from '@/utils/util';
import dict from '@/config/constant/app.data.lookup.js';
lookup.reg('STD_ZB_YES_NO,STD_CARD_APPLY_CARD_PRD,STD_CARD_APPROVE_RESULT');
lookup.reg('STD_CARD_FINAL_REFUSE_REASON,STD_APPROVE_CONCLUSION,STD_CARD_RETURN_REASON');
export default {
  name: 'FinalApprove',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    showFirstApprove: function () {
      return this.node.currentNode == 'node6' || this.node.currentNode == 'node6';
    }
  },
  data () {
    return {
      activeNames: ['1', '2', '3'],
      approveFormdata: {},
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/creditcardfinaljudginifo/selectbyserno',
        updateUrl: this.$backend.cmisBiz + '/api/creditcardfinaljudginifo/update',
        updateFirstUrl: this.$backend.cmisBiz + '/api/creditcardfinaljudginifo/updatefirst',
        queryLsnpUrl: this.$backend.cmisBiz + '/api/iqpcuslsnpinfo/selectbyserno'
      },
      rules: {
        dailyFeeRate: { required: false, message: '字段不能为空', trigger: 'blur' },
        refuseReason: { required: false, message: '字段不能为空', trigger: 'blur' },
        returnReason: { required: false, message: '字段不能为空', trigger: 'blur' },
        commonCardRefuseReason: { required: false, message: '字段不能为空', trigger: 'blur' }
      },
      firstRefuseflag: true,
      firstComRefuseflag: true,
      refuseReasonHid: false,
      commonRefuseReasonHid: false,
      commonCardHid: true,
      returnHid: false,
      ftReturnHid: false,
      dailyFeeRateHid: true,
      dialogVisible: false, // 二次确认核准额度
      returnReasonFlag: false,
      firstApprovedialogVisible: false,
      secondFlag: '1',
      rForm: {},
      firstForm: {},
      approveflag: false,
      commentInfo: {
        instanceId: '',
        nodeId: '',
        userId: '',
        commentId: '',
        commentSign: '',
        userComment: '',
        ext: '无',
        optType: '',
        optReasTyp: ''
      },
      optypeOptions: [],
      opDict: [],
      comApproveflag: false,
      hideflag: false,
      comhideflag: false
    };
  },
  watch: {
    'approveFormdata.approveAmt': function (val) {
      if (val) {
        this.approveFormdata.bigApproveAmt = moneyToUpper(val);
      }
    }

  },
  methods: {
    amtChange (e) {
      if (e) {
        this.approveFormdata.commonBigApproveAmt = moneyToUpper(e);
      }
    },
    cardTypeChange (e) {
      this.rules.dailyFeeRate.required = e === '000010' || e === '000013';
      this.dailyFeeRateHid = !(e === '000010' || e === '000013');
    },
    // 是否同时申请普通卡
    isApplyCommonCardChange (e) {
      if (e === '1') {
        this.commonCardHid = false;
      }; // 否
    },
    conclusionChange (e) {
      if (e === '00') { // 通过
        this.refuseReasonHid = true;
        this.hideflag = false;
        this.rules.refuseReason.required = false;
        // todo 如果审批结果为通过，调通联系统接口开卡；如果审批结果为拒绝，不开卡（即不调用通联系统开卡接口）
      } else if (e === '01') { // 拒绝 显示拒绝原因，且必输
        this.refuseReasonHid = false;
        this.hideflag = true;
        this.rules.refuseReason.required = true;
      }
    },
    commonApproveConclusionChange (e) {
      if (e === '00') { // 通过
        this.commonRefuseReasonHid = true;
        this.rules.commonCardRefuseReason.required = false;
        this.comhideflag = false;
        // todo 如果审批结果为通过，调通联系统接口开卡；如果审批结果为拒绝，不开卡（即不调用通联系统开卡接口）
      } else if (e === '01') { // 拒绝 显示拒绝原因，且必输
        this.commonRefuseReasonHid = false;
        this.rules.commonCardRefuseReason.required = true;
        this.comhideflag = true;
      }
    },
    approveConclusionChange (e) {
      this.commentInfo.commentSign = e;
      if (e === 'O-12') { // 通过
        this.returnHid = true;
        this.rules.returnReason.required = false;
      } else if (e === 'O-2' || e === 'O-1') { // 退回
        this.returnHid = false;
        this.rules.returnReason.required = true;
      }
    },
    ftApprConcChange (e) {
      if (e === 'O-12') { // 通过
        this.ftReturnHid = true;
        this.returnReasonFlag = false;
      } else if (e === 'O-2' || e === 'O-1') { // 退回 显示退回原因，且必输
        this.ftReturnHid = false;
        this.returnReasonFlag = true;
      }
    },
    getFpApproveInfo () {
      var _this = this;
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId,
          finalPostFlag: this.node.currentNode === 'node5' ? '00' : '01'
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (data) {
            clone(data, this.approveFormdata);
            this.approveFormdata.bigApproveAmt = moneyToUpper(data.approveAmt);
            this.approveFormdata.commonBigApproveAmt = moneyToUpper(data.commonCardApproveAmt);
          }
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });

      // 如果是终审二岗查询终审一岗审批结果，拒绝的不允许修改
      if (this.node.currentNode == 'node6') {
        this.$request({
          url: this.urls.queryUrl,
          method: 'POST',
          data: {
            serno: this.node.bizId,
            finalPostFlag: '00'
          }
        }).then(({code, message, data}) => {
          if (code == '0') {
            if (data) {
              if (data.approveResult == '01') {
                _this.approveFormdata.approveResult = '01';
                _this.approveflag = true;
              }

              if (data.commonCardApproveResult == '01') {
                _this.approveFormdata.commonCardApproveResult = '01';
                _this.comApproveflag = true;
              }
              // 小于50000且小于建议额度不可修改
              if (data.approveAmt <= 50000 && data.approveAmt <= _this.approveFormdata.lmtAdvice && this.node.isConsider != '1') {
                _this.approveflag = true;
              }
              if (data.commonCardApproveAmt <= 50000 && data.commonCardApproveAmt <= _this.approveFormdata.commonLmtAdvice && this.node.isConsider != '1') {
                _this.comApproveflag = true;
              }
            }
          } else {
            this.$message({message: message || '获取数据失败', type: 'error'});
          }
        });
      }
    },
    // 保存
    saveFn (callback) {
      let validate = false;
      this.$refs.finalForm.validate(valid => {
        validate = valid;
      });
      if (callback) {
        if (!validate && this.commentInfo.commentSign != 'O-1') {
          this.$message({ message: '请输入必填项！', type: 'warning' });
          return;
        }
      }

      this.approveFormdata.serno = this.node.bizId;
      const finalPostFlag = this.node.currentNode === 'node5' ? '00' : '01';
      const url = this.urls.updateFirstUrl;
      this.$request({
        url: url,
        method: 'POST',
        data: clone(this.approveFormdata, {finalPostFlag})
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (!callback) {
            this.$message({message: '保存成功', type: 'success'});
          } else {
            this[callback]();
          }
        } else {
          this.$message({message: message || '保存失败', type: 'error'});
        }
      });
    },
    // 获取流程提交参数
    getFlowParam (commentSign) {
      // 流程参数判断
      // 同时申请普卡
      if (this.approveFormdata.approveResult == '01') {
        this.approveFormdata.approveAmt = '0';
      }
      if (this.approveFormdata.commonCardApproveResult == '01') {
        this.approveFormdata.commonCardApproveAmt = '0';
      }
      if (this.approveFormdata.isApplyCommonCard == '1') {
        // 全部同意取最大审批金额
        if (this.approveFormdata.approveResult == '00' && this.approveFormdata.commonCardApproveResult == '00') {
          // 50000以上或者存在超过零售建议额度，上调一级
          var maxAmt = this.approveFormdata.approveAmt > this.approveFormdata.commonCardApproveAmt ? this.approveFormdata.approveAmt : this.approveFormdata.commonCardApproveAmt;
          if ((maxAmt > 50000 || this.approveFormdata.approveAmt > this.approveFormdata.lmtAdvice || this.approveFormdata.commonCardApproveAmt > this.approveFormdata.commonLmtAdvice) && maxAmt <= 300000) {
            this.secondFlag = '2';
          } else if (maxAmt > 300000) {
            this.secondFlag = '3';
          } else {
            this.secondFlag = '1';
          }
          // 主卡同意，普卡不同意
        } else if (this.approveFormdata.approveResult == '00' && this.approveFormdata.commonCardApproveResult == '01') {
          if ((this.approveFormdata.approveAmt > 50000 || this.approveFormdata.approveAmt > this.approveFormdata.lmtAdvice) && this.approveFormdata.approveAmt <= 300000) {
            this.secondFlag = '2';
          } else if (this.approveFormdata.approveAmt > 300000) {
            this.secondFlag = '3';
          } else {
            this.secondFlag = '1';
          }
          // 主卡不同意，普卡同意
        } else {
          if ((this.approveFormdata.commonCardApproveAmt > 50000 || this.approveFormdata.commonCardApproveAmt > this.approveFormdata.commonLmtAdvice) && this.approveFormdata.commonCardApproveAmt <= 300000) {
            this.secondFlag = '2';
          } else if (this.approveFormdata.commonCardApproveAmt > 300000) {
            this.secondFlag = '3';
          } else {
            this.secondFlag = '1';
          }
        }
      } else {
        if ((this.approveFormdata.approveAmt > 50000 || this.approveFormdata.approveAmt > this.approveFormdata.lmtAdvice) && this.approveFormdata.approveAmt <= 300000) {
          this.secondFlag = '2';
        } else if (this.approveFormdata.approveAmt > 300000) {
          this.secondFlag = '3';
        } else {
          this.secondFlag = '1';
        }
      }
      // 打回 O-1 退回 O-2 否决 O-8 同意 O-12
      const paramWF = {};
      paramWF['isConsider'] = '0';
      paramWF['secondFlag'] = this.secondFlag;
      for (let i = 0; i < this.node.flowParam.length; i++) {
        // 流程中业务参数更新
        paramWF[this.node.flowParam[i].key] = this.node.flowParam[i].value;
      }
      if (this.approveFormdata.approveResult == '00') {
        this.commentInfo.userComment = '主卡审批结果为:[通过],额度为:' + this.approveFormdata.approveAmt;
      } else {
        this.commentInfo.userComment = '主卡审批结果为:[拒绝]';
      }
      if (this.approveFormdata.isApplyCommonCard == '1') {
        if (this.approveFormdata.commonCardApproveResult == '00') {
          this.commentInfo.userComment += '普卡审批结果为:[通过],额度为:' + this.approveFormdata.commonCardApproveAmt;
        } else {
          this.commentInfo.userComment += '普卡审批结果为:[拒绝]';
        }
      }
      var reason = '';
      // 如果打回，将打回原因放入审批结论中
      if (this.approveFormdata.approveConclusion == 'O-1') {
        var returnReason = this.approveFormdata.returnReason;
        const datacode1 = this.$lookup.find('STD_CARD_RETURN_REASON');
        var i = 0;
        for (i = 0; i < datacode1.length; i++) {
          if (datacode1[i].key == returnReason) {
            reason = '退回原因:' + datacode1[i].value;
          }
        }
      }
      // 提交意见信息
      this.commentInfo.instanceId = this.node.instanceId;
      this.commentInfo.nodeId = this.node.nodeId;
      this.commentInfo.userId = this.node.currentUserId;
      this.commentInfo.commentSign = commentSign;
      this.commentInfo.ext = reason + ',' + this.approveFormdata.finalJudgRemark;
      const param = {
        opType: commentSign, // 审批结论
        param: paramWF, // 业务参数
        comment: this.commentInfo // 提交意见参数
      };
      return param;
    },
    // 提交
    submitFn () {
      // 核准额度，提交时弹框展示核准额度，并需要终审岗再次确认;
      if ((this.refuseReasonHid || this.commonRefuseReasonHid) && this.approveFormdata.approveConclusion == 'O-12') {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.rForm.approveAmt = this.approveFormdata.approveAmt;
          this.$set(this.rForm, 'mainCard', this.$lookup.convertKey('STD_CARD_APPLY_CARD_PRD', this.approveFormdata.applyCardPrd));
          if (this.approveFormdata.isApplyCommonCard === '1') {
            this.rForm.commonCardApproveAmt = this.approveFormdata.commonCardApproveAmt;
            this.$set(this.rForm, 'supCard', this.$lookup.convertKey('STD_CARD_APPLY_CARD_PRD', this.approveFormdata.commonCardPrd));
          }
        });
      } else {
        this.doCheckFn();
      }
    },
    doCheckFn () {
      if (this.commentInfo.commentSign == 'O-1' && this.approveFormdata.returnReason == null) {
        this.$message({ message: '退回退回原因必填！', type: 'warning' });
        return;
      }
      this.dialogVisible = false;
      const param = this.getFlowParam(this.commentInfo.commentSign);
      this.$emit('submit', param);
    },
    // 返回
    returnFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
      });
    },
    getFirstApproveFn () {
      var _this = this;
      this.firstApprovedialogVisible = true;
      // 调用接口查询一岗审批意见 finalPostFlag 00 一岗 01 二岗
      this.$nextTick(() => {
        this.$request({
          url: this.urls.queryUrl,
          method: 'POST',
          data: {
            serno: this.node.bizId,
            finalPostFlag: '00'
          }
        }).then(({code, message, data}) => {
          if (code == '0') {
            clone(data, this.firstForm);
            if (data.approveResult == '01') {
              _this.firstRefuseflag = false;
            }
            if (data.approveResult == '01') {
              _this.firstComRefuseflag = false;
            }
          }
        });
      });
    },
    // 获取零售内评信息
    getLsnpInfo () {
      var _this = this;
      this.$request({
        url: this.urls.queryLsnpUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          // 同时申请普卡
          if (_this.approveFormdata.isApplyCommonCard == '1') {
            _this.approveFormdata.lmtAdvice = data[0].lmtAdvice;
            _this.approveFormdata.commonLmtAdvice = data[1].lmtAdvice;
          } else {
            _this.approveFormdata.lmtAdvice = data[0].lmtAdvice;
          }
        }
      });
    }
  },

  created () {
    this.optypeOptions = this.node.optypeOptions || dict.OP_TYPE || [];
    this.opDict = [];
    for (const item of this.optypeOptions) {
      this.opDict.push({
        key: item.value,
        value: item.label
      });
    }
  },
  mounted () {
    this.getLsnpInfo();
    this.getFpApproveInfo();
  }
};
</script>
<style scoped>
.final-approve {
  height: 100%;
}
</style>