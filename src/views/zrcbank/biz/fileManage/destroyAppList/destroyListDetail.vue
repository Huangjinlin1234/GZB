<template>
  <!--
    @created by wcx
    @updated by  2021-6-17 修改代码规范
    @updated by  2021-6-17 更新组件内容及标签
    @description 模板示例——档案销毁新增基本信息
  -->
  <div>
        <yu-panel title=" 档案销毁新增明细信息" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable"  v-model="formdata" label-width="90px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号"  name="ddalSerno" disabled></yu-xform-item>
                 <yu-xform-item label="销毁户数"  name="destroyCus" disabled></yu-xform-item>
                 <yu-xform-item label="销毁类型" ctype="select" name="destroyType"  data-code="STD_DESTROY_TYPE" rules="required" disabled></yu-xform-item>
                 <yu-xform-item label="登记人"  name="inputIdName" disabled></yu-xform-item>
                 <yu-xform-item label="登记机构"  name="inputBrIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记日期"  name="inputDate" disabled></yu-xform-item>
                <yu-xform-item placeholder="销毁日期" ctype="datepicker" name="inputDate"  label="销毁日期" value-format="yyyy-MM-dd" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="档案销毁明细信息" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseBussParams"  selection-type="radio" requestType="POST">
            <yu-xtable-column align="center" label="档案流水号" prop="docSerno" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="销毁明细流水号" prop="dddlSerno" v-if="false" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案编号" prop="docNo" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="归档模式" prop="archiveMode" data-code="STD_ARCHIVE_MODE" width="100"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案分类" prop="docClass" data-code="STD_DOC_CLASS" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案类型" prop="docType" data-code="STD_DOC_TYPE" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="200"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="200"></yu-xtable-column>
            <yu-xtable-column align="center" label="关联业务编号" prop="bizSerno" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="资料总页数" prop="docNum"  width="100" :formatter="Formatter2"></yu-xtable-column>
            <yu-xtable-column align="center" label="生成日期" prop="createDate" width="150" ></yu-xtable-column>
            <yu-xtable-column align="center" label="所属机构" prop="belgOrgName" width="150" :formatter="Formatter1"></yu-xtable-column>
            <yu-xtable-column align="center" label="已保管年限" prop="inKeepYears" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="销毁日期" prop="destroyDate" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS" width="80"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    <div style="text-align: center;">
          <yu-button-drop>
            <yu-button type="primary" @click="doBack">返回</yu-button>
          </yu-button-drop>
        </div>
  </div>

</template>

<script>
import { dateFormat } from '@/utils';
// // 注册字典项
yufp.lookup.reg('STD_DOC_CLASS,STD_DOC_TYPE,STD_DOC_STAUTS,STD_ARCHIVE_MODE,STD_DESTROY_TYPE');
export default {
  data: function () {
    return {

      viewType: '', // 此处应为空
      dataUrl: backend.cmisBiz + '/api/docDestroyDetailList/query/pageList',
      // baseParams: {condition: JSON.stringify({ ddalSerno: this.$route.meta.params.ddalSerno})},
      baseBussParams: {condition: JSON.stringify({ ddalSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.ddalSerno}) },
      formdata: {},
      ddalSerno: ''
    };
  },

  props: {
    bizPageData: Object
  },
  // 监听路由,刷新页面
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  created () {
    this.afterInit();
  },

  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        _this.ddalSerno = _this.bizPageData.instanceInfo.bizId;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/docDestroyAppList/showDocDestroyApp',
          data: _this.ddalSerno,
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.formdata);
            }
          }
        });
      } else {
        //   _this.dataUrl = _this.$router.meta.params.dataUrl;
        // _this.formdata['ddalSerno'] = _this.$route.meta.params.ddalSerno;
        // _this.formdata['inputId'] = _this.$route.meta.params.inputId;
        // _this.formdata['inputBrId'] = _this.$route.meta.params.inputBrId;
        // _this.formdata['inputDate'] = _this.$route.meta.params.inputDate;
        // _this.formdata['destroyCus'] = _this.$route.meta.params.destroyCus;
        _this.ddalSerno = _this.$route.meta.params.ddalSerno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/docDestroyAppList/showDocDestroyApp',
          data: _this.ddalSerno,
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.formdata);
            }
          }
        });
      }
    },

    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    },

    /**
     *接收时间格式化
     */
    Formatter: function (row, column) {
      var timeDt = new Date(row.createTime);
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    /**
     *接收机构式化
     */
    Formatter1: function (row, column) {
      if (row.belgOrgName == 'null') {
        row.belgOrgName = '';
      }
      return row.belgOrgName;
    },

    /**
     *接收资料页数式化
     */
    Formatter2: function (row, column) {
      if (row.docNum == 'null') {
        row.docNum = 0;
      }
      return row.docNum;
    },

    /**
     * 返回
     */
    doBack: function () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;

      var DocDestroyAppList = _this.formdata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docDestroyAppList/save',
        data: DocDestroyAppList,
        callback: function (code, message, response) {
          if (response.code == 0) {
            yufp.clone(response.data, _this.formdata);
            _this.$message('操作成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    }

  }
};
</script>
