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
import d1BBillcard from './indivCusChange_d1_B_BillCard.vue';
import d1Billlist from '../indivCusCreate/cusIndivManaTask_d1_BillList.vue';
export default {
  components: {d1BBillcard, d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    activeIndex: String
  },
  data () {
    return {
      count: 0,
      d1_B_BillCard: null
    };
  },
  mounted () {
    if (this.activeIndex) {
      // 从工作台页面个人客户转正进入
    } else {
      this.AfterInit();
    }
  },
  methods: {
    /**
       * 个人客户向导界面
       * @constructor
       */
    AfterInit () {
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      this.d1_B_BillCard.setBillCardItemValue('bizType', 'B09');
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cusmanatask/',
        data: {condition: JSON.stringify({ taskStatus: '1', bizType: 'B09', inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.count = response.total;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 客户创建申请界面(待处理)
    batchApply () {
      let _this = this;
      let json = {};
      let name = 'cusmanage/indivCus/indivCusCreate/cusIndivManaTaskIndex';
      let key = 'cusIndivManaTaskIndeChange';
      json.key = `/${name}/${key}`;
      _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '个人客户管理任务',
        // 传递的业务数据，可选配置
        data: json
      });
      // var currentPath = _this.$route.path;
      // setTimeout(function () {
      //   yufp.router.removeTab(currentPath);
      // }, 100);
    },

    // 历史查看
    viewHistory () {
      let _this = this;
      let json = {};
      let name = 'cusmanage/indivCus/indivCusCreate/cusIndivManaTaskHisIndex';
      let key = 'cusIndivManaTaskIndeChangeHis';
      json.key = `/${name}/${key}`;
      _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(), // 必传
        // 页签名称
        title: '个人客户任务历史',
        // 传递的业务数据，可选配置
        data: json
      });
      var currentPath = _this.$route.path;
      setTimeout(function () {
        yufp.router.removeTab(currentPath);
      }, 100);
    },

    // 下一步
    doNext () {
      let _this = this;
      // 判断必输项
      const saveFlag = _this.d1_B_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      let json = _this.$refs.d1_B_BillCard.getBillCardValue();
      let data = {};
      yufp.clone(json, data);
      // 下一步的时候先保存任务
      yufp.service.request({
        // 同步请求
        async: false,
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusmanatask/save',
        data: JSON.stringify(_this.$xutils.toUpperCase(json, true)),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.nextPage(data);
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
            return;
          }
        }
      });
    },

    nextPage (data) {
      var _this = this;
      let updateSuccess = false;
      let formdata = _this.$refs.d1_B_BillCard.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisCus + '/api/cusbase/updateSelective',
        data: {'cusId': formdata.cusId, 'cusState': '1'},
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
      // 业务条线
      let bizType = data.bizType;
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '个人临时客户转正';
      let key = 'tempCusIndivChange' + new Date().getTime();
      data.op = 'EDIT';
      data.bizType = bizType;
      data.cusRankCls = '01';
      data.cusState = '1';
      data.key = `/${name}/${key}`;
      _this.$refs.d1_B_BillCard.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(),
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: data
      });
      var currentPath = _this.$route.path;
      setTimeout(function () {
        yufp.router.removeTab(currentPath);
      }, 100);
    },

    doBack () {
      yufp.router.removeTab(this.$route.path);
      // this.$xutils.getParentPage(null, 'onCloseSelfTabb', [window.parent.activeTabId]);
    }
  }
};
</script>
