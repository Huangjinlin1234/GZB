<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './guarWarrantOutAppAdd_d1_BillCard.vue';
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
       * 权证出库自增引导页面
       */

    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 权证续借共用此页面,作此处理
      if (this.pageParams.warrantAppType == '03') {
        this.d1_BillCard.$refs.refForm.setItemHidden('warrantOutType', true);
        this.d1_BillCard.$refs.refForm.setItemHidden('warrantOutTypeSub', true);
        this.d1_BillCard.$refs.refForm.setItemHidden('preBackDate', false);
        this.d1_BillCard.$refs.refForm.setItemHidden('gagTyp', true);
        this.d1_BillCard.requiredFlag = false;
      } else if (this.pageParams.warrantAppType == '02') {
        this.d1_BillCard.$refs.refForm.setItemHidden('preBackDate', true);
        this.d1_BillCard.requiredFlag = true;
      }
    },

    /**
       * 下一步
       */
    doNext () {
      // 判断必输项
      var validate = false;
      this.$refs.d1_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const jsoPar = this.d1_BillCard.getBillCardValue();
      var warrantOutTypeSub = jsoPar.warrantOutTypeSub;

      if (warrantOutTypeSub == '04' || warrantOutTypeSub == '05') {
        var startTimeStamp = Date.parse(new Date(jsoPar.preBackDate));
        var endTimeStamp = Date.parse(new Date(this.getDate()));
        if (startTimeStamp < endTimeStamp) {
        //  this.$xutils.showMsgBox('提示', '归还日期应不小于当前日期', 350, 150);
        //  return;
        }

        //权证借阅校验权证是否为电子类
        //const checkFlag2 = this.getIsEWarrant(jsoPar.coreGuarantyNo);

        //if (!checkFlag2) {
        //  return;
        //}
      }

      //const checkFlag = this.checkIsOnTheWay(jsoPar.coreGuarantyNo);

      //if (!checkFlag) {
      //  return;
      //}

      var param;
      jsoPar['type'] = this.pageParams.type;
      jsoPar['warrantAppType'] = this.pageParams.warrantAppType;
      var title = '权证出库新增';
      if (this.pageParams.warrantAppType == '03') {
        title = '权证续借新增';
        param = JSON.stringify({'warrantNo': jsoPar.warrantNo, 'warrantAppType': '02', 'oprType': '01'});
        // 权证续借,从权证上一次出库申请中获取 权证出库原因大类、权证出库原因细类
        this.$request({
          url: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/queryList',
          method: 'post',
          data: {'condition': param}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.length === '0') {
            //  this.$xutils.showMsgBox('提示', '该权证没有出库记录,请重新选择!', 350, 150);
            //  return;
            }
            // 获取权证出库原因大类、权证出库原因细类
            jsoPar['warrantOutType'] = response.data[0].warrantOutType;
            jsoPar['warrantOutTypeSub'] = response.data[0].warrantOutTypeSub;
            jsoPar['coreGuarantyNo'] = response.data[0].coreGuarantyNo;
            this.$dialog.open(title, 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, jsoPar, () => {
              this.onClose()
            });
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else {
        this.$dialog.open(title, 'guarmanage/guarwarrant/guarwarrantout/guarWarrantOutAppFormIndex', -1, -1, jsoPar, () => {
              this.onClose()
            });
      }
    },

    selectGuar () {
      var _this = this;
      this.$dialog.open('权证列表', 'guarmanage/guarwarrant/guarwarrantout/warrantSelectIndex', 1000, 500, {warrantAppType: this.pageParams.warrantAppType}, function (rowData) {
        yufp.clone(rowData, _this.d1_BillCard.formdata);
        if(rowData.certiCatalog) {
          _this.d1_BillCard.setItemEditable('certiCatalog', false);
        }
        if(rowData.certiTypeCd) {
          _this.d1_BillCard.setItemEditable('certiTypeCd', false);
        }
      });
    },

    //获取权证是否为电子类
    getIsEWarrant (coreGuarantyNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarwarrantinfo/selectisewarrantbycoreguarantyno/' +
          coreGuarantyNo,

        success: (response, status, xhr) => {
          if (response.data == '1') {
              this.$xutils.showMsgBox('提示', '该权证为电子类，不允许借阅!', 350, 150);
          } else {
            returnData = true;
          }
        }
      });

      return returnData;
    },

    //检查该押品是否有在途的权证入库申请
    checkIsOnTheWay (coreGuarantyNo) {
      let returnData = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url:
          this.$backend.cmisBiz +
          '/api/guarwarrantmanageapp/checkcoreguarantynoisontheway/' +
          coreGuarantyNo,

        success: (response, status, xhr) => {
          if (response.data == 'noExist') {
              returnData = true;
          } else {
            this.$xutils.showMsgBox('提示', '该权证有在途的权证出库申请!', 350, 150);
          }
        }
      });

      return returnData;
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    },

    // 获取当前年月日
    getDate () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var month2 = month > 9 ? month : '0' + month;
      var day2 = day > 9 ? day : '0' + day;
      return year + '/' + month2 + '/' + day2;
    }
  }
};
</script>
