
<template>
  <div>
    <yu-panel title="发起示例" :collapse-hide="false">
      <yu-xform ref="refForm" v-model="wfDemo" class="yu-form-gap">
        <yu-xform-group :column="1">
          <yu-xform-item label="申请流水号" placeholder="申请流水号" ctype="input" name="pkId" :colspan="13"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="name" :colspan="13"></yu-xform-item>
          <yu-xform-item label="客户ID" placeholder="客户ID" ctype="input" name="id" :colspan="13"></yu-xform-item>
          <yu-xform-item label="业务类型" placeholder="业务类型" ctype="input" name="bizType" :disabled="true" :colspan="13" icon="search" :on-icon-click="openDialog"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-form-buttons style="padding-left: 100px">
        <yu-button type="primary" @click="start">发起流程</yu-button>
        <yu-button @click="startAndSubmit" type="primary">发起并提交</yu-button>
        <yu-button @click="reSet">重置流水号</yu-button>
      </yu-form-buttons>
      <el-dialog-x title="业务类型" :visible.sync="dialogVisible" height="360px" width="750px">
        <el-form-q ref="refFormq" :field-data="queryFields" :buttons="queryButtons"></el-form-q>
        <el-table-x ref="refTable" :data-url="urls.flow" :table-columns="tableColumns"></el-table-x>
        <div slot="footer" align="center">
          <el-button type="primary" @click="selectFn">选取返回</el-button>
        </div>
      </el-dialog-x>
    </yu-panel>
    <yufpNwfInit ref="yufpNwfInit" @success-click="reSet()"></yufpNwfInit>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  data: function () {
    var _this = this;
    return {
      urls: {
        flow: backend.workflowService + '/api/biz/',
        start: backend.workflowService + '/api/core/start'
      },
      wfDemo: {
        pkId: '12345678',
        name: '客户-王亚飞',
        id: 'wangyf10',
        flowId: '',
        bizType: ''
      },
      dialogVisible: false,
      queryFields: [{
        placeholder: '业务类型',
        field: 'bizType',
        type: 'input'
      }, {
        placeholder: '业务类型描述',
        field: 'ext',
        type: 'input'
      }],
      tableColumns: [{
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        align: 'center'
      }, {
        label: '业务类型描述',
        prop: 'ext',
        resizable: true,
        align: 'center'
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true,
        align: 'center'
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        align: 'center'
      }, {
        label: '业务页面',
        prop: 'pageUrl',
        resizable: true,
        align: 'center'
      }],
      queryButtons: [{
        label: '搜索',
        op: 'submit',
        type: 'primary',
        click: function (model, valid) {
          if (valid) {
            var params = {};
            params.bizType = model.bizType;

            if (model.ext != null) {
              params.ext = '%' + model.ext + '%';
            }

            var param = {
              condition: JSON.stringify(params)
            };
            _this.$refs.refTable.remoteData(param);
          }
        }
      }, {
        label: '重置',
        op: 'reset'
      }]
    };
  },
  computed: {
    ...mapGetters([
      'userCode', 'org'
    ])
  },
  mounted: function () {
    this.reSet();
  },
  methods: {
    selectFn: function () {
      var selections = this.$refs.refTable.selections;

      if (selections.length < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }

      this.wfDemo.bizType = selections[0].bizType;
      this.dialogVisible = false;
    },
    openDialog: function () {
      var _this = this;
      _this.dialogVisible = true;
      _this.$nextTick(function () {
        _this.$refs.refFormq.$children[0].resetFields();
        _this.$refs.refTable.remoteData({});
      });
    },
    reSet: function () {
      var myDate = new Date();
      this.wfDemo.pkId = myDate.getTime(); // 获取日期与时间
    },
    start: function () {
      var _this = this;

      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.org.id;
      startdto.userId = _this.userCode;
      startdto.bizType = _this.wfDemo.bizType;
      startdto.bizId = _this.wfDemo.pkId;
      startdto.bizUserName = _this.wfDemo.name;
      startdto.bizUserId = _this.wfDemo.id;
      startdto.param = {
        '金额': '10000',
        'money': 200
      };
      startdto.bizParam4 = '111';
      yufp.service.request({
        method: 'POST',
        data: startdto,
        url: _this.urls.start,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data.flowStarterName) {
              _this.$message({
                message: response.data.flowStarterName + '成功发起@' + response.data.flowName,
                type: 'success',
                duration: 6000
              });
            }

            _this.reSet();
          } else {
            _this.$message({
              duration: 6000,
              message: '流程发起异常:' + response.message.substring(0, 100),
              type: 'warning'
            });

            return false;
          }
        }
      });
    },
    startAndSubmit: function() {
      var _this = this;
      var startdto = {};
      if (_this.wfDemo.bizType == null || _this.wfDemo.bizType == "") {
        _this.$message({ message: "请选择业务类型！", type: "warning" });
        return false;
      }
      startdto.systemId = "cmis"; // 系统编号
      startdto.orgId = _this.org.id;// 登录机构号
      startdto.userId = _this.userCode;// 登录用户名
      startdto.bizType = _this.wfDemo.bizType;// 业务类型
      startdto.bizId = _this.wfDemo.pkId;// 流水号，业务数据主键
      startdto.bizUserName = _this.wfDemo.name;// 客户名称
      startdto.bizUserId = _this.wfDemo.id;// 客户编号
      startdto.param = {
        金额: "10000",
        money: _this.wfDemo.money,
        startOrgId: _this.org.id
      };// 自定义传输业务参数
      startdto.bizParam4 = "111";// 自定义传输业务参数
      _this.$refs.yufpNwfInit.wfInit(startdto);
    }
  }

}
</script>
