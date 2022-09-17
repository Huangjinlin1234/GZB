  <!--
    @created by  xiamc
    @description  批复界面需要调整
  -->
<template>
  <div>
    <yu-row :gutter="24">
      <yu-col :span="5"> </yu-col>
      <yu-col :span="19">
        <yu-panel title="授信基本信息" is-collapse>
          <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" ctype="input" name="serno" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" name="lmtType" :rules="baseFormRules[1]" data-code="STD_SX_LMT_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" :rules="baseFormRules[2]" data-code="EDUCATION_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" :rules="baseFormRules[3]" data-code="IDENT_TYPE" colspan="24" disabled="true"></yu-xform-item>
              <yu-xform-item label="币种" ctype="input" name="cardType" :rules="baseFormRules[3]" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="敞口额度合计（元）" ctype="input" name="openTotalLmtAmt" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="低风险额度合计（元）" ctype="input" name="lowRiskTotalLmtAmt" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm" :rules="baseFormRules[3]" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="原授信批复信息" is-collapse>
          <yu-xform ref="refForm1" label-width="100px" v-model="baseFormdata2">
            <yu-xform-group>
              <yu-xform-item label="原授信批复编号" ctype="input" name="origiLmtReplySerno" colspan="15" disabled="true"></yu-xform-item>
              <yu-button type="primary" @click="cancelFn" colspan="4">查看</yu-button>
              <yu-xform-item label="原授信期限" ctype="input" name="origiLmtTerm" disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="登记信息" is-collapse>
          <yu-xform ref="refForm2" label-width="100px" v-model="baseFormdata3">
            <yu-xform-group>
              <yu-xform-item label="登记人" ctype="input" name="INPUT_ID" :rules="baseFormRules[0]" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :rules="baseFormRules[1]" data-code="GENDER" disabled="true"></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerId" :rules="baseFormRules[2]" data-code="EDUCATION_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :rules="baseFormRules[3]" data-code="IDENT_TYPE" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" :rules="baseFormRules[4]" disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');

export default {
  data: function () {
    return {
      data3: [{
        id: 1,
        label: '授信方案信息',
        children: [{
          id: 3,
          label: '集团授信基本信息',
          children: [{
            id: 4,
            label: '集团成员授信明细'
          }, {
            id: 5,
            label: '成员客户限额及债项评级',
            disabled: true
          }, {
            id: 6,
            label: '集团预授信细化调查报告',
            disabled: true
          }]
        }, {
          id: 2,
          label: '关联信息',
          disabled: true,
          children: [{
            id: 7,
            label: '集团客户及其关联人信息'
          }, {
            id: 8,
            label: '集团客户财务情况',
            disabled: true
          }, {
            id: 9,
            label: '额度测算表',
            disabled: true
          }, {
            id: 10,
            label: '集团客户风险情况',
            disabled: true
          }, {
            id: 11,
            label: '集团调查报告',
            disabled: true
          },
          {
            id: 13,
            label: '集团客户业务信息',
            disabled: true
          }, {
            id: 14,
            label: '征信报告',
            disabled: true
          }, {
            id: 15,
            label: '集团统一额度视图',
            disabled: true
          }, {
            id: 16,
            label: '其他审批事项',
            disabled: true
          }, {
            id: 17,
            label: '流程轨迹',
            disabled: true
          }, {
            id: 18,
            label: '影像资料',
            disabled: true
          }

          ]
        }]
      }],
      data: [
        { id: '0', label: '成员客户预授信细化', pid: '-1' },
        { id: '1', label: '授信方案信息', pid: '0' },
        { id: '2', label: '关联信息', pid: '0' },
        { id: '3', label: '授信基本信息', pid: '1' },
        { id: '4', label: '授信分项明细', pid: '1' }
      ],
      menuTreeData: [
        { menuId: '0', menuName: '成员客户预授信细化', upMenuId: '-1', menuOrder: '5'},
        { menuId: '1', menuName: '授信方案信息', upMenuId: '0', menuOrder: '5' },
        { menuId: '2', menuName: '关联信息', upMenuId: '0', menuOrder: '5' },
        { menuId: '3', menuName: '授信基本信息', upMenuId: '1', menuOrder: '5' },
        { menuId: '4', menuName: '授信分项明细', upMenuId: '1', menuOrder: '5' }
      ],
      searchFormdata: {},
      dataUrl: '/trade/example/list',
      saveBtnShow: true,
      cancelBtnShow: true,
      formdata: {},
      async: false,
      param: {
        UNITID: '0000',
        LEVELUNIT: '1'
      },
      menuTreeProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      height: yufp.frame.size().height,
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      handleBtns: [
        {
          text: '新增',
          // 文本
          type: '',
          // 颜色
          className: '',
          // 样式名字
          disabled: '',
          // 是否禁用
          loading: '',
          // 加载中
          icon: '' // 图标
        },
        {
          text: '修改'
        },
        {
          text: '详情'
        }
      ],
      showLength: 3
    };
  },
  mounted () {
    const _this = this;
    // 1.获取选择的数值
    console.log('===============');
    console.log(this.getFactory().contextData.pk_id);
    console.log(this.getFactory().contextData.serno);
    var pk_id = this.getFactory().contextData.pk_id;
    var serno = this.getFactory().contextData.serno;
    console.log('===============');
    // 2.并给表格属性进行赋值,查询数据库赋值
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/lmtgrpapp/query/' + serno,
      callback: function (code, message, response) {
        const retdata = response.data || {};
        // debugger;
        if (code == 0) {
          //  //获取数据赋值显示,没有数据空白显示
          _this.baseFormdata.serno = retdata.serno || '';
          _this.baseFormdata.cusType = retdata.cusType || '';
          _this.baseFormdata.grpCusId = retdata.grpCusId || '';
          _this.baseFormdata.grpCusName = retdata.grpCusName || '';
          _this.baseFormdata.lmtTerm = retdata.lmtTerm || '';
          _this.baseFormdata2.origiLmtReplySerno = retdata.origiLmtReplySerno || '';
          _this.baseFormdata2.origiLmtTerm = retdata.origiLmtTerm || '';
          _this.baseFormdata3.inputId = retdata.inputId || '';
          _this.baseFormdata3.inputBrId = retdata.inputBrId || '';
          _this.baseFormdata3.managerId = retdata.managerId || '';
          _this.baseFormdata3.managerBrId = retdata.managerBrId || '';
          _this.baseFormdata3.inputDate = retdata.inputDate || '';
          // todo 设置不可不可编辑状态用disabled="true"代替
        } else {
          _this.$message('查询失败');
        }
        _this.dialogVisible = false;
      }
    });
  },
  methods: {
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
      _this.dialogVisible = false;

      _this.$msgbox.alert(model, '提示'); // 请调用服务进行后台保存
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
      _this.saveBtnShow = editable;
      _this.cancelBtnShow = editable;
    },
    nodeClickFn: function (nodeData, node, self) {
      var _this = this;

      _this.$refs.refTable.remoteData();
    },

    /**
     * 新增
     */
    addFn: function () {
      var _this = this;

      _this.switchStatus('ADD', true);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('EDIT', true);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('DETAIL', false);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        yufp.clone(_this.$refs.refTable.selections[0], _this.formdata);
      });
    }
  }
};
</script>
