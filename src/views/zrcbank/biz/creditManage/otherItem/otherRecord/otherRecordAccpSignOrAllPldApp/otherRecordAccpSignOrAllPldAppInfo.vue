
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 银票签发及全资质押类业务
  -->
  <div class="tab-search">
    <yu-xform ref="refForm" label-width="160px" v-model="formdata" :disabled="formDisabled">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="申请信息" name="otherRecordAccpSignOrAllPldAppInfo">
        <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group column="2">
                <yu-xform-item label="审批表编号"  disabled name="serno"></yu-xform-item>
                <yu-xform-item label="申请日期"  disabled name="inputDate"></yu-xform-item>
                <yu-xform-item label="客户经理"  disabled name="managerId"></yu-xform-item>
                <yu-xform-item label="分支机构"  disabled name="managerBrId"></yu-xform-item>
                 <yu-xform-item label="客户编号" ctype="yu-XcusBase" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','certType':'certType','certCode':'certCode'}" width="900" height="900" :parms="{'cusState':'2'}" ></yu-xform-item>
                 <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled ></yu-xform-item>
              <!--   <yu-xform-item label="客户编号" rules="required" placeholder="客户编号" ctype="input" name="cusId" @click="goCustomer" @click.stop icon="search" ></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" disabled></yu-xform-item> -->
                <yu-xform-item label="评级" placeholder="评级" ctype="select" name="cusCrdGrade" data-code="STD_ZB_GRADE_RANK" disabled></yu-xform-item>
            </yu-xform-group>
        </yu-panel>
        <yu-panel title="银票签发业务填写以下内容" :hideFilter="false" :collapseHide="false">
              <yu-xform-group column="2">
                <yu-xform-item label="拟签发起始日" placeholder="拟签发起始日" ctype="datepicker" name="planIssStartDate"></yu-xform-item>
                <yu-xform-item label="票据期限(天)" placeholder="票据期限" ctype="input" name="drftTerm"></yu-xform-item>
                <yu-xform-item label="票据类型" placeholder="票据类型" ctype="select" name="pldDrftType" data-code="STD_PLD_DRFT_TYPE"></yu-xform-item>
                <yu-xform-item label="申请签发金额（万元）" placeholder="申请签发金额（万元）" :formatter="formatter" :digit="6" type="num" name="appIssAmt"></yu-xform-item>
                <yu-xform-item label="业务类型" placeholder="业务类型" ctype="select" name="bizType" data-code="STD_BIZ_TYPE"></yu-xform-item>
                <yu-xform-item label="担保方式或质押类型" placeholder="担保方式或质押类型" ctype="select" name="guarImnType" data-code="STD_GUAR_IMN_TYPE"></yu-xform-item>
                <yu-xform-item label="保证金比例" placeholder="保证金比例" ctype="input" name="bailRate"></yu-xform-item>
                <yu-xform-item label="利率值" placeholder="利率值" ctype="input" name="rate"></yu-xform-item>
                <yu-xform-item label="上浮比例" placeholder="上浮比例" ctype="input" name="upRate"></yu-xform-item>
            </yu-xform-group>
        </yu-panel>
        <yu-panel title="全资质押类贷款业务填写以下内容" :hideFilter="false" :collapseHide="false">
              <yu-xform-group column="2">
                <yu-xform-item label="贷款金额（万元）" placeholder="贷款金额（万元）" :formatter="formatter" :digit="6" type="num" name="loanAmt"></yu-xform-item>
                <yu-xform-item label="贷款利率" placeholder="贷款利率" ctype="input" name="loanRate"></yu-xform-item>
                <yu-xform-item label="贷款期限" placeholder="贷款期限" ctype="input" name="loanTerm" data-code="STD_RATE_LOAN_TERM"></yu-xform-item>
                <yu-xform-item label="业务类型" placeholder="业务类型" ctype="select" name="bizQzType" data-code="STD_BIZ_TYPE"></yu-xform-item>
                <yu-xform-item label="质押类型" placeholder="质押类型" ctype="select" name="guarType" data-code="STD_GUAR_IMN_TYPE"></yu-xform-item>
                <yu-xform-item label="提供质押存单、结构性存款金额" placeholder="提供质押存单、结构性存款金额" ctype="input" name="imnStrDepAmt"></yu-xform-item>
                <yu-xform-item label="存单、结构性存款期限（月）" placeholder="存单、结构性存款期限" ctype="input" name="depositStrDepTerm"></yu-xform-item>
                <yu-xform-item label="利率值" placeholder="利率值" ctype="input" name="qzRate"></yu-xform-item>
                <yu-xform-item label="上浮比例" placeholder="上浮比例" ctype="input" name="qzUpRate"></yu-xform-item>
                <yu-xform-item label="申请理由" ctype="textarea" name="branchAppResn" rows="3"  placeholder="2000个字符以内"></yu-xform-item>
            </yu-xform-group>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像材料" name="photoTab">
        <imageSystem v-if="showImg" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="银票签发及全资质押类业务申请表" name="approveTab">
        <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史" name="replyHistory">
      <coopApprovalIndex v-if="showReply" :children="children"></coopApprovalIndex>
    </yu-tab-pane>
    </yu-tabs>
    </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
