
<template>
  <!--
    @created by zhangliang15
    @description 在线投标保函预约管理
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="在途预约" name="messageTip">
        <yu-panel title="在途预约" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="4">
              <yu-xform-item label="任务编号" placeholder="任务编号" ctype="input" name="serno"></yu-xform-item>
              <yu-xform-item label="企业客户名称" placeholder="企业客户名称" ctype="input" name="cusName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="viewForm" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="assignTaskFn" v-if="checkCtrl('assigntask')">分配任务</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST"
           selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true"
          >
            <yu-xtable-column label="任务编号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="企业统一社会代码" prop="creditCode" width:="120"></yu-xtable-column>
            <yu-xtable-column label="企业客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="登记时间" prop="inputTime" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管户机构" prop="managerBrId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="处理结果" prop="result" width:="120" data-code="STD_ZB_DZBH_RESULT"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="历史预约" name="deal">
        <yu-panel title="历史预约" hideFilter="false">
             <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refDealTable">
              <yu-xform-group :column="4">
              <yu-xform-item label="任务编号" placeholder="任务编号" ctype="input" name="serno"></yu-xform-item>
              <yu-xform-item label="企业客户名称" placeholder="企业客户名称" ctype="input" name="cusName"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="viewForm" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST"
          selection-type="radio" :pageable="true"  :base-params="baseParams" :default-load="true"
          >
            <yu-xtable-column label="任务编号" prop="serno" width:="120"></yu-xtable-column>
            <yu-xtable-column label="企业统一社会代码" prop="creditCode" width:="120"></yu-xtable-column>
            <yu-xtable-column label="企业客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="登记时间" prop="inputTime" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="管户机构" prop="managerBrId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="处理结果" prop="result" width:="120" data-code="STD_ZB_DZBH_RESULT"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>

    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="在线投标保函预约任务" :visible.sync="dialogVisible" width="1500px" height="800px">
      <yu-xform ref="refForm" label-width="80px" v-model="infoFormdata" :disabled="formDisabled">
        <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="任务编号" name="serno" ctype="input"></yu-xform-item>
            <yu-xform-item label="企业统一社会代码" name="creditCode" ctype="input"></yu-xform-item>
            <yu-xform-item label="企业客户名称" name="cusName"  ctype="input"></yu-xform-item>
            <yu-xform-item label="联系人" name="contacts" ctype="input"></yu-xform-item>
            <yu-xform-item label="联系方式" name="phone" ctype="input"></yu-xform-item>
            <yu-xform-item label="处理结果" name="result" ctype="select" data-code="STD_CARD_HOUSE_TYPE"></yu-xform-item>
            <yu-xform-item label="登记时间" name="inputTime" ctype="input"></yu-xform-item>
            <yu-xform-item label="管户客户经理" name="managerId" ctype="input"></yu-xform-item>
            <yu-xform-item label="管户机构" name="managerBrId" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>

     <yu-dialog title="查询条件" :visible.sync="dialogTableVisible" :min-height="800" center="true">
      <yu-xform ref="search" form-type="search" related-table-name="dialogtable" v-model="searchFormdatas" label-width="120px" :custom-search-fn="dialogtable">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户经理编号" ctype="input" placeholder="客户经理编号" name="loginCode"></yu-xform-item>
          <yu-xform-item label="客户经理名称" ctype="input" placeholder="客户经理名称" name="userName"></yu-xform-item>
          <yu-xform-item label="所在机构编号" ctype="input" placeholder="所在机构编号" name="orgId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="dialogtable"  row-number  selection-type="radio" request-type="POST" :pageable="true" :data-url="dataUserUrl" :base-params="baseUserParams" condition-key="condition" :default-load="true">
        <yu-xtable-column label="客户经理编号" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="客户经理名称" prop="managerName"></yu-xtable-column>
        <yu-xtable-column label="所在机构编号" prop="orgNo"></yu-xtable-column>
        <yu-xtable-column label="所在机构名称" prop="orgName"></yu-xtable-column>
      </yu-xtable>
       <div class="button-group" style="text-align:center">
          <el-button type="primary" @click="confirmFn" size="small">分配任务</el-button>
       </div>
    </yu-dialog>
</div>
</template>
<script>
yufp.lookup.reg('STD_ZB_DZBH_RESULT');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/onlinecvrgcusinfo/onlineCvrgCusInfolist',
      dataHisUrl: backend.cmisBiz + '/api/onlinecvrgcusinfo/onlineCvrgCusInfoHislist',
      dataUserUrl: backend.appOcaService + '/api/adminsmorg/getUserByLowerOrgInfo',
      activeName: 'messageTip',
      searchFormdata: {},
      showDialog: false,
      formdata: {},
      baseParams: {condition: {}},
      baseUserParams: {condition: {}},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      dialogTableVisible: false,
      formDisabled: true
    };
  },
  created () {
    let userInfo = this.$xutils.getLoginUserInfo();
    // this.baseParams = {
    //   condition: {
    //     managerBrNo: userInfo.orgCode
    //   }
    // };
    this.baseUserParams = {
      condition: {
        orgId: userInfo.orgCode
      }
    };
  },

  mounted: function () {
  },

  methods: {
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
    // 分配任务
    assignTaskFn: function () {
      var _this = this;
      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (managerId === '' || managerId === null) {
        _this.dialogTableVisible = true;
      } else {
        let cusName = _this.$refs.refTable.selections[0].cusName;
        _this.$confirm('客户' + cusName + '已分配，是否确认重新分配？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              _this.dialogTableVisible = true;
            }
          }
        });
      }
    },
    // 返回POP取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    // 分配任务
    confirmFn: function () {
      var _this = this;
      var model = {};
      // 获取在途预约列表中选中数据
      var data = _this.$refs.refTable.selections[0];
      yufp.clone(data, model);
      model.managerId = _this.$refs.dialogtable.selections[0].managerId;
      model.managerBrId = _this.$refs.dialogtable.selections[0].orgNo;

      // 向后台发送保存请求
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/onlinecvrgcusinfo/onlineCvrgCusInfoUpdate',
        data: JSON.stringify(model),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let rtnData = response.data;
            if (rtnData.rtnCode == '0000') {
              _this.$xutils.showMsgBox('提示', '分配成功!', 350, 150);
              _this.dialogTableVisible = false;
              _this.$refs.refTable.remoteData();
            } else {
              _this.$xutils.showMsgBox('提示', '分配失败' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
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
        url: backend.cmisBiz + '/api/onlinecvrgcusinfo/queryOnlineCvrgCusInfoByParams',
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
    }
  }
};

</script>
