<template>
  <div>
    <yu-panel title="外部评估机构摇珠选择规则配置" panel-type="simple">
      <yu-xform related-table-name="refTable" ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="规则方案编号" ctype="input" placeholder="规则方案编号" name="ruleId"></yu-xform-item>
          <yu-xform-item label="规则方案名称" ctype="input" placeholder="规则方案名称" name="ruleName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_viewRelot" @click="addFn">新增</yu-button>
          <yu-button ref="btn_viewRelot" @click="updFn">修改</yu-button>
          <yu-button ref="btn_viewRelot" @click="viewFn">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column  label="规则方案编号" prop="ruleId" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="规则方案名称" prop="ruleName" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="摇号分配方式" prop="allotMode" data-code="STD_ZB_LOT_ALLOT_MODE" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="是否启用" prop="isBegin" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="外部评估机构摇珠选择规则配置" :visible.sync="dialogVisible" width="80%">
      <div style="overflow:hidden auto;height:100%">
      <yu-xform ref="refForm2" v-model="formdata" label-width="140px" :disabled="disabled">
        <yu-xform-group :column="2">
          <yu-xform-item label="规则方案编号" ctype="input" placeholder="规则方案编号" name="ruleId" v-show="showId" disabled></yu-xform-item>
          <yu-xform-item label="规则方案名称" ctype="input" placeholder="规则方案名称" name="ruleName" rules="required"></yu-xform-item>
          <yu-xform-item label="分配方式" ctype="radio" placeholder="分配方式" name="allotMode" data-code="STD_ZB_LOT_ALLOT_MODE" :colspan="16" rules="required" @change="change"></yu-xform-item>
          <yu-xform-item label="重估是否排除初估机构" ctype="radio" placeholder="重估是否排除初估机构" name="isAbnFirstOrg" :colspan="8" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="任务统计时间段" ctype="radio" placeholder="任务统计时间段" name="balanceAllotRuleCfg" :options="options3" :colspan="24" :hidden="redioDisabled ? false : true" rules="required"></yu-xform-item>
          <yu-xtable ref="refTable2" row-number :data="tableData" v-if="dialogVisible2" :colspan="24" :pageable="false">
            <yu-xtable-column  label="分数" prop="scoreRange"></yu-xtable-column>
            <yu-xtable-column  label="业务分配量(百分比)" ctype="yu-num" prop="busiAllotPercent" min-width="150px" sign="%" :multiple="100" :disabled="disabled"></yu-xtable-column>
          </yu-xtable>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="是否启用" ctype="select" placeholder="是否启用" name="isBegin" rules="required" data-code="STD_ZB_YES_NO"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updName" disabled></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrName" disabled></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn" v-if="disabled == true ? false : true" v-norepeat.loading="{timeout:200}">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">关闭</yu-button>
        </div>
      </yu-xform>
    </div></yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_RELOT_STATUS,STD_ZB_LOT_ALLOT_MODE,STD_ZB_YES_NO,YES_OR_NO');
