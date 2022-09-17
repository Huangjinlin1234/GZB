/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspSmallOperCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="经营情况分析" :collapse-hide="false">
        <yu-xform :rules="rules" ref="pspSmallOperForm" v-model="operData" label-width="360px">
          <yu-xform-group :column="2">
            <yu-xform-item label="产品库存是否大幅增加" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isBigGrowStorage" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="bigGrowStorageRemark"></yu-xform-item>
            <yu-xform-item label="借款人是否存在过度对外投资" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isBigOuterInvest" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="bigOuterInvestRemark"></yu-xform-item>
            <yu-xform-item label="借款人经营所有权是否发生重大变化" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isBigChangeOwner" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="bigChangeOwnerRemark"></yu-xform-item>
            <yu-xform-item label="贷款用途是否符合约定" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isSuitAgreed" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="suitAgreedRemark"></yu-xform-item>
            <yu-xform-item label="借款人经营是否正常" rules="required" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_ZB_YES_NO" name="isNormalOper" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="normalOperRemark"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  name: 'PspCheckRst',
  components: { },
  data: function () {
    return {
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      rules: {
        bigGrowStorageRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        bigOuterInvestRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        bigChangeOwnerRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        suitAgreedRemark: { required: false, message: '字段不能为空', trigger: 'blur' },
        normalOperRemark: { required: false, message: '字段不能为空', trigger: 'blur' }
      }
    };
  },
  created () {
    //
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过客户号获取客户评级信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspdebitopercaseanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.operData);
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
      let isBigGrowStorage = this.operData.isBigGrowStorage;
      let isBigOuterInvest = this.operData.isBigOuterInvest;
      let isBigChangeOwner = this.operData.isBigChangeOwner;
      let isSuitAgreed = this.operData.isSuitAgreed;
      let isNormalOper = this.operData.isNormalOper;
      if (isBigGrowStorage === '1') {
        this.rules.bigGrowStorageRemark.required = true;
      } else {
        this.rules.bigGrowStorageRemark.required = false;
      }
      if (isBigOuterInvest === '1') {
        this.rules.bigOuterInvestRemark.required = true;
      } else {
        this.rules.bigOuterInvestRemark.required = false;
      }
      if (isBigChangeOwner === '1') {
        this.rules.bigChangeOwnerRemark.required = true;
      } else {
        this.rules.bigChangeOwnerRemark.required = false;
      }
      if (isSuitAgreed === '0') {
        this.rules.suitAgreedRemark.required = true;
      } else {
        this.rules.suitAgreedRemark.required = false;
      }
      if (isNormalOper === '0') {
        this.rules.normalOperRemark.required = true;
      } else {
        this.rules.normalOperRemark.required = false;
      }
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>

<style scoped>

</style>
