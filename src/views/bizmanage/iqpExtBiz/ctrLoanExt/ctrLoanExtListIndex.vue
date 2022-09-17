<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './ctrLoanExtList_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    //业务展期协议
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    //签订
    doSign() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if (params.ext_ctr_status != '001'){
        this.$xutils.showMsgBox('提示', '只有待生效的协议才能进行签订!');
        return;
      }

      //塞入申请日期
      params['sign_date'] = this.$xutils.dateFormat('yyyy-MM-dd', new Date());

      //模板内容
      params['model_group_no'] = 'CTR_LOAN_EXT_NO';

      params['op'] = 'EDIT';

      // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
      params['biz_serno'] = params.ext_ctr_no;

      // 增加类型字段，用于判断业务规则校验
      params['bizType'] = 'iqp';

      //params['pageDataFlag'] = '0';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        _rt => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    //作废
    doInvalid() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const ext_ctr_status = params.ext_ctr_status;

      if (ext_ctr_status !== '001') {
        this.$xutils.showMsgBox('提示', '只有待生效的协议才能进行协议作废!');
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否作废协议号为:' + params.ext_ctr_no + '的协议？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          params.ext_ctr_status = '003';

          const jsoPar = {
            'templetcode': 'ctr_loan_ext_list',
            'carddata': params,
            'ds': 'cmis_biz',
            'LoginUserInfo': this.$xutils.getLoginUserInfo()
          };

          const jsoRt = this.$xutils.doClassMethodCall(
            'yuxpservice',
            'cn.com.yusys.yusp.yubao.base.service3.YuBaoBillDMO',
            'updateBillCardData',
            jsoPar
          ); // 保存数据

          if (jsoRt) {
            this.$xutils.showMsgBox('提示', '作废成功!', null, null, () => {
              this.d1_BillList.queryDataByCondition();
            });
          }
        }
      });
    },

    //撤销
    doRevoke() {
      //只有生效和未放款的协议才能被撤销
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const ext_ctr_status = params.ext_ctr_status;

      if (ext_ctr_status !== '002') {
        this.$xutils.showMsgBox('提示', '只有生效的协议才能进行协议撤销!');
        return;
      }

      // 确定是否有该协议的放款记录
      const checkFlg = this.chechExtAccLoan();

      if (checkFlg) {
        // 撤销
        this.$xutils.showConfirmBox('提示', '是否作撤销议号为:' + params.ext_ctr_no + '的协议？', 350, 150, confirmFlag => {
          if (confirmFlag) {
            params.ext_ctr_status = '004';

            const jsoPar = {
              'templetcode': 'ctr_loan_ext_list',
              'carddata': params,
              'ds': 'cmis_biz',
              'LoginUserInfo': this.$xutils.getLoginUserInfo()
            };

            const jsoRt = this.$xutils.doClassMethodCall(
              'yuxpservice',
              'cn.com.yusys.yusp.yubao.base.service3.YuBaoBillDMO',
              'updateBillCardData',
              jsoPar
            ); // 保存数据

            if (jsoRt) {
              this.$xutils.showMsgBox('提示', '撤销成功!', null, null, () => {
                this.d1_BillList.queryDataByCondition();
              });
            }
          }
        });
      } else {
        this.$xutils.showMsgBox('提示', '该协议已经放款,不能进行协议撤销!');
      }
    },

    //查看
    doView() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      params['model_group_no'] = 'CTR_LOAN_EXT_NO';
      params['op'] = 'VIEW';

      // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
      params['biz_serno'] = params.ext_ctr_no;

      // 增加类型字段，用于判断业务规则校验
      params['bizType'] = 'iqp';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        _rt => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 神奇的parent.parent.parent
    refreshBillListData() {
      this.d1_BillList.queryDataByCondition();
    },

    //检查是否存在协议号已经放款的记录(展期出账表存在不为否决998的记录 opr_type=01)
    chechExtAccLoan() {
      let flag = false;
      const extCtrNo = this.d1_BillCard.getItemValue('ext_ctr_no');

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisBiz + '/api/pvpextloan/chechExtAccLoan/' + extCtrNo,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            const count = response.data;

            if (count > 0) {
              flag = true;
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        }
      });

      return flag;
    }
  }
};
</script>
