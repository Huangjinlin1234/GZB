<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs type="card">
      <yu-tab-pane label="业务条线额度管控">
        <yu-panel title="查询条件" panel-type="simple">
          <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchInfoFormdata" label-width="120px">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务条线" ctype="select" placeholder="业务条线" name="busiType" data-code="STD_ZB_SUIT_BIZ_LINE"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn()">查询</yu-button>
            <yu-button type="primary" @click="resetFn()">重置</yu-button>
          </div>
        </yu-panel>
        <yu-panel title="业务条线额度管控列表" panel-type="simple">
          <yu-button-drop>
            <yufp-excel-export :export-url="excelExportUrl" title="导出" v-if="checkCtrl('export')" :export-param="{condition: JSON.stringify()}" type="primary" style="margin-right: 10px;"></yufp-excel-export>
            <yu-button ref="btn_doUpdae" type="primary" v-if="checkCtrl('edit')" @click="doUpdate" >修改</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :summary-method="getSummaries" show-summary="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataInfoUrl"
            :base-params="infoParam" request-type="POST" :default-load="false">
            <yu-xtable-column label="条线部门" prop="busiType" data-code="STD_ZB_SUIT_BIZ_LINE"></yu-xtable-column>
            <yu-xtable-column label="区域" prop="orgAreaType" data-code="STD_ORG_AREA_TYPE"></yu-xtable-column>
            <yu-xtable-column label="上月末贷款余额（万元）" prop="lastMonthLoanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="当月可净新增贷款投放金额（万元）" ctype="yu-num" prop="currMonthAllowAddAmt" number-formatter="0,000.00" :disabled="doUpdateFlag" rules="required" @blur="saveFn" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="当月剩余可投放贷款余额（万元）" prop="currMonthAllowLoanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="月末贷款余额测算（万元）" prop="curMonthLoanBalancePlan" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="上一日贷款余额（万元）" prop="lastDayLoanBalance" :formatter="Currency"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="业务条线额度管控历史">
        <yu-panel title="查询条件" panel-type="simple">
          <yu-xform related-table-name="refBackTable" ref="searchFormHis" v-model="searchBackFormdata" label-width="120px">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务条线" ctype="select" placeholder="业务条线" name="busiType" data-code="STD_ZB_SUIT_BIZ_LINE"></yu-xform-item>
              <yu-xform-item label="更新日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="更新日期" name="batDate"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn('his')">查询</yu-button>
            <yu-button type="primary" @click="resetFn('his')">重置</yu-button>
          </div>
        </yu-panel>
        <yu-panel title="业务条线额度管控历史列表" panel-type="simple">
          <yu-button-drop>
            <yufp-excel-export :export-url="excelExportUrlHis" title="导出" :export-param="{condition: JSON.stringify(searchBackFormdata)}"></yufp-excel-export>
          </yu-button-drop>
          <yu-xtable ref="refBackTable" row-number condition-key="condition" selection-type="radio" :summary-method="getSummaries" show-summary="true"  :pageable="true" :data-url="dataBackUrl"
            :base-params="backParam" request-type="POST" :default-load="false">
            <yu-xtable-column label="条线部门" prop="busiType" data-code="STD_ZB_SUIT_BIZ_LINE"></yu-xtable-column>
            <yu-xtable-column label="区域" prop="orgAreaType" data-code="STD_ORG_AREA_TYPE"></yu-xtable-column>
            <yu-xtable-column label="上月末贷款余额（万元）" prop="lastMonthLoanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="当月可净新增贷款投放金额（万元）" prop="currMonthAllowAddAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="月末贷款余额测算（万元）" prop="curMonthLoanBalancePlan" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="上一日贷款余额（万元）" prop="lastDayLoanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="更新人" prop="updIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="更新日期" prop="updDate" width="100"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinForm from '@/utils/mixins/mixin-form';
import mixin from '@/utils/mixin';

yufp.lookup.reg('STD_ZB_SUIT_BIZ_LINE,STD_ORG_AREA_TYPE');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';


