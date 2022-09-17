<template>
  <div>
    <div style="display:inline-block;width:25%">
        <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
  <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
    <div style="display:inline-block;width:calc(100% - 25%)">
        <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
  <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1BBillcard from './cusIntbankDefendInfo_d1_B_BillCard.vue';
import d1BBilllist from './cusIntbankDefendInfo_d1_B_BillList.vue';
/**
 * 机构基础信息
 * @constructor
 */
let param = null;

export default {
  components: {d1BBillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_B_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      param = this.pageParams;
      this.$xutils.createLeftMenu('d1_A', ['同业客户.机构基本信息', '同业客户.高管人员信息'], this.myClickMenu);
    },

    myClickMenu (_menuNo, _menuText, _dom) {
      if (_menuText == '机构基本信息') {
        this.d1_B_BillCard = this.$refs.d1_B_BillCard;

        // 执行默认值公式!!同步请求!!
        this.d1_B_BillCard.execBillCardDefaultValueFormula();

        this.d1_B_BillCard.setBillCardItemValue('social_credit_code', param.social_credit_code, param.social_credit_code);
      } else if (_menuText == '高管人员信息') {
        this.d1_B_BillList = this.$refs.d1_B_BillList;
      }
    },

    doAdd () {
      this.$dialog.open(
        '高管新增向导',
        'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAddIndex',
        -1,
        -1,
        null,
        () => {}
      );
    },

    // 暂存
    save () {
      const resp = this.d1_B_BillCard.insertBillCardData();

      if (resp.code == 'ok') {
        this.$xutils.showMsgBox('提示', '暂存成功!');
        this.$xutils.getParentPage('d1_BillList', 'queryDataByCondition');
      } else {
        this.$xutils.showMsgBox('提示', '暂存失败', 350, 200);
      }
    },

    commit () {
      // alert('开发中。。。');
    },

    // 返回
    doBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
