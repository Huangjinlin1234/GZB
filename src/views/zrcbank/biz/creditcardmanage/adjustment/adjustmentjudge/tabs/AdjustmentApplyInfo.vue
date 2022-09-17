
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额审批-调额申请信息
  -->
  <div>
    <yu-panel panel-type="simple" title="调额申请信息">
      <yu-xform ref="refForm" label-width="160px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="卡号 " placeholder="卡号" required clearable :rules="cardNoRule" name="cardNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="卡产品" placeholder="卡产品" name="cardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD"></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="原始信用额度" placeholder="原始信用额度" name="origCreditCardLmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="新信用额度" placeholder="新信用额度" required :rules="newCreditCardLmtRule" name="newCreditCardLmt" ctype="num"></yu-xform-item>
          <yu-xform-item label="是否提供增信证明" placeholder="是否提供增信证明" required clearable :rules="isIncreaseRule" name="isIncrease" ctype="select" :options="isIncreaseOption"></yu-xform-item>
          <yu-xform-item colspan="24" label="备注" placeholder="备注" name="remarks" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="updIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记时间" placeholder="登记时间" name="updDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="updBrIdName" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,STD_CARD_APPLY_CARD_PRD');
export default {
  name: 'AdjustmentApplyInfo',
  components: {},
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo//selectbyserno',
      updateUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/batchdelete/',
      formdata: {
        isIncrease: '0'
      },
      cardNoRule: [
        { required: true, message: '卡号不能为空' }
      ],
      newCreditCardLmtRule: [
        { required: true, message: '新信用额度不能为空' }
      ],
      isIncreaseRule: [
        { required: true, message: '是否提供增信证明不能为空' }
      ],
      isIncreaseOption: [
        {key: '0', value: '否'},
        {key: '1', value: '是'}
      ],
      formDisabled: true
    };
  },
  mounted () {
    let _this = this;
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: {serno: _this.applyInfoParams.serno}
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data, _this.formdata);
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {

  }
};
</script>
