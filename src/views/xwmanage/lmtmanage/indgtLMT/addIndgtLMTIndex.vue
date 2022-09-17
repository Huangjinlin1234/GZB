<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './addIndgtLMT_d1_BillCard.vue';
/* 新增界面 下一步/取消按钮*/

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      addPrd: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.addPrd = this.$refs.d1_BillCard;
      // this.d1_BillCard.addEditChangeAction(this.change);
    },

    /* 下一步按钮*/
    doNextStep () {
      let params = this.addPrd.getBillCardValue();
      if (params.cusId == '' || params.cusId == null || params.prdId == '' || params.prdId == null) {
        this.$message({message: '请选择客户或产品'});
        return;
      }

      // 修改按钮状态
      this.addPrd.buttonLoading = true;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/installonedata',
        data: params
      }).then(({res, message, data}) => {
        if (data == null) {
          this.$xutils.showMsgBox('提示', '新增失败!');
          this.addPrd.buttonLoading = false;
          return;
        }
        this.addPrd.buttonLoading = false;
        // yufp.clone(data, params);
        this.$xutils.showConfirmBox('提示', '新增成功,进入详细页面', 400, 200, _isOK => {
          if (_isOK) {
            if (data.surveyType == '11') {
            // 经营性（四）
              data['model_group_no'] = 'CMG000262';
              data['op'] = 'VIEW';
              // 添加类型 PageType="02" 属于新增
              data['PageType'] = '02';

              this.$router.addTab({
                name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                key: new Date().getTime,
                title: '查看调查报告',
                data: data

              });
              this.$dialog.close(this.dialogId);
            }
          } else {
            this.$dialog.close(this.dialogId);
          }
        });
      });
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    },

    change (thisCard, itemKey, oldValue, newValue) {
      if (itemKey == 'surveyType') {
        if (newValue == '') {
          this.$xutils.showMsgBox('提示', '目前只支持惠享贷!');
        }
      }
    },

    // 单击下一步的时候 新增一条数据
    saveOne (params) {

    }
  }
};
</script>
