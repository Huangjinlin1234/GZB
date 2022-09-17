/*
  * 公共方法主要应用于   对公授信     ==> 资金业务主体授信
  *                    同业机构
  *                    其他事项申请  ==> 授信抵押物价值认定申请信息
  * */

import { MessageBox, Message } from 'yuwp-ui';
import { sessionStore, request, lookup, storage } from '@/utils';
import { getBizType } from "@/views/bizmanage/lmtBiz/util/BizInvestCommonUtil.js";


/**
 * 判断登记人是否可以修改、删除某一条数据
 * @param {Object} params 参数
 */
export function isLoginEdit(params) {
  var edit = false;
  if (params.loginCode && params.inputId) {
    if (params.loginCode == params.inputId) {
      if (params.status != '2') {
        // 非复议
        if (params.approveStatus != "000" && params.approveStatus != "992") {
          showMessage("仅【待发起】【退回】状态可" + params.status + "！", 'warning');
        } else {
          edit = true;
        }
      } else {
        // 复议时  判断当前申请状态是否为自行退出状态
        if (params.approveStatus != "997" && params.approveStatus != "998") {
          showMessage("审批状态为自行退出的授信申报不允许发起复议！", 'warning');
        } else {
          edit = true;
        }
      }
    } else {
      let status = params.status == '2' ? "发起复议" : params.status
      showMessage("您没有权限" + status + "！", 'warning');
    }
  } else if (params.roles) {
    // 知识库维护员 可以编辑
    params.roles.forEach(item => {
      if (item.code == 'R1038') {
        edit = true
      }
    })
    if (!edit) {
      showMessage("您没有权限" + params.status + "！", 'warning');
    }
  }
  return edit
}

/**
* 影像生成的url
* @param para：第三方系统业务参数
* @param s：1-采集 2-查看；默认2
* @param authority：权限按钮控制
*/
export function imageSystem(para, s, authority) {
  var _this = this;
  let reqData = {
    para: para,
    s: s,
    authority: authority
  };
  return new Promise((resolve) => {
    request({
      method: 'POST',
      url: backend.cmisCus + '/api/image/getImageSrc',
      data: reqData,
    }).then((res) => {
      if (res.code == '0') {
        resolve(window.encodeURI(res.data));
      } else {
        showMessage("'影像系统地址获取失败！");
      }
    })
  })
}

/*
  * 参数说明：
  * money：数字格式化 单位万元转化（table表中） 展示数据
  * */
export function numFn(money) {
  if (money && money != undefined && money != null) {
    let num;
    if (parseFloat(money) >= 10000) {
      num = parseFloat(money * 1 / 10000).toFixed();
      num = parseFloat((num + '').replace(/[^\d.-]/g, '')).toFixed(0) + '';
      const l = num.split('.')[0].split('').reverse();
      let t = '';
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
      }
      return t.split('').reverse().join('');
    } else {
      num = money * 1 / 10000;
      return parseFloat(num).toFixed(4);
    }
  } else {
    return money;
  }

};
/*
  * 参数说明：
  * money：去除数字格式化
  * */
export function numDe(money) {
  if (money && money != undefined && money != null) {
    money = money.toString();
    money = money.replace(/,/gi, '');
    return money;
  } else {
    return money;
  };
};

/*
  * 所有金额字段 单位万元转化（input） 展示数据&&保存数据
  * obj：Object  type: D 除以一万  M 乘以一万
  * */
export function numDM(obj, type) {
  let arr = ["origiLmtAmt", "lmtAmt", "sobsAmt", "assetManaAmt", "intendActualIssuedScale", "prdTotalAmt", "curtLevelInvestScale", "curtLevelRaiseScale", "basicAssetTotalAmt", "assetPackMaxSigAmt", "lmtSingleMfAmt", "lmtMfAmt"];
  Object.keys(obj).forEach(key => {
    if (isValue(obj[key])) {
      arr.forEach(item => {
        if (key == item) {
          if (type == 'D') {
            obj[key] = parseFloat(obj[key] / 10000).toFixed()
          } else {
            obj[key] = parseFloat(obj[key] * 10000).toFixed()
          }
        }
      })
    }
  })
  return obj
}

