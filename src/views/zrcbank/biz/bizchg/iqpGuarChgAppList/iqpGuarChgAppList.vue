<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="担保变更申请" name="first">
        <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="担保变更类型" placeholder="担保变更类型" name="guarChgType" ctype="select" data-code="STD_GUAR_CHG_TYPE"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <template panel-type="simple">
            <yu-button-drop style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">详情</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
          </template>
          <yu-xtable ref="refTable" selection-type="radio" request-type="POST" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="{ condition: { apply: 'Y' } ,'sort':'inputDate desc'}">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="担保变更类型" prop="guarChgType" data-code="STD_GUAR_CHG_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="担保变更历史" name="sec">
        <yu-panel title="普通查询" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable1" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
                <yu-xform-item label="担保变更类型" placeholder="担保变更类型" name="guarChgType" ctype="select" data-code="STD_GUAR_CHG_TYPE"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-button-drop>
            <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFn1">详情</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1" selection-type="radio" request-type="POST" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="{ condition: { history: 'Y' } ,'sort':'inputDate desc'}">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="担保变更类型" prop="guarChgType" data-code="STD_GUAR_CHG_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>

    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="新增担保变更" :visible.sync="dialogVisible" width="850px">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap">
        <yu-xform-group>
          <yu-xform-item label="合同编号" name="contNo" ctype="YufpZrcSelector" :params="contParms" :rules="{ required: true, message: '字段不能为空' }" @select-fn="selectCont"></yu-xform-item>
          <yu-xform-item label="担保变更类型" name="guarChgType" ctype="select" :rules="{ required: true, message: '字段不能为空' }" data-code="STD_GUAR_CHG_TYPE"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" disabled="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作类型" name="oprType" :hidden="true" ctype="input"></yu-xform-item>
          <yu-xform-item label="授信是否变更" name="isLmtChanged" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn">下一步</yu-button>
          <yu-button @click="dialogVisible = !dialogVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_GUAR_CHG_TYPE,STD_CONT_STATUS,STD_CONT_TYPE');
export default {
  data: function () {
    return {
      activeName: 'first',
      searchFormdata: {},
      dataUrl: `${backend.cmisBiz}/api/iqpguarchgapp/`,
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
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      contParms: {
        title: '选择合同',
        baseParams: {condition: JSON.stringify({managerId : this.$xutils.getDefaultformulaData("$LoginLoginCode")})},
        queryFields: [{ placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: backend.cmisBiz + '/api/ctrloancont/selectctrloan',
        tableColumns: [{ label: '合同编号', prop: 'contNo' }, { label: '合同申请类型 ', prop: "contType", dataCode: "STD_CONT_TYPE" }, { label: '客户号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '合同金额', prop: 'contAmt' }, { label: '合同余额', prop: 'contBalance' }, { label: '合同起始日', prop: 'contStartDate' }, { label: '合同到期日', prop: 'contEndDate' }, { label: '合同状态', prop: 'contStatus', dataCode: 'STD_CONT_STATUS'}]
      }
    };
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      if (_this.$refs.refForm) {
        _this.$refs.refForm.resetFields();
      }
    },
    /**
     * 选择合同方法
     */
    selectCont: function (arr) {
      this.formdata.contNo = arr[0].contNo;
      this.formdata.cusId = arr[0].cusId;
      this.formdata.cusName = arr[0].cusName;
    },
    /**
     *  保存
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
      let url = `${backend.cmisBiz}/api/iqpguarchgapp/create`;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogVisible = false;
            let name = 'zrcbank/biz/bizchg/iqpGuarChgAppList/iqpGuarChgAppDetails/iqpGuarChgAppDetails';
            let key = 'iqpGuarChgAppDetails' + '_' + new Date().getTime();
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: key, // 必传
              // 页签名称
              title: '担保变更修改新增页面',
              // 传递的业务数据，可选配置
              data: {
                saveBtnShow: true,
                viewType: 'UPDATE',
                guarChgType: response.data.guarChgType,
                serno: response.data.iqpSerno,
                key: `/${name}/${key}`
              }
            });
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        }
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

      var approveStatus = _this.$refs.refTable.selections[0].approveStatus;
      if(approveStatus != '000' && approveStatus != '992'){
        _this.$message({
          message: '该条记录不是待发起或打回状态，无法修改！',
          type: 'warning'
        });
        return;
      }

      let serno = _this.$refs.refTable.selections[0].iqpSerno;
      let name = 'zrcbank/biz/bizchg/iqpGuarChgAppList/iqpGuarChgAppDetails/iqpGuarChgAppDetails';
      let key = 'iqpGuarChgAppDetailsUpdate' + serno+ '_' + new Date().getTime();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保变更修改',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'EDIT',
          guarChgType: _this.$refs.refTable.selections[0].guarChgType,
          serno: serno,
          key: `/${name}/${key}`
        }
      });
    },

    /**
     * 详情
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
      let serno = _this.$refs.refTable.selections[0].iqpSerno;
      let name = 'zrcbank/biz/bizchg/iqpGuarChgAppList/iqpGuarChgAppDetails/iqpGuarChgAppDetails';
      let key = 'iqpGuarChgAppDetailsView' + serno+ '_' + new Date().getTime();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保变更查看',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: false,
          viewType: 'DETAIL',
          serno: serno,
          key: `/${name}/${key}`
        }
      });
    },

    infoFn1: function (index) {
      var _this = this;
      var selectionsAry = _this.$refs.refTable1.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let serno = _this.$refs.refTable1.selections[0].iqpSerno;
      let name = 'zrcbank/biz/bizchg/iqpGuarChgAppList/iqpGuarChgAppDetails/iqpGuarChgAppDetails';
      let key = 'iqpGuarChgAppDetailsView' + serno+ '_' + new Date().getTime();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保变更查看',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: false,
          viewType: 'DETAIL',
          serno: serno,
          key: `/${name}/${key}`
        }
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
      var approveStatus = _this.$refs.refTable.selections[0].approveStatus;
      if(approveStatus != '000'){
        _this.$message({
          message: '该条记录不是待发起状态，无法删除！',
          type: 'warning'
        });
        return;
      }
      var len = selections.length;
      var arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(selections[i].iqpSerno);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: `${backend.cmisBiz}/api/iqpguarchgapp/batchdelete/${arr.join(',')}`,
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
