
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
   <yu-panel title="个人经营性贷款一个人经营情况" panel-type="simple">
    <yu-xform ref="personalForm" label-width="120px" v-model="personalFormData" :disabled="op =='VIEW'">
      <yu-xform-group :clomn="2">
        <yu-xform-item label="借款人姓名" name="borrCusName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="联系电话" name="phone" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="信用评级" name="creditRate" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="出生年月" name="dtOfBirth" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="婚姻状况" name="marStatus" ctype="select" data-code="STD_ZB_MAR_ST" disabled></yu-xform-item>
        <yu-xform-item label="户籍所在地" name="permanentAddr" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="实际居住地" name="realLivingAddr" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="借款人从业经历" name="borrFjobCase" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="配偶姓名、工作单位" name="spouseNameWorkUnit" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="子女姓名、工作单位" name="childNameWorkUnit" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="家庭资产情况" name="homeAssetExpl" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="个人融资情况" name="selfFinaCase" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="个人对外担保情况" name="selfOutguarSituDesc" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="个人信用情况" name="selfCdtExpl" ctype="textarea" ></yu-xform-item>
        <yu-xform-item label="和我行合作情况" name="selfCoopCase" ctype="textarea" ></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
   </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_MAR_ST');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptpersonalbusiness/initPersonal',
        data: {
          serno: _this.param.serno,
          cusId: _this.param.cusId
        },
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.personalFormData);
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }

  }
};
</script>
