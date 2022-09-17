<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
/**
 * 一般担保合同详情页面-模板工厂测试
 * @author liucheng3
 */
let jsoRowData; // 表格中选中行的当前数据

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit (data) {
      jsoRowData = data; // 先拿到入参中的当前行数据!!
      let op = this.pageParams.op;

      if (op == 'VIEW') {
        this.d1_BillCard = this.$refs.d1_BillCard;
      } else {
        this.d1_BillCard = this.$refs.d1_BillCard;
      }

      let strPkName = this.d1_BillCard.getTempletVO().pkname; // 主键字段名
      let strPkValue = jsoRowData[strPkName]; // 主键值

      // 表格查询数据!
      let strSQLWhere = strPkName + '=\'' + strPkValue + '\''; // 如果是联合主键则是拼接多个and条件

      this.d1_BillCard.queryDataByCondition(strSQLWhere); // 查询数据

      if (op == 'VIEW') {
        let templetItemVOs = this.d1_BillCard.templetItemVOs;

        for (let i = 0; i < templetItemVOs.length; i++) {
          let itemkey = templetItemVOs[i].itemkey;
          let card_isshow = templetItemVOs[i].card_isshow;
          // 卡片是否显示

          if (card_isshow == 'Y') {
            this.d1_BillCard.setBillCardItemEditable(itemkey, false);
          }
        }
      }
    },

    myItemEditAction (_billCard, _itemkey, _oldValue, _newValue) {},

    // 保存数据
    onSaveData () {
      // 调用卡片的保存方法,其中的校验逻辑!
      let dealResult = this.d1_BillCard.updateBillCardData();

      if (!dealResult) {
        return;
      }

      this.$xutils.showMsgBox('提示', dealResult.msg, 350, 150, _rt => {
        this.$dialog.close(this.dialogId, {
          'CloseType': 'OK'
        });
      });
    },

    // 直接关闭
    onCancel () {
      this.$dialog.close(this.dialogId, {
        'CloseType': 'Cancel'
      });
    },

    onTest888 () {
      // d1_BillCard.setBillCardItemErrorMsg("usercode",["不能为空!"]);
      // d1_BillCard.setBillCardItemErrorMsg("username",["不能大于5!","格式不对!"]);
      this.d1_BillCard.validateBillCardData();
    },

    onTest999 () {
      this.d1_BillCard.removeBillCardAllErrorMsg();
    }
  }
};
</script>