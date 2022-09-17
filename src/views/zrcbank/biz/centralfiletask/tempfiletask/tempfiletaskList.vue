<template>
  <!--
    @created by tangxun
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="临时档案台账查询" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
          <yu-xform-group :column="3">
            <yu-xform-item placeholder="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item placeholder="客户编号" name="cusId" ctype="input" ></yu-xform-item>
            <yu-xform-item placeholder="档案编号" name="fileNo" ctype="input" ></yu-xform-item>
            <yu-xform-item placeholder="台账状态" name="accStatus" ctype="select" data-code="STD_FILE_ACC_STATUS"></yu-xform-item>
            <yu-xform-item placeholder="资料类型" name="bizType" ctype="select" data-code="STD_BIZ_SUB_TYPE_TAIZHANG" filterable></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <template>
        <div style="margin-bottom:10px;">
          <yu-button type="primary" @click="distributionFn">派发</yu-button>
          <yu-button type="primary" @click="tempsaveFn">暂存</yu-button>
          <yu-button type="primary" @click="outboundFn">出库</yu-button>
          <yu-button type="primary" @click="viewop">查看操作记录</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" :base-params="baseParams" request-type="POST" selection-type="checkbox" row-key="fileNo" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="档案编号" prop="fileNo"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="全局流水号" prop="traceId"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE_TAIZHANG"></yu-xtable-column>
        <yu-xtable-column label="临时库位号" prop="tempLocationNo"></yu-xtable-column>
        <yu-xtable-column label="接收人" prop="receiverIdName"></yu-xtable-column>
        <yu-xtable-column label="接收机构" prop="receiverOrgName"></yu-xtable-column>
        <yu-xtable-column label="档案上送日期" prop="fileReceiverDate"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_FILE_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="派发" :visible.sync="dialogdistributionVisible" width="650px">
      <yu-xform ref="refForm1" label-width="120px" v-model="formdataDistribution" >
        <yu-xform-group>
          <yu-xform-item label="接收人" name="receiverIdName" rules="required" ctype="yu-xuser" :parms="{userSts:'A'}" @select-fn="commonSelectFn" :mapping="{ userName: 'receiverIdName', loginCode: 'receiverId', orgName: 'receiverOrgName', orgId: 'receiverOrg' }"></yu-xform-item>
          <yu-xform-item label="接收人工号" name="receiverId" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrgName" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrg" hidden ctype="input"></yu-xform-item>
          <yu-xform-item label="派发原因" name="distributeDesc" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(1)">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogdistributionVisible = !dialogdistributionVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog title="暂存" :visible.sync="dialogSaveVisible" width="650px">
      <yu-xform ref="refForm2" label-width="80px" v-model="formdataTempSave" >
        <yu-xform-group>
          <yu-xform-item label="暂存原因" rules="required" name="tempSaveDesc" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(2)">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogSaveVisible = !dialogSaveVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog title="出库" :visible.sync="dialogOutVisible" width="650px">
      <yu-xform ref="refForm3" label-width="120px" v-model="formdataOut" >
        <yu-xform-group>
          <yu-xform-item label="出库原因"  name="fileOutDesc" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(3)">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogOutVisible = !dialogOutVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapGetters } from 'vuex';
yufp.lookup.reg('STD_FILE_TASK_TYPE,STD_BIZ_SUB_TYPE_TAIZHANG,STD_OPT_TYPE,STD_FILE_TASK_STATUS');

