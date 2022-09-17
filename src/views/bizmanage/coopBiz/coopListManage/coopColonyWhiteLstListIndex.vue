<template>
  <d1-billlist ref="billList"></d1-billlist>
</template>
<script>
import d1Billlist from './coopColonyWhiteLstList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      billList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 集群白名单信息列表
    afterInit () {
      this.billList = this.$refs.billList;
    },
    doInsect () {
      this.$dialog.open(
        '集群白名单新增页面',
        'bizmanage/coopBiz/coopListManage/coopColonyWhiteLstInsectListIndex',
        '880',
        '550',
        null,
        () => {
          this.billList.$refs.refTable.remoteData();
        }
      );
    },
    doDelete () {
      var _this = this;
      const params = _this.billList.getSelectedRowData();
      if (params == null || params == '') {
        _this.$xutils.showMsgBox('提示', '请选择一条数据');
        return;
      }
      const oprType = params.oprType;
      // appr_status 审批状态  000-待发起 992-退回
      if (oprType != '01') {
        _this.$xutils.showMsgBox('提示', '只能删除操作类型为新增的客户');
        return;
      } else {
         this.$confirm("您确定需要删除记录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }).then(function () {
          _this.$xutils.request({
          // 同步请求
          async: false,
          url: _this.$backend.cmisBiz + '/api/coopcolonywhitelst/updateSelective',
          data: JSON.stringify({pkId:params.pkId, oprType:'02'}),
          type: 'post',
          success: (response, status, xhr) => {            
            if (response.code == '0') {
              _this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                // 列表刷新
                _this.billList.queryDataByCondition();
              });
            } else {
              _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          }
          });          
        });        
      }
    }
  }
};
</script>
