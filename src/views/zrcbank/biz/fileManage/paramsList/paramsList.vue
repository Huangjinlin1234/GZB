
<template>
  <div>
         <yu-panel title="档案参数配置" :hideFilter="false" :collapseHide="false">
            <template slot="filter">
              <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
                 <yu-xform-group :column="3">
                   <yu-xform-item label="档案分类" placeholder="" name="docClass" ctype="select" data-code="STD_DOC_CLASS"></yu-xform-item>
                   <yu-xform-item label="档案类型" placeholder="" name="docType" ctype="select" data-code="STD_DOC_TYPE"></yu-xform-item>
                   <yu-xform-item label="是否启用" placeholder="" name="isBegin" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
            </template>
         </yu-panel>
         <yu-panel title="档案参数配置" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('addFn')">新增</yu-button>
              <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('modifyFn')">修改</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('deleteFn')">删除</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('infoFn')">查看</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
              <yu-xtable-column align="center" label="业务流水号" width="320" prop="cdplSerno" ></yu-xtable-column>
              <yu-xtable-column align="center" label="档案分类" width="200" prop="docClass" data-code="STD_DOC_CLASS"></yu-xtable-column>
              <yu-xtable-column align="center" label="档案类型" width="200" prop="docType" data-code="STD_DOC_TYPE"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记人" width="200" prop="inputIdName" ></yu-xtable-column>
              <yu-xtable-column align="center" label="登记机构" width="200" prop="inputBrIdName" data-code="STD_ZB_REG_ORG_TYPE"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记日期" width="200" prop="inputDate"></yu-xtable-column>
              <yu-xtable-column align="center" label="是否启用" width="200" prop="isBegin" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
  </div>
</template>
<script>

// 注册字典项
yufp.lookup.reg('STD_DOC_CLASS,STD_DOC_TYPE,STD_ZB_YES_NO');
export default {
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/cfgdocparamslist/selectByCondition'
    };
  },
  methods: {
    /**
     *新增
     */
    addFn () {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/fileManage/paramsList/paramsDetailAdd',
        key: 'paramsDetailAdd' + new Date().getTime(), // 必传
        title: '档案参数配置新增',
        data: {
          viewType: 'ADD'
        }
      });
    },


    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // var isBegin = selectionsAry[0].isBegin;
      // 测试需要 先关闭此功能
      /*   if (isBegin == '1') {
        this.$message({
          message: '已启用的无法修改！！',
          type: 'warning'
        });
        return;
      }*/
      let cdplSerno = selectionsAry[0].cdplSerno;
      this.$router.addTab({
        name: 'zrcbank/biz/fileManage/paramsList/paramsDetailUpdate',
        key: 'paramsDetailUpdate' + new Date().getTime(), // 必传
        title: '档案参数配置修改',
        data: {
          viewType: 'EDIT',
          cdplSerno: cdplSerno
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let cdplSerno = selectionsAry[0].cdplSerno;
      this.$router.addTab({
        name: 'zrcbank/biz/fileManage/paramsList/paramsDetail',
        key: 'paramsDetail' + new Date().getTime(), // 必传
        title: '档案参数配置查看',
        data: {
          viewType: 'DETAIL',
          cdplSerno: cdplSerno
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var isBegin = selectionsAry[0].isBegin;
      if (isBegin == '1') {
        this.$message({
          message: '已启用的无法删除！！',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/cfgdocparamslist/deleteByCdplSerno',
              data: JSON.stringify({ 'cdplSerno': _this.$refs.refTable.selections[0].cdplSerno}),
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }

  }
};

</script>
