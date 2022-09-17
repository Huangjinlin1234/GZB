/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCusBase">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="基本情况" :collapse-hide="false">
        <yu-xform ref="pspCusBaseCaseForm" v-model="cusData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="do360View" type="primary">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="借款人身份证号码" :disabled="viewFlag||approveFlag||assistFlag" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="借款人电话号码" :disabled="viewFlag||approveFlag||assistFlag" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="借款人经营的公司/店铺名称" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="24" name="workUnit" rules="required"></yu-xform-item>
            <yu-xform-item label="经营地址" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="24" name="operAddrAct" rules="required"></yu-xform-item>
            <yu-xform-item label="经营范围" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" colspan="24" name="natBusi" rules="required"></yu-xform-item>
            <yu-xform-item label="法人代表" :disabled="viewFlag||approveFlag||assistFlag" name="legalRepresent" rules="required"></yu-xform-item>
            <yu-xform-item label="实际控制人" :disabled="viewFlag||approveFlag||assistFlag" name="realOperCusName" rules="required"></yu-xform-item>
            <yu-xform-item label="风险分类" disabled ctype="select" name="riskClass"></yu-xform-item>
            <yu-xform-item label="风险预警等级" disabled ctype="select" name="riskLevel"></yu-xform-item>
            <yu-xform-item label="客户信用评级" disabled ctype="select" name="creditRank"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item name="isDataChg" label="内外部数据系统校验是否有变化" label-width="230px" ctype="radio" data-code="STD_ZB_YES_NO" colspan="10" rules="required">
            </yu-xform-item>
             <yu-xform-item name="button" ctype="custom" label="" colspan="2">
              <yu-button type="primary" @click="checkFn">校验</yu-button>
             </yu-xform-item>
            <yu-xform-item label="具体说明" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="dataChgExpl" colspan="24" rules="required"></yu-xform-item>
            <!--<yu-xform-item label="频率修改信息" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="freqModifyInfo" colspan="24" rules="required"></yu-xform-item>-->
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';

export default {
  name: 'PspCusBase',
  data: function () {
    return {
      cusData: {}, // 客户基本信息
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false // 是否更新
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
    checkFn: function () {
      this.$request({
        url: backend.cmisPsp + '/api/pspcusbasecase/checkCusIndiv',
        method: 'post', // 默认get请求
        data: this.cusData
      }).then((response) => {
        if (response.code == '0') {
          if (response.data == 'isChange') {
            this.cusData.isDataChg = '1';
          } else {
            this.cusData.isDataChg = '0';
          }
        }
      });
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      // 任务编号
      const taskNo = data.pspTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取客户信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/pspcusbasecase/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.cusData);
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
    do360View: function () {
      // TODO 客户360视图
      this.$dialog.open('客户360视图', '', 900, 650, null, null);
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
