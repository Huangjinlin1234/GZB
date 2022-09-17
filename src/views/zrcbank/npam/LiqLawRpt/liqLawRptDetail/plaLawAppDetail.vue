<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div>
   <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="诉讼申请信息" name="base">
        <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" label-width="170px" :disabled="viewType == 'DETAIL'" v-model="formdata" style="text-align: center;" >
        <yu-xform-group>
          <yu-xform-item label="业务流水号"  ctype="input" name="appSerno" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="申请事项"  ctype="select" name="appEven" data-code="STD_APP_EVEN" rules="required"></yu-xform-item>
          <yu-xform-item label="诉讼方案名称"  ctype="textarea" name="planName" :colspan="24" rules="required"></yu-xform-item>
          <yu-xform-item label="当事人客户编号" ctype="input" name="cusId" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="当事人客户名称" ctype="input"  name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="当事人身份" name="partyRole" ctype="select" data-code="STD_PARTY_ROLE" rules="required"></yu-xform-item>
          <yu-xform-item label="当事人联系电话" name="linkPhone" ctype="input" :rules="linkPhoneRules"></yu-xform-item>
          <yu-xform-item label="标的币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" rules="required"></yu-xform-item>
          <yu-xform-item label="标的金额（元）" name="totalAmt" ctype="yu-num" number-formatter="0,000.00"  disabled></yu-xform-item>
          <yu-xform-item label="本金金额（元）" name="capAmt" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
          <yu-xform-item label="拖欠利息总额（元）" ctype="yu-num" number-formatter="0,000.00" name="totalTqlxAmt" disabled></yu-xform-item>
          <yu-xform-item label="五级分类" name="fiveClass" ctype="select" data-code="STD_FIVE_CLASS" disabled></yu-xform-item>
          <yu-xform-item label="代理方式" name="agtMode" ctype="select" data-code="STD_AGT_MODE" rules="required" @change="requireFn"></yu-xform-item>
          <yu-xform-item label="案由" name="caseReason" ctype="select"  data-code="STD_CASE_REASON" rules="required"></yu-xform-item>
          <yu-xform-item label="代理类型" name="agtType"  ctype="select" data-code="STD_AGT_TYPE" :rules="agtType"></yu-xform-item>
          <yu-xform-item label="债务人基本情况" name="debtorBasCase" ctype="textarea" :colspan="24" rules="required"></yu-xform-item>
          <yu-xform-item label="担保人基本情况" name="guarBasCase" ctype="textarea" :colspan="24" rules="required"></yu-xform-item>
          <yu-xform-item label="支行处置情况" name="dispCase" ctype="textarea" :colspan="24" rules="required"></yu-xform-item>
          <yu-xform-item label="起诉理由和意见" name="resnAdvice" ctype="textarea" :colspan="24" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" name="memo" ctype="textarea" :colspan="24"></yu-xform-item>
        </yu-xform-group>
          <yu-panel title="登记信息" panel-type="normal">
            <yu-xform-group :column="2">
              <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled placeholder="登记人"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled placeholder="登记机构"></yu-xform-item>
              <yu-xform-item label="责任人" name="managerIdName" ctype="input" disabled placeholder="责任人"></yu-xform-item>
              <yu-xform-item label="责任机构" name="managerBrIdName" ctype="input" disabled placeholder="责任机构"></yu-xform-item>
              <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker"  disabled placeholder="登记日期"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-button-drop>
           <yu-button type="primary" @click="commit" v-if="viewType == 'EDIT'">提交</yu-button>
          <yu-button  type="primary" @click="doSave" v-if="viewType == 'EDIT'">保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
   </yu-tab-pane>
     <yu-tab-pane label="涉诉业务信息" name="second">
        <yu-panel title="涉诉业务信息" :hideFilter="false" :collapseHide="false">
        <yu-button-drop>
          <yu-button type="primary" @click="importFn"  v-if="viewType == 'EDIT'">引入</yu-button>
          <yu-button type="primary" @click="deleteFn"  v-if="viewType == 'EDIT'">取消引入</yu-button>
          <yu-button type="primary" @click="checkFn" >查看详情</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTableCont" condition-key="condition" style="margin-top:10px" row-number :data-url="url.dataContNoUrl" :base-params="baseContParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
     <yu-panel title="涉诉业务担保情况" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
        <yu-button-drop>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTableGuar" condition-key="condition" style="margin-top:10px" row-number :data-url="url.dataGuarUrl" :base-params="baseGuarParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="主合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保起始日" prop="guarStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="担保到期日" prop="guarEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="担保状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
   </yu-tab-pane>
    <yu-tab-pane label="诉讼申请报告" name="third">
      <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料" name="forth">
      <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
   </yu-tab-pane>
   <yu-tab-pane label="审批历史信息" name="five">
        <coop-approval :params="childParams"></coop-approval>
   </yu-tab-pane>
   </yu-tabs>
    <yu-xdialog title="合同借据引入" :visible.sync="authDialogVisible" class="control-dialog">
      <yu-xtable :data-url="url.BillUrl" selection-type="checkBox" ref="refTableBill" :base-params="baseBillParams" requestType="post">
       <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同起始日" prop="contStartDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="合同到期日" prop="contEndDate" value-format="yyyy-MM-dd" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" class="dialog-footer">
        <yu-button type="primary" @click="saveBillFn" v-loading="flag">保存</yu-button>
        <yu-button @click="cancel">取消</yu-button>
      </div>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="doBack"></yufpNwfInit>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_APP_EVEN,STD_PARTY_ROLE,STD_ZB_CUR_TYP,STD_FIVE_CLASS,STD_AGT_MODE,STD_CASE_REASON,STD_AGT_TYPE,STD_ZB_GUAR_WAY,STD_CONT_STATUS,STD_GUAR_CONT_STATE');
