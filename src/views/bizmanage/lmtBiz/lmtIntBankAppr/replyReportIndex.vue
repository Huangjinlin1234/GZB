<template>
  <div class="tab-form">
    <yu-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <yu-tab-pane label="授信申报详情" name="first">
        <div v-if="type">
          <div v-if="change">
            <lmtIntBankAppDetails v-if="showParams" :pageParams="detailsParams"></lmtIntBankAppDetails>
          </div>
          <div v-else>
            <lmtIntBankAppDetailsCha v-if="showParams" :pageParams="detailsParams"></lmtIntBankAppDetailsCha>
          </div>
        </div>
        <subjectCreditDetails v-else :pageParams="detailsParams"></subjectCreditDetails>
      </yu-tab-pane>
      <yu-tab-pane label="审查报告" name="examineReport" v-if="showExamine">
        <div :is="currentView" :pageParams="pageParams" @changed="cancelFn" @doPrint="onPrint"></div>
      </yu-tab-pane>
      <yu-tab-pane label="批复报告" name="replyReport" v-if="showReply">
        <div :is="currentViewReply" :pageParams="pageParamsReply" @changed="cancelFn" @doPrint="onPrint"></div>
      </yu-tab-pane>
      <yu-tab-pane label="核查报告" name="checkReport" v-if="showCheck">
          <lmtSigInvestApprCheckReport v-if="activeName=='checkReport'" :pageParams="checkParams"></lmtSigInvestApprCheckReport>
      </yu-tab-pane>
      <yu-tab-pane v-if="printFlag" :label="label" name="third">
        <AppReplyReport v-if="activeName=='third'" :children="children"></AppReplyReport>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>

<script>
import lmtIntBankAppDetails from '../lmtIntBankApp/lmtIntBankAppDetails';
import lmtIntBankAppDetailsCha from "../lmtIntBankAppCha/lmtIntBankAppDetails";
import subjectCreditDetails from '../subjectCredit/subjectCreditDetails';
import lmtSigInvestApprCheckReport from '@/views/bizmanage/lmtBiz/lmtSigInvestAppr/lmtSigInvestApprCheckReport';
import AppReplyReport from '@/views/bizmanage/lmtBiz/lmtIntBankAppr/AppReplyReport';
import lmtSigInvestApprReport from '../lmtSigInvestAppr/lmtSigInvestApprReport';

import lmtIntBankAppReplyReport from './lmtIntBankAppReplyReport';
import lmtSigInvestApprReplyReport from '../lmtSigInvestAppr/lmtSigInvestApprReplyReport';

