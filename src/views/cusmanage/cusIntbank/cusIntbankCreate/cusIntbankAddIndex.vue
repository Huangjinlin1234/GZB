<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIntbankAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      classData: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       *同业客户新增向导
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    // 下一步
    doNext () {
      var _this = this;
      const json = _this.d1_BillCard.formdata;
      yufp.clone(_this.pageParams, json);
      // 判断必输项
      const saveFlag = _this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      _this.getClassUrl(json.mrgCls);
      json['op'] = 'edit';
      // 操作类型 add edit 方便后面使用
      json['opT'] = 'add';
      _this.$dialog.open(
        _this.classData.desc,
        _this.classData.url,
        1000,
        800,
        json,
        () => {
          this.$dialog.close(_this.dialogId);
        }
      );
    },

    // 根据高管类别获取跳转路径
    getClassUrl (mrgCls) {
      var data = {};
      data['01'] = {'desc': '高管信息新增法人代表', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd1Index'};
      data['02'] = {'desc': '高管信息新增控制人', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd2Index'};
      data['03'] = {'desc': '高管信息新增经办人', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd3Index'};
      data['04'] = {'desc': '高管信息新增受益人', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd4Index'};
      this.classData = data[mrgCls];
    },
    doBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
