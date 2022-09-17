import { MessageBox, Message } from 'yuwp-ui';
import { isLoginEdit } from '@/utils/unitchange';;
/**
 * 不管是产品授信和主体授信，
 * 首先判断是否债券池，如果是债券池，则使用TYSX06流程；161(TY014新增、TY015变更、TY016复议)
 * 在判断发起人所属机构，
 *  如果机构类型是总行，则使用TYSX02流程；137(TY011新增、TY012变更、TY013复议)
 *  如果是分支行，则使用TYSX04流程  164
 * @param appType 申请类型
 * @param lmtBizType 授信品种类型
 * @param orgType 发起人所属机构类型
 */
export function getBizType(appType, lmtBizType, orgType) {
  console.log("appType===>", appType);
  console.log("lmtBizType===>", lmtBizType);
  console.log("orgType===>", orgType);
  let bizType = "";
  //债券池 则使用TYSX06流程；161(TY014新增、TY015变更、TY016复议)
  if (lmtBizType == '4001') {
    //新增01 续作03
    if (appType == '01' || appType == '03') {
      return "TY014";
    } else if (appType == '02') {
      //变更02
      return "TY015";
    } else if (appType == '05') {
      //复议
      return "TY016";
    }
  }
  //
  //如果机构类型是总行，则使用TYSX02流程；137(TY011新增、TY012变更、TY013复议)
  if ("0" == orgType) {
    //新增01 续作03
    if (appType == '01' || appType == '03') {
      return "TY011";
    } else if (appType == '02') {
      //变更02
      return "TY012";
    } else if (appType == '05') {
      //复议
      return "TY013";
    }
  } else {
    //分支行，则使用TYSX04流程  164(TY008新增、TY009变更、TY010复议)
    //新增01 续作03
    if (appType == '01' || appType == '03') {
      return "TY008";
    } else if (appType == '02') {
      //变更02
      return "TY009";
    } else if (appType == '05') {
      //复议
      return "TY010";
    }
  }
  return "";
};

/**
 * 更新审批结论和审批意见
 * @type {{watch: {bizPageData: {handler: updateCommonSignAndOpinion.watch.bizPageData.handler, deep: boolean}}}}
 */
export const updateCommonSignAndOpinion = {
  watch: {
    bizPageData: {
      //获取流程录入审批结论、审批意见保存至审批表
      handler: function (val, oldval) {
        debugger;
        var _this = this;

        if (val && val.instanceInfo) {
          var comment = val.instanceInfo.comment;
          var serno = val.instanceInfo.bizId;
          var commentSign;
          var userComment;
          try {
            let is_commentSign = isNull(comment.commentSign);
            let is_opType = isNull(comment.opType);
            if (!is_commentSign) {
              commentSign = comment.commentSign;
            } else if (!is_opType) {
              commentSign = comment.opType;
            } else {
              commentSign = comment.opTye;
            }
            //commentSign = is_commentSign == true ? (is_opType == true ? comment.opTye : comment.opType) : comment.commentSign; //审批结论
            userComment = comment.userComment; //审批意见
          } catch (e) {
            console.log(e);
          }
          console.log("handler=======>", commentSign, userComment, serno);
          console.log("replyUrl===>", _this.replyUrl);
          if (isNull(_this.replyUrl)) {
            this.$message({message: '更新地址获取失败！', type: 'error'});
            return;
          }

          if (!isNull(commentSign)) {
            // 保存监听到的审批结论、审批意见
            yufp.service.request({
              method: "POST",
              url:
                _this.$backend.cmisBiz + _this.replyUrl,
              data: {
                condition: JSON.stringify({
                  serno: serno,
                  reviewResult: commentSign,
                  restDesc: userComment,
                }),
              },
              callback: function (code, message, response) {
              },
            });
          }
        }
      },
      deep: true,
    },
  }
}

/**
 * 判断传入的值是否为null,'',undefined
 * **/
function isNull(str) {
  return (str == null || str == '' || str == undefined) ? true : false;
}

/**
 * 通用方法
 * @type {{methods: {getLargeLmtInfo(): void}}}
 */
