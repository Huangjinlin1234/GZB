<template>
  <!--
    @created by yangwl
    @time  2021/5/5
    @description 集团客户额度冻结/解冻/终止
  -->
  <div>
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="集团客户额度冻结/解冻/终止申请" name="base">
        <yu-panel title="集团客户额度冻结/解冻/终止申请" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search" label-width="60px">
            <yu-xform-group :column="4">
              <yu-xform-item label="集团客户名称" placeholder="名称" ctype="input" name="grpCusName"></yu-xform-item>
              <yu-xform-item label="集团客户编号" placeholder="编号" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatus"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
              <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" request-type="post" condition-key="condition">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtAccOperType" width="200" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号" prop="grpCusId">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称" prop="grpCusName">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusName }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="集团客户额度冻结/解冻/终止历史" name="asset">
        <yu-panel title="集团客户额度冻结/解冻/终止历史" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTableHis" form-type="search" label-width="60px">
            <yu-xform-group :column="4">
              <yu-xform-item label="集团客户名称" placeholder="名称" ctype="input" name="grpCusName"></yu-xform-item>
              <yu-xform-item label="集团客户编号" placeholder="编号" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatusHis"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button type="primary" @click="viewFn" v-if="checkCtrl('view')">查看</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTableHis" :data-url="dataUrl2" request-type="post" condition-key="condition">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtAccOperType" width="200" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号" prop="grpCusId">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称" prop="grpCusName">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusName }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="查看" :visible.sync="dialogVisible">
      <yu-xform label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" ctype="input" name="grpSerno"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="input" name="lmtAccOperType" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记日期"  name="inputDate"></yu-xform-item>
          <yu-xform-item label="审批状态"  name="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" v-show="saveBtnShow" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="" :visible.sync="addDialogVisible">
      <yu-panel title="集团客户额度冻结/解冻/终止" :hideFilter="false" :collapseHide="false">
        <div style="padding:0 30%">
          <yu-xform label-width="120px" v-model="addFormdata" ref="refForm">
            <yu-xform-group column="1">
              <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" data-code="STD_LMT_ACC_OPER_TYPE" rules="required"></yu-xform-item>
              <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" colspan="21" rules="required">
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
                <yu-button type="primary" @click="selectFn">选取</yu-button>
              </yu-xform-item>
              <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled="true" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </div>
      </yu-panel>
      <yu-form-buttons style="text-align:center">
        <yu-button type="primary" @click="nextFn">下一步</yu-button>
        <yu-button type="primary" @click="cancelAddFn">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>

    <yu-xdialog :visible.sync="selectFnDialogVisible" :width="width">
      <yu-panel title="客户额度选取" panel-type="simple">
        <yu-xform form-type="search" v-model="searchFormdataCorp" label-width="100px" related-table-name="refCusTable">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="grpNo"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="grpName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        <yu-xtable ref="refCusTable" :row-number="true" selection-type="radio" request-type="post" :pageable="true" :data-url="dataUrl3" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="grpNo"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="grpName"></yu-xtable-column>
          <yu-xtable-column label="授信总额" prop="totalAmt"></yu-xtable-column>
          <yu-xtable-column label="授信已用额度" prop="totalUseAmt"></yu-xtable-column>
          <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口" prop="totalSpacAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口已用额度" prop="totalSpacUseAmt"></yu-xtable-column>
          <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt"></yu-xtable-column>
        </yu-xtable>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveCusFn">确定</yu-button>
        </div>
      </yu-panel>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_ACC_OPER_TYPE');