import lmtIntBankAppReport from "./lmtIntBankAppReport";
import {nodeHandle} from "@/utils/unitchange";
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: {
    lmtIntBankAppDetails,
    lmtIntBankAppDetailsCha,
    subjectCreditDetails,
    lmtSigInvestApprCheckReport,
    AppReplyReport,
    lmtSigInvestApprReport,
    lmtIntBankAppReplyReport,
    lmtSigInvestApprReplyReport,
    lmtIntBankAppReport,
  },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      showParams: false,
      change: true,
      pageParams: {},
      checkParams: {},
      pageParamsReply: {},
      label: "",
      type: false,
      activeName: 'first',
      printFlag: false,
      children: Object,
      currentView: '',
      currentViewReply: '',
      showReply: false,
      showCheck: false,
      showExamine: true,
      serno: '',
    };
  },
  created () {
    // this.init();
    console.log("bizPageData===>", this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let flowParam = this.bizPageData.flowParam;
    let serno, cusId, op, rop;
    let tableName = this.bizPageData.flowParam.tableName;
    let disabledInteAnaly, disabledInteAnalyZH;
    let pageType = instanceInfo.pageType;
    let nodeId = instanceInfo.nodeId;
    this.checkParams.op = "DETAIL";
    op = "DETAIL";
    rop = "DETAIL";

    let obj = nodeHandle(nodeId);
    this.showExamine = obj.showExamine;
    this.showReply = obj.showReply;
    this.showCheck = obj.showCheck;
    if(obj.showCheck){
      this.checkDetails();
    };
    // 我的待办（我的已办 我的办结 都只读）
    if(!pageType){
      // 审查
      if(obj.op){
        op = obj.op;
      }

      // 批复
      if(obj.rop){
        rop = obj.rop;
      }

      // 核查
      if(obj.cop){
        this.checkParams.op = obj.cop;
      }
    }
    if (tableName == 'lmtIntbankApp') {
      this.type = true;
      let lmtType = this.bizPageData.flowParam.lmtType;
      lmtType == '02' ? this.change = false : this.change = true;
      serno = instanceInfo.bizId;
      cusId = instanceInfo.bizUserId;
      let selectType = 'Info';
      if (lmtType == '05') {
        selectType = 'Back';
      }
      this.pageParams = {
        serno: serno,
        cusId: cusId,
        op: op,
        selectType: selectType
      };
      this.replyUrl = '/api/lmtintbankappr/updateRestByPkId';
    } else if (tableName == 'lmtsiginvestapp') {
      this.type = false;
      serno = instanceInfo.bizId;
      cusId = instanceInfo.bizUserId;
      if (instanceInfo.bizType == 'TY008') {
        this.showCheck = true;
      }
      this.pageParams = {
        cusCatalog: flowParam.cusCatalog,
        updIdName: flowParam.updIdName,
        inputBrId: flowParam.inputBrId,
        inputBrIdName: flowParam.inputBrIdName,
        inputIdName: flowParam.inputIdName,
        lmtBizType: flowParam.lmtBizType,
        serno: serno,
        cusId: cusId, 
        disabledInteAnaly,
        disabledInteAnalyZH,
        appType: flowParam.appType,
        op: op,
      }
      this.replyUrl = '/api/lmtsiginvestappr/updateRestByPkId';
    }
    this.pageParamsReply = Object.assign({}, this.pageParams);
    this.pageParamsReply.op = rop;
    this.detailsParams = Object.assign({}, this.pageParams)
    this.detailsParams.op = "DETAIL";
    this.showParams = false;
    this.$nextTick(() => {
      this.showParams = true;
    })
  },

  mounted: function () {},
  methods: {
    handleClick(){
      let tableName = this.bizPageData.flowParam.tableName;
      if(this.activeName == "examineReport"){
        if(tableName == "lmtIntbankApp"){
          this.currentView = "lmtIntBankAppReport";
        }else{
          this.currentView = "lmtSigInvestApprReport";
        }
      }else if(this.activeName == "replyReport"){
         if(tableName == "lmtIntbankApp"){
          this.currentViewReply = "lmtIntBankAppReplyReport";
        }else{
          this.currentViewReply = "lmtSigInvestApprReplyReport";
        }
      }else if(this.activeName == "checkReport"){

      }
    },
    // 核查报告详情
    checkDetails(){
      var _this = this;
      let instanceInfo = this.bizPageData.instanceInfo;
      let serno;
      serno = instanceInfo.bizId;
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisBiz + "/api/lmtsiginvestapp/selectBySerno",
        data: {
          condition: JSON.stringify({
            serno: serno,
          }),
        },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.checkParams = Object.assign(_this.checkParams, response.data);
            _this.checkParams.serno = serno;
            _this.show_params = false;
            _this.$nextTick(() => {
              _this.show_params = true;
            });
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
    init: function () {
      var _this = this;
      let serno = _this.bizPageData.instanceInfo.bizId;
      let tableName = _this.bizPageData.flowParam.tableName;
      if (tableName == 'lmtIntbankApp') {
        _this.currentView = 'lmtIntBankAppReport';
        _this.currentViewReply = 'lmtIntBankAppReplyReport';
      } else if (tableName == 'lmtsiginvestapp') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/lmtsiginvestappr/selectBySerno',
          data: { condition: JSON.stringify({ serno: serno }) },
          callback (code, message, response) {
            if (code == 0) {
              let lmtBizType = response.data.lmtSigInvestAppr.lmtBizType;
              _this.pageParams.lmtBizType = lmtBizType;
              // if(_this.activeName == "examineReport"){
              //   _this.currentView = "lmtSigInvestApprReport";
              // }else if(_this.activeName == "replyReport"){
              //   _this.currentView1 = "lmtSigInvestApprReplyReport";
              // }
              if (
                lmtBizType == '4008' ||
                lmtBizType == '4002' ||
                lmtBizType == '4011' ||
                lmtBizType == '4012' ||
                lmtBizType == '4010' ||
                lmtBizType == '4009' ||
                lmtBizType == '4004'
              ) {
                _this.currentView = 'lmtSigInvestApprReport';
                _this.currentViewReply = 'lmtSigInvestApprReplyReport';
              } else if (lmtBizType == '4001') {
                _this.currentView = 'lmtSigInvestApprReport02';
                _this.currentViewReply = 'lmtSigInvestApprReplyReport';
              } else if (lmtBizType == '4006' || lmtBizType == '4007') {
                _this.currentView = 'lmtSigInvestApprReport03';
                _this.currentViewReply = 'lmtSigInvestApprReplyReport';
              } else if (lmtBizType == '4003' || lmtBizType == '4005') {
                _this.currentView = 'lmtSigInvestApprReport07';
                _this.currentViewReply = 'lmtSigInvestApprReplyReport';
              }
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    onPrint (params) {
      var _this = this;
      if (_this.activeName == "examineReport") {
        _this.label = "查看审查报告";
      } else if (_this.activeName == "replyReport") {
        _this.label = "查看批复报告";
      }
      _this.printFlag = true;
      _this.children = params;
      _this.$nextTick(() => {
        _this.activeName = 'third';
      });
    }
  }
};
</script>
