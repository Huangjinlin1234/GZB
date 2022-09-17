<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="op" v-model="formdata" >
      <yu-panel title="协议基本信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" hidden ></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="input" placeholder="合作方类型" name="partnerType" hidden ></yu-xform-item>
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" hidden ></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" hidden ></yu-xform-item>
          <yu-xform-item label="合作类型" ctype="input" placeholder="合作类型" name="coopType" hidden ></yu-xform-item>

          <yu-xform-item label="协议编号" ctype="input" placeholder="协议编号" name="coopAgrNo"  disabled required></yu-xform-item>
          <yu-xform-item label="协议金额" ctype="yu-num" name="coopAgrAmt" placeholder="协议金额"  number-formatter="0,000.00" required :rules="amtRules" v-if="showCoopAgrAmt"></yu-xform-item>
          <yu-xform-item label="协议起始日" ctype="datepicker" name="coopAgrStartDate" value-format="yyyy-MM-dd" :rules="startDateRules" placeholder="合作协议起始日" required></yu-xform-item>
          <yu-xform-item label="协议到期日" ctype="datepicker" name="coopAgrEndDate" value-format="yyyy-MM-dd" :rules="endDateRules" placeholder="合作协议到期日" required></yu-xform-item>
          <yu-xform-item label="协议签订日期" ctype="datepicker" name="coopAgrSignDate" value-format="yyyy-MM-dd" :rules="startDateRules" placeholder="合作协议签订日期" ></yu-xform-item>
          <yu-xform-item label="合作方协议操作类型" v-show="!isFromAcc"  ctype="select" placeholder="合作方协议操作类型" name="coopAgrOprType" data-code="STD_COOP_PLAN_OPR_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="协议状态" v-if="isFromAcc"  ctype="select" placeholder="协议状态" name="agrStatus" data-code="COOP_PARTNER_AGR_STS" disabled></yu-xform-item>

          <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" hidden ></yu-xform-item>
          <yu-xform-item label="合作方案申请流水号" ctype="input" placeholder="合作方案申请流水号" name="coopPlanSerno" hidden ></yu-xform-item>
          <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" hidden ></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden ></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden ></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
        <d1-b-b-b-a-billlist ref="d1_B_B_B_A_BillList" :operate="op" source="agr" v-show="partnerType === '2'" ></d1-b-b-b-a-billlist>
        <coopReplyAccProList ref="coopReplyAccProList" :operate="op" source="agr" v-show="partnerType === '1'" ></coopReplyAccProList>
        <coopAgrList4Resign ref="coopAgrList4Resign" :operate="op" source="agr" v-show="coopAgrOprType === '3'" ></coopAgrList4Resign>
         <yu-panel title="一般担保额度信息" panel-type="simple" v-if="partnerType === '2'">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否一般担保额度"  v-if="isFromAcc === false " ctype="select"  name="isCommonGrtLmtAmt" placeholder="是否一般担保额度" data-code="STD_ZB_YES_NO" :rules="[{required:true,message:'字段不能为空',trigger:'blur'}]" @change="isCommonGrtLmtAmtChange"></yu-xform-item>
            <yu-xform-item label="一般担保额度(元)" ctype="yu-num"  maxlength="14" number-formatter="0,000.00" name="commonGrtLmtAmt"  :rules="[{required:commonGrtLmtAmtRequired,message:'字段不能为空',trigger:'blur'}]" placeholder="一般担保额度(元)" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="保证金信息" panel-type="simple" v-if="partnerType !== '6' && partnerType !== '7' && partnerType !== '9' && partnerType !== '10' && partnerType !== '11' && partnerType !== '13' && partnerType !== '14' && partnerType !== '12'">
          <yu-xform-group :column="2">
            <yu-xform-item label="保证金比例(%)" ctype="yu-num" :multiple="100" placeholder="保证金比例(%)" maxlength="5" name="bailPerc" rules="required" @blur="changNum"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="保证金账户最低金额(元)" ctype="yu-num" maxlength="14"  number-formatter="0,000.00" name="bailAccLowAmt" :rules="[{required:bailAccLowAmtRequired,message:'字段不能为空',trigger:'blur'}]" placeholder="保证金账户最低金额(元)" @blur="bailAccLowAmtChg" :hidden="bailAccLowAmtHidden"></yu-xform-item>
            <yu-xform-item label="单笔最低缴存金额(元)" ctype="yu-num" maxlength="14"  number-formatter="0,000.00" name="sigLowDepositAmt" :rules="[{required:sigLowDepositAmtRequired,message:'字段不能为空',trigger:'blur'}]" placeholder="单笔最低缴存金额(元)" :hidden="sigLowDepositAmtHidden"></yu-xform-item>
            <yu-xform-item label="保证金透支上限(元)" ctype="yu-num" maxlength="14" number-formatter="0,000.00" name="bailOverdraftMax" hidden placeholder="保证金透支上限(元)" ></yu-xform-item>
            <yu-xform-item label="保证金缴存方式" ctype="select" placeholder="保证金缴存方式" name="bailDepositMode" :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" data-code="STD_BAIL_DEPOSIT_MODE"></yu-xform-item>
            <yu-xform-item label="保证金账号" ctype="input" maxlength="60" placeholder="保证金账号" name="bailAccNo"  :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" :disabled="bailAccNoDisabled"></yu-xform-item>
            <!-- <yu-xform-item label="保证金账号" ctype="input" maxlength="60" placeholder="保证金账号" name="bailAccNo" :colspan="10"  :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" :disabled="bailAccNoDisabled"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2" v-if="op!='details'">
              <yu-button type="primary" @click="queryBailAccNo">联机查询</yu-button>
            </yu-xform-item> -->
            <yu-xform-item label="保证金账号子序号" ctype="input" maxlength="60" :props="props" placeholder="保证金账号子序号" :options="options" name="bailAccNoSubSeq" @change="accNoChange" :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]" :disabled="bailAccNoSubSeqDisabled"></yu-xform-item>
            <yu-xform-item label="当前保证金金额(元)" ctype="yu-num" maxlength="14" number-formatter="0,000.00" name="bailAccNoAmt" placeholder="当前保证金金额(元)"  :rules="[{required:isBailRequired,message:'字段不能为空',trigger:'blur'}]"></yu-xform-item>
            <yu-xform-item label="保证金是否足额" ctype="select" data-code="STD_ZB_YES_NO" name="bailAccYesNo" v-model="bailAccYesNo"  placeholder="请选择" disabled :hidden="true"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="审批状态" v-show="!isFromAcc" ctype="select" name="apprStatus" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" required disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" placeholder="登记日期" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="op!='details'" @click="saveFn">保存</yu-button>
      <yu-button type="primary" v-if="op!='details'" @click="commitFn">提交</yu-button>
      <yu-button type="primary" @click="backFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
