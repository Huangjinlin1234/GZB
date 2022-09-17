<template>
  <!--
    @created by zhoumw
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-row>
      <yu-col :sm="3" :xs="24">
        <yu-menu
          class="tac"
          :default-active="activeIndex"
          @select="selectFn"
          theme="light"
        >
          <yu-menu-item
            index="1"
            :style="color[1] && activeIndex == 1 ? color[1] : 'color: #48576a;'"
            >客户基本信息</yu-menu-item
          >
          <yu-menu-item
            index="2"
            v-if="bizType != 'B02'"
            :style="color[2] && activeIndex == 2 ? color[2] : 'color: #48576a;'"
            >社会关系信息</yu-menu-item
          >
          <yu-menu-item
            index="3"
            :style="color[3] && activeIndex == 3 ? color[3] : 'color: #48576a;'"
            >客户影像信息</yu-menu-item
          >
          <yu-menu-item
            index="4"
            v-if="showRank"
            :style="color[3] && activeIndex == 3 ? color[3] : 'color: #48576a;'"
            >评级必要信息</yu-menu-item
          >
        </yu-menu>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <yu-tabs
          v-if="activeIndex == 1"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <yu-tab-pane label="客户基础信息" name="cusIndivBase">
            <cusIndivBase ref="cusIndivBase"></cusIndivBase>
          </yu-tab-pane>
          <yu-tab-pane label="地址与联系方式" name="cusIndivContactInfo">
            <cusIndivContactInfo
              ref="cusIndivContactInfo"
            ></cusIndivContactInfo>
          </yu-tab-pane>
          <yu-tab-pane label="工作信息" name="cusIndivUnitInfo">
            <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
          </yu-tab-pane>
          <yu-tab-pane label="客户属性" name="cusIndivAttrInfo">
            <cusIndivAttrInfo ref="cusIndivAttrInfo"></cusIndivAttrInfo>
          </yu-tab-pane>
          <yu-form-buttons
            class="yubfp-button-group"
            style="text-align:center;"
          >
            <yu-button type="primary" @click="onSave" v-if="op != 'VIEW'"
              >暂存</yu-button
            >
            <yu-button type="primary" @click="onCommit" v-if="op != 'VIEW'"
              >提交</yu-button
            >
            <yu-button type="primary" @click="onBack" v-if="op != 'VIEW'"
              >返回</yu-button
            >
          </yu-form-buttons>
        </yu-tabs>
        <cusIndivSocilaInfo
          v-if="activeIndex == 2"
          ref="cusIndivSocilaInfo"
        ></cusIndivSocilaInfo>
        <cusIndivImage
          v-if="activeIndex == 3"
          ref="cusIndivImage"
        ></cusIndivImage>
        <!--评级必要信息 -->
        <indivCusRankScore
          v-if="activeIndex == 4"
          ref="indivCusRankScore"
        ></indivCusRankScore>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import cusIndivBase from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivCreatInfoIndex";
import cusIndivContactInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivContactInfoIndex";
import cusIndivUnitInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivUnitInfoIndex";
import cusIndivAttrInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivAttrInfoIndex";

import cusIndivSocilaInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivSocilaInfoListIndex";
import cusIndivImage from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivImageIndex";
import indivCusRankScore from "@/views/cusmanage/indivCus/indivCusDefend/indivCusRankScoreIndex";
export default {
  components: {
    cusIndivBase,
    cusIndivContactInfo,
    cusIndivUnitInfo,
    cusIndivAttrInfo,
    cusIndivSocilaInfo,
    cusIndivImage,
    indivCusRankScore
  },
  data: function() {
    return {
      color: [],
      activeIndex: 1,
      activeName: "cusIndivBase",
      bizType: "",
      op: ""
    };
  },
  computed: {
    showRank: function(){
      return this.$route.params.cusRankCls != '02'
    }
  },
  mounted() {
    var _this = this;
    _this.bizType = _this.$route.params.bizType;
    _this.op = _this.$route.params.op;
  },
  methods: {
    /**
     * 左侧菜单点击事件
     */
    selectFn(index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = "color: #fff;";
    },
    /**
     * 保存
     */
    onSave() {
      var _this = this;
      let cusRankCls = _this.$route.params.cusRankCls;
      var model = {};
      var tabs = [
        "cusIndivBase",
        "cusIndivContactInfo",
        "cusIndivUnitInfo",
        "cusIndivAttrInfo"
      ];
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].$refs.d1_BillCard.formdata, model);
        // if (tabs[i] == 'cusIndivContactInfo') {
        //   // 微信号
        //   const wechatNo = model.wechatNo;
        //   const qq = model.qq;
        //   // 邮箱
        //   const email = model.email;
        //   if ((wechatNo == '' || wechatNo == null) && (qq == '' || qq == null) && (email == '' || email == null)) {
        //     this.activeName = 'cusIndivContactInfo';
        //     this.$xutils.showMsgBox('温馨提示', '微信、QQ、Email地址三项中至少输入一项!');
        //     return;
        //   }
        // }
        // 客户状态
        model.cusState = "1";
        model.cusRankCls = cusRankCls;
      }
      this.$request({
        url: this.$backend.cmisCus + "/api/cusindiv/saveAllCusIndiv",
        data: model,
        method: "post"
      }).then((response, status, xhr) => {
        if (response.code == "0") {
          // 自动刷新列表数据
          this.$xutils.showMsgBox("提示", "保存成功！", 500, 140, () => {});
        } else {
          this.$xutils.showMsgBox(
            "提示",
            "错误代码：" + response.code + ",错误信息：" + response.message
          );
        }
      });
    },
    /**
     * 提交
     */
    onCommit() {
      let _this = this;
      // 判断必输项
      let validate = false;
      let data = {};
      let cusRankCls = _this.$route.params.cusRankCls;
      let tabs = [
        "cusIndivBase",
        "cusIndivContactInfo",
        "cusIndivUnitInfo",
        "cusIndivAttrInfo"
      ];
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs[tabs[i]].$refs.d1_BillCard.$refs.refForm.validate(function(
          valid
        ) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
        if (tabs[i] == "cusIndivContactInfo") {
          yufp.clone(
            _this.$refs[tabs[i]].$refs.d1_BillCard.$refs.refForm.formdata,
            data
          );
          // 微信号
          const wechatNo = data.wechatNo;
          // QQ
          const qq = data.qq;
          // 邮箱
          const email = data.email;
          if (
            (wechatNo == "" || wechatNo == null) &&
            (qq == "" || qq == null) &&
            (email == "" || email == null)
          ) {
            this.activeName = "cusIndivContactInfo";
            this.$xutils.showMsgBox(
              "温馨提示",
              "微信、QQ、Email地址三项中至少输入一项!"
            );
            return;
          }
        }
      }
      // 向后台发送保存请求
      let model = {};
      yufp.clone(_this.$refs.cusIndivBase.$refs.d1_BillCard.formdata, model);
      yufp.clone(
        _this.$refs.cusIndivContactInfo.$refs.d1_BillCard.formdata,
        model
      );
      yufp.clone(
        _this.$refs.cusIndivUnitInfo.$refs.d1_BillCard.formdata,
        model
      );
      yufp.clone(
        _this.$refs.cusIndivAttrInfo.$refs.d1_BillCard.formdata,
        model
      );
      // 任务状态
      model.taskStatus = "3";
      model.serno = _this.$route.params.serno;
      model.bizType = _this.bizType;
      // 客户状态
      model.cusState = "2";
      model.cusRankCls = cusRankCls;
      model.managerBrId = _this.$xutils.getLoginUserInfo().orgCode;
      model.managerId = _this.$xutils.getLoginUserInfo().userCode;
      this.$request({
        url: this.$backend.cmisCus + "/api/cusindiv/saveAllCusIndiv",
        data: model,
        method: "post"
      }).then((response, status, xhr) => {
        if (response.code == "0") {
          // 自动刷新列表数据
          this.$xutils.showMsgBox("提示", "个人客户信息保存成功，并已生效！", 500, 140, () => {
            this.onBack()
          });
        } else {
          this.$xutils.showMsgBox(
            "提示",
            "错误代码：" + response.code + ",错误信息：" + response.message
          );
        }
      });
    },
    /**
     * 关闭当前页面
     */
    onBack() {
      let data = this.$route.meta.params;
      yufp.frame.removeTab(data.key);
    }
  }
};
</script>
<style></style>
