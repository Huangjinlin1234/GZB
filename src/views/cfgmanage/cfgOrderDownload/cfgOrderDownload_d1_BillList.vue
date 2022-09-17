<template>
  <div>
    <yu-panel title="预约下载配置表" panel-type="mormal">
      <yu-xform
        ref="refForm"
        form-type="search"
        v-model="searchFormdata"
        label-width="120px"
        :custom-search-fn="customSearch"
      >
        <yu-xform-group :column="4">
          <yu-xform-item
            label="预约流水号"
            ctype="input"
            placeholder="预约流水号"
            name="pkId"
          ></yu-xform-item>
          <yu-xform-item
            label="预约时间cron"
            ctype="input"
            placeholder="预约时间cron"
            name="cronTime"
          ></yu-xform-item>
          <yu-xform-item
            label="数据源"
            ctype="select"
            data-code="STD_ORDER_SOURCE"
            placeholder="数据源"
            name="dataSource"
          ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addOrder" @click="customClick('addOrder')"
            >新增</yu-button
          >
          <yu-button ref="btn_updateOrder" @click="customClick('updateOrder')"
            >修改</yu-button
          >
          <yu-button ref="btn_deleteOrder" @click="customClick('deleteOrder')"
            >删除</yu-button
          >
          <yu-button ref="btn_viewOrder" @click="customClick('viewOrder')"
            >查看</yu-button
          >
          <yu-button ref="btn_ordertest" @click="customClick('ordertest')"
            >启动预约</yu-button
          >
          <yu-button ref="btn_orderstop" @click="customClick('orderstop')"
            >终止预约</yu-button
          >
          <yu-button ref="btn_showList" @click="customClick('showList')"
            >预约下载文件列表</yu-button
          >
        </yu-button-drop>
      </template>
      <yu-xtable
        ref="refTable"
        row-number
        condition-key="condition"
        selection-type="radio"
        @row-click="onRowClick"
        @row-dblclick="onRowDBClick"
        @cell-click="onCellClick"
        :pageable="true"
        :data-url="dataUrl"
        :default-load="true"
      >
        <yu-xtable-column label="预约流水号" prop="pkId"></yu-xtable-column>
        <yu-xtable-column
          label="预约时间cron"
          prop="cronTime"
        ></yu-xtable-column>
        <yu-xtable-column label="预约次数" prop="orderNum"></yu-xtable-column>
        <yu-xtable-column
          label="下载内容类型"
          prop="exportSourType"
          data-code="STD_ORDER_TYPE"
        ></yu-xtable-column>
        <yu-xtable-column
          label="下载内容"
          prop="downloadAction"
        ></yu-xtable-column>
        <yu-xtable-column
          label="灵活查询过滤条件"
          prop="queryCons"
        ></yu-xtable-column>
        <yu-xtable-column
          label="数据源"
          prop="dataSource"
          data-code="STD_ORDER_SOURCE"
        ></yu-xtable-column>
        <yu-xtable-column label="文件名" prop="fileName"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="orgName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="updId"></yu-xtable-column>
        <yu-xtable-column
          label="最后修改机构"
          prop="updBrId"
        ></yu-xtable-column>
        <yu-xtable-column
          label="最后修改日期"
          prop="updDate"
        ></yu-xtable-column>
        <yu-xtable-column
          label="状态"
          prop="status"
          data-code="STD_ORDER_STATUS"
        ></yu-xtable-column>
        <yu-xtable-column
          label="禁止修改字段"
          prop="rowCfgId"
        ></yu-xtable-column>
        <yu-xtable-column
          label="水印内容"
          prop="waterContent"
          data-code="STD_ORDER_WATER"
        ></yu-xtable-column>
        <yu-xtable-column
          label="水印字体大小"
          prop="waterFontSize"
        ></yu-xtable-column>
        <yu-xtable-column label="水印文字" prop="waterWords"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function () {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgorderdownload/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgorderdownload/delete/",
    };
  },
  methods: {
    remoteBillListData() {
      // 刷新页面
      this.$refs.refTable.remoteData();
    },
  },
};
</script>