<template>
  <div>
    <yu-xdialog title="征信授权书信息列表" :collapseHide="false" :visible.sync="visiable" :width="width">
      <yu-xform form-type="search" v-model="searchFormdata" label-width="120px"  related-table-name="refTable">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="征信查询类别" ctype="select" :options="dicOptions.qryClsOptions" placeholder="征信查询类别" name="qryCls" ></yu-xform-item>
          <yu-xform-item label="授权书日期" ctype="datepicker" placeholder="授权书日期" name="authbookDate" ></yu-xform-item>
          <yu-xform-item label="授权方式" ctype="select" :options="dicOptions.authModeOptions" placeholder="授权方式" name="authMode" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST" :base-params="baseParams">
        <yu-xtable-column label="授权书编号" prop="authbookNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="征信查询类别" prop="qryCls" :options="dicOptions.qryClsOptions"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" :options="dicOptions.certTypeOptions"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="授权书日期" prop="authbookDate"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime"></yu-xtable-column>
        <yu-xtable-column label="授权方式" prop="authMode" :options="dicOptions.authModeOptions"></yu-xtable-column>
      </yu-xtable>
      <div style="text-align:center;">
        <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
        <el-button @click="clearFn" size="small">取消</el-button>
      </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import * as xutils from '@/utils/xutils';
import popList from '@/utils/mixins/pop-list';
export default{
  name: 'YuXauthbook',
  componentName: 'YuXauthbook',
  mixins: [popList],
  data: function () {
    return {
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], authModeOptions: [{key: '01', value: '线上'}, {key: '02', value: '线下'}], certTypeOptions: [{key: 'C', value: '户口簿'}, {key: 'A', value: '居民身份证'}, {key: 'B', value: '护照'}, {key: '11', value: '军人身份证件'}, {key: 'D', value: '港澳居民来往内地通行证'}, {key: 'E', value: '台湾同胞来往内地通行证'}, {key: '12', value: '外国人居留证'}, {key: 'Y', value: '警官证'}, {key: '13', value: '香港身份证'}, {key: '14', value: '澳门身份证'}, {key: '15', value: '台湾身份证'}, {key: '16', value: '其他证件'}, {key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}] },
      dataUrl: backend.cmisBiz + '/api/creditauthbookinfo/queryauthbooklist',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'authbookNo',
      codeToText: false,
      baseParams: {}
    };
  },
  watch: {
    parms: function (val) {
      if (!this.baseParams) {
        this.baseParams = {};
      }
      xutils.clone(val, this.baseParams);
    },
    visiable () {
      this.$nextTick(function () {
        this.refreshData();
      });
    }
  },
  mounted () {
    this.baseParams = this.$attrs.baseParams;
  },
  methods: {
    refreshData () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
