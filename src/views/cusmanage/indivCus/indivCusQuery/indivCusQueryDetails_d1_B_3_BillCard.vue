<template>
  <div id="d1_B_3_BillCard">
    <div id="d1_B_3_BillCardContent">
      <yu-xform
        ref="refForm"
        label-width="120px"
        :form-type="formType"
        v-model="formdata"
        :rules="formRules"
        :form-change="triggerEditChangeEvent"
      >
        <yu-xform-group :column="2">
          <yu-xform-item
            label="雇佣状态"
            ctype="select"
            placeholder="雇佣状态"
            name="employeeStatus"
          ></yu-xform-item>
          <yu-xform-item
            label="职业"
            ctype="select"
            placeholder="职业"
            name="occ"
          ></yu-xform-item>
          <yu-xform-item
            label="自由职业说明"
            ctype="input"
            placeholder="自由职业说明"
            name="occDesc"
          ></yu-xform-item>
          <yu-xform-item
            label="营业执照号码"
            ctype="input"
            placeholder="营业执照号码"
            name="blicNo"
          ></yu-xform-item>
          <yu-xform-item
            label="经营状况"
            ctype="select"
            placeholder="经营状况"
            name="operStatus"
          ></yu-xform-item>
          <yu-xform-item
            label="工作单位"
            ctype="input"
            placeholder="工作单位"
            name="unitName"
          ></yu-xform-item>
          <yu-xform-item
            label="经营企业统一社会信用代码"
            ctype="input"
            placeholder="经营企业统一社会信用代码"
            name="unifyCreditCode"
          ></yu-xform-item>
          <yu-xform-item
            label="单位性质"
            ctype="select"
            placeholder="单位性质"
            name="indivComTyp"
          ></yu-xform-item>
          <yu-xform-item
            label="单位电话"
            ctype="input"
            placeholder="单位电话"
            name="unitPhn"
          ></yu-xform-item>
          <yu-xform-item
            label="单位所属行业"
            ctype="yu-combo-tree"
            placeholder="单位所属行业"
            name="indivComTrade"
          ></yu-xform-item>
          <yu-xform-item
            label="单位地址"
            ctype="input"
            placeholder="单位地址"
            name="unitAddr"
            :colspan="12"
          ></yu-xform-item>
          <yu-xform-item
            label="职务"
            ctype="select"
            placeholder="职务"
            name="jobTtl"
          ></yu-xform-item>
          <yu-xform-item
            label="职称"
            ctype="select"
            placeholder="职称"
            name="indivCrtfctn"
          ></yu-xform-item>
          <yu-xform-item
            label="单位工作起始年"
            ctype="input"
            placeholder="单位工作起始年"
            name="unitDate"
          ></yu-xform-item>
          <yu-xform-item
            label="收入币种"
            ctype="select"
            placeholder="收入币种"
            name="earningCurType"
          ></yu-xform-item>
          <yu-xform-item
            label="主键"
            ctype="input"
            placeholder="主键"
            name="pkId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="个人年收入"
            ctype="input"
            placeholder="个人年收入"
            name="indivYearn"
          ></yu-xform-item>
          <yu-xform-item
            label="家庭年收入(元)"
            ctype="input"
            placeholder="家庭年收入(元)"
            name="familyYScore"
          ></yu-xform-item>
          <yu-xform-item
            label="客户编号"
            ctype="input"
            placeholder="客户编号"
            name="cusId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="是否当前单位 std_zb_ye"
            ctype="input"
            placeholder="是否当前单位 std_zb_ye"
            name="isCurtUnit"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="所在部门"
            ctype="input"
            placeholder="所在部门"
            name="ubietyDept"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="年收入(元)"
            ctype="input"
            placeholder="年收入(元)"
            name="yScore"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="单位地址街道/路"
            ctype="input"
            placeholder="单位地址街道/路"
            name="unitStreet"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="单位邮政编码"
            ctype="input"
            placeholder="单位邮政编码"
            name="unitZipCode"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="单位传真"
            ctype="input"
            placeholder="单位传真"
            name="unitFax"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="单位联系人"
            ctype="input"
            placeholder="单位联系人"
            name="unitCntName"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="参加工作年份"
            ctype="input"
            placeholder="参加工作年份"
            name="workDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="本单位工作结束日期"
            ctype="input"
            placeholder="本单位工作结束日期"
            name="unitEndDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="本行业参加工作日期 "
            ctype="input"
            placeholder="本行业参加工作日期 "
            name="tradeDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="备注"
            ctype="input"
            placeholder="备注"
            name="remark"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="个人工作履历标识"
            ctype="input"
            placeholder="个人工作履历标识"
            name="prsnWorkId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="操作类型  std_zb_opr"
            ctype="input"
            placeholder="操作类型  std_zb_opr"
            name="oprType"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记人"
            ctype="input"
            placeholder="登记人"
            name="inputId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记机构"
            ctype="input"
            placeholder="登记机构"
            name="inputBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="登记日期"
            ctype="input"
            placeholder="登记日期"
            name="inputDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="更新人"
            ctype="input"
            placeholder="更新人"
            name="updId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="更新机构"
            ctype="input"
            placeholder="更新机构"
            name="updBrId"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="更新日期"
            ctype="input"
            placeholder="更新日期"
            name="updDate"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="创建日期"
            ctype="input"
            placeholder="创建日期"
            name="createTime"
            disabled
            hidden
          ></yu-xform-item>
          <yu-xform-item
            label="更新日期"
            ctype="input"
            placeholder="更新日期"
            name="updateTime"
            disabled
            hidden
          ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1B3BillCard',
  mixins: [mixinForm],
  props: {
    params: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusindivunit/update',
      addUrl: this.$backend.cmisCus + '/api/cusindivunit/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.queryDataByCusId();
  },
  methods: {
    queryDataByCusId () {
      this.$request({
        url: this.addUrl,
        method: 'post',
        data: { cusId: this.params.cusId }
      }).then(response => {
        if (response.code == '0') {
          this.$utils.clone(response.data, this.formdata);
        }
      }).catch(() => {
        this.$message({
          message: '请求数据异常！',
          type: 'error'
        });
      });
    }
  }
};
</script>