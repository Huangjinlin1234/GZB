<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs type="card">
      <yu-tab-pane label="分支机构额度管控">
        <yu-panel title="查询条件" panel-type="simple">
          <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchInfoFormdata" label-width="120px">
            <yu-xform-group :column="2">
              <yu-xform-item label="机构号" name="orgId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item name="orgIdName" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'orgId':'orgId','orgIdName':'orgIdName'}" label="机构名称" ></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn()">查询</yu-button>
            <yu-button type="primary" @click="resetFn()">重置</yu-button>
          </div>
        </yu-panel>
        <yu-panel title="分支机构额度管控列表" panel-type="simple">
          <yu-button-drop>
            <yu-button ref="btn_doUpdae" type="primary" v-if="checkCtrl('edit')" @click="doUpdate" style="margin-right: 10px;">修改</yu-button>
            <yufp-excel-export :export-url="excelExportUrl" v-if="checkCtrl('export')" title="导出" :export-param="{condition: JSON.stringify()}" type="primary" style="margin-right: 10px;"></yufp-excel-export>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick"
                     @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataInfoUrl"
            :base-params="infoParam" request-type="POST" :default-load="false">
            <yu-xtable-column label="分支机构" prop="orgIdName"></yu-xtable-column>
            <yu-xtable-column label="上月末对公贷款余额（万元）" prop="lastMonthComLoanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="当月可净新增对公贷款投放金额（万元）" ctype="yu-num" prop="currMonthAllowComAddAmt" number-formatter="0,000.00" :disabled="doUpdateFlag" rules="required" @blur="saveFn" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="当月剩余可投放对公贷款余额（万元）" prop="currMonthAllowLoanBalance" :formatter="Currency">
<!--              <template slot-scope="scope">-->
<!--                <span>{{ parseFloat(scope.row.lastMonthComLoanBalance + scope.row.currMonthAllowComAddAmt - scope.row.lastDayComLoanBalance).toFixed(2) }}</span>-->
<!--              </template>-->
            </yu-xtable-column>
            <yu-xtable-column label="月末对公贷款余额测算（万元）" prop="curMonthComLoanBalancePlan">
              <template slot-scope="scope">
                <span>{{ Currency(parseFloat(scope.row.lastMonthComLoanBalance + scope.row.currMonthAllowComAddAmt).toFixed(2)) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="上一日对公贷款余额（万元）" prop="lastDayComLoanBalance" :formatter="Currency"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="分支机构额度管控历史">
        <yu-panel title="查询条件" panel-type="simple">
          <yu-xform related-table-name="refBackTable" ref="searchFormHis" v-model="searchBackFormdata" label-width="120px">
            <yu-xform-group :column="2">
              <yu-xform-item label="机构号" name="orgId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item name="orgIdName" ctype="YuXorg" @select-fn="commonSelectFnHis" :mapping="{'orgId':'orgId','orgIdName':'orgIdName'}" label="机构名称" ></yu-xform-item>
              <yu-xform-item label="更新日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="更新日期" name="batDate"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn('his')">查询</yu-button>
            <yu-button type="primary" @click="resetFn('his')">重置</yu-button>
          </div>
        </yu-panel>
        <yu-panel title="分支机构额度管控历史列表" panel-type="simple">
          <yu-button-drop>
            <yufp-excel-export :export-url="excelExportUrlHis" title="导出" :export-param="{condition: JSON.stringify()}"></yufp-excel-export>
          </yu-button-drop>
          <yu-xtable ref="refBackTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataBackUrl"
            :base-params="backParam" request-type="POST" :default-load="false">
            <yu-xtable-column label="分支机构" prop="orgIdName"></yu-xtable-column>
            <yu-xtable-column label="上月末对公贷款余额（万元）" prop="lastMonthComLoanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="当月可净新增对公贷款投放金额（万元）" prop="currMonthAllowComAddAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="月末对公贷款余额测算（万元）" prop="curMonthComLoanBalancePlan" :formatter="Currency">
              <template slot-scope="scope">
                <span>{{ Currency(parseFloat(scope.row.lastMonthComLoanBalance + scope.row.currMonthAllowComAddAmt).toFixed(2)) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="上一日对公贷款余额（万元）" prop="lastDayComLoanBalance" :formatter="Currency"></yu-xtable-column>
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

// yufp.lookup.reg('STD_ZB_LMT_WHITE_TYPE,STD_ZB_INTBANK_TYPE,STD_ZB_OPR_TYPE,STD_ZB_INSTU_CDE');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';


export default {
  components: { YufpDemoSelector, YufpExcelExport },
  mixins: [mixinForm, mixin],
  data: function () {
    return {
      searchInfoFormdata: {},
      searchBackFormdata: {},
      dataInfoUrl: this.$backend.cmisLmt + '/api/manaorglmt/selectbymodel2',
      infoParam: {condition: { oprType: '01' }},
      dataBackUrl: this.$backend.cmisLmt + '/api/manaorglmthis/selectbymodel',
      backParam: {condition: { oprType: '01' }},
      excelExportUrl: backend.cmisLmt + '/api/manaorglmt/exportmanaorglmt',
      excelExportUrlHis: backend.cmisLmt + '/api/manaorglmthis/exportmanaorglmthis',
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
          title: '修改分支机构额度管控信息',
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
      var strurl = backend.cmisLmt + '/api/manaorglmt/update';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
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
          title: '查看分支机构额度管控信息',
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
          title: '查看分支机构额度管控历史',
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
              url: backend.cmisLmt + '/api/manaorglmt/update',
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
        if (_this.searchBackFormdata.orgId == '' && (_this.searchBackFormdata.batDate == '' || _this.searchBackFormdata.batDate == null)) {
          _this.$message({ message: '请先选择查询条件', type: 'warning'});
          return;
        }
        // 当筛选条件有值且更新日期为空的时候，默认更新日期为当前日期减一天查询
        if (_this.searchBackFormdata.orgId !== '' && (_this.searchBackFormdata.batDate == '' || _this.searchBackFormdata.batDate == null)) {
          _this.searchBackFormdata.batDate = new Date(new Date(openday).getTime() - 86400000);
        }
        _this.$refs.refBackTable.remoteData({ condition: JSON.stringify(_this.searchBackFormdata) });
      } else {
        if (_this.searchInfoFormdata.orgId == '') {
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
        _this.searchBackFormdata.orgId = '';
        _this.searchBackFormdata.orgIdName = '';
        _this.searchBackFormdata.batDate = '';
      } else {
        // 清空条件
        _this.searchInfoFormdata.orgId = '';
        _this.searchInfoFormdata.orgIdName = '';
      }
    },

    /** 参照公共的确认事件 */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'orgIdName') {
            this.searchInfoFormdata[mapping[item]] = data.orgName;
          } else if (item === 'orgId') {
            this.searchInfoFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'orgIdName') {
            this.searchInfoFormdata[item] = data.orgName;
          } else if (item === 'orgId') {
            this.searchInfoFormdata[item] = data.orgCode;
          }
        }
      }
    },

    /** 参照公共的确认事件 */
    commonSelectFnHis: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'orgIdName') {
            this.searchBackFormdata[mapping[item]] = data.orgName;
          } else if (item === 'orgId') {
            this.searchBackFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'orgIdName') {
            this.searchBackFormdata[item] = data.orgName;
          } else if (item === 'orgId') {
            this.searchBackFormdata[item] = data.orgCode;
          }
        }
      }
    }
  }
};
</script>