// import d1BBBABilllist from '../coopPlanApp/cooPlanAppInfo_d1_B_B_B_A_BillList.vue';
import d1BBBABilllist from '../coopReplyAgrSub/coopReplyAgrSubList.vue';
import coopAgrList4Resign from '../coopPartnerAgrApp/coopAgrList4Resign.vue';
import coopReplyAccProList from '../coopReplyAccPro/coopReplyAccProList.vue';
export default {
  components: {yufpNwfInit, d1BBBABilllist, coopAgrList4Resign, coopReplyAccProList},
  props: {
    pageData: {
      type: Object,
      default: null
    },
    isFromAcc: Boolean
  },
  data: function () {
    return {
      op: '',
      updateUrl: this.$backend.cmisBiz + '/api/cooppartneragrapp/update',
      queryUrl: this.$backend.cmisBiz + '/api/cooppartneragrapp/query',
      queryAccUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/query',
      formdata: {},
      amtRules: [{validator: this.checkAmt, trigger: 'blur'}],
      startDateRules: [{validator: this.checkStartDate}, {required: true, message: '字段不能为空'}],
      endDateRules: [{validator: this.checkEndDate}],
      showCoopAgrAmt: true,
      partnerType: '',
      coopAgrOprType: '',
      bailAccYesNo: '',
      props: {
        key: 'zhhaoxuh',
        value: 'zhhaoxuh'
      },
      options: [],
      selectedAccData: {},
      isBailRequired: false,
      commonGrtLmtAmtRequired: false,
      bailAccLowAmtHidden: false,
      sigLowDepositAmtHidden: false,
      bailAccLowAmtRequired: false,
      sigLowDepositAmtRequired: false,
      bailAccNoDisabled: false,
      bailAccNoSubSeqDisabled: false
    };
  },
  created () {
    // this.formdata.coopPlanSerno = this.$xutils.getDefaultformulaData('getSequence(LMT_COOP_CTR_NO)');
    this.op = this.pageData.op;
    this.partnerType = this.pageData.partnerType;
  },
  mounted () {
    let partnerType = this.pageData.partnerType;
    if (partnerType == '10' || partnerType == '12' || partnerType == '13' || partnerType == '14' || partnerType == '6' || partnerType == '7' || partnerType == '9' || partnerType == '11') {
      // 合作方类型=仓储公司/网金业务合作方/律师事务所/其他合作方/旅游公司/物联网动产贷交易台归属方/监管公司/押品评估机构，合作方协议申请、变更续签，无协议金额
      // key":"10","value":"仓储公司 "key":"12","value":"网金业务合作方","key":"13","value":"律师事务所","key":"14","value":"其他合作方","key":"6","value":"旅游公司"
      // "key":"7","value":"物联网动产贷交易平台归属方" "key":"9","value":"监管公司" "key":"11","value":"押品评估机构"
      this.showCoopAgrAmt = false;
    }
    if (this.pageData.serno && !this.isFromAcc) {
      this.queryDataFn(this.pageData.serno);
      this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.pageData.serno + '\'');
      this.$refs.coopAgrList4Resign.queryDataByCondition('serno=\'' + this.pageData.serno + '\'');
      this.$refs.coopReplyAccProList.queryDataByCondition('serno=\'' + this.pageData.serno + '\'');
    }
    if (this.pageData.coopAgrNo && this.isFromAcc) {
      this.queryAccDataFn(this.pageData.coopAgrNo);
      this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.pageData.serno + '\'');
      this.$refs.coopAgrList4Resign.queryDataByCondition('serno=\'' + this.pageData.serno + '\'');
      this.$refs.coopReplyAccProList.queryDataByCondition('serno=\'' + this.pageData.serno + '\'');
    }
    if (!this.getMyPagrentPage(this).getCoopPlanData().totlCoopLmtAmt) {
      this.showCoopAgrAmt = false;
    }
    if (this.pageData.bailPerc > 0) {
      this.isBailRequired = true;
      if (this.pageData.partnerType != '1') {
        this.bailAccLowAmtRequired = true;
        this.sigLowDepositAmtRequired = true;
      }
      this.bailAccNoDisabled = false;
      this.bailAccNoSubSeqDisabled = false;
    } else {
      this.isBailRequired = false;
      this.bailAccNoDisabled = true;
      this.bailAccNoSubSeqDisabled = true;
    }
    // 是否一般担保额度，是则一般担保额度必填
    if (this.pageData.isCommonGrtLmtAmt == '1') {
      this.commonGrtLmtAmtRequired = true;
    } else {
      this.commonGrtLmtAmtRequired = false;
    }
    if (this.pageData.partnerType == '1') {
      this.bailAccLowAmtHidden = true;
      this.sigLowDepositAmtHidden = true;
    }
    if (this.getMyPagrentPage(this).param.partnerType == '1') {
      this.bailAccLowAmtHidden = true;
      this.sigLowDepositAmtHidden = true;
    }
  },
  methods: {
    queryBailAccNo () {
      if (this.formdata.partnerType != '1') {
       // if (this.formdata.bailAccLowAmt == null) {
       //   this.$xutils.showMsgBox('提示', '请填写保证金账号最低金额', 400, 300);
        //  return false;
       // }
      }

      const _this = this;
    //  if (!_this.formdata.bailAccNo) {
     //   this.$xutils.showMsgBox('提示', '请填写保证金账号', 400, 300);
     //   return false;
     // }
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/coopplanapp/queryBail',
        data: JSON.stringify({bailAccNo: _this.formdata.bailAccNo}),
        success: (response, status, xhr) => {
          // 挡板
            /*          response = {code : '0', total : '0', message : null, level : null, data : {bblujing : '', chaxfanw : '', kehuhaoo : '8400176782', kehuzhmc : '保证金-', list : [
            {beiyye01 : null, beiyye02 : null, beiyye03 : null, beiyzd01 : '', beiyzd02 : '', beiyzd03 : '主账户层', cenjleix : '0', chanpshm : '单位保证金活期存款-按季结息', chaohubz : 'x', chapbhao : 'DGBH001', cunkzlei : '06', cunqiiii : '0D', doqiriqi : '', glpinzbz : '0', huobdaih : '01', kaihguiy : '74010285', kaihjigo : '017401', kaihriqi : '20210630', kehuzhao : '8010188811613', kehuzhlx : 'A', keyonedu : null, keyongye : '0.00', qixiriqi : '20210630', yegxriqi : '20210630', yezztbbz : '0', zhanghao : '20011781071', zhanghye : '0.00', zhhaoxuh : '10000000', zhhufenl : 'ZZZ', zhhuztai : 'A', zhhuzwmc : '保证金-', zhshuxin : 'ZZZ', zhxililv : '0.3000000'},
                {beiyye01 : null, beiyye02 : null, beiyye03 : null, beiyzd01 : '', beiyzd02 : '', beiyzd03 : '管理账户层', cenjleix : '1', chanpshm : '单位保证金活期存款-按季结息', chaohubz : 'x', chapbhao : 'DGBH001', cunkzlei : '06', cunqiiii : '0D', doqiriqi : '', glpinzbz : '0', huobdaih : '01', kaihguiy : '74010285', kaihjigo : '017401', kaihriqi : '20210630', kehuzhao : '8010188811613', kehuzhlx : 'A', keyonedu : null, keyongye : '0.00', qixiriqi : '20210630', yegxriqi : '20210630', yezztbbz : '0', zhanghao : '20011781072', zhanghye : '0.00', zhhaoxuh : '20100001', zhhufenl : 'ZZZ', zhhuztai : 'A', zhhuzwmc : '保证金-', zhshuxin : 'ZZZ', zhxililv : '0.3000000'},
                {beiyye01 : null, beiyye02 : null, beiyye03 : null, beiyzd01 : '', beiyzd02 : '', beiyzd03 : '实体账户层', cenjleix : '2', chanpshm : '单位保证金活期存款-按季结息', chaohubz : 'x', chapbhao : 'DGBH001', cunkzlei : '06', cunqiiii : '0D', doqiriqi : '', glpinzbz : '0', huobdaih : '01', kaihguiy : '74010285', kaihjigo : '017401', kaihriqi : '20210630', kehuzhao : '8010188811613', kehuzhlx : 'A', keyonedu : null, keyongye : '0.00', qixiriqi : '20210630', yegxriqi : '20210630', yezztbbz : '1', zhanghao : '20011781073', zhanghye : '0.00', zhhaoxuh : '30100000', zhhufenl : '0101', zhhuztai : 'A', zhhuzwmc : '保证金-', zhshuxin : 'XXX', zhxililv : '0.3000000'}],
              lstacctinfo : null, zongbshu : '3'}, i18nData : null, extData : null, erorcd : '0000', erortx : null };*/
          if (response.code == 0) {
            // 接口调不通，自己模拟处理数据
            const cusId = response.data.kehuhaoo;
           // if (cusId !== _this.formdata.partnerNo) {
            //  _this.$xutils.showMsgBox('提示', '保证金账号和合作方编号不匹配', 400, 300);
            //  return;
           // }
            const list = response.data.list;
            if (list && list.length == 0) {
              _this.formdata.bailAccNoSubSeq = '';
              _this.formdata.bailAccYesNo = '';
              _this.formdata.bailAccNoAmt = '';
            //  _this.$xutils.showMsgBox('提示', '未查询到保证金账户信息', 400, 300);
            }
            _this.options = response.data.list;
            if (_this.formdata.bailAccNoSubSeq) {
              _this.options.forEach(item => {
                const keyongye = item.keyongye;
                const zhhaoxuh = item.zhhaoxuh;
                if (_this.formdata.bailAccNoSubSeq == zhhaoxuh) {
                  _this.selectedAccData = item;
                  _this.formdata.bailAccNoAmt = keyongye;
                  let bailAccLowAmt = _this.formdata.bailAccLowAmt + '' || '0';
                  bailAccLowAmt = bailAccLowAmt.replace(new RegExp(',', 'gm'), '');
                  if (Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye)) {
                    _this.bailAccYesNo = '0';
                  } else {
                    _this.bailAccYesNo = '1';
                  }
                }
              });
            }
          } else {
           // _this.formdata.bailAccNoSubSeq = '';
           // _this.bailAccYesNo = '';
           // _this.formdata.bailAccNoAmt = '';
           // _this.$xutils.showMsgBox('提示', '未查询到保证金账户信息', 400, 300);

             _this.formdata.bailAccNoSubSeq = '1111';
             _this.bailAccYesNo = '1';
             _this.formdata.bailAccNoAmt = '1';
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox('提示', result.erortx, 400, 300);
        }
      });
    },
    accNoChange (value) {
      const list = this.options;
      const _this = this;
      list && list.forEach(item => {
        const keyongye = item.keyongye;
        const zhhaoxuh = item.zhhaoxuh;
        if (value == zhhaoxuh) {
          _this.selectedAccData = item;
          _this.formdata.bailAccNoAmt = keyongye;
          let bailAccLowAmt = _this.formdata.bailAccLowAmt || '0';
          bailAccLowAmt = bailAccLowAmt.replace(new RegExp(',', 'gm'), '');
          if (Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye)) {
            _this.bailAccYesNo = '0';
          } else if (!(Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye))) {
            _this.bailAccYesNo = '1';
          }
        }
      });
    },
    bailAccLowAmtChg () {
      if (!this.formdata.bailAccLowAmt) {
        return false;
      }
      const bailAccLowAmt = this.formdata.bailAccLowAmt.replace(new RegExp(',', 'gm'), '');
      if (!this.formdata.bailAccNoAmt) {
        return false;
      }
      const keyongye = this.selectedAccData.keyongye;
      if (!keyongye) {
        return false;
      }
      if (Number.parseFloat(bailAccLowAmt) > Number.parseFloat(keyongye)) {
        this.bailAccYesNo = '0';
      } else {
        this.bailAccYesNo = '1';
      }
    },
    checkStartDate (rule, value, callback) {
      var partnerType = this.formdata.partnerType;
      if (partnerType == 1 || partnerType == 2 || partnerType == 5 || partnerType == 12 || partnerType == 3 || partnerType == 4 || partnerType == 8 || partnerType == 15) {
        if (value < this.getMyPagrentPage(this).getCoopPlanData().coopStartDate || value > this.getMyPagrentPage(this).getCoopPlanData().coopEndDate) {
          callback(new Error('必须大于等于“合作起始日”且小于等于“合作到期日”'));
        }
      } else {
        if (!(this.formdata.coopAgrEndDate >= this.formdata.coopAgrStartDate && this.formdata.coopAgrStartDate >= this.formdata.coopAgrSignDate)) {
          callback(new Error('必须满足\'协议到期日\'大于等于\'协议起始日\'大于等于\'协议签订日\''));
        }
      }
      callback();
    },
    checkEndDate (rule, value, callback) {
      var partnerType = this.formdata.partnerType;
      if (partnerType == 1 || partnerType == 2 || partnerType == 5 || partnerType == 12 || partnerType == 3 || partnerType == 4 || partnerType == 8 || partnerType == 15) {
        if (value < this.formdata.coopAgrStartDate || value > this.getMyPagrentPage(this).getCoopPlanData().coopEndDate) {
          callback(new Error('必须大于等于“协议起始日”且小于等于“合作到期日”'));
        }
      }
      callback();
    },
    checkAmt (rule, value, callback) {
      const _this = this;
      if (!value && value == '') {
        callback(new Error('请输入协议金额'));
      } else {
        let jsonData = {
          partnerType: this.getMyPagrentPage(this).getCoopPlanData().partnerType,
          partnerNo: this.getMyPagrentPage(this).getCoopPlanData().partnerNo,
          coopAgrAmt: value,
          coopPlanNo: this.getMyPagrentPage(this).getCoopPlanData().coopPlanNo,
          coopAgrNo: this.formdata.coopAgrNo,
          serno: this.formdata.serno
        };
        _this.$xutils.request({
          async: false,
          type: 'POST',
          url: _this.$backend.cmisBiz + '/api/cooppartneragrapp/checkAmt',
          data: jsonData,
          success: (response, status, xhr) => {
            if (response.code == 0) {
              callback();
            } else {
              callback(new Error(response.erortx));
            }
          },
          error: (result, status, errorThrown) => {
          }
        });
      }
    },
    validateAptiLice () {
      let data = this.getMyPagrentPage(this).$refs.coopPlanAptiPage.$refs.d1_BillList.$refs.refTable.tabledata;
      if (data.length === 0) {
        this.$xutils.showMsgBox('提示', '请先录入资质信息');
        return false;
      }
      for (let i = 0; i < data.length; i++) {
        let aptiLiceEndDate = data[i].aptiLiceEndDate;
        const date = this.$xutils.getDefaultformulaData('$CURRDATE');
        if (aptiLiceEndDate < date) {
          this.$xutils.showMsgBox('提示', '资质' + data[i].liceName + '已到期，请先更新资质信息');
          return false;
        }
      }
      return true;
    },
    commitFn () {
      this.saveFn(function () {
        let loginUser = this.$xutils.getLoginUserInfo();
        const rowData = this.formdata;
        const orgType = loginUser.org.orgType;
        let bizType = '';
        // if (orgType == '') {
        //   this.$xutils.showMsgBox('提示', '机构类型未添加(总行/支行),请联系管理员');
        //   return false;
        // }
        if (this.partnerType == '2') {
          var bailAccNo = this.formdata.bailAccNo;// 保证金账号
          var bailAccNoSubSeq = this.formdata.bailAccNoSubSeq;// 保证金账号子序号
          // var bailAccNoAmt = this.formdata.bailAccNoAmt;//当前保证金金额(元)
          // 保证金比例
          var bailPerc = this.formdata.bailPerc;
          if (bailPerc > 0) {
            if (!(bailAccNo && bailAccNoSubSeq)) {
              this.$xutils.showMsgBox('提示', '<专业担保公司>必须录入保证金账号、保证金账号子序号信息！');
              return;
            }
          }
        }
        // 合作方为律师类型无资质信息tab 无需校验
        if (this.partnerType != '13') {
          if (!this.validateAptiLice()) {
            return false;
          };
        }
        // 必须要新增项目信息后才可以提交
        if (this.partnerType == '1') {
          let data = this.$refs.coopReplyAccProList.$refs.refTable.tabledata;
          if (data.length === 0) {
            this.$xutils.showMsgBox('提示', '请先录入项目信息');
            return false;
          }
        }
        // 获取登录用户岗位信息
        var duty = '';
        const dutys = loginUser.dutys;
        if(dutys != null){
            for (let i = 0; i < dutys.length; i++) {
            // 如果是SGH01（寿光客户经理）或DHH01（东海客户经理），则是村镇银行客户经理)
            if (dutys[i].code == 'SGH01' || dutys[i].code == 'DHH01') {
              duty = dutys[i].code;
              break;
            }
          }
        }

        if (rowData.coopAgrOprType == '1' && orgType == 0) {
        // HZ007 总行部门-新增
          bizType = 'HZ007';
        } else if (rowData.coopAgrOprType == '1' && orgType != 0 && orgType != 'A') {
        // HZ005 分支机构-新增
          bizType = 'HZ005';
        } else if ((rowData.coopAgrOprType == '2') && orgType == 0) {
        // HZ008 总行部门-变更
          bizType = 'HZ008';
        } else if (rowData.coopAgrOprType == '3' && orgType == 0) {
        // HZ019 总行部门-续签
          bizType = 'HZ019';
        } else if (rowData.coopAgrOprType == '2' && orgType != 0 && orgType != 'A') {
        // HZ006 分支机构-变更
          bizType = 'HZ006';
        } else if (rowData.coopAgrOprType == '3' && orgType != 0 && orgType != 'A') {
        // HZ018 分支机构-续签
          bizType = 'HZ018';
        }else if (rowData.coopAgrOprType == '1' && loginUser.org.code.substring(0, 2) == '80' && orgType == 'A' && duty == 'SGH01') {
        // 寿光村镇 -新增 合作协议新增申请-分支机构（寿光）
          bizType = 'SGB03';
        } else if (rowData.coopAgrOprType == '1' && loginUser.org.code.substring(0, 2) == '80' && orgType == 'A') {
        // 合作协议新增申请-普惠金融部（寿光）
          bizType = 'SGB10';
        } else if (rowData.coopAgrOprType == '2' && loginUser.org.code.substring(0, 2) == '80' && orgType == 'A' && duty == 'SGH01') {
        // 寿光村镇 -变更 合作协议变更申请-分支机构（寿光）
          bizType = 'SGB04';
        } else if (rowData.coopAgrOprType == '2' && loginUser.org.code.substring(0, 2) == '80' && orgType == 'A') {
        // 寿光村镇 -变更 合作协议变更申请-普惠金融部（寿光）
          bizType = 'SGB11';
        }else if (rowData.coopAgrOprType == '3' && loginUser.org.code.substring(0, 2) == '80' && orgType == 'A' && duty == 'SGH01') {
        // 寿光村镇 -续签
          bizType = 'SGB05';
        } else if (rowData.coopAgrOprType == '3' && loginUser.org.code.substring(0, 2) == '80' && orgType == 'A') {
        // 寿光村镇 -续签 合作协议续签申请-普惠金融部（寿光）
          bizType = 'SGB12';
        } else if (rowData.coopAgrOprType == '1' && loginUser.org.code.substring(0, 2) == '81' && orgType == 'A' && duty == 'DHH01') {
        // 东海村镇 -新增 合作协议新增申请-分支机构（东海）
          bizType = 'DHB03';
        } else if (rowData.coopAgrOprType == '1' && loginUser.org.code.substring(0, 2) == '81' && orgType == 'A') {
        // 东海村镇 -新增 合作协议新增申请-普惠金融部（东海）
          bizType = 'DHB10';
        } else if (rowData.coopAgrOprType == '2' && loginUser.org.code.substring(0, 2) == '81' && orgType == 'A' && duty == 'DHH01') {
        // 东海村镇 -变更 合作协议变更申请-分支机构（东海）
          bizType = 'DHB04';
        } else if (rowData.coopAgrOprType == '2' && loginUser.org.code.substring(0, 2) == '81' && orgType == 'A') {
        // 东海村镇 -变更 合作协议变更申请-普惠金融部（东海）
          bizType = 'DHB11';
        } else if (rowData.coopAgrOprType == '3' && loginUser.org.code.substring(0, 2) == '81' && orgType == 'A' && duty == 'DHH01') {
        // 东海村镇 -续签
          bizType = 'DHB05';
        } else if (rowData.coopAgrOprType == '3' && loginUser.org.code.substring(0, 2) == '81' && orgType == 'A') {
        // 东海村镇 -续签
          bizType = 'DHB12';
        }
        const partnerType = rowData.partnerType;
        const apprStatus = rowData.apprStatus;
        const coopAgrOprType = rowData.coopAgrOprType;
        // 项目类型
        var proType = '1';
        if (this.partnerType == '1') {
          var coopPlanProArray = this.$refs.coopReplyAccProList.getAllData();
          if (coopPlanProArray != null && coopPlanProArray.length > 0) {
            proType = coopPlanProArray[0].proType;
          }
        }
        const startdto = {
          'systemId': 'cmis',
          'orgId': loginUser.org.code,
          'bizId': rowData.serno,
          'bizType': bizType,
          'userId': loginUser.loginCode,
          'bizUserName': rowData.partnerName,
          'bizUserId': rowData.partnerNo,
          'param': {
            coopPlanNo: rowData.coopPlanNo,
            partnerType: partnerType,
            apprStatus: apprStatus,
            orgType: orgType,
            coopAgrOprType: coopAgrOprType,
            proType: proType
          }
        };
        this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    getMyPagrentPage (me) {
      if (me.$parent.getCoopPlanData) {
        return me.$parent;
      } else {
        return this.getMyPagrentPage(me.$parent);
      }
    },
    saveFn (callbackFn) {
      // 校验必输
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const nowdate = this.$xutils.getDefaultformulaData('$CURRDATE');
      if (this.formdata.coopAgrEndDate < nowdate) {
        this.$xutils.showMsgBox('提示', '必须满足"协议到期日"大于"当前日期"');
        return;
      }
      this.$request({
        url: this.updateUrl,
        method: 'POST', // 默认get请求
        data: this.formdata
      }).then((response) => {
        if (response.code == '0' && response.data) {
          this.$message({ message: '保存成功', type: 'info' });
          if (typeof callbackFn === 'function') {
            callbackFn.call(this);
          }
        } else {
          this.$message({ message: '保存失败', type: 'error' });
        }
      }).catch((e) => {
        // 处理请求失败的情况
        this.$message({ message: '保存合作方协议基础信息失败', type: 'error' });
      });
    },
    backFn () {
      yufp.frame.removeTab(this.$route.path);
    },
    submitSuccess () {
      yufp.frame.removeTab(this.$route.path);
    },
    queryDataFn (sernoParam) {
      let _this = this;
      this.$request({
        url: this.queryUrl,
        method: 'post', // 默认get请求
        data: {condition: JSON.stringify({
          serno: sernoParam
        })}
      }).then((response) => {
        if (response.code == '0' && response.data[0]) {
          yufp.clone(response.data[0], _this.formdata);
          _this.partnerType = response.data[0].partnerType;
          _this.coopAgrOprType = response.data[0].coopAgrOprType;
          // if (this.formdata.bailAccLowAmt && this.formdata.bailAccNo) {
          //   this.queryBailAccNo();
          // }
          if (this.formdata.bailAccNo) {
            this.queryBailAccNo();
          }
        } else if (_this.$route.meta.params) {
          yufp.clone(_this.$route.meta.params, _this.formdata);
          _this.partnerType = _this.$route.meta.params.partnerType;
          _this.coopAgrOprType = _this.$route.meta.params.coopAgrOprType;
          // if (this.formdata.bailAccLowAmt && this.formdata.bailAccNo) {
          //   this.queryBailAccNo();
          // }
          if (this.formdata.bailAccNo) {
            this.queryBailAccNo();
          }
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求合作方协议基础信息失败', type: 'error' });
      });
    },
    queryAccDataFn (coopAgrNoParam) {
      let _this = this;
      this.$request({
        url: this.queryAccUrl,
        method: 'post', // 默认get请求
        data: {condition: JSON.stringify({
          coopAgrNo: coopAgrNoParam
        })}
      }).then((response) => {
        if (response.code == '0' && response.data) {
          var resultData = response.data[0];
          yufp.clone(resultData, _this.formdata);
          if (resultData.bailAccNo) {
            this.queryBailAccNo();
          }
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求合作方协议基础信息失败', type: 'error' });
      });
    },
    // /**
    //  * 特殊限额新增
    //  **/
    // quotaInsert () {
    //   // 将合作方编号传递过去，新增时增加级联关系
    //   const json = {
    //     coopPlanSerno: this.formdata.coopPlanSerno,
    //     coopPlanNo: this.formdata.coopPlanNo,
    //     // oprType: this.param.oprType,
    //     operate: 'ADD'
    //   };
    //   this.$dialog.open(
    //     '合作方分项选取',
    //     'bizmanage/coopBiz/coopPartnerAgrApp/coopPlanEspecQuoteCtrlList',
    //     800,
    //     500,
    //     json,
    //     () => {
    //       this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
    //     }
    //   );
    // },

    /**
     * 特殊限额新增
     **/
    quotaInsert () {
      // 将合作方编号传递过去，新增时增加级联关系
      const json = {
        coopPlanSerno: this.formdata.coopPlanSerno,
        coopPlanNo: this.formdata.coopPlanNo,
        serno: this.formdata.serno,
        // oprType: this.param.oprType,
        operate: 'ADD'
      };
      this.$dialog.open(
        '合作方分项选取',
        'bizmanage/coopBiz/coopReplyAccSub/coopReplyAccSubIndex',
        800,
        500,
        json,
        () => {
          this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
        }
      );
    },
    // /**
    //   * 方案特殊限额修改
    //   **/
    // quotaUpdate () {
    //   let appMoney = this.$refs.d1_B_B_B_A_BillList.$refs.refTable.tabledata;
    //   let singlePrdCoopLmtAll = 0.0;
    //   for (let i = 0; i < appMoney.length; i++) {
    //     singlePrdCoopLmtAll += appMoney[i].singlePrdCoopLmt;
    //   }
    //   const row = this.$refs.d1_B_B_B_A_BillList.getSelectedRowData();
    //   if (!row) {
    //     this.$xutils.showMsgBox('提示', '请选择一条数据');
    //     return false;
    //   }
    //   // 标记更新
    //   row.operate = 'UPDATE';
    //   row['singlePrdCoopLmtAll'] = singlePrdCoopLmtAll;
    //   this.$dialog.open(
    //     '特殊限额修改',
    //     'bizmanage/coopBiz/coopPlanApp/cooPlanQuataIndex',
    //     800,
    //     260,
    //     row,
    //     () => {
    //       this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
    //     }
    //   );
    // },


    /**
      * 方案特殊限额修改
      **/
    quotaUpdate () {
      let appMoney = this.$refs.d1_B_B_B_A_BillList.$refs.refTable.tabledata;
      let singlePrdCoopLmtAll = 0.0;
      for (let i = 0; i < appMoney.length; i++) {
        singlePrdCoopLmtAll += appMoney[i].singlePrdCoopLmt;
      }
      const row = this.$refs.d1_B_B_B_A_BillList.getSelectedRowData();
      if (!row) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      row.oprType = '02';
      // 标记更新
      row.operate = 'UPDATE';
      row['singlePrdCoopLmtAll'] = singlePrdCoopLmtAll;
      let serno = row.serno;
      this.$dialog.open(
        '特殊限额修改',
        'bizmanage/coopBiz/coopReplyAccSub/coopReplyAccSubIndex',
        800,
        260,
        row,
        () => {
          this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + serno + '\'');
        }
      );
    },


    /**
     * 方案特殊限额删除
     **/
    quataDelete () {
      const rowData = this.$refs.d1_B_B_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.quataDeleteAfter();
        }
      });
    },
    // /**
    //  * 方案特殊限额删除
    //  **/
    // quataDeleteAfter () {
    //   const rowData = this.$refs.d1_B_B_B_A_BillList.getSelectedRowData();
    //   this.$xutils.request({
    //     url: this.$backend.cmisBiz + '/api/coopplanespecquotactrl/delete/' + rowData.pkId,
    //     type: 'POST',
    //     async: true,
    //     success: (response, status, xhr) => {
    //       if (response.code == 0) {
    //         this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
    //         this.$xutils.showMsgBox('提示', '删除成功');
    //       }
    //     }
    //   });
    // },

    /**
     * 方案特殊限额删除
     **/
    quataDeleteAfter () {
      const rowData = this.$refs.d1_B_B_B_A_BillList.getSelectedRowData();
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyagrsub/delete?pkId=' + rowData.pkId + '&replyNo=' + rowData.replyNo,
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.$refs.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },
    /**
     * 协议选取
     **/
    agrInsert () {
      // 将合作方编号传递过去，新增时增加级联关系
      const json = {
        coopPlanSerno: this.formdata.coopPlanSerno,
        coopPlanNo: this.formdata.coopPlanNo,
        // oprType: this.param.oprType,
        operate: 'ADD'
      };
      this.$dialog.open(
        '合作方协议选取',
        'bizmanage/coopBiz/coopPartnerAgrApp/coopPartnerAgrAppIndex4Resign',
        1300,
        700,
        json,
        () => {
          this.$refs.coopAgrList4Resign.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
        }
      );
    },
    /**
     * 协议删除
     **/
    agrDelete () {
      const rowData = this.$refs.coopAgrList4Resign.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.agrDeleteAfter();
        }
      });
    },
    /**
     * 协议删除
     **/
    agrDeleteAfter () {
      const rowData = this.$refs.coopAgrList4Resign.getSelectedRowData();
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/cooppartneragraddrel/delete/' + rowData.coopAgrSerno,
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.$refs.coopAgrList4Resign.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },

    /**
     * 项目新增
     **/
    quotaProInsert () {
      // 将合作方编号传递过去，新增时增加级联关系
      let json = {
        coopPlanSerno: this.formdata.coopPlanSerno,
        coopPlanNo: this.formdata.coopPlanNo,
        serno: this.formdata.serno,
        // oprType: this.param.oprType,
        operate: 'ADD'
      };
      this.$dialog.open(
        '项目信息',
        'bizmanage/coopBiz/coopReplyAccPro/coopReplyAccProIndex',
        800,
        500,
        json,
        () => {
          this.$refs.coopReplyAccProList.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
        }
      );
    },

    /**
      * 项目修改
      **/
    quotaProUpdate () {
      let appMoney = this.$refs.coopReplyAccProList.$refs.refTable.tabledata;
      let singlePrdCoopLmtAll = 0.0;
      for (let i = 0; i < appMoney.length; i++) {
        singlePrdCoopLmtAll += appMoney[i].singlePrdCoopLmt;
      }
      const row = this.$refs.coopReplyAccProList.getSelectedRowData();
      if (!row) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      row.oprType = '02';
      // 标记更新
      row.operate = 'UPDATE';
      row['singlePrdCoopLmtAll'] = singlePrdCoopLmtAll;
      let serno = row.serno;
      this.$dialog.open(
        '项目修改',
        'bizmanage/coopBiz/coopReplyAccPro/coopReplyAccProIndex',
        800,
        260,
        row,
        () => {
          this.$refs.coopReplyAccProList.queryDataByCondition('serno=\'' + serno + '\'');
        }
      );
    },
    /**
     * 项目删除
     **/
    quataProDelete () {
      const rowData = this.$refs.coopReplyAccProList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.quataProDeleteAfter();
        }
      });
    },
    /**
     * 项目查看
     **/
    quataProDeleteAfter () {
      const rowData = this.$refs.coopReplyAccProList.getSelectedRowData();
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopreplyagrpro/delete?pkId=' + rowData.pkId + '&replyNo=' + rowData.replyNo,
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.$refs.coopReplyAccProList.queryDataByCondition('serno=\'' + this.formdata.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },
    // 切换保证金信息
    changNum () {
      if (this.formdata.bailPerc > 0) {
        this.isBailRequired = true;
        this.bailAccNoDisabled = false;
        this.bailAccNoSubSeqDisabled = false;
      } else {
        this.isBailRequired = false;
        this.bailAccNoDisabled = true;
        this.bailAccNoSubSeqDisabled = true;
      }
    },
    // 一般担保额度信息段 是否一般担保额度切换
    isCommonGrtLmtAmtChange (value) {
      if (value == '1') {
        this.commonGrtLmtAmtRequired = true;
      } else {
        this.commonGrtLmtAmtRequired = false;
      }
    }
  }
};
</script>
