/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCusBase">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-xform ref="pspCusBaseCaseForm" v-model="cusData" label-width="180px" >
        <yu-panel title="基本情况" :collapse-hide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="do360View" type="primary">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="身份证号码" disabled name="certCode"></yu-xform-item>
            <yu-xform-item label="电话号码" disabled name="phone"></yu-xform-item>
            <yu-xform-item label="性别" v-if="badFlag" disabled name="sex" ctype="select" data-code="STD_ZB_SEX"></yu-xform-item>
            <yu-xform-item label="婚姻状况" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="marStatus" ctype="select" data-code="STD_ZB_MAR_ST"></yu-xform-item>
            <yu-xform-item label="现居地址" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="resiAddr"></yu-xform-item>
            <yu-xform-item label="年收入" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="yearn"></yu-xform-item>
            <yu-xform-item label="工作单位名称" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="workUnit"></yu-xform-item>
            <yu-xform-item label="职务" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="duty" ctype="select" data-code="STD_ZB_JOB_TTL"></yu-xform-item>
            <yu-xform-item label="单位具体地址" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="unitAddr"></yu-xform-item>
            <yu-xform-item label="单位电话" v-if="!smallOperFlag&&!smallConsumeFlag&&badFlag" disabled name="unitPhone"></yu-xform-item>
            <yu-xform-item label="经营地址" v-if="smallOperFlag" :disabled="viewFlag||approveFlag||assistFlag||autoFlag" rules="required" ctype="textarea" colspan="24" name="operAddrAct"></yu-xform-item>
            <yu-xform-item label="主营业务" v-if="smallOperFlag" :disabled="viewFlag||approveFlag||assistFlag||autoFlag" rules="required" ctype="textarea" colspan="24" name="mainOptScp"></yu-xform-item>
            <yu-xform-item label="风险等级" v-if="smallOperFlag||smallConsumeFlag||!badFlag" disabled name="riskLevel" data-code="STD_ZB_RISK_LEVEL" ctype="select"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="配偶情况" :collapse-hide="false" v-if="consumeFlag&&badFlag">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" disabled ctype="input" name="spouseCusId" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="do360View" type="primary">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="spouseCusName"></yu-xform-item>
            <yu-xform-item label="身份证号码" disabled name="spouseCertCode"></yu-xform-item>
            <yu-xform-item label="联系电话" disabled name="spousePhone"></yu-xform-item>
            <yu-xform-item label="现居地址" disabled name="spouseResiAddr"></yu-xform-item>
            <yu-xform-item label="年收入" disabled name="spouseYearn"></yu-xform-item>
            <yu-xform-item label="工作单位名称" disabled name="spouseWorkUnit"></yu-xform-item>
            <yu-xform-item label="职务" disabled name="spouseDuty" ctype="select" data-code="STD_ZB_JOB_TTL"></yu-xform-item>
            <yu-xform-item label="单位具体地址" disabled name="spouseUnitAddr"></yu-xform-item>
            <yu-xform-item label="单位电话" disabled name="spouseUnitPhone"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <template>
      <!--借据列表-->
        <regularDebtInfo ref="regularDebtInfo" :taskNo="taskNo"></regularDebtInfo>
      </template>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
import regularDebtInfo from './regularDebtInfo.vue';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_FIVE_CLASS,STD_ZB_RISK_LEVEL,STD_ZB_SEX,STD_ZB_MAR_ST,STD_ZB_JOB_TTL');

export default {
  props: {
    bizPageData: Object
  },
  name: 'PspCusBase',
  components: { regularDebtInfo },
  data: function () {
    return {
      taskNo: '',
      cusData: {}, // 客户基本信息
      isMarried: false, // 是否已婚
      badFlag: false, // 是否不良
      consumeFlag: false, // 是否个人消费
      smallOperFlag: false, // 是否小微经营
      smallConsumeFlag: false, // 是否小微消费
      autoFlag: false // 是否小微消费
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      // if (_this.bizPageData) {
      //   _this.viewFlag = true;
      // } else {
      _this.viewFlag = data.opType === 'view';
      // }
      _this.badFlag = data.pspTask.rptType === '3';
      _this.autoFlag = _this.$route.params.pspTask.taskType == '2';
      _this.consumeFlag = data.pspTask.checkType === '23' || data.pspTask.checkType === '33';
      _this.smallOperFlag = data.pspTask.checkType === '24' || data.pspTask.checkType === '34';
      _this.smallConsumeFlag = data.pspTask.checkType === '25' || data.pspTask.checkType === '35';
      // 任务编号
      _this.taskNo = data.pspTask == undefined ? data.taskNo : data.pspTask.taskNo;
      console.log('这里是', _this.taskNo);
      let params = {};
      params.taskNo = _this.taskNo;
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcusbasecase/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.cusData);
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 查看客户360视图
    do360View: function () {
      this.$dialog.open('客户360视图', '', 900, 650, null, null);
    }
  }
};
</script>

<style scoped>

</style>
