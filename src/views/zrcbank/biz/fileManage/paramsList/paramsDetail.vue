
<template>
  <div>
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform v-model="searchFormdata"  label-width="170px" ref="refForm">
          <yu-xform-group :column="2">
            <yu-xform-item rules="required" label="业务流水号" name="cdplSerno" ctype="input" disabled></yu-xform-item>
            <yu-xform-item rules="required" label="档案分类" ctype="select" name="docClass" :disabled="viewType == 'DETAIL'" data-code="STD_DOC_CLASS"></yu-xform-item>
            <yu-xform-item rules="required" label="档案类型" name="docType" :disabled="viewType == 'DETAIL'" ctype="select" data-code="STD_DOC_TYPE"></yu-xform-item>
            <yu-xform-item  label="登记人"   name="inputIdName" ctype="input"   disabled ></yu-xform-item>
            <yu-xform-item  label="登记机构" name="inputBrIdName" ctype="input" disabled ></yu-xform-item>
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
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="checkbox" :base-params="baseParams" :span-method="arraySpanMethod">
        <yu-xtable-column align="center" ctype="input" label="材料类别" prop="docTypeData"   :disabled="viewType == 'DETAIL'" width="300"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="材料清单" prop="docListData" :disabled="viewType == 'DETAIL'" width="300"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="radio" label="是否必须原件" data-code="STD_ZB_YES_NO" prop="isSourceFlag" width="150" :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="备注" prop="memo" :disabled="viewType == 'DETAIL'" width="300"></yu-xtable-column>
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
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
// 注册字典项
yufp.lookup.reg('STD_ZB_YES_NO，STD_DOC_TYPE，STD_DOC_CLASS');
export default {
  data: function () {
    return {
      searchFormdata: {},
      // baseParams: {condition: JSON.stringify({ cdpdSerno: this.$route.meta.params.cdpdSerno})},
      baseParams: {condition: { cdplSerno: this.$route.meta.params.cdplSerno}},
      dataUrl: backend.cmisBiz + '/api/cfgdocparamsdetail/selectConditonByCdplSernoSecond',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {},
      data: ''
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
      //

    })
  },
  mounted () {
    this.afterInit();
  },

  methods: {
    // 合并单元格
    arraySpanMethod: function (obj) {
      if (obj.columnIndex === 2) {
        if (obj.row.docTypeDataCount !== 0) {
          return {
            rowspan: obj.row.docTypeDataCount,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
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
      // var back = _this.$route.meta.params.back;
      var modal = {};
      yufp.clone(_this.searchFormdata, modal);
      modal.cfgDocParamsDetail = this.$refs.refTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cfgdocparamslist/updateCfgDocParamsLists',
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
