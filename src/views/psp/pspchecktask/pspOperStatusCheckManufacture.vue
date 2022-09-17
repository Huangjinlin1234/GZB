<template>
  <div>
    <yu-xform ref="refForm" label-width="205px" :disabled="formType != 'edit' ? true : false" v-model="formdata" :form-change="triggerEditChangeEvent">
      <yu-panel title="经营状况检查(制造业)" :hideFilter="false" :collapseHide="false">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="库存是否积压" ctype="radio" name="isOverstockedProducts" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="说明"  ctype="textarea" name="overstockedExpl" id="overstockedExpl" placeholder="如选择是，客户经理说明" :rules="{required: isOverstockedProducts, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="订单量是否下降"  ctype="radio"  name="isOrderDowen"  rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="说明"  ctype="textarea" name="dowenExpl" id="dowenExpl" placeholder="如选择是，客户经理说明" :rules="{required: isOrderDowen, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="产量是否下降"  ctype="radio"  name="isOutputDowen"  rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="说明"  ctype="textarea" name="outputDowenExpl" placeholder="如选择是，客户经理说明"  id="outputDowenExpl" :rules="{required: isOutputDowen, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="是否新增对外投资和固定资产" ctype="radio"  name="isAddInvest"  rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="说明" ctype="textarea" name="addInvestExpl" placeholder="如选择是，客户经理说明"  id="addInvestExpl" :rules="{required: isAddInvest, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item label="借款人融资与销售是否匹配" ctype="radio"  name="isFinMatching"  rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="说明" ctype="textarea" name="matchingExpl" placeholder="如选择否，客户经理说明"  id="matchingExpl" :rules="{required: isFinMatching, message: '必输项不允许为空'}" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-xtable ref="yutable2" :data="tableData" :pageable="false" style="width: 100%" >
        <yu-xtable-column label="检查项目" prop="ckname" ></yu-xtable-column>
        <yu-xtable-column label="上期结果" prop="preRst"></yu-xtable-column>
        <yu-xtable-column label="本期结果" prop="curtRst" >
          <template slot-scope="scope">
            <yu-xform-item :name="scope.row.crname" v-model="scope.row.curtRst" ctype="input" :rules="{required: true, message: '必输项不允许为空'}" />
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="说明（如有大额变化）" prop="remark" >
          <template slot-scope="scope">
            <yu-xform-item :name="scope.row.rename" v-model="scope.row.remark" ctype="textarea" :rules="{required: true, message: '必输项不允许为空'}" />
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-xform>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO');
export default{
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspoperstatuscheckmanufacture/update',
      formdata: {},
      tableData: []
    };
  },
  props: {
    taskNo: String,
    formType: String
  },

  created: function () {
    var _this = this;
    yufp.service.request({
      method: 'GET',
      url: this.$backend.cmisPsp + '/api/pspoperstatuscheckmanufacture/',
      data: {condition: {taskNo: this.taskNo}},
      callback: function (code, message, response) {
        yufp.clone(response.data[0], _this.formdata);
        if (response.data.length <= 0) {
          _this.formdata.pkId = _this.$xutils.getUUID();
          _this.formdata.taskNo = _this.taskNo;
        }
        console.log('_this.formdata.pikId', _this.formdata);
        _this.tableData = [{
          ckname: '借款人开台率情况（%）',
          preRst: _this.formdata.preRst,
          curtRst: _this.formdata.curtRst,
          crname: 'curtRst',
          remark: _this.formdata.remark,
          rename: 'remark'
        }, {
          ckname: '借款人水费（万元）',
          preRst: _this.formdata.preRst1,
          curtRst: _this.formdata.curtRst1,
          crname: 'curtRst1',
          remark: _this.formdata.remark1,
          rename: 'remark1'
        }, {
          ckname: '借款人电费（万元）',
          preRst: _this.formdata.preRst2,
          curtRst: _this.formdata.curtRst2,
          crname: 'curtRst2',
          remark: _this.formdata.remark2,
          rename: 'remark2'
        }, {
          ckname: '借款人气费（如有）（万元）',
          preRst: _this.formdata.preRst3,
          curtRst: _this.formdata.curtRst3,
          crname: 'curtRst3',
          remark: _this.formdata.remark3,
          rename: 'remark3'
        }];
      }
    });
  },

  computed: {

    isOverstockedProducts: function () {
      return this.formdata.isOverstockedProducts == '1';
    },
    isOrderDowen: function () {
      return this.formdata.isOrderDowen == '1';
    },
    isOutputDowen: function () {
      return this.formdata.isOutputDowen == '1';
    },
    isAddInvest: function () {
      return this.formdata.isAddInvest == '1';
    },
    isFinMatching: function () {
      return this.formdata.isFinMatching == '0';
    }
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.formdata
      });
    }

  }
};
</script>