<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusBatPubHandoverAppList_d1_BillList.vue';
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
    this.afterInit();
  },
  methods: {
    reloadData () {
      const params = { condition: {oprType: '01'}};
      this.d1_BillList.$refs.refTable.remoteData(params);
    },
    /**
       * 作者：李召星
       * 批量客户移交基本信息列表展示页面
       */
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    // 修改按钮对应得方法
    doUpdate () {
      // 获取选中一行记录数据
      const rowData = this.d1_BillList.getSelectedRowData();
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 批量状态为01 暂存才允许修改
      if (rowData.batchHandoStatus != '01') {
        this.$xutils.showMsgBox('提示', '批量移交状态为【暂存】才允许修改!');
        return;
      }
      // 定义参数，讲记录数据当作其中rowData 得value值
      // 添加参数op 当为update时，点击暂存调用更新操作
      rowData['op'] = 'edit';
      // 页面跳转
      this.$dialog.open(
        '',
        'cusmanage/cusHando/cusBatHando/cusBatPubHandoverAppUpdateIndex',
        1300,
        700,
        rowData,
        () => { this.reloadData() }
      );
    },

    // 对批量客户移交进行新增操作
    doAdd () {
      // 定义变量op 用于标识是新增还是修改，为新增时调用插入api
      const jsoPar = {'op': 'add'};
      // 页面跳转
      this.$dialog.open(
        '',
        'cusmanage/cusHando/cusBatHando/cusBatPubHandoverAppUpdateIndex',
        1300,
        700,
        jsoPar,
        () => { this.reloadData() }
      );
    },

    // 对批量客户进行查看操作
    doView () {
      // 获取选中一行记录数据
      const rowData = this.d1_BillList.getSelectedRowData();
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 添加参数op 当为update时，点击暂存调用更新操作
      rowData['op'] = 'details';
      // 页面跳转
      this.$dialog.open(
        '',
        'cusmanage/cusHando/cusBatHando/cusBatPubHandoverAppUpdateIndex',
        1300,
        700,
        rowData
      );
    },

    // 删除操作
    doDelete () {
      const par = this.d1_BillList.getSelectedRowData();
      if (par == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 批量状态为01 暂存才允许修改
      if (par.batchHandoStatus != '01') {
        this.$xutils.showMsgBox('提示', '批量移交状态为【暂存】才允许删除!');
        return;
      }
      const _this = this;
      _this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 获取删除记录
          this.$xutils.request({
            // 同步请求
            async: false,
            method: 'POST',
            url: this.$backend.cmisCus + '/api/cusbatpubhandoverapp/update',
            data: JSON.stringify({cbphaSerno: par.cbphaSerno, oprType: '02'}),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功');
                // 明细列表页面根据关联流水号查询
                this.reloadData();
              } else {
                this.$xutils.showMsgBox('提示', '查询失败');
              }
            },
            error: (result, b) => {}
          }, this);
        }
      });
    }
  }
};
</script>
