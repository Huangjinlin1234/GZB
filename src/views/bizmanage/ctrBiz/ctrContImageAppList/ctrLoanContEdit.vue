<template>
  <!--
    @created by 王玉坤 20210504
    @description 模板示例——分组表单
  -->
  <div>
    <div>
      <!-- 借款合同修改 -->
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="借款合同" name="first">
         <yu-xform ref="refBaseForm" label-width="200px" v-model="baseFormdata">
          <yu-panel title="借款人信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled></yu-xform-item>
              <yu-xform-item label="手机号码" ctype="input" name="phone" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="借款合同信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="合同编号" ctype="input" name="contNo" colspan="11" disabled></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
                <yu-button type="primary" @click="viewCont">查看</yu-button>
              </yu-xform-item>
              <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled></yu-xform-item>
              <yu-xform-item label="金额" ctype="yu-num" name="contAmt" disabled></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled colspan="11"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
                <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
              </yu-xform-item>
              <yu-xform-item label="用途" ctype="input" name="loanPurp" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="input" name="curType" disabled></yu-xform-item>
              <yu-xform-item label="合同模式" ctype="select" name="contMode" disabled></yu-xform-item>
              <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" disabled data-code="STD_ZB_YES_NO" disable></yu-xform-item>
              <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" disable></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" name="appTerm"  disabled></yu-xform-item>
              <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate"  disabled></yu-xform-item>
              <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate"   disabled></yu-xform-item>
              <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>

          <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled ></yu-xform-item>
              <yu-xform-item label="利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY" ></yu-xform-item>
              <yu-xform-item label="当前LPR利率（%）" name="curtLprRate" ctype="yu-num"  sign="%" :multiple="100" disabled></yu-xform-item>
              <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled ></yu-xform-item>
              <yu-xform-item label="执行年利率" name="execRateYear" ctype="yu-num" disabled sign="%" :multiple="100" ></yu-xform-item>
              <yu-xform-item label="LPR浮动点（BP）" name="rateFloatPoint" ctype="yu-num" disabled ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="结息方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_EI_MODE" disabled></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="eiModeExpl" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" disabled></yu-xform-item>
              <yu-xform-item label="天数限制" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xtable ref="refDrawTable" row-number :base-params="searchFormdata" border :data="drawData" width="800" :hidden="drawMode">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="提款日期" prop="drawDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="提款金额" prop="drawAmt" width="300" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="支付方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE" disabled ></yu-xform-item>
              <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName" disabled></yu-xform-item>
              <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno" disabled></yu-xform-item>
              <yu-xform-item label="开户行" ctype="input" name="acctsvcrName" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="还款方式" ctype="select" name="repayMode"  data-code="STD_REPAY_MODE" disabled></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="repaySour" hide-column="false" disabled></yu-xform-item>//还款方式为其他时才显示
            </yu-xform-group>>
            <yu-xtable ref="refRepayTable" row-number :base-params="searchFormdata" border :data="repayData" width="800">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="计划还款日期" prop="planRepayDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="计划还款金额" prop="planAmt" width="300" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="担保方式" :hideFilter="false" :collapseHide="false" >
            <yu-xform-group>
              <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他约定" :hideFilter="false" :collapseHide="false" disabled>
            <yu-xform-group>
              <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="送达地址确认" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="联系人" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="地址" ctype="input" name="addr" disabled ></yu-xform-item>
              <yu-xform-item label="电话" ctype="input" name="phone" disabled></yu-xform-item>
              <yu-xform-item label="传真" ctype="input" name="fax" disabled></yu-xform-item>
              <yu-xform-item label="邮箱" ctype="input" name="email" disabled></yu-xform-item>
              <yu-xform-item label="QQ" ctype="input" name="qq" disabled></yu-xform-item>
              <yu-xform-item label="微信" ctype="input" name="wechat" disabled></yu-xform-item>
              <yu-xform-item label="其他通讯方式及账号" ctype="input" name="otherPhone" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="登记人" ctype="input" name="inputId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记人电话" ctype="input" name="author" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记时间" ctype="input" name="inputDate" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" :disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>


        </yu-xform>
        </yu-tab-pane>

        <yu-tab-pane label="分析信息录入" name="tab2">
          <yu-xform ref="loanDirection" label-width="100px" v-model="loanDirectiondata">
            <yu-panel title="分析信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                  <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled></yu-xform-item>
                  <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
        </yu-tab-pane>
      <yu-tab-pane label="影像信息" name="tab3">
        <yu-panel title="影像信息">
        <imageSystem authority="import;delImg;insert;scan;replace;copy;cut;download;setValidDate;approve;takePic;reuse;move" s="1" :para="imageBizParam"></imageSystem>
        </yu-panel>
      </yu-tab-pane>
      </yu-tabs>
       <yufpNwfInit ref="yufpNwfInit" @success-click="onCancel"></yufpNwfInit>
    </div>
    <div>
      <yu-form-buttons align="center">
        <yu-button type="primary" @click="submitFn">提交</yu-button>
        <yu-button type="primary" @click="onCancel">返回</yu-button>
      </yu-form-buttons>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="03"></cfgAssistantTip>
  </div>
