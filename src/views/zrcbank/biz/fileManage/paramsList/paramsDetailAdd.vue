
<template>
  <div>
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform v-model="searchFormdata"  label-width="170px" ref="refForm">
          <yu-xform-group :column="2">
            <yu-xform-item rules="required" label="业务流水号" name="cdplSerno" ctype="input" disabled></yu-xform-item>
            <yu-xform-item rules="required" label="档案分类" ctype="select" name="docClass" :disabled="viewType == 'DETAIL'"  @change="dlass" :options="dicOptions.TypeOptions" ></yu-xform-item>
            <yu-xform-item rules="required" label="档案类型" name="docType" :disabled="viewType == 'DETAIL'" ctype="select"  @change="docss" :options="dicOptions.docTypeOptions"></yu-xform-item>
            <yu-xform-item  label="登录人"   name="inputId" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'inputId':'inputId','execIdName':'execIdName'}"></yu-xform-item>
            <yu-xform-item  label="登录机构" name="inputBrId" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'inputBrId':'inputBrId','execBrIdName':'execBrIdName'}"></yu-xform-item>
            <yu-xform-item  label="登记日期" name="inputDate" ctype="input" disabled ></yu-xform-item>
            <yu-xform-item rules="required" label="是否启用" name="isBegin" ctype="select" :disabled="viewType == 'DETAIL'" data-code="STD_ZB_YES_NO"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>

    <yu-panel title="档案资料清单" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <template slot="right">
        <div>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="addFn">添加</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="deleteFn">删除</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="checkbox" :base-params="baseParams">
        <yu-xtable-column align="center" ctype="input" label="清单流水号" prop="cdpdSerno" width="300" :disabled="viewType == 'DETAIL'" v-if="false"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="材料类别" prop="docTypeData" width="300" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="材料清单" prop="docListData" width="300" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="radio" label="是否必须原件" width="150" data-code="STD_ZB_YES_NO" prop="isSourceFlag" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="备注" prop="memo" width="300" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="一级影像目录编号" prop="topOutsystemCode" width="200" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="二级影像目录编号" prop="secOutsystemCode" width="200" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="文件影像目录编号" prop="fileOutsystemCode" width="200" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
      </yu-xtable>
      <div style="height:30px"></div>
      <div style="text-align:center">
         <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="doSave">保存</yu-button>
         <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
    </yu-panel>

  </div>
</template>

