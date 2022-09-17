<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" rules="required" disabled data-code="STD_CONT_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="customClick('viewCusDataByCusId')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled colspan="24"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" disabled data-code="STD_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" name="isRenew" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled :hidden="isOrigiContNoHidden"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" number-formatter="0,000.00" name="contAmt" rules="required" placeholder="合同金额" :min="0" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-num" name="contHighAvlAmt" rules="required" placeholder="本合同项下最高可用信金额" :min="0" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm"  autofocus unit="月" disabled></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" name="loanType" data-code="STD_LOAN_TYPE" placeholder="借款种类"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="textarea" name="loanPurp" rules="required" placeholder="借款用途"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="委托人类型" ctype="select" name="consignorType" rules="required" data-code="STD_CONSIGNOR_TYPE" placeholder="委托人类型"></yu-xform-item>
            <yu-xform-item label="委托贷款类型" ctype="select" name="consignorLoanType" rules="required" data-code="STD_CONSIGNOR_LOAN_TYPE" placeholder="委托贷款类型"></yu-xform-item>
            <yu-xform-item label="委托人客户编号" ctype="input" placeholder="委托人客户编号" rules="required" name="consignorCusId"></yu-xform-item>
            <yu-xform-item label="委托人名称" ctype="input" placeholder="委托人名称" rules="required" name="consignorCusName"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="select" name="consignorCertType"  rules="required" data-code="STD_ZB_CERT_TYP" placeholder="委托人证件类型"></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" placeholder="委托人证件号码"  rules="required" name="consignorCertCode"></yu-xform-item>
            <yu-xform-item label="委托贷款手续费收取方式" ctype="select" placeholder="委托贷款手续费收取方式" rules="required" name="csgnLoanChrgCollectType" data-code="STD_CSGN_LOAN_CHRG_COLLECT_TYPE"></yu-xform-item>
            <yu-xform-item label="委托贷款手续费率" ctype="yu-num" sign="%" :multiple="100" placeholder="委托贷款手续费率" rules="required" name="csgnLoanChrgCollectRate"></yu-xform-item>
            <yu-xform-item label="委托条件" ctype="textarea" name="csgnCond" rules="required" placeholder="委托条件"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" disabled></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" disabled>
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率调整方式" ctype="select" name="rateAdjMode" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式" rules="required"></yu-xform-item>
            <yu-xform-item label="借款利率调整日" ctype="input" placeholder="借款利率调整日" name="loanRateAdjDay" rules="required"></yu-xform-item>
            <yu-xform-item label="lpr利率区间" ctype="select" name="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" placeholder="lpr利率区间" rules="required" @change="getLprRate"></yu-xform-item>
            <yu-xform-item label="当前lpr利率" ctype="yu-num" sign="%" :multiple="100" placeholder="当前lpr利率" name="curtLprRate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="执行年利率" ctype="yu-num" sign="%" :multiple="100" placeholder="执行年利率" name="execRateYear" rules="required" @change="rateChange" ></yu-xform-item>
            <yu-xform-item label="浮动点数" ctype="input" placeholder="浮动点数" name="rateFloatPoint" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="结息方式 " ctype="select" name="eiMode" data-code="STD_EI_MODE" placeholder="结息方式 " rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" placeholder="提款方式" rules="required" :colspan="12" ></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="在本合同签署后" ctype="input" rules="required" placeholder="在本合同签署后" name="drawTerm" :colspan="12" v-if="formdata.drawMode == '01'" hidden-rule></yu-xform-item>
          </yu-xform-group>
            <yu-toolBar v-show="formdata.drawMode == '02'">
              <yu-button @click="addDraw" >新增</yu-button>
              <yu-button @click="saveDraw" >保存</yu-button>
              <yu-button @click="deleteDraw" >删除</yu-button>
            </yu-toolBar>
            <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="list1Url" request-type="post" :default-load="true" :base-params="drawBaseParams" v-show="formdata.drawMode == '02'">
              <yu-xtable-column label="主键" prop="pkId"  hide-column></yu-xtable-column>
              <yu-xtable-column label="流水号" prop="serno"  hide-column></yu-xtable-column>
              <yu-xtable-column label="合同编号" prop="contNo" hide-column></yu-xtable-column>
              <yu-xtable-column ctype="datepicker" label="提款日期" prop="drawDate" required :disabled="!isShowButton"></yu-xtable-column>
              <yu-xtable-column ctype="yu-num" number-formatter="0,000.00" label="提款金额（元）" prop="drawAmt" :min="0" required :disabled="!isShowButton"></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
              <yu-xtable-column label="修改时间" prop="updateDate" hide-column></yu-xtable-column>
            </yu-xtable>
        </yu-panel>
        <yu-panel title="支付、放款方式" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="贷款发放账号" ctype="input" placeholder="贷款发放账号" name="loanPayoutAccno" colspan="10" rules="required" @change="accnoChange">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('getAccNo')">选择</yu-button>
            </yu-xform-item>
            <yu-xform-item label="贷款发放账户名称" ctype="input" placeholder="贷款发放账户名称" name="loanPayoutAcctName" rules="required" ></yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" rules="required" ></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE" placeholder="支付方式" rules="required"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" placeholder="还款方式" rules="required"></yu-xform-item>
          </yu-xform-group>
            <yu-toolBar v-show="formdata.repayMode == 'A040'">
              <yu-button @click="addRepay" :hidden="!isShowButton">新增</yu-button>
              <yu-button @click="saveRepay" :hidden="!isShowButton">保存</yu-button>
              <yu-button @click="deleteRepay" :hidden="!isShowButton">删除</yu-button>
              <yu-button @click="getRepayPlan" :hidden="!isShowButton">获取授信中还款计划</yu-button>
            </yu-toolBar>
            <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="list2Url" request-type="post" :default-load="true" :base-params="repayBaseParams" v-show="formdata.repayMode == 'A040'">
              <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
              <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
              <yu-xtable-column label="期数" prop="terms" hide-column></yu-xtable-column>
              <yu-xtable-column ctype="datepicker" label="还款日期" prop="repayDate" required :disabled="!isShowButton"></yu-xtable-column>
              <yu-xtable-column ctype="yu-num" number-formatter="0,000.00" label="还款金额" prop="repayAmt" required :disabled="!isShowButton"></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
              <yu-xtable-column label="修改时间" prop="updateDate" hide-column></yu-xtable-column>
            </yu-xtable>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId"  disabled hidden rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>

            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>

            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
          <yu-button type="primary" @click="customClick('tempSave')">暂存</yu-button>
          <yu-button type="primary" @click="customClick('save')">保存</yu-button>
          <yu-button type="primary" @click="customClick('commit')">提交</yu-button>
          <yu-button type="primary" @click="customClick('back')">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_LOAN_MODAL,STD_CONT_TYPE,STD_ZB_YES_NO,STD_IR_ADJUST_TYPE,STD_ZB_CUR_TYP,STD_LOAN_TYPE,STD_CONSIGNOR_TYPE,STD_ZB_CERT_TYP,STD_CSGN_LOAN_CHRG_COLLECT_TYPE,STD_LPR_RATE_INTVAL,STD_EI_MODE,STD_DRAW_MODE,STD_RAY_MODE,STD_REPAY_MODE,STD_CONSIGNOR_LOAN_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      appTerm: '',
      bizType: '01',
      list1Url: this.$backend.cmisBiz + '/api/iqploanappdramplansub/selectByIqpSerno',
      list2Url: this.$backend.cmisBiz + '/api/repaycapplan/selectByIqpSerno',
      updateUrl: this.$backend.cmisBiz + '/api/iqpentrustloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpentrustloanapp/',
      drawBaseParams: {}, // 提款表格默认查询数据
      repayBaseParams: {}, // 还款表格默认查询数据
      isShowButton: true,
      formdata: {},
      formType: 'edit',
      formRules: {
        drawTerm: [{
          validator: validator.num, message: '请输入数字值', trigger: 'blur'
        }]
      },
      imageUrls: {},
      File: {},
      isOrigiContNoHidden: true,
      prdCode: '',
      isShow: false
    };
  },
  created () {
    let data = {};
    let serno = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      serno = data.biz_serno;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      serno = data.biz_serno;
    }
    this.op = data.op;
    this.drawBaseParams = {condition: {serno: serno}};
    this.repayBaseParams = {condition: {serno: serno}};
  },
  mounted: function () {
    this.viewFormPage();
  },
  methods: {
    termChange (value) { // 校验合同期限
      var _this = this;
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate <= startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.contTerm = '';
        this.formdata.startDate = '';
        this.formdata.endDate = '';
        return;
      }
      let termMap = {
        startDate: this.formdata.startDate,
        endDate: this.formdata.endDate
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
        data: termMap,
        callback: function (code, message, response) {
          var data = response.data;
          _this.formdata.contTerm = data;
        }
      });
    },
    // 表单只读
    viewFormPage () {
      if (this.op == 'VIEW') {
        this.isDisabledFlg = true;
        // 按钮隐藏
        this.isShowButton = false;
      }
    },

    // 新增 提款表格数据行
    addDraw () {
      this.$refs.refTable1.clearValidateMessage();
      this.pushRefTable1Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable1Row: function () {
      let isRefTable1ValidateOk = false;
      this.$refs.refTable1.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTable1ValidateOk = true;
        }
      });
      if (isRefTable1ValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        let pkId = this.$xutils.getUUID();
        let row = {pkId: pkId, serno: this.formdata.serno, drawDate: '', drawAmt: '', oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
        // this.currentDrawTableRow.push(row);
        this.$refs.refTable1.tabledata.push(row);
        this.$refs.refTable1.setCurrentRow(row);
      }
    },
    // 保存提款表格数据
    saveDraw () {
      let jsonListData = this.$refs.refTable1.tabledata;
      var _this = this;
      _this.$request({
        url: this.$backend.cmisBiz + '/api/iqploanappdramplansub/addOrUpdateAllTable',
        method: 'post',
        data: jsonListData
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code == '0') {
          _this.$message({ message: _this.$t('lookupdict.bccg') });
          _this.$refs.refTable1.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
    },
    // 删除 提款表格数据
    deleteDraw () {
      let selections = this.$refs.refTable1.selections;
      selections[0].pkId;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.confirmDeleteDrawRow(selections);
    },
    // 确定删除提款表格数据
    confirmDeleteDrawRow: function (selections) {
      let _this = this;
      this.$confirm('确认删除该条数据？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              url: backend.cmisBiz + '/api/iqploanappdramplansub/deleteByPkId',
              method: 'post',
              data: selections[0],
              callback: function (code, message, data) {
                if (data === '0') {
                  // 后台查不到数据 则前端删除行操作
                  _this.$refs.refTable1.tabledata.splice(selections, 1);
                  _this.prdCode = data.data.prdId;
                } else {
                  _this.$message({ message: _this.$t('lookupdict.sccg') });
                  _this.$refs.refTable1.remoteData();
                }
              }
            });
          }
        }
      });
    },
    // 新增 还款表格数据行
    addRepay () {
      this.$refs.refTable2.clearValidateMessage();
      this.pushRefTable2Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable2Row: function () {
      let isRefTable2ValidateOk = false;
      this.$refs.refTable2.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTable2ValidateOk = true;
        }
      });
      if (isRefTable2ValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        let pkId = this.$xutils.getUUID();
        let row = {pkId: pkId, serno: this.formdata.serno, terms: '', repayDate: '', repayAmt: '', oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
        // this.currentDrawTableRow.push(row);
        this.$refs.refTable2.tabledata.push(row);
        this.$refs.refTable2.setCurrentRow(row);
      }
    },
    // 保存还款表格数据
    saveRepay () {
      let jsonListData = this.$refs.refTable2.tabledata;
      var _this = this;
      _this.$request({
        url: this.$backend.cmisBiz + '/api/repaycapplan/addOrUpdateAllTable',
        method: 'post',
        data: jsonListData
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code == '0') {
          _this.$message({ message: _this.$t('lookupdict.bccg') });
          _this.$refs.refTable2.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
    },
    // 删除 还款表格数据
    deleteRepay (row) {
      let selections = this.$refs.refTable2.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.confirmDeleteRepay(selections);
    },
    // 确定删除还款表格数据
    confirmDeleteRepay: function (selections) {
      let _this = this;
      this.$confirm('确认删除该条数据？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              url: backend.cmisBiz + '/api/repaycapplan/deleteByPkId',
              method: 'post',
              data: selections[0],
              callback: function (code, message, data) {
                if (data === '0') {
                  // 后台查不到数据 则前端删除行操作
                  _this.$refs.refTable2.tabledata.splice(selections, 1);
                  _this.prdCode = data.data.prdId;
                } else {
                  _this.$message({ message: _this.$t('lookupdict.sccg') });
                  _this.$refs.refTable2.remoteData();
                }
              }
            });
          }
        }
      });
    },

    getLprRate: function (value) {
      if (value == 'A1' || value == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.curtLprRate = response.data.rate;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else { }
    },

    rateChange (value) {
      // let execRateYear = this.$refs.refForm.formdata.execRateYear;
      if (value > 100) {
        this.$refs.refForm.formdata.execRateYear = null;
        this.$xutils.showMsgBox('提示', '当前LPR利率需小于等于100'); // 弹出提示
        return;
      }

      // 固定利率,输入执行利率（年），BP自动生成。
      var rateFloatPoint = parseFloat(value) - parseFloat(this.formdata.curtLprRate) * 100;
      this.formdata.rateFloatPoint = (parseFloat(rateFloatPoint) * 100).toFixed(0);
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighAvlAmt = _this.$refs.refForm.formdata.contHighAvlAmt;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        this.formdata.contHighAvlAmt = 0;
        this.formdata.contAmt = 0;
      }
      // else if (parseFloat(contAmt) > parseFloat(contHighAvlAmt)) {
      //   _this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本合同项下可用信金额最高不超过' + contHighAvlAmt + '元。';
      // }
    },

    accnoChange () {
      this.$refs.refForm.formdata.loanPayoutAcctName = null;
      this.$refs.refForm.formdata.acctsvcrName = null;
    },
    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
