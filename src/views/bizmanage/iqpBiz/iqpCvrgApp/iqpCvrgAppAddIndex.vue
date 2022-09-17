<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpCvrgAppAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 保函合同申请新增
       * @letructor
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // this.d1_BillCard.execBillCardDefaultValueFormula(); // 执行配置的默认值公式
      // this.d1_BillCard.addEditChangeAction(this.onChange);// 页面录入框下拉框绑定onchange事件
      this.d1_BillCard.setItemValue('isRenew', '0'); // 在此处添加默认值
      this.d1_BillCard.setItemValue('isUtilLmt', '1');
      this.d1_BillCard.setItemValue('guarMode', '10');
      this.d1_BillCard.setItemValue('contType', '1');
    },

    // 点击下一步，保存界面信息，保存成功后，跳转到修改页面
    nextStep () {
      // 检验表单
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      let jsoPar = this.d1_BillCard.getBillCardValue(); // 获取当前界面数据，带入修改界面中
      let iqpCvrgApp = this.$xutils.toUpperCase(jsoPar, true);
      let rtnData = ''; // 保存操作
      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/iqpcvrgapp/saveIqpCvrgAppInfo',
        data: JSON.stringify(iqpCvrgApp),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'refreshBillListData');
        jsoPar['model_group_no'] = 'CMG000375';
        jsoPar['op'] = 'EDIT';

        // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
        jsoPar['serno'] = rtnData.serno;

        jsoPar['contNo'] = rtnData.contNo;

        jsoPar['biz_serno'] = rtnData.serno;

        jsoPar['biz_op'] = 'ADD';

        jsoPar['period'] = '02';

        jsoPar['bizLine'] = '03';

        jsoPar['busiType'] = '08';
        jsoPar['imageType'] = '2';
        jsoPar['guarWay'] = jsoPar.guarMode;
        if (jsoPar.guarMode == '21') {
          jsoPar['isAddGuar'] = '0';
        }
        // 增加类型字段，用于判断业务规则校验
        // jsoPar['bizType'] = 'lmt';
        // this.$dialog.open(
        //   '',
        //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        //   -1,
        //   -1,
        //   jsoPar,
        //   true,
        //   true
        // );
        var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
        this.$router.addTab({
          name: path,
          key: jsoPar.serno + jsoPar.op,
          title: '保函合同申请',
          data: jsoPar
        });
      });
      this.onCancel();
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