/*
  * 参数说明：
  * nodeId：根据节点号判断岗位权限、展示相关报告（审查、批复、核查）
  * */
export function nodeHandle(nodeId) {
  var nodeId = nodeId.toString();
  var obj = {};
  nodeData.forEach(item => {
    if (item.nodeId == nodeId) {
      obj = item;
    }
  })
  return obj;
};

/*
  * 流程批复、审查报告
  * */
export const approveProcess = {
  data() {
    return {
      dataUrl: '',
      dataParam: {},
      apprLoanUrl: '',
      apprLoanParam: {},
      formReport: {},
      dialogVisible: false,
      formdataDialog: {},
      formDisabled: false,
      saveBtnShow: false,
      dialogLoanCond: false,
      hidden: true,
      data: [],
      rules: {
        inteAnaly: [
          { required: false, message: '请填写出具综合分析', trigger: 'blur' }
        ],
        inteAnalyZh: [
          { required: false, message: '请填写出具综合分析', trigger: 'blur' }
        ]
      },
      disabledInteAnaly: false,
      disabledInteAnalyZH: false,
      showBuild: '',
      numFn,
      showInteAnaly: false
    }
  },
  created() {
    let pageParams = this.pageParams
    let op = pageParams.op;
    if (op == 'EDIT') {
      this.saveBtnShow = true;
      // 控制 输入框是否只读
      if (pageParams.disabledInteAnaly) {
        this.disabledInteAnaly = true;
        this.rules.inteAnaly[0].required = true;
      }
      if (pageParams.disabledInteAnalyZH) {
        this.disabledInteAnalyZH = true;
        this.rules.inteAnalyZh[0].required = true;
      }
    } else {
      this.saveBtnShow = false;
      this.disabledInteAnaly = false;
      this.disabledInteAnalyZH = false;
    }
    // 主体、产品授信
    if (isValue(pageParams.lmtBizType)) {
      let lmtBizType = pageParams.lmtBizType;
      if (
        lmtBizType == '4008' ||
        lmtBizType == '4002' ||
        lmtBizType == '4011' ||
        lmtBizType == '4012' ||
        lmtBizType == '4010' ||
        lmtBizType == '4009' ||
        lmtBizType == '4004' ||
        lmtBizType == '16010101' ||
        lmtBizType == '16020101'
      ) {
        this.showBuild = 1;
      } else if (lmtBizType == '4001') {
        // 债券池   发起者是信评岗，隐藏 信评岗出具综合分析
        this.showBuild = 2;
        this.showInteAnaly = true;
      } else if (lmtBizType == '4006' || lmtBizType == '4007') {
        this.showBuild = 3;
      } else if (lmtBizType == '4003' || lmtBizType == '4005') {
        this.showBuild = 4;
      }
    }
    this.init();
  },
  methods: {

    // 审批分项信息修改
    updateApprSubFn() {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.saveBtnShow = true;
      _this.formDisabled = false;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataDialog);
        _this.formdataDialog.lmtAmt = parseFloat(_this.formdataDialog.lmtAmt / 10000).toFixed();
      });
    },

    // 审批信息查看
    selectApprSubFn() {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.saveBtnShow = false;
      _this.formDisabled = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataDialog);
        _this.formdataDialog.lmtAmt = parseFloat(_this.formdataDialog.lmtAmt / 10000).toFixed();
      });
    },

    // 弹窗返回按钮
    canclFn() {
      var _this = this;
      _this.dialogVisible = false;
    },

    // 弹窗保存按钮
    saveBtn(type) {
      var _this = this;
      var validate = false;
      _this.$refs.refFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      let model = Object.assign({}, _this.formdataDialog);
      // if (this.showBuild == 2) {
      //   if (_this.formdataDialog.sobsAmt > _this.formdataDialog.lmtAmt) {
      //     _this.$message({
      //       message: '自营额度不得超过授信金额,请修改后重新保存！',
      //       type: 'error'
      //     });
      //     return;
      //   }
      //   if (_this.formdataDialog.assetManaAmt > _this.formdataDialog.lmtAmt) {
      //     _this.$message({
      //       message: '资管额度不得超过授信金额,请修改后重新保存！',
      //       type: 'error'
      //     });
      //     return;
      //   }
      //   model.sobsAmt = parseFloat(model.sobsAmt * 10000).toFixed();
      //   model.assetManaAmt = parseFloat(model.assetManaAmt * 10000).toFixed();
      // }
      model.lmtAmt = parseFloat(model.lmtAmt * 10000).toFixed();
      // 主体、产品授信
      let url = "/api/lmtsiginvestappr/updateAppr";
      if (type == "intBank") {
        // 同业客户
        url = "/api/lmtintbankapprsub/updateApprSub";
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + url,
        data: model,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message('操作成功');
            _this.dialogVisible = false;
            _this.init();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },

    // 其他要求返回按钮
    canclLoanFn() {
      var _this = this;
      _this.$refs.refFormLoanCond.resetFields();
      _this.dialogLoanCond = false;
    },

    // 添加要求按钮
    addLoanCond() {
      var _this = this;
      _this.dialogLoanCond = true;
    },

    // 其他要求保存按钮
    saveLoanBtn() {
      var _this = this;
      var validate = false;
      _this.$refs.refFormLoanCond.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapprloancond/insertLoanCond',
        data: {
          condition: JSON.stringify({
            condDesc: _this.formdataLoanCond.condDesc,
            approveSerno: _this.approveSerno,
            condType: '01'
          })
        },
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message('操作成功');
            _this.dialogLoanCond = false;
            _this.$refs.refFormLoanCond.resetFields();
            _this.init();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },

    // 删除按钮
    deleteLoanCond() {
      var _this = this;
      var selections = _this.$refs.refTable1.selections;
      var obj = _this.$refs.refTable1.selections[0];
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtapprloancond/deleteByPkId',
              data: obj,
              callback: function (code, message, response) {
                _this.$refs.refTable1.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
  },
}

/*
  * 项目基本信息
  * */
export const projectInformation = {
  data() {
    return {

    }
  },
  methods: {
    // 债券分类过滤
    datacodeFilterFn: function (opts, datacode, name) {
      var _this = this
      return opts.filter(function (op) {
        // 展示项  // 法人客户
        let str = 'M,Q,4,E,N,N1,6,O,G,H,P,K,J,I,V,Z,Z1,S,';
        if (_this.children.customer == 3) {
          // 同业客户
          str = '7,9,U,X,Y,C,C1,C2,C3,C4,C5,C6,C9,61,';
        }
        if (str.indexOf(op.key + ',') != -1) {
          return true;
        }
        return false;
      });
    },
    // 保存
    saveFn: function () {
      return new Promise((resolve, reject) => {
        var validate = false,
          _this = this;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: "数据验证不通过，请修改后重新保存！",
            type: "error",
          });
          return;
        }
        var model = {};
        yufp.clone(_this.formdata, model);
        // 向后台发送保存请求
        model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
        model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
        model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
        model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
        model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
        model = numDM(model, "M");
        model.rate = model.rate + "";
        model.lmtBizTypeName = yufp.lookup.find("STD_ZB_PRD_BIZ_TYPE", false)[
          _this.formdata.lmtBizType
        ];
        var updateurl =
          backend.cmisBiz + "/api/lmtsiginvestapp/updateProjectBasicInfo";
        _this
          .$request({
            method: "POST",
            url: updateurl,
            data: model,
          })
          .then((data) => {
            if (data.code == "0") {
              _this.$message({ message: "保存成功", type: "success" });
              resolve();
            } else {
              _this.$message({ message: "保存失败", type: "error" });
            }
            //yufp.globalEventBus.$emit('refreshOtherForRateAppTable1');
          });
      });
    },
    // 提交
    doSubmit() {
      this.saveFn().then(res => {
        var obj = this.formdata;
        const loginUser = this.$xutils.getLoginUserInfo();
        let dutysArry = []; //  loginUser.dutys
        for (let i = 0; i < loginUser.dutys.length; i++) {
          dutysArry.push(loginUser.dutys[i].code);
        }
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = this.$store.state.oauth.org.code;
        startdto.userId = this.$store.state.oauth.loginCode;
        startdto.bizId = obj.serno; // this.getFactory().contextData.surveySerno;
        startdto.bizUserName = obj.cusName; // this.d1_A_BillCard.getItemValue('cusName');
        startdto.bizUserId = obj.cusId; // this.d1_A_BillCard.getItemValue('cusId');
        startdto.bizPkId = obj.pkId;
        startdto.param = obj;
        startdto.param.tableName = 'lmtsiginvestapp';
        startdto.param.dutyOrgType = loginUser.org.orgType;
        startdto.param.dutys = dutysArry.join(',');
        // 发起人所属机构类型
        let orgType = this.$store.state.oauth.org.orgType;
        startdto.bizType = getBizType(obj.appType, obj.lmtBizType, orgType);
        this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    // 流程回调
    forceUpdate() {
      this.cancelFn();
    },
    // 返回
    cancelFn() {
      this.$emit('changed', false);
    },
    // 查看批复编号
    goApply() {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestacc/selectAccNoByReplyNo',
        data: _this.formdata.origiLmtReplySerno,
        callback: function (code, message, response) {
          if (code == '0') {
            console.log('==========', response);
            goDetails(response.data);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        }
      });
      function goDetails(serno) {
        let model = {};
        model.formdata = {
          accNo: serno
        };
        var routeKey = 'templetfactory' + model.origiLmtReplySerno + 'DETAIL';
        model.routeKey = routeKey;
        model.op = 'DETAIL';
        _this.$router.addTab({
          name: 'bizmanage/lmtBiz/lmtSigInvestAcc/lmtSigInvestAccDetail',
          key: routeKey,
          title: '查看批复详情',
          data: model
        });
      }
    }
  }
}

