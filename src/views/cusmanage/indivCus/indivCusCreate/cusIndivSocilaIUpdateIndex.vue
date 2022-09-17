<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIndivSocilaIUpdate_d1_BillCard.vue';
/*
 个人客户社会关系信息
 */
let data = {};

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
    AfterInit () {
      data = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;

      if (data) {
        // 主键编号
        const pkId = data.pk_id;
        this.$utils.clone(data, this.d1_BillCard.formdata);
        this.$nextTick(function(){
          this.$nextTick(function(){
            this.d1_BillCard.addEditChangeAction(this.certTypeChangeFn);
          });
        });
        // this.d1_BillCard.queryDataByCondition('pk_id=' + '\'' + pkId + '\'');
        // 设置字段不可编辑
        if (data.op == 'VIEW') {
          this.d1_BillCard.setItemEditable('*');
        }
      }
    },
    certTypeChangeFn (thisCard, itemKey, oldVal, newVal) {
      if(itemKey == 'certType'){
         this.d1_BillCard.formdata.certCode = '';
         this.d1_BillCard.formdata.name = '';
         this.d1_BillCard.formdata.cusId = '';
      }
    },
    // 选取
    // doSerach() {
    //   this.$xutils.request({
    //     // 同步请求
    //     async: true,
    //     url: this.$backend.cmisCus + '/api/cusindiv/sendEcif',
    //     data: JSON.stringify(this.$xutils.toUpperCase(json, true)),
    //     success: (response, status, xhr) => {
    //       if (response.code == '0') {
    //         // 解析返回值
    //         const data = response.data;
    //         if (data != null && data != 'undefined') {
    //           // 自动刷新列表数据
    //           this.$xutils.showMsgBox('提示', '查询成功', 280, 140, () => {
    //             this.d1_BillCard.setBillCardItemValue('sex', data.sex);
    //             this.d1_BillCard.setBillCardItemValue('name', data.name);
    //             this.d1_BillCard.setBillCardItemValue('cus_id', data.cusId);
    //           });
    //         }
    //       } else {
    //         this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
    //         //
    //         // exit;// ajax中return不生效，可以用exit
    //       }
    //     },

    //     error: (result, b) => {
    //       this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
    //       //
    //     }
    //   });
    // },

    // 保存
    doSave () {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const Data = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusindivsocial/update',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', response.data, 500, 300, () => {
              this.doBack();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    doBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
