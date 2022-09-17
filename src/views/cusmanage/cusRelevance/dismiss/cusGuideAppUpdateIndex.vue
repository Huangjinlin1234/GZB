<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="dozancun"  v-show="showAble">暂存</yu-button>
        <yu-button type="primary" @click="doSubmit"  v-show="showAble">提交</yu-button>
        <yu-button type="primary" @click="cancel"  v-show="showAble">返回</yu-button>
      </yu-form-buttons>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import d1ABillcard from './cusGuideAppUpdate_d1_A_BillCard.vue';
import d1BBilllist from './cusGuideAppUpdate_d1_B_BillList.vue';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
/**
 详情界面
 */
let par = {};

export default {
  components: {d1ABillcard, d1BBilllist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      showAble: true,
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
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 表单
      if (this.bizPageData) {
        par = this.wfData.instanceInfo;
        this.showAble = false;
        this.d1_B_BillList.setBillListButtonVisable('$query', false);
      } else {
        par = this.pageParams;
      }

      this.d1_A_BillCard.queryDataByCondition({serno: par.serno});

      this.d1_B_BillList.queryDataByCondition({serno: par.serno});
    },

    doSubmit () {
      const saveFlag = this.d1_A_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const reqData = this.$xutils.toUpperCase(this.d1_A_BillCard.getBillCardValue(), true);
      reqData['oprType'] = '01';
      reqData['appType'] = '03';


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
      wfInitData.bizType = 'KH012';
      wfInitData.userId = this.userCode;
      wfInitData.bizUserName = reqData.correCusName;
      wfInitData.bizUserId = reqData.correCusId;
      wfInitData.param = {
        orgType: this.org.orgType
      };
      this.$refs.yufpNwfInit.wfInit(wfInitData);
    },

    // 选取申请
    onAdd () {
      this.$dialog.open('', 'cusmanage/cusRelevance/dismiss/cusXuanQuIndex', 800, 600, {}, data => {
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
      this.$dialog.open('关联成员新增', 'cusmanage/cusRelevance/dismiss/cusrelappIndex', 800, 600, {}, () => {
        this.d1_B_BillList.queryDataByCondition();
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
              this.$dialog.close(this.dialogId);
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
    },

    submitSuccess () {
      this.$dialog.close(this.dialogId, 'success');
    }
  }
};
</script>
