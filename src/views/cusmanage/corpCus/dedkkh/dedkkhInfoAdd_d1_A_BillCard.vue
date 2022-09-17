<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'managerBrIdName':'belgOrgName','cusId':'cusId','cusName':'cusName','cusType':'cusType','managerIdName':'managerIdName','managerId':'managerId','managerBrId':'belgOrg'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" hidden ></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" hidden ></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="名单流水号" ctype="input" placeholder="名单流水号" name="listSerno" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="压降计划概览" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="本年度计划总压降金额(万元)" ctype="num" maxlength="14" number-formatter="0,000.00" placeholder="本年度计划总压降金额（万元）" name="planAmt" rules="required"></yu-xform-item>
            <yu-xform-item label="压降年度" ctype="datepicker" type="year"  format="yyyy" value-format="yyyy" placeholder="压降年度" name="pressureDropYearly" rules="required"></yu-xform-item>
            <yu-xform-item label="风险缓释措施" ctype="textarea" rules="required" maxlength="500" placeholder="风险缓释措施" name="riskRelieveStep" colspan="24"></yu-xform-item>
            <yu-xform-item label="其他说明" ctype="textarea" rules="required" maxlength="500" placeholder="其他说明" name="otherMemo" colspan="24"></yu-xform-item>
            <yu-xform-item label="进入名单标识" ctype="input" placeholder="进入名单标识" name="enterListFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="状态" ctype="input" placeholder="状态" name="status" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    var _this = this;
    var checkPlanAmt = function (rule, value, callback) {
      var parent = _this.$parent;
      let cusLstDedkkhYjsxTable = parent.$refs.refTable.tabledata;
      let totalAmt = 0;
      for (var i = 0; i < cusLstDedkkhYjsxTable.length; i++) {
        totalAmt += Number(cusLstDedkkhYjsxTable[i].pressureDropAmt);
      };
      if (value >= totalAmt) {
        callback();
      } else {
        callback(new Error());
      }
    };

    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/',
      formdata: {},
      formType: 'edit',
      formRules: {
        planAmt: [{
          validator: validator.digit,
          message: '不是正确的小数',
          trigger: 'blur'
        }, {
          validator: checkPlanAmt,
          message: '本年度计划总压降金额不能小于压降金额之和',
          trigger: 'blur'
        }]
      },
      imageUrls: {},
      File: {}
    };
  },

  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },

  mounted () {
    // this.formdata.inputId = this.userCode;
    // this.formdata.inputBrId = this.org.code;
    // this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
  }

};
</script>