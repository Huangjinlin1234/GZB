<template>
    <!--
    @created by wcx
    @updated by  2021-6-17 修改代码规范
    @updated by  2021-6-17 更新组件内容及标签
    @description 模板示例——档案销毁详细信息
  -->
  <div>

        <yu-panel title=" 查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform ref="searchForm" related-table-name="refTable"  v-model="formdata" label-width="110px">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户名称"  name="cusName"></yu-xform-item>
                 <yu-xform-item label="档案编号"  name="docNo"></yu-xform-item>
                 <yu-xform-item label="责任人" name="managerId" :colspan="8" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'managerId':'managerId'}" label-width="110px" ></yu-xform-item>
                 <yu-xform-item label="客户编号"  name="cusId"></yu-xform-item>
                <yu-xform-item label="关联业务编号"  name="bizSerno"></yu-xform-item>
                <yu-xform-item label="档案分类" ctype="select"  name="docClass"  data-code="STD_DOC_CLASS" ></yu-xform-item>
                <yu-xform-item label="档案类型" ctype="select" name="docType"  data-code="STD_DOC_TYPE"></yu-xform-item>
                 <yu-xform-item label="责任机构" name="managerBrId" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'managerBrId':'managerBrId'}"  label-width="110px"></yu-xform-item>
              </yu-xform-group>
              <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                    <yu-button type="primary" @click="resetFn()">重置</yu-button>
                </div>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel  :hideFilter="false" :collapseHide="false" style="margin-top:40px">
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="checkbox" requestType="POST">
            <yu-xtable-column align="center" label="档案流水号" prop="docSerno" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案编号" prop="docNo" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="归档模式" prop="archiveMode" width="100" data-code="STD_ARCHIVE_MODE"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案分类" prop="docClass" width="100" data-code="STD_DOC_CLASS"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案类型" prop="docType" width="100" data-code="STD_DOC_TYPE"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="关联业务编号" prop="bizSerno" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="入库操作人" prop="optUsrName" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="入库操作机构" prop="optOrgName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案状态" prop="docStauts" width="80" data-code="STD_DOC_STAUTS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>

    <div style="text-align:center">
        <yu-button type="primary" @click="saveFn">确认</yu-button>
        <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
  </div>
</template>

<script>
// // 注册字典项
yufp.lookup.reg('STD_DOC_CLASS,STD_DOC_TYPE,STD_DOC_STAUTS,STD_ARCHIVE_MODE');
export default {
  data: function () {
    return {
      formdata: {},
      tabledata: '',
      activeName: 'base',
      // baseParams: {
      //   condition: {regiStatus: '02'}
      // },
      // Params: {
      //   condition: {regiStatus: '02', recordStatus: '03' }
      // },
      dataUrl: backend.cmisBiz + '/api/docAccList/query/docDestoryPageList'
      // baseParams: {condition: JSON.stringify({ regiStatus: 'regiStatusHis', recordStatus: 'recordStatus'})},
      // Params: {condition: JSON.stringify({ regiStatus: 'regiStatusHis', recordStatus: 'recordStatusHis'})}
    };
  },

  methods: {

    // 条件查询
    searchFn: function () {
      this.$refs.refTable.remoteData({
        condition: JSON.stringify(this.formdata)
      });
    },

    // 重置
    resetFn: function () {
      // 清空条件
      this.$refs.searchForm.resetFields();
    },

    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.formdata[mapping[item]] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.formdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.formdata[item] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.formdata[item] = data.orgCode;
          }
        }
      }
    },


    // 遮罩用法
    /**
       * 页面loading
       */
    openLoading () {
      var dom = this.dialogId ? this.$parent.$refs.dialog : this.$parent.$el;
      var options = {
        target: dom, // Loading 需要覆盖的 DOM 节点
        body: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
        fullscreen: false,
        text: '拼命加载中' // 显示在加载图标下方的加载文案
      };
      var loadingInstance = this.$loading(options);
      return loadingInstance;
    },


    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      var docDestroyDetailLists = [];
      var loading = _this.openLoading();
      if (selectionsAry.length == 0) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      for (let i = 0; i < selectionsAry.length; i++) {
        selectionsAry[i].createDate = selectionsAry[i].inputDate;
        selectionsAry[i].belgOrg = selectionsAry[i].managerBrId;
        docDestroyDetailLists.push(selectionsAry[i]);
      }
      var ddalSerno = _this.$route.meta.params.ddalSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docDestroyAppList/introduceDocDestroyDetails',
        data: {ddalSerno, docDestroyDetailLists},
        callback: function (code, message, response) {
          if (response.code == 0) {
            // yufp.clone(response.data, _this.formdata);
            _this.$message('成功引入' + response.data + '条数据');
            _this.doBack();
            loading.close();
          } else {
          // _this.$message({ message: '操作失败：', type: 'error' });
            _this.$message.error(response.message);
          }
        }
      });
    },

    /**
     * 返回
     */
    doBack: function () {
      yufp.router.removeTab(this.$route.path);
    }


  }

};
</script>
