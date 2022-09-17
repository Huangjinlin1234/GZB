<template>
  <!--
    @created by zhoumw
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="24" :xs="24">
      <yu-tabs v-model="activeName" @tab-click="handleClick4Refresh">
        <yu-tab-pane label="合作方案信息" name="cooPlanApp">
            <coop-plan-app ref="coopPlanAppPage" :biz-page-data="bizPageData" :page-data="pageData"></coop-plan-app>
        </yu-tab-pane>
        <yu-tab-pane label="资质信息" v-if="partnerType!=13" name="cusIndivContactInfo">
            <coop-plan-apti ref="coopPlanAptiPage" :biz-page-data="bizPageData" :page-data="pageData"></coop-plan-apti>
        </yu-tab-pane>
        <yu-tab-pane label="项目信息" v-if="partnerType==1" name="coopPlanPro">
            <coop-plan-pro ref="coopPlanProPage" :biz-page-data="bizPageData" :page-data="pageData"></coop-plan-pro>
        </yu-tab-pane>
        <yu-tab-pane label="征信信息" name="coopCredit">
            <coop-credit :biz-page-data="bizPageData"></coop-credit>
        </yu-tab-pane>
        <yu-tab-pane label="预警信息" name="coopWarn">
            <coop-warn ref="coopWarn" :biz-page-data="bizPageData" :page-data="pageData"></coop-warn>
        </yu-tab-pane>
        <yu-tab-pane label="影像信息" name="coopImageList" v-if="partnerType==1||partnerType==2||partnerType==3||partnerType==4||partnerType==5||partnerType==8||partnerType==11">
          <coopImageList ref="coopImageList"></coopImageList>
        </yu-tab-pane>
        <yu-tab-pane label="审批历史" name="coopApproval" v-if="showApproval">
            <coop-approval :params="param"></coop-approval>
        </yu-tab-pane>
        <yu-tab-pane label="合作方准入审批批复" name="coopReplyAppDetail" v-if="showCoopReplyAppDetail">
            <coop-reply-app-detail ref="coopReplyAppDetailPage" :biz-page-data="bizPageData" :page-data="pageData"></coop-reply-app-detail>
        </yu-tab-pane>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="showBtn">
          <yu-button type="primary" @click="onSave" v-if="operate!='details'">暂存</yu-button>
          <yu-button type="primary" @click="onCommit" v-if="operate!='details'">提交</yu-button>
          <yu-button type="primary" @click="onBack" >返回</yu-button>
        </yu-form-buttons>
      </yu-tabs>
    </yu-col>
  </yu-row>
  <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
 </div>
</template>
<script>
import coopPlanApp from './cooPlanAppInfoIndex';
import coopPlanApti from '../coopPlanApti/coopPlanAptiListIndex';
import coopPlanPro from '../coopPlanPro/coopPlanProListIndex';
import coopCredit from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import coopWarn from '../coopWarn/coopWarnIndex';
import coopReport from '../coopReport/coopReportIndex';
import coopImageList from './coopImageList';
import coopApproval from '../coopApproval/coopApprovalIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import coopReplyAppDetail from '../coopReplyApp/coopReplyAppDetail';

