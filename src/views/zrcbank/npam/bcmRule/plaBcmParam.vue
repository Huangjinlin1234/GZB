
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="催收参数设置" :hideFilter="false" :collapseHide="false">
        <yu-xform v-model="searchFormdata"  label-width="170px" ref="refForm">
          <yu-xform-group :column="2">
            <yu-xform-item rules="required" label="规则编号" name="ruleId" disabled></yu-xform-item>
            <yu-xform-item rules="required" label="规则名称" name="ruleName" :disabled="viewType == 'DETAIL'"></yu-xform-item>
            <yu-xform-item rules="required" label="资产类型" name="assetType" :disabled="viewType == 'DETAIL'" ctype="select" data-code="STD_ASSET_TYPE"></yu-xform-item>
            <yu-xform-item rules="required" label="任务生成频率" name="taskFreq" :disabled="viewType == 'DETAIL'" ctype="select" data-code="STD_TASK_FREQ"></yu-xform-item>
            <yu-xform-item rules="required" label="催收类型" name="bcmType" :disabled="viewType == 'DETAIL'" ctype="select" data-code="STD_BCM_TYPE"></yu-xform-item>
            <yu-xform-item rules="required" label="任务要求完成时间(天)" name="finishDay" :disabled="viewType == 'DETAIL'"></yu-xform-item>
            <yu-xform-item  label="催收提醒模板" name="bcmTemplate" ctype="textarea" colspan="24" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-panel title="催收参数列表" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <template slot="right">
        <div>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="addFn" >添加</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="deleteFn">删除</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center" ctype="select" label="业务条线" :rules="bizLine" prop="bizLine" data-code="STD_PLA_BIZ_LINE" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="参数代码" :rules="paramsCode" prop="paramsCode"  data-code="STD_PARAMS_CODE" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="操作符号" :rules="oprSymbol" prop="oprSymbol" data-code="STD_OPR_SYMBOL" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="参数值" :rules="paramValue" prop="paramValue"  :disabled="viewType == 'DETAIL'"></yu-xtable-column>
      </yu-xtable>
      <div style="height:30px"></div>
      <yu-xform v-model="baseTable" label-width="150px" ref="refBaseTable">
        <yu-xform-group :column="2">
          <yu-xform-item  label="登记人"   name="inputId"   disabled ></yu-xform-item>
          <yu-xform-item  label="登记机构" name="inputBrId" disabled ></yu-xform-item>
          <yu-xform-item  label="登记日期" name="inputDate" disabled ></yu-xform-item>
          <yu-xform-item  label="规则状态" name="ruleStatus"  ctype="select" data-code="STD_RULE_STATUS" rules="required" :disabled="viewType == 'DETAIL'"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div style="text-align:center">
         <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="doSave">保存</yu-button>
         <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
    </yu-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
// 注册字典项
yufp.lookup.reg('STD_ASSET_TYPE,STD_TASK_FREQ,STD_BCM_TYPE,STD_PLA_BIZ_LINE,STD_PARAMS_CODE,STD_OPR_SYMBOL,STD_RULE_STATUS');

export default {
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {condition: JSON.stringify({ ruleId: this.$route.meta.params.ruleId})},
      dataUrl: backend.cmisNpam + '/api/cfgplabcmparam/queryByRuleId',
      bizLine:[
        { required: true, message: '必填', trigger: 'blur' }
      ],
      paramsCode:[
        { required: true, message: '必填', trigger: 'blur' }
      ],
      oprSymbol:[
        { required: true, message: '必填', trigger: 'blur' }
      ],
      paramValue:[ 
        { required: true, message: '必填', trigger: 'blur' }
      ],
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {}
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  mounted () {
    this.afterInit();
  },

  methods: {
    /*
    页面初始化
     */
    afterInit () {
      var _this = this;
      var ruleId = _this.$route.meta.params.ruleId;
      this.viewType = _this.$route.meta.params.viewType;
      if (this.viewType !== 'ADD') {
        // 修改或查看进来时，页面回显
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/cfgplabcmrule/showByRuleId/' + ruleId,
          callback: function (code, message, response) {
            _this.searchFormdata.ruleId = response.data.ruleId;
            _this.searchFormdata.ruleName = response.data.ruleName;
            _this.searchFormdata.assetType = response.data.assetType;
            _this.searchFormdata.taskFreq = response.data.taskFreq;
            _this.searchFormdata.bcmType = response.data.bcmType;
            _this.searchFormdata.finishDay = response.data.finishDay;
            _this.searchFormdata.bcmTemplate = response.data.bcmTemplate;
            _this.baseTable.inputId = response.data.inputId;
            _this.baseTable.inputBrId = response.data.inputBrId;
            _this.baseTable.inputDate = response.data.inputDate;
            _this.baseTable.ruleStatus = response.data.ruleStatus;
          }
        });
      } else {
        // 新增时,页面登记人，登记机构，登记日期
        _this.searchFormdata['ruleId'] = ruleId;
        _this.baseTable['inputId'] = _this.userName;
        _this.baseTable['inputBrId'] = _this.orgName;
        _this.baseTable['inputDate'] = _this.formatTime();
        _this.baseTable['ruleStatus'] = '01';
      }
    },

    /*
    添加
     */
     addFn: function () {
      var flag = false
      this.$refs.refTable.validate(function (fields) {
        if(!fields){
          flag = true;
        }
      });
      if (flag) {
        let serno = this.$xutils.getUUID();
        let row = {serno: serno, bizLine: '', paramsCode: '', oprSymbol: '', paramValue: '', actPdoAmt: '', actPdoFinshDate: '', pdoActCaseMemo: ''};
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      }
    },
    /*
    删除
     */
    deleteFn () {
      var selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      const ruleId = selections[0].ruleId;
      if (!ruleId) {
        this.$refs.refTable.tabledata.splice(this.$refs.refTable.tabledata.indexOf(selections[0]), 1);
      } else {
        const url = this.$backend.cmisNpam + '/api/cfgplabcmparam/deleteByRuleId/' + ruleId;
        this.$xutils.request({
        // 同步请求
          async: true,
          url: url,
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code == 0) {
              this.$xutils.showMsgBox('提示', '删除成功！');
              this.$refs.refTable.tabledata.splice(selections, 1);
            }
          },
          error: (result, status, errorThrown) => {
            this.$xutils.showMsgBox('提示', '操作失败！'); // 弹出提示
          }
        }, this);
      }
    },
    /* 保存按钮 */
    doSave () {
      var _this = this;
      var flag = false;
      _this.$refs.refTable.validate(function (fields) {
        if(!fields){
          flag = true;
        }
      });
      if(!flag) {
       return _this.$message.error('请填写完必填项');
      }
      var modal = {};
      yufp.clone(_this.searchFormdata, modal);
      yufp.clone(_this.baseTable, modal);
      modal.cfgPlaBcmParam = this.$refs.refTable.tabledata;
      _this.$refs.refForm.validate(volid => {
        // 催收参数校验
        if (volid) {
          _this.$refs.refBaseTable.validate(volid => {
            // 规则状态校验
            if (volid) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisNpam + '/api/cfgplabcmrule/save',
                data: modal,
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    _this.$message.success('操作成功');
                  } else {
                    _this.$message.error(response.message);
                  }
                }
              });
            }
          });
        }
      });
    },
    /*
     返回上级页面
     */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    }
  }
};
</script>
