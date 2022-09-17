/**
 * @Created by  jijian on 2021/6/21
 * @updated by
 * @description 人行征信档案归档
 */
<template>
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="riskTaskTable" ref="searchForm" v-model="searchFormdata" form-type="search" label-width="80px">
          <yu-xform-group :column="3">
            <yu-xform-item label="主借款人名称" fuzzy-query="both" placeholder="模糊查询" name="borrowerCusName" ></yu-xform-item>
            <yu-xform-item label="征信查询对象名称" fuzzy-query="both" placeholder="模糊查询" name="cusName" ></yu-xform-item>
            <yu-xform-item label="查询机构" name="qryOrg" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'qryOrg':'qryOrg','qryOrgName':'qryOrgName'}"  label-width="80px"></yu-xform-item>
            <yu-xform-item label="主借款人证件号码" placeholder="" name="borrowerCertCode" ></yu-xform-item>
            <yu-xform-item label="查询对象证件号码" placeholder="模糊查询" name="certCode" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="征信档案状态" placeholder="" name="docStauts" ctype="select" data-code="STD_CREDIT_DOC_STAUTS" ></yu-xform-item>
            <yu-xform-item label="生成日期 起"  name="createStartDate"   :colspan="4" label-width="80px" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="止" name="createEndDate"   :colspan="4" ctype="datepicker" label-width="20px"></yu-xform-item>
            <yu-xform-item label="授权书日期 起"  name="authbookStartDate"   :colspan="4" label-width="80px" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="止" name="authbookEndDate"   :colspan="4" ctype="datepicker" label-width="20px"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="人行征信档案归档列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop>
        <yu-button type="primary" style="float:left;margin-left:10px" @click="infoFn" v-if="checkCtrl('infoFn')">查看</yu-button>
        <yu-button type="primary" style="float:left;margin-left:10px" @click="receiveFn" v-if="checkCtrl('receiveFn')">接收</yu-button>
        <yu-button type="primary" style="float:left;margin-left:10px" @click="checkFn" v-if="checkCtrl('checkFn')">核对</yu-button>
        <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="riskTaskTable" condition-key="condition" style="margin-top:10px" :base-params="searchData" row-number :data-url="listUrl" selection-type="checkbox" requestType="POST">
        <yu-xtable-column align="center" label="档案流水号" prop="dcaiSerno" width="180"></yu-xtable-column>
        <yu-xtable-column align="center" label="关联业务流水号" prop="bizSerno" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="主借款人名称" prop="borrowerCusName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="主借款人证件号码" prop="borrowerCertCode" width="140"></yu-xtable-column>
        <yu-xtable-column align="center" label="征信查询对象名称" prop="cusName" width="140"></yu-xtable-column>
        <yu-xtable-column align="center" label="查询对象证件号码" prop="certCode" width="140"></yu-xtable-column>
        <yu-xtable-column align="center" label="授权书日期" prop="authbookDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="查询人" prop="qryUserName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="查询机构" prop="qryOrgName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="生成日期" prop="createDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="接收人" prop="receiverIdName" width="100" :formatter="Formatter"></yu-xtable-column>
        <yu-xtable-column align="center" label="接收日期" prop="receiverDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="核对人" prop="checkIdName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="核对日期" prop="checkDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="征信档案状态" prop="docStauts" data-code="STD_CREDIT_DOC_STAUTS" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
yufp.lookup.reg('STD_CREDIT_DOC_STAUTS');
export default {
  mixins: [mixin],
  components: { YufpExcelExport },
  data: function () {
    return {
      listUrl: this.$backend.cmisBiz + '/api/doccreditarchiveinfo/selectByCondition',
      viewType: 'DETAIL',
      searchFormdata: {},
      searchData: {sort: 'inputDate desc'},
      excelExportUrl: this.$backend.cmisBiz + '/api/doccreditarchiveinfo/export'
    };
  },
  methods: {

    /**
     *接收人格式化
     */
    Formatter: function (row, column) {
      if (row.receiverId == null || row.receiverId == 'null') { return '' } else {
        return row.receiverIdName;
      }
    },
    // // 条件查询
    // searchFn: function () {
    //   this.$refs.riskTaskTable.remoteData({
    //     condition: JSON.stringify(this.searchFormdata)
    //   });
    // },

    // // 重置
    // resetFn: function () {
    //   // 清空条件
    //   this.$refs.searchForm.resetFields();
    // },

    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item == 'qryOrg') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          } else {
            this.searchFormdata[mapping[item]] = data.orgName;
          }
        }
      }
    },

    /** 查看 **/
    infoFn () {
      let selections = this.$refs.riskTaskTable.selections;
      if (selections.length !== 1) {
        this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      var model = {};
      var qryCls = '';
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/doccreditarchiveinfo/queryQryCls',
        data: selections[0].bizSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data != undefined) {
              yufp.clone(response.data, model);
              qryCls = response.data.qryCls;
              model.view = true;
            }
          }
        }
      });
      let url = '';
      if (qryCls == '0') {
        url = 'creditmanage/creditRH/creditReportQryRecordListRHGRViewIndex';// 查看（人行个人征信查询）
      } else if (qryCls == '1') {
        url = 'creditmanage/creditRH/creditReportQryRecordListRHQYViewIndex';// 查看（人行企业征信查询）
      } else {
        this.$message({
          message: '关联的人行征信查询流水信息不存在',
          type: 'warning'
        });
        return;
      }
      this.$dialog.open(
        '查看（人行征信查询）',
        url,
        1080,
        800,
        model,
        () => {}
      );
    },
    /** 接收 **/
    receiveFn () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      for (let i = 0; i < selections.length; i++) {
        if (selections[i].docStauts !== '01') {
          _this.$message.warning('流水号为[' + selections[i].dcaiSerno + ']的档案状态不为"待接收"，请重新选择！');
          return;
        }
      }
      _this.$confirm('是否确认已接收档案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/doccreditarchiveinfo/updateByReceive',
              data: JSON.stringify(selections),
              callback: function (code, message, response) {
                if (response.data.rtnCode == '000000') {
                  _this.$refs.riskTaskTable.remoteData();
                  _this.$message.success(response.data.rtnMsg);
                } else {
                  _this.$message.error(response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    },
    /** 核对 **/
    checkFn () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      for (let i = 0; i < selections.length; i++) {
        if (selections[i].docStauts !== '02') {
          _this.$message.warning('流水号为[' + selections[i].dcaiSerno + ']的档案状态不为"接收待核对"，请重新选择！');
          return;
        }
      }
      _this.$confirm('是否确认已核对档案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/doccreditarchiveinfo/updateByCheck',
              data: JSON.stringify(selections),
              callback: function (code, message, response) {
                if (response.data.rtnCode == '000000') {
                  _this.$refs.riskTaskTable.remoteData();
                  _this.$message.success(response.data.rtnMsg);
                } else {
                  _this.$message.error(response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