export default {
  components: { YufpDemoSelector, YufpExcelExport },
  mixins: [mixinForm, mixin],
  data: function () {
    return {
      searchInfoFormdata: {},
      searchBackFormdata: {},
      dataInfoUrl: this.$backend.cmisLmt + '/api/manabusilmt/selectbymodel',
      infoParam: {condition: { oprType: '01' }},
      dataBackUrl: this.$backend.cmisLmt + '/api/manabusilmthis/selectbymodel',
      backParam: {condition: { oprType: '01' }},
      excelExportUrl: backend.cmisLmt + '/api/manabusilmt/exportmanabusilmt',
      excelExportUrlHis: backend.cmisLmt + '/api/manabusilmthis/exportmanabusilmthis',
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
      hiddenflag: false,
      doUpdateFlag: true,
      viewType: 'DETAIL',
      DZDataObject: {},
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  created () {
  },
  mounted () {
  },
  methods: {

    /**
     * 修改
     */
    doUpdateOld: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].pkId + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'EDIT';

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/manaOrgLmt/manaOrgLmtDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '修改业务条线额度管控信息',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 修改
     */
    doUpdate: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.doUpdateFlag = false;
    },

    /**
     * saveFn保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      yufp.clone(selectionsAry[0], model);
      var validate = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          validate = true;
        }
      });
      if (!validate) {
        this.$message({
          message: '数据验证不通过，请修改后重新提交！',
          type: 'error'
        });
        return;
      }
      // 向后台发送保存请求
      var strurl = backend.cmisLmt + '/api/manabusilmt/update';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.doUpdateFlag = true;
        }});
    },

    /**
     * 详情
     */
    doView: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].pkId + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'DETAIL';

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/manaOrgLmt/manaOrgLmtDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '查看业务条线额度管控信息',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 历史查看
     */
    doBackView: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].pkId + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'DETAIL';

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/manaOrgLmt/manaOrgLmtHisDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '查看业务条线额度管控历史',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    // 删除
    doDelete: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      // 如果未选中表格数据，则弹出提示
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 获得选中的表格数据
      yufp.clone(selectionsAry[0], model);
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 操作类型，01--可展示   02--不可展示
            model.oprType = '02';
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // data: 向后端传递的数据
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              data: model,
              url: backend.cmisLmt + '/api/manabusilmt/update',
              callback: function (code, message, response) {
                // 删除后刷新表格数据
                _this.$refs.refTable.remoteData();
                // 弹出提示
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    // 条件查询
    searchFn: function (data) {
      let _this = this;
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      if (data !== undefined && data !== '' && data === 'his') {
        if (_this.searchBackFormdata.busiType == '' && (_this.searchBackFormdata.batDate == '' || _this.searchBackFormdata.batDate == null)) {
          _this.$message({ message: '请先选择查询条件', type: 'warning'});
          return;
        }
        // 当筛选条件有值且更新日期为空的时候，默认更新日期为当前日期减一天查询
        if (_this.searchBackFormdata.busiType !== '' && (_this.searchBackFormdata.batDate == '' || _this.searchBackFormdata.batDate == null)) {
          _this.searchBackFormdata.batDate = new Date(new Date(openday).getTime() - 86400000);
        }
        _this.$refs.refBackTable.remoteData({ condition: JSON.stringify(_this.searchBackFormdata) });
      } else {
        if (_this.searchInfoFormdata.busiType == '') {
          _this.$message({ message: '请先选择查询条件', type: 'warning'});
          return;
        }
        _this.$refs.refTable.remoteData({ condition: JSON.stringify(_this.searchInfoFormdata) });
      }
    },

    // 重置
    resetFn: function (data) {
      let _this = this;
      if (data !== undefined && data !== '' && data === 'his') {
        // 清空条件
        // 清空条件
        _this.searchBackFormdata.busiType = '';
        _this.searchBackFormdata.batDate = '';
      } else {
        // 清空条件
        // 清空条件
        _this.searchInfoFormdata.busiType = '';
      }
    },

    getSummaries: function (param) {
      var _this = this;
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 3) {
          sums[index] = '合计';
          return;
        }
        if (index === 0 || index === 1 || index === 2) {
          sums[index] = '';
          return;
        }
        var values = data.map(function (item) { return Number(item[column.property]) });
        if (!values.every(function (value) { return isNaN(value) })) {
          sums[index] = values.reduce(function (prev, curr) {
            var value = Number(curr);
            if (!isNaN(value)) {
              return parseFloat(parseFloat(prev + curr).toFixed(2));
            } else {
              return parseFloat(parseFloat(prev).toFixed(2));
            }
          }, 0);
          sums[index] = _this.moneyFormatter(sums[index]);
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    moneyFormatter: function (money) {
      /*
      * 参数说明：
      * money：要格式化的数字
      * */
      money = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(2) + '';
      const l = money.split('.')[0].split('').reverse(), r = money.split('.')[1];
      let t = '';
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
      }
      return t.split('').reverse().join('') + '.' + r;
    }


  }
};
</script>
