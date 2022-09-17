<template>
  <div>
    <yu-panel title="共同借款人"  panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" @click="customClick('doAddCob')" v-if="show">新增</yu-button>
          <yu-button type="primary" @click="customClick('updateCob')" v-if="show">修改</yu-button>
          <yu-button type="primary" @click="customClick('deleteCob')" v-if="show">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST" :baseParams="baseParams">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="调查流水号" prop="surveySerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="共借人客户号" prop="cusId">
        <template slot-scope="scope">
            <a class="underline" @click="lookCobPage(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="共借人姓名" prop="commonDebitName"></yu-xtable-column>
        <yu-xtable-column label="共借人身份证" prop="commonDebitCertCode"></yu-xtable-column>
        <yu-xtable-column label="共借人手机号" prop="commonDebitPhone"></yu-xtable-column>
        <yu-xtable-column label="共借人关系" prop="commonDebitCorre" data-code="STD_ZB_SELFPER_REL_TYP"></yu-xtable-column>
        <yu-xtable-column label="共借人地址" prop="commonDebitAddr"></yu-xtable-column>
        <yu-xtable-column label="数据来源" prop="cobDataSource" data-code="STD_DATA_SOUR"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
    <yu-xdialog title="共同借款人新增" :visible.sync="dialogFormVisible">
        <yu-xform ref="refForm" label-width="140px" :form-type="formType" v-model="formdata" :rules="formRules">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled v-if="false"></yu-xform-item>
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="共借人客户编号" ctype="input" placeholder="共借人客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="共借人姓名" ctype="input" placeholder="共借人姓名" name="commonDebitName" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人证件号码" ctype="input" placeholder="共借人证件号码" name="commonDebitCertCode" rules="required"></yu-xform-item>
            <yu-button autofocus  @click="customClick('doselectCob')">查询</yu-button>
               </yu-xform-group>
               <yu-xform-group :column="2">
            <yu-xform-item label="共借人手机" ctype="input" placeholder="共借人手机" name="commonDebitPhone" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人关系" ctype="select" name="commonDebitCorre" rules="required" data-code="STD_ZB_SELFPER_REL_TYP" placeholder="共借人关系"></yu-xform-item>
            <yu-xform-item label="共借人地址" ctype="textarea" name="commonDebitAddr" placeholder="共借人地址" :colspan="24"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary"  @click="customClick('doNextStep')">保存</yu-button>
          <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
        </yu-form-buttons>
    </yu-xdialog>
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
    <yu-xdialog title="共借人信息详情" :visible.sync="dialogFormVisible2">
        <yu-xform ref="refForm2" label-width="140px" form-type="details" v-model="formdata2"  >
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="共借人客户编号" ctype="input" placeholder="共借人客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="共借人姓名" ctype="input" placeholder="共借人姓名" name="commonDebitName" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人证件号码" ctype="input" placeholder="共借人证件号码" name="commonDebitCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人手机" ctype="input" placeholder="共借人手机" name="commonDebitPhone" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人关系" ctype="select" name="commonDebitCorre" rules="required" data-code="STD_ZB_SELFPER_REL_TYP" placeholder="共借人关系"></yu-xform-item>
            <yu-xform-item label="共借人地址" ctype="textarea" name="commonDebitAddr" placeholder="共借人地址" :colspan="24"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-xdialog>
      </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cobInfo_dialog_BillCard';
import { validator } from '@/utils/validate';
import { lookup } from '@/utils';
lookup.reg('STD_COMMON_DEBIT_CORRE,STD_DATA_SOUR,STD_ZB_YES_NO,BELG_TEAM,STD_REPLY_STATUS,STD_XD_REPLY_STATUS,STD_TEAM_TYPE,STD_ZB_SELFPER_REL_TYP');

export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/select',
      deleteUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/delete/',
      dialogFormVisible: false,
      visiableCus: false,
      dialogFormVisible2: false,
      formdata: {},
      formRules: {
        commonDebitCertCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        commonDebitPhone: [{ validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur' }]
      },
      baseParams: {condition: {surveySerno: this.$route.meta.params.surveySerno, oprType: '01'}, sort: 'inputDate desc'},
      show: false,

      formdata2: {}
    };
  },
  mounted () {
    var op = this.$route.meta.params.op;
    if (op == 'UPDATE') {
      this.show = true;
    }
  },
  methods: {
    /** a标签查看
     */
    lookCobPage (data) {
      this.dialogFormVisible2 = true;
      this.$nextTick(function () {
        let _this = this;
        yufp.clone(data, _this.formdata2);
      });
    }
  }
};
</script>
