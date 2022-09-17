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
import { clone } from '@/utils';
import d1BBillcard from './cusCorpCreationGuide_d1_B_BillCard.vue';
import { isOrgCode } from '@/utils/validate';
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
      // 对公客户待处理
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'A01,A02,A03', inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
            // 监听这个卡片事件
            this.d1_B_BillCard.addEditChangeAction(this.d1_BillCardChange);
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
      var _this = this;
      const json = this.d1_B_BillCard.getBillCardValue();
      // json['opr_type'] = '3';
      json.dialogId = 'cusManaTaskCorpListIndex';
      // _this.$dialog.open('对公客户日常任务', 'cusmanage/cusCorp/cusCorpCreation/cusManaTaskCorpListIndex', -1, -1, json, () => {});

      let name = 'cusmanage/cusCorp/cusCorpCreation/cusManaTaskCorpListIndex';
      let key = 'cusManaTaskCorpListIndex3';
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
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
      let key = 'cusManaTaskCropListHisIndex3';
      json.key = `/${name}/${key}`;
      json.inType = 'CREATE';
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
    d1_BillCardChange (d1_B_BillCard, thisItem, oldValue, newValue) {
      // var orgCode = YuXPUtil.getLoginUserInfo().orgCode;
      // const orgCode = '10';

      // if (thisItem == 'cusRankCls') {
      //   const main_br_id = this.d1_B_BillCard.getItemValue('main_br_id');

      //   if (newValue == '02') {
      //     // 临时客户创建
      //     this.d1_B_BillCard.setItemValue('biz_type', 'A02');
      //   } else if (newValue == '01') {
      //     if (orgCode == '10') {
      //       // 正式客户创建（集中作业）
      //       this.d1_B_BillCard.setItemValue('biz_type', 'A03');
      //     } else {
      //       // 正式客户创建
      //       this.d1_B_BillCard.setItemValue('biz_type', 'A01');
      //     }
      //   }
      // }
    },

    doNext () {
      var _this = this;
      var validate = false;
      _this.$refs.d1_B_BillCard.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const Data = this.d1_B_BillCard.getBillCardValue();
      if (Data.certType === 'Q' || Data.certType === 'R') {
        if (!isOrgCode(Data.certCode, Data.certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
          return;
        }
      }

      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/openAccount',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            var data = response.data;
            if (data.isEcif == '1') {
              this.$message({ message: '该客户为我行存量客户', type: 'warning' });
            }
            this.route(response.data, _this);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          // this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },

    route (jsonData, obj) {
      var _this = this;
      var json = {};
      clone(_this.d1_B_BillCard.getBillCardValue(), json);
      // 清除原表单
      json['cusId'] = jsonData.cusId;
      json['serno'] = jsonData.taskSerno;
      json['cusName'] = jsonData.cusName;
      // 判断必输项
      const saveFlag = _this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const biz_type = json.bizType;
      if (biz_type == 'A02') {
        // 公司临时客户创建
        json['model_group_no'] = 'CMG000251';
        json['tplId'] = 'CMG000251';
        json['op'] = 'ADD';
        json['op_type'] = 'view';
        json['biz_type'] = biz_type;
        // var path = "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex";
        let name = 'zrcbank/cus/cuscom/tempCusComCreate/tempCusComCreate';
        let key = 'tempCusComCreate' + jsonData.cusId;
        json.key = `/${name}/${key}`;
        _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
        _this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户创建（临时）',
          // 传递的业务数据，可选配置
          data: json
        });
      } else if (biz_type == 'A01') {
        // 公司正式客户创建
        json['model_group_no'] = 'CMG000253';
        json['tplId'] = 'CMG000253';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = biz_type;

        let name = 'zrcbank/cus/cuscom/tempCusComCreate/fromalCusCom';
        let key = 'fromalCusCom' + jsonData.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户创建（正式）',
          // 传递的业务数据，可选配置
          data: json
        });

        // this.$dialog.open("公司客户创建（正式）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      } else if (biz_type == 'A03') {
        // 公司正式客户创建（集中作业）
        json['model_group_no'] = 'CMG000248';
        json['tplId'] = 'CMG000248';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = biz_type;

        let name = 'zrcbank/cus/cuscom/tempCusComCreate/formalCusComCenter';
        let key = 'formalCusComCenter' + jsonData.cusId;
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户创建（集中作业）',
          // 传递的业务数据，可选配置
          data: json
        });

        // this.$dialog.open("公司客户创建（正式）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
        // this.$router.push({ name: "templetfactory", query: json });
      }
    },
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
