
<template>
  <!--
    @created by  hhj
    @updated by
    @updated by
    @description 银票手续费率优惠申请列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="银票手续费率优惠" name="otherAccpPerferFeeApp">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherAccpPerferFeeAppTable" form-type="search" v-model="searchFormdata" label-width="100px">
              <yu-xform-group :column="3">
                  <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          </yu-panel>
          <yu-panel title="银票手续费率优惠申请列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
          <yu-xtable ref="otherAccpPerferFeeAppTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="baseParams" requestType="GET">
            <yu-xtable-column label="序号" prop="pkId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="审批表编号" prop="serno" ></yu-xtable-column>
             <yu-xtable-column label="登记人" prop="inputId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"  ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate"  hide-column></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime"  hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="银票手续费率优惠历史" name="otherAccpPerferFeeAppHis">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="otherAccpPerferFeeAppTableHis" form-type="search" v-model="searchFormdata1" label-width="100px">
              <yu-xform-group :column="3">
                   <yu-xform-item label="审批表编号" placeholder="审批表编号" ctype="input" name="serno"></yu-xform-item>
               </yu-xform-group>
            </yu-xform>
          </template>
          </yu-panel>
          <yu-panel title="银票手续费率优惠历史列表" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
              <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFnHis">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('export')" @click="outputHis">打印报表</yu-button>
            </yu-button-drop>
          <yu-xtable ref="otherAccpPerferFeeAppTableHis" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlHis" :base-params="baseParamsHis" requestType="GET">
            <yu-xtable-column label="序号" prop="pkId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="审批表编号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId"  ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId"  ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId"  hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate"  hide-column></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime"  hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
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
      baseParams: {condition: {approveStatusS: '000,111,992'}},
      baseParamsHis: {condition: {approveStatusS: '990,991,997,998,996'}},
      dataUrl: backend.cmisBiz + '/api/otheraccpperferfeeapp/',
      dataUrlHis: backend.cmisBiz + '/api/otheraccpperferfeeapp/',
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
      activeName: 'otherAccpPerferFeeApp'
    };
  },
  mounted () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshOtherAccpPerferFeeAppTable', this.refreshOtherAccpPerferFeeAppTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshOtherAccpPerferFeeAppTable');
  },
  methods: {
    refreshOtherAccpPerferFeeAppTable: function () {
      let _this = this;
      _this.$refs.otherAccpPerferFeeAppTable.remoteData();
    },
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
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusList';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增银票手续费率优惠申请',
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
      let selData = _this.$refs.otherAccpPerferFeeAppTable.selections;
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
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusList';
      _this.$router.addTab({
        name: path,
        key: selData[0].serno,
        title: '修改银票手续费率优惠申请',
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
      let selectionsAry = _this.$refs.otherAccpPerferFeeAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusList';
      _this.$router.addTab({
        name: path,
        key: selectionsAry[0].serno,
        title: '查看银票手续费率优惠历史申请',
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
      let selectionsAry = _this.$refs.otherAccpPerferFeeAppTableHis.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditManage/otherItem/discApply/otherAccpPerferFeeAppCusList/otherAccpPerferFeeAppCusList';
      _this.$router.addTab({
        name: path,
        key: selectionsAry[0].serno,
        title: '查看银票手续费率优惠申请',
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
      var rowData = _this.$refs.otherAccpPerferFeeAppTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      rowData.src = _this.$backend.frptRptService + 'qtsx-yhcdhpsxflyh.cpt&serno=' + rowData[0].serno;
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
      let selections = _this.$refs.otherAccpPerferFeeAppTable.selections;
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

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'GET',
              url: backend.cmisBiz + '/api/otheraccpperferfeeapp/delete/' + selections[0].serno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (selections[0].approveStatus == '992') {
                    _this.$message({ message: '自行退出成功！', type: 'info'});
                  } else {
                    _this.$message({ message: '数据删除成功！', type: 'info'});
                  }
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
