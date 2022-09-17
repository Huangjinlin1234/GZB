<template>
  <!--
    @created by zhangliang15 2021/08/02
    @description 房抵e点贷企业经营信息
  -->
  <div>
      <yu-panel title="房抵e点贷房产信息" :hideFilter="false" :collapseHide="false">
        <yu-button-drop>
          <yu-button @click="viewForm"  type="primary">查看</yu-button>
          <yu-button @click="eidtForm"  type="primary" v-if="isButShow">修改</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable"  row-number :data-url="dataUrl"  request-type="POST" style="margin-top: 10px" condition-key="condition" :base-params="baseParams">
        <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="面签流水号" prop="signatureSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="省名称" prop="provinceName"></yu-xtable-column>
        <yu-xtable-column label="省别名" prop="provinceAlias"></yu-xtable-column>
        <yu-xtable-column label="城市名称" prop="cityName"></yu-xtable-column>
        <yu-xtable-column label="城市别名" prop="cityAlias"></yu-xtable-column>
        <yu-xtable-column label="区县名称" prop="countyName"></yu-xtable-column>
        <yu-xtable-column label="楼盘名称" prop="communityName"></yu-xtable-column>
        <yu-xtable-column label="楼栋名称" prop="buildingName"></yu-xtable-column>
        <yu-xtable-column label="楼层(实际层)" prop="floor"></yu-xtable-column>
        <yu-xtable-column label="总层" prop="generalFloor"></yu-xtable-column>
        <yu-xtable-column label="房号名称" prop="roomName"></yu-xtable-column>
        <yu-xtable-column label="产权证书" prop="houseLandNo"></yu-xtable-column>
        <yu-xtable-column label="抵押物所有权人" prop="pldimnOwner" data-code="STD_HOUSE_PER"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="房抵e点贷面签房屋信息" :visible.sync="dialogVisible" width="1500px" height="800px">
      <yu-xform ref="refForm" label-width="80px" v-model="infoFormdata" :disabled="formDisabled">
        <yu-panel title="面签房屋信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="省名称" name="provinceName" ctype="input"></yu-xform-item>
            <yu-xform-item label="省别名" name="provinceAlias" ctype="input"></yu-xform-item>
            <yu-xform-item label="城市名称" name="cityName"  ctype="input"></yu-xform-item>
            <yu-xform-item label="城市别名" name="cityAlias"  ctype="input"></yu-xform-item>
            <yu-xform-item label="区县名称" name="countyName" ctype="input"></yu-xform-item>
            <yu-xform-item label="楼盘名称" name="communityName" ctype="input"></yu-xform-item>
            <yu-xform-item label="楼栋名称" name="buildingName" ctype="input"></yu-xform-item>
            <yu-xform-item label="楼层(实际层)" name="floor" ctype="input"></yu-xform-item>
            <yu-xform-item label="总层" name="generalFloor" ctype="input"></yu-xform-item>
            <yu-xform-item label="房号名称" name="roomName" ctype="input"></yu-xform-item>
            <yu-xform-item label="房产类型" name="houseType" ctype="select" data-code="STD_CARD_HOUSE_TYPE"></yu-xform-item>
            <yu-xform-item label="房产面积" name="houseSqu" unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="评估价值(房产)" name="evalAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
            <yu-xform-item label="产权证号" name="houseLandNo" ctype="input"></yu-xform-item>
            <yu-xform-item label="区位信息" name="locationInfo" ctype="input"></yu-xform-item>
            <yu-xform-item label="是否出租" name="isLease" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="抵押物所有权人" name="pldimnOwner" ctype="select" data-code="STD_HOUSE_PER"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="房产附属物信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="自行车库面积" name="bicycleParkingSqu" unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="自行车库价值" name="bicycleParkingAmt" ctype="yu-num" number-formatter="0,000.00"  ></yu-xform-item>
            <yu-xform-item label="车位面积" name="carportSqu"  unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="车位价值" name="carportAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
            <yu-xform-item label="阁楼面积" name="atticSqu" unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="阁楼价值" name="atticAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="汇总信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="总评估价值" name="evalTotalAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="房抵e点贷面签房屋信息" :visible.sync="UpdatedialogVisible" width="1500px" height="800px">
      <yu-xform ref="refForm" label-width="80px" v-model="updateFormdata" :disabled="false">
        <yu-panel title="面签房屋信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="流水号" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="楼盘名称" name="communityName" ctype="input" :disabled="true"></yu-xform-item>
            <yu-xform-item label="区位信息" name="locationInfo" ctype="input"></yu-xform-item>
            <yu-xform-item label="产权证号" name="houseLandNo" ctype="input"></yu-xform-item>
            <yu-xform-item label="房产面积" name="houseSqu" unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="自行车库面积" name="bicycleParkingSqu" unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="车位面积" name="carportSqu"  unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="阁楼面积" name="atticSqu" unit="平方" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="是否出租" name="isLease" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelUpdFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_YES_NO,STD_CARD_HOUSE_TYPE,STD_HOUSE_PER');
let obj = {};
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      baseParams: {},
      dataUrl: backend.cmisBiz + '/api/cushouseinfo/queryCusHouseInfo',
      formdata: {},
      dialogVisible: false,
      UpdatedialogVisible: false,
      formDisabled: true,
      isButShow: false
    };
  },
  created () {
    var _this = this;
    obj = _this.$route.meta.params;
    _this.baseParams = {condition: JSON.stringify({signatureSerno: obj.serno})};
  },
  mounted () {
    var _this = this;
    let data = _this.getFactory().contextData;
    // 进入初始化
    _this.op = data.op;
    if (_this.op == 'VIEW') {
      this.isButShow = false;
      this.formDisabled = true;
    } else if (_this.op == 'UPDATE') {
      this.isButShow = true;
      this.formDisabled = true;
    }
  },
  methods: {
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
          console.log('未找到分类');
          break;
        }

        if (val == undefined) {
          return '';
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
        return '';
      }
      var comma = ',',
        dec = '.',
        i18n = false,
        neg = v < 0;

      v = Math.abs(v);
      if (format.substr(format.length - 2) == '/i') {
        format = format.substr(0, format.length - 2);
        i18n = true;
        comma = '.';
        dec = ',';
      }

      var hasComma = format.indexOf(comma) != -1,
        psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
      } else {
        v = v.toFixed(0);
      }

      var fnum = v.toString();

      psplit = fnum.split('.');

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

      return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
    },
    // 查看
    viewForm: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.dialogVisible = true;
      var jsoPar = _this.$refs.refTable.selections[0];
      let serno = jsoPar.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cushouseinfo/queryCusHouseInfoByParams',
        data: {serno: serno},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.infoFormdata);
          } else {
            return;
          }
        }
      });
    },
    // 修改
    eidtForm: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.UpdatedialogVisible = true;
      var jsoPar = _this.$refs.refTable.selections[0];
      let serno = jsoPar.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/cushouseinfo/queryCusHouseInfoByParams',
        data: {serno: serno},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.updateFormdata);
          } else {
            return;
          }
        }
      });
    },
    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.updateFormdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/cushouseinfo/update';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            _this.$message({ message: '保存成功', type: 'success' });
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: '保存失败', type: 'error' });
          }
        }
      });
    },
    // 查看POP取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    // 修改POP取消
    cancelUpdFn: function () {
      var _this = this;
      _this.UpdatedialogVisible = false;
    },
    AfterInit () {

    }
  }
};
</script>
