<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px"  :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="新增向导" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="押品类型" ctype="select" name="grtFlag" rules="required" data-code="STD_GRT_FLAG" placeholder="押品类型" @change="grtFlagChange" :clearable="false"></yu-xform-item>
            <yu-xform-item label="押品流水号" ctype="input" placeholder="押品编号" name="serno" rules="required" disabled :hidden="!selHidden"></yu-xform-item>
            <yu-xform-item label="是否扫描资料" ctype="select" name="isScanMater" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否扫描资料" :hidden="!selHidden" value="1"></yu-xform-item>
            <yu-xform-item label="权证编号及其他编号" ctype="input" placeholder="权证编号及其他编号" name="rightOtherNo" rules="required" ></yu-xform-item>
            <yu-xform-item label="抵质押物类型名称" ctype="yu-xdic-tree" :menu-node-select="false" :data-label="label" placeholder="抵质押物类型名称" name="guarTypeCd" rules="required" :parms="dataParamsDic" :allNodeValue="false" @select-fn="commonSelectFn"  readonly></yu-xform-item>
            <yu-xform-item label="抵质押物名称" ctype="input" :hidden="!selHidden" name="pldimnMemo" rules="required"></yu-xform-item>
            <yu-xform-item label="创建系统/来源系统" ctype="input"  name="createSys" hidden></yu-xform-item>
            <yu-xform-item label="押品登记办理状态" ctype="input"  name="regState" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      selHidden: true,
      imageUrls: {},
      dataParamsDic: {root: '', optType: 'STD_DZY_TYPE'},
      File: {},
      orgCodeSu: '',
      roleCode: ''
    };
  },
  mounted () {
    // 获取登入信息
    const loginUserInfo = this.$xutils.getLoginUserInfo();
    const _this = this;
    loginUserInfo.roles.every(function (_item, _index) {
      _this.roleCode = _item.code;
      // 如果是小微客户经理
      // code 角色标识 R0010-小微客户经理  R1016-小贷内勤人员 R0030-零售客户经理
      if (_item.code == 'R0010' || _item.code == 'R0030' || _item.code == 'R1016') {
        _this.selHidden = true;
        // return false;
      } else {
        _this.selHidden = true;
        // return true;
      }
    });
    this.orgCodeSu = loginUserInfo.org.code.substring(0, 2);
    // 村镇银行客户经理 隐藏是否扫描资料选项
    if (this.orgCodeSu == '80' || this.orgCodeSu == '81') {
      _this.selHidden = false;
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:GUAR_BASE_SEQ');
      this.formdata.createSys = '0';// 0信贷系统  1押品系统
      this.formdata.regState = '02';// 02未登记 01 已登记
    },
    grtFlagChange () {
      yufp.clone({}, this.formdata);
      this.formdata.guarTypeCd = '';
      if (this.formdata.grtFlag == '02') {
        // 01抵押  02质押
        this.selHidden = false;
        yufp.clone({root: '', optType: 'STD_DZY_TYPE'}, this.dataParamsDic);
      } else if (this.formdata.grtFlag == '01') {
        if (this.roleCode == 'R0010' || this.roleCode == 'R0030' || this.roleCode == 'R1016') {
          this.selHidden = true;
           yufp.clone({root: '', optType: 'STD_DZY_TYPE'}, this.dataParamsDic);
        } else {
          this.selHidden = true;
           yufp.clone({root: '', optType: 'STD_DY_TYPE'}, this.dataParamsDic);
        }
        if (this.orgCodeSu == '80' || this.orgCodeSu == '81') {
          this.selHidden = false;
          yufp.clone({root: '', optType: 'STD_DZY_TYPE'}, this.dataParamsDic);
        }
      }
    },
    commonSelectFn (data, mapping) {
      // // 将表格的数据，赋值给表单字段
       if (mapping) {
         for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
         }
       } else {
         // 遍历数据，所有都赋值
         for (const item in data) {
           this.formdata[item] = data[item];
         }
       }
       this.formdata.pldimnMemo = data.label;
    }
  }
};
</script>
