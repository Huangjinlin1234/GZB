<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="dozancun">暂存</yu-button>
        <yu-button type="primary" @click="dotijiao">提交</yu-button>
        <yu-button type="primary" @click="cancel">返回</yu-button>
      </yu-form-buttons>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import d1ABillcard from './cusGuideApp2_d1_A_BillCard.vue';
import d1BBilllist from './cusGuideApp2_d1_B_BillList.vue';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
/**
  档案延期选取界面
*/
let par = {};

export default {
  components: {d1ABillcard, d1BBilllist, yufpNwfInit},
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
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 表单
      this.d1_A_BillCard.execBillCardDefaultValueFormula();
      // this.d1_A_BillCard.setBillCardItemValue('belg_org', par.managerBrId);
      this.d1_A_BillCard.queryDataByCondition({serno: par.serno}, 'get', () => {
        this.d1_A_BillCard.formdata.belgOrg = par.managerBrId;
      });
      this.d1_B_BillList.queryDataByCondition({serno: par.serno});
    },

    // 成员客户新增申请
    onAdd2 () {
      var _this = this;
      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      this.$dialog.open('关联成员新增', 'cusmanage/cusRelevance/modify/cusrelappIndex', 800, 600, jsoPar, function (rtData) {
        _this.d1_B_BillList.queryDataByCondition({'serno': rtData.serno});
      });
    },

    dozancun () {
      const reqData = this.$xutils.toUpperCase(this.d1_A_BillCard.getBillCardValue(), true);
      reqData['oprType'] = '01';
      reqData['appType'] = '02';

      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,

          // 新增
          url: this.$backend.cmisCus + '/api/cusrelcusapp/',

          data: JSON.stringify(reqData),

          success: (response, status, xhr) => {
            if (response.data) {
              this.$xutils.showMsgBox('提示', '暂存成功');
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
      const saveFlag = this.d1_A_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }

      const reqData = this.$xutils.toUpperCase(this.d1_A_BillCard.getBillCardValue(), true);
      reqData['oprType'] = '01';
      reqData['appType'] = '02';


      this.$xutils.request({
        // 同步请求
        async: false,

        // 新增
        url: this.$backend.cmisCus + '/api/cusrelcusapp/',

        data: JSON.stringify(reqData),

        success: (response, status, xhr) => {
          if (response.data) {
            console.log('暂存成功');
          } else {
            console.log(response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      let wfInitData = {};
      wfInitData.systemId = 'cmis';
      wfInitData.orgId = this.org.code;
      wfInitData.bizId = reqData.serno;
      wfInitData.bizType = 'KH011';
      wfInitData.userId = this.userCode;
      wfInitData.bizUserName = reqData.correCusName;
      wfInitData.bizUserId = reqData.correCusId;
      wfInitData.param = {
        orgType: this.org.orgType
      };
      this.$refs.yufpNwfInit.wfInit(wfInitData);
    },

    submitSuccess () {
      this.$dialog.close(this.dialogId, 'success');
    }
  }
};
</script>
