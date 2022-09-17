<template>
  <yu-tabs type="card" >
    <yu-tab-pane label="待分配任务" >
      <d1-1-billlist ref="d1_1_BillList" name="1"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="已分配任务">
      <d1-2-billlist ref="d1_2_BillList" name="2"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './surveyTaskDivisList_d1_1_BillList.vue';
import d12Billlist from './surveyTaskDivisList_d1_2_BillList.vue';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dfp: null,
      yfp: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 小微功能管理--调查任务分配页面*/
    afterInit () {
      this.dfp = this.$refs.d1_1_BillList;
      this.yfp = this.$refs.d1_2_BillList;
      this.selectData();
    },

    /* 根据状态进行划分数据*/
    selectData () {
      // 进入时状态配置
      // 未分配

      // 已分配

    },


    /* 任务分配*/
    taskallocation () {
      const params = this.dfp.getSelectedRowData();
      // console.log(this.$refs);
      if (params == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }

      if (params.divisStatus != '101') {
        this.$xutils.showMsgBox('提示', '非未分配任务,请前往已分配任务界面重新分配!');
        return;
      }

      this.$dialog.open(
        '任务分配',
        'xwmanage/lmtmanage/surveyTaskDivis/taskAssignmentIndex',
        1000,
        450,
        {
          params
        },
        data => {
          this.dfp.$refs.refTable.remoteData();
          this.yfp.$refs.refTable.remoteData();
        }

      );
    },

    /* 重新分配*/
    taskallocation1 () {
      const param = this.yfp.getSelectedRowData();


      if (param == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      var params = {};

      yufp.clone(param, params);
      // params['divisStatus'] = '110';
      params.divisStatus = '110';
      this.$dialog.open('重新分配', 'xwmanage/lmtmanage/surveyTaskDivis/taskAssignmentIndex', 1000, 450, {
        params
      }, () => {
        this.dfp.$refs.refTable.remoteData();
        this.yfp.$refs.refTable.remoteData();
      });
    }
  }
};
</script>
