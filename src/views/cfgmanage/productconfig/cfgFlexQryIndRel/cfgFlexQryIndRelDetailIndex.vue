<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgFlexQryIndRelDetail_d1_BillCard.vue";

export default {
  components: { d1Billcard },
  
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
      saveBtnShow: false
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      // 指标配置基本信息
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 设置CHANGE事件
      if (this.pageParams.opType == "add") {
        // 新增方法
        this.doAdd();
      } else if (this.pageParams.opType == "edit") {
        // 修改方法
        this.doUpdate();
      } else if (this.pageParams.opType == "view") {
        //查看
        this.onView();
        this.saveBtnShow = false;
      }
    },
    // 新增
    doAdd() {
      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 修改
    doUpdate() {
      // 初始化界面数据
      this.d1_BillCard.setBillCardValue(this.pageParams);
      this.$refs.d1_BillCard.dealEditBillCard(true);
    },
    // 查看
    onView() {
      // 初始化界面数据
      // 隐藏按钮

      this.d1_BillCard.queryDataByCondition({ pkId: this.pageParams.pkId });
      this.$refs.d1_BillCard.dealEditButton(false);
    },

    // 保存
    onSave() {
      //校验表单必输项
      //let result = this.d1_BillCard.validateBillCardValue();

      //if (!result) {
      //  return;
      //}
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue("updId", userInfo.loginCode);
      this.d1_BillCard.setItemValue("updBrId", userInfo.orgCode);
      this.d1_BillCard.setItemValue("updDate", this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()));
      let resp = "";
      if (this.pageParams.opType == "add") {
        // 获取当前表单数据
        let billCardData = this.d1_BillCard.getBillCardValue();
        // 保存前判断该关联关系是否已存在
        let rtnum = this.getExistCfgFlexQryIndRel(billCardData);

        if (rtnum > 0) {
          this.$xutils.showMsgBox("提示", "该关联关系已存在，不能重复进行保存！");
          return;
        }

        resp = this.d1_BillCard.saveBillCardData();
      } else if (this.pageParams.opType == "edit") {
        resp = this.d1_BillCard.updateBillCardData();
      }
      if (resp) {
        this.$xutils.showMsgBox("提示", "保存成功", 350, 150, () => {
          this.$dialog.close(this.dialogId);
        });
      }
    },

    // 调用后台java逻辑,获取已经存在的关联关系,确保关联关系唯一。
    getExistCfgFlexQryIndRel(cfgFlexQryIndRel) {
      let rtnum = 1;

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + "/api/cfgflexqryindrel/getExistCfgFlexQryIndRel",
        data: JSON.stringify(this.$xutils.toUpperCase(cfgFlexQryIndRel, true)),

        success: (response, status, xhr) => {
          if (response.code != "0") {
            this.$xutils.showMsgBox("提示", "错误代码：" + response.code + ",错误信息：" + response.message);
            return;
          } else {
            // 返回数据条数
            rtnum = response.data.length;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
          return;
        }
      });

      return rtnum;
    },

    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
