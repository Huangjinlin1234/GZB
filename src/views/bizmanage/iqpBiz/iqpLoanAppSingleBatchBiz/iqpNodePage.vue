<template>
  <div class="first-approve">
    <yu-xform ref="prefForm" label-width="200px" v-model="approveFormdata"  :rules="rules">
      <yu-xform-group :column="3">
        <yu-xform-item label="是否上调权限" name="isUpperApprAuth" ctype="select" data-code="STD_ZB_YES_NO" rules="required" :colspan="24" v-if="powerFlag"></yu-xform-item>
        <yu-xform-item label="审批结论" name="commentSign" ctype="select" :options="opDict" rules="required" @change="conclusionChange" :colspan="24" :hidden="hideflag"></yu-xform-item>
        <yu-xform-item label="资料是否提交齐全" name="isinforcomplete" ctype="select" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="rule5"  :colspan="24" v-if="rule5!=''" ></yu-xform-item>
        <yu-xform-item label="是否打回初始节点" name="firstpoint" ctype="select" data-code="STD_ZB_YES_NO" @change="pointChange" rules="required" :hidden="firsthideflag"></yu-xform-item>
        <yu-xform-item label="打回原因（可多选）" name="apprBackReasonType" ctype="checkbox" :options="apprBackReasonTypeOptions" value-type="string" :colspan="24" :hidden="backFlag"></yu-xform-item>
        <yu-xform-item label="意见" name="userComment" ctype="textarea" rules="required" :colspan="24"></yu-xform-item>
        <yu-xform-item label="贷款品种" name="prdName" ctype="input" disabled :hidden="nodeflag"></yu-xform-item>
        <yu-xform-item label="额度" name="replyAmt" ctype="yu-num" rules="required" :hidden="nodeflag" ></yu-xform-item>
        <yu-xform-item label="期限" name="replyTerm" ctype="yu-num" rules="required"  :hidden="nodeflag"></yu-xform-item>
        <yu-xform-item label="利率" name="replyRate" ctype="yu-num" rules="required"  sign="%" :multiple="100" :hidden="nodeflag"></yu-xform-item>
        <yu-xform-item label="还款方式" name="repayMode" ctype="select" :rules="isRepayModeRequired" :options="repayModeOpt" :hidden="nodeflag" :disabled="isBld"></yu-xform-item>
        <yu-xform-item label="担保方式" name="guarMode" ctype="select" rules="required"  :options="guarWayOpt" :hidden="nodeflag"></yu-xform-item>
        <yu-xform-item label="用信条件" name="loanCond" ctype="textarea" rules="required" :colspan="24" :hidden="nodeflag"></yu-xform-item>
        <yu-xform-item label="风控建议" name="riskAdvice" ctype="textarea" rules="required" :colspan="24" :hidden="nodeflag"></yu-xform-item>
        <yu-xform-item label="liushui" name="iqpSerno" ctype="input" hidden></yu-xform-item>
        <yu-xform-item label="pkId" name="pkId" ctype="input" hidden></yu-xform-item>
        <yu-xform-item label="approvePost" name="approvePost" ctype="input" hidden></yu-xform-item>
        <yu-xform-item label="approveConclusion" name="approveConclusion" ctype="input" hidden></yu-xform-item>
        <yu-xform-item label="approveAdvice" name="approveAdvice" ctype="input" hidden></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button type="primary"  @click="saveFn(null)" :hidden="hideflag">保存</yu-button>
        <yu-button type="primary"  @click="submitFn" :hidden="hideflag">提交</yu-button>
        <yu-button type="primary"  @click="returnFn">返回</yu-button>
      </div>
    </yu-xform>
    <div slot="header" class="clearfix">
            <span style="font-size:15px">流程审批历史</span>
          </div>
          <br>
    <yu-xtable ref="refDrawTable"  :base-params="searchFormdata" border :data="drawData" :pageable="false">
        <yu-xtable-column label="审批节点名称" prop="nodeName" ></yu-xtable-column>
        <yu-xtable-column label="办理人员名称" prop="userName" ></yu-xtable-column>
        <yu-xtable-column label="审批时间" prop="startTime" ></yu-xtable-column>
        <yu-xtable-column label="办理人员" prop="userId"></yu-xtable-column>
        <yu-xtable-column label="审批节点编号" prop="nodeId" ></yu-xtable-column>
        <yu-xtable-column label="审批意见" prop="userComment"></yu-xtable-column>
        <yu-xtable-column label="扩展意见" prop="ext"></yu-xtable-column>
        <yu-xtable-column label="审批结果" prop="commentSign"></yu-xtable-column>
      </yu-xtable>
    <yu-xdialog title="风险拦截" :visible.sync="riskdialogVisible" width="850px">
      <yu-xtable ref="refTablerisk" :pageable="false" :data="riskData" row-number>
        <yu-xtable-column label="风险拦截项目" width="300" prop="itemName"></yu-xtable-column>
        <yu-xtable-column label="拦截结果" prop="resultDesc"></yu-xtable-column>
        <yu-xtable-column label="是否通过" width="120" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.result==1" class="el-icon-yx-checkmark" style="margin-top: 7px;font-size: 30px;color: #13ce66;"></i>
            <i v-if="scope.row.result==2" class="el-icon-loading" style="margin-top: 7px;font-size: 28px;color:#20a0ff"></i>
            <i v-if="scope.row.result==3&&scope.row.riskLevel==1" class="el-icon-yx-info" style="margin-top: 7px;font-size: 30px;color:#20a0ff"></i>
            <i v-if="scope.row.result==3&&scope.row.riskLevel==2" class="el-icon-yx-warning" style="margin-top: 7px;font-size: 30px;color:#f7ba2a"></i>
            <i v-if="scope.row.result==3&&scope.row.riskLevel==3" class="el-icon-yx-cancel-circle" style="margin-top: 7px;font-size: 30px;color: #ff4949"></i>
          </template>
        </yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton" style="margin-top:8px;">
        <yu-button icon="check" type="primary" @click="checkRiskFn(true)">确定</yu-button>
        <yu-button icon="yx-undo2" type="primary" @click="cancelRiskFn">取消</yu-button>
      </div>
    </yu-xdialog>
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
      rule5: '',
      approveFormdata: {},
      urls: {
        instanceInfo: backend.workflowService + '/api/core/instanceInfo',
        queryUrl: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        saveUrl: backend.workflowService + '/api/core/saveComment/',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        getLsnpUrl: this.$backend.cmisBiz + '/api/iqpcuslsnpinfo/selectbyserno',
        saveApprUrl: this.$backend.cmisBiz + '/api/iqploanappr/saveorupdate',
        getApprUrl: this.$backend.cmisBiz + '/api/iqploanappr/querybysernoandnode'
      },
      rules: {
      },
      drawData: [],
      hideflag: false,
      isRepayModeRequired: {
        required: true,
        message: '必填项',
        trigger: 'blur'
      },
      button: {
        // 按钮权限控制
        submit: '1',
        gather: '0',
        callBack: '0',
        entrust: '0',
        copy: '0',
        jump: '0',
        returnBack: '0',
        change: '0',
        unSignIn: '0',
        signIn: '0',
        assist: '0',
        refuse: '0',
        taskPoolId: '0',
        subFlowId: '0',
        subFlow: '',
        reStart: '0'
      },
      returnHid: false,
      refuseHid: false,
      multiHid: false,
      powerFlag: false,
      formDisable: false, // 表单只读状态和操作按钮的显隐
      inteRiskLvl: '',
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
      prdType: '',
      guarWayOpt: [],
      repayModeOpt: [],
      nodeflag: true,
      isBld: false,
      riskdialogVisible: false,
      backFlag: true,
      // 风险拦截相关
      riskData: [],
      firsthideflag: true,
      apprBackReasonTypeOptions: [{
        key: '1',
        value: '授信资料资料不全，不准确'
      }, {
        key: '2',
        value: '调查报告质量不全面、不合逻辑'
      }, {
        key: '3',
        value: '系统操作错误'
      }, {
        key: '4',
        value: '由于系统原因的非差错类退回'
      }, {
        key: '5',
        value: '总行要求修改授信方案'
      }, {
        key: '6',
        value: '客户经理要求退回'
      }, {
        key: '7',
        value: '其他不符合我行授信政策退回'
      }]
    };
  },
  methods: {
    conclusionChange (e) {
      let _this = this;
      let nodeId = _this.node.nodeId;
      _this.commentInfo.commentSign = e;
      if (_this.commentInfo.commentSign == 'O-12') {
        if (nodeId == '230_11') {
          _this.rule5 = [
            {
              required: true,
              message: '必填项',
              trigger: 'blur'
            }
          ];
        }
      }
      if (this.commentInfo.commentSign == 'O-2' || this.commentInfo.commentSign == 'O-1') {
        this.firsthideflag = false;
      } else {
        this.firsthideflag = true;
        this.backFlag = true;
      }
    },

    returnChange (e) { // 选择资料不全或者补充资料时，展示补件多选，其他退回原因，补件多选隐藏
      this.multiHid = !(e === '01' || e === '05');
    },
    pointChange (val) {
      if (val == '1') {
        this.backFlag = false;
      } else {
        this.backFlag = true;
      }
    },
    // 保存
    saveFn (callback) {
      this.$request({
        url: this.urls.saveUrl,
        method: 'POST',
        data: {
          commentSign: '',
          userComment: this.approveFormdata.userComment,
          instanceId: this.node.instanceId,
          userId: this.node.currentUserId,
          nodeId: this.node.nodeId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.$message({message: '保存成功', type: 'success'});
        } else {
          this.$message({message: message, type: 'warning'});
        }
      });
      this.saveAppr();
    },
    saveAppr () {
      this.approveFormdata.approveConclusion = this.approveFormdata.commentSign;
      this.approveFormdata.approveAdvice = this.approveFormdata.userComment;
      this.$request({
        url: this.urls.saveApprUrl,
        method: 'POST',
        data: this.approveFormdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.$message({message: '保存成功', type: 'success'});
        } else {
          this.$message({message: message, type: 'warning'});
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
      this.commentInfo.userComment = this.approveFormdata.userComment;
      const param = {
        opType: commentSign, // 审批结论
        param: clone(rparam, paramWF), // 业务参数
        comment: this.commentInfo // 提交意见参数
      };
      return param;
    },
    // 提交
    submitFn () {
      let validate = false;
      this.$refs.prefForm.validate(valid => {
        validate = valid;
      });
      if (!validate && this.commentInfo.commentSign != 'O-1') {
        this.$message({ message: '请输入必填项！', type: 'warning' });
        return;
      }
      // 同意触发风险拦截
      if (this.approveFormdata.commentSign == 'O-12') {
        this.riskFn();
      } else {
        this.saveAppr();
        var isUpperApprAuth = this.approveFormdata.isUpperApprAuth;
        const rparam = {isRaise: isUpperApprAuth};
        const param = this.getFlowParam(this.commentInfo.commentSign, rparam);
        this.$emit('submit', param);
      }
    },
    setChangePower () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.urls.getLsnpUrl,
        data: {
          serno: this.node.bizId
        },
        callback: function (code, message, response) {
          if (code == '0') {
            if (response.data != null ? response.data.length > 0 : false) {
              _this.commentinfo = '';
              var lsnpInfo = response.data;
              if (lsnpInfo[0].inteRiskLvl == 'D') {
                _this.approveFormdata.changePower = '1';
              } else {
                _this.approveFormdata.changePower = '0';
              }
            }
          } else {
            this.$message({message: message, type: 'error'});
          }
        }
      });
    },
    // 返回
    returnFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
      });
    },
    /** 风险拦截相关 --- 开始 */
    riskFn: function () {
      var _this = this;
      // 流程参数
      _this.riskData.splice(0, _this.riskData.length);
      let model = {condition: JSON.stringify({ 'sceneId': _this.node.nodeId, 'bizType': _this.node.bizType })};
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpvriskscene/getRiskItem',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.data) {
            console.log('长度' + response.data.length);
            if (response.data.length == 0) {
              _this.agreeDialogOpen();
            } else {
              _this.riskStart(response.data, _this.node.instanceInfo);
            }
          } else {
            _this.$message({ message: '初始化风险拦截失败', type: 'error' });
            _this.beforeClose();
          }
        }
      });
    },
    // 保存资料是否完整
    toinfComplete (url, serno, bizType, isinforcomplete, issignet) {
      var _this = this;
      var params = {
        serno: serno,
        bizType: bizType,
        isinforcomplete: isinforcomplete,
        issignet: issignet
      };
      yufp.service.request({
        method: 'POST',
        data: params,
        url: backend.cmisBiz + url,
        callback: function (code, message, response) {
          if (response.code == 0) {
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        }
      });
    },


    // 发起风险拦截
    riskStart: function (data, wfInitData) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.itemName = data[i].itemName;
        obj.riskLevel = data[i].riskLevel;
        obj.result = '2';
        this.riskData.push(obj);
        arr.push(this.riskitem(data[i], wfInitData, i));
      }
      this.riskdialogVisible = true;
      Promise.all(arr).then(res => {
        console.log(res);
      });
    },
    /** 单项拦截 */
    riskitem (item, wfInitData, i) {
      return new Promise((resolve, reject) => {
        let _this = this;
        // model.inputId = _this.loginCode;
        _this.$request({
          url: this.evil(item.itemClass) + '?i=' + i,
          method: 'POST',
          data: JSON.stringify({ condition: JSON.stringify(wfInitData) })
        }).then(({ code, message, data }) => {
          if (data) {
            item.result = data.riskResultType;
            item.resultDesc = data.riskResultDesc;
            _this.$set(_this.riskData, i, item);
          } else {
            item.result = '3';
            item.resultDesc = '检查失败';
            _this.$set(_this.riskData, i, item);
          }
          resolve(data);
        });
      });
    },
    // 转义代码
    evil (fn) {
      let Fn = Function;
      return new Fn('return ' + fn)();
    },
    /** 检查拦截结果 */
    checkRiskFn (btn) {
      var _this = this;
      for (let i = 0; i < _this.riskData.length; i++) {
        let item = _this.riskData[i];
        // 检查未完成
        if (item.result == 2) {
          return;
        }
        // 检查不通过,且等级是拦截
        if (item.result == 3 && item.riskLevel == 3) {
          this.riskdialogVisible = false;
          return;
        }
      }
      this.riskdialogVisible = false;
      // 检查通过,继续发起流程
      this.agreeDialogOpen();
    },
    cancelRiskFn () {
      this.riskdialogVisible = false;
    },
    /** 风险拦截相关 --- 结束 */
    setApproveTabVisiable: function (visible) {
      this.showApproveTab = visible;
    },
    agreeDialogOpen: function () {
      let _this = this;
      _this.saveAppr();
      let bizType = _this.node.bizType;
      let nodeId = _this.node.nodeId;
      let serno = _this.node.bizId;
      if (nodeId == '230_11') {
        this.toinfComplete('/api/businessinformation/updateinfComplete', serno, bizType, this.approveFormdata.isinforcomplete, '0');
      }
      var isUpperApprAuth = _this.approveFormdata.isUpperApprAuth;
      const rparam = {isRaise: isUpperApprAuth};
      const param = _this.getFlowParam(_this.commentInfo.commentSign, rparam);
      _this.$emit('submit', param);
    }
  },
  created () {
    var node = this.node.nodeId;
    if (node == '230_11' || node == '230_3' || node == '230_4') {
      this.powerFlag = true;
    } else {
      this.powerFlag = false;
    }
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
    var _this = this;
    _this.setChangePower();
    _this.approveFormdata.prdName = _this.node.prdName;
    _this.approveFormdata.iqpSerno = _this.node.bizId;
    _this.approveFormdata.approvePost = _this.node.nodeId;

    if (_this.node.prdId == '022028') {
      _this.isBld = true;
      _this.isRepayModeRequired = null;
    }
    yufp.service.request({
      method: 'POST',
      url: _this.urls.getApprUrl,
      data: {
        iqpSerno: _this.node.bizId
      },
      callback: function (code, message, response) {
        if (response.code == 0) {
          if (response.data != null) {
            clone(response.data, _this.approveFormdata);
            _this.approveFormdata.userComment = response.data.approveAdvice;
          } else {
            yufp.service.request({
              method: 'POST',
              url: _this.urls.queryUrl,
              data: {
                iqpSerno: _this.node.bizId
              },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data != null) {
                    _this.approveFormdata.prdName = response.data.prdName;
                    _this.approveFormdata.replyAmt = response.data.appAmt;
                    _this.approveFormdata.replyTerm = response.data.appTerm;
                    _this.approveFormdata.replyRate = response.data.execRateYear;
                    _this.approveFormdata.repayMode = response.data.repayMode;
                    _this.approveFormdata.guarMode = response.data.guarWay;
                    _this.approveFormdata.apprBackReasonType = response.data.apprBackReasonType;
                  }
                }
              }
            });
          }
        }
      }
    });

    if (_this.node.nodeId == '230_58' || _this.node.nodeId == '230_13' || _this.node.nodeId == '230_12' || _this.node.nodeId == '230_4' || _this.node.nodeId == '230_62' || _this.node.nodeId == '230_11' ||
     _this.node.nodeId == '646_8' || _this.node.nodeId == '646_9' || _this.node.nodeId == '646_10' || _this.node.nodeId == '646_11' ||
    _this.node.nodeId == '646_13' || _this.node.nodeId == '646_14' || _this.node.nodeId == '646_15' || _this.node.nodeId == '706_8' || _this.node.nodeId == '706_9' || _this.node.nodeId == '706_10' || _this.node.nodeId == '706_11' ||
    _this.node.nodeId == '706_13' || _this.node.nodeId == '706_14' || _this.node.nodeId == '706_15') {
      _this.nodeflag = false;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
        data: this.node.prdId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              const datacode1 = _this.$lookup.find('STD_ZB_GUAR_WAY');
              const datacode2 = _this.$lookup.find('STD_REPAY_MODE');
              if (response.data.prdType == '10') {
                _this.guarWayOpt = datacode1.filter(op => {
                  return op.key === '10' || op.key === '20' || op.key === '30';
                });
                _this.repayModeOpt = datacode2.filter(op => {
                  return op.key === 'A002' || op.key === 'A003' || op.key === 'A009';
                });
              } else {
                _this.guarWayOpt = datacode1.filter(op => {
                  return op.key === '00' || op.key === '10' || op.key === '20' || op.key === '30';
                });
                _this.repayModeOpt = datacode2.filter(op => {
                  return op.key === 'A001' || op.key === 'A002' || op.key === 'A003' || op.key === 'A009' || op.key === 'A040';
                });
              }
            }
          }
        }
      });
    }
    yufp.service.request({
      method: 'GET',
      url: _this.urls.getComments,
      data: {
        mainInstanceId: this.node.mainInstanceId
      },
      callback: function (code, message, response) {
        if (response.code == 0) {
          if (response.data != null ? response.data.length > 0 : false) {
            _this.commentinfo = '';
            var nodeHistory = response.data;
            for (var i = 0, length = nodeHistory.length; i < length; i++) {
              nodeHistory[i].commentSign = yufp.lookup.convertKey(
                'OP_TYPE',
                nodeHistory[i].commentSign
              );
              _this.drawData = nodeHistory;
              var node = nodeHistory[i].nodeId;
              var nodeNow = _this.node.nodeId;
              if (node == nodeNow) {
                _this.approveFormdata.userComment = nodeHistory[i].userComment;
              }
            }
          }
        }
      }
    });
    var pageType = this.node.pageType;
    if (pageType == 'DONE' || pageType == 'HIS') {
      this.hideflag = true;
      this.powerFlag = false;
    }
    if (this.node.ruleRiskLvl == 'D') {
      this.approveFormdata.isUpperApprAuth = '1';
    }
  }

};
</script>
<style scoped>
.first-approve {
  height: 100%;
}
</style>