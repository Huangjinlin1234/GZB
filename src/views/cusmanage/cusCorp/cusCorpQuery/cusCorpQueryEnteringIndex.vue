/**
 * @created by wangyouhong 2021-09-01
 * @updated by
 * @description 客户经理分成比例
 */
<template>
 <div>
 <yu-tabs v-model="activeName">
  <yu-tab-pane label="客户经理分成比例录入操作页面" name="manage">
   <yu-panel title="客户经理分成比例录入操作页面" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <template slot="right">
        <div>
          <yu-button type="primary"  @click="addFn" >新增</yu-button>
          <yu-button type="primary"  @click="doSave" >暂存</yu-button>
          <yu-button type="primary"  @click="deleteFn">删除</yu-button>
        </div>
      </template> 
      <yu-xtable ref="refTable"  condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" 
      :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center"  label="客户号" prop="cusId"  ></yu-xtable-column>
        <yu-xtable-column align="center"  label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="工号" prop="managerId" @blur="returnFn" :rules="managerId"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="姓名" prop="managerName" :rules="managerName" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="机构" prop="managerBrId" :rules="managerBrId" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="分成比例(%)" prop="dividePerc" :rules="dividePerc"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="性质" prop="managerProp" data-code="STD_CUS_MGR_PROP" @change="returnFn" :rules="managerProp"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="是否生效" prop="isEffect" data-code="STD_ZB_STATUS" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记人" prop="inputId"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记日期" prop="inputDate"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="datepicker" label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
      </yu-xtable>
      <div style="text-align:center;margin-top:20px"> 
         <yu-button type="primary" @click="submit">提交</yu-button>
         <yu-button type="primary" @click="doBack">返回</yu-button>
      </div>
    </yu-panel>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="submitSuccess"></yufp-nwf-init>
  </yu-tab-pane>
  <yu-tab-pane label="客户经理分成比例已生效列表" name="success">
    <yu-panel title="客户经理分成比例已生效列表" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <yu-xtable ref="refTableSuccess"  condition-key="condition" style="margin-top:10px" row-number 
      :data-url="dataUrlSuccess" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center"  label="客户号" prop="cusId"  ></yu-xtable-column>
        <yu-xtable-column align="center"  label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center"  label="工号" prop="managerId" ></yu-xtable-column>
        <yu-xtable-column align="center"  label="姓名" prop="managerName"></yu-xtable-column>
        <yu-xtable-column align="center"  label="机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column align="center"  label="分成比例(%)" prop="dividePerc"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="性质" prop="managerProp" data-code="STD_CUS_MGR_PROP" disabled ></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="是否生效" prop="isEffect" data-code="STD_ZB_STATUS" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记人" prop="inputId"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="登记日期" prop="inputDate"  hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="创建时间" prop="createTime" hide-column></yu-xtable-column>
        <yu-xtable-column align="center" ctype="datepicker" label="修改时间" prop="updateTime" disabled></yu-xtable-column>
      </yu-xtable>
     </yu-panel>
  </yu-tab-pane>
  </yu-tabs>
 </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_CUS_MGR_PROP,STD_ZB_APPR_STATUS,STD_ZB_STATUS');
