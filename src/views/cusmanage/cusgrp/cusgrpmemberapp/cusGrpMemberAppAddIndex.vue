<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusGrpMemberAppAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 李召星
       * 集团成员客户新增
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 流水号
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 获取集团申请流水号，成员新增添加进去
      this.d1_BillCard.setBillCardItemValue('serno', this.pageParams.serno);
      // 获取集团客户编号，成员新增默认
      this.d1_BillCard.setBillCardItemValue('grpNo', this.pageParams.grpNo);
      // 设置变更类型默认状态 01-原有不变,02-本次新增
      this.d1_BillCard.setBillCardItemValue('modifyType', this.pageParams.modifyType);

      this.d1_BillCard.setBillCardItemValue('oprType', '01');

      // 如果是实体集团
      if (this.pageParams.cusGrpMemberAppAddIndex == '01') {
        // 成员默认为子公司
        this.d1_BillCard.setBillCardItemValue('grpCorreType', '2');
      } else {
        // 否则默认为普通成员
        this.d1_BillCard.setBillCardItemValue('grpCorreType', '4');
      }
    },

    // 保存方法
    doSave () {
      // 校验表单数据
      this.d1_BillCard.validateBillCardValue();

      // 获取客户状态
      // const cusRankCls = this.d1_BillCard.getBillCardItemValue('cusRankCls');

      // if (!(cusRankCls == '01' || cusRankCls == '02')) {
      //   this.$xutils.showMessage('成员客户必须是正式客户或临时客户!');
      //   return;
      // }

      // 校验成员是否允许添加
      if (this.valiCusGrpMemInfo()) {
        // 保存数据
        const rst = this.d1_BillCard.saveBillCardData();

        // 保存成功后，返回列表页面
        if (rst) {
          this.$xutils.showMsgBox('提示', '保存成功', 350, 150, () => {
            this.$dialog.close(this.dialogId);
          });
        }
      }
    },

    // 返回方法
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 校验该成员客户是否符合要求
    valiCusGrpMemInfo () {
      let flag = false;
      const param = this.d1_BillCard.getBillCardValue();

      // 调用后台代码，校验成员不允许存在在其他集团客户中（包含正式的集团客户、在途的）
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCus + '/api/cusgrpmemberapp/checkcusgrpmemapp',
        data: JSON.stringify(this.$xutils.toUpperCase(param, true)),

        success: (response, status, xhr) => {
          const data = response.data;

          if (data.rtnCode == 'ECS040000') {
            flag = true;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + data.rtnCode + ',错误信息：' + data.rtnMsg, 350, 200, () => {
              flag = false;
            });
          }
        },

        error: (result, b) => {
          // YuXP.showMsgBox('错误代码：' + data.rtnCode + ',错误信息：' + data.rtnMsg, 350, 200);
          this.$xutils.showMsgBox('错误代码提示', 350, 200); // 弹出提示
        }
      });

      return flag;
    }
  }
};
</script>
