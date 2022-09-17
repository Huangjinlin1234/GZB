
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="额度白名单申请详情">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" name="serno" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-button-drop type="button">
            <yu-button type="primary" @click="openMovie">影像</yu-button>
          </yu-button-drop>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="业务编号" name="bussNo" :rules="rule[0]" ctype="input"></yu-xform-item>
          <yu-xform-item label="源系统" name="sysId" :rules="rule[0]" ctype="select" data-code="STD_PERIPHERAL_SYS"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" :rules="rule[0]" ctype="input" icon="search" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="例外类型" name="exptType" :rules="rule[0]" ctype="checkbox" data-code="STD_ZB_EXPT_TYPE"></yu-xform-item>
          <yu-xform-item label="例外原因" name="exptResn" :rules="rule[0]" ctype="textarea" :rows="3" :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" :rules="rule[0]" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>

yufp.lookup.reg('STD_ZB_EXPT_TYPE,STD_ZB_APPR_STATUS');
import { imageSystem } from '@/utils/unitchange';
export default {
  components: { },
  props: {
    bizPageData: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: true,
      dialogVisibleMovie: false,
      viewType: 'DETAIL'
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.serno = this.bizPageData.instanceInfo.bizId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisLmt + '/api/lmtexptlistapp/selectByModel',
        data: { condition: JSON.stringify({ oprType: '01', serno: _this.serno }) },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);
        }
      });
    },

    /**
     * 选择
     */
    onChange () {
    },

    /**
     * 影像
     */
    openMovie () {
      var _this = this;
      let params = _this.formdata;
      let imageBizParam = [
        {
          // TODO 根据实际业务场景修正
           top_outsystem_code: 'XXD_TYED',
            index: {
              businessid: params.serno,
              custtype: params.curType,
              custconductid: params.inputId,
              custconductname: params.inputIdName,
              orgid: params.inputBrId,
              orgname: params.inputBrIdName,
              opername: params.updIdName,
              custid: params.cusId,
              custname: params.cusName,
              custconduct: '',
              operid: '',
              maintaindate: '',
              contid: "",
              billno: ""
          }
        }
      ];
      imageSystem (imageBizParam, "1", "import;download").then(res => {
        window.open(res);
      })
    }
  }
};
</script>
