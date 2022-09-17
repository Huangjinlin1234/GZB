<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="抵债资产处置记账" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="160px" v-model="baseFormdata" style="text-align: center;">
        <yu-xform-group :column="2">
          <yu-xform-item label="处置记账流水号" name="papreSerno" hidden></yu-xform-item>
          <yu-xform-item label="抵债资产处置申请流水号" name="papaiSerno" hidden></yu-xform-item>
          <yu-xform-item label="抵入金额" name="dispAmt"  disabled ctype="num"></yu-xform-item>
          <yu-xform-item label="处置金额 " name="toEnterAmt"  disabled ctype="num"></yu-xform-item>
          <yu-xform-item label="处置本金 " name="dispExpense" ctype="num" ></yu-xform-item>
          <yu-xform-item label="处置费用" name="dispCap" ctype="num"></yu-xform-item>
          <yu-xform-item label="处置利息" name="dispInt" ctype="num"></yu-xform-item>
          <yu-xform-item label="处置挂账账号" name="dispSuspAcctNo" rules="required"></yu-xform-item>
          <yu-xform-item label="挂账编号" name="suspNo" rules="required"></yu-xform-item>
          <yu-xform-item label="处置挂账户名" name="dispSuspName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="抵债资产账号" name="resistAssetAcctNo" rules="required"></yu-xform-item>
          <yu-xform-item label="抵债资产户名" name="resistAssetName" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave" :hidden="viewType !== 'SENDHX'">记账</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
// 获取仓库数据
// import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
export default {
  data: function () {
    return {
      baseFormdata: {},
      viewType: ''
    };
  },

  mounted () {
    var _this = this;
    var papaiSerno = _this.$route.meta.params.papaiSerno;
    this.viewType = _this.$route.meta.params.viewType;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/plaassetpldrecordrel/getrecordrel',
      data: papaiSerno,
      callback: function (code, message, response) {
        if (response.data == '0') {
          yufp.clone(response.data, _this.baseFormdata);
        } else {
          _this.$message.error(response.message);
        }
      }
    });
  },

  methods: {
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return;
        };
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plaassetpldrecordrel/save',
          data: _this.baseFormdata,
          callback: function (code, message, response) {
            _this.$message('操作成功');
            yufp.router.removeTab(_this.$route.path);
          }
        });
      });
    }
  }
};

</script>