import mixin from '@/utils/mixin';
import imageSystem from '@/views/imageManage/imageSystem';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
import FineReport from '../../fineReport/fineReport.vue';
import {validator} from '@/utils/validate';
export default {
  mixins: [mixin],
  components: {
    imageSystem,
    FineReport,
    coopApproval
  },
  data: function () {
    return {
      agtType: {},
      flag: false,
      formdata: {},
      image: '1',
      activeName: 'base',
      authDialogVisible: false,
      viewType: 'EDIT',
      appSerno: null,
      linkPhoneRules: {validator: validator.mobile, trigger: 'blur'},
      url: {
        dataContNoUrl: backend.cmisNpam + '/api/plalawbillrel/queryPlaLawBillRelByAppSerno',
        BillUrl: backend.cmisBiz + '/api/ctrloancont/',
        dataGuarUrl: backend.cmisNpam + '/api/plalawgrtrel/queryPlaLawGrtRelList'
      },
      baseContParams: {
        condition: {appSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.appSerno}
      },
      baseGuarParams: {
        condition: {appSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.appSerno}
      },
      baseBillParams: {},
      imageBizParam: [],
      fineReportParam: {}
    };
  },
  props: {
    bizPageData: Object
  },
  // vuex中存储数据获取：
  computed: {
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.appSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  created () {
    var _this = this;
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      _this.appSerno = _this.bizPageData.instanceInfo.bizId;
      _this.userId = _this.bizPageData.instanceInfo.userId;
      _this.orgId = _this.bizPageData.instanceInfo.orgId;
      _this.orgname = _this.bizPageData.instanceInfo.bizUserName;
      _this.viewType = 'DETAIL';
    } else {
      _this.appSerno = _this.$route.meta.params.appSerno;
      _this.viewType = _this.$route.meta.params.viewType;
      _this.userId = _this.$route.meta.params.userId;
      _this.orgId = _this.$route.meta.params.orgId;
      _this.orgname = _this.$route.meta.params.inputBrIdName;
    }
    if (_this.viewType == 'DETAIL') {
      _this.image = '2';
    }
    let cusId = '';
    let cusName = '';
    let data = {};
    data.appSerno = _this.appSerno;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/plalawapp/queryPlaLawAppInfo',
      data: data,
      callback: function (code, message, response) {
        if (response.code == 0) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.formdata);
            cusId = response.data.cusId;
            cusName = response.data.cusName;
          });
        } else {
          _this.$message({
            message: response.message,
            type: 'error'
          });
        }
      }
    });
    _this.fineReportParam = {
      'top_outsystem_code': 'sfss-rp01.cpt',
      'index': '&appSerno=' + _this.appSerno + '&userId=' + _this.userId + '&orgId=' + _this.orgId
    };
    _this.imageBizParam = [{
      'top_outsystem_code': 'XXD_ZCBQ',
      'outsystem_code': 'XXD_ZCBQ01',
      'index': {
        'businessid': _this.appSerno,
        /** 客户名称 */
        custname: cusName,
        /** 客户经理名称 */
        // custconductname: params.updIdName,
        /** 机构号 */
        // orgid: params.inputBrId,
        /** 机构名称 */
        orgname: _this.orgname,
        /** 客户号 */
        custid: cusId
      }
    }];
  },
  methods: {
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    requireFn (value) {
      if (value == '03') {
        this.agtType = {required: true, message: '必填', trigger: 'blur'};
      } else {
        this.agtType = {};
      }
    },
    /** 流程提交*/
    commit () {
      // 保存
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$message('界面要素未录入完成');
        return;
      }
      if (!this.$refs.refTableCont.tabledata.length) {
        return this.$xutils.showMsgBox('提示', '借据未引入，流程无法提交');
      };
      const saveResult = this.doSave();
      if (!saveResult || saveResult.code != '0') {
        return;
      };
      var _this = this;
      // 提交流程
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys; // 岗位
      var dutyArr = [];
      dutysList.forEach(item => {
        dutyArr.push(item.code);
      });
      var str = dutyArr.join(',');

      const userInfo = this.$xutils.getLoginUserInfo();
      const orgType = userInfo.org.orgType;
      var cusId = _this.formdata.cusId;
      var cusName = _this.formdata.cusName;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      // console.log('str', str);
      // startdto.param = {
      //   readType: str,
      //   index: {
      //     'businessid': _this.taskNo,
      //     'billno': _this.billNo
      //   }
      // };
      // TODO添加相关的业务配置
      const rolesList = userInfo.roles;
      if (orgType == 'A') {
        if (userInfo.orgCode.startsWith('80')) {
          startdto.bizType = 'SGL01';// 司法诉讼申请审批流程（寿光）
        } else if (userInfo.orgCode.startsWith('81')) {
          startdto.bizType = 'DHL01';// 司法诉讼申请审批流程（东海）
        }
      } else {
        for (var i = 0; i < rolesList.length; i++) {
          if (rolesList[i].code === 'R0010') { // 小微客户经理-司法诉讼申请审批流程（非小微）
            startdto.bizType = 'BQ002';
            // break;
          } else {
            startdto.bizType = 'BQ001';
          }
        }
      }
      // 后期根据实际的角色编号修改-2021-06-12
      startdto.bizId = this.formdata.appSerno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      let totalAmt = _this.formdata.totalAmt;
      let flag = 'F';
      if (totalAmt > 100000000) {
        flag = 'T';
      }

      startdto.param = {
        flag: flag,
        readType: str,
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        }
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    initFormdata () {
      var _this = this;
      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        _this.appSerno = _this.bizPageData.instanceInfo.bizId;
        _this.viewType = 'DETAIL';
      } else {
        _this.appSerno = _this.$route.meta.params.appSerno;
        _this.viewType = _this.$route.meta.params.viewType;
      }
      let data = {};
      data.appSerno = _this.appSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawapp/queryPlaLawAppInfo',
        data: data,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$nextTick(function () {
              yufp.clone(response.data, _this.formdata);
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
    /* 涉诉业务信息 */
    checkFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableCont.selections;
      if (selectionsAry.length !== 1) {
        return _this.$message({message: '请先选择一条记录', type: 'warning'});
      };
      var selectData = selectionsAry[0];
      var billNo = selectData.billNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
          viewType: 'DETAIL'
        }
      });
    },
    /**
    担保查看
    */
    infoFn () {
      var _this = this;
      let contNo = _this.$refs.refTableGuar.selections[0].guarContNo;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/grtguarcont/queryList',
        data: { condition: JSON.stringify({ oprType: '01', 'guarContNo': contNo }) },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let jsoPar = response.data[0];
            // console.log('jsoPar', jsoPar);
            if (jsoPar == null || jsoPar == '') {
              _this.$xutils.showMsgBox(
                '提示',
                '无该合同信息',
                350,
                150
              );
              return;
            }
            if (!jsoPar) {
              _this.$xutils.showMsgBox(
                '提示',
                '必须选择一条记录进行操作!\r\n请重新操作!',
                350,
                150
              );
              return;
            }
            jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
            jsoPar['op'] = 'VIEW';
            _this.$dialog.open(
              '',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              jsoPar,
              _this.getDialogDataFunc,
              true,
              true
            );
          }
        }
      });
      // jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      // jsoPar['op'] = 'VIEW';

      // this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   jsoPar,
      //   this.getDialogDataFunc,
      //   true,
      //   true
      // );
    },
    /**
    借据保存
     */
    saveBillFn () {
      var _this = this;

      var selectionsAry = _this.$refs.refTableBill.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.flag = true;
      var model = selectionsAry;
      let params = {};
      params.ctrLoanContList = model;
      // params.ctrLoanContList.guarMode = model.guarWay;
      params.appSerno = _this.formdata.appSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawbillrel/saveContNo',
        data: params,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.authDialogVisible = false;
            _this.$refs.refTableCont.remoteData();
            _this.$refs.refTableGuar.remoteData();
            _this.initFormdata();
            _this.$message('操作成功');
            _this.flag = false;
          } else {
            _this.flag = false;
            _this.$message({
              message: response.message,
              type: 'error'
            });
            // loading.close();
          }
        }
      });
    },
    cancel () {
      this.authDialogVisible = false;
    },
    /** 遮罩
       * 页面loading
       */
    openLoading () {
      var dom = this.dialogId ? this.$parent.$refs.dialog : this.$parent.$el;
      console.log('this.$parent.$el', this.$parent.$el);
      var options = {
        target: dom, // Loading 需要覆盖的 DOM 节点
        body: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
        fullscreen: false,
        text: '拼命加载中' // 显示在加载图标下方的加载文案
      };
      var loadingInstance = this.$loading(options);
      return loadingInstance;
    },

    /**
    引入 */
    importFn () {
      var _this = this;
      _this.baseBillParams = {condition: JSON.stringify({cusId: _this.formdata.cusId, contStatus: '200' })};
      _this.authDialogVisible = true;
    },
    /**
    取消引入 */
    deleteFn () {
      var _this = this;
      var selectionsAry = _this.$refs.refTableCont.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plalawbillrel/delete',
              data: JSON.stringify(selectionsAry[0]),
              callback: function (code, message, response) {
                _this.$refs.refTableCont.remoteData();
                _this.initFormdata();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      console.log('res', this.$refs.refTableCont.tabledata.length);
      var _this = this;
      let jsoRt = null;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return;
        };
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawapp/update',
          async: false,
          data: _this.formdata,
          callback: function (code, message, response) {
            if (response.code == 0) {
              jsoRt = response;
              _this.$message.success('保存成功');
            } else {
              _this.$message.error({ message: response.message});
            }
          }
        });
      });
      return jsoRt;
    }

  }
};

</script>
