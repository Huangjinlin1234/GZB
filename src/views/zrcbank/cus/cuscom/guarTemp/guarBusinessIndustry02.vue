<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="押品基本信息" name="first">
      <!-- 修改标签名 -->
      <guarBaseInfoAdd ref="guarBaseInfoAdd"></guarBaseInfoAdd>
    </yu-tab-pane>
    <yu-tab-pane label="押品详情信息-工业用房" name="second">
      <guarBusinessIndustry02 ref="guarBusinessIndustry02"></guarBusinessIndustry02>
    </yu-tab-pane>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-show="formType == 'edit'" @click="onSave">暂存</yu-button>
      <yu-button type="primary" v-show="formType == 'edit'" @click="onCommit">提交</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
  </yu-tabs>
</template>
<script>
// 导入的组件
import { mapState } from 'vuex';
import guarBaseInfoAdd from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoAdd_d1_BillCard';
import guarBusinessIndustry02 from '@/views/guarmanage/collateralInfo/guarInfo/guarBusinessIndustry02_d1_BillCard';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  // 导入的组件
  components: { guarBaseInfoAdd, guarBusinessIndustry02, yufpNwfInit, mapState},
  data: function () {
    return {
      activeName: 'first'
    };
  },
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  created () {
    const _this = this;
    _this.formType = _this.$route.meta.params.op_type;
  },
  methods: {
    /**
     * 保存
     */
    onSave () {
      var _this = this;
      var model = {
        guarBaseInfo: {},
        guarInfBusinessIndustryHousr: {}
      };
      // 标签名 _this.$refs. 后面的是 ref="cusCorpBase" 属性
      yufp.clone(_this.$refs.guarBaseInfoAdd.formdata, model.guarBaseInfo);
      yufp.clone(_this.$refs.guarBusinessIndustry02.formdata, model.guarInfBusinessIndustryHousr);
      yufp.clone(_this.$refs.guarBaseInfoAdd.formdata, model.guarInfBusinessIndustryHousr);

      console.log(model);

      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/saveByInfBusinessIndustryHousrVo',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);

            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    /**
     * 提交
     */
    onCommit () {
      var _this = this;
      // 判断必输项
      var validate = false;
      // 标签名 _this.$refs. 后面的是 ref="guarBaseInfoAdd" 属性
      _this.$refs.guarBaseInfoAdd.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.activeName = 'first';
        return;
      }
      _this.$refs.guarBusinessIndustry02.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.activeName = 'second';
        return;
      }
      // 向后台发送保存请求
      var model = {
        guarBaseInfo: {},
        guarInfBusinessIndustryHousr: {}
      };
      yufp.clone(_this.$refs.guarBaseInfoAdd.formdata, model.guarBaseInfo);
      yufp.clone(_this.$refs.guarBusinessIndustry02.formdata, model.guarInfBusinessIndustryHousr);
      yufp.clone(_this.$refs.guarBaseInfoAdd.formdata, model.guarInfBusinessIndustryHousr);
      model.taskStatus = '3';
      model.taskSerno = _this.$route.params.serno;
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/saveByInfBusinessIndustryHousrVo',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            // this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
      // 提交流程
      let dataParams = {};
      yufp.clone(this.$route.meta.params.guarMortgageLogoutApp, dataParams);
      dataParams['isScanMater'] = this.$refs.guarBaseInfoAdd.formdata.isScanMater;// 是否集中作业扫描

      dataParams.startOrgId = this.org.id;
      let wfInitData = {};
      wfInitData.systemId = 'cmis';
      wfInitData.orgId = this.org.id;
      wfInitData.bizId = _this.$route.meta.params.serno;
      wfInitData.bizType = 'DB001';
      wfInitData.userId = this.userCode;
      wfInitData.bizUserName = this.$refs.guarBaseInfoAdd.formdata.guarCusName;
      wfInitData.bizUserId = this.$refs.guarBaseInfoAdd.formdata.guarCusId;
      wfInitData.param = dataParams;
      wfInitData.bizParam4 = '111';
      _this.$refs.yufpNwfInit.wfInit(wfInitData);
    },

    /**
     * 关闭当前页面
     */
    onBack () {
      // key 是上一个页面传过来的
      let data = this.$route.meta.params;
      yufp.frame.removeTab(data.key);
    }
  }
};
</script>
