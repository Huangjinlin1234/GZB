<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="查询条件" panel-type="simple">
      <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchFormdata" label-width="160px">
        <yu-xform-group :column="3">
          <yu-xform-item label="BIC CODE（分支行）" name="bicCode" ctype="input" placeholder="BIC CODE（分支行）"></yu-xform-item>
          <yu-xform-item label="机构名称" name="bankName" ctype="input" placeholder="机构名称" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="BIC CODE（总行）" name="superBicCode" ctype="input" placeholder="BIC CODE（总行）"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="button-group" align="center">
        <yu-button type="primary" @click="searchFn()">查询</yu-button>
        <yu-button type="primary" @click="resetFn()">重置</yu-button>
      </div>
    </yu-panel>
    <yu-panel title="境外金融同业配置" panel-type="simple">
      <yu-button-drop>
        <yu-button ref="btn_doAdd" type="primary" @click="doAdd">新增</yu-button>
        <yu-button ref="btn_doUpdae" type="primary" @click="doUpdate">修改</yu-button>
        <yu-button ref="btn_doDelete" type="primary" @click="doDelete">删除</yu-button>
        <yu-button ref="btn_doView" type="primary" @click="doView">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataInfoUrl"
        :base-params="infoParam" request-type="POST" :default-load="true">
        <yu-xtable-column label="BIC CODE（分支行）" prop="bicCode"></yu-xtable-column>
        <yu-xtable-column label="机构名称" prop="bankName"></yu-xtable-column>
        <yu-xtable-column label="BIC CODE（总行）" prop="superBicCode"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinForm from '@/utils/mixins/mixin-form';
// yufp.lookup.reg('STD_LMT_DISC_ORG_STATUS');

export default {
  components: { YufpDemoSelector },
  mixins: [mixinForm],
  data: function () {
    return {
      searchFormdata: {},
      searchBackFormdata: {},
      dataInfoUrl: this.$backend.cmisCfg + '/api/cfgbicbankinfo/selectbymodel',
      infoParam: {condition: { oprType: '01' }},
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
  created () {
  },
  mounted () {
  },
  methods: {

    /**
     * 新增
     */
    doAdd: function () {
      var _this = this;
      var model = {};
      var routeKey = 'cfgBicBankInfo' + model.bicCode + 'ADD';
      model.viewType = 'ADD';
      model.routeKey = routeKey;
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'cfgmanage/cfgBicBankInfo/cfgBicBankInfoDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '新增境外金融同业配置',
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
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var routeKey = 'cfgBicBankInfo' + selectionsAry[0].bicCode + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'EDIT';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'cfgmanage/cfgBicBankInfo/cfgBicBankInfoDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '修改境外金融同业配置',
          // 传递的业务数据，可选配置
          data: model
        });
      });
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
      var routeKey = 'cfgBicBankInfo' + selectionsAry[0].bicCode + 'DETAIL';
      model = selectionsAry[0];
      model.viewType = 'DETAIL';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'cfgmanage/cfgBicBankInfo/cfgBicBankInfoDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '查看境外金融同业配置',
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
              url: backend.cmisCfg + '/api/cfgbicbankinfo/update',
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
    searchFn: function () {
      let _this = this;
      var params = {
        bankName: _this.searchFormdata.bankName ? '%' + _this.searchFormdata.bankName + '%' : '',
        bicCode: _this.searchFormdata.bicCode ? _this.searchFormdata.bicCode : '',
        superBicCode: _this.searchFormdata.superBicCode ? _this.searchFormdata.superBicCode : ''
      };
      var param = {
        condition: JSON.stringify(params)
      };
      _this.$refs.refTable.remoteData({ condition: JSON.stringify(param) });
    },
    // 重置
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }
};
</script>
