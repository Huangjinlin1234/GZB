
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 银票签发业务每周计划申请
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="银票签发业务每周计划申请" name="otherRecordAccpSignPlanApp">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherRecordAccpSignPlanAppTable" form-type="search" v-model="searchFormdata" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="登记日期" placeholder="登记日期" ctype="datepicker" name="inputDate"></yu-xform-item>
                  <yu-xform-item label="登记机构" placeholder="登记机构" ctype="input" name="inputBrId"></yu-xform-item>
                  <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          </yu-panel>
          <yu-panel title="银票签发业务每周计划申请列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
          <yu-xtable ref="otherRecordAccpSignPlanAppTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="baseParams" requestType="GET">
            <yu-xtable-column label="序号" prop="pkId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="审批表编号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="上报前一日银票余额" prop="repBefDayRecBal"></yu-xtable-column>
            <yu-xtable-column label="下周计划签发银票金额" prop="nextWeekPlanSignAmt"></yu-xtable-column>
            <yu-xtable-column label="敞口银票计划签发金额" prop="openRecPlanIssAmt"  ></yu-xtable-column>
            <yu-xtable-column label="全资质押类计划签发金额" prop="whoImnPlanIssAmt"  ></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"  ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="银票签发业务每周计划申请历史" name="otherRecordAccpSignPlanAppHis">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherRecordAccpSignPlanAppTableHis" form-type="search" v-model="searchFormdata1" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="登记日期" placeholder="登记日期" ctype="input" name="inputDate"></yu-xform-item>
                  <yu-xform-item label="登记机构" placeholder="登记机构" ctype="input" name="inputBrId"></yu-xform-item>
                  <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
               </yu-xform-group>
            </yu-xform>
          </template>
          </yu-panel>
          <yu-panel title="银票签发业务每周计划申请历史列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFnHis">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('export')" @click="outputHis">打印报表</yu-button>
            </yu-button-drop>
          <yu-xtable ref="otherRecordAccpSignPlanAppTableHis" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlHis" :base-params="baseParamsHis" requestType="GET">
            <yu-xtable-column label="序号" prop="pkId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="审批表编号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="上报前一日银票余额" prop="repBefDayRecBal"></yu-xtable-column>
            <yu-xtable-column label="下周计划签发银票金额" prop="nextWeekPlanSignAmt"></yu-xtable-column>
            <yu-xtable-column label="敞口银票计划签发金额" prop="openRecPlanIssAmt"  ></yu-xtable-column>
            <yu-xtable-column label="全资质押类计划签发金额" prop="whoImnPlanIssAmt"  ></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"  ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_APPR_STATUS');


export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      apprSerno: '',
      searchFormdata: {},
      searchFormdata1: {},
      baseParams: {condition: {oprType: '01', approveStatusS: '000,111,992'}},
      baseParamsHis: {condition: {oprType: '01', approveStatusS: '990,991,997,998,996'}},
      dataUrl: backend.cmisBiz + '/api/otherrecordaccpsignplanapp/',
      dataUrlHis: backend.cmisBiz + '/api/otherrecordaccpsignplanapp/',
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
      activeName: 'otherRecordAccpSignPlanApp'
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
      let _this = this;
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubList';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增银票签发业务每周计划申请',
        data: {
          name: _this.$route.name,
          actionType: 'ADD', // 操作类型
          data: {'serno': '0'}
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.otherRecordAccpSignPlanAppTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selData[0].approveStatus == '000' || selData[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubList';
      _this.$router.addTab({
        name: path,
        key: selData[0].serno + 'EDIT',
        title: '修改银票签发业务每周计划申请',
        data: {
          name: this.$route.name,
          actionType: 'EDIT', // 操作类型
          data: selData[0]
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.otherRecordAccpSignPlanAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubList';
      _this.$router.addTab({
        name: path,
        key: selectionsAry[0].serno + 'DETAIL',
        title: '查看银票签发业务每周计划申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },

    /**
     * 详情(历史)
     */
    infoFnHis: function () {
      let _this = this;
      let selectionsAry = _this.$refs.otherRecordAccpSignPlanAppTableHis.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignPlanAppSub/otherRecordAccpSignPlanAppSubList';
      _this.$router.addTab({
        name: path,
        key: selectionsAry[0].serno,
        title: '查看银票签发业务每周计划申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },

    /**
     * 导出
     */
    outputHis () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignPlanAppTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      rowData.src = _this.$backend.frptRptService + 'qtsx-ypqfywmzjh.cpt&serno=' + rowData[0].serno;
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
      let selections = _this.$refs.otherRecordAccpSignPlanAppTable.selections;
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
              url: backend.cmisBiz + '/api/otherrecordaccpsignplanapp/update',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.otherAccpPerferFeeAppTable.remoteData();
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