export default {
  data: function () {
    return {
      tabName: 'base',
      dataUrl: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/queryAll',
      dataUrl2: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/queryHis',
      dialogVisible: false,
      formDisabled: true,
      formdata: {},
      addDialogVisible: false,
      selectFnDialogVisible: false,
      baseParams: {},
      addFormdata: {},
      dataUrl3: backend.cmisLmt + '/api/apprstrmtableinfo/selectGrpStrInfoByList'
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFnStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFnStatusHis: function (opts, datacode, name) { // 990,991,993,997,998,996
      return opts.filter(function (op) {
        if (op.key === '990' || op.key === '991' || op.key === '993' || op.key === '996' || op.key === '997' || op.key === '998') {
          return true;
        }
        return false;
      });
    },
    /**
     * 新增
     */
    addFn: function () {
      this.addDialogVisible = true;

      // this.$router.addTab({
      //   // 路由名称
      //   name: 'zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyOperVie',
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: 'lmtGrpReplyOperVie', // 必传
      //   // 页签名称
      //   title: '新增向导页面',
      //   // 传递的业务数据，可选配置
      //   data: {
      //     saveBtnShow: true,
      //     viewType: 'ADD'
      //   }
      // });
    },

    /**
     * 新增 返回
     */
    cancelAddFn () {
      this.addDialogVisible = false;
    },

    // 确定按钮
    saveCusFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refCusTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.$nextTick(function () {
        // yufp.extend(_this.formdata, selectionAry[0]);
        this.addFormdata.grpCusId = selectionAry[0].grpNo;
        this.addFormdata.grpCusName = selectionAry[0].grpName;
      });
      _this.selectFnDialogVisible = false;
    },

    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.queryOper(_this.addFormdata);
    },
    queryOper: function (model) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/selectlmtgrpreplyaccoperapp',
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.rtnCode == '000000') {
              _this.addDialogVisible = false;
              _this.addTab(response.data.serno);
            } else {
              _this.$message(response.data.rtnMsg);
              return;
            }
          } else {
            return;
          }
        }
      });
    },
    addTab: function (grpSerno) {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyOperDetai',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperDetai', // 必传
        // 页签名称
        title: '集团客户授信额度冻结/解冻/终止修改',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'ADD',
          grpSerno: grpSerno
        }
      });
    },

    // 选取按钮
    selectFn: function () {
      this.selectFnDialogVisible = true;
      this.baseParams = {condition: JSON.stringify({ cusType: '4', oprType: '01', apprStatus: this.formdata.lmtAccOperType })};
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var grpSerno = selectionAry[0].grpSerno;
      var grpCusId = selectionAry[0].grpCusId;
      // 判断审批状态为审批中
      if (selectionAry[0].apprMode == '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyOperDetai',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtGrpReplyOperEdit' + new Date().getTime(), // 必传
        // 页签名称
        title: '集团客户授信额度冻结/解冻/终止修改',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'EDIT',
          grpSerno: grpSerno,
          grpCusId: grpCusId
        }
      });
    },

    // 查看
    viewFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTableHis.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // if (selectionAry.approveStatus != '000' && selectionAry.approveStatus != '992') {
      //   _this.$message({
      //     message: '只有待发起或者打回的数据可以执行修改操作!',
      //     type: 'warning'
      //   });
      //   return;
      // }
      var grpSerno = selectionAry[0].grpSerno;
      var grpCusId = selectionAry[0].grpCusId;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyOperDetai',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtGrpReplyOperView' + new Date().getTime(), // 必传
        // 页签名称
        title: '集团客户授信额度冻结/解冻/终止详情',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: false,
          viewType: 'VIEW',
          grpSerno: grpSerno,
          grpCusId: grpCusId
        }
      });
    },

    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (_this.$refs.refTable.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var grpSerno = selectionAry[0].grpSerno;
      var grpCusId = selectionAry[0].grpCusId;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtGrpReplyAccOperApp/lmtGrpReplyOperDetai',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtGrpReplyOperView', // 必传
        // 页签名称
        title: '集团客户授信额度冻结/解冻/终止详情',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'VIEW',
          grpSerno: grpSerno,
          grpCusId: grpCusId
        }
      });
    },

    deleteFn: function () {
      var _this = this;
      var model = {};
      // 获得选中的表格数据
      var selections = _this.$refs.refTable.selections;

      // 如果未选中表格数据，则弹出提示
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.clone(selections[0], model);
      if (model.approveStatus != '000' && model.approveStatus != '992') {
        _this.$message({
          message: '只有待发起或者打回的数据可以执行删除操作!',
          type: 'warning'
        });
        return;
      }
      // 获取审批状态
      var approveStatus = model.approveStatus;
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 操作类型，01--可展示   02--不可展示
            // 审批岗退回审批，再删除退回数据，该数据未更新状态为自行退出
            if (approveStatus == '992') {
              model.approveStatus = '996';
            } else {
              model.oprType = '02';
            }
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // data: 向后端传递的数据
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              data: model,
              url: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/logicdelete',
              callback: function (code, message, response) {
                // 删除后刷新表格数据
                _this.$refs.refTable.remoteData();
                // 弹出提示
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var params = {};
      // 集团认定详情展示组合模板
      params['model_group_no'] = 'CMG000311';
      params['grpNo'] = data.grpCusId;

      params['op'] = 'view';

      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    }
  }
};
</script>