export default {
  data: function () {
    return {
      searchFormdata: {},
      formdataDistribution: {},
      formdataTempSave: {},
      formdataOut: {},
      dataUrl: `${backend.cmisBiz}/api/centralfileinfo/query`,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 派发页面
      dialogdistributionVisible: false,
      // 暂存页面
      dialogSaveVisible: false,
      dialogOutVisible: false,
      baseParams: {condition: {accStatus: '01,02'}, sort: 'file_no desc'}
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  methods: {
    /** 保存方法 */
    saveFn (index) {
      let _this = this;
      let validate = false;
      _this.$refs[`refForm${index}`].validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let selections = _this.$refs.refTable.selections;
      let len = selections.length;
      if (index == '1') {
        // 派发
        let arr = [];
        for (let i = 0; i < len; i++) {
          let item = {};
          item.fileNo = selections[i].fileNo;
          item.receiverId = this.formdataDistribution.receiverId;
          item.receiverOrg = this.formdataDistribution.receiverOrg;
          item.accStatus = '02'; // 已派发
          arr.push(item);
        }
        let model = {
          centralfileinfoList: arr,
          centralfileoptrecord: {
            fileOptType: '02', // 派发
            optReason: _this.formdataDistribution.distributeDesc
          }
        };
        yufp.service.request({
          method: 'POST',
          url: `${backend.cmisBiz}/api/centralfileinfo/batchUpdateSelective`,
          data: model,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$refs.refTable.remoteData();
              _this.$message('派发成功');
              _this.dialogdistributionVisible = false;
            } else {
              _this.$message({type: 'error', message: '派发失败'});
            }
          }
        });
      } else if (index == '2') {
        // 暂存
        let arr = [];
        for (let i = 0; i < len; i++) {
          let item = {};
          item.fileNo = selections[i].fileNo;
          item.receiverId = this.loginCode;
          item.receiverOrg = this.org.code;
          item.accStatus = '01'; // 已暂存
          arr.push(item);
        }
        let model = {
          centralfileinfoList: arr,
          centralfileoptrecord: {
            fileOptType: '01', // 暂存
            optReason: _this.formdataTempSave.tempSaveDesc
          }
        };
        yufp.service.request({
          method: 'POST',
          url: `${backend.cmisBiz}/api/centralfileinfo/batchUpdateSelective`,
          data: model,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$refs.refTable.remoteData();
              _this.dialogSaveVisible = false;
              _this.$message('暂存成功');
            } else {
              _this.$message({type: 'error', message: '暂存失败'});
            }
          }
        });
      } else if (index == '3') {
        // 出库
        let arr = [];
        for (let i = 0; i < len; i++) {
          let item = {};
          item.fileNo = selections[i].fileNo;
          item.receiverId = this.loginCode;
          item.receiverOrg = this.org.code;
          item.accStatus = '03'; // 已出库
          arr.push(item);
        }
        let model = {
          centralfileinfoList: arr,
          centralfileoptrecord: {
            fileOptType: '03', // 出库
            optReason: _this.formdataOut.fileOutDesc
          }
        };
        yufp.service.request({
          method: 'POST',
          url: `${backend.cmisBiz}/api/centralfileinfo/batchUpdateSelective`,
          data: model,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$refs.refTable.remoteData();
              _this.$message('出库成功');
              _this.dialogOutVisible = false;
            } else {
              _this.$message({type: 'error', message: '出库失败'});
            }
          }
        });
      }
    },
    /** 派发 */
    distributionFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      let len = selections.length;
      for (let i = 0; i < len; i++) {
        if (selections[i].accStatus != '01') {
          _this.$message(`只能对已暂存的进行派发,${selections[i].fileNo}不符合要求`);
          return;
        }
      }
      _this.dialogdistributionVisible = true;
      _this.$nextTick(() => {
        _this.$refs.refForm1.resetFields();
      });
    },
    /** 暂存 */
    tempsaveFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      let len = selections.length;
      for (let i = 0; i < len; i++) {
        if (selections[i].accStatus != '02') {
          _this.$message(`只能对已派发的进行暂存,${selections[i].fileNo}不符合要求`);
          return;
        }
      }
      _this.dialogSaveVisible = true;
      _this.$nextTick(() => {
        _this.$refs.refForm2.resetFields();
      });
    },
    outboundFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }
      let len = selections.length;
      for (let i = 0; i < len; i++) {
        // 02 - 已派发
        if (selections[i].accStatus != '01') {
          _this.$message(`只能对已暂存的进行出库,${selections[i].fileNo}不符合要求`);
          return;
        }
      }
      _this.dialogOutVisible = true;
      _this.$nextTick(() => {
        _this.$refs.refForm3.resetFields();
      });
    },
    viewop () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/centralfiletask/tempfiletask/tempfileoptrecord';
      let model = {};
      model.fileNo = selections[0].fileNo;
      model.viewType = 'VIEW';
      this.$dialog.open('操作记录信息查看', name, -1, -1, model, null);
    },
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTable.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    /** 接受人选择方法 */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdataDistribution[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdataDistribution[item] = data[item];
        }
      }
    },
    /** 接受人选择方法 */
    commonSelectFn3: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdataOut[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdataOut[item] = data[item];
        }
      }
    }
  }
};
</script>
