<template>
  <!--
    @created by yhd
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 司法详情
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="viewType == 'DETAIL'">
        <yu-xform-group>
          <yu-xform-item label="回收总金额" colspan="11" name="recoverTotalAmt" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="回收率(%)" colspan="11" name="recoverPercent" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xtable ref="refTable" row-number :data="dataList" >
          <yu-xtable-column align="center" label="回收金额" prop="recoverAmt"></yu-xtable-column>
          <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column align="center" label="回收日期" prop="recoverDate"></yu-xtable-column>
          <yu-xtable-column align="center" label="回收方式" prop="recoverMode" data-code="STD_RECOVER_MODE"></yu-xtable-column>
        </yu-xtable>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
// 注册字典项
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_RECOVER_MODE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      dataList:[],
      dataUrl: backend.cmisNpam + '/api/plalawcaseinfo/querRecoveryInfo',
      baseParam: {},
      viewType: 'EDIT'
    };
  },
  created () {
    // this.$emit("liuquan")
    var _this = this;
    if (_this.cusCorp) {
      _this.formdata.caseSerno = _this.cusCorp.caseSerno;
      _this.viewType = _this.cusCorp.viewType;
    }
    var caseSerno = _this.formdata.caseSerno;
    _this.baseParam = { condition: JSON.stringify({ caseSerno: caseSerno }) };

    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/plalawcaseinfo/querRecoveryInfo',
      data: { condition: JSON.stringify({ caseSerno: caseSerno }) },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        _this.formdata.recoverPercent = _this.formdata.recoverPercent * 100
        _this.dataList = response.data.plaLawRecoverInfoDtoList;
        
      }
    });
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit;
    }
  },

  methods: {
    
  }
};
</script>
