
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="个人客户额度调整" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="appSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="批复编号" placeholder="批复编号" name="apprSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputId" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button @click="addFn" v-if="checkCtrl('add')" type="primary">新增</yu-button>
        <yu-button @click="modifyFn" v-if="checkCtrl('edit')" type="primary">修改</yu-button>
        <yu-button @click="infoFn" v-if="checkCtrl('view')" type="primary">详情</yu-button>
        <yu-button @click="deleteFn" v-if="checkCtrl('delete')" type="primary">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" :default-load="false" requestType="POST">
        <yu-xtable-column label="申请流水号" prop="appSerno" width=""></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="apprSerno" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="授信总额" prop="totalAvlAmt" width=""></yu-xtable-column>
        <yu-xtable-column label="授信敞口" prop="totalSpacAmt" width=""></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="1100px" height="600px">
      <yu-panel title="额度数据选择">
        <yu-xform related-table-name="selectTable" form-type="search" v-model="searchForInfo" label-width="100px">
          <yu-xform-group :column="2">
            <yu-xform-item label="批复编号" name="apprSerno" ref="apprSerno" ctype="input"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-form-buttons align="left">
          <yu-button type="primary" @click="backToAdd">选取返回</yu-button>
        </yu-form-buttons>
        <yu-xtable ref="selectTable" condition-key="condition" row-number :data-url="dataResult" :base-params="dataParam" request-type="POST">
          <yu-xtable-column label="批复编号" prop="apprSerno" width="120"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
          <yu-xtable-column label="授信总额" prop="totalAvlAmt" width="120"></yu-xtable-column>
          <yu-xtable-column label="授信敞口" prop="totalSpacAmt" width="120"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="startDate" width="120"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="endDate" width="120"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName" width="120"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xdialog>
    <yu-xdialog title="额度数据调整新增向导" :visible.sync="dialogVisibleadd" width="600px">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata2" :disabled="formDisabled">
        <yu-xform-group :column="1">
          <yu-xform-item label="批复编号" name="apprSerno" rules="required" ctype="input" icon="search" @click="onChange" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="nextFn">下一步</yu-button>
          <yu-button  type="primary" @click="backFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';

yufp.lookup.reg('STD_ZB_APPR_ST,STD_ZB_APPR_STATUS,STD_PARTNER_TYPE');

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      searchForInfo: {},
      Param: { condition: JSON.stringify({ oprType: '01' }) },
      dataParam: { condition: JSON.stringify({ cusType: '1' }) },
      dataUrl:
        backend.cmisLmt + '/api/apprstrmtablechgapp/queryStrChgAppBySerno',
      dataResult:
        backend.cmisLmt + '/api/apprstrmtableinfo/queryStrChgAppBySerno',
      formdata: {},
      formdata2: {},
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
      dialogVisibleadd: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userId: (state) => state.oauth.userId,
      org: (state) => state.oauth.org,
      loginCode: (state) => state.oauth.loginCode
    })
  },
  mounted () {
    this.Param = {
      condition: JSON.stringify({
        oprType: '01',
        inputId: this.loginCode,
        cusType: '1'
      })
    };
    this.dataParam = {
      condition: JSON.stringify({ oprType: '01', cusType: '1' })
    };
  },
  methods: {
    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.selectTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var obj = _this.$refs.selectTable.selections[0];
      var nextobj = {};
      nextobj.pkId = obj.pkId;
      nextobj.apprSerno = obj.apprSerno;
      nextobj.appSerno = obj.appSerno;
      yufp.service.request({
        method: 'POST',
        url:
          backend.cmisLmt +
          '/api/apprstrmtablechgapp/initapprstrmtablechgappinfo',
        data: nextobj,
        callback: function (code, message, response) {
          if (code == 0) {
            // if (response.data.rtnCode == '0000') {
            model.pkId = selectionsAry[0].pkId;
            model.apprSerno = selectionsAry[0].apprSerno;
            model.appSerno = response.data.appSerno;
            model.lmtType = '01';
            model.routeKey =
              'apprStrMtableChgApp' + response.data.appSerno + 'ADD';
            model.formdata = obj;
            model.formdata.appSerno = response.data.appSerno;
            model.viewTypeMain = 'ADD';
            _this.$nextTick(function () {
              this.$router.addTab({
                // 路由名称
                name: 'zrcbank/lmt/cusStrMtableChgApp/cusStrMtableChgAppDetail',
                // 自定义唯一页签key,请统一使用custom_前缀开头
                key: model.routeKey,
                // 页签名称
                title: '个人客户额度调整详情',
                // 传递的业务数据，可选配置
                data: model
              });
            });
            _this.dialogVisibleadd = false;
            // }
          } else {
            _this.$message({
              duration: 4000,
              message:
                '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },

    /**
     * 返回
     */
    backFn: function () {
      var _this = this;
      _this.dialogVisibleadd = false;
    },

    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
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
      _this.dialogVisibleadd = true;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      if (!(obj.approveStatus == '000' || obj.approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可编辑',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'apprStrMtableChgApp' + selectionsAry[0].appSerno + 'EDIT';
      model.pkId = selectionsAry[0].pkId;
      model.apprSerno = selectionsAry[0].apprSerno;
      model.appSerno = selectionsAry[0].appSerno;
      model.lmtType = '01';
      model.routeKey = routeKey;
      model.formdata = obj;
      model.viewTypeMain = 'EDIT';
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/cusStrMtableChgApp/cusStrMtableChgAppDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '个人客户额度调整详情',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      var routeKey =
        'apprStrMtableChgApp' + selectionsAry[0].appSerno + 'DETAIL';
      model.apprSerno = selectionsAry[0].apprSerno;
      model.appSerno = selectionsAry[0].appSerno;
      model.routeKey = routeKey;
      model.formdata = obj;
      model.viewTypeMain = 'DETAIL';
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/cusStrMtableChgApp/cusStrMtableChgAppDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '个人客户额度调整详情',
          // 传递的业务数据，可选配置
          data: model
        });
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
      if (
        !(
          selections[0].approveStatus == '000' ||
          selections[0].approveStatus == '992'
        )
      ) {
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
              method: 'POST',
              url:
                backend.cmisLmt +
                '/api/apprstrmtablechgapp/logicalDelete/' +
                selections[0].pkId,
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
     * 选择
     */
    onChange () {
      var _this = this;
      _this.dialogVisible = true;
    },

    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.selectTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.selectTable.selections[0];
      var apprSerno = obj.apprSerno;
      var cusId = obj.cusId;
      var cusName = obj.cusName;
      // 向后台发送请求
      yufp.service.request({
        method: 'POST',
        url:
          backend.cmisLmt +
          '/api/apprstrmtablechgapp/valilmtchgappinway/' +
          apprSerno,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data == 0) {
              // 传字段
              _this.apprSerno = apprSerno;
              _this.cusId = cusId;
              _this.cusName = cusName;
              _this.formdata2.apprSerno = apprSerno;
              _this.formdata2.cusId = cusId;
              _this.formdata2.cusName = cusName;
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '该额度数据存在在途的申请，不允许新增！',
                type: 'warning'
              });
              return;
            }
          }
        }
      });
      _this.dialogVisible = false;
    }
  }
};
</script>
