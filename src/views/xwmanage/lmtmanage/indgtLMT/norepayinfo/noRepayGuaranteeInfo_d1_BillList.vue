<template>
  <div>
    <yu-panel title="抵押物信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop show-length="8">
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')" v-if="showBtn">新增</yu-button>
          <yu-button type="primary" ref="btn_update" @click="customClick('update')" v-if="showBtn">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="customClick('deleteByPkId')" v-if="showBtn">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="customClick('view')">查看</yu-button>
          <yu-button type="primary" ref="btn_viewReport" @click="customClick('viewReport')" v-if="showBtn">查看报表</yu-button>
          <yu-button type="primary" ref="btn_viewGuar" @click="customClick('viewGuar')" v-if="showBtn">查看抵质押物评估信息</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST" :baseParams="baseParams">
        <yu-xtable-column label="业务编号" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="调查流水号" prop="surveySerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="抵押物类型" prop="pawnType" data-code="STD_PAWN_TYPE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="750px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
    <yu-xdialog :visible.sync="visiableCus" width="600px" title="抵质押物评估信息">
        <yu-xform v-model="dialogData" ref="dialogPg" label-width="120px" disabled="true">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" name="pkId" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label="楼盘名称" name="buildingName" ctype="input"></yu-xform-item>
            <yu-xform-item label="楼栋" name="building" ctype="input"></yu-xform-item>
            <yu-xform-item label="楼层" name="floor" ctype="input"></yu-xform-item>
            <yu-xform-item label="房间号" name="roomNo" ctype="input"></yu-xform-item>
            <yu-xform-item label="估价" name="assEvaAmt" ctype="input"></yu-xform-item>
            <yu-xform-item label="总价" name="totalAmt" ctype="input"></yu-xform-item>
            <yu-xform-item label="面积" name="squ" ctype="input"></yu-xform-item>
            <yu-xform-item label="地址" name="address" ctype="input"></yu-xform-item>
            <yu-xform-item label="查询人员" name="qryUser" ctype="input"></yu-xform-item>
            <yu-xform-item label="查询日期" name="qryDate" ctype="input"></yu-xform-item>
            <yu-xform-item label="查询人员工号" name="qryId" ctype="input"></yu-xform-item>
            <yu-xform-item label="电话" name="phone" ctype="input"></yu-xform-item>
            <yu-xform-item label="创建时间" name="createTime" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" name="updateTime" ctype="input" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './noRepayGuaranteeInfo_dialog_BillCard';
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      visiableCus: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/selectbyserno',
      baseParams: {},
      dialogData: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtguareinfo/delete/',
      showBtn: false
    };
  }
};
</script>
