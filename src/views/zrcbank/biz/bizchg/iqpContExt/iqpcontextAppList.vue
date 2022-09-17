
<template>
  <!--
    @created by creazyCder 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @updated by 2021-05-21 15:42:11
    @description 展期申请主表-增删改查
  -->
  <div>
    <yu-panel title="展期申请列表" panel-type="simple">
      <yu-xform related-table-name="refAppTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
          <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
          <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refAppTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams" condition-key="condition">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同金额" placeholder="合同金额" name="contAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同类型" placeholder="合同类型" name="contType" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同余额" placeholder="合同余额" name="contBalance" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同起始日期" placeholder="合同起始日期" name="contStartDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同到期日期" placeholder="合同到期日期" name="contEndDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" placeholder="是否使用授信额度" name="isUtilLmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="授信额度编号" placeholder="授信额度编号" name="lmtAccNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="批复编号" placeholder="批复编号" name="replyNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="申请原因" placeholder="申请原因" name="appResn" ctype="input"></yu-xform-item>
          <yu-xform-item label="展期协议编号" placeholder="展期协议编号" name="argNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="签订日期" placeholder="签订日期" name="signDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同状态   " placeholder="合同状态   " name="contStatus" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" placeholder="登记日期" name="inputDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改人" placeholder="最近修改人" name="updId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改机构" placeholder="最近修改机构" name="updBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改日期" placeholder="最近修改日期" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="主管客户经理" placeholder="主管客户经理" name="managerId" ctype="input"></yu-xform-item>
          <yu-xform-item label="主管机构" placeholder="主管机构" name="managerBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作类型" placeholder="操作类型" name="oprType" ctype="input"></yu-xform-item>
          <yu-xform-item label="创建时间" placeholder="创建时间" name="createTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="修改时间" placeholder="修改时间" name="updateTime" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

    <!-- 新增向导弹窗 -->
    <yu-xdialog title="请选择合同信息" :visible.sync="guideDialogVisible" width="400px">
      <yu-xform ref="refGuideForm" label-width="120px" v-model="guideFormdata" >
        <yu-xform-group :column="1">
          <yu-xform-item label="合同编号" name="contNo" ctype="YufpZrcSelector" :params="contParms" :rules="{ required: true, message: '字段不能为空',trigger: 'blur' }" @select-fn="selectCont"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" required disabled></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" required disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="nextFn">下一步</yu-button>
          <yu-button type="primary" @click="backFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE,STD_CONT_TYPE,STD_CONT_STATUS');
