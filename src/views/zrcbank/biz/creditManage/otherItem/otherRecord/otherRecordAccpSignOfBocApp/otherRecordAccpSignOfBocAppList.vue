
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 中行代签电票申请
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="中行代签电票申请" name="otherRecordAccpSignOfBocApp">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherRecordAccpSignOfBocAppTable" form-type="search" v-model="searchFormdata" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                  <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
                  <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          </yu-panel>
          <yu-panel title="中行代签电票申请列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
          <yu-xtable ref="otherRecordAccpSignOfBocAppTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="baseParams" requestType="GET">
            <yu-xtable-column label="序号" prop="pkId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="审批表编号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"  ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"  ></yu-xtable-column>
            <yu-xtable-column label="签发金额" prop="issAmt"  ></yu-xtable-column>
            <yu-xtable-column label="签发期限" prop="issTerm"  data-code="STD_ISS_TERM"></yu-xtable-column>
            <yu-xtable-column label="质押方式" prop="imnType" data-code="STD_IMN_TYPE" ></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"  ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"  ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="中行代签电票申请历史" name="otherRecordAccpSignOfBocAppHis">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherRecordAccpSignOfBocAppTableHis" form-type="search" v-model="searchFormdata1" label-width="100px">
              <yu-xform-group :column="3">
                    <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                    <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
                    <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
               </yu-xform-group>
            </yu-xform>
          </template>
          </yu-panel>
          <yu-panel title="中行代签电票申请历史列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFnHis">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('export')" @click="outputHis">打印报表</yu-button>
            </yu-button-drop>
          <yu-xtable ref="otherRecordAccpSignOfBocAppTableHis" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlHis" :base-params="baseParamsHis" requestType="GET">
            <yu-xtable-column label="序号" prop="pkId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="审批表编号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"  ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"  ></yu-xtable-column>
            <yu-xtable-column label="签发金额" prop="issAmt"  ></yu-xtable-column>
            <yu-xtable-column label="签发期限" prop="issTerm"  data-code="STD_ISS_TERM"></yu-xtable-column>
            <yu-xtable-column label="质押方式" prop="imnType" data-code="STD_IMN_TYPE" ></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"  ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"  ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ISS_TERM,STD_IMN_TYPE,STD_ZB_APPR_STATUS');


export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      apprSerno: '',
      searchFormdata: {},
      searchFormdata1: {},
      baseParams: {condition: {oprType: '01', approveStatusS: '000,111,990,991,992,993'}},
      baseParamsHis: {condition: {oprType: '01', approveStatusS: '996,997,998'}},
      dataUrl: backend.cmisBiz + '/api/otherrecordaccpsignofbocapp/',
      dataUrlHis: backend.cmisBiz + '/api/otherrecordaccpsignofbocapp/',
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      dialogVisibleSelected: false,
      dialogVisibleSelectedDialog: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      activeName: 'otherRecordAccpSignOfBocApp'
    };
  },
  methods: {
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      var rowData = {};
      rowData['op'] = 'ADD';
      this.$dialog.open(
        '新增中行代签电票申请',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOfBocApp/otherRecordAccpSignOfBocAppInfo',
        1200,
        600,
        rowData,
        function () {
          _this.$refs.otherRecordAccpSignOfBocAppTable.remoteData();
        },
        true,
        true
      );
    },

    /**
    * 修改
    */
    modifyFn: function () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignOfBocAppTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approveStatus = rowData[0].approveStatus;
      // if (approveStatus != '000') {
      //   _this.$message({
      //     message: '已发起的数据不允许修改',
      //     type: 'warning'
      //   });
      //   return;
      // }
      if (!(approveStatus == '000' || approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      rowData['pk_id'] = rowData[0].pkId;
      rowData['op'] = 'EDIT';
      rowData['serno'] = rowData[0].serno;
      rowData['editAble'] = false;
      this.$dialog.open(
        '修改中行代签电票申请',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOfBocApp/otherRecordAccpSignOfBocAppInfo',
        1200,
        600,
        rowData,
        function () {
          _this.$refs.otherRecordAccpSignOfBocAppTable.remoteData();
        },
        true,
        true
      );
    },

    /**
     * 申请详情查看
     */
    infoFn: function () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignOfBocAppTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['pk_id'] = rowData[0].pkId;
      rowData['op'] = 'DETAIL';
      rowData['serno'] = rowData[0].serno;
      rowData['editAble'] = true;
      this.$dialog.open(
        '查看中行代签电票申请',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOfBocApp/otherRecordAccpSignOfBocAppInfo',
        1200,
        600,
        rowData,
        () => {
        },
        true,
        true
      );
    },

    /**
     * 申请详情查看
     */
    infoFnHis: function () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignOfBocAppTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['pk_id'] = rowData[0].pkId;
      rowData['op'] = 'DETAIL';
      rowData['serno'] = rowData[0].serno;
      rowData['editAble'] = true;
      this.$dialog.open(
        '查看中行代签电票申请',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOfBocApp/otherRecordAccpSignOfBocAppInfo',
        1200,
        600,
        rowData,
        () => {
        },
        true,
        true
      );
    },

    /**
     * 导出
     */
    outputHis () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignOfBocAppTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      rowData.src = _this.$backend.frptRptService + 'qtsx-zhdqdpsp.cpt&serno=' + rowData[0].serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: rowData
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.otherRecordAccpSignOfBocAppTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selections[0].approveStatus == '000' || selections[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
        return;
      }

      selections[0].oprType = '02';

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/otherrecordaccpsignofbocapp/update',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (selections[0].approveStatus == '992') {
                    _this.$message({ message: '自行退出成功！', type: 'info'});
                  } else {
                    _this.$message({ message: '数据删除成功！', type: 'info'});
                  }
                  _this.$refs.otherRecordAccpSignOfBocAppTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
