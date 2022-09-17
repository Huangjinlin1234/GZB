<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="showbtn">
        <yu-button type="primary" @click="dozancun">暂存</yu-button>
        <yu-button type="primary" @click="dotijiao">提交</yu-button>
        <yu-button type="primary" @click="cancel">返回</yu-button>
      </yu-form-buttons>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './cusGuideApp2_d1_A_BillCard.vue';
import d1BBilllist from './cusGuideApp2_d1_B_BillList.vue';
/**
  档案延期选取界面
*/
let par = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      showbtn: true,
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams || this.bizPageData.instanceInfo;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 表单
      if (this.pageParams) {
        this.d1_A_BillCard.setBillCardItemValue('serno', par.serno);
        this.d1_A_BillCard.setBillCardItemValue('corre_no', par.correNo);
        this.d1_A_BillCard.setBillCardItemValue('corre_cus_id', par.correCusId, par.correCusId);
        this.d1_A_BillCard.setBillCardItemValue('corre_cus_name', par.correCusName, par.correCusName);
        this.d1_A_BillCard.setBillCardItemValue('manager_id', par.managerId, par.managerId);
        this.d1_A_BillCard.setBillCardItemValue('belg_org', par.managerBrId, par.managerBrId);
        this.d1_A_BillCard.execBillCardDefaultValueFormula();
        this.d1_B_BillList.$refs.refTable.remoteData({condition:{serno: par.serno}});
      } else if (this.bizPageData) {
        this.showbtn = false;
        this.getInfo();
        this.d1_B_BillList.$refs.refTable.remoteData({condition:{serno: this.bizPageData.instanceInfo.bizId}});
      }
    },
    getInfo () {
      this.$request({
        url: this.$backend.cmisCus + '/api/cusrelcusapp/',
        method: 'post',
        data: {serno: this.bizPageData.instanceInfo.bizId}
      }).then((res) => {
        if (res.code == '0') {
          this.$utils.clone(res.data, this.d1_A_BillCard.formdata);
        }
      });
    },
    // 成员客户新增申请
    onAdd2 () {
      var _this = this;
      const jsoPar = this.d1_A_BillCard.getBillCardValue();
      this.$dialog.open('关联成员新增', 'cusmanage/cusRelevance/cusrelappIndex', 800, 600, jsoPar, function (rtData) {
        _this.d1_B_BillList.queryDataByCondition({'serno': rtData.serno});
      });
    },

    dozancun () {
      const reqData = this.$xutils.toUpperCase(this.d1_A_BillCard.getBillCardValue(), true);
      reqData['oprType'] = '01';
      reqData['appType'] = '01';

      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,

          // 新增
          url: this.$backend.cmisCus + '/api/cusrelcusapp/',

          data: JSON.stringify(reqData),

          success: (response, status, xhr) => {
            if (response.data) {
              this.$xutils.showMsgBox('提示', '暂存成功', 350, 150);
            } else {
              this.$xutils.showMsgBox('提示', response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        return;
      }
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    },

    dotijiao () {
      var _this = this;
      const saveFlag = _this.d1_A_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const reqData = _this.$xutils.toUpperCase(_this.d1_A_BillCard.getBillCardValue(), true);
      reqData['oprType'] = '01';
      reqData['appType'] = '01';

      _this.$xutils.request({
        // 同步请求
        async: false,

        // 新增
        url: _this.$backend.cmisCus + '/api/cusrelcusapp/doCusRelCusAppComit',

        data: JSON.stringify(reqData),

        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.$xutils.showMsgBox('提示', '提交成功', 350, 150, function () {
              _this.$dialog.close(_this.dialogId, 'success');
            });
          } else {
            console.log(response.message);
            _this.$message({message: response.erortx, type: 'error'});
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
