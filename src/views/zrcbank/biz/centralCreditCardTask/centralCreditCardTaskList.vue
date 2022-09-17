<template>
  <!--
    @created by dongan
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="信用卡任务池" class="adjust-height" show-search-input placeholder="关键字" @search="fuzzyQuery">
      <template slot="right">
        <yu-toolBar>
          <yu-button @click="infoFn">查看</yu-button>
          <yu-button @click="distributionFn">分配</yu-button>
          <yu-button @click="getFn">领取</yu-button>
          <yu-button @click="invalidFn">作废</yu-button>
        </yu-toolBar>
      </template>
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="110px">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请编号" name="serno" ctype="input"></yu-xform-item   >
            <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="证件号码" name="certType" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="任务类型" name="taskType" ctype="input"></yu-xform-item>
            <yu-xform-item label="申请渠道" name="appChnl" ctype="input"></yu-xform-item>
            <yu-xform-item label="单位名称" name="cprtName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="申请卡产品" name="creditCardType" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" reserve-selection request-type="POST" :default-load="false" :base-params="baseParams" selection-type="checkbox" @row-click="refTableSelect" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请卡产品" prop="creditCardType" data-code=""></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certType" ></yu-xtable-column>
        <yu-xtable-column label="单位名称" prop="cprtName" ></yu-xtable-column>
        <yu-xtable-column label="任务类型" prop="taskType" data-code=""></yu-xtable-column>
      </yu-xtable>
    </yu-panel>


    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="任务分配" :visible.sync="dialogdistributionVisible" width="650px">
      <yu-xform ref="refForm1" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="接收人" name="receiverIdName" ctype="yu-xuser" @select-fn="commonSelectFn" :mapping="{ userName: 'receiverIdName', loginCode: 'receiverId', orgName: 'receiverOrgName', orgId: 'receiverOrg' }"></yu-xform-item>
          <yu-xform-item label="接收人工号" name="receiverId" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrgName" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrg" hidden ctype="input"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(1)">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogdistributionVisible = !dialogdistributionVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

    <yu-xdialog title="任务作废" :visible.sync="dialoginvalidVisible" width="650px">
      <yu-xform ref="refForm2" label-width="90px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="作废原因" name="cancelResn" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn(2)">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialoginvalidVisible = !dialoginvalidVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_ZB_YES_NO,STD_TASK_TYPE,STD_BIZ_SUB_TYPE,STD_OPT_TYPE,STD_FILE_TASK_STATUS');
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/centralcreditcardtask/',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 分配页面
      dialogdistributionVisible: false,
      // 作废页面
      dialoginvalidVisible: false,
      baseParams: { }
    };
  },
  mounted () {
    this.baseParams = { condition: { taskStatus: '01' } };
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
      let arr = [];
      let _time = _this.$xutils.getDefaultformulaData('$CURRTIME');
      let _id = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      let _org = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      if (index == '1') {
        // 分配
        for (let i = 0; i < len; i++) {
          let item = {};
          item = selections[i];
          item.updId = _id;
          item.updBrId = _org;
          item.updDate = _time;
          item.receiverId = _this.formdata.receiverId;
          item.receiverOrg = _this.formdata.receiverOrg;
          item.taskStatus = '02';
          arr.push(item);
        }
      } else {
        // 作废
        for (let i = 0; i < len; i++) {
          let item = {};
          item = selections[i];
          item.updId = _id;
          item.updBrId = _org;
          item.updDate = _time;
          item.cancelResn = _this.formdata.cancelResn;
          item.taskStatus = '03';
          arr.push(item);
        }
      }
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/centralcreditcardtask/batchupdate`,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogdistributionVisible = false;
            _this.dialoginvalidVisible = false;
          } else {
            _this.$message({ message: '操作失败！', type: 'error' });
          }
        }
      });
    },
    /** 作废*/
    invalidFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (_this.$refs.refForm2) {
        _this.$refs.refForm2.resetFields();
      }
      _this.dialoginvalidVisible = true;
    },
    /** 接受人选择方法 */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },
    /** 分配 */
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
      _this.dialogdistributionVisible = true;
      this.$nextTick(function () {
        _this.$refs.refForm1.resetFields();
      });
    },
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTable.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    /** 任务查看 */
    infoFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = {};
      model.taskNo = selections[0].taskNo;
      let name = 'zrcbank/biz/centralCreditCardTask/centralCreditCardTaskDetail';
      let key = 'centralCreditCardTaskDetail' + selections[0].taskNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '任务信息查看',
        // 传递的业务数据，可选配置
        data: model
      });
    },
    /**
     * 领取操作
     */
    getFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将领取选中的任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            let arr = [];
            let len = selections.length;
            let _id = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
            let _org = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
            let _time = _this.$xutils.getDefaultformulaData('$CURRTIME');
            for (let i = 0; i < len; i++) {
              let model = {};
              model = selections[i];
              model.updId = _id;
              model.updBrId = _org;
              model.updDate = _time;
              model.receiverOrg = _org;
              model.receiverId = _id;
              model.receiverOrg = _org;
              model.taskStatus = '02';
              arr.push(model);
            }
            yufp.service.request({
              method: 'POST',
              url: `${backend.cmisBiz}/api/centralcreditcardtask/batchupdate`,
              data: JSON.stringify(arr),
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message({ message: '操作失败！', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    refTableSelect: function (row, event, column, index) {
      var _this = this;
      var _data = _this.$refs.refTable.selections;
      var len = _data.length;
      var arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(_data[i].itemId);
      }
      if (arr.indexOf(row.itemId) > -1) {
        _this.$refs.refTable.toggleRowSelection(row, false);
      } else {
        _this.$refs.refTable.toggleRowSelection(row, true);
      }
    },
    /**
     * 导出操作
     */
    exportFn: function () {}
  }
};
</script>