import {clone, lookup, dateFormat} from '@/utils';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
yufp.lookup.reg('STD_ZB_GRADE_RANK,STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_CUS_LIST_STATUS');


import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { YufpDemoSelector, imageSystem, yufpNwfInit, coopApprovalIndex },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      formdata: {},
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
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      submitBtnShow: true,
      activeName: 'otherRecordAccpSignOrAllPldAppInfo',
      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0].split('').reverse();
        var r = money.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      },
      showReply: false,
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
    console.log('bizPageData===>', this.bizPageData);
    // 判断是否为流程审批页面的打开
    if (this.bizPageData.instanceInfo) {
      this.initPageData(this.bizPageData).then(retVal => {
        console.log('retVal====>', retVal);
        // this.pageParams = retVal;
        this.initPage(retVal);
      });
    } else {
      this.initPage();
    }
  },
  methods: {
    initPage: function (retVal) {
      if (retVal) {
        this.pageParams = retVal[0];
        this.pageParams.op = 'DETAIL';
      } else if(this.$route.meta.params){
        this.pageParams = this.$route.meta.params.data;
        this.pageParams.op = this.$route.meta.params.op;
      }
      var _this = this;
      var params;
      try {
        this.viewType = this.pageParams.op;
      } catch (e) {
        this.viewType = 'DETAIL';
      }

       console.log('--->', this.viewType);
      if (this.viewType === 'DETAIL') {
        yufp.clone(this.pageParams, this.formdata);
        console.log('this.pageParams===>', this.pageParams);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      }
      if (this.viewType === 'EDIT') {
        yufp.clone(this.pageParams, this.formdata); 
        this.formDisabled = false;
        this.saveBtnShow = true;
        this.submitBtnShow = true;
      }

      // 非空判断
      if (this.formdata.appIssAmt) {
        this.formdata.appIssAmt = parseFloat(this.formdata.appIssAmt / 10000).toFixed(6);
      }
      if (this.formdata.loanAmt) {
        this.formdata.loanAmt = parseFloat(this.formdata.loanAmt / 10000).toFixed(6);
      }
      console.log('this.formdata ===> ', this.formdata);

      if (this.viewType === 'ADD') {
        const serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');
        _this.formdata.serno = serno;
        _this.formdata.managerId = _this.userCode;
        _this.formdata.managerIdName = _this.userName;
        _this.formdata.managerBrId = _this.org.code;
        _this.formdata.managerBrIdName = _this.org.name;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputIdName = _this.userName;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.inputDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.createTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
        _this.formdata.updDate = this.$xutils.dateFormat(
          'yyyy-MM-dd',
          new Date()
        );
        _this.formdata.updateTime = this.$xutils.dateFormat(
          'yyyy-MM-dd hh:mm:ss',
          new Date()
        );
      }
      this.printUrl = _this.$backend.frptRptService + 'qtsx-ypqfjqzzylywba.cpt&serno=' + _this.formdata.serno;

      params = this.pageParams;
      this.imageBizParam = [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'XXD_QTSXSQ',
          outsystem_code:"XXD_QTSXSQ0601",
          index: {
            businessid: params.serno,
            custtype: params.curType,
            custconductid: params.inputId,
            custconductname: params.inputIdName,
            orgid: params.inputBrId,
            orgname: params.inputBrIdName,
            opername: params.updIdName,
            custid: params.cusId,
            custname: params.cusName,
            custconduct: '',
            operid: '',
            maintaindate: '',
            contid: "",
            billno: ""
          }
        }
      ];
      this.showImg = false;
      this.showReply = false;
      this.$nextTick(() => {
        this.showImg = true;
        this.showReply = true;
      });
    },

    initPageData: function (pageData) {
      let _this = this;
      let instanceInfo = pageData.instanceInfo;
      let bizId = instanceInfo.bizId;
      return new Promise((resolve, reject) => {
        _this
          .$request({
            method: 'GET',
            url: backend.cmisBiz + '/api/otherrecordaccpsignorallpldapp/',
            data: {condition: JSON.stringify({serno: bizId})}
          })
          .then((data) => {
            resolve(data.data);
          });
      });
    },

    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    // 客户选取
    goCustomer () {
      var _this = this;
      if (!_this.saveBtnShow) {
        return;
      }
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/bussinessInformation/selectCusDialog',
        -1,
        -1,
        dialogData,
        (retVal) => {
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;

          _this.$request({
            method: 'POST',
            url: `${backend.cmisCus}/api/cuscomgrade/selectGradeInfoByCusId`,
            data: retVal.cusId
          }).then(({ code, message, data }) => {
            if (code == '0') {
              console.log('========>', data);
              _this.formdata.cusCrdGrade = data.finalRank;
            } else {
              _this.$message({ message: '请求失败！', type: 'error' });
            }
          });
        }
      );
    },

    /**
     * 提交按钮
     */
    submitFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SUBMIT');
      } else {
        this.editSaveFn('SUBMIT');
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      var isOver = null;
      var dialogData = {};
      const bizType = 'QT007'; // 银票签发及全资质押类业务备案
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;

      if('1' == loginUser.org.orgType){
        _this.$dialog.open(
          '',
          'zrcbank/biz/creditManage/otherItem/discApply/otherBailDepPreferRateApp/otherBailDepPreferRateAppAdd/OtherBailDepPreferRateAppSelectDialog',
          900,
          650,
          dialogData,
          (retVal) => {
            isOver = retVal;
            if(isOver != "1" && isOver != "0"){
            _this.$message({
              message: '请选择是否保证金超过1000万',
              type: 'warning'
            });
            return;
          }
          if(isOver == "1"){
            isOver = "Y";
          }else{
            isOver = "N";
          }
          startdto.param = {orgType: loginUser.org.orgType, amtType: isOver};
          console.log('业务类型--->', startdto.bizType);
          _this.$refs.yufpNwfInit.wfInit(startdto);
          },
          true,
          true
        );    
    }else {
      startdto.param = {orgType: loginUser.org.orgType, amtType: "N"};
      console.log('业务类型--->', startdto.bizType);
      _this.$refs.yufpNwfInit.wfInit(startdto);
    }  
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },

    /**
     * 返回
     */
    cancelFn: function () {
      var _this = this;
      this.$dialog.close(this.dialogId);
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn('SAVE');
      } else {
        this.editSaveFn('SAVE');
      }
    },

    addSaveFn: function (actionType) {
      var _this = this;

      _this.formdata.oprType = '01';
      _this.formdata.approveStatus = '000';

      console.log(_this.formdata.drftTerm);
      // 非空判断
      if (_this.formdata.drftTerm) {
        if (parseFloat(_this.formdata.drftTerm) > 365) {
          this.$message({
            duration: 4000,
            message: '票据期限(天)不可大于365！',
            type: 'warning'
          });
          _this.formdata.drftTerm = '';
          return;
        }
      }

      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {};
      yufp.clone(_this.formdata, model);
      model.appIssAmt = parseFloat(model.appIssAmt * 10000).toFixed(2);
      model.loanAmt = parseFloat(model.loanAmt * 10000).toFixed(2);
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignorallpldapp/`,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success'});
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },

    editSaveFn: function (actionType) {
      var _this = this;
      // 非空判断
      if (_this.formdata.drftTerm) {
        if (parseFloat(_this.formdata.drftTerm) > 365) {
          this.$message({
            duration: 4000,
            message: '票据期限(天)不可大于365！',
            type: 'warning'
          });
          _this.formdata.drftTerm = '';
          return;
        }
      }
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var model = {};
      yufp.clone(_this.formdata, model);
      model.appIssAmt = parseFloat(model.appIssAmt * 10000).toFixed(2);
      model.loanAmt = parseFloat(model.loanAmt * 10000).toFixed(2);
      console.log('===========>>', model);
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignorallpldapp/update`,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据修改成功！', type: 'success'});
          if (actionType === 'SAVE') {
            this.cancelFn();
          }
          if (actionType == 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno
            };
            this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据修改失败！', type: 'error'});
        }
      });
    }
  }
};
</script>
