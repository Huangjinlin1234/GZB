
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
          <yu-xform ref="refForm" label-width="140px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="流水号" :hidden="true" name="serno" rules="required" ctype="input"></yu-xform-item>
              <yu-xform-item label="优先分配比例(%)" name="priDivisPerc" :rules="baseFormRules[0]" ctype="input"></yu-xform-item>
              <yu-xform-item label="更新周期" name="updPeriod" ctype="select" :rules="baseFormRules[1]" data-code="STD_UPDATE_PERIOD"></yu-xform-item>
              <yu-xform-item label="业务类型" name="bizType" ctype="checkbox" :rules="baseFormRules[2]" data-code="STD_BIZ_SUB_TYPE"></yu-xform-item>
              <yu-xform-item label="登记人" name="inputId" ctype="input" :rules="baseFormRules[3]" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" name="inputBrId" ctype="input" :rules="baseFormRules[4]" disabled></yu-xform-item>
              <yu-xform-item label="登记时间" name="inputDate" ctype="datepicker" :rules="baseFormRules[5]" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="insert">提交</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="操作历史" name="asset">
        <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refWorkScheduleTable" form-type="search" slot="filter">
            <yu-xform-group :column="4">
              <yu-xform-item label="登记人" ctype="input" name="inputId"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refWorkScheduleTable" condition-key="condition" request-type="POST" :base-params="params" :default-load="false" @loaded="dataReady" row-number :data-url="dataUrl">
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

import { lookup, dateFormat } from '@/utils';
import { mapState } from 'vuex';
lookup.reg('STD_UPDATE_PERIOD,STD_COLLTASK_BUSI_TYPE');


export default {
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/cfgtaskurgentinfo/',
      tabName: 'base',
      expandCollapseName: 'base',
      formdata: {},
      params: {},
      baseFormRules: [
        [
          { required: true, message: '优先分配比例不能为空' }
        ],
        [
          { required: true, message: '更新周期不能为空' }
        ],
        [
          { required: true, message: '业务类型不能为空' }
        ],
        [
          { required: true, message: '登记人不能为空' }
        ],
        [
          { required: true, message: '登记机构不能为空' }
        ],
        [
          { required: true, message: '登记时间不能为空' }
        ]
      ]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
    })
  },
  mounted () {
    this.params = {sort: 'serno desc' };
  },
  methods: {
    dataReady () {
      let data = this.$refs.refWorkScheduleTable.tabledata[0];
      this.$refs.refForm.setFormData({
        inputId: this.userInfo,
        inputBrId: this.org.name,
        inputDate: this.formatTime(),
        priDivisPerc: data ? this.getPerc(data.priDivisPerc, 100) : '',
        updPeriod: data ? data.updPeriod : '',
        bizType: data ? data.bizType : ''
      });
    },
    getDictValue (val) {
      return this.$lookup.convertMultiKey('STD_BIZ_SUB_TYPE', val);
    },
    getDictValue2 (val) {
      return this.$lookup.convertMultiKey('STD_UPDATE_PERIOD', val);
    },
    formatTime () {
      var timeDt = new Date();
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    back: function () {
      yufp.router.removeTab(this.$route.path);
      this.dataReady()
    },
    insert: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      model.serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO')
      model.updId = this.userId
      model.updBrId = this.org.code
      model.updDate = this.formatTime();
      if(model.bizType instanceof Array) {
        model.bizType = model.bizType.join(',');
      }
      //只有3、6、9、12月份才可以发起任务加急配置
      var reg = /^([0-9]{4}\-(03|06|09|12)\-[0-3][0-9])$/;
      if(!reg.test(this.formdata.inputDate)) {
        this.$xutils.showMsgBox('提示', '只有3、6、9、12月份才可以发起任务加急配置');
        return;
      }
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      } // 向后台发送保存请求
      let url = `${backend.appOcaService}/api/cfgtaskurgentinfo/create`;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refWorkScheduleTable.remoteData();
            _this.$message('保存成功');
            yufp.router.removeTab(_this.$route.path);
          }
        }
      });
    },
    //转换优先分配比例为百分数
    getPerc: function(arg1, arg2) {
      if(arg1 && arg2) {
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
      } else {
        return ''
      }
    }
  }
};
</script>
