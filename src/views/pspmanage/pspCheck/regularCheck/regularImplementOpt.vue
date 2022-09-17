/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="授信时贷后管理建议落实情况" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch"></yu-xform>
      <template slot="right"></template>
      <yu-xtable :rules="rules" ref="refTable" row-number condition-key="condition" request-type="get" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo}}" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="检查项目" prop="lastLmtAdvice"></yu-xtable-column>
        <yu-xtable-column label="落实情况" :disabled="viewFlag||approveFlag||assistFlag" prop="pactCase" ctype="textarea" colspan="16"></yu-xtable-column>
      </yu-xtable>
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
      dataUrl: this.$backend.cmisPsp + '/api/pspimplementopt/queryList',
      // baseParams: {condition: {taskNo: this.$route.params.pspTask.taskNo}
      // },
      rules: {
        pactCase: [
          { required: true, message: '请输入落实情况', trigger: 'blur' },
          { min: 10, message: '落实情况不能少于10个字', trigger: 'blur' }
        ]
      },
      viewFlag: false, // 是否查看页面
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      taskNo: '' // 是否审批页面
    };
  },
  created () {
    this.init();
  },
  methods: {
    saveFn () {
      const _this = this;
      var flag = '';
      var params = {};
      var tabledata = [];
      params = _this.$refs.refTable.tabledata;
      params.forEach(item => {
        // item = item.taskNo + item.pkId + item.pactCase + item.lastLmtAdvice;
        item = {taskNo: item.taskNo, pkId: item.pkId, pactCase: item.pactCase, lastLmtAdvice: item.lastLmtAdvice};
        tabledata.push(item);
      });
      // this.$xutils.request({
      //   // 同步请求
      //   async: false,
      //   url: _this.$backend.cmisPsp + '/api/pspimplementopt/updatebypkid',
      //   data: tabledata,
      //   // data: params,
      //   type: 'post',
      //   success: (response, status, xhr) => {
      //     if (response.code === '0') {
      //       _this.$message.success('保存成功！');
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
      //     }
      //   }
      // });
      yufp.service.request({
        async:false,
        method: 'POST',
        url: _this.$backend.cmisPsp + '/api/pspimplementopt/updateList',
        data: JSON.stringify(tabledata),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
            flag = true
          } else {
            _this.$message.error(response.message);
            flag = false
          }
        }
      });
      return flag
    },

    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
      _this.taskNo = data.pspTask.taskNo;
    }
  }
};
</script>
