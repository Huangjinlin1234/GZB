<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusWebFinWhiteListAppList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 刘愿 网金客户白名单名单准入与停用申请
       *
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 修改
    doUpdate () {
      const par = this.d1_BillList.getSelectedRowData();
      par['op'] = 'update';

      this.$dialog.open(
        '网金客户白名单准入',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppUpdateIndex',
        -1,
        -1,
        par,
        () => {
          this.d1_BillList.queryDataByCondition('serno=\'' + this.getFactory().contextData.serno + '\'');
        }
      );
    },

    // 新增
    doAdd () {
      this.$dialog.open(
        '',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppAddIndex',
        900,
        500,
        null,
        null
      );
    },

    // 查看
    doView () {
      const par = this.d1_BillList.getSelectedRowData();
      par['op'] = 'view';

      this.$dialog.open(
        '修改调查',
        'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppUpdateIndex',
        -1,
        -1,
        par,
        () => {
          this.d1_BillList.queryDataByCondition('serno=\'' + this.getFactory().contextData.serno + '\'');
        }
      );
    }
  }
};
</script>
