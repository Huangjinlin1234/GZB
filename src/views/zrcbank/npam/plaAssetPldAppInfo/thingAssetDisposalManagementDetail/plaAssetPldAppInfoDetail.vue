
<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 以物抵债详情
  -->
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="基本信息" name="base" :key="1">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm1" label-width="120px" v-model="formdata1" style="text-align: center" >
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="papaiSerno" disabled ></yu-xform-item>
              <yu-xform-item label="资产处置方式" ctype="select" name="dispMode" data-code="STD_DISP_MODE"  rules="required" @change="isShowTab" :disabled="viewType =='DETAIL'"></yu-xform-item>
              <yu-xform-item label="抵债资产编号" name="pldimnNo" disabled rules="required" colspan="10"></yu-xform-item>
              <yu-button type="primary" @click="detailView" colspan="2">查看</yu-button>
              <yu-xform-item label="抵债资产名称" name="pldimnName" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" disabled></yu-xform-item>

          <yu-xform-item label="资产管理人" :disabled="viewType == 'DETAIL'" ctype="yu-xuser" name="managerId" rules="required" placeholder="催收责任人" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','userName':'managerIdName','orgName':'managerBrIdName','orgId':'managerBrId'}"></yu-xform-item>
          <yu-xform-item label="管理机构" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="管理机构" name="managerBrIdName" disabled></yu-xform-item>

              <yu-xform-item label="处置报告" name="dispReport" ctype="textarea" :colspan="20" rules="required" :disabled="viewType =='DETAIL'"></yu-xform-item>
              <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="20" :disabled="viewType =='DETAIL'"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputIdName" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" disabled ></yu-xform-item>
              <yu-button-drop :colspan="24">
                <yu-button type="primary" @click="commit" :hidden="viewType =='DETAIL'">提交</yu-button>
                <yu-button type="primary" @click="doSave1" :hidden="viewType =='DETAIL'">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
              </yu-button-drop>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="出租信息" name="second" v-if="selectShow == 'second'" :key="2">
        <yu-panel title="抵债处置出租信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm2" label-width="140px" v-model="formdata2" :disabled="viewType =='DETAIL'">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="papaiSerno" disabled></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号" name="papliSerno" hidden disabled></yu-xform-item> <!--hiden-->
              <yu-xform-item label="抵债物编号" name="pldimnNo"  rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债资产名称" name="pldimnName" disabled></yu-xform-item>
              <yu-xform-item label="抵债物类型" name="pldimnType"   ctype="select" data-code="STD_RESIST_DEBT_TYPE"></yu-xform-item>
              <yu-xform-item label="租金" name="rent" rules="required"></yu-xform-item>
              <yu-xform-item label="首付租金" name="firstpayRent" rules="required" ></yu-xform-item>
              <yu-xform-item label="承租人名称" name="lesseeName" rules="required" ></yu-xform-item>
              <yu-xform-item label="承租人电话" name="lesseePhone"   :rules="lesseePhoneRule"></yu-xform-item>
              <yu-xform-item label="承租人证件类型" name="certType" ctype="select" data-code="IDENT_TYPE" rules="required"></yu-xform-item>
              <yu-xform-item label="承租人证件号码" name="certCode" :rules="certTypeRule"></yu-xform-item>
              <yu-xform-item label="承租人地址" name="lesseeAddr"  ctype="textarea" :colspan="24"></yu-xform-item>
              <yu-xform-item label="起始日期"  name="startDate" ctype="datepicker" rules="required"></yu-xform-item>
              <yu-xform-item label="到期日期" name="endDate"  ctype="datepicker" rules="required"></yu-xform-item>
              <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="24"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" disabled rules="required"></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" disabled  rules="required"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId"  disabled rules="required" ></yu-xform-item>
            </yu-xform-group>
            </yu-xform>
        </yu-panel>
        <yu-panel title="租金收取情况" :hideFilter="false" :collapseHide="false"  >
          <yu-button-drop>
            <yu-button type="primary" @click="doAdd22" :hidden="viewType == 'DETAIL'">新增</yu-button>
            <yu-button type="primary" @click="doDel22" :hidden="viewType == 'DETAIL'">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top: 10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams" >
            <yu-xtable-column align="center" ctype="datepicker" label="收取时间" prop="leaseCollecDate" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center" ctype="select" label="收取方式" prop="leaseCollecMode" data-code="STD_LEASE_COLLEC_MODE" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center" ctype="yu-num" label="收取金额" prop="leaseAmt" :disabled="viewType == 'DETAIL'" maxlength="14" number-formatter="0,000.00"></yu-xtable-column>
            <yu-xtable-column align="center"  label="租金缴纳人名称" ctype="input" prop="cusName" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center"  label="收款账号" ctype="input" prop="pyeeAccno" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
            <yu-xtable-column align="center"  label="备注" ctype="input" prop="memo" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
          </yu-xtable>
          <div style="text-align:center;margin:10px">
            <yu-button type="primary" @click="doSave2" :hidden="viewType == 'DETAIL'">保存</yu-button>
            <yu-button type="primary" @click="doBack">返回</yu-button>
          </div>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="转固信息" name="third" v-if="selectShow == 'third'" :key="3">
        <yu-panel title="抵债处置转固信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm3" label-width="140px" v-model="formdata3" style="text-align: center" :disabled="viewType =='DETAIL'">
            <yu-xform-group>
              <yu-xform-item label="业务流水号"         name="pappciSerno" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号" name="papaiSerno" hidden></yu-xform-item>
              <yu-xform-item label="抵债物编号"       name="pldimnNo"   rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债资产名称 "      name="pldimnName" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债物类型"         name="pldimnType" ctype="select"  data-code="STD_RESIST_DEBT_TYPE" rules="required"></yu-xform-item>
              <yu-xform-item label="转入价值（元）"     name="turnValue" rules="required" ctype="yu-num" maxlength="14" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="评估金额（元）"     name="evalAmt"   rules="required" ctype="yu-num" maxlength="14" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="入账日期"           name="asgnDate"  rules="required" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="处置理由"         name="dispResn"  ctype="textarea" :colspan="24" ></yu-xform-item>
              <yu-xform-item label="备注"               name="memo"      ctype="textarea" :colspan="24" ></yu-xform-item>
              <yu-xform-item label="登记人"             name="inputId"   rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记机构"           name="inputBrId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记日期"           name="inputDate" rules="required" disabled></yu-xform-item>
              <yu-button-drop :colspan="24">
                <yu-button type="primary" @click="doSave3" :hidden="viewType == 'DETAIL'">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
              </yu-button-drop>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="出售信息" name="forth" v-if="selectShow == 'forth'" :key="4">
        <yu-panel title="抵债处置出售信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm4" label-width="140px" v-model="formdata4" style="text-align: center" :disabled="viewType =='DETAIL'">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" name="papsiSerno" rules="required" hidden></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号" name="papaiSerno" hidden></yu-xform-item>
              <yu-xform-item label="抵债资产编号" name="pldimnNo" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="" name="" ctype="custom" ></yu-xform-item>
              <yu-xform-item label="抵债资产名称 "  name="pldimnName"  disabled rules="required"></yu-xform-item>
              <yu-xform-item label="抵债资产类型" name="pldimnType" ctype="select" data-code="STD_RESIST_DEBT_TYPE" rules="required"></yu-xform-item>
              <yu-xform-item label="数量 "  name="qnt" rules="required"></yu-xform-item>
              <yu-xform-item label="" name="" ctype="custom" ></yu-xform-item>
              <yu-xform-item label="抵入金额（元）" name="toEnterAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 评估金额(元)" name="evalAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 出售价格（元）" name="sellAmt" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 出售日期" ctype="datepicker" name="sellDate" rules="required" ></yu-xform-item>
              <yu-xform-item label=" 买受人名称"  name="buyerName" rules="required"></yu-xform-item>
              <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="24"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
              <yu-button-drop :colspan="24">
                <yu-button type="primary" @click="doSave4" :hidden="viewType == 'DETAIL'">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
              </yu-button-drop>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="毁损/灭失信息" name="fifth" v-if="selectShow == 'fifth'" :key="5">
        <yu-panel title="抵债处置毁损/灭失信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm5" label-width="140px" v-model="formdata5" style="text-align: center" :disabled="viewType =='DETAIL'">
            <yu-xform-group>
              <yu-xform-item label="业务流水号"  name="pappmliSerno"  rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债处置业务流水号"  name="papaiSerno" hidden></yu-xform-item>
              <yu-xform-item label="抵债物编号"  name="pldimnNo"  rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债资产名称 "  name="pldimnName"  rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵债物类型" name="pldimnType" ctype="select" data-code="STD_RESIST_DEBT_TYPE" rules="required"></yu-xform-item>
              <yu-xform-item label="抵债资产现状" name="pldimnAssetStatus" ctype="select" data-code="STD_PLDIMN_ASSET_STATUS" ></yu-xform-item>
              <yu-xform-item label="补偿金额" name="compenstateAmt"  rules="required"></yu-xform-item>
              <yu-xform-item label="情况描述" ctype="textarea" name="caseDec" :colspan="20" rules="required"></yu-xform-item>
              <yu-xform-item label="核销金额（元）" name="writeoffAmt" rules="required" :hidden="isShow" placeholder="灭失才显示"></yu-xform-item>
              <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" :hidden="isShow" placeholder="灭失才显示" ></yu-xform-item>
              <yu-xform-item label="核销理由" name="writeoffResn" ctype="textarea" :colspan="20" :hidden="isShow" placeholder="灭失才显示"></yu-xform-item>
              <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="20" ></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
              <yu-button-drop :colspan="24">
                <yu-button type="primary" @click="doSave5"  :hidden="viewType == 'DETAIL'">保存</yu-button>
                <yu-button type="primary" @click="doBack">返回</yu-button>
              </yu-button-drop>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像资料" name="sixth">
          <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史信息" name="seventh">
        <adjustment-judge-his :judge-his-params="childParams"></adjustment-judge-his>
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="doBack"></yufpNwfInit>

  </div>
