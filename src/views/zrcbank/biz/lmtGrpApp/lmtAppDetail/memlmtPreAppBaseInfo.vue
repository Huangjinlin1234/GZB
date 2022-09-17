
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-row :gutter="24">
      <yu-col :span="5">
        <!--<yu-panel title="全部机构">
          <yu-xtree ref="refTree" :height="height - 20" @node-click="nodeClickFn" data-root="0" :local-data="data" data-id="id" data-label="label" data-pid="pid" :render-custom-content="renderCustomContent" :data-async="async" :data-params="param"></yu-xtree>
          <yu-tree ref="refTree" :data="data3" show-checkbox node-key="id" :default-expanded-keys="[2,3,4]" :default-checked-keys="[5]"></yu-tree>
        </yu-panel>-->
      </yu-col>
      <yu-col :span="19">
        <yu-panel title="授信基本信息" is-collapse>
          <yu-xform ref="refForm" label-width="100px" v-model="baseFormdata">
            <yu-xform-group>
              <yu-xform-item label="业务流水号" ctype="input" name="serno" :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" name="lmtType" :rules="baseFormRules[1]" data-code="STD_SX_LMT_TYPE"></yu-xform-item>
              <yu-xform-item label="集团客户编号" ctype="input" name="cusid" :rules="baseFormRules[2]" data-code="EDUCATION_TYPE"></yu-xform-item>
              <yu-xform-item label="客户类型" ctype="input" name="cusType" :rules="baseFormRules[3]" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="集团客户名称" ctype="input" name="cusName" :rules="baseFormRules[3]" data-code="IDENT_TYPE" colspan="24"></yu-xform-item>
              <yu-xform-item label="测算最高流动资金贷款额度" ctype="input" name="cardType" :rules="baseFormRules[3]" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="币种" ctype="input" name="cardType" :rules="baseFormRules[3]" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="敞口额度合计（元）" ctype="input" name="openTotalLmtAmt" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="低风险额度合计（元）" ctype="input" name="lowRiskTotalLmtAmt" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm" :rules="baseFormRules[3]" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="宽限期（月）" ctype="input" name="lmtGraperTerm" :rules="baseFormRules[3]" data-code="IDENT_TYPE"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="原授信批复信息" is-collapse>
          <yu-xform ref="refForm1" label-width="100px" v-model="baseFormdata1">
            <yu-xform-group>
              <yu-xform-item label="原授信批复编号" ctype="input" name="origiLmtReplySerno" colspan="20"></yu-xform-item>
              <yu-button type="primary" @click="cancelFn" colspan="4">选取</yu-button>
              <yu-xform-item label="原授信期限" ctype="input" name="origiLmtTerm"></yu-xform-item>
              <yu-xform-item label="宽限期限" ctype="input" name="lmtGraperTerm"></yu-xform-item>
              <yu-xform-item label="原敞口额度合计(元)" ctype="input" name="gender"></yu-xform-item>
              <yu-xform-item label="低风险额度(元)" ctype="input" name="gender"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="登记信息" is-collapse>
          <yu-xform ref="refForm2" label-width="100px" v-model="baseFormdata">
            <yu-xform-group>
              <yu-xform-item label="登记人" ctype="input" name="INPUT_ID" :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :rules="baseFormRules[1]" data-code="GENDER"></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerId" :rules="baseFormRules[2]" data-code="EDUCATION_TYPE"></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :rules="baseFormRules[3]" data-code="IDENT_TYPE"></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" :rules="baseFormRules[4]"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
yufp.lookup.reg("CRUD_TYPE,NATIONALITY,PUBLISH_STATUS");

export default {
  data: function() {
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
        { id: "0", label: "成员客户预授信细化", pid: "-1" },
        { id: "1", label: "授信方案信息", pid: "0" },
        { id: "2", label: "关联信息", pid: "0" },
        { id: "3", label: "授信基本信息", pid: "1" },
        { id: "4", label: "授信分项明细", pid: "1" }
      ],
      menuTreeData: [
        { menuId: "0", menuName: "成员客户预授信细化", upMenuId: "-1", menuOrder:"5"},
        { menuId: "1", menuName: "授信方案信息", upMenuId: "0", menuOrder:"5" },
        { menuId: "2", menuName: "关联信息", upMenuId: "0", menuOrder:"5" },
        { menuId: "3", menuName: "授信基本信息", upMenuId: "1", menuOrder:"5" },
        { menuId: "4", menuName: "授信分项明细", upMenuId: "1", menuOrder:"5" }
      ],
      searchFormdata: {},
      dataUrl: "/trade/example/list",
      saveBtnShow: true,
      cancelBtnShow: true,
      formdata: {},
      async: false,
      param: {
        UNITID: "0000",
        LEVELUNIT: "1"
      },
     menuTreeProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      height: yufp.frame.size().height,
      dialogVisible: false,
      formDisabled: false,
      viewType: "DETAIL",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false),
      baseFormRules: [
        {
          required: true,
          message: "必填项",
          trigger: "blur"
        },
        {
          required: true,
          message: "必填项",
          trigger: "change"
        },
        {
          required: true,
          message: "必填项",
          trigger: "change"
        },
        {
          required: true,
          message: "必填项",
          trigger: "change"
        },
        {
          type: "date",
          required: true,
          message: "必填项",
          trigger: "change"
        },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: "blur"
        }
      ],
      handleBtns: [
        {
          text: "新增",
          // 文本
          type: "",
          // 颜色
          className: "",
          // 样式名字
          disabled: "",
          // 是否禁用
          loading: "",
          // 加载中
          icon: "" // 图标
        },
        {
          text: "修改"
        },
        {
          text: "详情"
        }
      ],
      showLength: 3
    };
  },
  mounted() {
    //1.获取选择的数值
    console.log("===============");
    console.log(this.$route.params.serno);
    console.log("===============");
    //2.并给表格属性进行赋值,查询数据库赋值
    // this.refForm.serno=this.$route.params.serno;
    // this.refForm.serno=this.$route.params.lmtType;
    //  this.refForm.serno=this.$route.params.cusid;
    //   this.refForm.serno=this.$route.params.serno;

    //查询数据库赋值，根据条件进行查询
    //  yufp.service.request({
    //     method: "POST",
    //     url: backend.cmisBiz + "/api/lmtgrpapp/guidesave",
    //     data: LmtGrpApp,
    //     callback: function(code, message, response) {
    //       _this.$message("插入主从记录成功");
    //       _this.dialogVisible = false;
    //     }
    //   });


  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function() {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function() {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      _this.dialogVisible = false;

      _this.$msgbox.alert(model, "提示"); // 请调用服务进行后台保存
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function(viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
      _this.saveBtnShow = editable;
      _this.cancelBtnShow = editable;
    },
    nodeClickFn: function(nodeData, node, self) {
      var _this = this;

      _this.$refs.refTable.remoteData();
    },

    /**
     * 新增
     */
    addFn: function() {
      var _this = this;

      _this.switchStatus("ADD", true);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function() {
      var _this = this;

      if (_this.$refs.refTable.selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      _this.switchStatus("EDIT", true);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();

        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },

    /**
     * 详情
     */
    infoFn: function() {
      var _this = this;

      if (_this.$refs.refTable.selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning"
        });

        return;
      }

      _this.switchStatus("DETAIL", false);

      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();

        yufp.clone(_this.$refs.refTable.selections[0], _this.formdata);
      });
    }
  }
};
</script>
