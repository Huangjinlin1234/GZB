<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :disabled="formDisable" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <!-- <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" rules="required" disabled></yu-xform-item> -->
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required"></yu-xform-item>
            <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="idcardNo" rules="required"></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" utrace placeholder="手机号码" name="mobileNo" rules="required"></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" utrace name="sex" rules="required" data-code="STD_ZB_SEX" placeholder="性别"></yu-xform-item>
            <yu-xform-item label="学历" ctype="select" utrace name="edu" rules="required" data-code="STD_ZB_EDU" placeholder="学历"></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="select" name="isHaveChildren" data-code="STD_IS_HAVE_CHILDREN" placeholder="有无子女"></yu-xform-item>
            <yu-xform-item label="居住场所类型" ctype="select" name="resiType" data-code="STD_ZB_RSD_ST" placeholder="居住场所类型"></yu-xform-item>
            <yu-xform-item label="家庭地址" ctype="input" placeholder="家庭地址" name="familyAddr"></yu-xform-item>
            <yu-xform-item label="本地居住年限" ctype="input" utrace placeholder="本地居住年限" name="localResiLmt"></yu-xform-item>
            <yu-xform-item label="本地户口" ctype="select" utrace name="localRegist" data-code="STD_CUS_LOCAL_REGIST" placeholder="本地户口"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="yu-xdic-tree-addr" placeholder="经营地址" name="operAddr" rules="required" :disabled="disabled" @selectval-fn="selectValFn" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :mapping="{}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="经营年限" ctype="input" placeholder="经营年限" name="operLmt" rules="required"></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select"  @change="marStatusChange" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder=" 婚姻状况"></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" rules="required" v-if="spouseHidden"></yu-xform-item>
            <yu-xform-item label="配偶手机号码" ctype="input" placeholder="配偶手机号码" name="spouseMobileNo" rules="required" v-if="spouseHidden"></yu-xform-item>
            <yu-xform-item label="配偶身份证号码" ctype="input" placeholder="配偶身份证号码" name="spouseIdcardNo" rules="required" v-if="spouseHidden"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户经理" ctype="yu-xuser" rules="required" name="managerId" placeholder="客户经理" @select-fn="handoverChg" :mapping="{'loginCode':'managerId','orgId':'belgOrg'}"></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="推荐机构名称" ctype="input" placeholder="推荐机构名称" name="recommendOrg"></yu-xform-item>
            <yu-xform-item label="名单状态" ctype="select" placeholder="名单状态" name="listStatus" data-code="STD_CUS_LIST_YND_STATUS" rules="required"></yu-xform-item>
            <yu-xform-item label="入库日期" ctype="select" placeholder="入库日期" name="storageDate"  disabled ></yu-xform-item>
            <yu-xform-item label="最近一次变更日期" ctype="input" placeholder="最近一次变更日期" name="updDate" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSave"  v-show="onlyView">保存</yu-button>
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </yu-form-buttons>
    <yu-panel title="紧急联系人">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label=" 紧急联系人姓名" ctype="input" rules="required" :disabled="isdisabled" prop="emgLinkmanName"></yu-xtable-column>
        <yu-xtable-column label=" 紧急联系人电话" ctype="input" rules="required" :disabled="isdisabled" prop="emgLinkmanPhone"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operrate" width="100px" v-if="onlyView">
          <template slot-scope="scope">
            <yu-button-drop set-index="0" :show-length="1" type="text">
              <yu-button @click="rowSave(scope.row)" type="text">保存</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_CUS_LIST_STATUS,STD_ZB_SEX,STD_ZB_EDU,STD_CUS_LOCAL_REGIST,STD_ZB_RSD_ST,STD_CUS_LOCAL_REGIST,STD_ZB_MAR_ST,STD_ZB_APPR_STATUS,STD_IS_HAVE_CHILDREN');
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      isdisabled: false,
      onlyView: true,
      formDisable: false,
      infoShow: 'true',
      spouseHidden: false,
      spouseRules: [],
      updateUrl: this.$backend.cmisCus + '/api/cuslstynd/update',
      formdata: {},
      formType: 'edit',
      formRules: {
        appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}],
        idcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        spouseIdcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        spouseMobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}]
      },
      imageUrls: {},
      File: {},
      dataUrl: this.$backend.cmisCus + '/api/cuslstyndlinkman/'
    };
  },
  mounted () {
    var optype = this.pageParams.optype;
    if(optype === 'view'){
      this.onlyView = false;
      this.isdisabled = true;
      this.setBillCardItemEditable('*', false);
    }
    this.setBillCardValue(this.pageParams);
    this.$refs.refTable.remoteData({condition:{serno: this.pageParams.serno}});
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },

  methods: {
    selectValFn (val) {
      if (val) {
        this.formdata.operAddrVal = val;
      }
    },

    marStatusChange (val) {
      if (val !== '20') { // 已婚
        this.spouseRules.pop();
        this.spouseHidden = false;
      } else {
        this.spouseHidden = true;
      }
    },

    doBack(){
      this.$dialog.close(this.dialogId);
    },

    doSave(){
      let resp = this.updateBillCardData();
      if (resp) {
        this.$dialog.close(this.dialogId);
      } else {
        this.$xutils.showMsgBox("提示", '保存失败', 350, 150, null);
        return;
      }
    },

    rowSave(row){
      if(!row.emgLinkmanName || !row.emgLinkmanPhone){
        this.$xutils.showMsgBox('提示', '请填写紧急联系人姓名、电话!');
        return;
      }
      
      this.$request({
        url: this.$backend.cmisCus + '/api/cuslstyndlinkman/update',
        method: 'post',
        data: row,
      }).then((response) => {
        if(response.code == '0'){
          this.$xutils.showMsgBox('提示', '保存成功!');
        }else{
          this.$xutils.showMsgBox('提示', '保存失败!');
        }
      });
    },

    handoverChg: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
  }

};
</script>
