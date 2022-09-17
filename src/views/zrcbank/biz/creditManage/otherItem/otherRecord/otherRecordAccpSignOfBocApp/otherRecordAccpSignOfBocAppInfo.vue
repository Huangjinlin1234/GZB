
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 中行代签电票申请
  -->
  <div class="tab-search">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="申请信息" name="OtherRecordAccpSignOfBocAppInfo">
          <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="审批表编号" disabled name="serno"></yu-xform-item>
              <yu-xform-item label="申请日期" disabled name="inputDate"></yu-xform-item>
              <yu-xform-item label="客户经理" disabled name="managerId"></yu-xform-item>
              <yu-xform-item label="分支机构" disabled name="managerBrId"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="中行代签电票申请信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId" colspan="24" rules="required" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" colspan="24" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="签发金额" placeholder="签发金额" ctype="input" name="issAmt" colspan="24" rules="required"></yu-xform-item>
              <yu-xform-item label="签发期限" placeholder="签发期限" ctype="radio" name="issTerm" data-code="STD_ISS_TERM" colspan="24" rules="required"></yu-xform-item>
              <yu-xform-item label="质押方式" placeholder="质押方式" ctype="radio" name="imnType" data-code="STD_IMN_TYPE" colspan="24" rules="required"></yu-xform-item>
              <yu-xform-item label="质押方式对应存款利率(%)" placeholder="质押方式对应存款利率(%)" ctype="input" name="imnRate" colspan="24" rules="required"></yu-xform-item>
              <yu-xform-item label="划转中行保证金金额 (万元)" placeholder="划转中行保证金金额 (万元)" ctype="input" name="bocBailAmt" colspan="24" rules="required"></yu-xform-item>
              <yu-xform-item label="中行保证金存款利率（%）" placeholder="中行保证金存款利率（%）" ctype="input" name="bocBailDepRate" colspan="24" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-tab-pane>
        <yu-tab-pane label="影像材料" name="photoTab">
          <imageSystem v-if="show_img" authority="import;download" :s="1" :para="imageBizParam"></imageSystem>
        </yu-tab-pane>
        <yu-tab-pane label="中行代签电票申请" name="approveTab">
          <iframe :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
        </yu-tab-pane>
        <yu-tab-pane label="审批历史" name="replyHistory">
          <coopApprovalIndex v-if="showReply" :children="dataParams"></coopApprovalIndex>
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
import { clone, lookup, dateFormat } from '@/utils';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import coopApprovalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
yufp.lookup.reg('STD_ISS_TERM,STD_IMN_TYPE');

import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: { YufpDemoSelector, imageSystem, yufpNwfInit, coopApprovalIndex },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
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
      showReply: false,
      dataParams: {},
      activeName: 'OtherRecordAccpSignOfBocAppInfo'
    };
  },
  // 获取登录用户信息
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'userCode', 'userInfo'])
  },
  mounted () {
    console.log('===============bizPageData', this.bizPageData);
    // 判断是否为流程审批页面的打开
    if (this.bizPageData) {
      this.initPageData(this.bizPageData.instanceInfo.bizId).then((res) => {
        console.log('========================res', res);
        this.initPage(res);
      });
    } else {
      this.initPage();
    }
  },
  methods: {
    initPage (res) {
      var _this = this;
      var params;
      if (res) {
        params = res[0];
        this.viewType = 'DETAIL';
      } else if (this.pageParams) {
        params = this.pageParams[0];
        this.viewType = this.pageParams.op;
      } else if (this.$route.meta.params){
        params = this.$route.meta.params.data;
      }
      this.dataParams = params;
      if (this.viewType === 'DETAIL') {
        clone(params, this.formdata);
        this.formDisabled = true;
        this.saveBtnShow = false;
        this.submitBtnShow = false;
      }
      if (this.viewType === 'EDIT') {
        clone(params, this.formdata);
      }
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
      this.printUrl = _this.$backend.frptRptService + 'qtsx-zhdqdpsp.cpt&serno=' + _this.formdata.serno;
      var params = _this.formdata
      this.imageBizParam = [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'XXD_QTSXSQ',
          outsystem_code:"XXD_QTSXSQ0801",
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
      this.show_img = false;
      this.showReply = false;
      this.$nextTick(() => {
        this.show_img = true;
        this.showReply = true;
      });
    },
    initPageData (bizId) {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this
          .$request({
            method: 'GET',
            url: backend.cmisBiz + '/api/otherrecordaccpsignofbocapp/',
            data: {
              condition: JSON.stringify({
                serno: bizId,
                oprType: '01',
                approveStatusS: '000,111,990,991,992,993'
              })
            }
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
      const bizType = 'QT009'; // 中行代签电票申请
      const loginUser = _this.$xutils.getLoginUserInfo();

      //机构判断
      var orgType = '';
      orgType = loginUser.org.orgType;

      //金额判断
      var amtType = '';
      var bocBailAmt = _this.formdata.bocBailAmt;
      console.log(bocBailAmt);
      if(bocBailAmt > 10000000){
        amtType = 'Y';
      }else{
        amtType = 'N';
      }

      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;

      if('1' == orgType){
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
          startdto.param = {orgType: orgType, amtType: isOver};
          console.log('业务类型--->', startdto.bizType);
          _this.$refs.yufpNwfInit.wfInit(startdto);
          },
          true,
          true
        );    
      }else {
        startdto.param = {orgType: orgType, amtType: amtType};
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

      var issTerm = _this.formdata.issTerm.toString();
      _this.formdata.issTerm = issTerm;

      var imnType = _this.formdata.imnType.toString();
      _this.formdata.imnType = imnType;

      console.log(_this.formdata.drftTerm);

      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignofbocapp/`,
        data: _this.formdata
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success' });
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
          _this.$message({ message: '数据新增失败！', type: 'error' });
        }
      });
    },

    editSaveFn: function (actionType) {
      var _this = this;
      var validate = false;

      var issTerm = _this.formdata.issTerm.toString();
      _this.formdata.issTerm = issTerm;

      var imnType = _this.formdata.imnType.toString();
      _this.formdata.imnType = imnType;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/otherrecordaccpsignofbocapp/update`,
        data: _this.formdata
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$message({ message: '数据修改成功！', type: 'success' });
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
          _this.$message({ message: '数据修改失败！', type: 'error' });
        }
      });
    }
  }
};
</script>
