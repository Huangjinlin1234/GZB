/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="初分信息" panel-type="simple">
      <yu-xform ref="riskResultForm" v-model="rstData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="机评分类结果" disabled ctype="select" data-code="STD_TEN_CLASS" name="autoClass" colspan="4"></yu-xform-item>
            <yu-xform-item label="机评分类理由" disabled ctype="textarea" name="autoClassReason" colspan="4"></yu-xform-item>
            <yu-xform-item label="上次分类结果" disabled  ctype="select" data-code="STD_FIVE_CLASS" name="lastClassRst" colspan="4"></yu-xform-item>
            <yu-xform-item label="上次分类日期" disabled ctype="input" name="lastCheckDate" colspan="4"></yu-xform-item>
            <yu-xform-item label="手工五级分类结果" :disabled="viewFlag||approveFlag||assistFlag"  ctype="select" data-code="STD_FIVE_CLASS" name="manualClass" colspan="4" rules="required"></yu-xform-item>
            <yu-xform-item label="人工分类理由" :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" name="manualClassReason" colspan="4" rules="required"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      guarntrData: {}, // 担保基本信息
      taskNo: '', // 任务编号
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      updateFlag: false, // 是否更新
      badFlag: false // 是否不良
    };
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.badFlag = data.riskTask.rptType == '3';
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      // 通过任务编号获取贷款信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/riskcompanaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.rstData);
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
    // 保存/更新数据
    saveFn: function () {
      const _this = this;
      let validate = false;
      _this.$refs.pspGuarntrCheckForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      let data = _this.guarntrData;
      data.taskNo = _this.$route.params.pspTask.taskNo;
      // 如果检查结果表里没数据（this.updateFlag=false），那么就新增一条检查结果
      if (!_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisPsp + '/api/pspguarntrcheck/',
          data: data,
          type: 'post',
          success: (response, status, xhr) => {
            console.log('新增成功');
            if (response.code === '0') {
              // 操作成功
              _this.actionFlag = true;
              // 更新状态 为 已保存
              _this.updateFlag = true;
              let uData = {pkId: _this.$route.params.pspTask.pkId, checkStatus: '2'};
              _this.updateStatus(uData);
              this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
              });
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      }
      // 如果检查结果表里有数据（this.updateFlag=true），那么就更新这条检查结果
      if (_this.updateFlag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisPsp + '/api/pspguarntrcheck/update',
          data: JSON.stringify(_this.guarntrData),
          type: 'post',
          success: (response, status, xhr) => {
            console.log('更新成功');
            if (response.code === '0') {
              // 操作成功
              _this.actionFlag = true;
              // 自动刷新列表数据
              this.$xutils.showMsgBox('提示', '更新成功！', 500, 140, () => {
              });
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      }
    },
    // 更新状态
    updateStatus: function (uData) {
      const _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptasklist/updatebycondition',
        data: JSON.stringify(uData),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            console.log('更新状态成功');
          } else {
            console.log('更新状态失败');
            console.log(response);
          }
        }
      });
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
