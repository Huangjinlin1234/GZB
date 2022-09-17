<template>
  <!--
    @created by zxz 20210511
    @description 线上提款启用列表查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="待处理" name="tab1">
        <yu-panel title="合同影像审核列表查询" panel-type="normal">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
              <yu-xform-group :column="2">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="产品编号" placeholder="产品编号" name="prdId" ctype="input"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel>

            <yu-button-drop>
              <yu-button @click="addFn" type="primary" v-if="checkCtrl('add')">新增</yu-button>
              <yu-button @click="modifyFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
              <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            </yu-button-drop>

          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" selection-type="radio" show-hidden-menu="true">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="合同类型" prop="contType" data-code="STD_DISCCONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="contAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已处理" name="tab2">
        <yu-panel title="合同影像审核列表查询" panel-type="normal">
          <template slot="filter">
            <yu-xform related-table-name="refTable2" form-type="search" v-model="searchFormdata2">
              <yu-xform-group :column="2">
                <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="产品编号" placeholder="产品编号" name="prdId" ctype="input"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" name="apprStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <template>
          <yu-button-drop>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
            <yu-button @click="sendfk" type="primary" v-if="checkCtrl('sendfk')">房抵线上合同启用</yu-button>
          </yu-button-drop>
        </template>
        <yu-xtable ref="refTable2" condition-key="condition" row-number :data-url="dataUrlhis" request-type="POST" selection-type="radio" show-hidden-menu="true">
          <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="合同类型" prop="contType" data-code="STD_DISCCONT_TYPE"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarMode"  data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-tab-pane>
    </yu-tabs>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="主键" :hidden="true" name="pkId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同号" :hidden="true" name="contNo" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同类型" name="contType" ctype="select" data-code="STD_CONT_TYPE"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同币种" name="contCurType" ctype="select" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="合同金额" name="contAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          <yu-xform-item label="操作类型" name="oprType" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" name="inputId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改人" name="updId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改机构" name="updBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改日期" name="updDate" ctype="input"></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerId" ctype="input"></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="创建时间" name="createTime" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('YESNO, STD_ZB_APPR_STATUS,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_BELG_LINE,STD_DISCCONT_TYPE');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      activeName: 'tab1',
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrcontimageauditapp/pendinglist',
      dataUrlhis: backend.cmisBiz + '/api/ctrcontimageauditapp/processedlist',
      formdata: {},
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
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      topOutsystemCode: ''
    };
  },

  methods: {
    ctrBeginFlagTrue () {
      var _this = this;
      var selectionsAry;
      if (this.activeName == 'tab1') {
        selectionsAry = _this.$refs.refTable.selections;
      } else {
        selectionsAry = _this.$refs.refTable2.selections;
      }

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      // 发请求过去拿参数
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/updatactrbeginflag',
        data: selectionsAry[0]
      }).then(({ code, message, data }) => {
        if (code == 0) {
          // 请求成功
          if (data != null) {
            // 操作成功
            this.$message({ message: message, type: 'success' });
            // 进行审批流程  WF_CTR_LOAN_CONT
            this.$refs.refTable2.remoteData();
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
          }
        }
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      } // 向后台发送保存请求

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$dialog.open('合同选取', 'zrcbank/biz/ctrContImageInfoApp/ctrContImageInfoAppAdd', 1400, 800, {}, () => {
        _this.$refs.refTable.remoteData();
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      if (data.approveStatus !== '000' && data.approveStatus !== '992') {
        _this.$message({
          message: '不允许修改当前状态的记录！',
          type: 'warning'
        });
        return;
      }
      var op = 'EDIT';
      data['imageAppSerno'] = data.serno;
      _this.getContData(data, op);
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry;
      if (this.activeName == 'tab1') {
        selectionsAry = _this.$refs.refTable.selections;
      } else {
        selectionsAry = _this.$refs.refTable2.selections;
      }
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var op = 'VIEW';
      var data = selectionsAry[0];
      data['imageAppSerno'] = data.serno;
      _this.getContData(data, op);
    },
    /**
     * 房抵e点贷发送风控
     */
    sendfk: function () {
      var _this = this;
      var selectionsAry;
      if (this.activeName == 'tab1') {
        selectionsAry = _this.$refs.refTable.selections;
      } else {
        selectionsAry = _this.$refs.refTable2.selections;
      }
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var data = selectionsAry[0];
      if (data.prdTypeProp != 'P034') {
        _this.$message({
          message: '仅房抵e点贷使用！',
          type: 'warning'
        });

        return;
      }
      this.$confirm('是否确认发送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/ctrcontimageauditapp/sendfk',
          data: data,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message('发送成功');
            } else {
              _this.$message({
                message: '发送失败，请联系管理员',
                type: 'warning'
              });
            }
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    },
    // 查询合同类型
    getContData (data, op) {
      var _this = this;
      var contNo = data.contNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/selectimagectrloan',
        data: {condition: JSON.stringify({ contNo: contNo}) },
        callback: function (code, message, response) {
          if (response.code == '0') {
            let responseData = response.data[0];
            responseData['imageAppSerno'] = data.imageAppSerno;
            _this.setImageParam(responseData.bizType);
            _this.jumpFactory(responseData, op);
          }
        }
      });
    },

    jumpFactory (data, op) {
      data['model_group_no'] = 'CMG000712';
      data['op'] = op;
      data['topOutsystemCode'] = this.topOutsystemCode;
      data['imageParams'] = {
        contid: data.contNo,
        businessid: data.serno,
        docid: data.serno
      };
      // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, data, true, true);
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: data.serno + data.op,
        title: '合同信息',
        data: data
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      // 单笔删除
      if (selections.length > 1) {
        _this.$message({
          message: '请先选择单条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = selections[0];
      if (jsoPar.approveStatus == '000') {
        _this.delete(jsoPar);
      } else if (jsoPar.approveStatus == '992') {
        _this.updateApproveStatus(jsoPar);
      } else {
        _this.$message({
          message: '仅允许删除【待发起】或【打回】的数据！',
          type: 'warning'
        });
        return;
      }
    },

    delete (jsoPar) {
      var _this = this;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrcontimageauditapp/deletebypkid',
              data: jsoPar,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    updateApproveStatus (jsoPar) {
      var _this = this;
      jsoPar['approveStatus'] = '996';
      _this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrcontimageauditapp/update',
              data: jsoPar,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    /**
     * 导出操作
     */
    exportFn: function () {
      var _this = this;

      yufp.util.exportExcelByTable({
        fileName: '导出',
        importType: 'service',
        ref: _this.$refs.refTable,
        url: '/trade/example/list'
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
    // 根据合同业务类型设置影像参数
    setImageParam (bizType) {
      let _this = this;
      if (bizType == '01') {
        _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      } else if (bizType == '02') {
        _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      } else if (bizType == '03') {
        _this.topOutsystemCode = 'DGYX;XDTXYWYX;';
      } else if (bizType == '04') {
        _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      } else if (bizType == '06') {
        _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWDCCZ;GJYWSQSQT;';
      } else if (bizType == '07') {
        _this.topOutsystemCode = 'CDHPDY;CDHPZY;';
      } else if (bizType == '08') {
        _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      } else if (bizType == '09') {
        _this.topOutsystemCode = 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;';
      }
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
    }


  }
};
</script>