export default {
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      showId: true,
      redioDisabled: false,
      options1: [{ key: '00', value: '随机分配' }, { key: '01', value: '均衡分配' }, { key: '02', value: '评估分数分配' }],
      options3: [{ key: '00', value: '按天统计' }, { key: '01', value: '按月统计' }, { key: '02', value: '按季度统计' }],
      formdata: {},
      disabled: true,
      tableData: '',
      dialogVisible: false,
      dialogVisible2: false,
      dataUrl: this.$backend.cmisCfg + '/api/cfglotrule/query',
      dataUrl2: this.$backend.cmisCfg + '/api/cfgevalscoreallotrule/query',
      tableInit: [{ scoreRange: '（90，100】', busiAllotPercent: '', id: '9' }, { scoreRange: '（80，90】', busiAllotPercent: '', id: '8' }, { scoreRange: '（70，80】', busiAllotPercent: '', id: '7' }, { scoreRange: '（60，70】', busiAllotPercent: '', id: '6' }, { scoreRange: '（50，60】', busiAllotPercent: '', id: '5' }, { scoreRange: '（40，50】', busiAllotPercent: '', id: '4' }, { scoreRange: '（30，40】', busiAllotPercent: '', id: '3' }, { scoreRange: '（20，30】', busiAllotPercent: '', id: '2' }, { scoreRange: '（10，20】', busiAllotPercent: '', id: '1' }, { scoreRange: '（0，10】', busiAllotPercent: '', id: '0' }],
      baseParams:{condition:{}, sort:"input_date desc"},
    };
  },
  mounted () {},
  watch: {
    // "formdata.allotMode": function(val) {
    //   if (val == "02") {
    //     this.dialogVisible2 = true;
    //     this.redioDisabled = false;
    //     return;
    //   } else if (val == "01") {
    //     this.redioDisabled = true;
    //     this.dialogVisible2 = false;
    //     return;
    //   }
    //   this.redioDisabled = false;
    //   this.dialogVisible2 = false;
    // }
  },
  methods: {
    addFn () {
      let _this = this;
      this.flag = 'add';
      this.dialogVisible = true;
      this.disabled = false;
      this.showId = false;
      let userInfo = this.$store.state.oauth;
      console.log(userInfo);
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        this.tableData = [];
        yufp.clone(this.tableInit, this.tableData);
        this.formdata.inputName = userInfo.userName;
        this.formdata.inputBrName = userInfo.org.name;
        this.formdata.inputId = userInfo.userCode;
        this.formdata.inputBrId = userInfo.org.code;
        this.formdata.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
        this.formdata.updId = userInfo.userCode;
        this.formdata.updBrId = userInfo.org.code;
        this.formdata.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
        this.change();
      });
    },
    updFn () {
      let _this = this;
      this.flag = 'edit';
      this.showId = true;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectRowData = {};
      this.$xutils.clone(selections[0], selectRowData)//克隆数据
      this.tableData = [];
      this.dialogVisible = true;
      this.title = '修改';
      this.disabled = false;
      let params = { condition: { ruleId: selectRowData.ruleId } };
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        yufp.service.request({
          method: 'GET',
          data: params,
          url: backend.cmisCfg + '/api/cfglotrule/query',
          callback: function (code, message, response) {
            if (response.code == 0) {
              yufp.clone(response.data[0], _this.formdata);
              // 校验表格
              if (response.data[0].allotMode == '02') {
                // 表格查询
                yufp.service.request({
                  method: 'GET',
                  data: params,
                  url: backend.cmisCfg + '/api/cfgevalscoreallotrule/query',
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.tableData = response.data;
                      // yufp.clone(response.data, _this.tableData);
                    }
                  }
                });
              } else {
                _this.tableData = _this.tableInit;
              }
            }
          }
        });
      });
    },
    viewFn () {
       let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let selectRowData = {};
      this.$xutils.clone(selections[0], selectRowData)//克隆数据
      this.dialogVisible = true;
      this.tableData = [];
      this.title = '查看';
      this.disabled = true;
      let params = { condition: { ruleId: selectRowData.ruleId } };
      this.$nextTick(() => {
        this.$refs.refForm2.resetFields();
        // 表单查询
        yufp.service.request({
          method: 'GET',
          data: params,
          url: backend.cmisCfg + '/api/cfglotrule/query',
          callback: function (code, message, response) {
            if (response.code == 0) {
              yufp.clone(response.data[0], _this.formdata);
              // 校验表格
              if (_this.formdata.allotMode == '02') {
                // 表格查询
                yufp.service.request({
                  method: 'GET',
                  data: params,
                  url: backend.cmisCfg + '/api/cfgevalscoreallotrule/query',
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.tableData = response.data;
                      // yufp.clone(response.data, _this.tableData);
                    }
                  }
                });
              }
            }
          }
        });
      });
    },

    /* 保存按钮*/
    saveFn () {
      let _this = this;
      // 校验表单
      var validate = false;
      _this.$refs.refForm2.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message.warning("请检查页面要素是否录入完整!");
        return;
      }
      // 校验表格
      if (_this.formdata.allotMode == '02') {
        let total = 0;
        for (let i = 0; i < _this.tableData.length; i++) {
          total += _this.tableData[i].busiAllotPercent * 1000;
        }
        if (total / 1000 != 1) {
           _this.$message.warning("业务分配量需100%!");
         // _this.$xutils.showMsgBox('提示', '业务分配量需100%');
          return;
        }
      }
      // 保存
      let params = {};
      let cfgEvalScoreAllotRule = {};
      params['cfgLotRule'] = _this.formdata;
      let userInfo = _this.$store.state.oauth;
      cfgEvalScoreAllotRule['updId'] = userInfo.userCode;
      cfgEvalScoreAllotRule['updBrId'] = userInfo.orgCode;
      cfgEvalScoreAllotRule['updDate'] = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      params['tableDataList'] = _this.tableData;
      if (_this.flag == 'add') {
        cfgEvalScoreAllotRule['inputId'] = userInfo.userCode;
        cfgEvalScoreAllotRule['inputBrId'] = userInfo.orgCode;
        cfgEvalScoreAllotRule['inputDate'] = _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
        params['cfgEvalScoreAllotRule'] = cfgEvalScoreAllotRule;
        yufp.service.request({
          method: 'POST',
          data: params,
          url: backend.cmisCfg + '/api/cfglotrule/insertRule',
          callback: function (code, message, response) {
            if (response.code == 0) {
              console.log(response.data);
              if (response.data != null) {
                _this.$message.success("保存成功!");
                //_this.$xutils.showMsgBox('提示', '保存成功');
                _this.cancelFn();
                _this.$refs.refTable.remoteData();
              } else {
                _this.$message.warning("已存在一条启用规则!");
                //_this.$xutils.showMsgBox('提示', '已存在一条启用规则');
              }
            } else {
              _this.$message.error("保存失败!");
             // _this.$xutils.showMsgBox('提示', '保存失败');
            }
          }
        });
        return;
      }
      params['cfgEvalScoreAllotRule'] = cfgEvalScoreAllotRule;
      yufp.service.request({
        method: 'POST',
        data: params,
        url: backend.cmisCfg + '/api/cfglotrule/updateRule',
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              _this.$message.success("保存成功!");

              //_this.$xutils.showMsgBox('提示', '保存成功');
              _this.cancelFn();
              _this.$refs.refTable.remoteData();
            } else {
              _this.$message.warning("已存在一条启用规则!");

              // _this.$xutils.showMsgBox('提示', '已存在一条启用规则');
            }
          } else {
            _this.$message.error("保存失败!");
           // _this.$xutils.showMsgBox('提示', '保存失败');
          }
        }
      });
    },
    change: function (val) {
      let _this = this ;
      if (val == '02') {
        _this.dialogVisible2 = true;
        _this.redioDisabled = false;
        return;
      } else if (val == '01') {
        _this.redioDisabled = true;
        _this.dialogVisible2 = false;
        return;
      }
      _this.redioDisabled = false;
      _this.dialogVisible2 = false;
    },
    /* 返回按钮*/
    cancelFn () {
      let _this = this ;
      _this.dialogVisible = false;
    }
  }
};
</script>
