<template>
  <div>
    <div style="height:40%">
        <div>
    <div style="height:65%">
        <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
    </div>
    <div style="height:calc(100% - 65%)">
        <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
    </div>
  </div>
    </div>
    <div style="height:calc(100% - 40%)">
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './lmtGroupDeclareApp_d1_A_BillCard.vue'
import d1BBBillcard from './lmtGroupDeclareApp_d1_B_B_BillCard.vue'
import d1BABilllist from './lmtGroupDeclareApp_d1_B_A_BillList.vue'
/**
 * title 集团授信分开填报主页面
 * author xiamc
 * date 2021-04-08
 * */
var param = {};

let _data;
var param = {};

export default {
  components:{d1ABillcard, d1BBBillcard, d1BABilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_B_BillCard: null,
      d1_B_A_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      param = this.pageParams;
      param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
      this.d1_A_BillCard.execBillCardDefaultValueFormula();
      this.d1_B_B_BillCard.execBillCardDefaultValueFormula();

      // 通过ID查询并赋值
      this.d1_A_BillCard.queryDataByCondition({'serno' : param.serno});

      this.d1_B_A_BillList.queryDataByCondition({'grpSerno' : this.pageParams.serno, 'managerId': '${LoginLoginCode}'});

      this.d1_B_B_BillCard.queryDataByCondition({'serno' : param.serno});
    },

    toHump(name) {
      return name.toString().replace(/\_(\w)/g, (all, letter) => {
        return letter.toUpperCase();
      });
    },

    doCommit() {
      // 获取数值的方式
      const params = this.d1_A_BillCard.getBillCardValue();

      const params2 = this.d1_B_B_BillCard.getBillCardValue();

      // 得到中间表格的数值
      const list = this.d1_B_A_BillList.getBillListData();

      // 必输校验
      const validateFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      const validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      if (!validateFlagB) {
        return;
      }

      // 判断请求
      // 3.全量提交判断：
      // Juage(params);

      // 判断是不是提交前的流程


      // 发送请求
      if (!params.pk_id) {
        // 调用后续保存方法
        // 拼成JSON字符串
        var obj;

        list.forEach(item => {
          this.$xutils.toUpperCase(item, true);
        });

        var obj = {
          params: this.$xutils.toUpperCase(params, true),
          params2: this.$xutils.toUpperCase(params2, true),

          // list: list
          list: this.convert(list, true)
        };

        let saveFlag = this.sendSavePost(obj);
      }
    },

    // 数值对象转驼峰
    convert(arr, flag) {
      const model = {};
      const item = null;
      const newArray = new Array();

      if (flag) {
        for (let i = 0; i < arr.length; i++) {
          let par = arr[i];

          for (let item in par) {
            // 将key值转化成驼峰命名 ;
            model[this.$xutils.toHump(item)] = par[item];
          }

          newArray[i] = model;
        }
      }

      return newArray;
    },

    // 返回按钮
    doBack() {
      this.$dialog.close(this.dialogId);
    },

    // 封装发送后台的逻辑，保存，暂存通用的方法
    sendSavePost(params, a) {
      const saveFlag = true;
      const rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        // url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/iqpwriteoffapp/update',
        url: this.$backend.cmisBiz + '/api/lmtgrpmemrel/updateField',

        data: JSON.stringify(params),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', ' 插入成功', 200, 200, () => {
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    sendUpdatePost(params) {
      const saveFlag = true;
      let rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpmemrel/updateField',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', ' 更新成功', null, null, () => {
              this.$dialog.close(this.dialogId);
              param.d1_1_BillList.queryDataByCondition();
            });

            // 关闭编辑界面：

            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return saveFlag;
    },

    querytableDatas() {
      const saveFlag = true;
      let rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpapp/query/getMemlist',
        data: JSON.stringify(this.$xutils.toUpperCase(this.params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 关闭编辑界面：

            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return rtnData;
    },

    /**
       * 判断是否是成员信息完全填报，根据返回1 ，判断
       * 如果是1，返回都是false,
       * @param {*} params
       */
    Juage(params) {
      const zzz = JSON.stringify(this.$xutils.toUpperCase(params, true));
      const saveFlag = true;
      const rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',

        // url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/iqpwriteoffapp/update',
        url: this.$backend.cmisBiz + '/api/lmtgrpapp/judge',

        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', ' 插入成功', 200, 200, () => {
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    clickDataRow(row) {
      // 打开模板工厂传递2个敞口额度合计：低风险额度合计：赋值到本界面
      const jsoPar = row;

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.lmt_serno && jsoPar.lmt_serno != '') {
        jsoPar['model_group_no'] = 'CMG000305';
        // jsoPar['pk_id'] = jsoPar.pk_id;
        jsoPar['serno'] = jsoPar.lmt_serno;
        jsoPar['scene'] = '01';// 授信场景
        jsoPar['op'] = 'EDIT';
        jsoPar['isGrp'] = 'Y';

        this.$dialog.open(
          '单一客户授信申报',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          jsoPar,
          true,
          true
        );
      } else {
        // 调用ajax请求落地后端接口数据
        this.$xutils.request({
          // 同步请求
          async: false,

          url: this.$backend.cmisBiz + '/api/lmtapp/savelmtappforgrplmt',
          data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

          success: (response, status, xhr) => {
            if (response.code == '0') {
              // 关闭编辑界面：
              let rtnData = response.data;

              const lmt_serno = rtnData.serno;
              jsoPar['model_group_no'] = 'CMG000305';
              // jsoPar['pk_id'] = jsoPar.pk_id;
              jsoPar['serno'] = lmt_serno;
              jsoPar['scene'] = '01';// 授信场景
              jsoPar['op'] = 'EDIT';
              jsoPar['isGrp'] = 'Y';

              this.$dialog.open(
                '单一客户授信申报',
                'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                -1,
                -1,
                jsoPar,
                true,
                true
              );
            } else {
              this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      }
    }
  }
};
</script>
