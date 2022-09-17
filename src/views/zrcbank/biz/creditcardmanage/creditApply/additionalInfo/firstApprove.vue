<template>
  <div class="first-approve">
    <yu-xform ref="prefForm" label-width="200px" v-model="approveFormdata" :disabled="formDisable||node.pageType!=='TODO'" :rules="rules">
      <yu-xform-group :column="1">
        <yu-xform-item label="是否有增信" name="isHaveCreditIncrease" ctype="select" data-code="STD_ZB_YES_NO" rules="required" :colspan="12"></yu-xform-item>
        <yu-xform-item label="" name="" ctype="custom" :colspan="12"></yu-xform-item>
        <yu-xform-item label="审批结论" name="approveConclusion" ctype="select" :options="opDict" rules="required" @change="conclusionChange" :colspan="12"></yu-xform-item>
        <yu-xform-item label="" name="" ctype="custom" :colspan="12"></yu-xform-item>
        <yu-xform-item label="退回原因" name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON" :required="returnReasonflag" :hidden="returnHid" @change="returnChange" :colspan="12"></yu-xform-item>
        <yu-xform-item label="" name="" ctype="custom" :hidden="returnHid" :colspan="12"></yu-xform-item>
        <yu-xform-item label="拒绝原因" name="refuseReason" ctype="select" data-code="STD_CARD_FIRST_REFUSE_REASON" :required="refuseReasonflag" :hidden="refuseHid" :colspan="12"></yu-xform-item>
        <yu-xform-item label="" name="" ctype="custom" :hidden="refuseHid" :colspan="12"></yu-xform-item>
        <yu-xform-item label="补件多选" name="multiSelectProve" ctype="checkbox" data-code="STD_CARD_MULTI_SELECT_PROVE" value-type="string" :hidden="multiHid"></yu-xform-item>
        <yu-xform-item label="初审备注" name="firstJudgRemark" ctype="textarea"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton" v-if="node.pageType=='TODO'">
        <yu-button type="primary" v-if="!formDisable" @click="saveFn(null)">保存</yu-button>
        <yu-button type="primary" v-if="!formDisable" @click="saveFn('submitFn')">提交</yu-button>
        <yu-button type="primary" v-if="!formDisable" @click="returnFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
