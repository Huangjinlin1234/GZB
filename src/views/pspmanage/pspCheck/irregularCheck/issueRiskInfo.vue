/**
* @created by hanl 2021-06-15
* @updated by
* @description本次要求核查的内容
*/
<template>
  <div>
    <yu-panel title="目前主要风险点" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template>
        <yu-toolBar>
          <yu-button type="primary" @click="addFn()" v-show="!viewFlag && checkFlag">添加</yu-button>
          <yu-button type="primary" @click="deleteFn()" v-show="!viewFlag && checkFlag">删除</yu-button>
        </yu-toolBar>
      </template>
      <yu-xtable ref="refTable" :rules="rules" row-number condition-key="condition" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'taskNo':taskNo},'sort':'create_time'}" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="主键" prop="pkId" v-if="false"></yu-xtable-column>
        <yu-xtable-column label="风险描述" prop="riskDesc" :disabled="viewFlag || issueFlag" ctype="textarea" @blur="saveFn"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import taskUrgentDetailInfoVue from '../../../zrcbank/biz/taskUrgentDetail/taskUrgentDetailInfo/taskUrgentDetailInfo.vue';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      updateFlag: false,
      pkField: 'serno',
      dialogTitle: '总行下发不定期贷后检查任务',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisPsp + '/api/pspissueriskinfo/queryList',
      baseParams: {},
      deleteUrl: this.$backend.cmisPsp + '/api/pspissueriskinfo/delete/',
      issueFlag: false,
      checkFlag: false,
      viewFlag: false,
      taskNo: '',
      rules: {
        riskDesc: [
          { required: true, message: '请输入风险描述', trigger: 'blur' },
          { message: '风险描述不能为空！', trigger: 'blur' }
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
      _this.viewFlag = _this.$route.params.opType === 'view';
      _this.issueFlag = _this.$route.params.issueFlag;
      _this.checkFlag = _this.$route.params.checkFlag;
      _this.issueFlag = _this.$route.params.issueFlag;
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
        // let row = { taskNo: this.taskNo, riskDesc: ''};
        // this.$refs.refTable.tabledata.push(row);
        // this.$refs.refTable.setCurrentRow(row);
        this.$xutils.request({
          // 同步请求
          async: false,
          url: this.$backend.cmisPsp + '/api/pspissueriskinfo/',
          data: {taskNo: this.taskNo},
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code === '0') {
              this.$refs.refTable.remoteData();
              // this.$refs.refTable.setCurrentRow(this.$refs.refTable.data[this.$refs.refTable.total]);
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
            }
          }
        });
      }
    },
    saveFn () {
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections[0].riskDesc === null || selections[0].riskDesc === '') {
        _this.$refs.refTable.setCurrentRow(selections[0]);
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/pspissueriskinfo/update',
        data: selections[0],
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            _this.updateFlag = true;
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
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        _this.$request({
          method: 'POST',
          url: _this.deleteUrl + selections[0].pkId
        }).then(({code, message, data}) => {
          if (code == '0') {
            _this.updateFlag = true;
            _this.$message({ message: '删除成功', type: 'success' });
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: message || '删除失败', type: 'error' });
          }
        });
      });
    }
  }
};
</script>
