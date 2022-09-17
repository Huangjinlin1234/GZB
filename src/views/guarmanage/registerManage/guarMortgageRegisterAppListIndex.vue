<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="抵押登记申请">
  <d1-billlist ref="d1_BillList"></d1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="抵押登记历史">
  <d2-billlist ref="d2_BillList"></d2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d1Billlist from './guarMortgageRegisterAppList_d1_BillList.vue';
import d2Billlist from './guarMortgageRegisterAppList_d2_BillList.vue';
import { mapGetters } from 'vuex';
/** 抵押登记申请列表**/
let params;

export default {
  components: { d1Billlist, d2Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  data () {
    return {
      d1_BillList: null,
      d2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d2_BillList = this.$refs.d2_BillList;
    },

    // 新增 跳转抵押登记申请-担保合同选取页面
    onInsert () {
      // 1-异地支行（有分行）2-异地支行（无分行）3-异地分行 A-村镇银行
      if(this.org.orgType === '1' || this.org.orgType === '2' || this.org.orgType === '3' || this.org.orgType === 'A') {
        this.$xutils.showMsgBox('提示', '抵押登记功能仅适用于本地零售、综合、小企业客户经理发起', 350, 150);
        return;
      }
      var opJso = {};
      opJso['regType'] = '01';
      opJso['type'] = 'ADD';
      this.$dialog.open(
        '请选择担保合同',
        'guarmanage/registerManage/guarRegContSelectIndex',
        900,
        300,
        opJso,
        this.getDialogDataFunc
      );
    },

    getDialogDataFunc () {
      this.d1_BillList.queryDataByCondition();
    },

    doUpdate () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      if (jsoPar.approveStatus !== '000' && jsoPar.approveStatus !== '' && jsoPar.approveStatus !== '992') {
        this.$xutils.showMsgBox('提示', '只有"待发起或打回"状态的抵押注销申请记录才能进行修改操作！', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['type'] = 'EDIT';
      opJso['regType'] = jsoPar.regType;
      opJso['guarContNo'] = jsoPar.guarContNo;
      this.$dialog.open('抵押登记修改', 'guarmanage/registerManage/guarMortgageRegisterAppFormIndex.vue', -1, -1, opJso);
    },

    // 删除
    onDelete () {
      let selectRow = this.d1_BillList.getSelectedRowData();
      if (!selectRow) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if (selectRow.approveStatus === '000') {
        // 进行逻辑删除
        this.d1_BillList.onBillListLogicDelete();
      } else if (selectRow.approveStatus === '992') { // 打回
        this.$request({
          url: this.$backend.cmisBiz + '/api/guarmortgagemanageapp/deleteOnlogic',
          method: 'post',
          data: {serno: selectRow.serno, approveStatus: '996'}
        }).then((response) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '操作成功！', 350, 150);
            this.d1_BillList.doAutoQuery();
          }
        });
      } else {
        this.$xutils.showMsgBox('提示', '只有"待发起或打回"状态的抵押登记申请记录才能进行删除操作！', 350, 150);
      }
    },

    // 查看
    doView () {
      let jsoPar = this.d1_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['type'] = 'VIEW';
      this.$dialog.open('抵押登记详情', 'guarmanage/registerManage/guarMortgageRegisterAppFormIndex.vue', -1, -1, opJso);
    },

    // 历史查看
    doViewHistory () {
      let jsoPar = this.d2_BillList.getSelectedRowsData()[0];
      let jsoPar_ = {};
      this.$xutils.clone(jsoPar, jsoPar_);
      if (jsoPar_ == null || jsoPar_ == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['type'] = 'VIEW';
      this.$dialog.open('抵押登记详情', 'guarmanage/registerManage/guarMortgageRegisterAppFormIndex.vue', -1, -1, opJso);
    }

    // // 上传影像
    // uploadImage () {
    //   let params = this.d1_BillList.getSelectedRowData();

    //   if (params == null) {
    //     this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
    //     return;
    //   }
    //   // 具体参数待配置 TODO
    //   this.getImageSysUrl();
    //   // alert("上传影像");
    // },
    // /*
    //   获取跳转影像系统url
    //    */
    // getImageSysUrl () {
    //   // 参数未完善 //TODO
    //   // alert("影像系统");
    //   // return;
    //   let repData = this.getImageSysToken();
    //   let rsPars = {};

    //   // 请求参数
    //   let reqParams = {
    //     authority: '',
    //     authorization: '',

    //     para: {
    //       index: {},
    //       outsystem_code: '',
    //       top_outsystem_code: ''
    //     },

    //     prefixUrl: '',
    //     s: ''
    //   };

    //   this.$xutils.request({
    //     // 同步请求
    //     async: false,

    //     type: 'POST',
    //     url: this.$backend.cmisBiz + '/api/guarbaseinfo/getImageSysUrl/',
    //     data: JSON.stringify(this.$xutils.toUpperCase(reqParams, true)),

    //     success: (response, status, xhr) => {
    //       if (response.data != null) {
    //         rsPars['handleFlag'] = true;
    //         rsPars['url'] = response.data;
    //       }

    //       if (response.code != '0') {
    //         this.$xutils.showMsgBox(
    //           '提示',
    //           '错误代码：' + response.code + ',错误信息：' + response.message
    //         );
    //         rsPars['handleFlag'] = false;
    //       }
    //     },

    //     error: (result, status, errorThrown) => {
    //       this.$xutils.showMsgBox(
    //         '提示',
    //         '错误代码：' + result.status + '；错误信息1：' + errorThrown
    //       ); // 弹出提示
    //       rsPars['handleFlag'] = false;
    //     }
    //   });

    //   if (rsPars.handleFlag) {
    //     return rsPars.url;
    //   } else {
    //     this.$xutils.showMsgBox('提示', '影像系统打开失败', 350, 200, null);
    //   }
    // },

    // /*
    //   获取影像系统token
    //    */
    // getImageSysToken () {
    //   let rsPars = {};
    //   let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
    //   const useName = jsoUser['loginCode']; // 主办人
    //   const passWord = useName;

    //   this.$xutils.request({
    //     // 同步请求
    //     async: false,

    //     type: 'POST',
    //     url:
    //       this.$backend.cmisBiz +
    //       '/api/guarbaseinfo/getImageSysToken/' +
    //       useName +
    //       '/' +
    //       passWord,
    //     data: '',

    //     success: (response, status, xhr) => {
    //       if (response.data != null) {
    //         rsPars['handleFlag'] = true;
    //         rsPars['url'] = response.data;
    //       }

    //       if (response.code != '0') {
    //         this.$xutils.showMsgBox(
    //           '提示',
    //           '错误代码：' + response.code + ',错误信息：' + response.message
    //         );
    //         rsPars['handleFlag'] = false;
    //       }
    //     },

    //     error: (result, status, errorThrown) => {
    //       this.$xutils.showMsgBox(
    //         '提示',
    //         '错误代码：' + result.status + '；错误信息1：' + errorThrown
    //       ); // 弹出提示
    //       rsPars['handleFlag'] = false;
    //     }
    //   });

    //   if (rsPars.handleFlag) {
    //     return rsPars.url;
    //   } else {
    //     this.$xutils.showMsgBox('提示', '跳转影像系统失败', 350, 200, null);
    //   }
    // }
  }
};
</script>