import { clone, lookup } from '@/utils';
import dict from '@/config/constant/app.data.lookup.js';
lookup.reg('STD_ZB_YES_NO,STD_APPROVE_CONCLUSION,STD_CARD_RETURN_REASON');
lookup.reg('STD_CARD_FIRST_REFUSE_REASON,STD_CARD_MULTI_SELECT_PROVE');
export default {
  name: 'FirstApprove',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    return {
      approveFormdata: {},
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/creditcardfirstjudginifo/querybyserno',
        updateUrl: this.$backend.cmisBiz + '/api/creditcardfirstjudginifo/save',
        reviewUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/xyklsnp',
        creditReportUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/getcreditreportinfo',
        creditCardtUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybyserno',
        archiveUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/getdocarchiveclient'
      },
      rules: {
      },
      returnHid: true,
      refuseHid: true,
      multiHid: false,
      formDisable: false, // 表单只读状态和操作按钮的显隐
      returnReasonflag: false,
      refuseReasonflag: false,
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
      opDict: []
    };
  },
  methods: {
    conclusionChange (e) {
      this.commentInfo.commentSign = e;
      if (e === 'O-12') { // 通过
        this.returnHid = true;
        this.refuseHid = true;
        this.multiHid = true;
        this.approveFormdata.multiSelectProve = '';
        this.returnReasonflag = true;
        this.refuseReasonflag = false;
      } else if (e === 'O-2' || e === 'O-1') { // 退回 显示退回原因，非必输
        this.returnHid = false;
        this.refuseHid = true;
        this.returnReasonflag = true;
        this.refuseReasonflag = false;
      } else if (e === 'O-8') { // 拒绝 显示拒绝原因，非必输
        this.returnHid = true;
        this.refuseHid = false;
        this.returnReasonflag = false;
        this.refuseReasonflag = true;
        this.multiHid = true;
      }
    },
    returnChange (e) { // 选择资料不全或者补充资料时，展示补件多选，其他退回原因，补件多选隐藏
      // this.multiHid = !(e === '01' || e === '05');
      if (e === '01' || e === '05') {
        this.multiHid = false;
      } else {
        this.multiHid = true;
      }
    },
    getFpApproveInfo () {
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          clone(data, this.approveFormdata);
          !this.approveFormdata.serno && (this.approveFormdata.serno = this.node.bizId);
          !this.approveFormdata.isHaveCreditIncrease && (this.approveFormdata.isHaveCreditIncrease = '0');
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },
    // 保存
    saveFn (callback) {
      let validate = false;
      this.$refs.prefForm.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        this.$message({ message: '请输入必填项！', type: 'warning' });
        return;
      }
      this.approveFormdata.serno = this.node.bizId;
      this.$request({
        url: this.urls.updateUrl,
        method: 'POST',
        data: this.approveFormdata
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
    getFlowParam (commentSign, rparam) {
      // 打回 O-1 退回 O-2 否决 O-8 同意 O-12
      const paramWF = {};
      for (let i = 0; i < this.node.flowParam.length; i++) {
        // 流程中业务参数更新
        paramWF[this.node.flowParam[i].key] = this.node.flowParam[i].value;
      }
      // 提交意见信息
      this.commentInfo.instanceId = this.node.instanceId;
      this.commentInfo.nodeId = this.node.nodeId;
      this.commentInfo.userId = this.node.currentUserId;
      this.commentInfo.commentSign = commentSign;
      this.commentInfo.ext = this.approveFormdata.firstJudgRemark;
      const param = {
        opType: commentSign, // 审批结论
        param: clone(rparam, paramWF), // 业务参数
        comment: this.commentInfo // 提交意见参数
      };
      return param;
    },
    // 提交
    submitFn () {
      var _this = this;
      if (this.approveFormdata.approveConclusion == 'O-12') {
        // 获取征信到期日
        this.$request({
          url: this.urls.creditCardtUrl,
          method: 'POST',
          data: {
            serno: this.approveFormdata.serno
          }
        }).then(({code, message, data}) => {
          if (code == '0') {
            var creditAuthDate = data.creditAuthDate;
            let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);// 获取当前时间
            const currentDate = new Date(openday).getTime();
            var endDate = new Date(creditAuthDate).getTime + 2592000000;
            if (currentDate > endDate) {
              this.$message({message: '当前日期大于征信授权到期日' + endDate + ',无法提交！', type: 'error'});
            } else {
              _this.commit();
            }
          } else {
            this.$message({message: message || '获取信用卡申请信息异常！', type: 'error'});
          }
        });
      } else {
        _this.commit();
      }
    },
    commit () {
      if (this.approveFormdata.approveConclusion == 'O-12') {
        // 获取征信信息
        this.getCreditReport();
        this.getDocArchive();
        // 初审提交前调用零售内评接口
        this.$request({
          url: this.urls.reviewUrl,
          method: 'POST',
          data: {
            serno: this.approveFormdata.serno
          }
        }).then(({code, message, data}) => {
          if (code == '0') {
            const rparam = clone(data, {});
            const param = this.getFlowParam(this.commentInfo.commentSign, rparam);
            if (data.firstflag == '2') {
              this.$xutils.showMsgBox('提示', '零售内评结果为快速拒绝，请联系客户经理复议', 350, 150, () => {
                this.$emit('submit', param);
              });
            } else {
              this.$emit('submit', param);
            }
          } else {
            this.$message({message: message || '零售内评异常！', type: 'error'});
          }
        });
      } else {
        var _this = this;
        var returnReason = this.approveFormdata.returnReason;
        var multiSelectProve = this.approveFormdata.multiSelectProve;
        const datacode = this.$lookup.find('STD_CARD_RETURN_REASON');
        const datacodeprove = this.$lookup.find('STD_CARD_MULTI_SELECT_PROVE');
        var i = 0;
        var commnent = '';
        var commnentprove = '补件多选:';
        for (i = 0; i < datacode.length; i++) {
          if (datacode[i].key == returnReason) {
            commnent = '退回原因:' + datacode[i].value;
          }
        }
        for (i = 0; i < datacodeprove.length; i++) {
          if (multiSelectProve.indexOf(datacodeprove[i].key) != -1) {
            commnentprove = commnentprove + ' ' + datacodeprove[i].value;
          }
        }
        const rparam = {};
        const param = this.getFlowParam(this.commentInfo.commentSign, rparam);
        param.comment.userComment = commnent + ' ' + commnentprove;
        this.$emit('submit', param);
      };
    },
    getCreditReport () {
      this.$request({
        url: this.urls.creditReportUrl,
        method: 'POST',
        data: {
          serno: this.approveFormdata.serno
        }
      }).then(({code, message, data}) => {
        if (code != '0') {
          this.$message({message: message || '获取征信信息异常！', type: 'warning'});
        }
      });
    },
    getDocArchive () {
      this.$request({
        url: this.urls.archiveUrl,
        method: 'POST',
        data: {
          serno: this.approveFormdata.serno
        }
      }).then(({code, message, data}) => {
        if (code != '0') {
          this.$message({message: message || '任务归档异常！', type: 'warning'});
        }
      });
    },
    // 返回
    returnFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
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
    this.getFpApproveInfo();
    // 流程节点只要不是 node4 则表单只读状态和按钮隐藏
    this.formDisable = this.node.currentNode !== 'node4';
  }
};
</script>
<style scoped>
.first-approve {
  height: 100%;
}
</style>