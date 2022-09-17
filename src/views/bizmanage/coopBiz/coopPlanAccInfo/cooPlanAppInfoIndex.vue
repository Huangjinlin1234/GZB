<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5|| partnerType == 3 || partnerType == 4 || partnerType == 8 ||partnerType == 15"></d1-a-billcard>
    <d1-billcard ref="d1_BillCard" :operate="operate" v-show="!(partnerType == 1 || partnerType == 2|| partnerType == 5|| partnerType == 3 || partnerType == 4 || partnerType == 8 ||partnerType == 15)"></d1-billcard>
    <d1-b-a-billlist ref="d1_B_A_BillList" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5 || partnerType == 3 || partnerType == 4 || partnerType == 8 ||partnerType == 15"></d1-b-a-billlist>
    <d1-b-b-a-billcard ref="d1_B_B_A_BillCard" :page-param="param" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5|| partnerType == 3 || partnerType == 4 || partnerType == 8 ||partnerType == 15"></d1-b-b-a-billcard>
    <d1-b-b-b-a-billlist ref="d1_B_B_B_A_BillList" :operate="operate" v-show="partnerType == 2" ></d1-b-b-b-a-billlist>
    <d1-b-b-b-a-billcard ref="d1_B_B_B_A_BillCard" :operate="operate" v-show="partnerType == 1 || partnerType == 2|| partnerType == 5 || partnerType == 3 || partnerType == 4 || partnerType == 8 ||partnerType == 15"></d1-b-b-b-a-billcard>
  </div>
</template>
<script>
import d1Billcard from './cooPlanAppInfo_d1_BillCard.vue';
import d1ABillcard from './cooPlanAppInfo_d1_A_BillCard.vue';
import d1BABilllist from '../coopPlanApp/cooPlanAppInfo_d1_B_A_BillList.vue';
import d1BBABillcard from '../coopPlanAccInfo/cooPlanAppInfo_d1_B_B_A_BillCard.vue';
import d1BBBABilllist from '../coopPlanApp/cooPlanAppInfo_d1_B_B_B_A_BillList.vue';
import d1BBBABillcard from './cooPlanAppInfo_d1_B_B_B_A_BillCard.vue';
import { request } from 'xy-utils';
/**
 * 合作方案申请详情
 * author yumeng@yusys.com.cn
 * date 2021-04-15
 **/
