<template>
  <yu-tabs type="card" v-model="activeName">
    <yu-tab-pane label="产品基本信息" name="d1-1-billcard">
      <d1-1-billcard ref="d1_1_BillCard" :saveFlag="saveFlag" :cancelFlag="cancelFlag"></d1-1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="产品适用机构列表">
      <d1-2-billlist ref="d1_2_BillList" :pageParams="pageParams"></d1-2-billlist>
    </yu-tab-pane>
   <!-- <yu-tab-pane label="产品适用渠道列表">
      <d1-3-billlist ref="d1_3_BillList" :pageParams="pageParams"></d1-3-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="产品适用数据流列表">
      <d1-4-billlist ref="d1_4_BillList" :pageParams="pageParams"></d1-4-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="合同模板列表">
      <d1-5-billlist ref="d1_5_BillList" :pageParams="pageParams"></d1-5-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="格式化报告模板列表">
      <d1-6-billlist ref="d1_6_BillList" :pageParams="pageParams"></d1-6-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="产品经理列表">
      <d1-7-billlist ref="d1_7_BillList" :pageParams="pageParams"></d1-7-billlist>
    </yu-tab-pane>-->
  </yu-tabs>
</template>
<script>
import d11Billcard from './cfgPrdBasicinfoDetail_d1_1_BillCard.vue';
import d12Billlist from './cfgPrdBasicinfoDetail_d1_2_BillList.vue';
import d13Billlist from './cfgPrdBasicinfoDetail_d1_3_BillList.vue';
import d14Billlist from './cfgPrdBasicinfoDetail_d1_4_BillList.vue';
import d15Billlist from './cfgPrdBasicinfoDetail_d1_5_BillList.vue';
import d16Billlist from './cfgPrdBasicinfoDetail_d1_6_BillList.vue';
import d17Billlist from './cfgPrdBasicinfoDetail_d1_7_BillList.vue';
// 被赋值的产品编号
var old_prd_id;
// 全局变量，保存次数
let saveNum = 0;
export default {
  components: {
    d11Billcard,
    d12Billlist,
    d13Billlist,
    d14Billlist,
    d15Billlist,
    d16Billlist,
    d17Billlist
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillCard: null,
      d1_2_BillList: null,
      d1_3_BillList: null,
      d1_4_BillList: null,
      d1_5_BillList: null,
      d1_6_BillList: null,
      d1_7_BillList: null,
      activeName: 'd1-1-billcard',
      saveFlag: false,
      cancelFlag: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 产品配置详情页面
     */

    AfterInit () {
      let opType = this.pageParams.opType;
      if (opType == 'edit') {
        this.saveFlag = true;
      } else if (opType == 'copy') {
        this.saveFlag = false;
      } else if (opType === 'view') {
        this.cancelFlag = false;
      }
      // 产品基本信息
      this.d1_1_BillCard = this.$refs.d1_1_BillCard;
      console.log('hahhahaha', JSON.stringify(this.pageParams));
      this.d1_1_BillCard.setBillCardValue(this.pageParams);
      this.d1_1_BillCard.addEditChangeAction(this.isBasicPrdChangeFn);
      this.d1_1_BillCard.addEditChangeAction(this.isEndDateChangeFn);

      // 初始化时手动调用onchange事件
      this.isBasicPrdChangeFn(null, 'isBasicPrd', null, this.d1_1_BillCard.getItemValue('isBasicPrd'));

      // 获取产品编号默认查询条件
      let condition = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      // 产品适用机构列表
      this.d1_2_BillList = this.$refs.d1_2_BillList;

      // 增加产品编号默认查询条件
      this.d1_2_BillList.queryDataByCondition(condition);

      this.d1_2_BillList.setAppendSQLCondition(condition);

      // 新增或修改时将产品编号赋默认值
      this.d1_2_BillList.isMustFkDefault = true;

      let values_d1_2 = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      this.d1_2_BillList.insertDefaultValues = values_d1_2;

      // 产品适用渠道列表
      this.d1_3_BillList = this.$refs.d1_3_BillList;

      // 增加产品编号默认查询条件
      this.d1_3_BillList.queryDataByCondition(condition);

      this.d1_3_BillList.setAppendSQLCondition(condition);

      // 新增或修改时将产品编号赋默认值
      this.d1_3_BillList.isMustFkDefault = true;

      let values_d1_3 = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      this.d1_3_BillList.insertDefaultValues = values_d1_3;

      // 产品适用数据流列表
      this.d1_4_BillList = this.$refs.d1_4_BillList;

      // 增加产品编号默认查询条件
      this.d1_4_BillList.queryDataByCondition(condition);

      this.d1_4_BillList.setAppendSQLCondition(condition);

      // 新增或修改时将产品编号赋默认值
      this.d1_4_BillList.isMustFkDefault = true;

      let values_d1_4 = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      this.d1_4_BillList.insertDefaultValues = values_d1_4;

      // 合同模板列表
      this.d1_5_BillList = this.$refs.d1_5_BillList;
      // 增加产品编号默认查询条件
      this.d1_5_BillList.queryDataByCondition(condition);

      this.d1_5_BillList.setAppendSQLCondition(condition);

      // 新增或修改时将产品编号赋默认值
      this.d1_5_BillList.isMustFkDefault = true;
      let values_d1_5 = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      this.d1_5_BillList.insertDefaultValues = values_d1_5;

      // 格式化报告模板列表
      this.d1_6_BillList = this.$refs.d1_6_BillList;

      // 增加产品编号默认查询条件
      this.d1_6_BillList.queryDataByCondition(condition);

      this.d1_6_BillList.setAppendSQLCondition(condition);

      // 新增或修改时将产品编号赋默认值
      this.d1_6_BillList.isMustFkDefault = true;

      let values_d1_6 = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      this.d1_6_BillList.insertDefaultValues = values_d1_6;

      // 产品经理列表
      this.d1_7_BillList = this.$refs.d1_7_BillList;

      // 增加产品编号默认查询条件
      this.d1_7_BillList.queryDataByCondition(condition);

      this.d1_7_BillList.setAppendSQLCondition(condition);

      // 获取产品经理新增按钮
      let d1_7_domButAdd = this.d1_7_BillList.getBillListButton('$insert');
      // 查看方法
      if (opType == 'view') {
        this.doView();
      } else if (opType == 'copy') {
        this.doCopy();
      }
    },
    tabClickFn (tab, event) {
      let tabIndex = tab.index;
      this.d1_1_BillCard = this.$refs.d1_1_BillCard;
      let condition = { prdId: this.d1_1_BillCard.getBillCardItemValue('prdId') };

      if (tabIndex === '1') {
        // 产品适用机构列表
        this.d1_2_BillList = this.$refs.d1_2_BillList;

        // 增加产品编号默认查询条件
        this.d1_2_BillList.queryDataByCondition(condition);

        this.d1_2_BillList.setAppendSQLCondition(condition);
      }
    },
    // 产品经理页签 拼接已存在的产品经理编号查询条件，新增时用户列表将已存在的产品经理排除，不展示
    inintAddPrd () {
      let listId = [];
      let tbData = this.d1_7_BillList.getBillListData();

      for (let i = 0; i < tbData.length; i++) {
        listId.push(tbData[i].user_id);
      }

      // 拼接已存在的用户编号
      let refUserid = '(\'' + listId.join('\',\'') + '\')';

      // 新增时将筛选条件赋默认值
      this.d1_7_BillList.isMustFkDefault = true;

      let values_d1_7 = {
        prdId: this.d1_1_BillCard.getBillCardItemValue('prdId'),
        refUserid: refUserid
      };

      this.d1_7_BillList.insertDefaultValues = values_d1_7;
    },

    // CHANGE事件,是否基础产品=是时展示“基础产品编号”;否则隐藏非必输；
    isBasicPrdChangeFn (thisCard, itemKey, oldVal, newVal) {
      if (itemKey == 'isBasicPrd' && newVal == 'Y') {
        this.d1_1_BillCard.setItemVisible('basicPrdId', false);
        this.d1_1_BillCard.setBillCardItemRequired('basicPrdId', false);
      } else if (itemKey == 'isBasicPrd' && newVal == 'N') {
        this.d1_1_BillCard.setItemVisible('basicPrdId', true);
        this.d1_1_BillCard.setBillCardItemRequired('basicPrdId', true);
      }
    },

    // CHANGE事件,校验 失效日期、生效日期
    isEndDateChangeFn (thisCard, itemKey, oldVal, newVal) {
      // 校验 失效日期 不能比 生效日期小；
      if (itemKey == 'endDate') {
        // 失效日期
        var endDate = this.d1_1_BillCard.getBillCardItemValue('endDate');

        // 生效日期
        var startDate = this.d1_1_BillCard.getBillCardItemValue('startDate');

        if (startDate != null && startDate.length > 0 && endDate < startDate) {
          this.d1_1_BillCard.setItemValue('endDate', '');
          this.$xutils.showMsgBox('提示', '【失效日期】不能小于【生效日期】!');
          return;
        }
      }

      // 校验 生效日期 不能比 失效日期大；
      if (itemKey == 'startDate') {
        // 失效日期
        var endDate = this.d1_1_BillCard.getBillCardItemValue('endDate');

        // 生效日期
        var startDate = this.d1_1_BillCard.getBillCardItemValue('startDate');

        if (endDate != null && endDate.length > 0 && startDate > endDate) {
          this.d1_1_BillCard.setItemValue('startDate', '');
          this.$xutils.showMsgBox('提示', '【生效日期】不能大于【失效日期】!');
          return;
        }
      }
    },

    // 查看
    doView () {
      // 界面只读
      this.d1_1_BillCard.setItemEditable('*', false);

      // 隐藏所有子表列表的新增、修改、删除 按钮
      this.d1_2_BillList.setBillListButtonVisable('新增', false);

      this.d1_2_BillList.setBillListButtonVisable('$delete', false);
      this.d1_3_BillList.setBillListButtonVisable('$insert', false);
      this.d1_3_BillList.setBillListButtonVisable('$delete', false);
      this.d1_3_BillList.setBillListButtonVisable('$update', false);
      this.d1_4_BillList.setBillListButtonVisable('$insert', false);
      this.d1_4_BillList.setBillListButtonVisable('$delete', false);
      this.d1_5_BillList.setBillListButtonVisable('$insert', false);
      this.d1_5_BillList.setBillListButtonVisable('$delete', false);
      this.d1_6_BillList.setBillListButtonVisable('$insert', false);
      this.d1_6_BillList.setBillListButtonVisable('$delete', false);
      this.d1_7_BillList.setBillListButtonVisable('$insert', false);
      this.d1_7_BillList.setBillListButtonVisable('$delete', false);
    },

    // 产品复制
    doCopy () {
      // 获取复制的产品编号
      let oldPrdId = this.d1_1_BillCard.getBillCardItemValue('prdId', false);

      // 执行配置的默认值公式，生成新的产品编号
      this.d1_1_BillCard.execBillCardDefaultValueFormula();

      // 隐藏子表的新增、修改、删除 按钮
      this.d1_2_BillList.setBillListButtonVisable('新增', false);

      this.d1_2_BillList.setBillListButtonVisable('$delete', false);
      this.d1_3_BillList.setBillListButtonVisable('$insert', false);
      this.d1_3_BillList.setBillListButtonVisable('$delete', false);
      this.d1_3_BillList.setBillListButtonVisable('$update', false);
      this.d1_4_BillList.setBillListButtonVisable('$insert', false);
      this.d1_4_BillList.setBillListButtonVisable('$delete', false);
      this.d1_5_BillList.setBillListButtonVisable('$insert', false);
      this.d1_5_BillList.setBillListButtonVisable('$delete', false);
      this.d1_6_BillList.setBillListButtonVisable('$insert', false);
      this.d1_6_BillList.setBillListButtonVisable('$delete', false);
      this.d1_7_BillList.setBillListButtonVisable('$insert', false);
      this.d1_7_BillList.setBillListButtonVisable('$delete', false);
    },

    // 保存
    onSave () {
      var _this = this;
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_1_BillCard.setItemValue('updId', userInfo.loginCode);
      this.d1_1_BillCard.setItemValue('updBrId', userInfo.orgCode);
      this.d1_1_BillCard.setItemValue('updDate', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      let resp = this.d1_1_BillCard.updateBillCardData();
      if (resp.code == '0') {
        this.$dialog.close(this.dialogId, {
          CloseType: 'OK'
        });
        // _this.$refs.refTable.remoteData();
      }
    },

    // 产品复制新增一条新记录保存
    onInsert () {
      // 必输项校验
      let valid = this.d1_1_BillCard.validateBillCardValue();

      if (!valid) {
        return;
      }

      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_1_BillCard.setItemValue('updId', userInfo.loginCode);
      this.d1_1_BillCard.setItemValue('updBrId', userInfo.orgCode);
      this.d1_1_BillCard.setItemValue('upDate', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      let resp = false;

      if (saveNum == 0) {
        // 新增保存
        let cardData = this.d1_1_BillCard.getBillCardValue();

        resp = this.copySaveFn(cardData);
      } else {
        // 修改保存
        resp = this.d1_1_BillCard.updateBillCardData();
      }

      if (resp) {
        saveNum++;

        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, _rt => {
          this.$dialog.close(this.dialogId, {
            CloseType: 'OK'
          });
        });
      }
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 调用后台java逻辑保存产品复制后新增保存的逻辑：新增保存时，保存产品基本信息外同步copy一份相关的适用机构、适用数据流等5张子表数据保存
    copySaveFn (cfgPrdBasicinfo) {
      let rtdata = false;

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/copyPrdBasicAndOtherSave/' + old_prd_id,
        data: JSON.stringify(this.$xutils.toUpperCase(cfgPrdBasicinfo, true)),

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            rtdata = true;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return rtdata;
    },

    // 新增产品适用机构
    addPrdOrgRelFn () {
      let params = {
        prdId: this.d1_1_BillCard.getBillCardItemValue('prdId')
      };

      this.$dialog.open('', 'cfgmanage/productconfig/cfgPrdBasicinfo/cfgPrdOrgRelDetailIndex', 960, 600, params, () => {
        this.d1_2_BillList.queryDataByCondition();
      });
    },

    imageDirFn () {
      this.$xutils.showMsgBox('提示', '开发中，待对接影像系统...'); // 弹出提示
    }
  }
};
</script>
