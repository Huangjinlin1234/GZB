
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 银票签发及全资质押类业务申请
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="银票签发及全资质押类业务申请" name="otherRecordAccpSignOrAllPldApp">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherRecordAccpSignOrAllPldAppTable" form-type="search" v-model="searchFormdata" label-width="100px">
              <yu-xform-group :column="3">
                <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="银票签发及全资质押类业务申请列表" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
            <yu-button type="primary" v-if="checkCtrl('edit')" click="modifyFn">修改</yu-button>
            <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
            <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="otherRecordAccpSignOrAllPldAppTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="baseParams" requestType="GET">
            <yu-xtable-column label="审批表编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="拟签发起始日" prop="planIssStartDate"></yu-xtable-column>
            <yu-xtable-column label="票据期限（天）" prop="drftTerm"></yu-xtable-column>
            <yu-xtable-column label="票据类型" prop="pldDrftType" data-code="STD_PLD_DRFT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="申请签发金额（万元）" prop="appIssAmt">
              <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.appIssAmt * 1 / 10000).toFixed(6)) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="担保方式或质押类型" prop="guarImnType" data-code="STD_GUAR_IMN_TYPE"></yu-xtable-column>
            <yu-xtable-column label="贷款金额（万元）" prop="loanAmt">
              <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.loanAmt * 1 / 10000).toFixed(6)) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="贷款利率" prop="loanRate"></yu-xtable-column>
            <yu-xtable-column label="贷款期限" prop="loanTerm"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="银票签发及全资质押类业务申请历史" name="otherRecordAccpSignOrAllPldAppHis">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherRecordAccpSignOrAllPldAppTableHis" form-type="search" v-model="searchFormdata1" label-width="100px">
              <yu-xform-group :column="3">
                <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="银票签发及全资质押类业务申请历史列表" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFnHis">查看</yu-button>
            <yu-button type="primary" v-if="checkCtrl('export')" @click="outputHis">打印报表</yu-button>
          </yu-button-drop>
          <yu-xtable ref="otherRecordAccpSignOrAllPldAppTableHis" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlHis" :base-params="baseParamsHis" requestType="GET">
            <!-- <yu-xtable-column label="序号" prop="pkId"></yu-xtable-column> -->
            <yu-xtable-column label="审批表编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="拟签发起始日" prop="planIssStartDate"></yu-xtable-column>
            <yu-xtable-column label="票据期限（天）" prop="drftTerm"></yu-xtable-column>
            <yu-xtable-column label="票据类型" prop="pldDrftType"></yu-xtable-column>
            <yu-xtable-column label="申请签发金额" prop="appIssAmt" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="担保方式或质押类型" prop="guarImnType"></yu-xtable-column>
            <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column label="贷款利率" prop="loanRate"></yu-xtable-column>
            <yu-xtable-column label="贷款期限" prop="loanTerm"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
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
      baseParams: {
        condition: { oprType: '01', approveStatusS: '000,111,990,991,992,993' }
      },
      baseParamsHis: {
        condition: { oprType: '01', approveStatusS: '996,997,998' }
      },
      dataUrl: backend.cmisBiz + '/api/otherrecordaccpsignorallpldapp/',
      dataUrlHis: backend.cmisBiz + '/api/otherrecordaccpsignorallpldapp/',
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
      activeName: 'otherRecordAccpSignOrAllPldApp'
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
        '新增银票签发及全资质押类业务',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOrAllPldApp/otherRecordAccpSignOrAllPldAppInfo',
        1200,
        600,
        rowData,
        function () {
          _this.$refs.otherRecordAccpSignOrAllPldAppTable.remoteData();
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
      var rowData = _this.$refs.otherRecordAccpSignOrAllPldAppTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approveStatus = rowData[0].approveStatus;
      // if (approveStatus != "000") {
      //   _this.$message({
      //     message: "已发起的数据不允许修改",
      //     type: "warning",
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
      rowData = rowData[0];
      rowData['pk_id'] = rowData.pkId;
      rowData['op'] = 'EDIT';
      rowData['editAble'] = true;
      this.$dialog.open(
        '修改银票签发及全资质押类业务',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOrAllPldApp/otherRecordAccpSignOrAllPldAppInfo',
        1300,
        600,
        rowData,
        function () {
          _this.$refs.otherRecordAccpSignOrAllPldAppTable.remoteData();
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
      var rowData = _this.$refs.otherRecordAccpSignOrAllPldAppTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData = rowData[0];
      rowData['pk_id'] = rowData.pkId;
      rowData['op'] = 'DETAIL';
      rowData['editAble'] = false;
      this.$dialog.open(
        '查看银票签发及全资质押类业务',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOrAllPldApp/otherRecordAccpSignOrAllPldAppInfo',
        1200,
        600,
        rowData,
        () => {},
        true,
        true
      );
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections =
        _this.$refs.otherRecordAccpSignOrAllPldAppTable.selections;
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
              url:
                backend.cmisBiz + '/api/otherrecordaccpsignorallpldapp/update',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info' });
                  _this.$refs.otherRecordAccpSignOrAllPldAppTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    infoFnHis () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignOrAllPldAppTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData = rowData[0];
      rowData['pk_id'] = rowData.pkId;
      rowData['op'] = 'DETAIL';
      rowData['editAble'] = true;
      this.$dialog.open(
        '查看银票签发及全资质押类业务',
        'zrcbank/biz/creditManage/otherItem/otherRecord/otherRecordAccpSignOrAllPldApp/otherRecordAccpSignOrAllPldAppInfo',
        1200,
        600,
        rowData,
        () => {},
        true,
        true
      );
    },

    /**
     * 导出
     */
    outputHis () {
      var _this = this;
      var rowData = _this.$refs.otherRecordAccpSignOrAllPldAppTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      rowData.src = _this.$backend.frptRptService + 'qtsx-ypqfjqzzylywba.cpt&serno=' + rowData[0].serno;
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
    }
  }
};
</script>
