
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="配置信息" name="base">
        <yu-panel title="配置信息" :collapseHide="false">
          <yu-xform ref="refForm" label-width="140px" v-model="formdata" class="yu-form-gap" form-type="details">
            <yu-xform-group>
              <yu-xform-item label="流水号" :hidden="true" name="serno" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="优先分配比例(%)" name="priDivisPerc" ctype="input"></yu-xform-item>
              <yu-xform-item label="更新周期" name="updPeriod" ctype="select" data-code="STD_UPDATE_PERIOD"></yu-xform-item>
              <yu-xform-item label="业务类型" name="bizType" ctype="checkbox" data-code="STD_BIZ_SUB_TYPE"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
              <yu-xform-item label="登记时间" name="inputDate" ctype="datepicker"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
          <yu-button @click="back">返回</yu-button>
        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="操作历史" name="asset">
        <yu-panel title="操作历史">
          <yu-xform related-table-name="refWorkScheduleTable" form-type="search" slot="filter">
            <yu-xform-group :column="4">
              <yu-xform-item label="登记人" ctype="input" name="inputId"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refWorkScheduleTable" request-type="POST" condition-key="condition" :base-params="params" :default-load="false" row-number :data-url="dataUrl" @loaded="dataReady" >
            <yu-xtable-column label="操作流水号" prop="serno" width="120"></yu-xtable-column>
            <yu-xtable-column label="优先分配比例(%)" prop="priDivisPerc" width="140">
              <template slot-scope="scope">
                {{ getPerc(scope.row.priDivisPerc, 100) }}
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="更新周期" width="">
              <template slot-scope="scope"><span>{{ getDictValue2(scope.row.updPeriod) }}</span></template>
            </yu-xtable-column>
            <yu-xtable-column label="业务类型" width="">
              <template slot-scope="scope"><span>{{ getDictValue(scope.row.bizType) }}</span></template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width=""></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width=""></yu-xtable-column>
            <yu-xtable-column label="登记时间" prop="inputDate" width=""></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>

import { lookup, dateFormat} from '@/utils';
import { mapState } from 'vuex';
lookup.reg('STD_UPDATE_PERIOD,STD_COLLTASK_BUSI_TYPE');


export default {
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/cfgtaskurgentinfo/',
      tabName: 'base',
      expandCollapseName: 'base',
      formdata: {},
      params: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  mounted () {
    this.params = {sort: 'upd_date desc,serno desc' };
  },
  methods: {
    dataReady () {
      let tableData = this.$refs.refWorkScheduleTable.tabledata;
      if (tableData && tableData.length > 0) {
        this.$refs.refForm.setFormData(tableData[0]);
        this.$refs.refForm.formdata.priDivisPerc = this.getPerc(tableData[0].priDivisPerc, 100)
      }
    },
    getDictValue (val) {
      return this.$lookup.convertMultiKey('STD_BIZ_SUB_TYPE', val);
    },
    getDictValue2 (val) {
      return this.$lookup.convertMultiKey('STD_UPDATE_PERIOD', val);
    },
    back: function () {
      yufp.router.removeTab(this.$route.path);
    },
    formatTime () {
      var timeDt = new Date();
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    //转换优先分配比例为百分数
    getPerc: function(arg1, arg2) {
      var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
      try {
      m += s1.split('.')[1].length;
      } catch (e) {}
      try {
      m += s2.split('.')[1].length;
      } catch (e) {}
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    }
  }
};
</script>