export default {
  components: { coopPlanApp, coopPlanApti, coopPlanPro, coopCredit, coopWarn, coopReport, coopImageList, coopApproval, yufpNwfInit, coopReplyAppDetail},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      color: [],
      activeIndex: 1,
      activeName: 'cooPlanApp',
      bizType: '',
      operate: '',
      param: {},
      partnerType: '',
      pageData: null,
      showBtn: true,
      showApproval: true,
      pkField: 'serno',
      dataUrl: this.$backend.cmisBiz + '/api/coopplanapp/queryDetail',
      imageBizParam: [
        {
          'top_outsystem_code': '',
          // 'outsystem_code': 'ZX_HXD0101',
          'index': {
            // 'docid': this.pageParams.serno,
            // [{"index":{"docid":"3aba9f1030d44fbfadeee91b48041731"},"top_outsystem_code":"HLWYX","outsystem_code":"HLWYX"}]
            // 'scanid': ''
            'contid': '',
            'businessid': 'XD00234997'
            // 'custname': this.pageParams.cusName,
            // 'custname': this.getFactory().contextData.cusName,
            // 'cardno': this.pageParams.cusName,
            // 'cardno': this.getFactory().contextData.cusName,
            // 'custphone': ''
          }
        }
      ],
      showCoopReplyAppDetail: false
    };
  },


  created () {
    const _this = this;
    const bizPageData = _this.bizPageData || {};
    const instanceInfo = bizPageData.instanceInfo;
    // 如果流程实例存在，则说明是从流程中打开的页面
    if (instanceInfo) {
      // 获取在贷审会会办是是否已结束
      var isEndDshMeet = this.getIsEndDshMeet(instanceInfo.bizId);
      _this.queryData(instanceInfo.bizId);
      _this.showBtn = false;
      _this.showApproval = false;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      for (let i = 0; i < dutys.length; i++) {
        // 如果是贷审会秘书岗或者总行行长 七种合作方类型需要进行合作方准入审批批复
        if ((dutys[i].code == 'XDB07' || dutys[i].code == 'ZHT15') && isEndDshMeet) {
          if (this.param.partnerType == '2' || this.param.partnerType == '4' || this.param.partnerType == '8' || this.param.partnerType == '1' || this.param.partnerType == '3' || this.param.partnerType == '5' || this.param.partnerType == '15') {
            this.showCoopReplyAppDetail = true;
          }
        }
      }
    } else {
      this.param = this.$route.meta.params;
      this.operate = this.param.op;
      this.partnerType = this.param.partnerType;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      var isEndDshMeet = this.getIsEndDshMeet(this.param.serno);      
      for (let i = 0; i < dutys.length; i++) {
        // 如果是贷审会秘书岗或者总行行长 七种合作方类型需要进行合作方准入审批批复
        if ((dutys[i].code == 'XDB07' || dutys[i].code == 'ZHT15') && isEndDshMeet) {
          if (this.param.partnerType == '2' || this.param.partnerType == '4' || this.param.partnerType == '8' || this.param.partnerType == '1' || this.param.partnerType == '3' || this.param.partnerType == '5' || this.param.partnerType == '15') {
            this.showCoopReplyAppDetail = true;
          }
        }
      }
    }
    // if (this.partnerType == 1) {
    //   this.imageBizParam[0].top_outsystem_code = 'LPHZYX';
    //   this.imageBizParam[0].index.contid = this.param.serno;
    // } else if (this.partnerType == 2) {
    //   this.imageBizParam[0].top_outsystem_code = 'DBGSSXZL';
    //   this.imageBizParam[0].index.businessid = this.param.serno;
    // } else{
    //   this.imageBizParam[0].top_outsystem_code = 'DBGSSXZL';
    //   this.imageBizParam[0].index.businessid = this.param.serno;
    // }
  },
  methods: {
    handleClick4Refresh () {
      this.$refs.coopPlanAppPage.changeTotlCoopLmtAmt();
      this.$refs.coopPlanAppPage.changeTotlCoopLmtAmtUsed();
      this.$refs.coopImageList.refreshTable();
    },
    /**
     * 如果是流程审批进入页面则根据流水号去查询数据
     */
    queryData (serno) {
      const _this = this;
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/coopplanapp/queryDetail',
        data: {condition: JSON.stringify({serno: serno})},
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.pageData = {};
            _this.pageData = response.data[0];
            _this.pageData.operate = 'details';
            _this.param = response.data[0];
            _this.operate = 'details';
            _this.partnerType = _this.pageData.partnerType;
          } else {
            this.$xutils.showMsgBox('提示', '数据异常', 400, 300);
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
        }
      });
    },
    /**
     * 保存
     */
    onSave () {
      const _this = this;
      // this.$refs.coopPlanAppPage.saveData().then(res => {
      //   if (res.code == '0') {
      //     _this.$xutils.showMsgBox('提示', '保存成功');
      //   }
      // });
      this.$refs.coopPlanAppPage.saveTempData().then(res => {
        if (res.code == '0') {
          _this.$xutils.showMsgBox('提示', '保存成功');
        }
      });
    },
    /**
     * 提交
     */
    onCommit () {
      const _this = this;
      const result = _this.$refs.coopPlanAppPage.validate();
      let result1 = true;
      let result2 = true;
      if (_this.partnerType != 13) {
        result1 = _this.$refs.coopPlanAptiPage.validate();
      }
      if (_this.partnerType == 1) {
        result2 = _this.$refs.coopPlanProPage.validate();
      }

      if (!result) {
        _this.$xutils.showMsgBox('提示', '请检查合作方信息是否完善');
        return false;
      }

      if (!result1) {
        _this.$xutils.showMsgBox('提示', '请添加资质信息');
        return false;
      }

      if (!result2) {
        _this.$xutils.showMsgBox('提示', '请添加项目信息');
        return false;
      }
      if (_this.partnerType != 13) {
        let aptiLice = _this.$refs.coopPlanAptiPage.$refs.d1_BillList.$refs.refTable.tabledata;
        for (let i = 0; i < aptiLice.length; i++) {
          let aptiLiceEndDate = aptiLice[i].aptiLiceEndDate;
          const date = this.$xutils.getDefaultformulaData('$CURRDATE');
          if (aptiLiceEndDate < date) {
            this.$xutils.showMsgBox('提示', '资质证书【' + aptiLice[i].liceName + '】已到期，请先更新资质信息');
            return false;
          }
        }
      }
      if (_this.$refs.coopPlanAppPage.d1_B_B_A_BillCard) {
        var totlCoopLmtAmt = _this.$refs.coopPlanAppPage.d1_B_B_A_BillCard.formdata.totlCoopLmtAmt;// 总合作额度(元)
        var commonGrtLmtAmt = _this.$refs.coopPlanAppPage.d1_B_B_A_BillCard.formdata.commonGrtLmtAmt;// 一般担保额度(元)
        var singleCoopQuota = _this.$refs.coopPlanAppPage.d1_B_B_A_BillCard.formdata.singleCoopQuota;// 单户合作限额(元)
        var sigBusiCoopQuota = _this.$refs.coopPlanAppPage.d1_B_B_A_BillCard.formdata.sigBusiCoopQuota;// 单笔业务合作限额(元)
        if (_this.partnerType != 1) {          
          // 房地产合作方应去掉该拦截
          if (totlCoopLmtAmt && commonGrtLmtAmt && parseFloat(totlCoopLmtAmt) < parseFloat(commonGrtLmtAmt)) {
            _this.$xutils.showMsgBox('提示', '总合作额度不能小于一般担保额度');
            return false;
          }
          if (_this.partnerType != 5) {
             if (commonGrtLmtAmt && singleCoopQuota && parseFloat(commonGrtLmtAmt) < parseFloat(singleCoopQuota)) {
                _this.$xutils.showMsgBox('提示', '一般担保额度不能小于单户合作限额');
                return false;
              }
          }         
          if (singleCoopQuota && sigBusiCoopQuota && parseFloat(singleCoopQuota) < parseFloat(sigBusiCoopQuota)) {
            _this.$xutils.showMsgBox('提示', '单户合作限额不能小于单笔业务合作限额');
            return false;
          }
          if (singleCoopQuota && totlCoopLmtAmt && parseFloat(totlCoopLmtAmt) < parseFloat(singleCoopQuota)) {
            _this.$xutils.showMsgBox('提示', '单户合作限额必须小于等于总和作额度');
            return false;
          }
        }        
      }

      if (_this.$refs.coopPlanApp && _this.$refs.coopPlanApp.d1_B_B_B_A_BillCard && _this.$refs.coopPlanApp.d1_BillCard) {
        var partnerNo = _this.$refs.coopPlanApp.d1_BillCard.formdata.partnerNo;// 合作方编号
        var bailAccCusNo = _this.$refs.coopPlanApp.d1_B_B_B_A_BillCard.formdata.bailAccCusNo;// 保证金账号客户号
        if (partnerNo != bailAccCusNo) {
          _this.$xutils.showMsgBox('提示', '只能提交合作方自身对公账户开的保证金账号');
          return false;
        }
      }

      const partnerType = _this.$refs.coopPlanAppPage.getPartnerType();
      // if(partnerType == '2'){
      //   var bailAccNo = _this.$refs.coopPlanAppPage.d1_B_B_B_A_BillCard.formdata.bailAccNo;//保证金账号
      //   var bailAccNoSubSeq = _this.$refs.coopPlanAppPage.d1_B_B_B_A_BillCard.formdata.bailAccNoSubSeq;//保证金账号子序号
      //   var bailAccNoAmt = _this.$refs.coopPlanAppPage.d1_B_B_B_A_BillCard.formdata.bailAccNoAmt;//当前保证金金额(元)
      //   if(!(bailAccNo && bailAccNoSubSeq && bailAccNoAmt)){
      //     _this.$xutils.showMsgBox('提示', '<专业担保公司>必须录入保证金账号、保证金账号子序号、当前保证金金额(元)信息！');
      //     return;
      //   }
      // }

      const loginUser = _this.$xutils.getLoginUserInfo();
      // orgType 0 总行部门 其他是分支机构
      // oprType 1新增准入申请 2变更准入申请
      const orgType = loginUser.org.orgType || '0';
      // 获取发起人岗位
      let duty = '';
      if(loginUser.dutys){
          loginUser.dutys.forEach(item => {
            if (item.code == 'SGH01' || (item.code == 'DHH01')) { duty = item.code }
          });
      }
      if (orgType == '') {
        _this.$xutils.showMsgBox('提示', '机构类型未添加(总行/支行),请联系管理员');
        return false;
      }
      let bizType = '';
      if (_this.param.oprType == '1' && orgType == 0) {
        // HZ001   总行部门-新增
        bizType = 'HZ003';
      } else if (_this.param.oprType == '1' && orgType != 0 && orgType != 'A') {
        // HZ003 分支机构-新增
        bizType = 'HZ001';
      } else if (_this.param.oprType == '2' && orgType == 0) {
        // HZ004 总行部门-变更
        bizType = 'HZ004';
      } else if (_this.param.oprType == '2' && orgType != 0 && orgType != 'A') {
        bizType = 'HZ002';
        // HZ002 分支机构-变更
      }
      if (_this.param.oprType == '1' && loginUser.orgCode.substring(0, 2) == '80' && orgType == 'A' && duty != 'SGH01') {
        // 寿光村镇(普惠金融部)-准入
        bizType = 'SGB08';
      } else if (_this.param.oprType == '1' && loginUser.orgCode.substring(0, 2) == '80' && orgType == 'A' && duty == 'SGH01') {
        // 寿光村镇(分支机构)-准入
        bizType = 'SGB01';
      } else if (_this.param.oprType == '2' && loginUser.orgCode.substring(0, 2) == '80' && orgType == 'A' && duty != 'SGH01') {
        // 寿光村镇(普惠金融部)-变更
        bizType = 'SGB09';
      } else if (_this.param.oprType == '2' && loginUser.orgCode.substring(0, 2) == '80' && orgType == 'A' && duty == 'SGH01') {
        // 寿光村镇(分支机构)-变更
        bizType = 'SGB02'; 
      } else if (_this.param.oprType == '1' && loginUser.orgCode.substring(0, 2) == '81' && orgType == 'A' && duty != 'DHH01') {
        // 东海村镇(普惠金融部)-准入
        bizType = 'DHB08';
      } else if (_this.param.oprType == '1' && loginUser.orgCode.substring(0, 2) == '81' && orgType == 'A' && duty == 'DHH01') {
        // 东海村镇(分支机构)-准入
        bizType = 'DHB01';
      } else if (_this.param.oprType == '2' && loginUser.orgCode.substring(0, 2) == '81' && orgType == 'A' && duty != 'DHH01') {
        // 东海村镇(普惠金融部)-变更
        bizType = 'DHB09';
      } else if (_this.param.oprType == '2' && loginUser.orgCode.substring(0, 2) == '81' && orgType == 'A' && duty == 'DHH01') {
        // 东海村镇(分支机构)-变更
        bizType = 'DHB02';
      } 

      
      const apprStatus = _this.$refs.coopPlanAppPage.getApprStatus();
      // 项目类型
      var proType = '';
      if (_this.partnerType == '1') {
        var coopPlanProArray = _this.$refs.coopPlanProPage.getTableData();
        this.proType = coopPlanProArray[0].proType;
      }   
      //1、保存数据2、初始化批复3、提交流程
      _this.$refs.coopPlanAppPage.saveData().then(res => {
      if (res.code == '0') {
        //数据保存成功后初始化批复信息
          let coopReplyApp = {};
          coopReplyApp.serno = this.param.serno;
          // 插入批复信息成功标识
          let insertReplyAppIsSuccess = true;
          _this.$xutils.request({
            url: this.$backend.cmisBiz + '/api/coopreplyapp/insertReplyApp',
            data: JSON.stringify(coopReplyApp),
            type: 'POST',
            async: false,
            success: (response, status, xhr) => {
              if (response.code == 0) {

              } else {
                insertReplyAppIsSuccess = false;
                this.$message({ message: '初始化批复信息失败,请联系系统管理员！', type: 'error' });
                return false;
              }
            },
            error: (result, b) => {
              insertReplyAppIsSuccess = false;
              this.$message({ message: '初始化批复信息失败,请联系系统管理员！', type: 'error' });
              return false;
            }
          });    
          if (!insertReplyAppIsSuccess) {
            return false;
          }
          // 提交流程
          let startdto = {};
          startdto.systemId = 'dscms';
          startdto.orgId = loginUser.orgCode;
          startdto.userId = loginUser.loginCode;
          startdto.bizType = bizType;
          startdto.bizId = _this.param.serno;
          startdto.bizUserName = _this.param.partnerName;
          startdto.bizUserId = _this.param.partnerNo;          
          startdto.param = {
            orgType: orgType,
            partnerType: partnerType,
            apprStatus: apprStatus,
            proType: this.proType
          };
          if (bizType == 'SGB01' || bizType == 'SGB02') {
            startdto.param.submitNodeId = '711_3';
            startdto.param.submitUserId = loginUser.loginCode;
          } else if (bizType == 'DHB01' || bizType == 'DHB02') {
            startdto.param.submitNodeId = '728_3';
            startdto.param.submitUserId = loginUser.loginCode;
          }         
          _this.$refs.yufpNwfInit.wfInit(startdto);
        }
      });
    },
    /**
     * 关闭当前页面
     */
    onBack () {
      yufp.frame.removeTab(this.$route.path);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      yufp.frame.removeTab(this.$route.path);
    },
    /**
     * 获取在贷审会会办是是否已结束
     */
    getIsEndDshMeet (serno) {      
      const _this = this;
      var resultData = false;
      _this.dataUrl = this.$backend.workflowService + '/api/core/getAllCommentsByBizId/';
      _this.$xutils.request({
        url: _this.dataUrl,
        data: {
          bizId: serno
        },
        type: 'GET',
        async: false,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.refTableData = response.data;
            if (response.data != null && response.data.length > 0) {
              var len = response.data.length;
              for (var i = 0; i < len; i++) {
                if (response.data[i].nodeId == '305_44' || response.data[i].nodeId == '306_38') {
                  resultData = true;
                  break;
                }                               
              }
            }
          }
        }
      });
      return resultData;
    }
  }
};
</script>
<style>

</style>