</template>
<script>
import tempetfactorypreviewIndex from '@/views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_RADJ_TYP,STD_ZB_LPR_LIMIT,STD_ZB_EI_MODE,STD_ZB_DRAW_TYPE,STD_ZB_DZZC_ZFFS,STD_ZB_GUAR_WAY');
export default {
  components: { tempetfactorypreviewIndex, imageSystem, cfgAssistantTip},
  data: function () {
    return {
      activeName: 'first',
      expandCollapseName: ['base'],
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'number',
          required: true,
          message: '请输入数字',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      familyFormRules: [
        {
          validator: yufp.validator.number
        }
      ],
      numberRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
      phoneRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'phone', message: '请输入正确的号码', trigger: 'blur' }],
      emailRules: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
      baseFormdata: {},
      familyFormdata: {},
      otherFormdata: {},
      drawData: [],
      repayData: [],
      dialogFormVisibleAdd: false,
      disabledflg: true,
      hiddenFlg: true,
      pageParams: {},
      loanDirectiondata: {},
      imageParams: {'pvpSerno': this.$route.meta.params.pvpSerno, 'topOutsystemCode': this.$route.meta.params.topOutsystemCode},
      prdCode: '',
      isShow: false // 小助手是否展示
    };
  },

  computed: {
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;',
          'outsystem_code': '',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': '',
            'businessid': this.$route.params.contNo,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.$route.params.contNo,
            'orgname': '',
            'opername': '',
            'custid': '',
            'creditamount': '',
            'maintaindate': '',
            'billno': '',
            'custname': '',
            'credittype': ''
          }
        }
      ];
      return imageBizParam;
    }
  },

  mounted () {
    var _this = this;
    var contNo = _this.$route.params.contNo;
    this.loanDirectiondata.contNo = contNo;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
      data: {
        contNo: contNo
      },
      callback: function (code, message, response) {
        if (response.data.ctrLoanCont) {
          _this.prdCode = response.data.ctrLoanCont.prdId;
        }
        yufp.clone(response.data.ctrLoanCont, _this.baseFormdata);
        var repayMode = response.data.ctrLoanCont.repayMode;
        if (repayMode == '06') {
          _this.hiddenFlg = false;
        }
        if (response.data.iqpLoanAppDramPlanSubList.length > 0) {
          _this.drawData = response.data.iqpLoanAppDramPlanSubList || [];
        }
        if (response.data.iqpRepayPlanList.length > 0) {
          _this.repayData = response.data.iqpRepayPlanList || [];
        }
      }
    });
  },
  methods: {
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
    /**
     * 查看
     */
    viewCont: function () {
      var _this = this;
      var code = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB';

      var replyid;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        data: {iqpSerno: this.baseFormdata.iqpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            replyid = response.data.replyNo;
          }
        }
      });


      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '合同申请',
        data: {
          model_group_no: 'CMG000022',
          contNo: this.baseFormdata.contNo,
          iqpSerno: this.baseFormdata.iqpSerno,
          PageType: 'LOOK',
          prdId: this.baseFormdata.prdId,


          // 担保传参
          contType: this.baseFormdata.contType,
          belgLine: '02',
          guarWay: this.baseFormdata.guarWay,
          cusId: this.baseFormdata.cusName,
          cusName: this.baseFormdata.cusName,
          replyNo: replyid,
          contAmt: this.baseFormdata.contAmt,
          contTerm: this.baseFormdata.appTerm,
          startDate: this.baseFormdata.contStartDate,
          endDate: this.baseFormdata.contEndDate,

          // 征信传参
          period: '02',
          borrowerCusId: this.baseFormdata.cusId,
          borrowerCusName: this.baseFormdata.cusName,
          borrowerCertCode: this.baseFormdata.certCode,
          oprType: '03', // 查看
          op: 'VIEW',
          topOutsystemCode: code
        },
        afterTabClose: () => {
          _this.refresh();
        }
      });
    },
    /**
     * 提交表单信息
     */
    submitFn () {
      // 表单校验
      if (!this.checkForm()) {
        this.$message.error('请完善表单相关信息！');
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/updatabyloandirection',
        data: this.loanDirectiondata
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data != null) {
            // 进行审批流程  WF_CTR_LOAN_CONT
            this.startAndSubmit();
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
          }
        }
      });
    },
    // 审批流程
    startAndSubmit () {
      var startdto = {};
      const loginUser = this.$xutils.getLoginUserInfo();
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'LS007';
      startdto.bizId = this.$route.params.serno;
      startdto.bizUserName = this.baseFormdata.cusName;
      startdto.bizUserId = this.baseFormdata.cusId;
      startdto.param = {
        contNo: this.$route.params.contNo
      };


      this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 表单校验
    checkForm () {
      // 1.校验必填项
      let validForm = false;
      this.$refs.loanDirection.validate(valid => { validForm = valid });
      if (!validForm) {
        return false;
      }
      // 其他的校验
      /* if(){
          return false;
       }*/
      return true;
    },
    // 返回
    onCancel () {
      yufp.router.removeTab(this.$route.path);
    },
    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    }
  }
};
</script>
