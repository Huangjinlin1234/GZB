/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="抵质押情况分析" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-panel title="" panel-type="simple">
      <yu-xform :rules="rules" ref="pspPldimnCheckForm" v-model="pldimnData" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="抵/质押物是否损毁或大幅贬值" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isRuin" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="ruinExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="抵/质押物是否被他人查封、冻结或扣押" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isClose" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="closeExpl" colspan="20"></yu-xform-item>
            <yu-xform-item label="抵/质押物变现能力与审批贷款时有无较大差异" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isChangeGuar" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="changeGuarRemark" colspan="20"></yu-xform-item>
            <yu-xform-item label="当第一还款来源出现问题时，该抵/质押物是否能迅速变现并足额抵偿相关债务" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isToEnterGuar" colspan="4" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item ctype="textarea" label="说明" :disabled="viewFlag||approveFlag||assistFlag" name="toEnterGuarRemark" colspan="20"></yu-xform-item>
            <yu-xform-item ctype="select" data-code="STD_PSP_GUAR_EVLU" label="对抵/质押物的总体评价" :disabled="viewFlag||approveFlag||assistFlag" name="totlEvlu" colspan="12" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_PSP_GUAR_EVLU,STD_ZB_YES_NO');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      taskNo: '',
      pldimnData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false, // 是否不良
      rules: {
        ruinExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
        closeExpl: { required: false, message: '字段不能为空', trigger: 'blur' },
        changeGuarRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        toEnterGuarRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  methods: {
    // setExtraValue () {
    //   // this.pldimnData.totlEvlu4Pldimn = this.pldimnData.totlEvlu;
    // },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.meta.params;
      _this.viewFlag = data.opType === 'view';
      _this.badFlag = data.pspTask.rptType == '3';
      // 任务编号
      _this.taskNo = data.pspTask.taskNo;
      const taskNo = _this.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/psppldimncheck/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.pldimnData);
              // _this.pldimnData.totlEvlu4Pldimn = data.totlEvlu;
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    validateFn: function () {
      let isRuin = this.pldimnData.isRuin;
      let isClose = this.pldimnData.isClose;
      let isChangeGuar = this.pldimnData.isChangeGuar;
      let isToEnterGuar = this.pldimnData.isToEnterGuar;
      if (isRuin === '1') {
        this.rules.ruinExpl.required = true;
      } else {
        this.rules.ruinExpl.required = false;
      }
      if (isClose === '1') {
        this.rules.closeExpl.required = true;
      } else {
        this.rules.closeExpl.required = false;
      }
      if (isChangeGuar === '1') {
        this.rules.changeGuarRemark.required = true;
      } else {
        this.rules.changeGuarRemark.required = false;
      }
      if (isToEnterGuar === '1') {
        this.rules.toEnterGuarRemark.required = false;
      } else {
        this.rules.toEnterGuarRemark.required = true;
      }
    }
  }
};
</script>
