
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="免追加担保" panel-type="simple">
      <div>
        <span>不符合下述条件但仍需要免追加的需填写该申请<br></span>
        <span>张农商银规章[2018]143号《张家港农村商业银行公司类客户授信操作实施细则》：<br></span>
        <span>一、满足下列情况之一的，可免除追加法人代表配偶和成年子女保证担保：<br></span>
        <span>1、按我行抵押率规定办理抵押，未提高抵押率，且为房地产足额抵押的（光地抵押、协议价抵押、年租制土地上的房产抵押除外）；<br></span>
        <span>2、我行认定的一类担保公司保证担保的；<br></span>
        <span>3、法人代表不是实际控制人的；<br></span>
        <span>4、国有控股类经营性公司的融资；<br></span>
        <span>5、借款人为上市公司的（不含“新三板”挂牌企业）；<br></span>
        <span>6、法人代表前配偶；法人代表成年子女随前配偶生活且不参与企业生产经营的。<br></span>
        <span>7、客户内部评级在2A级以上的；<br></span>
        <span>二、下列情况可免除追加成年子女担保：<br></span>
        <span>1、成年女儿已出嫁，且不参与经营的；<br></span>
        <span>2、成年子女在异地或国外读书、工作、服兵役等。<br></span>
        <br>
      </div>
      <yu-xtable ref="noAddGuarTable" row-number :pageable="false" :data-url="noAddGuarUrl" :base-params="noAddGuarData" request-type="POST">
        <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
        <yu-xtable-column prop="proType" label="项目" data-code="STD_OTHER_PRD_TYPE"></yu-xtable-column>
        <yu-xtable-column prop="noAddReason" label="具体免追加理由说明"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="其他事项申请" panel-type="simple">
    <div>
    <span>免查征信申请特别提示：<br></span>
    <span>1、我行相关制度中允许免除征信查询的无须填写该表；<br></span>
    <span>2、无正当理由不得免除征信查询，总行有权驳回该申请。<br></span>
    <span>制度要求：<br></span>
    <span>张农商银规章[2018]181号《张家港农村商业银行公司类授信业务审批资料操作规程》:<br></span>
    <span>1、如果企业股东是夫妻关系或是其他直系亲属关系的，应查询夫妻双方或直系亲属的个人信用报告；<br></span>
    <span>2、如果企业不愿查询法人代表及实际控制人的个人信用报告，应在调查报告中说明原因。<br></span>
    <span>3、借款人主体为国有控股类公司、镇村级经济合作社的法人代表可不提供个人征信报告。<br></span>
    <br>
    </div>
      <yu-xtable ref="otherAddTable" row-number :pageable="false" :data-url="otherAddUrl" :base-params="otherAddData" request-type="POST">
        <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
        <yu-xtable-column prop="proType" label="项目" data-code="STD_OTHER_PRD_TYPE"></yu-xtable-column>
        <yu-xtable-column prop="noAddReason" label="具体免追加理由说明"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      noAddGuarUrl: '',
      otherAddUrl: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.noAddGuarUrl = this.$backend.cmisBiz + '/api/rptotherappnoaddguar/selectByGrp';
    this.otherAddUrl = this.$backend.cmisBiz + '/api/rptotherappnoaddguar/selectByGrp';
    _this.noAddGuarData = {
      condition: JSON.stringify({ serno: _this.param.grpSerno, proList: ['01', '02', '03', '04']})
    };
    _this.otherAddData = {
      condition: JSON.stringify({ serno: _this.param.grpSerno, proList: ['05', '06'] })
    };
  },
  methods: {}
};
</script>
