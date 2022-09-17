<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="运行实例" >
      <yu-xform form-type="search" v-model="formdata" related-table-name="refTable" ref="searchForm" label-width="100px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="业务流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item placeholder="业务类型" ctype="select" name="bizType" data-code="STD_BIZ_SUB_TYPE_JIAJI" ></yu-xform-item>
          <yu-xform-item placeholder="客户编号" ctype="input" name="bizUserId"></yu-xform-item>
          <yu-xform-item placeholder="客户名称" ctype="input" name="bizUserName" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="refTable" :base-params="mybaseParams" :data-url="dataUrl" :table-columns="tableColumns" ></el-table-x>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YuRunInstance',
  componentName: 'YuRunInstance',
  mixins: [popList],
  props: {
    bizType: String
  },
  data: function () {
    return {
      dataUrl: backend.workflowService + '/api/bench/instance/cusmonitor/todo',
      // 表格中传出id数据的key
      queryCode: 'bizId',
      // 表格中显示到input框中的字段key
      textCode: 'bizId',
      requestType: 'post',
      responseType: 'array',
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
      }, {
        label: '流程主实例号',
        prop: 'mainInstanceId',
        resizable: true,
        hidden: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true,
        hidden: false
      },
      {
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        dataCode: 'STD_BIZ_SUB_TYPE_JIAJI'
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        hidden: true
      }, {
        label: '流程编号',
        prop: 'flowId',
        width: 80,
        resizable: true,
        hidden: true
      }, {
        label: '发起人',
        prop: 'flowStarterName',
        resizable: true,
        hidden: false
      }, {
        label: '发起机构',
        prop: 'orgName',
        resizable: true,
        hidden: false
      }, {
        label: '客户编号',
        prop: 'bizUserId',
        resizable: true
      }, {
        label: '客户名称',
        prop: 'bizUserName',
        resizable: true
      }, {
        label: '当前处理人',
        prop: 'userName',
        resizable: true
      }, {
        label: '流程状态',
        prop: 'flowState',
        width: 100,
        resizable: true,
        hidden: false,
        template: function () {
          return '<template slot-scope="scope">\
              <yu-tag type="success" v-if="scope.row.flowState==\'E\'">正常结束</yu-tag>\
              <yu-tag type="danger" v-if="scope.row.flowState==\'F\'">否决</yu-tag>\
              <yu-tag type="warning" v-if="scope.row.flowState==\'H\'">挂起</yu-tag>\
              <yu-tag type="primary" v-if="scope.row.flowState==\'P\'">暂停</yu-tag>\
              <yu-tag type="success" v-if="scope.row.flowState==\'R\'">运行中</yu-tag>\
              <yu-tag type="gray" v-if="scope.row.flowState==\'S\'">待发起</yu-tag>\
              </template>';
        }
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true,
        hidden: false
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: true
      }, {
        label: '流程标识',
        prop: 'flowSign',
        resizable: true,
        hidden: true
      }, {
        label: '系统编号',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '管理员机构',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }],
      codeToText: false
    };
  },
  computed: {
    mybaseParams: function () {
      return { condition: { bizType: this.bizType } };
    }
  }
};
</script>
