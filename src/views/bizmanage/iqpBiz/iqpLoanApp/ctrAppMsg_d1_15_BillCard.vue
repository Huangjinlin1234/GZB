<template>
  <div id="d1_15_BillCard">
    <div id="d1_15_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isDisabledFlg">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" data-code="STD_ZB_CONT_TYPE" name="contType" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="流水号" name="iqpSerno" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" data-code="STD_LOAN_MODAL" placeholder="贷款形式" name="loanModal" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" data-code="STD_ZB_LOAN_PROP" placeholder="贷款性质" name="loanCha" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押" :colspan="12" :hidden="isOlPldShow"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印" :colspan="12"></yu-xform-item>
            <yu-xform-item label="本行角色" ctype="select" data-code="STD_PRTCPT_TYPE" placeholder="本行角色" name="bankRole" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true" @change="isRChange" :rules="{ required: isReqByBankPrdName, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="银团总金额" ctype="yu-num" number-formatter="0,000.00" placeholder="银团总金额" name="bksyndicTotlAmt" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true" :disabled="isDisabledFlg" :rules="{ required: isReqByBankPrdName, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="还款顺序" ctype="select" data-code="STD_REPAY_SEQ" placeholder="还款顺序" name="repaySeq" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true" :rules="{ required: isReqByBankPrdName, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="银团纸质合同编号" ctype="input" placeholder="银团纸质合同编号" name="bksyndicPaperContNo" :colspan="12" :rules="{ required: isReqByBankRole, message: '字段不能为空' }" :hidden="!isShowByPrdId"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否续签" name="isRenew" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled :colspan="12" :hidden="!isShowOrigiContNo"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" placeholder="业务类型" name="bizType" :colspan="12" data-code="STD_ZB_BIZ_TYP" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" name="curType" rules="required" :colspan="12" @change="getCurTypeRate"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="num" placeholder="合同金额" name="contAmt" rules="required" :colspan="12" :disabled="isDisabledFlg" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="input" placeholder="汇率" name="appRate" disabled></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="num" placeholder="折算人民币金额" name="cvtCnyAmt" disabled></yu-xform-item>
            <yu-xform-item label="最高可用信金额" ctype="num" placeholder="最高可用信金额" name="contHighAvlAmt" rules="required" :colspan="12" :disabled="isDisabledFlg" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="startDate" rules="required" :colspan="12" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="endDate" rules="required" :colspan="12" @change="termChange"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm" rules="required" :colspan="12" :disabled="isDisabledFlg" autofocus unit="月"></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" data-code="STD_LOAN_TYP" disabled placeholder="借款种类" name="loanType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="select" data-code="STD_LOAN_USE_TYPE" placeholder="借款用途" name="loanUse" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="并购内容" :hideFilter="false" :collapseHide="false" :hidden="!isShowMergerPanel" id="MergerPanel15">
          <yu-xform-group :column="2">
            <yu-xform-item label="目标企业" ctype="textarea" placeholder="目标企业" name="targetCorp" :required="isMerger" :colspan="16" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="并购协议" ctype="textarea" placeholder="并购协议" name="mergerAgr" :required="isMerger" :colspan="16" hidden-rule="false"></yu-xform-item>
            <yu-xform-item label="并购交易价款" ctype="input" placeholder="并购交易价款" name="mergerTranAmt" :required="isMerger" :colspan="12" hidden-rule="false"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="第三方信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否占用第三方额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否占用第三方额度" name="isOutstndTrdLmtAmt" rules="required" :colspan="12" @change="isShowTrdLmtAmt"></yu-xform-item>
            <yu-xform-item label="第三方合同协议编号" ctype="input" placeholder="第三方合同协议编号" name="tdpAgrNo" rules="required" icon="search" :triger-click="false" :colspan="10" :on-icon-click="handleIconClick" :readonly="true" @focus="focusFn" :hidden="!isShowTrdDataFlg">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :hidden="!isShowTrdDataFlg">
              <yu-button type="primary" @click="customClick('viewTdpAgrNo')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="合作方客户编号" ctype="input" placeholder="合作方客户编号" name="coopCusId" :colspan="12" hidden disabled></yu-xform-item>
            <yu-xform-item label="合作方客户名称" ctype="input" placeholder="合作方客户名称" name="coopCusName" rules="required" :hidden="!isShowTrdDataFlg" disabled :colspan="24">
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他约定" ctype="textarea" placeholder="其他约定" name="otherAgreed" :colspan="16"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" required rules="mobile" :colspan="12"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email" rules="email" ></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="textarea" placeholder="送达地址" name="deliveryAddr" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="input" placeholder="所属条线" name="belgLine" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" data-code="STD_DEBT_GRADE" placeholder="债项等级" name="debtLevel" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('getDebtLevel')" :disabled="op == 'VIEW'">债项评级测算</yu-button>
            </yu-xform-item>

            <yu-xform-item label="违约风险暴露EAD" ctype="input" placeholder="违约风险暴露EAD" name="ead" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="审批状态" data-code="STD_ZB_APPR_STATUS" ctype="select" placeholder="审批状态 wf_status" name="approveStatus" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
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

            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="最后修改日期" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_PRTCPT_TYPE,STD_ZB_LOAN_PROP,STD_REPAY_MODE,STD_REPAY_SEQ,STD_LOAN_TYP,STD_PRD_TYPE_PROP');
export default{
  name: 'D115BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isShowOrigiContNo: false,
      isDisabledFlg: false,
      isShowByPrdId: false, // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
      isReqByBankPrdName: false, // 银团贷款
      isReqByBankRole: false, // 纸质合同编号
      isShowTrdDataFlg: false, // 第三方信息
      isShowMergerPanel: true, // 并购贷款
      isMerger: false,
      isOlPldShow: true,
      prdCode: '',
      isShow: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      op: ''
    };
  },
  created () {
    let data = {};
    let serno = '';
    let op = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = data.param.op;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      serno = data.iqpSerno;
      op = data.op;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      serno = data.iqpSerno;
      op = data.op;
    }
    this.op = op;
  },
  mounted () {
    this.afterInit();
  },
  watch: {
    // dom渲染完成后调用
    // showItemsByPrdId: function () {
    //   var _this = this;
    //   _this.$nextTick(function () {

    //   });
    // }
  },
  methods: {
    afterInit () {
      // 表单查看处理
      this.viewFormPage();
      // 是否续签
      let isRenew = this.getFactory().contextData.isRenew;
      if (isRenew == '1') {
        this.isShowOrigiContNo = true;
      } else if (isRenew == '0') {
        this.isShowOrigiContNo = false;
      } else {
        this.isShowOrigiContNo = false;
      }
    },
    // 本行角色 onchang方法
    isRChange (value) {
      // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
      // 根据老信贷字典项文档中，并未找到 非牵头行 选项
      let bankRole = this.formdata.bankRole;
      if (bankRole != '1') {
        this.isReqByBankRole = true;
      } else {
        this.isReqByBankRole = false;
      }
    },
    focusFn: function () {
      this.handleIconClick();
    },

    handleIconClick: function () {
      // console.log(this.formdata.cusId);
      var _this = this;
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let instuCde = jsoUser.instu.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox('提示', '客户机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      var data = { cusId: '', instuCde: instuCde };
      this.$dialog.open('', 'zrcbank/lmt/singleCoopSubInfo/singleCoopSubInfo', -1, -1, data, params => {
        this.formdata.tdpAgrNo = params.apprSubSerno;
        this.formdata.coopCusId = params.cusId;
        this.formdata.coopCusName = params.cusName;
      });
    },
    // 是否占用第三方额度，选择为是时，第三方合作协议编号、合作方客户名称才显示且必输；
    // 此时，可选取需要占用的第三方授信合同协议。点击选取时，弹出第三方合同协议选取界面。
    isShowTrdLmtAmt (value) {
      if (value == '1') {
        this.isShowTrdDataFlg = true;
      } else {
        this.isShowTrdDataFlg = false;
      }
    },
    // 银团贷款
    isShowByPrdIdFunc (value1, value2) {
      // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
      if (value1 != '012020') {
        this.isReqByBankPrdName = false;
        this.isShowByPrdId = false;
      } else {
        this.isReqByBankPrdName = true;
        this.isShowByPrdId = true;
      }
      // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
      // 根据老信贷字典项文档中，并未找到 非牵头行 选项
      if (value2 == '0') {
        this.isReqByBankRole = true;
      } else {
        this.isReqByBankRole = false;
      }
      // 并购内容，当产品为并购贷款时才显示且必输，否则整块隐藏且非必输。
      if (value1 != '14030101') {
        this.isShowMergerPanel = false;
        this.isMerger = false;
        document.getElementById('MergerPanel15').style.display = 'none';
      } else {
        this.isShowMergerPanel = true;
        this.isMerger = true;
        document.getElementById('MergerPanel15').style.display = 'block';
      }
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighAvlAmt = _this.$refs.refForm.formdata.contHighAvlAmt;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        _this.formdata.contHighAvlAmt = '';
      } else if (parseFloat(contAmt) > parseFloat(contHighAvlAmt)) {
        _this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本合同项下可用信金额最高不超过' + contHighAvlAmt + '元。';
      }
      _this.formdata.cvtCnyAmt = parseFloat(contHighAvlAmt) * _this.formdata.appRate;
    },
    // 校验合同期限
    termChange (value) {
      var _this = this;
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日需大于合同起始日'); // 弹出提示
        this.formdata.contTerm = '';
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
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    // 表单只读
    viewFormPage () {
      // 流程进入
      if (this.op == 'VIEW' || this.op == 'view') {
        this.isDisabledFlg = true;
      }
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

    // 根据币种得到对应的汇率
    getCurTypeRate: function (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        let rqData = {};
        rqData['curType'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.appRate = response.data.rate;
              this.formdata.cvtCnyAmt = parseFloat(this.formdata.contHighAvlAmt) * this.formdata.appRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              this.formdata.contHighAvlAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            this.formdata.contHighAvlAmt = '';
            return;
          }
        });
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
