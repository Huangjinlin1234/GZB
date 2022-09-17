<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './evaloutorgsignoutadd_d1_BillCard.vue'
export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  provide(){
    let _this = this;
    return{
    onSave:_this.onSave,
    onClose:_this.onClose
    }
  },
  mounted() {
    let _this = this;
    _this.$lookup.reg("OUT_ORG_ASS_TYPE", "STD_ZB_PLD_AREA", "STD_ZB_ADMIT_STATE", "STD_ZB_OPR_TYPE")
    _this.AfterInit()
  },
  methods:{
    AfterInit() {
      let _this = this;
      _this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 隐藏字典中暂时不需要的内容
      _this.d1_BillCard.setSelectOptions('out_org_admit_status', 'hidden', '01');
  
      // 执行默认值公式
      _this.d1_BillCard.execBillCardDefaultValueFormula();
  
      // 设置外部评估机构退出管理新增页面字段展示
      _this.d1_BillCard.setBillCardItemEditable(
        'out_org_code;out_org_reg_code;eval_out_org_name;out_org_eval_type;reg_amtw;reg_amtw;eval_org_staff_qnt;out_org_reg_addr;out_org_link_name;out_org_link_phone;out_org_link_tel_no;eval_org_pld_area;out_org_admit_ord_id;curt_start_date;curt_end_date;out_org_mana_start_date;apti_indate;apti_enddate;out_org_code;admit_branch_name;',
        false
      );
  
      _this.d1_BillCard.setBillCardItemVisible('out_org_code', false);
      _this.d1_BillCard.setBillCardItemVisible('reg_code_show', true);
      _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_IN_BLACKLIST_RESN', false);
      _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_STATUS_DESC', false);
  
      // 添加CHANGE事件
      _this.d1_BillCard.addEditChangeAction(_this.onChange);
    },
  
    // 直接关闭
    onClose() {
      let _this = this;
      _this.$dialog.close(this.dialogId, {
        'CloseType': 'Cancel'
      });
    },
  
    // 保存并关闭
    onSave() {
      let _this = this;
      // 表单必填项的校验
      if (!_this.d1_BillCard.validateBillCardValue()) {
        return;
      }
  
      _this.d1_BillCard.updateBillCardData();
  
      // YuXP.showMsgBox('提示', '保存成功！');
     // _this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, _rt => {
     //   _this.$dialog.close(this.dialogId, {
     //     'CloseType': 'OK'
     //   });
     // });
  
      _this.$confirm('保存成功!', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        });


       _this.$dialog.close(this.dialogId, {
          'CloseType': 'OK'
        });
      // 刷新父级列表页面
      _this.$xutils.getParentPage(
        _this,
        'd1_BillList',
        'queryDataByCondition',
        ['out_org_admit_status in (\'02\',\'03\')']
      );
    },
  
    // change事件
    // 给页面虚拟的组织机构代码栏位赋予默认值，与组织机构代码一致
    onChange(thisCard, itemKey, oldValue, newValue) {
      let _this = this;
      if (itemKey == 'out_org_code' && itemKey != '') {
        _this.d1_BillCard.setBillCardItemValue('reg_code_show', newValue);
      }
  
      // 若准入状态发生改变，则判断是退出还是黑名单，展示出不同的说明窗口
      if (itemKey == 'out_org_admit_status' && newValue == '02') {
        // 退出
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_STATUS_DESC', true);
  
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_IN_BLACKLIST_RESN', false);
      }
  
      if (itemKey == 'out_org_admit_status' && newValue == '03') {
        // 黑名单
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_STATUS_DESC', false);
  
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_IN_BLACKLIST_RESN', true);
      }
    }
  }
};
</script>