/*
  * 角色岗位判断是否显示债券池（4001）
  * */
export function isRolesPool(roleArr) {
  // FZH01-对公客户经理 JRB07-金融市场部投资 JRB08-资产管理部投资经理   除去 4001-债券池
  // JRB03-金融市场总部风险合规部信评岗                               包含 4001-债券池
  // let roleArr = _this.$xutils.getLoginUserInfo().dutys;
  let str = true;
  if (isValue(roleArr)) {
    roleArr.forEach(a => {
      let code = a.code;
      if (code == 'FZH01' || code == 'JRB07' || code == 'JRB08') {
        // 除去 4001-债券池
        str = false;
      } else if (code == 'JRB03') {
        // 包含 4001-债券池
        str = true;
      }
    });
  }
  return str
}

/*
  * 表格合计自定义（万元转化）
  * */
export const tableTotal = {
  methods: {
    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) { return Number(item[column.property]) });
        if (!values.every(function (value) { return isNaN(value); })) {
          let obj, total;
          sums[index] = values.reduce(function (prev, curr) {
            var value = Number(curr);
            if (!isNaN(value)) {
              obj = jsonFilter(column.property);
              if (obj.type == 0) {
                curr = parseFloat(curr / 10000).toFixed();
                total = Number(prev) + Number(curr)
              } else if (obj.type == 1) {
                curr = parseFloat(curr * 100).toFixed(2);
                total = parseFloat(Number(prev) + Number(curr)).toFixed(2)
              } else {
                obj.sign = '';
                total = Number(prev) + Number(curr)
              }
              return total;
            } else {
              return prev;
            }
          }, 0);

          sums[index] += obj.sign;
        } else {
          // sums[index] = 'N/A';
        }
      });
      return sums;
    }
  }
}

