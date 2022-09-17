
<template>
  <!--
    @created by lixm 2021-06-03
    @description 人民币利率定价申请历史
  -->
  <div>
    <yu-panel panel-type="simple" title="输入查询条件">
      <yu-xform related-table-name="otherCnyRateAppHisTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both" clearable></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号 " name="cusId" ctype="input" clearable></yu-xform-item>
          <yu-xform-item label="审批表编号" placeholder="审批表编号 " name="serno" ctype="input" clearable></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
    <yu-panel panel-type="simple" title="人民币利率定价申请历史列表">
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="infoFn">查看</yu-button>
        <yu-button type="primary" v-if="checkCtrl('export')" @click="outputHis">打印报表</yu-button>
      </yu-button-drop>
      <yu-xtable ref="otherCnyRateAppHisTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="审批表编号 " prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" :formatter="auditSatusFormatter"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS');
export default {
  name: 'OtherCnyRateAppHis',
  components: {},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/othercnyrateapp/getothercnyrateapphis'
    };
  },
  methods: {
    auditSatusFormatter: function (row, column, cellValue) {
      const statusArr = lookup.find('STD_ZB_APPR_STATUS');
      const obj = statusArr.find((item, index) => {
        return item.key === cellValue;
      });
      return obj ? obj.value : '';
    },
    infoFn () {
      var _this = this;
      if (_this.$refs.otherCnyRateAppHisTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherCnyRateAppHisTable.selections[0];
      var url = 'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/OtherCnyRateAppInfo';
      let date = _this.$xutils.dateFormat('yyyyMMddhhmmssSSS', new Date());
      this.$router.addTab({
        // 路由名称
        name: url, // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_OtherCnyRateAppInfo_View_' + date, // 必传
        // 页签名称
        title: '人民币利率定价申请详情',
        // 传递的业务数据，可选配置
        data: {
          name: _this.$route.name,
          op: 'VIEW',
          data: selection
        },
        afterTabClose: () => {
          // this.$refs.otherCnyRateAppTable.remoteData();
        }
      });
    },
    /**
     * 导出
     */
    outputHis () {
      var _this = this;
      var rowData = _this.$refs.otherCnyRateAppHisTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      rowData.src = _this.$backend.frptRptService + 'qtsx-rmblldj.cpt&serno=' + rowData[0].serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: rowData
      });
    }
  }
};
</script>
