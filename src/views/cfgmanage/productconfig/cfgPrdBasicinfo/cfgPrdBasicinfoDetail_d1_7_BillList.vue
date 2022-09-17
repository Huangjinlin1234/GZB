<template>
  <div>
    <yu-panel title="产品经理列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="产品经理代码" icon="search" placeholder="产品经理代码" @click.native="selectFn" name="userId"></yu-xform-item> <!-- ctype="yu-xuser"-->
          <yu-xform-item label="产品经理名称" ctype="input" placeholder="产品经理名称" name="userName" disabled ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="false">
        <yu-xtable-column label="产品经理代码" prop="userId"></yu-xtable-column>
        <yu-xtable-column label="产品经理名称" prop="userName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard-tab7 ref="dialog_BillCard" :prdId="pageParams.prdId"></dialog-billcard-tab7>
    </yu-xdialog> -->


     <yu-xdialog :visible.sync="visiable" :width="width" title="产品经理">
        <yu-xform form-type="search" v-model="searchFormdata1" label-width="60px" related-table-name="refTable1">
          <yu-xform-group :column="3">
            <yu-xform-item label="产品经理代码" ctype="input" name="userId" placeholder="产品经理代码" ></yu-xform-item>
            <yu-xform-item label="产品经理名称" ctype="input" placeholder="产品经理名称" name="userName" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable1" :row-number="true" condition-key="condition" selection-type="radio"  @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
          <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
          <yu-xtable-column label="产品经理代码" prop="userId"></yu-xtable-column>
          <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
          <yu-xtable-column label="产品经理名称" prop="userName" disabled></yu-xtable-column>
          <yu-xtable-column label="操作类型" prop="oprType" data-code="STD_ZB_OPR_TYPE"></yu-xtable-column>
          <yu-xtable-column label="用户筛选条件(勿删)" prop="refUserid" hide-column></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcardTab7 from './cfgPrdBasicinfoDetail_dialog_BillCard_tab7';
export default {
  name: 'D17BillList',
  components: { dialogBillcardTab7 },
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  mounted () {
  //  this.searchFormdata = { prdId: this.pageParams.prdId };
    this.$lookup.reg('DATA_STS', 'STD_ZB_YES_NO', 'STD_ZB_PUTOUT_TYP', 'STD_ZB_OPR_TYPE', 'STD_ZB_APPLY_RANGE', 'STD_ZB_APPLY_TYP', 'STD_ZB_CHNL_SOUR', 'STD_ZB_FILE_TYPE');
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.prdId = this.prdId;
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    },
    confirmFn () {
      this.searchFormdata.userId = this.$refs.refTable1.selections[0].userId;
      this.searchFormdata.userName = this.$refs.refTable1.selections[0].userName;
      this.visiable = false;
    },
    clearFn () {
      this.visiable = false;
    },
    selectFn () {
      this.visiable = true;
    }
  },
  data: function () {
    return {
      visiable: false,
      pkField: 'pkId',
      dialogTitle: '新增',
      searchFormdata: {},
      searchFormdata1: {},
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgprduserrel/',
      // 表格中传出id数据的key
      queryCode: 'userId',
      // 表格中显示到input框中的字段key
      textCode: 'userName',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprduserrel/delete/'
    };
  }
};
</script>
