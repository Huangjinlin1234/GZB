<template>
  <!--
    @created by 王玉坤 20210429
    @description 线上提款启用列表查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="tabClick">
      <yu-tab-pane label="待处理" name="tab1">
        <yu-panel title="线上提款启用列表查询" panel-type="normal">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="产品编号" placeholder="产品编号" name="prdId" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel>
          <template>
            <yu-button-drop>
              <yu-button type="primary"  @click="addFn"  v-if="checkCtrl('addFn')">新增</yu-button>
              <yu-button type="primary"  @click="modifyFn"  v-if="checkCtrl('modifyFn')">修改</yu-button>
              <yu-button type="primary"  @click="infoFn"  v-if="checkCtrl('infoFn')">详情</yu-button>
              <yu-button type="primary" @click="deleteFn"  v-if="checkCtrl('deleteFn')">删除</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable" condition-key="condition" row-number :base-params="baseparams" :data-url="dataUrl" request-type="POST" selection-type="radio" show-hidden-menu="true">
            <yu-xtable-column label="申请流水号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" ></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" ></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
            <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" ></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus"  data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" hide-column ></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" hide-column ></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" hide-column ></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已处理" name="tab2">
       <yu-panel title="线上提款启用列表查询" panel-type="normal">
          <template slot="filter">
            <yu-xform related-table-name="refTable2" form-type="search" v-model="searchFormdata2">
              <yu-xform-group :column="2">
               <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="产品编号" placeholder="产品编号" name="prdId" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
       <template>
            <yu-button-drop>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('infoFn')">详情</yu-button>
              <yu-button type="primary" @click="ctrBeginFlagTrue" v-if="checkCtrl('ctrBeginFlagTrue')">线上合同启用</yu-button>

            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable2" condition-key="condition" row-number :base-params="baseparams2" :data-url="dataUrl2" request-type="POST" selection-type="radio" show-hidden-menu="true">
            <yu-xtable-column label="申请流水号" prop="serno" ></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" ></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" ></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
            <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" ></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus"  data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="线上合同启用标识" prop="ctrBeginFlag"  data-code="STD_CTR_BEGIN_FLAG"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" hide-column ></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" hide-column ></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" hide-column ></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" hide-column ></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>


      </yu-tab-pane>
    </yu-tabs>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="主键" :hidden="true" name="pkId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同号" :hidden="true" name="contNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同币种" name="contCurType" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" name="apprStatus" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作类型" name="oprType" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改人" name="updId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改机构" name="updBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改日期" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerId" ctype="input"></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="创建时间" name="createTime" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>

      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_CONT_TYPE,STD_ZB_APPR_STATUS,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CTR_BEGIN_FLAG');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      activeName: 'tab1',
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrcontimageauditapp/selectByModel2',
      dataUrl2: backend.cmisBiz + '/api/ctrcontimageauditapp/selectByModel2',
      formdata: {},
      baseparams: { condition: {whData: '000,992', oprType: '01'}},
      // baseparams2: {condition: {whData: '111,992,996,997', oprType: '01', belgLine: '01'}},
      baseparams2: {condition: {whData: '111,996,997,998', oprType: '01'}},
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
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true

    };
  },
  methods: {


    tabClick: function (t, e) {
      // tab 被选中时触发
      let _this = this;
      let name = t.name;
      if (name == 'tab1') {
        _this.$refs.refTable.remoteData();
      } else if (name == 'tab2') {
        _this.$refs.refTable2.remoteData();
      }
    },

    ctrBeginFlagTrue () {
      var _this = this;
      var selectionsAry;
      if (this.activeName == 'tab1') {
        selectionsAry = _this.$refs.refTable.selections;
      } else {
        selectionsAry = _this.$refs.refTable2.selections;
      }

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      let approveStatus = selectionsAry[0].approveStatus;
      let userInfo = _this.$xutils.getLoginUserInfo();// 获取登陆人信息
      let managerId = selectionsAry[0].managerId;
      if (userInfo.loginCode != managerId || approveStatus != '997') {
        _this.$message({
          message: '只能对审批通过且客户经理是自己的合同进行线上提款启用',
          type: 'warning'
        });
        return;
      }


      // 发请求过去拿参数
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/updatactrbeginflag',
        data: selectionsAry[0]
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data != null) {
            // 操作成功
            this.$message({ message: message, type: 'success' });
            // 进行审批流程  WF_CTR_LOAN_CONT
            this.$refs.refTable2.remoteData();
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
          }
        }
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      } // 向后台发送保存请求

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$dialog.open('线上合同启用申请', 'bizmanage/ctrBiz/ctrContImageAppList/ctrContImageAppAddIndex', 900, 650, {}, () => {
        _this.$refs.refTable.remoteData();
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }


      let userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (userInfo.loginCode != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的合同启用进行修改', type: 'warning' });
        return;
      }

      _this.$router.addTab({// 修改跳转
        name: 'bizmanage/ctrBiz/ctrContImageAppList/ctrLoanContEdit',
        key: _this.$refs.refTable.selections[0].contNo,
        title: '合同信息完善',
        data: {
          contNo: _this.$refs.refTable.selections[0].contNo,
          serno: _this.$refs.refTable.selections[0].serno,
          oprType: '02' // 修改
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry;
      if (this.activeName == 'tab1') {
        selectionsAry = _this.$refs.refTable.selections;
      } else {
        selectionsAry = _this.$refs.refTable2.selections;
      }

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('DETAIL', false);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }


      // 单笔删除
      if (selections.length > 1) {
        _this.$message({
          message: '请先选择单条记录',
          type: 'warning'
        });
        return;
      }

      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (userInfo.loginCode != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的合同启用进行删除', type: 'warning' });
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
              url: backend.cmisBiz + '/api/ctrcontimageauditapp/deletebypkid',
              data: selections[0],
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    /**
     * 导出操作
     */
    exportFn: function () {
      var _this = this;

      yufp.util.exportExcelByTable({
        fileName: '导出',
        importType: 'service',
        ref: _this.$refs.refTable,
        url: '/trade/example/list'
      });
    }
  }
};
</script>
