<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusLstGlfList_d1_BillList.vue';
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
       * 关联方名单列表
       *  @author 刘权
       */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 跳转到名单管理界面
    rosterManage () {
      this.$dialog.open(
        '关联方名单管理',
        'cusmanage/cusLstGlfManage/cusLstGlfRosterManageIndex',
        900,
        750,
        null,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 批量导入
    byImport () {},

    // 模板下载
    byModelDown () {},

    // 一键获取客户编号
    getCusNo () {
      this.$request({
        method: 'post',
        url: backend.cmisCus + '/api/cuslstglf/updatecusid',
        data: {}
      }).then((response) => {
        if (response.code == '0') {
          this.$message('操作成功');
        }
      });
    }
  }
};
</script>