</template>
<script>
import {validator} from '@/utils/validate';
import imageSystem from '@/views/imageManage/imageSystem';
import AdjustmentJudgeHis from '@/views/zrcbank/biz/creditcardmanage/adjustment/adjustmentjudge/tabs/AdjustmentJudgeHis.vue';
// 注册字典项
yufp.lookup.reg('STD_DISP_MODE,STD_PLDIMN_ASSET_STATUS,STD_RESIST_DEBT_TYPE,STD_PARAMS_CODE,IDENT_TYPE,STD_ZB_CERT_TYP,STD_LEASE_COLLEC_MODE');

export default {
  components: {imageSystem, AdjustmentJudgeHis},
  props: {bizPageData: Object},
  data: function () {
    return {
      radomNumber: '', // 如果页面没业务流水号，自动返显，从此处获取
      papaiSerno: '', // 基本信息业务流水号 = 各tab页抵债处置业务流水号,
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formdata4: {},
      formdata5: {},
      image: '1',
      lesseePhoneRule: [// 电话检验规则
        {required: true, message: '字段不能为空', trigger: 'blur'},
        {validator: validator.mobile}
      ],
      certTypeRule: [
        {required: true, message: '字段不能为空', trigger: 'blur'},
        {validator: validator.IDCard}
      ],
      // isbuttonHidden: false,
      activeName: 'base',
      selectShow: '',
      authDialogVisible: false,
      viewType: '',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ04',
          'index': {
            'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.papaiSerno
          }
        }
      ],

      dataUrl: backend.cmisNpam + '/api/plaassetpldleaseamtinfo/queryamtinfo',
      ifSave: false,
      baseParams: {condition: JSON.stringify({ papaiSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.papaiSerno})}
    };
  },
  created () {
    var _this = this;
    _this.radomNumber = _this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'); // 随机编号
    if (_this.bizPageData != null || _this.bizPageData) {
      _this.papaiSerno = _this.bizPageData.instanceInfo.bizId;
      _this.viewType = 'DETAIL';
    } else {
      _this.papaiSerno = _this.$route.meta.params.papaiSerno;
      _this.viewType = _this.$route.meta.params.viewType;
    }
    if (_this.viewType == 'DETAIL') {
      _this.image = '2';
    }
    // if (_this.viewType == 'SUBMIT') {
    //   this.isbuttonHidden = true;
    // }

    // 基本信息
    yufp.service.request({
      method: 'POST',
      async: false,
      url: backend.cmisNpam + '/api/plaassetpldappinfo/' + _this.papaiSerno,
      callback: function (code, message, response) {
        if (response.code == 0) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.formdata1);
            _this.imageBizParam[0] = {
              'top_outsystem_code': 'XXD_ZCBQ',
              'outsystem_code': 'XXD_ZCBQ04',
              'index': {
                'businessid': this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.papaiSerno,
                /** 客户名称 */
                custname: _this.formdata1.cusName,
                /** 客户号 */
                custid: _this.formdata1.cusId,
                /** 机构名称 */
                orgname: _this.formdata1.inputBrIdName
              }
            };
          });
        } else {
          _this.$message({
            message: response.message,
            type: 'error'
          });
        }
      }
    });
  },
  computed: {
    isShow () {
      if (!this.formdata5.pldimnAssetStatus || this.formdata5.pldimnAssetStatus == '01') {
        return true;
      } else {
        return false;
      }
    },
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.papaiSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  methods: {
    /* tab切换 */
    handleClick (tab) {
      if (tab.name == 'sixth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    /*
     将表格的数据，赋值给表单字段
    */
    commonSelectFn: function (row, mapping) {
      for (let item in mapping) {
        this.formdata1[mapping[item]] = row[item];
      }
    },
    /* 查看抵债资产详情 */
    detailView () {
      var params = {};
      params.guarNo = this.formdata1.pldimnNo;
      // 获取登入信息
      var loginUserInfo = this.$xutils.getLoginUserInfo();
      loginUserInfo.roles.forEach(function (_item, _index) {
        params['SystemNo'] = '01';
        // 如果是小微客户经理
        // SystemNo 请求的系统标识 01-信贷系统  02-小贷系统
        if (_item.code == 'R0010' || _item.code == 'R0030') {
          params['SystemNo'] = '02';
        }
      });
      params['callMethod'] = 'tGuarDetailInfo';
      params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.goToYpSys(params);
    },
    /** 跳转押品系统 */
    goToYpSys (paramDats) {
      paramDats.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      paramDats.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      const url = this.getGuarSysUrl(paramDats);
      window.open(url, '_blank');
    },
    /*  获取跳转押品系统url */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    },

    /* 处置Tab类型控制 */
    isShowTab (val) {
      var _this = this;
      // var papaiSerno = this.$route.meta.params.papaiSerno;
      switch (val) {
      case '01': // 出租信息
        this.selectShow = 'second';
        this.$nextTick(() => {
          yufp.service.request({
            method: 'POST',
            async: false,
            url: backend.cmisNpam + '/api/plaassetpldleaseinfo/querybypapaiserno',
            data: _this.papaiSerno,
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (response.data == null) {
                  _this.formdata2.papliSerno = _this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'); // 抵债资产编号            公共
                  _this.formdata2.pldimnNo = _this.formdata1.pldimnNo; // 抵债资产编号            公共
                  _this.formdata2.papaiSerno = _this.formdata1.papaiSerno; // 抵债处置业务流水号   公共
                  _this.formdata2.pldimnName = _this.formdata1.pldimnName; // 抵债资产名称
                  // _this.formdata2.papaiSerno = _this.formdata1.papaiSerno; //自动返显流水号pldimnName
                  _this.formdata2.inputId = _this.$xutils.getDefaultformulaData('$LoginUserName');
                  _this.formdata2.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgName');
                  _this.formdata2.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
                  return;
                }
                yufp.clone(response.data, _this.formdata2);
              } else {
                _this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            }
          });
        });
        break;
      case '02': // 出售信息
        this.selectShow = 'forth';
        this.$nextTick(() => {
          yufp.service.request({
            method: 'POST',
            async: false,
            url: backend.cmisNpam + '/api/plaassetpldsellinfo/querybypapaiserno',
            data: _this.papaiSerno,
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (response.data == null) {
                  _this.formdata4.pldimnNo = _this.formdata1.pldimnNo; // 抵债资产编号            公共
                  _this.formdata4.papaiSerno = _this.formdata1.papaiSerno; // 抵债处置业务流水号   公共
                  _this.formdata4.papsiSerno = _this.radomNumber; // 自动返显  业务流水号
                  _this.formdata4.pldimnName = _this.formdata1.pldimnName; // 抵债资产名称
                  _this.formdata4.inputId = _this.$xutils.getDefaultformulaData('$LoginUserName');
                  _this.formdata4.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgName');
                  _this.formdata4.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
                  return;
                }
                yufp.clone(response.data, _this.formdata4);
                _this.formdata4.pldimnNo = _this.formdata1.pldimnNo;
              } else {
                _this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            }
          });
        });
        break;
      case '03': // 转固信息
        this.selectShow = 'third';
        this.$nextTick(() => {
          yufp.service.request({
            method: 'POST',
            async: false,
            url: backend.cmisNpam + '/api/plaassetpldpropertyconvinfo/querybypapaiserno',
            data: _this.papaiSerno,
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (response.data == null) {
                  // 若无数据，默认项赋值
                  _this.formdata3.pldimnNo = _this.formdata1.pldimnNo; // 抵债资产编号         公共
                  _this.formdata3.papaiSerno = _this.formdata1.papaiSerno; // 抵债处置业务流水号   公共
                  _this.formdata3.pappciSerno = _this.radomNumber; // 自动返显流水号
                  _this.formdata3.pldimnName = _this.formdata1.pldimnName; // 抵债资产名称
                  _this.formdata3.inputId = _this.$xutils.getDefaultformulaData('$LoginUserName');
                  _this.formdata3.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgName');
                  _this.formdata3.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
                  return;
                }
                yufp.clone(response.data, _this.formdata3);
              } else {
                _this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            }
          });
        });
        break;
      case '04': // 核销信息
        this.selectShow = 'fifth';
        this.$nextTick(() => {
          yufp.service.request({
            method: 'POST',
            async: false,
            url: backend.cmisNpam + '/api/plaassetpldmamalossinfo/querybypapaiserno',
            data: _this.papaiSerno,
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (response.data == null) {
                  // 若无数据，默认项赋值
                  _this.formdata5.pldimnNo = _this.formdata1.pldimnNo; // 抵债资产编号         公共
                  _this.formdata5.papaiSerno = _this.formdata1.papaiSerno; // 抵债处置业务流水号   公共
                  _this.formdata5.pappmliSerno = _this.radomNumber; // 自动返显流水号
                  _this.formdata5.pldimnName = _this.formdata1.pldimnName; // 抵债资产名称
                  _this.formdata5.inputId = _this.$xutils.getDefaultformulaData('$LoginUserName');
                  _this.formdata5.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgName');
                  _this.formdata5.inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
                  return;
                }
                yufp.clone(response.data, _this.formdata5);
              } else {
                _this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            }
          });
        });
        break;
      default:
        this.selectShow = 'base';
      }
    },

    /** 流程提交*/
    commit () {
      // 保存
      var validate = false;
      this.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      if (!this.ifSave && this.viewType === 'ADD') {
        this.doSave1();
      }
      var _this = this;
      var cusId = _this.formdata1.cusId;
      var cusName = _this.formdata1.cusName;
      // 提交流程
      const userInfo = this.$xutils.getLoginUserInfo();
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      startdto.param = {
        index: {
          'businessid': this.$route.meta.params.papaiSerno

        }
      };
      const rolesList = userInfo.roles;
      // eslint-disable-next-line no-inner-declarations
      var bizType = 'BQ014'; // 档案调阅审批流程-分支机构
      for (let i = 0; i < rolesList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
        let item = rolesList[i];
        if (item.code === 'R0010') { // 小微客户经理
          bizType = 'BQ015';
          break;
        }
      };
      // TODO添加相关的业务配置
      startdto.bizType = bizType;
      startdto.bizId = this.formdata1.papaiSerno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存基本信息
    doSave1 () {
      var _this = this;
      var validateBase = false;
      this.$refs.refForm1.validate(function (valid) {
        validateBase = valid;
      });
      if (!validateBase) {
        this.$message('界面要素未录入完成！');
        return;
      }
      var validateRadom = false;
      if (_this.formdata1.dispMode == '01') {
        _this.$refs.refForm2.validate(function (valid) {
          validateRadom = valid;
        });
        _this.doSave2();
      }
      if (_this.formdata1.dispMode == '02') {
        _this.$refs.refForm4.validate(function (valid) {
          validateRadom = valid;
        });
        _this.doSave4();
      }
      if (_this.formdata1.dispMode == '03') {
        _this.$refs.refForm3.validate(function (valid) {
          validateRadom = valid;
        });
        _this.doSave3();
      }
      if (_this.formdata1.dispMode == '04') {
        _this.$refs.refForm5.validate(function (valid) {
          validateRadom = valid;
        });
        _this.doSave5();
      }
      if (validateRadom) {
        // _this.doSave()
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plaassetpldappinfo/update',
          async: false,
          data: _this.formdata1,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message('操作成功');
              // _this.ifSave = true;
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plaassetpldappinfo/update',
          async: false,
          data: _this.formdata1,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message('操作成功');
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
        _this.activeName = _this.selectShow;
      }
    },
    // 保存出租信息
    doSave2 () {
      var _this = this;
      var validate = false;
      this.$refs.refForm2.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      var modal = {};
      yufp.clone(_this.formdata2, modal);
      modal.leaseAmtInfoParam = this.$refs.refTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaassetpldleaseinfo/insert',
        async: false,
        data: modal,
        callback: function (code, message, response) {
          if (response.data.flag == 'S') {
            _this.$message(response.data.msg);
          } else {
            _this.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }
      });
    },
    /* 租金收取情况 */
    doAdd22 () {
      this.$refs.refTable.clearValidateMessage();
      this.pushRefTableRow();
    },
    // 添加数据 添加一条空白数据----租金收取情况
    pushRefTableRow: function () {
      var _this = this;
      let isRefTableValidateOk = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTableValidateOk = true;
        }
      });
      if (isRefTableValidateOk) {
        // let paplaiSerno = _this.$xutils.getUUID();
        let papliSerno = _this.formdata2.papliSerno;
        let row = {paplaiSerno: '', papliSerno: papliSerno, leaseCollecDate: '', leaseCollecMode: '', leaseAmt: '', cusName: '', pyeeAccno: '', memo: ''};
        _this.$refs.refTable.tabledata.push(row);
        _this.$refs.refTable.setCurrentRow(row);
      }
    },
    /* 租金收取情况 删除 */
    doDel22 () {
      var selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      const paplaiSerno = selections[0].paplaiSerno;
      if (!paplaiSerno) {
        this.$refs.refTable.tabledata.splice(this.$refs.refTable.tabledata.indexOf(selections[0]), 1);
      } else {
        const url = this.$backend.cmisNpam + '/api/plaassetpldleaseamtinfo/delete/' + paplaiSerno;
        this.$xutils.request({
        // 同步请求
          async: true,
          url: url,
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code == 0) {
              this.$xutils.showMsgBox('提示', '删除成功！');
              this.$refs.refTable.tabledata.splice(selections, 1);
            }
          },
          error: (result, status, errorThrown) => {
            this.$xutils.showMsgBox('提示', '操作失败！'); // 弹出提示
          }
        }, this);
      }
    },
    // 保存转固信息
    doSave3 () {
      var _this = this;
      var validate = false;
      this.$refs.refForm3.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaassetpldpropertyconvinfo/insert',
        async: false,
        data: _this.formdata3,
        callback: function (code, message, response) {
          if (response.data.flag == 'S') {
            _this.$message(response.data.msg);
            // yufp.router.removeTab(_this.$route.path);
          } else {
            _this.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }
      });
    },
    // 保存出售信息
    doSave4 () {
      var _this = this;
      var validate = false;
      this.$refs.refForm4.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaassetpldsellinfo/insert',
        async: false,
        data: _this.formdata4,
        callback: function (code, message, response) {
          if (response.data.flag == 'S') {
            _this.$message(response.data.msg);
          } else {
            _this.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }
      });
    },
    // 保存核销信息
    doSave5 () {
      var _this = this;
      var validate = false;
      this.$refs.refForm5.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成！');
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaassetpldmamalossinfo/insert',
        async: false,
        data: _this.formdata5,
        callback: function (code, message, response) {
          if (response.data.flag == 'S') {
            _this.$message(response.data.msg);
          } else {
            _this.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }
      });
    }
  }
};
</script>
