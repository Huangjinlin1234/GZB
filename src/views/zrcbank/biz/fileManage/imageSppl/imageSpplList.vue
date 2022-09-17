
<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="影像补扫" name="first" >
         <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
            <template slot="filter">
              <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
                 <yu-xform-group :column="3">
                   <yu-xform-item label="影像补扫编号" name="disiSerno" ></yu-xform-item>
                   <yu-xform-item label="影像补扫类型" name="spplType" ctype="select" data-code="STD_SPPL_TYPE"></yu-xform-item>
                   <yu-xform-item label="原业务流水号" name="bizSerno" ></yu-xform-item>
                   <yu-xform-item label="客户编号" name="cusId"></yu-xform-item>
                   <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                   <yu-xform-item label="任务生成方式" name="taskFlag"  ctype="select" data-code="STD_TASK_FLAG"></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
            </template>
         </yu-panel>
         <yu-panel title="影像补扫列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('addFn')">新增</yu-button>
              <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('modifyFn')">修改</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('deleteFn')">删除</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('infoFn')">查看</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
              <yu-xtable-column align="center" label="影像补扫编号" prop="disiSerno" width="200"></yu-xtable-column>
              <yu-xtable-column align="center" label="原业务流水号" prop="bizSerno" width="200"></yu-xtable-column>
              <yu-xtable-column align="center" label="合同编号" prop="contNo" width="120" ></yu-xtable-column>
              <yu-xtable-column align="center" label="借据编号" prop="billNo" width="120" ></yu-xtable-column>
              <yu-xtable-column align="center" label="任务生成方式" prop="taskFlag" width="150" data-code="STD_TASK_FLAG"></yu-xtable-column>
              <yu-xtable-column align="center" label="影像补扫类型" prop="spplType" data-code="STD_SPPL_TYPE" width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户编号" prop="cusId"  width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户名称" prop="cusName" width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="100"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" data-code="STD_ZB_REG_ORG_TYPE" width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="影像补扫历史" name="second" >
           <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
            <template slot="filter">
              <yu-xform related-table-name="refBaseTable" form-type="search" v-model="searchBaseFormdata" label-width="120px">
                 <yu-xform-group :column="3">
                   <yu-xform-item label="影像补扫编号" name="disiSerno" ></yu-xform-item>
                   <yu-xform-item label="影像补扫类型" name="spplType" ctype="select" data-code="STD_SPPL_TYPE"></yu-xform-item>
                   <yu-xform-item label="原业务流水号" name="bizSerno" ></yu-xform-item>
                   <yu-xform-item label="客户编号" name="cusId" ></yu-xform-item>
                   <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                   <yu-xform-item label="任务生成方式" name="taskFlag"  ctype="select" data-code="STD_TASK_FLAG"></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
            </template>
         </yu-panel>
         <yu-panel title="影像补扫历史列表" :hideFilter="false" :collapseHide="false" >
            <yu-button-drop>
              <yu-button type="primary" @click="infoFn1" v-if="checkCtrl('infoFn1')">查看</yu-button>
            </yu-button-drop>
            <yu-xtable  ref="refBaseTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams1">
              <yu-xtable-column align="center" label="影像补扫编号" prop="disiSerno" width="200"></yu-xtable-column>
              <yu-xtable-column align="center" label="原业务流水号" prop="bizSerno" width="200"></yu-xtable-column>
              <yu-xtable-column align="center" label="合同编号" prop="contNo" width="120" ></yu-xtable-column>
              <yu-xtable-column align="center" label="借据编号" prop="billNo" width="120" ></yu-xtable-column>
              <yu-xtable-column align="center" label="任务生成方式" prop="taskFlag" width="150" data-code="STD_TASK_FLAG"></yu-xtable-column>
              <yu-xtable-column align="center" label="影像补扫类型" prop="spplType" width="150" data-code="STD_SPPL_TYPE"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户编号" prop="cusId" width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户名称" prop="cusName" width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="100"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName" data-code="STD_TASK_FLAG" width="150"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>