export default {
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  components:{yufpNwfInit},
  data () {
    return {
      // 小u留痕 
      managerId:[
        { required: true, message: '必填', trigger: 'blur' }
      ],
      managerProp:[
        { required: true, message: '必填', trigger: 'blur' }
      ],
      managerName:[
        { required: true, message: '必填', trigger: 'blur' }
      ],
      managerBrId:[ 
        { required: true, message: '必填', trigger: 'blur' }
      ],
      dividePerc:[ 
        { required: true, message: '必填', trigger: 'blur' }
      ],
      dataUrl: this.$backend.cmisCus + '/api/cusmgrdivideperc/queryListInfoByCusId',
      baseParams:{condition:{cusId: this.$route.meta.params.cusId}},
      activeName:'manage',
      dataUrlSuccess: this.$backend.cmisCus + '/api/cusmgrdivideperc/selectEffectListByCusId',
    };
  },
 
  methods: {
      returnFn(){ ///orgAccessCheck
        var _this = this
        var selectData = this.$refs.refTable.selections[0];
        if(selectData.managerProp && selectData.managerId){
          var params = {};
          params.managerId = selectData.managerId;
          params.managerProp = selectData.managerProp;
          yufp.service.request({
            method: 'POST',
            url: this.$backend.cmisCus + '/api/cusmgrdivideperc/checkIsSameOrg',
            data: params,
            callback: function (code, message, response) {
             if (response.code == 0) {
               if(response.data.code == "-1") {
                 _this.$message.error(response.data.message)
               } else { 
                 selectData.managerName = response.data.managerName
                 selectData.managerBrId = response.data.orgName
               }
             } else {
               _this.$message.error(response.message)
             }
            }
          })
        }
      },
    /* 添加数据 添加一条空白数据 */
    addFn: function () {
      var flag = false
      this.$refs.refTable.validate(function (fields) {
        if(!fields){
          flag = true;
        }
      });
      if (flag) {
        let serno = this.$xutils.getUUID();
        let row = {serno: serno, cusId: this.$route.meta.params.cusId, cusName: this.$route.meta.params.cusName, managerId:'', managerName:'', managerBrId:'', dividePerc:'', managerProp:''};
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      }
    },
    /* 修改,新增，统一调保存 */
     doSave () { 
      var _this = this;
      var modal = _this.$refs.refTable.tabledata;
      var validate = false;
      _this.$refs.refTable.validate(function (fields) {
        if(!fields){
          flag = true;
        }
      });
      if(!flag) {
       return _this.$message.error('请填写完必填项');
      }
      var url;
      var flag = modal.some(item => {
        return item.pkId
      });
      if(flag) { //修改接口
        url = this.$backend.cmisCus + '/api/cusmgrdivideperc/updateAll'
      } else {//新增接口
        url = this.$backend.cmisCus + '/api/cusmgrdivideperc/queryBeforeCreate'
      };
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(modal),
        callback: function (code, message, response) {
          if (response.code == '0') {
            // console.log('response', response)
            _this.$refs.refTable.remoteData(this.baseParams)
            _this.$message.success('分成比例录入暂存成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /* 提交 */
    submit(){
      // debugger
      var _this = this;
      //1.表格必填项校验
      var flag = false
      _this.$refs.refTable.validate(function (fields) {
        if(!fields){
          flag = true;
        }
      });
      if(!flag) {
        return _this.$message.error('校验未通过,请填写完必填项');
      }
      //2.校验分成比例
      var allocation = 0;
      var modal = _this.$refs.refTable.tabledata;
      modal.forEach(item => {
        allocation = Number(allocation) + Number(item.dividePerc)
      })
      if(allocation != 100){
        return _this.$message.error('分成比例之和应为100')
      };
      //3.客户经理性质校验 
      var select1 = [];//主办
      var select2 = [];//协办
      var select3 = [];//无
      modal.forEach(item => {
        if(item.managerProp == '1'){
          select1.push(item)
        } else if(item.managerProp == '2') {
          select2.push(item)
        } else {
          //无中找出虚拟，去除，剩余的加入select3中
          var params = {};
          params.managerId = item.managerId;
          params.managerProp = item.managerProp;
          yufp.service.request({
            method: 'POST',
            async:false,
            url: _this.$backend.cmisCus + '/api/cusmgrdivideperc/isVirtualCusManager',
            data: params,
            callback: function (code, message, response) {
              console.log('res', response)
             if(code == '0') {
               if(!response.data.flag) {
                 select3.push(item)
               }                                                 
             } else {
               _this.$message.error(response.message)
             }
            }
          })
          // select3.push(item)
        }
      })
      var dividePercSum3 = 0;
      if(select3.length > 0) {
         select3.forEach(item => {
         dividePercSum3 = dividePercSum3 + Number(item.dividePerc)
      });
      }
       //3.主办分成比例》协办分成比例 && .主办分成比例》无分成比例
      if(select1.length == 0 || select2.length == 0) {
        return _this.$message.error('校验未通过，主办与协办应各一位')
      }
      if((Number(select1[0].dividePerc) <= Number(select2[0].dividePerc)) || (Number(select1[0].dividePerc) <= dividePercSum3)) {
        return _this.$message.error('分成比例主办必须大于协办和无')
      }
      if(select1.length == 1 && select2.length == 1) {
      var url;
      var flag = modal.some(item => {
        return item.pkId
      });
      if(flag) { //修改接口
        url = _this.$backend.cmisCus + '/api/cusmgrdivideperc/updateAll'
      } else {//新增接口
        url = _this.$backend.cmisCus + '/api/cusmgrdivideperc/queryBeforeCreate'
      };
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(modal),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData()
            _this.$message.success('分成比例录入保存成功');
            //3.保存成功后，发起流程
            const loginUser = _this.$xutils.getLoginUserInfo();
            var pkId = response.data.pkId;
            let startdto = {};
            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.orgCode;
            startdto.userId = loginUser.loginCode;
            startdto.bizType = 'KH024';
            startdto.bizId = pkId; // 流水号
            startdto.bizUserName = _this.$route.params.cusName;
            startdto.bizUserId = _this.$route.params.cusId;
            startdto.param = {
              orgType: loginUser.org.orgType
            };
            _this.$refs.yufpNwfInit.wfInit(startdto);
          } else {
            _this.$message.error(response.message);
          }
        }
      });
     } else {
       _this.$message.error('客户经理性质校验失败，主办与协办各一位')
     }
    },
    /* 删除 */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        return _this.$message({ message: '请先选择一条记录', type: 'warning'});
      }
      var selectData = selectionsAry[0];
      if(!selectData.pkId){
        return this.$refs.refTable.tabledata.splice(this.$refs.refTable.tabledata.indexOf(selectData), 1);
      } 
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisCus + '/api/cusmgrdivideperc/deleteByParam',
              data: selectData,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                } else {
                  _this.$message({ message: response.message, type: 'error'});
                }
              }
            });
          }
        }
      });
    },
   doBack(){
     yufp.router.removeTab(this.$route.path);
   },
    /**
    * 工作流提交成功后回调
    */
   submitSuccess () {
     yufp.frame.removeTab(this.$route.path);
   }
  
  }
};
</script>
