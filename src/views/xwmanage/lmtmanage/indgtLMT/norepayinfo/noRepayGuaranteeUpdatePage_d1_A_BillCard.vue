<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="抵押信息录入" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="抵押物类型" ctype="select" name="pawnType" rules="required" data-code="STD_PAWN_TYPE" placeholder="抵押物类型"></yu-xform-item>
            <yu-xform-item label="选取抵质押物评估信息" ctype="yu-xguare-clost" name="cloudEvalNo"  placeholder="选取抵质押物评估信息" @select-fn="commonSelectFn" :mapping="{ pkId: 'cloudEvalNo', squ: 'squ', assEvaAmt:'evalAmt' }" width="720" height="480"></yu-xform-item>
            <yu-xform-item label="所有权人客户编号" ctype="input" placeholder="所有权人客户编号" name="ownerCusNo" disabled rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group>
            <yu-xform-item label="所有权人" ctype="input" name="owner" rules="required" placeholder="所有权人" colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="btn1" placeholder="" label-width="1" @click="customClick('selectCusInfo')" colspan="1" :hidden="isView">查看</yu-xform-item>
            <yu-xform-item label="所有权人证件号码" ctype="input" placeholder="所有权人证件号码" name="ownerCertNo" rules="required" colspan="12"></yu-xform-item>
            <yu-xform-item label="土地性质" ctype="select" name="landCha" rules="required" data-code="STD_ZB_LAND_TYPE" placeholder="土地性质"></yu-xform-item>
            <yu-xform-item label="房屋性质" ctype="select" name="houseCha" rules="required" data-code="STD_ZB_HOUSE_TYPE" placeholder="房屋性质"></yu-xform-item>
            <yu-xform-item label="地址" ctype="yu-xdic-tree-addr" name="addr" rules="required" placeholder="地址" @select-fn="commonSelectFn" width="480" height="480" :parms="{'optType':'STD_ZB_AREA_CODE'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="面积（m2）" ctype="yu-num" name="squ" rules="required" placeholder="面积（m2）" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="使用情况" ctype="select" name="utilCase" rules="required" data-code="STD_UTIL_CASE" placeholder="使用情况"></yu-xform-item>
            <yu-xform-item label="评估金额" ctype="yu-num" name="evalAmt" rules="required" placeholder="评估金额" :precision="2" :min="0"></yu-xform-item>
            <yu-xform-item label="一抵金额" ctype="yu-num" name="firstPldAmt" rules="required" placeholder="一抵金额" :precision="2" :min="0" v-if="formdata.pawnType =='02'"></yu-xform-item>
            <yu-xform-item label="一抵余额" ctype="yu-num" placeholder="一抵余额" name="firstPldBal" rules="required" :precision="2" :min="0" v-if="formdata.pawnType =='02'"></yu-xform-item>
            <yu-xform-item label="该抵押物项下贷款总金额" ctype="yu-num" name="pawnLoanTotlAmt" rules="required" placeholder="该抵押物项下贷款总金额"></yu-xform-item>

            <yu-xform-item label="抵质押率" ctype="yu-interest-rate" sign="%"  rules="required" multiple="100" name="pldimnRate" disabled placeholder="抵质押率" colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="btn1" placeholder="" label-width="1" @click="jisuandiyalv" colspan="1" :hidden="isView">计算</yu-xform-item>
              </yu-xform-group>
              <yu-xform-group>
            <yu-xform-item label="是否一级学区房" ctype="select" name="isLevel1Sdr" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否一级学区房"></yu-xform-item>
            <yu-xform-item label="学区房地址" ctype="input" placeholder="学区房地址" name="sdrAddr"></yu-xform-item>
            <yu-xform-item label="学区房名称" ctype="input" placeholder="学区房名称" name="sdrName"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-xdialog :visible.sync="visiableCus" width="500px" title="个人客户快捷创建">
        <yu-xform v-model="dialogData" ref="dialogKH" label-width="120px" related-table-name="refTable" :rules="dialogFormRules" >
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"   disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="customClick('creat')" size="small">创建</el-button>

        </div>
    </yu-xdialog>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="customClick('save')" :hidden="isView">保存</yu-button>

      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/',
      formdata: {},
      formType: 'details',
      formRules: {
        ownerCertNo: [
          {
            validator: validator.IDCard,
            message: '不是正确的身份证号码',
            trigger: 'blur'
          }
        ],
        evalAmt: [
          {
            validator: validator.number,
            message: '不是正确的数字',
            trigger: 'blur'
          }
        ],
        firstPldAmt: [
          {
            validator: validator.number,
            message: '不是正确的数字',
            trigger: 'blur'
          }
        ],
        firstPldBal: [
          {
            validator: validator.number,
            message: '不是正确的数字',
            trigger: 'blur'
          }
        ],
        pldimnRate: [
          {
            validator: validator.digit,
            message: '不是正确的小数',
            trigger: 'blur'
          }
        ]
      },
      imageUrls: {},
      File: {},
      visiableCus: false,
      isView: true
    };
  },
  methods: {
    jisuandiyalv () {
      let assessAmount = this.formdata.evalAmt; // 评估金额(元)
      let loanAmount = this.formdata.pawnLoanTotlAmt; // 该抵押物项下贷款总金额(元)
      let creditBalance = this.formdata.firstPldBal; // 一抵余额(元)
      if (assessAmount < 0 || loanAmount < 0) {
        this.$message({message: '请补全评估金额或该抵押物项下贷款总金额'});
        return;
      }
      if (this.formdata.pawnType == '01') {
        let grtRate = (loanAmount == '' ? 0 : loanAmount * 1) / (assessAmount == '' ? 0 : assessAmount * 1);
        //  grt_rate = grt_rate.toFixed(4);
        this.formdata.pldimnRate = grtRate;
      } else if (this.formdata.pawnType == '02') {
        if (assessAmount < 0) {
          this.$message({message: '请补全评一抵余额'});
          return;
        }
        let grtRate = (loanAmount == '' ? 0 : loanAmount * 1) / ((assessAmount == '' ? 0 : assessAmount * 1) - (creditBalance == '' ? 0 : creditBalance * 1));
        grtRate = grtRate.toFixed(4);
        this.formdata.pldimnRate = grtRate;
      }
    }
  }
};
</script>
