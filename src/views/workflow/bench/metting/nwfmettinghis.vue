
<template>
  <div>
    <yu-panel title="会办投票" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" form-type="search">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="会议主题" placeholder="会议主题" ctype="input" name="mettingSub" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="业务流水号" placeholder="业务流水号" name="bizId" ctype="input"></yu-xform-item>
          <yu-xform-item label="会议年份" placeholder="会议年份" name="mettingYear" ctype="input"></yu-xform-item>
          <yu-xform-item label="会议期数" placeholder="会议期数" name="mettingNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" @custom-row-op="customRowOp" :data-url="urls.index" :table-columns="tableColumns"></el-table-x>
    </yu-panel>
    <el-dialog-x :title="viewTitle" :visible.sync="dialogVisible" width="650px" @close="cancel">
      <el-form-x ref="reform" :group-fields="updateFields" label-width="100px"></el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button @click="nwfVoteFn">确定</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
export default {
  data: function () {
    var ResultOptions = [{
      key: 'Y',
      value: '同意'
    }, {
      key: 'N',
      value: '否决'
    }, {
      key: 'G',
      value: '再议'
    }];
    return {
      urls: {
        index: backend.workflowService + '/api/metting/myOp',
        vote: backend.workflowService + '/api/metting/op'
      },
      tableColumns: [{
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true,
        hidden: false
      }, {
        label: '会议主题',
        prop: 'mettingSub',
        resizable: true
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true
      }, {
        label: '结束时间',
        prop: 'endTime',
        resizable: true
      }, {
        label: '会议年份',
        prop: 'mettingYear',
        resizable: true
      }, {
        label: '会议期数',
        prop: 'mettingNo',
        resizable: true
      }, {
        label: '意见',
        prop: 'mettingComment',
        resizable: true
      }, {
        label: '结论',
        prop: 'mettingSts',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                <yu-tag type="success" v-if="scope.row.mettingSts==\'Y\'">同意</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.mettingSts==\'N\'">否决</yu-tag>\
                <yu-tag type="warning" v-if="scope.row.mettingSts==\'G\'">再议</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.mettingSts==null">未投票</yu-tag>\
                </template>';
        }
      }, {
        label: '参会人',
        prop: 'userId',
        resizable: true
      }, {
        label: '参会人姓名',
        prop: 'userName',
        resizable: true
      }, {
        label: '操作',
        width: 100,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
            <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'vote\')">投票</el-button>\
          </template>';
        }
      }],
      updateFields: [{
        columnCount: 2,
        fields: [{
          label: '流程实例号',
          field: 'instanceId',
          type: 'input',
          disabled: true,
          rules: [{
            required: true,
            message: '必填项'
          }]
        }, {
          label: '业务流水号',
          field: 'bizId',
          type: 'input',
          disabled: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }, {
          label: '参会人',
          field: 'userId',
          type: 'input',
          disabled: true,
          rules: [{
            required: true,
            message: '必填项'
          }]
        }, {
          label: '参会人姓名',
          field: 'userName',
          type: 'input',
          disabled: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }, {
          label: '结束时间',
          field: 'endTime',
          type: 'input',
          hidden: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }, {
          label: '会议主题',
          field: 'mettingSub',
          type: 'input',
          disabled: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }, {
          label: '开始时间',
          field: 'startTime',
          type: 'input',
          disabled: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }, {
          label: '会议年份',
          field: 'mettingYear',
          type: 'input',
          disabled: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }, {
          label: '会议期数',
          field: 'mettingNo',
          type: 'input',
          disabled: true,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }]
      }, {
        columnCount: 1,
        fields: [{
          field: 'mettingSts',
          label: '结论',
          type: 'select',
          options: ResultOptions,
          rules: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          }]
        }, {
          label: '意见',
          field: 'mettingComment',
          type: 'textarea',
          rules: [
            {
              required: true,
              message: '必填项',
              trigger: 'blur'
            },
            {
              max: 30,
              message: '长度不能超过30个字符'
            },
            { validator: validator.speChar }
          ]
        }]
      }],
      baseParams: {},
      height: yufp.frame.size().height - 103,
      dialogVisible: false,
      viewTitle: '投票',
      formdata: {}
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
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');


      if (op == 'vote') {
        if (scope.row.mettingSts != null) {
          _this.$message({
            message: '投票已结束!',
            type: 'warning'
          });
        } else {
          _this.$nextTick(function () {
            _this.voteFn();
          });
        }
      }
    },
    voteFn: function () {
      if (this.$refs.reftable.selections.length !== 1) {
        this.$message({
          message: '请选择至少一条数据!',
          type: 'warning'
        });
        return false;
      }

      var obj = this.$refs.reftable.selections[0];
      this.dialogVisible = true;
      this.$nextTick(function () {
        var reform = this.$refs.reform;
        reform.formModel = obj;
      });
      this.dialogVisible = true;
    },
    nwfVoteFn: function () {
      var _this = this;

      var param = {};
      var reform = _this.$refs.reform;
      reform.validate(function (valid) {
        if (valid) {
          yufp.extend(param, reform.formModel);
          yufp.service.request({
            url: _this.urls.vote,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data) {
                _this.$message({
                  message: '投票成功',
                  type: 'success'
                });

                _this.$refs.reform.resetFields();

                _this.dialogVisible = false;

                _this.$refs.reftable.remoteData();
              }
            }
          });
        } else {
          _this.$message({
            message: '请检查输入项是否合法',
            type: 'warning'
          });

          return false;
        }
      });
    },
    cancel: function () {
      this.dialogVisible = false;
    }
  }

};
</script>