export const commonMethods = {
  methods: {
    /**
     * 获取大额授信相关信息
     */
    getLargeLmtInfo() {
      let _this = this;
      if (!_this.formdata.lmtAmt) {
        this.$message({message: '授信金额不能为空', type: 'error'});
        return;
      }
      //授信变更 利率实时计算(债券池不计算)
      if (_this.formdata.appType == '02' && !_this.formdata.rate && _this.formdata.lmtBizType != '4001') {
        this.$message({message: '利率不能为空', type: 'error'});
        return;
      }
      let model = {};
      model.serno = _this.formdata.serno;
      model.cusId = _this.formdata.cusId;
      model.cusCatalog = _this.formdata.cusCatalog;
      model.lmtAmt = parseFloat(_this.formdata.lmtAmt * 10000).toFixed();
      model.lmtBizType = _this.formdata.lmtBizType;
      model.inputBrId = _this.formdata.inputBrId;
      model.debtEvalResult = _this.formdata.debtEvalResult;
      //大额主要责任人相关信息
      model.largeLmtMainManager = _this.formdata.largeLmtMainManager;
      model.basicAssetNormal = _this.formdata.basicAssetNormal;
      //授信变更判断使用
      model.appType = _this.formdata.appType;
      model.rate = _this.formdata.rate;
      model.origiRate = _this.formdata.origiRate;

      yufp.service.request({
        method: "POST",
        url: backend.cmisBiz + "/api/lmtsiginvestapp/getLargeLmtInfo",
        data: model,
        callback(code, message, response) {
          if (code == '0') {
            console.log("getLargeLmtInfo===>", response);
            _this.formdata.isReportChairman = response.data.isReportChairman;
            _this.formdata.isLargeLmt = response.data.isLargeLmt;
            _this.formdata.apprMode = response.data.apprMode;
          }
        }
      })
    },

    /**
     * 担保增信情况 是否显示
     * @param val
     */
    onExistGuarCreditectChange(val) {
      this.$emit("labelChange", val);
    }
  }
}


