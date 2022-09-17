
<template>
  <yu-panel title="我的委托" :collapse-hide="false">
    <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
      <yu-xform-group :column="4">
        <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
        <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
        <div slot="custom" class="btn-group">
          <yu-button-group style="margin-left: 10px;">
            <yu-button type="primary" @click="searchFn">查询</yu-button>
            <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
          </yu-button-group>
        </div>
      </yu-xform-group>
    </yu-xform>
    <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-detail-click="rowDblclick"></el-table-x>
  </yu-panel>
</template>
<script>
import { mapGetters } from "vuex"
import { BIZ_TYPES } from "@/views/workflow/bench/todo/commonbiztype"
export default {
  data: function () {
    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/bench/entrust'
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                                <span style="color:red;text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-detail-click\', scope.row)">{{scope.row.instanceId}}</span>\
                            </template>';
        }
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        hidden: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true
      }, {
        label: '委托人',
        prop: 'userId',
        resizable: true
      }, // { label: '被委托人', prop: 'userName', resizable: true ,align:'center'},
      {
        label: '客户编号',
        prop: 'bizUserId',
        resizable: true,
        hidden: false
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true
      }, {
        label: '委托节点',
        prop: 'nodeId',
        resizable: true,
        hidden: false
      }, {
        label: '节点名称',
        prop: 'nodeId',
        resizable: true,
        hidden: true
      }, {
        label: '委托节点开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '上一节点',
        prop: 'lastNodeId',
        resizable: true,
        hidden: true
      }, {
        label: '上一节点名称',
        prop: 'lastNodeName',
        resizable: true,
        hidden: true
      }, {
        label: '节点审批结果',
        prop: 'nodeState',
        resizable: true,
        hidden: true,
        template: function () {
          return '<template slot-scope="scope">\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-0\'">拿回</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.nodeState==\'O-1\'">打回</yu-tag>\
                <yu-tag type="warning" v-if="scope.row.nodeState==\'O-2\'">退回</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-5\'">催办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-6\'">转办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-7\'">协办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.nodeState==\'O-9\'">跳转</yu-tag>\
                <yu-tag type="success" v-if="scope.row.nodeState==\'O-12\'">同意</yu-tag>\
                </template>';
        }
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true
      }],
      baseParams: {},
      height: yufp.frame.size().height - 103
    };
  },
  computed: {
    ...mapGetters([
      "userCode"
    ])
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode
      }
    }
  },
  methods: {
    rowDblclick: function (row, event) {
      // 往实例信息页面跳转
      var param = {
        instanceId: row.instanceId,
        nodeId: row.nodeId,
        isShow: 1,
        type: 'DONE',
        returnBackFuncId: this.$route.name,
        returnBackRootId: this.$route.name
      };
      if (BIZ_TYPES && BIZ_TYPES.indexOf(row.bizType) > -1) {
        this.$router.replace({ name: 'instanceInfo', params: param });
      } else {
        this.$router.replace({ name: 'instanceInfoLite', params: param });
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            lastUserName: model.lastUserName ? '%' + model.lastUserName + '%' : "",
            instanceId: model.instanceId ? model.instanceId : "",
            bizId: model.bizId ? model.bizId : ""
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.reftable.remoteData(param);
        }
      })
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }

}
</script>
