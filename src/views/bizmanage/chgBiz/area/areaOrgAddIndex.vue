<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './areaOrgAdd_d1_BillList.vue'
/* 合同帐号变更业务申请-新增*/
let condition = '';

let jsoPar = '';
let parm = '';

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
    AfterInit() {
      parm = this.pageParams;
      this.d1_BillList = this.$refs.d1_BillList;
  
      //排除已经选取的机构
      condition = 'ORG_CODE NOT IN (SELECT ORG_NO FROM cmis_biz.area_org where area_no = \'' + parm.areaNo + '\')';
  
      this.d1_BillList.queryDataByCondition(condition);
      //重写查询方法
      //d1_BillQuery.addCustQueryAction(areaQueryAction);
    },
  
    /*function areaQueryAction(){
          d1_BillList.queryDataByCondition(condition);
      }*/
  
    /* 选取返回按钮  */
    doInsert() {
      //创建要保存的表单
      //选择机构提示
      jsoPar = this.d1_BillList.getSelectedRowData();
  
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
  
      const data = {};
  
      // 插入数据
      data.area_no = parm.areaNo;//区域编号
  
      const jsoUser = this.$xutils.getLoginUserInfo(); //当前登录用户信息
      data.org_no = jsoPar['org_code'];//主办人
      data.org_name = jsoPar['org_name'];//主办机构
      data.order_id = '1';
      data.input_id = jsoUser['loginCode'];//登记人
      data.input_br_id = jsoUser['orgCode'];//登记机构
      data.input_date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());//登记日期
      data.upd_id = jsoUser['loginCode'];//最后修改人
      data.upd_br_id = jsoUser['orgCode'];//最后修改机构
      data.upd_date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());//最后修改日期
      data.create_time = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());//日期
      data.update_time = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());//日期
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        // 新增
        url: this.$backend.cmisBiz + '/api/areaorg/insert',
  
        data: JSON.stringify(this.$xutils.toUpperCase(data, true)),
  
        success: (response, status, xhr) => {
          if (response.data) {
            jsoPar['model_group_no'] = 'area_manag_list';
            jsoPar['op'] = 'view';
            jsoPar['area_no'] = parm.areaNo;
            this.$dialog.open('微贷区域维护页面', 'bizmanage/chgBiz/area/areaOrgListIndex', -1, -1, jsoPar, null);
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
  
    /* 取消按钮*/
    cancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
