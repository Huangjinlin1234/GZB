
<template>
  <div>
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform v-model="searchFormdata"  label-width="170px" ref="refForm">
          <yu-xform-group :column="2">
            <yu-xform-item rules="required" label="业务流水号" name="cdplSerno" ctype="input" disabled></yu-xform-item>
            <yu-xform-item rules="required" label="档案分类" ctype="select" name="docClass" :disabled="viewType == 'DETAIL'"  data-code="STD_DOC_CLASS"></yu-xform-item>
            <yu-xform-item rules="required" label="档案类型" name="docType" :disabled="viewType == 'DETAIL'" ctype="select"  data-code="STD_DOC_TYPE"></yu-xform-item>
            <yu-xform-item  label="登记人"   name="inputId" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'inputId':'inputId'}"></yu-xform-item>
            <yu-xform-item  label="登记机构" name="inputBrId" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'inputBrId':'inputBrId'}"></yu-xform-item>
            <yu-xform-item  label="登记日期" name="inputDate" ctype="input" disabled ></yu-xform-item>
            <yu-xform-item  label="是否启用" name="isBegin" ctype="select" :disabled="viewType == 'DETAIL'" data-code="STD_ZB_YES_NO"></yu-xform-item>
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
        <yu-xtable-column align="center" ctype="input" label="清单流水号" width="300" prop="cdpdSerno" :disabled="viewType == 'DETAIL'" v-if="false"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="材料类别" width="300" prop="docTypeData" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="材料清单" width="300" prop="docListData" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
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
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO，STD_DOC_TYPE，STD_DOC_CLASS');
export default {
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {condition: { cdplSerno: this.$route.meta.params.cdplSerno}},
      dataUrl: backend.cmisBiz + '/api/cfgdocparamsdetail/selectConditonByCdplSerno',
      viewType: 'EDIT',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {}
    };
  },
  mounted () {
    this.afterInit();
  },

  methods: {
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
      var cdplSerno = _this.$route.meta.params.cdplSerno;
      this.viewType = _this.$route.meta.params.viewType;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cfgdocparamslist/selectByPrimaryKey',
        data: cdplSerno,
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.searchFormdata);
        }
      });
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
      var selections = row.cdpdSerno ? [row] : _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: _this.$t('notice.qxxzjl'),
          type: 'warning'
        });
        return;
      }
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].cdpdSerno);
      }
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cfgdocparamsdetail/deleteByIds',
        data: ids.join(',')
      }).then(({code, message, data}) => {
        if (code === '0') {
          _this.$message({
            message: _this.$t('notice.sccg'),
            type: 'success'
          });
          _this.$refs.refTable.remoteData();
        } else {
          _this.$message({
            message: message || this.$t('notice.scsb'),
            type: 'error'
          });
        }
      });
    },
    /* 修改保存 */
    doSave () {
      var _this = this;
      var modal = {};
      var table = _this.$refs.refTable.tabledata;
      for (let i = 0; i < table.length; i++) {
        table[i].sort = table[i].__vkey + 1;
      }
      yufp.clone(_this.searchFormdata, modal);
      modal.cfgDocParamsDetail = table;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cfgdocparamslist/updateCfgDocParamsLists',
        data: modal,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },

    /*
     返回上级页面
     */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