/*
  * 保存 上传的图片
  * fileItem  上传图片成功的回调必要参数
  * pkId
  * key  PicturePath标识
  * url  保存接口
  * */
export function upImage(fileList, fileItem, pkId, key, url) {
  fileItem.icon && delete fileItem.icon;
  fileList.push(fileItem);
  let model = {
    fileId: String(fileItem.fileId),
    pkId: pkId,
    key: key,
  };
  for (let index in model) {
    if (model.hasOwnProperty(index)) {
      if (!isValue(model[index])) {
        showMessage(index + "获取失败！请刷新页面重新上传！", "error");
        return false;
      }
    }
  }
  let obj = {};
  obj.fileList = fileList;
  return new Promise((resolve) => {
    request({
      method: 'POST',
      url: url,
      data: model,
    }).then((res) => {
      if (res.code == '0') {
        obj.path = res.data;
        resolve(obj);
        showMessage("上传成功！", "success");
      } else {
        showMessage("上传失败！", "error");
      }
    })
  })
}

/*
  * 删除 图片
  * file
  * pkId
  * key  PicturePath标识
  * url  删除接口
  * */
export function DeleteImage(fileList, file, pkId, key, url) {
  fileList.forEach((item, index) => {
    if (item.filePath === file.filePath) {
      fileList.splice(index, 1);
    }
  });
  let model = {
    fileId: "",
    pkId: pkId,
    key: key,
  };
  request({
    method: "POST",
    url: url,
    data: model
  }).then(res => {
    if (res.code == "0") {
      showMessage("删除成功！", "success")
    } else {
      showMessage("删除失败！", "error")
    }
  })
  return fileList;
}

