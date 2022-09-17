<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="客户基础信息" name="first">
      <!-- 修改标签名 -->
      <cusCorpBase ref="cusCorpBase" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBase>
    </yu-tab-pane>
    <yu-tab-pane label="登记注册信息" name="second">
      <cusCorpBaseTempLoginList ref="cusCorpBaseTempLoginList" :cusCorp="cusCorp" :viewType="viewType"></cusCorpBaseTempLoginList>
    </yu-tab-pane>
    <yu-tab-pane label="高管人员信息" name="third">
      <cusCorpMgr ref="cusCorpMgr" :cusCorp="cusCorp" :viewType="viewType"></cusCorpMgr>
    </yu-tab-pane>
    <yu-tab-pane label="资本构成信息" name="fourth">
      <cusCorpApitalInfo ref="cusCorpApitalInfo" :cusCorp="cusCorp" :viewType="viewType"></cusCorpApitalInfo>
    </yu-tab-pane>
    <yu-form-buttons v-if="viewType != 'VIEW'" class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave">暂存</yu-button>
      <yu-button type="primary" @click="onCommit">提交</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
  </yu-tabs>
</template>
<script>
// 导入的组件
import cusCorpBase from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseTempList_d1_BillCard';
import cusCorpBaseTempLoginList from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseTempLoginList_d1_BillCard';
import cusCorpMgr from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpMgrListIndex';
import cusCorpApitalInfo from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpApitalInfoListIndex';
export default {
  // 导入的组件
  components: { cusCorpBase, cusCorpBaseTempLoginList, cusCorpMgr, cusCorpApitalInfo },
  data: function () {
    return {
      activeName: 'first',
      cusCorp: {},
      viewType: 'EDIT'
    };
  },
  created () {
    this.AfterInit();
  },
  methods: {
    /**
     * 查询客户详情
     */
    AfterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      this.viewType = _this.$route.meta.params.op;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        callback: function (code, message, response) {
          _this.cusCorp = response.data;
        }
      });
    },
    /**
     * 保存
     */
    onSave () {
      var _this = this;
      var model = {};
      // 标签名 _this.$refs. 后面的是 ref="cusCorpBase" 属性
      yufp.clone(_this.$refs.cusCorpBase.formdata, model);
      yufp.clone(_this.$refs.cusCorpBaseTempLoginList.formdata, model);
      // 客户状态设置成暂存
      model.cusState = '1';
      model.bizType = _this.$route.meta.params && _this.$route.meta.params.bizType
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
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
      // 标签名 _this.$refs. 后面的是 ref="cusCorpBase" 属性
      _this.$refs.cusCorpBase.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.activeName = 'first';
        return;
      }
      _this.$refs.cusCorpBaseTempLoginList.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.activeName = 'second';
        return;
      }
      // 向后台发送保存请求
      var _this = this;
      var model = {};
      yufp.clone(_this.$refs.cusCorpBase.formdata, model);
      yufp.clone(_this.$refs.cusCorpBaseTempLoginList.formdata, model);
      // 任务状态结束
      model.taskStatus = '3';
      model.taskSerno = _this.$route.meta.params.serno;
      // 客户状态生效
      model.cusState = '2';
      model.bizType = _this.$route.meta.params && _this.$route.meta.params.bizType
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
            _this.onBack();
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
