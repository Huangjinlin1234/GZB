<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="dozancun">暂存</yu-button>
        <yu-button type="primary" @click="doSubmit">提交</yu-button>
        <yu-button type="primary" @click="cancel">返回</yu-button>
      </yu-form-buttons>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './cusGuideAppUpdate_d1_A_BillCard.vue';
import d1BBilllist from './cusGuideAppUpdate_d1_B_BillList.vue';
/**
 详情界面
 */
let par = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 表单

      this.d1_A_BillCard.queryDataByCondition({serno: par.serno});

      this.d1_B_BillList.queryDataByCondition({serno: par.serno});
    },

    doSubmit () {
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
          if (response.code == '0') {
            _this.$xutils.showMsgBox('提示', '提交成功', 350, 150, function () {
              _this.$dialog.close(_this.dialogId);
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
    },

    // 选取申请
    onAdd () {
      this.$dialog.open('', 'cusmanage/cusRelevance/cusXuanQuIndex', 800, 600, {}, data => {
        const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息

        this.d1_A_BillCard.setBillCardItemValue(
          'serno',
          this.$xutils.dateFormat('yyyyMMddhhmmss', new Date()),
          this.$xutils.dateFormat('yyyyMMddhhmmss', new Date())
        );

        this.d1_A_BillCard.setBillCardItemValue('corre_no', data.cus_id, data.cus_id);
        this.d1_A_BillCard.setBillCardItemValue('corre_cus_name', data.cus_en_name, data.cus_en_name);
        this.d1_A_BillCard.setBillCardItemValue('input_id', jsoUser['loginCode'], jsoUser['loginCode']);
        this.d1_A_BillCard.setBillCardItemValue('input_br_id', jsoUser['orgCode'], jsoUser['orgCode']);

        this.d1_A_BillCard.setBillCardItemValue(
          'input_date',
          this.$xutils.dateFormat('yyyy-MM-dd', new Date()),
          this.$xutils.dateFormat('yyyy-MM-dd', new Date())
        );
      });
    },

    // 成员客户新增申请

    onAdd2 () {
      var _this = this;
      const jsoPar = _this.d1_A_BillCard.getBillCardValue();
      _this.$dialog.open('关联成员新增', 'cusmanage/cusRelevance/cusrelappIndex', 800, 600, jsoPar, (rtData) => {
        _this.d1_B_BillList.queryDataByCondition({'serno': rtData.serno});
      });
    },

    dozancun () {
      const reqData = this.d1_A_BillCard.getBillCardValue();

      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,

          url: this.$backend.cmisCus + '/api/cusrelcusapp/update',

          // data: JSON.stringify(YuXPUtil.toUpperCase(par, true)),
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

    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