// 注册字典项
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_SPPL_TYPE,STD_TASK_FLAG');
export default {
  data: function () {
    return {
      baseParams: {condition: JSON.stringify({ bcmStatus: '02', applyExistsStatus: '000,111,992'})},
      baseParams1: {condition: JSON.stringify({ bcmStatus: '01', applyExistsStatus: '997,998'})},
      activeName: 'first',
      dataUrl: backend.cmisBiz + '/api/docimagespplinfo/selectByCondition',
      searchFormdata: {},
      searchBaseFormdata: {}
    };
  },
  // watch: {
  //   // 监视路由，切换页面，页面数据自动刷新。
  //   '$route.path': function () {
  //     this.$refs.refTable.remoteData();
  //     this.$refs.refBaseTable.remoteData();
  //   }
  // },
  methods: {

    /**
     * 自定义查询功能
     */
    searchFn: function () {
      let tmpFormdata = {};
      yufp.clone(this.baseFormdata, tmpFormdata);
      this.$xutils.getFuzzyFormData(this.$refs.refForm, tmpFormdata); // 模糊查询处理
      this.$refs.refTable.remoteData({condition: JSON.stringify(tmpFormdata)});
    },
    /**
     * 影像补扫--新增
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/fileManage/imageSppl/imageSpplAddGudie',
        key: new Date().getTime(), // 必传
        title: '影像补扫新增向导'
      });
    },


    /**
     * 影像补扫--修改
     */
    modifyFn: function () {
      var _this = this;
      // 选取的表格数据
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approveStatus = selectionsAry[0].approveStatus;
      var serno = selectionsAry[0].bizSerno;
      if (approveStatus !== '000' && approveStatus !== '992') {
        this.$message({
          message: '只有待发起和打回的信息才可以修改！！',
          type: 'warning'
        });
        return;
      }
      var all = false;
      // 请求参数
      this.$router.addTab({
        name: 'zrcbank/biz/fileManage/imageSppl/imageSpplAdd',
        key: new Date().getTime(), // 必传
        title: '影像补扫详情',
        data: {
          viewType: 'EDIT',
          jsonData: selectionsAry[0],
          all: all,
          test: true,
          serno: serno
        }
      });
    },

    /**
     * 影像补扫--查看
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
      var serno = selectionsAry[0].bizSerno;
      var all = true;
      this.$router.addTab({
        name: 'zrcbank/biz/fileManage/imageSppl/imageSpplAdd',
        key: new Date().getTime(), // 必传
        title: '影像补扫查看',
        data: {
          viewType: 'DETAIL',
          jsonData: selectionsAry[0],
          all: all,
          serno: serno
        }
      });
    },

    /**
     * 影像补扫-删除
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
      var approveStatus = selectionsAry[0].approveStatus;
      if (approveStatus !== '000' && approveStatus !== '992') {
        this.$message({
          message: '只有待发起和打回的信息才可以删除！！',
          type: 'warning'
        });
        return;
      }
      var taskFlag = selectionsAry[0].taskFlag;
      if (taskFlag == '01') {
        this.$message({
          message: '系统发起的影像补扫任务不允许删除！！',
          type: 'warning'
        });
        return;
      }
      let disiSerno = selectionsAry[0].disiSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/docimagespplinfo/deleteBySerno',
              data: disiSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {

                }
              }
            });
          }
        }
      });
    },

    /**
     * 影像补扫历史--查看
     */
    infoFn1: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refBaseTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var serno = selectionsAry[0].bizSerno;
      var all = true;
      this.$router.addTab({
        name: 'zrcbank/biz/fileManage/imageSppl/imageSpplAdd',
        key: new Date().getTime(), // 必传
        title: '影像补扫查看',
        data: {
          viewType: 'DETAIL',
          jsonData: selectionsAry[0],
          all: all,
          serno: serno
        }
      });
    }

  }
};

</script>
