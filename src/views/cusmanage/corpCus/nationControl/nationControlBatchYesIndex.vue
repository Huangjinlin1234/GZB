<template>
  <div>
    <div style="height: 300px;text-align:center;margin-top:10px">
      <d1-a-billlist ref="d1_A_BillList" style="margin-bottom:10px"></d1-a-billlist>
      <yu-button @click="convert()" type="primary">确认转换</yu-button>
      <yu-button @click="back()" type="primary">返回</yu-button>
    </div>
    <div style="height: calc(100% - 300px)">
      <div style="display:table;height:100%;margin:0 auto">
      </div>
    </div>
  </div>
</template>
<script>
import d1ABilllist from './nationControlBatchYes_d1_A_BillList.vue';
export default {
  components: { d1ABilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 国控类标识批量转是
     * @constructor
     */

    AfterInit () {
      const param = this.pageParams || [];
      this.d1_A_BillList = this.$refs.d1_A_BillList;
      for (let i = 0; i < param.length; i++) {
        param[i].isNatctl = 1;
        this.d1_A_BillList.addRowData(i, param[i]);
      }
    },

    // 确认，批量转是
    convert () {
      const data = this.d1_A_BillList.getBillListData(); // 获得数据
      const date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()); // 获取当前时间
      const userInfo = this.$xutils.getLoginUserInfo(); // 获取登陆人信息
      const jsonData = []; // 创建一个数组仓库

      for (let i = 0; i < data.length; i++) {
        data[i].isNatctl = '1';
        data[i].updateTime = date; // 修改时间
        data[i].updId = userInfo.loginCode; // 更新人
        data[i].updBrId = userInfo.orgCode; // 更新机构
        data[i].updDate = date; // 更新时间
        const rowData = this.$xutils.toUpperCase(data[i], true);
        jsonData.push(rowData); // 对象放入数组仓库中
      }
      const rsPars = {};
      this.$xutils.request({
        url: this.$backend.cmisCus + '/api/cuscorp/batchupdateselective',
        data: JSON.stringify(jsonData),

        success: (response, status, xhr) => {
          // console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
          if (response.data != null) {
            rsPars['data'] = response.data;
            if (rsPars['data'] == 1) {
              this.$xutils.showMsgBox('提示', '批量转换成功', 400, 300, () => {
                this.$dialog.close(this.dialogId);
              });
            } else {
              this.$xutils.showMsgBox('提示', '批量转换失败！', 400, 300, () => {
                this.$dialog.close(this.dialogId);
              });
            }
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.data.status + '；错误信息：' + result.message); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });
    },

    // 返回
    back () {
      // this.$xutils.getParentPage('d1_BillList', 'queryDataByCondition', [
      //   "CUS_CATALOG = '1'",
      // ])
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
