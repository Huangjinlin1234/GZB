<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="合作方案编号" ctype="yu-xcoop-acct" name="coopPlanNo" placeholder="合作方案编号" @select-fn="commonSelectPartnerNo" width="880" height="680" ></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" disabled></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="保证金比例(%)" ctype="yu-num" placeholder="保证金比例(%)" name="bailPerc"  disabled :multiple="100"></yu-xform-item>
            <yu-xform-item label="保证金账户最低金额(元)" ctype="input" placeholder="保证金账户最低金额(元)" name="bailAccLowAmt" disabled></yu-xform-item>
            <!-- <yu-xform-item label="保证金账号" ctype="input" placeholder="保证金账号" name="bailAccNo" rules="required"></yu-xform-item> -->
            <yu-xform-item label="保证金账号" ctype="input" maxlength="60" placeholder="保证金账号" name="bailAccNo" rules="required" :colspan="operate!='details' ? 10 : 12"></yu-xform-item>
             <!--  <yu-xform-item label="" ctype="custom" name="custom" colspan="2" v-show="operate!='details'">
              <yu-button type="primary" @click="queryBailAccNo">联机查询</yu-button>
            </yu-xform-item> -->
            <yu-xform-item label="保证金账号子序号" ctype="input" placeholder="保证金账号子序号" name="bailAccNoSubSeq" :options="options" :props="props" @change="accNoChange"></yu-xform-item>
            <!-- <yu-xform-item label="保证金账户余额(元)" v-if="operate!='details'" ctype="input" placeholder="保证金账户余额(元)" name="bailAccNoBal" rules="required" colspan="6"></yu-xform-item>
            <yu-xform-item label="" v-if="operate!='details'" ctype="custom" name="custom" colspan="2">
              <yu-button type="primary" @click="customClick('btn')">同步余额</yu-button>
            </yu-xform-item> -->
            <yu-xform-item label="保证金账户余额(元)" ctype="num" maxlength="14" number-formatter="0,000.00" placeholder="保证金账户余额(元)" name="bailAccNoBal" rules="required"></yu-xform-item>
            <yu-xform-item label="当前已担保余额(元)" placeholder="当前已担保余额(元)" name="curtGrtBal" disabled></yu-xform-item>
            <yu-xform-item label="可提取保证金金额(元)" ctype="num" maxlength="14" number-formatter="0,000.00" placeholder="可提取保证金金额(元)" name="allowDistBailAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="本次提取金额（元）" ctype="input" placeholder="本次提取金额（元）" name="curtDistAmt" rules="required"></yu-xform-item>
            <yu-xform-item label="其他相关说明" ctype="textarea" name="otherCorreDesc" placeholder="其他相关说明"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" disabled data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('commitFn')">提交</yu-button>
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="customClick('submitSuccess')"></yufpNwfInit>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      props: {
        key: 'zhhaoxuh',
        value: 'zhhaoxuh'
      },
      options: [],
      updateUrl: this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/update',
      addUrl: this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/',
      formdata: {},
      selectedAccData: {},
      formRules: { curtDistAmt: [{validator: validator.gZero, message: '不是正确的数字', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  watch: {
    'formdata.bailAccNo': function (newValue) {
      if (newValue) {
        this.queryBailAccNo();
      }
    }
  },
  methods: {
    commonSelectPartnerNo(data, mapping){
      const _this = this;
      _this.formdata.partnerNo = data.partnerNo;
      _this.formdata.partnerName = data.partnerName;
      _this.formdata.bailPerc = data.bailPerc;
      _this.formdata.bailAccLowAmt = data.bailAccLowAmt;
      // 查询 当前已担保余额(元)
      this.$xutils.request({
        type: 'POST',
        url: _this.$backend.cmisLmt + '/api/lmt4inner/cmislmt0039',
        data: JSON.stringify({apprSerno: data.coopPlanNo}),
        success: (response, status, xhr) => {
          if (response.code == 0 && response.data) {
            _this.formdata.curtGrtBal = response.data.sumAccSpacBalanceAmtCny;
          } else {
            _this.formdata.curtGrtBal = '0.00';
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox('提示', result.erortx, 400, 300);
        }
      });
    },

    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:COOP_SERNO');
      this.formdata.apprStatus = this.$xutils.getDefaultformulaData('000');
    },
    queryBailAccNo () {
      const _this = this;
      if (!_this.formdata.partnerNo) {
        this.$xutils.showMsgBox('提示', '请先选择合作方案', 400, 300);
        return false;
      }
     // if (!_this.formdata.bailAccNo) {
     //   this.$xutils.showMsgBox('提示', '请填写保证金账号', 400, 300);
     //   return false;
    //  }
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/coopplanapp/queryBail',
        data: JSON.stringify({bailAccNo: _this.formdata.bailAccNo}),
        success: (response, status, xhr) => {
          if (response.code == 0) {
            // 接口调不通，自己模拟处理数据
            const cusId = response.data.kehuhaoo;
          //  if(cusId !== _this.formdata.partnerNo){
          //    _this.$xutils.showMsgBox('提示', '保证金账号和合作方编号不匹配', 400, 300);
          //    return;
          //  }
            const list = response.data.list;
            if (list && list.length == 0) {
              _this.formdata.bailAccNoSubSeq = '';
              _this.formdata.bailAccNoBal = '';
            //  _this.$xutils.showMsgBox('提示', '未查询到保证金账户信息', 400, 300);
            }
            _this.options = response.data.list;
            if (_this.formdata.bailAccNoSubSeq) {
              _this.options.forEach(item => {
                const keyongye = item.keyongye;
                const zhhaoxuh = item.zhhaoxuh;
                if (_this.formdata.bailAccNoSubSeq == zhhaoxuh) {
                  _this.selectedAccData = item;
                  _this.formdata.bailAccNoBal = keyongye;
                }
              });
            }
          } else {
            _this.formdata.bailAccNoSubSeq = '';
            _this.formdata.bailAccNoBal = '';
          //  _this.$xutils.showMsgBox('提示', '未查询到保证金账户信息', 400, 300);
          }
        },
        error: (result, status, errorThrown) => {
         // _this.$xutils.showMsgBox('提示', result.erortx, 400, 300);
        }
      });
    },
    accNoChange (value) {
      const list = this.options;
      const _this = this;
      list.forEach(item => {
        const keyongye = item.keyongye;
        const zhhaoxuh = item.zhhaoxuh;
        if (value == zhhaoxuh) {
          _this.selectedAccData = item;
          _this.formdata.bailAccNoBal = keyongye;
        }
      });
    }
  }
};
</script>