/**
 * 获取文件信息
 * @param {String}  filePath 图片相关信息  icon 图标
 */
export function getFile(filePath, icon) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: backend.cmisBiz + "/api/lmtsiginvestrelfinainfo/selectFileInfo",
      data: {
        filePath: filePath
      },
    })
      .then((data) => {
        if (data.code == "0") {
          if (data.data) {
            var obj = {
              extName: icon,
              fileId: data.data.fileId,
              fileName: data.data.fileName,
              filePath: data.data.filePath,
              fileSize: data.data.fileLength,
            };
            var fileListInfo = []
            fileListInfo.push(obj);
            resolve(fileListInfo);
          }
        } else {
          showMessage("请求失败！", "error")
        }
      });
  });
}

/**
 * 其他事项申请 跳转 单一客户授信详情
 */
export const toSingleCustomer = {
  methods: {
    goSingleCustomer() {
      var _this = this;
      let obj = {};
      let name, customerUrl, params;
      let isGroup = false;
      _this.$request({
        method: 'GET',
        url: backend.cmisLmt + '/api/apprstrmtableinfo/selectCusIsGrpMemCus/' + _this.formdata.cusId,
      }).then((data) => {
        if (data.data.rtnCode == '70091') {
          // 集团客户
          isGroup = true;
          customerUrl = '/api/lmtgrpmemrel/queryLmtGrpMemRelBySingleSerno';
          params = _this.formdata.lmtSerno;
        }else{
          // 单一客户
          isGroup = false;
          customerUrl = '/api/lmtreplyacc/querylmtreplyaccdatabyparams';
          params = _this.formdata.cusId;
        }
        getSernoAccNo(customerUrl, params).then(res => {
          goTab(isGroup, res)
        })
      })

      function getSernoAccNo(url, params) {
        return new Promise((resolve) => {
          _this.$request({
            method: 'POST',
            url: backend.cmisBiz + url,
            data: params
          }).then((response) => {
            if (response.data == null) {
              _this.$message({ message: '该用户没有生效的授信批复台账！', type: 'error' });
              return;
            }
            resolve(response.data)
          })
        })
      }
      function goTab(isGroup, res) {
        if (!isGroup) {
          // 单一客户
          name = 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyAccDetail';
          obj = {
            replySerno: res.replySerno,
            accNo: res.accNo
          }
        } else {
          // 集团客户
          name = 'zrcbank/biz/LmtGrpReplyAcc/lmtGrpReplyAccDetail';
          obj = {
            saveBtnShow: true,
            viewType: 'view',
            grpReplySerno: res.grpReplySerno,
            grpAccNo: res.grpAccNo
          }
        }
        _this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: new Date().getTime(), // 必传
          // 页签名称
          title: '批复详情',
          data: obj
        });
      }
    },
    // goSingleCustomer() {
    //   var _this = this;
    //   _this.$request({
    //     method: 'POST',
    //     url: `${backend.cmisBiz}/api/lmtapp/getlmtappbyserno`,
    //     data: {
    //       serno: _this.formdata.lmtSerno
    //     }
    //   }).then((data) => {
    //     console.log("============================>>>", data)
    //     if (data.code == '0') {
    //       let rowData = data.data;
    //       addTabb(rowData)
    //     } else {
    //       _this.$message({ message: '数据获取失败！', type: 'error' });
    //     }
    //   });
    //   function addTabb(rowData) {
    //     var path = "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex";
    //     var topOutsystemCode = '';
    //     if (rowData.lmtType == '05') {
    //       topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
    //     } else {
    //       topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF';
    //     }

    //     _this.$router.addTab({
    //       name: path,
    //       key: rowData.pkId,
    //       title: '单一客户授信申报',
    //       data: {
    //         model_group_no: 'CMG000702',
    //         pk_id: rowData.pkId,
    //         scene: '01',
    //         op: 'VIEW',
    //         serno: rowData.serno,
    //         period: '01',
    //         editAble: true,
    //         biz_serno: rowData.serno,
    //         cusId: rowData.cusId,
    //         borrowerCusId: rowData.cusId,
    //         borrowerCusName: rowData.cusName,
    //         ogrigiLmtSerno: rowData.ogrigiLmtSerno,
    //         topOutsystemCode: topOutsystemCode
    //       }
    //     })
    //   }
    // }
  }
}

