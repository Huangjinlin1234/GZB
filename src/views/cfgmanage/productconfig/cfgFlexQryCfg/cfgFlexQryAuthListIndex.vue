<template>
  <yu-row :gutter="10">
    <yu-col :span="8">
      <div>
        <d1-a-billlist ref="d1_A_BillList"></d1-a-billlist>
      </div>
    </yu-col>
    <yu-col :span="16">
      <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
        <yu-button type="primary" @click="onSave">保存</yu-button>
      </div>
    </yu-col>
  </yu-row>
</template>
<script>
import d1ABilllist from './cfgFlexQryAuthList_d1_A_BillList.vue'
import d1BBilllist from './cfgFlexQryAuthList_d1_B_BillList.vue'
export default {
  components:{d1ABilllist, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillList: null,
      d1_B_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
         * 报表查询配置
       */
    AfterInit() {
      this.d1_A_BillList = this.$refs.d1_A_BillList;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
    },
    checkedD1BListData(params) {
      debugger;
      // 获取当前页数据
      let listData = this.d1_B_BillList.getBillListData();
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        type: 'POST',
        data: JSON.stringify(params),
        url: this.$backend.cmisCfg + '/api/cfgqryreportauth/queryReportListByRoleCode',
  
        success: (response, status, xhr) => {
          const selectRowlist = response.data;
          let rowIdList = '';
          debugger;
          for (let j = 0; j < listData.length; j++) {
            // 清除选中
            // this.d1_B_BillList.setSelectedRow(j + 1, false);
  
            for (let i = 0; i < selectRowlist.length; i++) {
              if (selectRowlist[i].qryCode == listData[j].qryCode) {
                debugger;
                // rowIdList = rowIdList + listData[j]._rowid + ',';
                this.d1_B_BillList.$refs.refTable.toggleRowSelection(listData[j], true);
              }
            }


          }
          debugger;
          // 添加选中
          // this.d1_B_BillList.setSelectedRowByPK(rowIdList);
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 保存
    onSave() {
      // 获取选中角色列表数据
      const selectedRoleRow = this.d1_A_BillList.getSelectedRowData();
  
      // 获取选中报表列表数据
      const selectedRepoRows = this.d1_B_BillList.getSelectedRowsData();
  
      // 当前登录用户信息
      const userInfo = this.$xutils.getLoginUserInfo();
  
      if (selectedRoleRow != null && selectedRepoRows != null) {
        const params = {
          'role_code': selectedRoleRow.roleCode,
          'row_data': selectedRepoRows,
          'input_id': userInfo.loginCode,
          'input_br_id': userInfo.orgCode,
          'input_date': this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
        };
  
        // 发送后台对权限数据进行维护
        this.$xutils.request({
          // 同步请求
          async: false,
  
          type: 'POST',
          data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
          url: this.$backend.cmisCfg + '/api/cfgqryreportauth/updateReportListByRoleCode',
  
          success: (response, status, xhr) => {
            if (response.code == '0') {
              this.$xutils.showMsgBox('提示', '报表权限维护成功！');
            } else {
              this.$xutils.showMsgBox('错误', '报表权限维护失败！失败原因：' + response.message);
            }
          },
  
          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      }
    }
  }
};
</script>
