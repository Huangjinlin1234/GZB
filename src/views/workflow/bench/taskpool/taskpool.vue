
<template>
  <yu-panel title="我的项目池" :collapse-hide="false">
    <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
      <yu-xform-group :column="3">
        <yu-xform-item label="项目池ID" placeholder="项目池ID" ctype="input" name="poolId"></yu-xform-item>
        <yu-xform-item label="项目池名称" placeholder="项目池名称" ctype="input" name="poolName"></yu-xform-item>
        <div slot="custom" class="btn-group">
          <yu-button-group style="margin-left: 10px;">
            <yu-button type="primary" @click="searchFn">查询</yu-button>
            <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
          </yu-button-group>
        </div>
      </yu-xform-group>
    </yu-xform>
    <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-row-op="customRowOp">
    </el-table-x>
  </yu-panel>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/wf/bench/userTaskPoolByModel'
      },
      tableColumns: [{
        label: '项目池名称',
        prop: 'poolName',
        resizable: true
      }, {
        label: '项目池ID',
        prop: 'poolId',
        resizable: true
      }, // { label: '项目池描述', prop: 'poolDesc', resizable: true ,align:'center'},
      {
        label: '待认领数量',
        prop: 'num',
        resizable: true
      }, {
        label: '操作',
        width: 100,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'edit\')">认领</el-button>\
                </template>';
        }
      }],
      baseParams: {},
      height: yufp.frame.size().height - 103
    };
  },
  computed: {
    ...mapGetters([
      'userCode'
    ])
  },
  created () {
    this.baseParams = {
      condition: {
        userId: this.userCode
      }
    };
  },
  methods: {
    customRowOp: function (scope, op) {
      // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');
      if (op == 'edit') {
        var params = {
          poolName: scope.row.poolName,
          poolId: scope.row.poolId,
          returnBackFuncId: this.$route.name,
          returnBackRootId: this.$route.name
        };
        this.$router.replace({name: 'taskpoolinfo', params});
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            poolName: model.poolName ? '%' + model.poolName + '%' : '',
            poolId: model.poolId ? model.poolId : ''
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.reftable.remoteData(param);
        }
      });
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }

};
</script>
