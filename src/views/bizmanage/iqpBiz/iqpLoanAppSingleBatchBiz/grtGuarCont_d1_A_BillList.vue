<template>
  <div>
    <yu-panel title="抵质押物列表" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_OnImport" @click="customClick('OnImport')" :hidden="btnflag">引入</yu-button>
          <yu-button type="primary" ref="btn_OnImport" @click="customClick('doUpdate')" :hidden="btnflag">修改</yu-button>
          <yu-button type="primary" ref="btn_OnImport" @click="customClick('doView')" >查看</yu-button>
          <yu-button type="primary" ref="btn_delete" @click="customClick('deleteGuar')" :hidden="btnflag">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :base-params="searchData" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" default-load="true" request-type="POST" >
        <yu-xtable-column label="押品编号" prop="guarNo">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewGuar(scope.row.guarNo)">{{ scope.row.guarNo }}</a>
            </template>
        </yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="guarTypeCd"></yu-xtable-column>
        <yu-xtable-column label="抵质押品所有人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="抵押物总价" prop="maxMortagageAmt" ></yu-xtable-column>
        <yu-xtable-column label="抵/质押率" prop="mortagageRate" ></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
export default {
  components: {guarBaseInfoView},
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      searchData: {condition: {
        serno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno
      }},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      btnflag: false,
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/querguarinforel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/'
    };
  },
  mounted () {
    var _this = this;
    var op = _this.$route.params.hasOwnProperty('op') ? _this.$route.params.op : 'VIEW';
    if (op != 'EDIT') {
      this.btnflag = true;
    }
  },
  methods: {
    viewGuar: function (data) {
      this.$refs.guarBaseInfoView.guarBaseinfoView(data);
    }
  }
};
</script>