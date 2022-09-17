<template>
  <div>
    <yu-panel title="优农贷名单准入申请"  panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
          <yu-button type="primary" ref="btn_byadd" v-if="checkCtrl('add')" @click="customClick('byadd')">新增</yu-button>
          <yu-button type="primary" ref="btn_byupdate" v-if="checkCtrl('edit')" @click="customClick('byupdate')">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('view')" @click="onView">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="流水号" prop="serno" width="300"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName" width="150"></yu-xtable-column>
        <yu-xtable-column label="身份证号码" prop="certCode" width="150"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="mobileNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="sex" data-code="STD_ZB_SEX"></yu-xtable-column>
        <yu-xtable-column label="学历" prop="edu" data-code="STD_ZB_EDU"></yu-xtable-column>
        <yu-xtable-column label="有无子女" prop="isHaveChildren" data-code="STD_IS_HAVE_CHILDREN"></yu-xtable-column>
        <yu-xtable-column label="本地户口" prop="localRegist" data-code="STD_CUS_LOCAL_REGIST"></yu-xtable-column>
        <yu-xtable-column label="经营地址" prop="operAddr"></yu-xtable-column>
        <yu-xtable-column label="经营年限" prop="operLmt"></yu-xtable-column>
        <yu-xtable-column label="婚姻状况" prop="marStatus" data-code="STD_ZB_MAR_ST"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huserName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrgName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYndListInfoList_dialog_BillCard';
yufp.lookup.reg('STD_ZB_SEX,STD_ZB_EDU,STD_IS_HAVE_CHILDREN,STD_CUS_LOCAL_REGIST,STD_ZB_MAR_ST,STD_ZB_APPR_STATUS');
export default {
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstyndapp/query',
      baseParams: {sort: 'updateTime desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyndapp/delete/'
    };
  },
  methods: {
    onView () {
      // 获取选中的数据
      //const selection = this.$refs.refTable.selections[0];//此处应该使用clone，不应该直接赋值，不然会导致在下面代码中selection增加属性同样会带到selections[0]中！！！！！
      var selection = {};
      yufp.clone(this.$refs.refTable.selections[0], selection);

      if (!selection) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 申请-修改模板组
      selection['model_group_no'] = 'CMG000020';
      selection['op'] = 'VIEW';
      selection['opType'] = 'edit';
      selection['img_para'] = [
        {
          top_outsystem_code: 'YNDYX',
          index: {
            docid: selection.serno,
            custid: selection.cusId
          }
        }
      ];
      selection['img_authority'] = 'view';
      // 绘制修改页面
      this.$dialog.open(
        '优农贷名单准入查看',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        selection,
        null
      );
    }
  }
};
</script>
