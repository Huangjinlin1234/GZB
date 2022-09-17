<template>
  <d1-billlist ref="d1_BillList" ></d1-billlist>
</template>
<script>
import d1Billlist from './lmtGrpReplyAccList_d1_BillList.vue';
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
       * title 集团客户批复查询列表
       * author yangwl
       * date 2021-04-12
       * */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 查看批复详情
    replyDetail () {
      const jsoPar = this.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // jsoPar['grp_cus_id'] = jsoPar.grp_cus_id;
      jsoPar['op'] = 'VIEW';
      this.$dialog.open(
        '批复详情',
        'bizmanage/lmtBiz/lmtGrpReplyAcc/lmtGrpReplyAccDetailIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    },

    // 查看批复报告,根据批复号查询
    replyReport () {
      var _this = this;
      let params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + '对公授信批复(集团）.cpt&op=view&GRPREPLYSERNO=' + params.grpReplySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
