<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './guarPreVal_d1_BillList.vue';
/* 押品价值初估
 * @author zfq
 * */
const modelGroupNo = '';

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    onPre () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '【请选择一条记录】',
          350,
          150
        );
        return;
      }
      
      params['callMethod'] = 'tGuarFirstEval';
      params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
    //  const url = this.getGuarSysUrl(params);
    //   let date = new Date();
    //  if (url != '') {
    //    this.$nextTick(function () {
    //      window.open(url, '_blank');
    //       this.$router.addTab({
          //   // 路由名称
          //   name: 'guarmanage/guarValuation/guarSysJump', // 菜单路径
          //   // 自定义唯一页签key,请统一使用custom_前缀开头
          //   key: 'guarSysJump' + date.getTime(), // 必传
          //   // 页签名称
          //   title: '押品系统初估',
          //   // 传递的业务数据，可选配置
          //   data: {
          //     url: url
          //   }
    //      });
    //    });
    //  }
    },

    onView () {
      const params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '【请选择一条记录】',
          350,
          150
        );
        return;
      }

      params['callMethod'] = 'tGuarDetailInfo';
      params.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      params.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
    //  const url = this.getGuarSysUrl(params);
    //  if (url != '') {
    //    this.$nextTick(function () {
    //      this.$router.addTab({
            // 路由名称
    //        name: 'guarmanage/guarValuation/guarSysJump', // 菜单路径
            // 自定义唯一页签key,请统一使用custom_前缀开头
    //       key: 'guarSysJump' + new Date().getTime(), // 必传
            // 页签名称
    //        title: '押品系统详情',
            // 传递的业务数据，可选配置
    //        data: {
    //          url: url
    //        }
    //      });
    //    });
    //  }
    this.route(params);
    },
    route (jsonData) {
      var _this = this;
      var json = {};
      // yufp.clone(jsonData, json);
      json.serno = jsonData.serno;
      const name = 'guarmanage/collateralInfo/guarInfo/guarBaseInfoDetailIndex';
      const key = 'guarBaseInfoDetailIndex' + new Date().getTime();
      json.key = `/${name}/${key}`;
      json.op = jsonData.op;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '押品信息管理',
        // 传递的业务数据，可选配置
        data: json
      });
    },

    /*
      获取跳转押品系统url
       */
    getGuarSysUrl (params) {
      const rsPars = {};
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/getGuarInfoUrl/',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
            rsPars['url'] = response.data;
          }

          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        return rsPars.url;
      } else {
        this.$xutils.showMsgBox('提示', '跳转押品系统失败', 350, 200, null);
      }
    }
  }
};
</script>
