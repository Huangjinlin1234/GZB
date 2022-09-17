<template>
  <!--
    @created by tangxun
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="档案任务历史" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTable2" form-type="search"  v-model="searchFormdata" label-width="80px">
          <yu-xform-group :column="3">
            <yu-xform-item label="操作类型"  placeholder="操作类型" name="optType" ctype="select" data-code="STD_OPT_TYPE"></yu-xform-item>
            <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="任务类型" placeholder="任务类型" name="taskType" ctype="select" data-code="STD_FILE_TASK_TYPE"></yu-xform-item>
            <yu-xform-item label="资料类型" placeholder="资料类型" name="bizType" ctype="select" data-code="STD_BIZ_SUB_TYPE"></yu-xform-item>
            <yu-xform-item label="责任机构" placeholder="责任机构" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'orgId':'inputBrId','managerBrIdName':'managerBrIdName'}" name="inputBrId"></yu-xform-item>
            <yu-xform-item label="任务状态" placeholder="任务状态" :datacode-filter="datacodeFilterFn" name="taskStatus" ctype="select" data-code="STD_FILE_TASK_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <template>
        <div style="margin-bottom:10px;">
          <yu-button type="primary" @click="infoFn">查看</yu-button>
          <yu-button type="primary" @click="errorFn(false)">差错原因录入</yu-button>
          <yu-button type="primary" @click="errorFn(true)">差错原因记录</yu-button>
        </div>
      </template>
        <yu-xtable ref="refTable2" reserve-selection request-type="POST" :base-params="baseParams" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
          <yu-xtable-column label="任务编号" prop="taskNo"></yu-xtable-column>
          <yu-xtable-column label="任务是否加急" prop="taskUrgentFlag" >
            <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.taskUrgentFlag === '9'">不加急</yu-tag>
            <yu-tag type="danger" v-if="scope.row.taskUrgentFlag === '1'">管理岗加急</yu-tag>
            <yu-tag type="warning" v-if="scope.row.taskUrgentFlag === '2'">客户经理加急</yu-tag>
            <yu-tag type="success" v-if="scope.row.taskUrgentFlag === '3'">系统加急</yu-tag>
          </template>
          </yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="业务流水号" prop="serno">
            <template slot-scope="scope">
              <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="rowClick(scope.row)" v-if="scope.row.bizType === 'DB009'">{{ scope.row.serno }}</span>
              <span v-else>{{ scope.row.serno }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="全局流水号" prop="traceId"></yu-xtable-column>
          <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE"></yu-xtable-column>
          <yu-xtable-column label="任务类型" prop="taskType" data-code="STD_FILE_TASK_TYPE"></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="optType" data-code="STD_OPT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          <yu-xtable-column label="任务生成时间" prop="taskStartTime" width="120"></yu-xtable-column>
          <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_FILE_TASK_STATUS"></yu-xtable-column>
          <yu-xtable-column label="接收人" prop="receiverIdName"></yu-xtable-column>
          <yu-xtable-column label="接收机构" prop="receiverOrgName"></yu-xtable-column>
          <yu-xtable-column label="操作人" prop="updIdName"></yu-xtable-column>
          <yu-xtable-column label="操作时间" prop="updDate"></yu-xtable-column>
        </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="差错原因" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="130px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="差错原因" rules="required" name="errorResn" ctype="checkbox" data-code="STD_ERROR_RESN" :colspan="24"></yu-xform-item>
          <yu-xform-item label="差错原因说明" rules="required" name="errorResnDesc" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" v-show="!formDisabled" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_FILE_TASK_TYPE,STD_ZB_YES_NO,STD_BIZ_SUB_TYPE,STD_OPT_TYPE,STD_FILE_TASK_STATUS,STD_ERROR_RESN');
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
      formdataview: {},
      dataUrl: `${backend.cmisBiz}/api/centralfiletask/query`,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      dialogVisible: false,
      dialogInfoVisible: false,
      baseParams: {},
      formDisabled: false
    };
  },
  created () {
    this.baseParams = { condition: { taskStatus: '03,04', receiverId: this.loginCode}, sort: 'updDate desc' };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  methods: {
    /** 差错原因保存 */
    saveFn () {
      let _this = this;
      let model = {};
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var selections = _this.$refs.refTable2.selections;
      model.taskNo = selections[0].taskNo;
      model.errorResn = _this.formdata.errorResn.join(',');
      model.errorResnDesc = _this.formdata.errorResnDesc;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/centralfiletask/update`,
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable2.remoteData();
            _this.dialogVisible = false;
            _this.$message('录入成功');
          } else {
            _this.$message({type: 'error', message: '录入失败'});
          }
        }
      });
    },
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '03' || op.key === '04') { return true }
        return false;
      });
    },
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTable2.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    /** 任务查看 */
    infoFn () {
      var _this = this;
      var selections = _this.$refs.refTable2.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = {};
      model.taskNo = selections[0].taskNo;
      model.viewType = 'VIEW';
      let name = 'zrcbank/biz/centralfiletask/centralfileDetail';
      this.$dialog.open('任务信息查看', name, -1, -1, model, null);
    },
    /**
     * 差错原因录入
     */
    errorFn: function (onlyView) {
      var _this = this;
      var selections = _this.$refs.refTable2.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (onlyView) {
        _this.formDisabled = true;
      } else {
        _this.formDisabled = false;
      }
      this.dialogVisible = true;
      this.$nextTick(() => {
        _this.$refs.refForm.resetFields();
        yufp.clone(selections[0], this.formdata);
      });
    },
    cancelFn () {
      this.dialogVisible = false;
    },
    /** 参照公共的确认事件 */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'orgId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'orgId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
     // 点击跳转至抵押注销
    rowClick (row) {
      let jsoPar = row;

      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['type'] = 'VIEW';
      opJso['regType'] = '02';
      this.$dialog.open('抵押注销详情', 'guarmanage/registerManage/guarMortgageRegisterAppFormIndex.vue', -1, -1, opJso);
    }
  }
};
</script>
