/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspOperStatusCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="经营状况检查" :collapse-hide="false">
        <yu-xform :rules="rules" ref="pspOperstatusForm" v-model="operData" label-width="360px">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否对经营场所现场检查并拍照确认" :disabled="viewFlag||approveFlag||assistFlag" colspan="8" ctype="radio" data-code="STD_ZB_YES_NO" name="isPhotograph" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="16" placeholder="生产型企业至少要对厂牌、主要生产车间和仓库拍照，贸易型公司至少要对门牌、经营场所拍照。如因特殊原因无法拍照的，说明合理理由。" :rules="{ required: isOverstockedProducts, message: '字段不能为空'}" name="notPhotographRemark"></yu-xform-item>
            <yu-xform-item label="借款人具体经营内容" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="24" name="operContent"></yu-xform-item>
            <yu-xform-item label="目前借款人经营是否正常" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" colspan="8" data-code="STD_ZB_YES_NO" name="isOperNormal" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="16" name="notOperNormalRemark" :rules="{ required: isOrderDowen, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="借款人身体是否健康" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" colspan="8" data-code="STD_ZB_YES_NO" name="isHealth" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="16" name="notHealthRemark" :rules="{ required: isOutputDowen, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="是否有其他重要风险事项" :disabled="viewFlag||approveFlag||assistFlag" colspan="8" ctype="radio" data-code="STD_ZB_YES_NO" name="isOtherRemark" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="16" name="otherRemark" :rules="{ required: isAddInvest, message: '字段不能为空'}"></yu-xform-item>
            <yu-xform-item label="借款人环评颜色：  上期结果"  disabled data-code="STD_ZB_ENVI_EVLU" ctype="select" colspan="12" name="preEvluRst"></yu-xform-item>
            <yu-xform-item label="本期结果" :disabled="viewFlag||approveFlag||assistFlag" data-code="STD_ZB_ENVI_EVLU" ctype="select" colspan="12" name="curtEvluRst" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="环评变化说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="evluChangeRemark" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_ENVI_EVLU');

export default {
  name: 'PspCheckRst',
  data: function () {
    return {
      operData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },
  created () {
    //
  },
  computed: {

    isOverstockedProducts: function () {
      return this.operData.isPhotograph == '0';
    },
    isOrderDowen: function () {
      return this.operData.isOperNormal == '0';
    },
    isOutputDowen: function () {
      return this.operData.isHealth == '0';
    },
    isAddInvest: function () {
      return this.operData.isOtherRemark == '1';
    }
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
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
        url: _this.$backend.cmisPsp + '/api/pspoperstatuscheck/querySingle',
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
      let isPhotograph = this.operData.isPhotograph;
      let isOperNormal = this.operData.isOperNormal;
      let isHealth = this.operData.isHealth;
      let isOtherRemark = this.operData.isOtherRemark;
      let curtEvluRst = this.operData.curtEvluRst;
      if (isPhotograph === '0') {
        this.rules.notPhotographRemark.required = true;
      } else {
        this.rules.notPhotographRemark.required = false;
      }
      if (isOperNormal === '0') {
        this.rules.notOperNormalRemark.required = true;
      } else {
        this.rules.notOperNormalRemark.required = false;
      }
      if (isHealth === '0') {
        this.rules.notHealthRemark.required = true;
      } else {
        this.rules.notHealthRemark.required = false;
      }
      if (isOtherRemark === '1') {
        this.rules.otherRemark.required = true;
      } else {
        this.rules.otherRemark.required = false;
      }
      if (curtEvluRst === '3' || curtEvluRst === '4' || curtEvluRst === '5') {
        this.rules.operContent.required = true;
        this.rules.evluChangeRemark.required = true;
      } else {
        this.rules.operContent.required = false;
        this.rules.evluChangeRemark.required = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
