/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspGuarCheck">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="对外担保分析" :collapse-hide="false">
        <yu-xform ref="pspGuarCheckForm" v-model="guarData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="上期贷后检查时担保总额（万元）" :disabled="viewFlag||approveFlag||assistFlag" name="preGuarAmt" @change="calcFn" rules="requiired" ctype="yu-currency" :precision="2"></yu-xform-item>
            <yu-xform-item label="本期贷后检查时担保总额（万元）" :disabled="viewFlag||approveFlag||assistFlag" name="curtGuarAmt" @change="calcFn" rules="requiired" ctype="yu-currency" :precision="2"></yu-xform-item>
            <yu-xform-item label="对外担保变化（万元）" disabled name="guarChange"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="其中对关联企业担保总额（万元）" :disabled="viewFlag||approveFlag||assistFlag" name="correConGuarAmt" rules="required" ctype="yu-currency" :precision="2"></yu-xform-item>
            <yu-xform-item label="对外担保变化情况分析" :disabled="viewFlag||approveFlag||assistFlag" rules="required" ctype="textarea" name="guarChangeAnaly" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
import regularNormalFinAnaly from './regularNormalFinAnaly.vue';
export default {
  name: 'PspGuarCheck',
  components: { regularNormalFinAnaly },
  data: function () {
    return {
      guarData: {}, // 检查任务信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
    };
  },
  created () {
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
      // 通过任务编号获取客户对外信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspguarcheck/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.guarData);
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
    // 查看
    checkFn: function () {
      console.log('查看！');
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    },
    calcFn: function () {
      let preGuarAmt = this.guarData.preGuarAmt;
      let curtGuarAmt = this.guarData.curtGuarAmt;
      if (preGuarAmt == null || preGuarAmt == '' || curtGuarAmt == null || curtGuarAmt == '') {
        return;
      }
      let guarChange = curtGuarAmt - preGuarAmt;
      this.guarData.guarChange = guarChange;
    }
  }
};
</script>
