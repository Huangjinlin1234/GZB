<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIndivSocilaInfo_d1_BillCard.vue';
/*
 个人客户社会关系信息
 */


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
      let _this = this;
      const cusIdRel = _this.$route.params.cusId;
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 关联客户编号
      const pkId = this.$xutils.getSEQWithParamFromServer('INDIV_CUS_NO_SEQ');

      this.d1_BillCard.setBillCardItemValue('pkId', pkId);
      this.d1_BillCard.setBillCardItemValue('cusIdRel', cusIdRel);
      this.d1_BillCard.addEditChangeAction(this.certTypeChangeFn);
    },
    certTypeChangeFn (thisCard, itemKey, oldVal, newVal) {
      if(itemKey == 'certType'){
         this.d1_BillCard.formdata.certCode = '';
         this.d1_BillCard.formdata.name = '';
         this.d1_BillCard.formdata.cusId = '';
      }
    },
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
        url: this.$backend.cmisCus + '/api/cusindivsocial/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', response.data, 280, 140, () => {
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
    },

    // 定义树切换调用方法
    showAction () {},

    // 根据证件类型”、“证件号码”，点击【获取】按钮至ECIF系统查询本行存量客户
    onSerach () {
      const data = [];
      const cert_type = this.d1_BillCard.getItemValue('cert_type');
      const cert_no = this.d1_BillCard.getItemValue('cert_no');
      data['cert_type'] = cert_type;
      data['cert_no'] = cert_no;

      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusindivsocial/sendEcif',
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            const json = response.data;
            if (json != null && json != 'undefined') {
              if (json.cusId != null && json.cusId != 'undefined') {
                this.d1_BillCard.setBillCardItemValue('cus_id', json.cusId);
              }
              if (json.name != null && json.name != 'undefined') {
                this.d1_BillCard.setBillCardItemValue('name', json.name);
              }
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          //
        }
      });
    }
  }
};
</script>
