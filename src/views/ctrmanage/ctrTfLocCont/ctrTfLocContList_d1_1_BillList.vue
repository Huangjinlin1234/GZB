<template>
  <div>
    <yu-panel title="待签合同" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" data-code="STD_CONT_TYPE" placeholder="合同类型" name="contType"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-toolbar>
        <yu-button ref="btn_onPrint" type="primary" v-if="checkCtrl('print')" @click="customClick('onPrint')">打印</yu-button>
        <yu-button ref="btn_onSign" type="primary" v-if="checkCtrl('sign')" @click="customClick('onSign')">签订</yu-button>
        <yu-button ref="btn_onView" type="primary" v-if="checkCtrl('view')" @click="customClick('onView')">查看</yu-button>
        <yu-button ref="btn_onLogout" type="primary" v-if="checkCtrl('logout')" @click="customClick('onLogout')">注销</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl"
        :base-params="{ contStatus: '100' }" :default-load="true" request-type="POST">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_STATUS,STD_CONT_TYPE");
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "D11BillList",
  mixins: [mixinList],
  data: function () {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisBiz + "/api/ctrtfloccont/tosignlist",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/ctrtfloccont/delete/",
    };
  },
  mounted: function () {
    // TODO add by liucheng3
    // 过滤申请状态，移除【生效、中止、注销、撤回、作废】数据字典
    // d1_1_BillQuery.setSelectOptions('cont_status', 'hidden', '200,500,600,700,800');
  },

  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === "000" || op.key === "992") {
          return true;
        }
        return false;
      });
    },

    // 表格金额字段处理
    formatNumber: function (format, sort) {
      let _this = this;
      sort = sort === undefined ? 2 : sort;
      return function (r, c, v) {
        var val;
        switch (sort) {
          case 0:
            val = r;
            break;
          case 1:
            val = c;
            break;
          case 2:
            val = v;
            break;
          default:
            // eslint-disable-next-line no-console
            console.log("未找到分类");
            break;
        }

        if (val == undefined) {
          return "";
        }
        if (val != 0 && !parseFloat(val)) {
          return val;
        }
        return _this.number(val, format);
      };
    },
    /**
     * Formats the number according to the format string.
     * examples (123456.789):
     * 0 - (123456) show only digits, no precision<br>
     * 0.00 - (123456.78) show only digits, 2 precision<br>
     * 0.0000 - (123456.7890) show only digits, 4 precision<br>
     * 0,000 - (123,456) show comma and digits, no precision<br>
     * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
     * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
     * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
     * For example: 0.000,00/i
     * @param {Number} v The number to format.
     * @param {String} format The way you would like to format this text.
     * @return {String} The formatted number.
     */
    number: function (v, format) {
      if (!format) {
        return v;
      }
      if (isNaN(v)) {
        return "";
      }
      var comma = ",",
        dec = ".",
        i18n = false,
        neg = v < 0;

      v = Math.abs(v);
      if (format.substr(format.length - 2) == "/i") {
        format = format.substr(0, format.length - 2);
        i18n = true;
        comma = ".";
        dec = ",";
      }

      var hasComma = format.indexOf(comma) != -1,
        psplit = (i18n
          ? format.replace(/[^\d,]/g, "")
          : format.replace(/[^\d.]/g, "")
        ).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error(
          "NumberFormatException: invalid format, formats should have no more than 1 period: " +
            format
        );
      } else {
        v = v.toFixed(0);
      }

      var fnum = v.toString();

      psplit = fnum.split(".");

      if (hasComma) {
        let cnum = psplit[0],
          parr = [],
          j = cnum.length,
          // m = Math.floor(j / 3),
          n = cnum.length % 3 || 3,
          i;

        for (i = 0; i < j; i += n) {
          if (i != 0) {
            n = 3;
          }

          parr[parr.length] = cnum.substr(i, n);
          // m -= 1;
        }
        fnum = parr.join(comma);
        if (psplit[1]) {
          fnum += dec + psplit[1];
        }
      } else {
        if (psplit[1]) {
          fnum = psplit[0] + dec + psplit[1];
        }
      }

      return (neg ? "-" : "") + format.replace(/[\d,?.?]+/, fnum);
    },
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
