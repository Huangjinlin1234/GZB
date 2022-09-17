<template>
  <div>
    <yu-row>
      <yu-form-buttons class="yubfp-button-group">
        <yu-button type="primary" @click="batchApply">待处理 {{ count }} 笔</yu-button>
        <yu-button type="primary" @click="viewHistory">历史查看</yu-button>
      </yu-form-buttons>
    </yu-row>
    <yu-row>
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </yu-row>
  </div>
</template>
<script>
import d1BBillcard from './cusIntbankCreate_d1_B_BillCard.vue';
import { clone } from '@/utils';
export default {
  components: {d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_B_BillCard: null,
      count: 0
    };
  },
  mounted () {
    this.AfterInit();
    this.d1_B_BillCard = this.$refs.d1_B_BillCard;
    this.d1_B_BillCard.execBillCardDefaultValueFormula();
  },
  methods: {
    /**
       * 同业客户创建向导界面
       *
       */
    AfterInit () {
      // 业务类型 C01同业客户创建
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'C01', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
            this.d1_B_BillCard = this.$refs.d1_B_BillCard;
            this.d1_B_BillCard.setBillCardItemValue('bizType', 'C01');
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 待处理
    batchApply () {
      const json = this.d1_B_BillCard.getBillCardValue();
      json['bizType'] = 'C01';

      // this.$dialog.open(
      //   '同业客户创建申请待处理',
      //   'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankSolveIndex',
      //   -1,
      //   -1,
      //   json,
      //   () => {}
      // );

      let name = 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankSolveIndex';
      let key = 'cusmanage' + json.bizType;
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '客户日常管理任务',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    // 历史查看
    viewHistory () {
      const json = this.d1_B_BillCard.getBillCardValue();
      json['bizType'] = 'C01';

      // this.$dialog.open(
      //   '同业客户创建历史查看',
      //   'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankHisIndex',
      //   -1,
      //   -1,
      //   json,
      //   () => {}
      // );

      let name = 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankHisIndex';
      let key = 'custom_' + json.cusId;
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '同业客户历史查看',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    // 下一步
    doNext () {
      const json = this.d1_B_BillCard.getBillCardValue();
      var data;
      json['certCode'] = json.socialCreditCode.toUpperCase();
      if(json.certType === 'R' && json.socialCreditCode.length !== 18) {
        this.$message({ message: '请输入正确的统一社会信用代码', type: 'error' });
        return
      }
      // 业务类型 C01 同业客户创建
      json['bizType'] = 'C01';
      // 判断必输项
      const saveFlag = this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      this.$request({
        url: this.$backend.cmisCus + '/api/cusintbank/openAccount',
        method: 'post',
        data: json
      }).then(
        (response) => {
          if (response.code == '0') {
            // 解析返回值
            if (response.data) {
              data = response.data;
              clone(data, json);
              // 类型区分
              // json['flag'] = 'add';
              // json['model_group_no'] = 'CMG000288';
              // json['op'] = 'ADD';
              // json['opType'] = 'edit';
              // this.$dialog.open(
              //   '同业客户创建',
              //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              //   -1,
              //   -1,
              //   json,
              //   () => {}
              // );


              let name = 'cusmanage/cusIntbank/cusIntbankCreate/CusIntbankCreateMain';
              let key = 'cusmanage' + json.cusId;
              json.key = `/${name}/${key}`;
              this.$router.addTab({
                // 路由名称
                name: name,
                // 自定义唯一页签key,请统一使用custom_前缀开头
                key: key + new Date().getTime(), // 必传
                // 页签名称
                title: '同业客户创建申请',
                // 传递的业务数据，可选配置
                data: json
              });
            } else {
              this.$xutils.showMsgBox('提示', '同业客户创建失败：' + response.code + ',错误信息：' + response.message);
            }
          } else {
            this.$xutils.showMsgBox('提示', '同业客户创建失败：' + response.code + ',错误信息：' + response.message);
          }
        }
      );
      // .catch(
      //   err => {
      //     this.$xutils.showMsgBox('错误信息', err.message); // 弹出提示
      //   }
      // );
    },

    // 返回
    doBack () {
      // this.$xutils.getParentPage(this,null, 'onCloseSelfTabb', [window.parent.activeTabId]);
      yufp.frame.removeTab(this.$router.currentRoute.path);
    }
  }
};
</script>