<script>
import mixinList from '@/utils/mixins/mixin-list';
import { dateFormat } from '@/utils';
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO,STD_DOC_TYPE,STD_DOC_CLASS');
export default {
  mixins: [mixinList],
  data: function () {
    return {
      searchFormdata: {},
      viewType: 'ADD',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {},
      dicOptions: {docTypeOptions: [{key: '01', value: '个人客户资料'}, {key: '02', value: '对公客户资料'}, {key: '03', value: '个人授信资料'}, {key: '04', value: '企业授信资料'}, {key: '05', value: '对公及个人经营性贷款'}, {key: '06', value: '委托贷款'}, {key: '07', value: '特殊担保协议'}, {key: '08', value: '票据池业务'}, {key: '09', value: '贴现协议/贴现额度协议'}, {key: '10', value: '合作方协议'}, {key: '11', value: '委托贷款展期'}, {key: '12', value: '贷款展期'}, {key: '13', value: '保函'}, {key: '14', value: '承兑业务'}, {key: '15', value: '国际业务'}, {key: '16', value: '白领易贷通业务'}, {key: '17', value: '零售消费类业务'}, {key: '18', value: '公积金'}, {key: '19', value: '省心快贷合同'}, {key: '20', value: '信用卡'}, {key: '21', value: '小微贷款展期'}, {key: '22', value: '小微贷款业务'}, {key: '23', value: '业务变更-展期业务'}, {key: '24', value: '业务变更-担保变更'}, {key: '25', value: '业务变更-利率变更'}, {key: '26', value: '业务变更-还款计划变更'}, {key: '27', value: '业务变更-延期还款'}],
        TypeOptions: [{key: '01', value: '基础资料档案'}, {key: '02', value: '授信资料档案'}, {key: '03', value: '重要信息档案'}]}
    };
  },
  mounted () {
    this.afterInit();
  },

  methods: {

    dlass: function () {
      if (this.searchFormdata.docClass == '01') {
        this.dicOptions.docTypeOptions = [{key: '01', value: '个人客户资料'}, {key: '02', value: '对公客户资料'}];
      } else if (this.searchFormdata.docClass == '02') {
        this.dicOptions.docTypeOptions = [{key: '03', value: '个人授信资料'}, {key: '04', value: '企业授信资料'}];
      } else if (this.searchFormdata.docClass == '03') {
        this.dicOptions.docTypeOptions = [{key: '05', value: '对公及个人经营性贷款'}, {key: '06', value: '委托贷款'}, {key: '07', value: '特殊担保协议'}, {key: '08', value: '票据池业务'}, {key: '09', value: '贴现协议/贴现额度协议'}, {key: '10', value: '合作方协议'}, {key: '11', value: '委托贷款展期'}, {key: '12', value: '贷款展期'}, {key: '13', value: '保函'}, {key: '14', value: '承兑业务'}, {key: '15', value: '国际业务'}, {key: '16', value: '白领易贷通业务'}, {key: '17', value: '零售消费类业务'}, {key: '18', value: '公积金'}, {key: '19', value: '省心快贷合同'}, {key: '20', value: '信用卡'}, {key: '21', value: '小微贷款展期'}, {key: '22', value: '小微贷款业务'}, {key: '23', value: '业务变更-展期业务'}, {key: '24', value: '业务变更-担保变更'}, {key: '25', value: '业务变更-利率变更'}, {key: '26', value: '业务变更-还款计划变更'}, {key: '27', value: '业务变更-延期还款'}];
      } else if (!this.searchFormdata.docClass) {
        this.dicOptions.docTypeOptions = [{key: '01', value: '个人客户资料'}, {key: '02', value: '对公客户资料'}, {key: '03', value: '个人授信资料'}, {key: '04', value: '企业授信资料'}, {key: '05', value: '对公及个人经营性贷款'}, {key: '06', value: '委托贷款'}, {key: '07', value: '特殊担保协议'}, {key: '08', value: '票据池业务'}, {key: '09', value: '贴现协议/贴现额度协议'}, {key: '10', value: '合作方协议'}, {key: '11', value: '委托贷款展期'}, {key: '12', value: '贷款展期'}, {key: '13', value: '保函'}, {key: '14', value: '承兑业务'}, {key: '15', value: '国际业务'}, {key: '16', value: '白领易贷通业务'}, {key: '17', value: '零售消费类业务'}, {key: '18', value: '公积金'}, {key: '19', value: '省心快贷合同'}, {key: '20', value: '信用卡'}, {key: '21', value: '小微贷款展期'}, {key: '22', value: '小微贷款业务'}, {key: '23', value: '业务变更-展期业务'}, {key: '24', value: '业务变更-担保变更'}, {key: '25', value: '业务变更-利率变更'}, {key: '26', value: '业务变更-还款计划变更'}, {key: '27', value: '业务变更-延期还款'}];
      }
    },

    docss: function () {
      if (this.searchFormdata.docType !== '01' && this.searchFormdata.docType !== '02' && this.searchFormdata.docType !== '03' && this.searchFormdata.docType !== '04' && this.searchFormdata.docType) {
        this.searchFormdata.docClass = '03';
        this.dicOptions.TypeOptions = [{key: '03', value: '重要信息档案'}];
      } else if (this.searchFormdata.docType == '01' || this.searchFormdata.docType == '02') {
        this.searchFormdata.docClass = '01';
        this.dicOptions.TypeOptions = [{key: '01', value: '基础资料档案'}];
      } else if (this.searchFormdata.docType == '03' || this.searchFormdata.docType == '04') {
        this.searchFormdata.docClass = '02';
        this.dicOptions.TypeOptions = [{key: '02', value: '授信资料档案'}];
      } else if (!this.searchFormdata.docType) {
        this.dicOptions.TypeOptions = [{key: '01', value: '基础资料档案'}, {key: '02', value: '授信资料档案'}, {key: '03', value: '重要信息档案'}];
      }
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'inputId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'inputBrId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'inputId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'inputBrId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    /*
    页面初始化
     */
    afterInit () {
      var _this = this;
      this.viewType = _this.$route.meta.params.viewType;
      _this.searchFormdata['cdplSerno'] = _this.$xutils.getSEQWithParamFromServer('DOC_SERNO'); ;
      _this.searchFormdata['inputDate'] = _this.formatTime();
    },
    /*
    添加
     */
    addFn () {
      this.$refs.refTable.clearValidateMessage();
      this.pushRefTableRow();
    },
    // 添加数据 添加一条空白数据
    pushRefTableRow: function () {
      let isRefTableValidateOk = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTableValidateOk = true;
        }
      });
      if (isRefTableValidateOk) {
        let cdpdSerno = this.$xutils.getUUID();
        let row = {cdpdSerno: cdpdSerno, docListData: '', isSourceFlag: '', memo: ''};
        // this.currentDrawTableRow.push(row);
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      }
    },
    /*
    删除
     */
    deleteFn (row) {
      var _this = this;
      var selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: _this.$t('notice.qxxzjl'),
          type: 'warning'
        });
        return;
      }
      for (let i = 0; i < selections.length; i++) {
        this.$refs.refTable.tabledata.splice(this.$refs.refTable.tabledata.indexOf(selections[i]), 1);
      }
      this.$refs.refTable.clearSelection();
    },
    /* 新增保存 */
    doSave () {
      var _this = this;
      // var back = _this.$route.meta.params.back;
      _this.$refs.refForm.validate(volid => {
        // 参数校验
        if (volid) {
          let modal = {};
          yufp.clone(_this.searchFormdata, modal);
          modal.cfgDocParamsDetail = this.$refs.refTable.tabledata;
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/cfgdocparamslist/saveCfgDocParamsLists',
            data: modal,
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$message.success('操作成功');
                yufp.router.removeTab(_this.$route.path);
                // back();
              } else {
                _this.$message.error(response.message);
              }
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
