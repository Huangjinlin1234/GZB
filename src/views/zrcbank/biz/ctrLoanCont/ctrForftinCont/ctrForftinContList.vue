
<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 福费廷合同 待签合同列表  历史合同列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待签合同" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" ref="refForm">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item label="合同状态" placeholder="合同状态" ctype="select" name="contStatus" data-code="STD_CONT_STATUS" exclude-key="200,600,500,800,700" :datacode-filter="datacodeFilterFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
             <yu-toolbar>
            <yu-button @click="printFn" type="primary" v-if="checkCtrl('print')">打印</yu-button>
            <yu-button @click="signFn" type="primary" v-if="checkCtrl('sign')">签订</yu-button>
            <yu-button @click="logoutFn" type="primary" v-if="checkCtrl('logout')">注销</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST" selection-type="radio">
            <yu-xtable-column label="流水号" prop="iqpSerno" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120">
              <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120">
              <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="合同币种" prop="curType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额（元）" prop="contAmt" width:="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="contStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="contEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="历史合同" name="deal">
        <yu-panel title="输入查询条件" hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refDealTable" form-type="search" v-model="searchFormdata" ref="refForm">
            <yu-xform-group :column="2">
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="合同状态" placeholder="合同状态" ctype="select" name="contStatus" data-code="STD_CONT_STATUS" exclude-key="100" :datacode-filter="datacodeFn"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button @click="printHisFn" type="primary" v-if="checkCtrl('hisprint')">打印</yu-button>
            <yu-button @click="logoutHisFn" type="primary" v-if="checkCtrl('hislogout')">注销</yu-button>
            <yu-button @click="infoHisFn" type="primary" v-if="checkCtrl('hisview')">查看</yu-button>
            <yu-button @click="againSignFn" type="primary" v-if="checkCtrl('resign')">重签</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" row-number :data-url="dataHisUrl" condition-key="condition" request-type="POST" selection-type="radio">
            <yu-xtable-column label="流水号" prop="iqpSerno" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120">
              <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" data-code="NATIONALITY" width:="120">
              <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="合同币种" prop="curType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额（元）" prop="contAmt" width:="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="contStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="contEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg(
  'STD_ZB_CONT_STATUS,STD_ZB_YES_NO,STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP'
);
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/ctrloancont/forftin/tosignlist',
      dataHisUrl: backend.cmisBiz + '/api/ctrloancont/forftin/donesignlist',
      activeName: 'messageTip',
      searchFormdata: {},
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
      saveBtnShow: true
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == '100') {
          return true;
        }
        return false;
      });
    },

    // 字典项过滤
    datacodeFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key != '100') {
          return true;
        }
        return false;
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

    // // 待签打印
    // printFn: function () {
    //   var _this = this;
    //   if (_this.$refs.refTable.selections.length != 1) {
    //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
    //     return;
    //   }
    // },

    // 待签打印
    printFn () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      // const params = this.d1_1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      var contPageType = ''; // 合同版面标识
      var isESeal = params.isESeal; // 是否电子用印
      if (isESeal !== '0') {
        let managerId = params.managerId;
        const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
        let loginCode = userInfo.loginCode;
        if (managerId == loginCode) {
          contPageType = '2';
        } else {
          contPageType = '3';
        }
      } else {
        contPageType = '1';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.iqpSerno, // 流水号
        contType: '1',
        suitContType: params.contType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(params.contNo);
      // 担保合同
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
        data: JSON.stringify(contList),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            let guarData = response.data;
            for (let i = 0; i < guarData.length; i++) {
              let param2 = {};
              param2.contNo = params.contNo; // 借款合同号
              param2.serno = params.iqpSerno; // 借款合同流水号
              param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
              param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
              param2.contType = '2';
              param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
              param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
              param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
              param2.pldContType = guarData[i].pldContType; // 质押合同类型
              param2.isESeal = isESeal; // 是否电子用印
              param2.contPageType = contPageType; // 合同版面标识
              param2.matchFlag = ''; // 特定匹配标识
              paramList.push(param2);
            }
          }
        }
      });
      this.$dialog.open(
        '合同打印',
        'printManage/index',
        800,
        500,
        paramList,
        null,
        true,
        true
      );
    },

    // 签订
    signFn: function () {
      var _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let data = _this.$refs.refTable.selections[0];
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/ctrLoanCont/ctrForftinCont/ctrForftinContSign',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_sign', // 必传
        // 页签名称
        title: '福费廷合同签订',
        // 传递的业务数据，可选配置
        data: {
          data: data
        },
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    },

    // 待签注销
    logoutFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('是否需要注销?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: selections[0],
              url: backend.cmisBiz + '/api/ctrloancont/onlogout',
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.refTable.remoteData();
                    _this.$xutils.showMsgBox(
                      '提示',
                      '注销成功!',
                      350,
                      150,
                      this.getRefreshList
                    );
                  } else {
                    _this.$xutils.showMsgBox(
                      '提示',
                      response.data.rtnMsg,
                      350,
                      150
                    );
                  }
                } else {
                  _this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.data.rtnCode +
                      ',错误信息：' +
                      response.data.rtnMsg
                  );
                }
              }
            });
          }
        }
      });
    },

    // 查看
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000704';
      jsoPar['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1500,
        800,
        jsoPar,
        true,
        true
      );
    },

    // // 历史列表打印
    // printHisFn: function () {
    //   var _this = this;
    //   if (_this.$refs.refTable.selections.length != 1) {
    //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
    //     return;
    //   }
    // },

    //  历史列表打印
    printHisFn () {
      var _this = this;
      var params = _this.$refs.refDealTable.selections[0];
      // const params = this.d1_1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      var contPageType = ''; // 合同版面标识
      var isESeal = params.isESeal; // 是否电子用印
      if (isESeal !== '0') {
        let managerId = params.managerId;
        const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
        let loginCode = userInfo.loginCode;
        if (managerId == loginCode) {
          contPageType = '2';
        } else {
          contPageType = '3';
        }
      } else {
        contPageType = '1';
      }
      var paramList = [];
      // 参数
      var printData = {
        contNo: params.contNo,
        cusId: params.cusId,
        serno: params.iqpSerno
      };
      // 借款合同
      var params1 = {
        contNo: params.contNo, // 合同编号
        serno: params.iqpSerno, // 流水号
        contType: '1',
        suitContType: params.contType, // 适用合同类型
        suitPrd: params.prdId, // 适用产品
        isESeal: isESeal, // 是否电子用印
        contPageType: contPageType, // 合同版面标识
        isDzpj: '', // 是否电子票据
        matchFlag: '' // 特定匹配标识
      };
      paramList.push(printData);
      paramList.push(params1);
      var contList = [];
      contList.push(params.contNo);
      // 担保合同
      yufp.service.request({
        method: 'POST',
        async: false,
        url: backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByContNohtdy',
        data: JSON.stringify(contList),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            let guarData = response.data;
            for (let i = 0; i < guarData.length; i++) {
              let param2 = {};
              param2.contNo = params.contNo; // 借款合同号
              param2.serno = params.iqpSerno; // 借款合同流水号
              param2.guarContNo = guarData[i].guarContNo; // 担保合同编号
              param2.guarSerno = guarData[i].guarPkId; // 担保合同流水号
              param2.contType = '2';
              param2.suitGuarContType = guarData[i].guarContType; // 适用担保合同类型
              param2.suitGuarMode = guarData[i].guarMode; // 适用担保方式
              param2.isFloatPld = guarData[i].isFloatPld; // 是否浮动抵押
              param2.pldContType = guarData[i].pldContType; // 质押合同类型
              param2.isESeal = isESeal; // 是否电子用印
              param2.contPageType = contPageType; // 合同版面标识
              param2.matchFlag = ''; // 特定匹配标识
              paramList.push(param2);
            }
          }
        }
      });
      this.$dialog.open(
        '合同打印',
        'printManage/index',
        800,
        500,
        paramList,
        null,
        true,
        true
      );
    },

    // 历史列表注销
    logoutHisFn: function () {
      var _this = this;
      var selections = _this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      _this.$confirm('是否需要注销?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: selections[0],
              url: backend.cmisBiz + '/api/ctrloancont/onlogout',
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.refDealTable.remoteData();
                    _this.$xutils.showMsgBox(
                      '提示',
                      '注销成功!',
                      350,
                      150,
                      this.getRefreshList
                    );
                  } else {
                    _this.$xutils.showMsgBox(
                      '提示',
                      response.data.rtnMsg,
                      350,
                      150
                    );
                  }
                } else {
                  _this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.data.rtnCode +
                      ',错误信息：' +
                      response.data.rtnMsg
                  );
                }
              }
            });
          }
        }
      });
    },

    // 查看
    infoHisFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refDealTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let jsoPar = _this.$refs.refDealTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000704';
      jsoPar['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    },

    // 重签
    againSignFn: function () {
      var _this = this;
      var selections = _this.$refs.refDealTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (selections[0].contStatus != '200') {
        _this.$message({
          message: '仅允许选择【生效】的数据',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否需要重签?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: selections,
              url:
                backend.cmisBiz +
                '/api/ctrloancont/forftin/againsign/' +
                selections[0].contNo,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.refDealTable.remoteData();
                    _this.$xutils.showMsgBox(
                      '提示',
                      '重签成功!',
                      350,
                      150,
                      this.getRefreshList
                    );
                  } else {
                    _this.$xutils.showMsgBox(
                      '提示',
                      response.data.rtnMsg,
                      350,
                      150
                    );
                  }
                } else {
                  _this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.data.rtnCode +
                      ',错误信息：' +
                      response.data.rtnMsg
                  );
                }
              }
            });
          }
        }
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
        psplit = (i18n
          ? format.replace(/[^\d,]/g, '')
          : format.replace(/[^\d.]/g, '')
        ).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error(
          'NumberFormatException: invalid format, formats should have no more than 1 period: ' +
            format
        );
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
    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      var _this = this;
      // 查询客户大类
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: data.cusId,
        callback: function (code, message, response) {
          if (code == 0) {
            let json = {};
            let title = '';
            let name = '';
            let key = '';
            json['cusId'] = data.cusId;
            if (response.data.cusCatalog == '1') {
              json['op'] = 'VIEW';
              title = '个人客户查看';
              name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
              // 个人正式客户创建 B01
              key = new Date().getTime();
              json.key = `/${name}/${key}`;
            } else if (response.data.cusCatalog == '2') {
              json['viewType'] = 'VIEW';
              title = '对公客户查看';
              name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
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
              data: json
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
