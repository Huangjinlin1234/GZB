<template>
  <!--
    @created by zhangliang15 2021/09/10
    @description 征信贷预授信评分卡
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item label="对接记录ID" placeholder="对接记录ID" ctype="input" name="applyRecordId"></yu-xform-item>
              <yu-xform-item label="借款人名称" placeholder="借款人名称" ctype="input" name="corpName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="viewInfoFn" class="el-icon-share" type="primary" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button @click="admit" class="el-icon-edit" type="primary" v-if="checkCtrl('admit')">手动准入</yu-button>
            <yu-button @click="refused" class="el-icon-edit" type="primary" v-if="checkCtrl('refused')">手动拒绝</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="baseParams" request-type="POST">
            <yu-xtable-column label="对接记录ID" prop="applyRecordId"></yu-xtable-column>
            <yu-xtable-column label="借款人名称" prop="corpName"></yu-xtable-column>
            <yu-xtable-column label="借款人预期借款额度" prop="borrowerLossLmt"></yu-xtable-column>
            <yu-xtable-column label="具体品种" prop="prdName" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
            <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_ZXD_STATUS"></yu-xtable-column>
            <yu-xtable-column label="是否准入" prop="ifAdmitSys" data-code="STD_ZB_ZXD_ADMIT"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
        <yu-xdialog :title="查询征信贷预授信申请" :visible.sync="dialogVisible" width="1500px" height="800px">
          <yu-xform ref="refForm" label-width="80px" v-model="infoFormdata" :disabled="formDisabled">
            <yu-panel title="查询对象信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="对接记录ID" name="applyRecordId" ctype="input" :disabled="true"></yu-xform-item>
                <yu-xform-item label="借款人名称" name="corpName" ctype="input" :disabled="true"></yu-xform-item>
                <yu-xform-item label="最大预授信额度(万元)" name="maxLmtAmt"  unit="万元" ctype="yu-num" number-formatter="0,000.00" rules="required"></yu-xform-item>
                <yu-xform-item label="企业代码" name="corpId" ctype="input" :hidden="true"></yu-xform-item>
                <yu-xform-item label="具体发起机构" name="launchOrg" ctype="input" :hidden="true"></yu-xform-item>
                <yu-xform-item label="是否准入" name="ifAdmitSys" ctype="input" :hidden="true"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <div class="yu-grpButton">
              <yu-button icon="yx-undo2" type="primary" @click="sendtoWxp">手动准入</yu-button>
              <yu-button icon="yx-undo2" type="primary" @click="cancelFn">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
    </yu-tabs>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_PRD_TYPE_PROP,STD_ZB_ZXD_STATUS,STD_ZB_ZXD_ADMIT');

export default {
  data: function () {
    return {
      dialogVisible: false,
      dataUrl: backend.cmisBiz + '/api/zxdprelmtapply/queryZxdPreLmtApplyList',
      baseParams: {condition: {}, sort: 'applyRecordId desc'}
    };
  },
  methods: {
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

    handleClick: function (tab, event) {},
    // 手动准入
    admit: function () {
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let params = selections[0];
      if (params.status == '2') {
        this.$xutils.showMsgBox('提示', '该笔申请已发送移动端，不允许重复发起，请确认！');
        return;
      }
      _this.dialogVisible = true;
      var jsoPar = params;
      let applyRecordId = jsoPar.applyRecordId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/zxdprelmtapply/queryZxdPreLmtApplyByParams',
        data: {applyRecordId: applyRecordId},
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
    // POP取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    // 查看
    viewInfoFn: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo';
      let keydemo = 'frptdemojkjjptd'; // --todo 查看征信贷预授信评分卡 报表未画
      params.src = _this.$backend.frptRptService + 'zxdysxpfk.cpt&op=view&applyRecordId=' + params.applyRecordId;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '征信贷预授信评分卡',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    // 手动提交
    sendtoWxp: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.infoFormdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (model.max_lmt_amt <= 0) {
        this.$xutils.showMsgBox('提示', '最大预授信额度需大于0，请确认！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/zxdprelmtapply/ZXDSendToWx',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$xutils.showMsgBox('提示', '手动准入成功!', 350, 150);
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 手动拒绝
    refused: function () {
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let params = selections[0];
      if (params.status == '2') {
        this.$xutils.showMsgBox('提示', '该笔申请已发送移动端，不允许重复发起，请确认！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        // 新增
        url: this.$backend.cmisBiz + '/api/zxdprelmtapply/ZXDSendToWxpRefuse',
        data: JSON.stringify(params),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$xutils.showMsgBox('提示', '手动拒绝成功!', 350, 150);
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