/**
 * 其他事项申请 新建 选取客户
 */
export const selectCustomer = {
  methods: {
    /**
     * 参照公共的确认事件
     */
    commonCusSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
        this.getCustomer(data)
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
      if (this.formdata.cusRankCls == '02') {
        this.$xutils.showMsgBox('提示', '临时客户不支持合同申请!', 350, 150);
        this.formdata.cusId = '';
        this.formdata.cusName = '';
        this.formdata.cusRankCls = '';
        return;
      }
    },
  }
}

/**
 * 贷审会投票 根据bizType跳转相应节点 总行投资管理委员会 的路径
 */
export function mettingVote(bizType) {
  let obj = {};
  obj.bizPage = 'bizmanage/lmtBiz/lmtIntBankAppr/examineReportIndex.vue';
  // 主体、产品授信
  obj.tableName = "lmtsiginvestapp";
  if (bizType == 'TY004' || bizType == 'TY005' || bizType == 'TY006' || bizType == 'TY011' || bizType == 'TY012' || bizType == 'TY013') {
    obj.nodeId = '137_39';
    if (bizType == 'TY004' || bizType == 'TY005' || bizType == 'TY006') {
      // 同业
      obj.tableName = "lmtIntbankApp";
    }
  } else if (bizType == 'TY008' || bizType == 'TY009' || bizType == 'TY010') {
    obj.nodeId = '164_3';
  } else if (bizType == 'TY014' || bizType == 'TY015' || bizType == 'TY016') {
    obj.nodeId = '161_39';
  }
  return obj;
}

// table中合计 需要 万元 % 换算的字段   getSummaries连用
function jsonFilter(property) {
  // type=0 万元  type=1 %
  let json = [
    { type: 0, name: 'singleBalanceRange', sign: '万元' },
    { type: 0, name: 'rateDistribution', sign: '万元' },
    { type: 1, name: 'balPerc', sign: '%' },
    { type: 1, name: 'qntPerc', sign: '%' },
  ]
  let obj = {};
  json.forEach(item => {
    if (item.name == property) {
      obj = item;
    }
  })
  return obj
}

// 非空判断
function isValue(str) {
  if (str == undefined || str == null || str == '') {
    return false;
  }
  return true;
}

// 提示信息
function showMessage(msg, type, duration = 5) {
  msg && Message({
    message: msg,
    type: type,
    duration: duration * 1000
  });
}

