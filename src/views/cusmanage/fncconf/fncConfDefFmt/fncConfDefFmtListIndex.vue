<!--报表定义-->
<template>
  <div>
    <yu-panel title="报表配置定义">
      <template slot="filter">
        <yu-xform
          v-model="formdata"
          ref="refBaseForm"
          related-table-name="refTable"
          label-width="110px"
        >
          <yu-xform-group :column="3">
            <yu-xform-item
              label="报表样式编号"
              placeholder="请输入"
              ctype="input"
              name="styleId"
            ></yu-xform-item>
            <yu-xform-item
              label="显示名称"
              placeholder="请输入"
              ctype="input"
              name="fncConfDisName"
            ></yu-xform-item>
            <yu-xform-item
              label=" "
              label-suffix=" "
              ctype="custom"
              name="custom"
              colspan="8"
              class="yu-adjust"
            >
              <yu-button type="primary" @click="search">查询</yu-button>
              <yu-button @click="resetFormFn">重置</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" :data-url="dataUrl">
        <yu-xtable-column label="报表样式编号" prop="styleId" min-width="120">
          <template slot-scope="scope">
            <a class="underline" @click="detailFn(scope.row)">{{
              scope.row.styleId
            }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column
          label="报表名称"
          prop="fncName"
          min-width="100"
        ></yu-xtable-column>
        <yu-xtable-column
          label="显示名称"
          prop="fncConfDisName"
          min-width="150"
        ></yu-xtable-column>
        <yu-xtable-column
          label="所属报表种类"
          prop="fncConfTyp"
          min-width="130"
          data-code="STD_ZB_FNC_CONFTYP"
        ></yu-xtable-column>
        <yu-xtable-column
          label="数据列数"
          prop="fncConfDataCol"
          data-code="STD_ZB_FNC_COL"
        ></yu-xtable-column>
        <yu-xtable-column
          label="栏位"
          prop="fncConfCotes"
          data-code="STD_ZB_FNC_COTES"
        >
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import xymixin from "@/utils/mixin";
yufp.lookup.reg("STD_ZB_FNC_CONFTYP, STD_ZB_FNC_COL, STD_ZB_FNC_COTES");
export default {
  name: "reportConfigDefine",
  mixins: [xymixin],
  data: function () {
    return {
      dataUrl: this.$backend.cmisCfg + "/api/repStylCnf/q/list",
      formdata: {}, // 表单数据
    };
  },
  created: function () {},
  methods: {
    /**
     * 模糊查询
     */
    fuzzyQuery: function (data) {
      var param = {
        condition: JSON.stringify({ allCond: data.value, searchType: "0" }),
      };
      this.$refs.refTable.remoteData(param);
    },
    /**
     * 详情
     */
    detailFn: function (data) {
      console.log(data);
      const route = "cusmanage/fncconf/fncConfDefFmt/detailDefine.vue";
      const path = "/detailDefine";
      this.$router.addRoute(route, "报表配置定义配置", {}, path);
      this.$router.push({
        path: path,
        query: {
          styleId: data.styleId,
          fncConfTyp: data.fncConfTyp,
          fncConfDataCol: data.fncConfDataCol,
          title: data.styleId + "-" + data.fncConfDisName,
          fncConfCotes:data.fncConfCotes
        },
      });
    },
    /**
     * 精确查询
     */
    search: function () {
      this.formdata.searchType = "1";
      const param = { condition: JSON.stringify(this.formdata) };
      this.$refs.refTable.remoteData(param);
    },
    /**
     * 重置所有表单内容
     */
    resetFormFn: function () {
      this.$refs.refBaseForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
