/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description目前主要风险点
 */
<template>
  <div>
    <yu-panel title="本次要求核查的内容" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template>
        <yu-toolBar>
          <yu-button type="primary" @click="addFn()" v-show="!viewFlag ">添加</yu-button>
          <yu-button type="primary" @click="deleteFn()" v-show="!viewFlag ">删除</yu-button>
        </yu-toolBar>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo},'sort':'create_time'}" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="主键" prop="pkId" v-if="false"></yu-xtable-column>
        <yu-xtable-column label="检查内容" prop="checkContent" ctype="textarea" :disabled="viewFlag" @blur="saveFn"></yu-xtable-column>
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
      pkField: 'serno',
      dialogTitle: '总行下发不定期贷后检查任务',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisPsp + '/api/pspissuecheckcontent/queryList',
      baseParams: {},
      deleteUrl: this.$backend.cmisPsp + '/api/pspissuecheckcontent/delete',
      issueFlag: true,
      viewFlag: false,
      taskNo: '',
      rules: {
        riskDesc: [
          { required: true, message: '请输入检查内容', trigger: 'blur' },
          { message: '检查内容不能为空！', trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init: function () {
      const _this = this;
      _this.taskNo = _this.$route.params.pspTask.taskNo;
      _this.viewFlag = _this.$route.params.viewFlag;
      _this.issueFlag = _this.$route.params.issueFlag;
      _this.checkFlag = _this.$route.params.checkFlag;
    },
    addFn: function () {
      let flag = false;
      // 校验表格数据
      this.$refs.refTable.validate(function (fields) {
        if (!fields) {
          flag = true;
        }
      });
      if (flag) {
        this.$xutils.request({
          // 同步请求
          async: false,
          url: this.$backend.cmisPsp + '/api/pspissuecheckcontent/',
          data: {taskNo: this.taskNo},
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              this.$refs.refTable.remoteData();
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      }
    },
    saveFn () {
      let selections = this.$refs.refTable.selections;
      if (selections[0].checkContent === null || selections[0].checkContent === '') {
        this.$refs.refTable.setCurrentRow(selections[0]);
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisPsp + '/api/pspissuecheckcontent/update',
        data: selections[0],
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            // this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
            // });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
          }
        }
      });
    },
    // 删除
    deleteFn () {
      let selections = this.$refs.refTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$request({
          method: 'POST',
          url: this.deleteUrl,
          data: {pkId: selections[0].pkId}
        }).then(({code, message, data}) => {
          if (code == '0') {
            this.$message({ message: '删除成功', type: 'success' });
            this.$refs.refTable.remoteData();
          } else {
            this.$message({ message: message || '删除失败', type: 'error' });
          }
        });
      });
    }
  }
};
</script>