var nodeData = [
  // 金融市场总部风险合规部信评岗
  { nodeId: "137_18", showExamine: true, showReply: false, showCheck: false, op: "EDIT", disabled: true },
  { nodeId: "164_32", showExamine: true, showReply: false, showCheck: true, op: "EDIT", disabled: true },
  { nodeId: "170_14", showExamine: true, showReply: false, showCheck: false, op: "EDIT", disabled: true },

  // 信贷管理风险派驻岗
  { nodeId: "137_30", showExamine: true, showReply: false, showCheck: false, op: "EDIT", disabledZH: true },
  { nodeId: "161_30", showExamine: true, showReply: false, showCheck: false, op: "EDIT", disabledZH: true },
  { nodeId: "164_36", showExamine: true, showReply: false, showCheck: true, op: "EDIT", disabledZH: true },
  { nodeId: "170_19", showExamine: true, showReply: false, showCheck: false, op: "EDIT", disabledZH: true },

  // 只显示审查（只读）
  { nodeId: "170_15", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "170_16", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "170_17", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "170_18", showExamine: true, showReply: false, showCheck: false },

  { nodeId: "137_2", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_4", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_8", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_12", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_13", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_19", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_33", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_34", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_36", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_39", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_74", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_78", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_101", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_102", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_139", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_147", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "137_222", showExamine: true, showReply: false, showCheck: false },

  { nodeId: "161_114", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_118", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_33", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_74", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_78", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_123", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_101", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_102", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_4", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_6", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_3", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_38", showExamine: true, showReply: false, showCheck: false },
  { nodeId: "161_39", showExamine: true, showReply: false, showCheck: false },

  // 核查（可修改）
  { nodeId: "164_13", showExamine: false, showReply: false, showCheck: true, cop: "EDIT" },

  // 核查（只读）
  { nodeId: "164_14", showExamine: false, showReply: false, showCheck: true },
  { nodeId: "164_15", showExamine: false, showReply: false, showCheck: true },
  { nodeId: "164_16", showExamine: false, showReply: false, showCheck: true },


  // 核查（只读） 审查（只读）
  { nodeId: "164_33", showExamine: true, showReply: false, showCheck: true },
  { nodeId: "164_34", showExamine: true, showReply: false, showCheck: true },
  { nodeId: "164_35", showExamine: true, showReply: false, showCheck: true },
  { nodeId: "164_37", showExamine: true, showReply: false, showCheck: true },
  { nodeId: "164_38", showExamine: true, showReply: false, showCheck: true },
  { nodeId: "164_3", showExamine: true, showReply: false, showCheck: true },

  // 审查（只读）、批复（可修改）
  { nodeId: "170_20", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "161_37", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "161_119", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "161_122", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "161_67", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },

  { nodeId: "137_37", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "137_130", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "137_123", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },
  { nodeId: "137_67", showExamine: true, showReply: true, showCheck: false, rop: "EDIT" },

  // 审查（只读）、批复（只读）
  { nodeId: "137_41", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_42", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_171", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_183", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_173", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_62", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_90", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_91", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_93", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_94", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "137_64", showExamine: true, showReply: true, showCheck: false },

  { nodeId: "161_41", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_42", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_171", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_183", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_173", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_62", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_90", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_91", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_93", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_94", showExamine: true, showReply: true, showCheck: false },
  { nodeId: "161_64", showExamine: true, showReply: true, showCheck: false },

  // 批复（可修改）、审查（只读）、核查（只读）
  { nodeId: "164_98", showExamine: true, showReply: true, showCheck: true, rop: "EDIT" },
  { nodeId: "164_102", showExamine: true, showReply: true, showCheck: true, rop: "EDIT" },
  { nodeId: "164_53", showExamine: true, showReply: true, showCheck: true, rop: "EDIT" },

  // 批复（只读）、审查（只读）、核查（只读）
  { nodeId: "164_40", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_41", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_43", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_44", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_45", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_46", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_47", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_48", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_50", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_4", showExamine: true, showReply: true, showCheck: true },
  { nodeId: "164_52", showExamine: true, showReply: true, showCheck: true },
]
