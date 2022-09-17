<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 福费廷合同 待签合同列表  历史合同列表
  -->
  <div class="tab-search">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">

          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" ref="refForm">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户名称" placeholder="模糊查询"  ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="模糊查询"  ctype="input" name="contNo" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="模糊查询"  ctype="input" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="合同状态" placeholder="合同状态"  ctype="select" name="contStatus" data-code="STD_CONT_STATUS"  :datacode-filter="datacodeFilterFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-panel title="福费廷合同列表" :hideFilter="false" :collapseHide="false">
          <yu-toolbar>
            <yu-button @click="infoFn" type="primary">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" request-type="POST">
            <yu-xtable-column label="流水号" prop="serno" width:="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width:="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同币种" prop="curType" width:="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="合同金额（元）" prop="contAmt" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="contStartDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="contEndDate" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" width:="120"></yu-xtable-column>
            <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS" width:="120"></yu-xtable-column>
          </yu-xtable>
          </yu-panel>
        </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CONT_STATUS,STD_ZB_YES_NO,STD_ZB_CONT_TYPE,STD_ZB_CUR_TYP');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/ctrloancont/forftin/tosignlist',
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
      jsoPar['iqpSerno'] = jsoPar.serno;
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
    }
  }
};

</script>
