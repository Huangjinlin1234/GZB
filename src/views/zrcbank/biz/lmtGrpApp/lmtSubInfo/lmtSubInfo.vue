<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <yu-row :gutter="24">
      <!--<yu-col :span="5">
        <yu-panel title="全部机构">
          <yu-xtree ref="refTree" :height="height - 20" @node-click="nodeClickFn" data-root="0" :local-data="data" data-id="id" data-label="label" data-pid="pid" :render-custom-content="renderCustomContent" :data-async="async" :data-params="param"></yu-xtree>
          <yu-tree ref="refTree" :data="data3" show-checkbox node-key="id" :default-expanded-keys="[2,3,4]" :default-checked-keys="[5]"></yu-tree>
        </yu-panel>
      </yu-col>-->
      <yu-col :span="19">
        <yu-button type="primary" v-show="saveBtnShow" @click="addSubFn">新增分项</yu-button>
        <yu-xtable :data="treeTableData" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border :tree-props="{children: 'lmtAppSubPrdList', hasChildren: 'hasChildren'}">
          <!--<yu-xtable-column prop="date" label="日期" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="name" label="姓名" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="address" label="地址"></yu-xtable-column>-->
          <yu-xtable-column prop="cusId" label="授信分项流水号" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="授信品种" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="是否循环额度"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="是否预授信额度"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="担保方式"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="授信额度"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="额度期限"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="是否本次细化"></yu-xtable-column>
          <yu-xtable-column prop="cusId" label="操作"> <el-link type="primary" @click="detailInfo">细化</el-link> <el-link type="primary">查看</el-link></yu-xtable-column>
        </yu-xtable>
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
      treeTableData:[

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
    //todo 待替换,url待替换
   var params = "LMT202104230000209";
   //调用后台获取分项数据显示。/cmis-biz-xiamc/api/lmtgrpapp/getSubInfoData
    var _this = this;
      // yufp.service.request({
      //   method: 'POST',
      //   url: backend.cmisBiz + '/api/lmtgrpapp/getSubInfoData/' + replySerno,
      //   callback: function (code, message, response) {
      //      debugger;
      //     _this.treeTableData = response.data;
      //   }
      // });
      console.log("-----------------" + backend.cmisBiz);
       yufp.service.request({
        method: "POST",
        url: backend.cmisBiz + "/api/lmtgrpapp/getLmtPreDatailSubInfoData",
        data:params,
        callback: function(code, message, response) {
          _this.$message("插入主从记录成功");
          //返回对应的流水号去查询
          // _this.dialogVisible = false;
          debugger;
          // for(var i=0;i < response.data.length;i++){
          //  _this.treeTableData = response.data[i];
          // }
          _this.treeTableData = response.data;
          console.log(_this.treeTableData);

        }
      });
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function() {
      var _this = this;

      _this.dialogVisible = false;
    },

/**携带分项流水号跳转到授信分项细化
 */
    detailInfo: function() {

     this.$router.addTab({
        name: "zrcbank/biz/lmtGrpApp/specifyPage",
        title: "分项明细",
        key: "1",
        data: {
          userId: "11",
          formData: {
            title: '2021-04-06',
            createAt: '111'
          }
        }
      });

    },


/**
     * 新增分项
     */
    addSubFn: function() {
      //alert('待开发');
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