export default {
  components: {d1Billcard, d1ABillcard, d1BBABillcard, d1BBBABillcard, d1BABilllist, d1BBBABilllist},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object,
    pageData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      d1_BillCard: null,
      d1_A_BillCard: null,
      d1_B_A_BillList: null,
      d1_B_B_A_BillCard: null,
      d1_B_B_B_A_BillList: null,
      d1_B_B_B_A_BillCard: null,
      param: {},
      partnerType: '',
      operate: '',
      queryUrl: this.$backend.cmisBiz + '/api/coopplanaccinfo/query'
    };
  },
  mounted () {
    let data = {};
    yufp.clone(this.pageData, data);
    // 如果pageData存在值则说明数据是从工作流中传递的数据，这直接使用工作流中数据
    if (this.pageData) {
      this.param = data;
      this.operate = 'details';
    } else {
      this.param = this.$route.meta.params;
      this.operate = this.param.op;
    }
    this.partnerType = this.param.partnerType;
    if (this.pageData.from == 'coopPartnerAgr') {
      this.loadData();
    } else {
      this.afterInit();
    }
  },
  methods: {
    loadData () {
      if (this.pageData.from == 'coopPartnerAgr') {
        // 根据方案比编号查询方案详细信息
        this.$request({
          url: this.queryUrl,
          method: 'post', // 默认get请求
          data: {condition: JSON.stringify({
            serno: this.pageData.serno
          })}
        }).then((response) => {
          if (response.code == '0' && response.data) {
            // 跳转修改页面
            yufp.clone(response.data[0], this.pageData);
            this.param = this.pageData;
            this.afterInit();
          } else {
            this.$message({ message: '查询方案基本信息失败', type: 'error' });
          }
        }).catch((e) => {
          this.$message({ message: '查询方案基本信息失败', type: 'error' });
        });
      }
    },
    /**
      * 页面数据初始化
      */
    afterInit () {
      if (this.param.partnerType == 2) {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_B_A_BillCard = this.$refs.d1_B_B_A_BillCard;
        this.d1_B_B_B_A_BillCard = this.$refs.d1_B_B_B_A_BillCard;
        this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
        this.d1_B_B_B_A_BillList = this.$refs.d1_B_B_B_A_BillList;
        // 查询合作方案关联机构
        this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        // 查询合作方案关联特殊限额
        this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        // 将向导页面或者列表里面的数据赋值到报单中，根据需求coop_plan_app表被分成了三个表单
        this.d1_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.setBillCardItemVisible('isWhiteListCtrl', false);
        this.d1_B_B_A_BillCard.calculateCoopLmtAmt(this.param.totlCoopLmtAmt);
      } else if (this.param.partnerType == 1 || this.param.partnerType == 5 || this.param.partnerType == 3 || this.param.partnerType == 4 || this.param.partnerType == 8 || this.param.partnerType == 15) {
        // 开启创建组件任务,此种方式会合并请求一次性发送请求
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
        this.d1_B_B_A_BillCard = this.$refs.d1_B_B_A_BillCard;
        this.d1_B_B_B_A_BillCard = this.$refs.d1_B_B_B_A_BillCard;
        // 查询合作方案关联机构
        this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        // 将向导页面或者列表里面的数据赋值到报单中，根据需求coop_plan_app表被分成了三个表单
        this.d1_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_B_A_BillCard.setBillCardValue(this.param);
        this.d1_B_B_A_BillCard.calculateCoopLmtAmt(this.param.totlCoopLmtAmt);
        if (this.param.partnerType == 3 || this.param.partnerType == 4 || this.param.partnerType == 8) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible('commonGrtLmtAmt;outguarMultiple;', false);
          this.d1_B_B_A_BillCard.setBillCardItemVisible('isWhiteListCtrl', true);
        }
        if (this.param.partnerType == 1) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible(
            'singleCoopQuota;sigBusiCoopQuota;isWhiteListCtrl;commonGrtLmtAmt;outguarMultiple;',
            false
          );
          this.d1_B_B_B_A_BillCard.bailAccLowAmtIsShow = false;
          this.d1_B_B_B_A_BillCard.sigLowDepositAmtHidden = true;
          this.d1_B_B_B_A_BillCard.sigLowDepositAmtRequired = false;
        }
        if (this.param.partnerType == 5) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible(
            'isWhiteListCtrl;commonGrtLmtAmt;outguarMultiple;',
            false
          );
        }
        if (this.param.partnerType == 12) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible('commonGrtLmtAmt;isWhiteListCtrl;outguarMultiple;', false);
        }
        if (this.param.partnerType == 15) {
          this.d1_B_B_A_BillCard.setBillCardItemVisible('commonGrtLmtAmt;isWhiteListCtrl;', false);
        }
      } else {
        this.d1_BillCard = this.$refs.d1_BillCard;
        this.d1_BillCard.setBillCardValue(this.param);
        if (this.param.partnerType == 13) {
          this.d1_BillCard.setBillCardItemVisible('bsinsTerm;operRange;corpScale;legal;regiAddr', false);
        }
      }
    },
    /**
      * 选择机构
      */
    selectOrg () {
      // 传递方案编号到子表进行关联
      const json = {
        serno: this.param.serno
      };
      this.$dialog.open(
        '选取机构',
        'bizmanage/coopBiz/coopPlanApp/cooPlanOrgIndex',
        660,
        200,
        json,
        () => {
          // 页面关闭后刷新数据
          this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        }
      );
    },
    /**
      * 删除机构
      */
    deleteOrg () {
      const rowData = this.d1_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.deleteOrgAfter();
        }
      });
    },
    /**
      * 删除机构
      **/
    deleteOrgAfter () {
      const rowData = this.d1_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let json = {
        pkId: rowData.pkId
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopplansuitorginfo/delete',
        data: JSON.stringify(json),
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },
    /**
      * 全部删除机构
      **/
    deleteAllOrg () {
      this.$xutils.showConfirmBox('提示', '是否确认全部删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          let json = {
            serno: this.param.serno
          };
          this.$xutils.request({
            url: this.$backend.cmisBiz + '/api/coopplansuitorginfo/deleteall',
            data: JSON.stringify(json),
            type: 'POST',
            async: true,
            success: (response, status, xhr) => {
              if (response.code == 0) {
                this.d1_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
                this.$xutils.showMsgBox('提示', '删除成功');
              }
            }
          });
        }
      });
    },
    /**
      * 特殊限额新增
      **/
    quotaInsert () {
      // 将合作方编号传递过去，新增时增加级联关系
      const json = {
        serno: this.param.serno,
        oprType: this.param.oprType,
        operate: 'ADD'
      };
      this.$dialog.open(
        '特殊限额新增',
        'bizmanage/coopBiz/coopPlanApp/cooPlanQuataIndex',
        800,
        260,
        json,
        () => {
          this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        }
      );
    },
    /**
      * 方案特殊限额修改
      **/
    quotaUpdate () {
      const row = this.d1_B_B_B_A_BillList.getSelectedRowData();
      if (!row) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 标记更新
      row.operate = 'UPDATE';
      this.$dialog.open(
        '特殊限额修改',
        'bizmanage/coopBiz/coopPlanApp/cooPlanQuataIndex',
        800,
        260,
        row,
        () => {
          this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
        }
      );
    },
    /**
      * 方案特殊限额删除
      **/
    quataDelete () {
      const rowData = this.d1_B_B_B_A_BillList.getSelectedRowData();
      if (!rowData) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 删除操作
          this.quataDeleteAfter();
        }
      });
    },
    /**
      * 方案特殊限额删除
      **/
    quataDeleteAfter () {
      const rowData = this.d1_B_B_B_A_BillList.getSelectedRowData();
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/coopplanespecquotactrl/delete',
        data: JSON.stringify(rowData),
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.d1_B_B_B_A_BillList.queryDataByCondition('serno=\'' + this.param.serno + '\'');
            this.$xutils.showMsgBox('提示', '删除成功');
          }
        }
      });
    },
    /**
      * 关闭页面
      **/
    back () {
      this.getFactory().back();
    },
    /**
      * 页面校验
      **/
    validate () {
      let result = true;
      let result1 = true;
      let result2 = true;
      const _this = this;
      if (this.param.partnerType == 2) {
        result = _this.d1_A_BillCard.validateBillCardValue();
        result1 = _this.d1_B_B_A_BillCard.validateBillCardValue(function () {});
        result2 = _this.d1_B_B_B_A_BillCard.validateBillCardValue();
      } else if (_this.param.partnerType == 1 || _this.param.partnerType == 5 || _this.param.partnerType == 12 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) {
        result = _this.d1_A_BillCard.validateBillCardValue();
        result1 = _this.d1_B_B_A_BillCard.validateBillCardValue();
        result2 = _this.d1_B_B_B_A_BillCard.validateBillCardValue();
      } else {
        result = _this.d1_BillCard.validateBillCardValue();
      }
      if ((_this.param.partnerType == 2 || _this.param.partnerType == 1 || _this.param.partnerType == 5 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) && _this.d1_B_A_BillList.getBillListData().length == 0 && _this.d1_A_BillCard.getBillCardValue().isWholeBankSuit != '1') {
        _this.$xutils.showMsgBox('提示', '请添加适用机构');
        return false;
      }
      // 合作方类型为担保公司时再校验是否填写了特殊限额
      // if (_this.param.partnerType == 2 && _this.d1_B_B_B_A_BillList.getBillListData().length == 0) {
      //   _this.$xutils.showMsgBox('提示', '请添加方案特殊限额');
      //   return false;
      // }

      return result && result1 && result2;
    },
    /**
       * 保存数据
       **/
    saveData () {
      let card = {};
      let card1 = {};
      let card2 = {};
      const _this = this;
      if (this.param.partnerType == 2) {
        card = _this.d1_A_BillCard.getBillCardValue();
        card1 = _this.d1_B_B_A_BillCard.getBillCardValue();
        card2 = _this.d1_B_B_B_A_BillCard.getBillCardValue();
      } else if (_this.param.partnerType == 1 || _this.param.partnerType == 12 || _this.param.partnerType == 5 || _this.param.partnerType == 3 || _this.param.partnerType == 4 || _this.param.partnerType == 8 || _this.param.partnerType == 15) {
        card = _this.d1_A_BillCard.getBillCardValue();
        card1 = _this.d1_B_B_A_BillCard.getBillCardValue();
        card2 = _this.d1_B_B_B_A_BillCard.getBillCardValue();
      } else {
        card = _this.d1_BillCard.getBillCardValue();
      }
      // 将三个表单的数据拼接到一个对象中
      this.clone(card, _this.param);
      this.clone(card1, _this.param);
      this.clone(card2, _this.param);
      if (_this.param.tradeClass) {
        _this.param.tradeClass = _this.param.tradeClass.join(',');
      }
      return request({
        url: this.$backend.cmisBiz + '/api/coopplanapp/update',
        method: 'POST',
        data: JSON.stringify(_this.param)
      });
    },

    /**
       * 对象数据拷贝
       **/
    clone (src, dest) {
      if (!(typeof sr !== 'object' || typeof src !== 'function' || src === null)) {
        return src;
      }
      Object.keys(src).forEach((key, index) => {
        if (src[key]) {
          dest[key] = src[key];
        }
      });
    }
  }
};
</script>