export default {
  components: {},
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontext/query',
      addUrl: this.$backend.cmisBiz + '/api/iqpcontext/',
      tempsaveUrl: this.$backend.cmisBiz + '/api/iqpcontext/tempsave',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/iqpcontext/batchdelete/',
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
      guideDialogVisible: false,
      guideFormdata:{},
      contParms: {
        title: '选择合同',
        queryFields: [{ placeholder: '合同编号', field: 'contNo', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户号', field: 'cusId', type: 'input', fuzzyQuery: 'both' }, { placeholder: '客户名称', field: 'cusName', type: 'input', fuzzyQuery: 'both' }],
        dataUrl: `${backend.cmisBiz}/api/ctrloancont/cStatus`,
        tableColumns: [{ label: '合同编号', prop: 'contNo' },{ label: '合同申请类型', prop: 'contType', dataCode: 'STD_CONT_TYPE'}, { label: '客户编号', prop: 'cusId' }, { label: '客户名称', prop: 'cusName' }, { label: '合同金额', prop: 'contAmt' },{ label: '合同起始日', prop: 'contStartDate' },{ label: '合同到期日', prop: 'contEndDate' },{ label: '合同状态', prop: 'contStatus', dataCode: 'STD_CONT_STATUS' },   ]
      },
      baseParams:{condition:JSON.stringify({
        apply: '1',
        oprType: '01'
      }),sort: 'inputDate desc'}
    };
  },
  methods: {
    //  向导---下一步
    nextFn: function () {
      var validate = false;
      this.$refs.refGuideForm.validate(function(valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let model = {};
      yufp.clone(this.guideFormdata, model);
      // 暂存数据
      this.tempSave(model);

    },
    // 向导---返回
    backFn: function () {
      this.guideDialogVisible = false;
    },
    // 暂存
    tempSave: function (model) {
      let _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.tempsaveUrl,
        data: model,
        callback: function(code, message, response) {
          if (response.code == '0'){
            // 跳转进入修改页面
            _this.jumpToEditPageFn(response.data, 'EDIT');
            _this.guideDialogVisible = false;
          } else {
            _this.$message({ message: '数据暂存失败！', type: 'error'});
          }
        }
      });
    },
    /**
     * 选择合同方法
     */
    selectCont: function (arr) {
      var contStatus = arr[0].contStatus;
      if(contStatus == "200"){//生效合同
        this.guideFormdata.contNo = arr[0].contNo;
        this.guideFormdata.cusId = arr[0].cusId;
        this.guideFormdata.cusName = arr[0].cusName;
      }else{
        this.$xutils.showMessage('请选择生效合同！');
      }
    },
    /**
     * 进入修改页面
     */
    jumpToEditPageFn: function (dataParam, op) {
      let params = yufp.clone(dataParam, {});
      params.op = op;
      params.model_group_no = 'CMG000425'; //为统一征信报告公共功能添加
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/bizchg/iqpContExt/iqpcontextDetailMain', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_iqpContExt_' + op + '_' + dataParam.iqpSerno, // 必传
        // 页签名称
        title: '展期申请详情',
        // 传递的业务数据，可选配置
        data: params,
        afterTabClose: () => {
        }
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      if(this.viewType == 'ADD'){
        this.addSaveFn();
      }else{
        this.editSaveFn();
      }
    },

    /**
     * 新增-保存
     */
    addSaveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function(valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.addUrl,
        data: model,
        callback: function(code, message, response) {
          if (response.code == '0'){
            _this.$refs.refAppTable.remoteData();
            _this.$message({ message: '数据新增成功！', type: 'info'});
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error'});
          }
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
    //   _this.switchStatus('ADD', true);
      _this.guideDialogVisible = true;
      _this.$nextTick(function() {
        _this.$refs.refGuideForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      if (_this.$refs.refAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refAppTable.selections[0];
      var approveStatus = obj.approveStatus;
      if(approveStatus != '000' && approveStatus != '992'){
        _this.$message({
          message: '该条记录不是待发起或待发起状态，无法修改！',
          type: 'warning'
        });
        return;
      }
      _this.jumpToEditPageFn(obj, 'EDIT');
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let obj = _this.$refs.refAppTable.selections[0];
      _this.jumpToEditPageFn(obj, 'VIEW');
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let jsoPar = {};
      let selections = _this.$refs.refAppTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 获得选中的表格数据
      yufp.clone(selections[0], jsoPar);
      var approveStatus = jsoPar.approveStatus;
      if(approveStatus !== '000' && approveStatus !== '992'){
        _this.$message({
          message: '仅待发起状态或打回的的数据才可以删除',
          type: 'warning'
        });
        return;
      }
      // 状态为待发起（000）则物理删除
      if (jsoPar.approveStatus == '000') {
        jsoPar['oprType'] = '02';
      }
      // 状态为打回（992）则更新审批状态为自行退回（996）
      if (jsoPar.approveStatus == '992') {
        jsoPar['approveStatus'] = '996';
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function(action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/iqpcontext/logicdelete',
              data: JSON.stringify(_this.$xutils.toUpperCase(jsoPar, true)),
              callback: function(code, message, response) {
                if (response.code == '0') {
                  if (selections[0].approveStatus == '992') {
                    _this.$message({ message: '自行退出成功！', type: 'info'});
                  } else {
                    _this.$message({ message: '数据删除成功！', type: 'info'});
                  }
                  _this.$refs.refAppTable.remoteData();
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
