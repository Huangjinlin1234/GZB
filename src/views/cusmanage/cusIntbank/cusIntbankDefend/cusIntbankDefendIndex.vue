<template>
  <div>
    <div v-if="!activeIndex">
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
    <div v-else>
      <d1-billlist ref="d1_BillList" :activeIndex="activeIndex"></d1-billlist>
    </div>
  </div>
</template>
<script>
import d1BBillcard from './cusIntbankDefend_d1_B_BillCard.vue';
import d1Billlist from '../cusIntbankCreate/cusIntbankSolve_d1_BillList.vue';
export default {
  components: {d1BBillcard, d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    activeIndex: String
  },
  data () {
    return {
      d1_B_BillCard: null,
      count: 0
    };
  },
  mounted () {
    if(!this.activeIndex) {
      this.AfterInit();
    }
  },
  methods: {
    /**
       * 同业客户维护向导界面
       */
    AfterInit () {
      // 加载代办任务数量
      // 业务类型 同业客户维护
      this.$request({
        method: 'post',
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'C02', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")})}})
        .then((response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
            this.d1_B_BillCard = this.$refs.d1_B_BillCard;
            this.d1_B_BillCard.setBillCardItemValue('biz_type', 'C02');
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        });
    },

    // 同业客户创建申请界面(待处理)
    batchApply () {
      const json = this.d1_B_BillCard.getBillCardValue();
      json['bizType'] = 'C02';

      // this.$dialog.open(
      //   '同业客户申请待处理',
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
        title: '同业客户申请待处理',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    // 历史查看
    viewHistory () {
      const json = this.d1_B_BillCard.getBillCardValue();
      json['bizType'] = 'C02';
      // this.$dialog.open(
      //   '同业客户申请待处理',
      //   'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankHisIndex',
      //   -1,
      //   -1,
      //   json,
      //   () => {}
      // );
      let name = 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankHisIndex';
      let key = 'custom_' + json.bizType;
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

    doNext () {
      var _this = this;
      const json = this.d1_B_BillCard.getBillCardValue();
      //json['certCode'] = json.socialCreditCode;
      // 判断必输项
      const saveFlag = this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      let task = {};
      yufp.clone(json, task);
      // 下一步的时候先判断是否有无在途任务
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.workflowService + '/api/custom/bench/querycusflow?cusId=' + json.cusId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.length == 0) {
              task['bizType'] = 'C02';
              task['oprType'] = '01';
              task.taskStatus = '1';
              yufp.service.request({
                method: 'POST',
                url: `${backend.cmisCus}/api/cusmanatask/createTask`,
                data: JSON.stringify(task),
                callback: function (code, message, response) {
                  if (response.code == '0') {
                    json.serno = response.data.serno;
                    _this.nextPage();
                  } else {
                    _this.$message({ message: message, type: 'error' });
                    return;
                  }
                }
              });
            } else {
              _this.$message({ message: '有在途任务，不可修改', type: 'error' });
            }
          } else {
            _this.$message({ message: response.message, type: 'error' });
            return;
          }
        }
      }); 
    },

    nextPage () {
      const json = this.d1_B_BillCard.getBillCardValue();
      json['bizType'] = 'C02';
      // 判断必输项
      const saveFlag = this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // 业务条线
      // json['model_group_no'] = 'CMG000288';
      json['op'] = 'EDIT';
      json['opType'] = 'edit';
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
        title: '同业客户维护申请',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
