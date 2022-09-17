<template>
  <div class="ctrCvrgContList_d1_1_BillList">
    <yu-panel title="待签合同" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" data-code="STD_CONT_TYPE" placeholder="合同类型" name="contType"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus" exclude-key="200,600,500,800,700"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-toolbar>
        <yu-button ref="btn_onPrint" @click="customClick('onPrint')" type="primary" v-if="checkCtrl('print')">打印</yu-button>
        <yu-button ref="btn_onSign" @click="customClick('onSign')" type="primary" v-if="checkCtrl('sign')">签订</yu-button>
        <yu-button ref="btn_onView" @click="customClick('onView')" type="primary" v-if="checkCtrl('view')">查看</yu-button>
        <yu-button ref="btn_onLogout" @click="customClick('onLogout')" type="primary" v-if="checkCtrl('logout')">注销</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl"
        :default-load="true" request-type="POST">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="保证金比例" prop="bailPerc"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
yufp.lookup.reg("STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_CONT_STATUS,STD_ZB_GUAR_WAY");
export default {
  name: "D11BillList",
  mixins: [mixinList],
  data: function () {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisBiz + "/api/ctrcvrgcont/tosignlist",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/ctrcvrgcont/delete/",
    };
  },
  methods: {
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var _this = this;
      //查询客户大类
      yufp.service.request({
        method: "POST",
        url: _this.$backend.cmisCus + "/api/cusbase/cusBaseInfo",
        data: data.cusId,
        callback: function (code, message, response) {
          if (code == 0) {
            let json = {};
            let title = "";
            let name = "";
            let key = "";
            json["cusId"] = data.cusId;
            if (response.data.cusCatalog == "1") {
              json["op"] = "VIEW";
              title = "个人客户查看";
              name = "zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv";
              // 个人正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            } else if (response.data.cusCatalog == "2") {
              json["viewType"] = "VIEW";
              title = "对公客户查看";
              name = "zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05";
              // 对公正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            }
            _this.$router.addTab({
              // 路由名称
              name: name,
              // 自定义唯一页签key,请统一使用custom_前缀开头
              key: key,
              // 页签名称
              title: title,
              // 传递的业务数据，可选配置
              data: json,
            });
          } else {
            _this.$message({
              duration: 4000,
              message: "系统错误，请联系管理员！",
              type: "warning",
            });
            return;
          }
        },
      });
    },
  },
};
</script>
<style scoped>
.ctrCvrgContList_d1_1_BillList .yu-buttons {
  margin-bottom: 10px;
}
</style>