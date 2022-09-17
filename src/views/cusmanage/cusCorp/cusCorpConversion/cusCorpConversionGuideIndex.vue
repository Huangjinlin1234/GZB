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
import d1BBillcard from './cusCorpConversionGuide_d1_B_BillCard.vue';
export default {
  components: { d1BBillcard },
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
  },
  methods: {
    AfterInit () {
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'A12,A13', inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);

            // exit;// ajax中return不生效，可以用exit
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // 客户经理区分村镇和非村镇
      const orgCode = this.$xutils.getLoginUserInfo().org.id; // 测试非村镇
      const roles = this.$xutils.getLoginUserInfo().roles;
      var strRole = '';
      for (var i = 0; i < roles.length; i++) {
        strRole = strRole + roles[i].code;
      }
      if (orgCode.startsWith('80') || orgCode.startsWith('81') || strRole.indexOf('R0010') != -1 || strRole.indexOf('R0030') != -1) {
        // 公司客户转正
        this.d1_B_BillCard.formdata.bizType = 'A13';
      } else {
        // 公司客户转正（集中作业）
        this.d1_B_BillCard.formdata.bizType = 'A12';
      }
    },

    // 待处理
    batchApply () {
      const json = this.d1_B_BillCard.getBillCardValue();
      json['oprType'] = '7';

      // this.$dialog.open('对公客户日常任务', 'cusmanage/cusCorp/cusCorpConversion/cusCorpConversionManaTaskListIndex', -1, -1, json, () => {});
      let name = 'cusmanage/cusCorp/cusCorpConversion/cusCorpConversionManaTaskListIndex';
      let key = 'cusCorpConversionManaTaskListIndex7';
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '对公客户日常任务',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    viewHistory () {
      const json = this.d1_B_BillCard.getBillCardValue();
      // this.$dialog.open('客户日常任务历史', 'cusmanage/cusCorp/cusCorpCreation/cusManaTaskCropListHisIndex', -1, -1, json, () => {});
      let name = 'cusmanage/cusCorp/cusCorpCreation/cusManaTaskCropListHisIndex';
      let key = 'cusManaTaskCropLis7';
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '客户日常任务历史',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    doNext () {
      const json = this.d1_B_BillCard.getBillCardValue();
      var _this = this;
      let task = {};
      if (json.cusState == 1) {
        _this.$xutils.showMsgBox('提示', '非生效状态的客户（暂存），不能发起转正流程!');
        return;
      }
      yufp.clone(json, task);
      task.taskStatus = '1';
      yufp.service.request({
        method: 'POST',
        // 同步请求
        async: false,
        url: `${backend.cmisCus}/api/cuscorp/checkaccount`,
        data: JSON.stringify(task),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.saveTask(task, json);
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
            return;
          }
        }
      });
    },
    saveTask (task, json) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cusmanatask/create`,
        data: JSON.stringify(task),
        callback: function (code, message, response) {
          if (response.code == '0') {
            json.serno = response.data.serno;
            _this.nextPage(json);
          } else {
            _this.$message({ message: message, type: 'error' });
            return;
          }
        }
      });
    },
    nextPage (json) {
      var _this = this;
      let updateSuccess = false;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisCus + '/api/cusbase/updateSelective',
        data: {'cusId': this.d1_B_BillCard.formdata.cusId, 'cusState': '1'},
        success: (response) => {
          if (response.code == '0') {
            updateSuccess = true;
            console.log('更新客户状态成功！');
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });
      if (!updateSuccess) {
        return;
      }
      if (json.bizType == 'A12') {
        // 公司客户转正（集中作业）
        json['modelGroupNo'] = 'CMG000248';

        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = 'A12';

        // this.$dialog.open("公司正式客户信息补全（集中作业）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
        let name = 'zrcbank/cus/cuscom/tempCusComCreate/formalCusComCenter';
        let key = 'formalCusComCenterA12' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户转正（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (json.bizType == 'A13') {
        // 公司客户转正
        json['modelGroupNo'] = 'CMG000253';

        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = 'A13';

        let name = 'zrcbank/cus/cuscom/tempCusComCreate/fromalCusCom';
        let key = 'fromalCusComA13' + json.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户转正',
          // 传递的业务数据，可选配置
          data: json
        });
        // this.$dialog.open("公司正式客户信息补全", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      }
    },
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