var btnAuthJson = {
  "同业机构准入": {
    "R1039": {"ck": "1", "ck_h": "1"},
    "R1013": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1040": {"ck": "1", "ck_h": "1"},
    "R1051": {"ck": "1", "ck_h": "1"},
    "R9000": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1041": {"ck": "1", "ck_h": "1"},
    "R1036": {"ck": "1", "ck_h": "1"},
    "R0100": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"}
  },
  "准入名单年审": {
    "R1039": {"ck": "1", "ck_h": "1"},
    "R1013": {"xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1040": {"ck": "1", "ck_h": "1"},
    "R1051": {"ck": "1", "ck_h": "1"},
    "R9000": {"xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1041": {"ck": "1", "ck_h": "1"},
    "R1036": {"ck": "1", "ck_h": "1"},
    "R0100": {"xg": "1", "sc": "1", "ck": "1", "ck_h": "1"}
  },
  "准入名单调整": {
    "R1039": {"ck": "1", "ck_h": "1"},
    "R1013": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1040": {"ck": "1", "ck_h": "1"},
    "R1051": {"ck": "1", "ck_h": "1"},
    "R9000": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1041": {"ck": "1", "ck_h": "1"},
    "R1036": {"ck": "1", "ck_h": "1"},
    "R0100": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"}
  },
  "准入名单查询": {
    "R1039": {"ck": "1"},
    "R1013": {"ck": "1", "dc": "1"},
    "R1040": {"ck": "1"},
    "R1051": {"ck": "1", "dc": "1"},
    "R9000": {"ck": "1", "dc": "1"},
    "R1041": {"ck": "1"},
    "R1036": {"ck": "1"},
    "R0100": {"ck": "1", "dc": "1"}
  },
  "同业客户授信申报": {
    "R1039": {"ck": "1", "ck_h": "1"},
    "R1040": {"ck": "1", "ck_h": "1"},
    "R1051": {"ck": "1", "ck_h": "1"},
    "R9000": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1", 'fqfy_h': "1"},
    "R1041": {"ck": "1", "ck_h": "1"},
    "R1036": {"ck": "1", "ck_h": "1"},
    "R0100": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1", 'fqfy_h': "1"}
  },
  "同业客户授信变更": {
    "R1039": {"ck": "1", "ck_h": "1"},
    "R1040": {"ck": "1", "ck_h": "1"},
    "R1051": {"ck": "1", "ck_h": "1"},
    "R9000": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1041": {"ck": "1", "ck_h": "1"},
    "R1036": {"ck": "1", "ck_h": "1"},
    "R0100": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"}
  },
  "同业授信批复查询": {
    "R1039": {"ckpfxq": "1", "ckpfbg": "1"},
    "R1040": {"ckpfxq": "1", "ckpfbg": "1"},
    "R1051": {"ckpfxq": "1", "ckpfbg": "1"},
    "R9000": {"ckpfxq": "1", "ckpfbg": "1"},
    "R1041": {"ckpfxq": "1", "ckpfbg": "1"},
    "R1036": {"ckpfxq": "1", "ckpfbg": "1"},
    "R0100": {"ckpfxq": "1", "ckpfbg": "1"}
  },
  "同业授信批复变更": {
    "R1039": {"ck": "1", "ck_h": "1"},
    "R1040": {"ck": "1", "ck_h": "1"},
    "R1051": {"ck": "1", "ck_h": "1"},
    "R1014": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R9000": {"xz": "1", "xg": "1", "sc": "1", "ck": "1", "ck_h": "1"},
    "R1041": {"ck": "1", "ck_h": "1"},
    "R1036": {"ck": "1", "ck_h": "1"}
  }
};

/**
 * 页面按钮权限控制
 * @type {{created(): void, methods: {getBtnAuthority(): void}}}
 */
export const oprBtnAuthority = {
  created() {

  },
  mounted() {
    this.getBtnAuthority();
  },
  data: function (){
    return {
      btnState: {
        xz: false,
        xg: false,
        sc: false,
        ck: false,
        ck_h: false,
        fqfy_h: false,
      },
      btnStateNames: ['xz', 'xg', 'sc', 'ck', 'ck_h', 'dc', 'fqfy_h']
    }
  },
  methods: {
    getBtnAuthority() {
      let roleCode = this.$store.state.oauth.selectedRoles.code;
      let moduleId = this.$route.meta.id;
      let title = this.$route.meta.title;
      let roles = this.$xutils.getLoginUserInfo().roles;
      let btnAuth = btnAuthJson[title];

      console.log("roles===>", roles);
      debugger;
      if (isNull(btnAuth) || isNull(roles) || roles.length <= 0){
        return;
      }
      let _this = this;
      roles.forEach(role => {
        let roleCode = role.code;
        let roleBtnAuthJson = btnAuth[roleCode];
        if (isNull(roleBtnAuthJson)){
          return;
        }
        console.log(roleCode + "====", roleBtnAuthJson);
        _this.btnStateNames.forEach(name => {
          let showState = _this.$data.btnState[name];
          if (showState){
            return;
          }
          let curBtnState = roleBtnAuthJson[name];
          if (!isNull(curBtnState)) {
            _this.$data.btnState[name] = true;
          }
        })
      })
    }
  }
}


/**
 * 资产编号是否可以补录
 * @param Object Arr
 */
export function isAssetNo(selection){
  let obj = selection[0];
  if(obj.appType == '01' || !obj.appType){
    //债权融资计划（承销）  理财直融工具（承销） 债券池 无需资产补录
    if (obj.lmtBizType == "4001"){
      showMessage("债券池 不能资产补录！！")
      return false;
    }else if(obj.lmtBizType == "16010101" || obj.lmtBizType == "16020101"){
      showMessage("债权融资计划（承销）、理财直融工具（承销）不能资产补录！！")
      return false;
    }
    if (!obj.appType && obj.assetNo) {
      showMessage("只有无资产编号才能进行补录！")
      return false;
    } else {
      return true;
    }

  }
}

export const assetNoEnter = {
  data: function () {
    return {
      loginCode: this.$store.state.oauth.loginCode,
      show_give_dialog: false,
      rules: {
        assetNo: [
          { required: true, message: "请输入资产编号", trigger: "blur" },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onGive(type) {
      debugger
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }

      if (type == "credit") {
        // 主体|产品授信
        let status = selectionsAry[0].approveStatus;
        // 待发起、审批中、退回可修改
        let canEdit = (status == "000" || status == "111" || status == "992") && _this.loginCode == selectionsAry[0].inputId;
        if (!canEdit) {
          _this.$message({
            message: "您没有权限修改！",
            type: "error",
          });
          return;
        }
      } else {
        // 批复查询 管户人权限
        if (_this.loginCode != selectionsAry[0].managerId) {
          _this.$message({
            message: "您没有权限修改！",
            type: "error",
          });
          return;
        }
      }

      // 是否可以补录
      if (isAssetNo(selectionsAry)) {
        _this.show_give_dialog = true;
        _this.$nextTick(() => {
          yufp.clone(selectionsAry[0], _this.giveFormdata);
        });
      }
    },
    doConfirm() {
      var _this = this;
      var validate = false;
      _this.$refs.addForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      var selectionsAry = _this.$refs.refTable.selections[0];
      let url = "/api/lmtsiginvestapp/changeAssetNo";
      // 主体、产品授信
      let model = {
        assetNo: _this.giveFormdata.assetNo,
        serno: selectionsAry.serno,
        proNo: selectionsAry.proNo
      };

      // 批复查询
      if (!selectionsAry.appType) {
        model.pkId = selectionsAry.pkId;
        model.replySerno = selectionsAry.replySerno;
        url = "/api/lmtsiginvestacc/updateAssetNo";
      }
      yufp.service.request({
        method: "POST",
        url: backend.cmisBiz + url,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message("操作成功");
          _this.show_give_dialog = false;
        },
      });
    },
    doGiveCancel() {
      this.show_give_dialog = false;
    },
  }
};

// 提示信息
function showMessage(msg, type = 'error', duration = 5){
  msg && Message({
    message: msg,
    type: type,
    duration: duration * 1000
  });
}
