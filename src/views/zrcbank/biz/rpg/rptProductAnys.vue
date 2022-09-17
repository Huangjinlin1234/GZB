<template>
  <div class="tab-form">
    <yu-panel title="对公客户授信调查报告" panel-type="simple">
      <rptSpdAnysJywyd :param="param" v-if="jywyd"></rptSpdAnysJywyd>
      <rptSpdAnysGdxmd :param="param" v-if="gdxmd"></rptSpdAnysGdxmd>
      <rptSpdAnysFdckfd :param="param" v-if="fdckfd"></rptSpdAnysFdckfd>
      <rptSpdAnysWtdk :param="param" v-if="wtdk"></rptSpdAnysWtdk>
      <rptSpdAnysCyr :param="param" v-if="cyr"></rptSpdAnysCyr>
      <rptSpdAnysJxd :param="param" v-if="jxd"></rptSpdAnysJxd>
      <rptSpdAnysSxkd :param="param" v-if="sxkd"></rptSpdAnysSxkd>
      <rptSpdAnysYsd :param="param" v-if="ysd"></rptSpdAnysYsd>
      <rptSpdAnysZxd :param="param" v-if="zxd"></rptSpdAnysZxd>
      <!--小企业——担保融（个人经营性）-->
      <rptSpdAnysDbrPersonOper :param="param" v-if="dbrPersonOper"></rptSpdAnysDbrPersonOper>
      <!--小企业——担保融（企业类）-->
      <rptSpdAnysDbrCorp :param="param" v-if="dbrCorp"></rptSpdAnysDbrCorp>
      <!--外贸贷-->
      <rptSpdAnysWmd :param="param" v-if="wmd"></rptSpdAnysWmd>
      <yu-panel title="选择集群贷模板" panel-type="simple" v-if="jqd" >
        <yu-select v-model="value" placeholder="请选择集群贷模板" style="width:500px" size="large" @change="changeJqd">
          <yu-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
          </yu-option>
          </yu-select>
          </yu-panel>
      <!-- 集群贷-->
      <rptSpdAnysJqd :param="param" v-if="jqdNormal" ></rptSpdAnysJqd>
      <!-- 木材贷-->
     <rptSpdAnysMcd :param="param" v-if="jqdMcd"></rptSpdAnysMcd>
    </yu-panel>
  </div>
</template>

<script>
import rptSpdAnysJywyd from './rptSpdAnysJywyd';
import rptSpdAnysGdxmd from './rptSpdAnysGdxmd';
import rptSpdAnysFdckfd from './rptSpdAnysFdckfd';
import rptSpdAnysWtdk from './rptSpdAnysWtdk';
import rptSpdAnysCyr from './rptSpdAnysCyr';
import rptSpdAnysJxd from './rptSpdAnysJxd';
import rptSpdAnysSxkd from './rptSpdAnysSxkd';
import rptSpdAnysYsd from './rptSpdAnysYsd';
import rptSpdAnysDbrPersonOper from './rptSpdAnysDbrPersonOper';
import rptSpdAnysDbrCorp from './rptSpdAnysDbrCorp';
import rptSpdAnysWmd from './rptSpdAnysWmd';
import rptSpdAnysJqd from './rptSpdAnysJqd';
import rptSpdAnysMcd from './rptSpdAnysMcd';
import rptSpdAnysZxd from './rptSpdAnysZxd';
export default {
  components: {
    rptSpdAnysJywyd,
    rptSpdAnysGdxmd,
    rptSpdAnysFdckfd,
    rptSpdAnysWtdk,
    rptSpdAnysCyr,
    rptSpdAnysJxd,
    rptSpdAnysSxkd,
    rptSpdAnysYsd,
    rptSpdAnysDbrPersonOper,
    rptSpdAnysDbrCorp,
    rptSpdAnysWmd,
    rptSpdAnysJqd,
    rptSpdAnysMcd,
    rptSpdAnysZxd
  },
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data: function () {
    return {
      Param: {},
      type: false,
      jywyd: false,
      fdckfd: false,
      gdxmd: false,
      wtdk: false,
      jxd: false,
      sxkd: false,
      cyr: false,
      ysd: false,
      dbrCorp: false,
      wmd: false,
      jqd: false,
      dbrPersonOper: false,
      jqdNormal: false,
      jqdMcd: false,
      options: [{
        value: '1',
        label: '集群贷(通用版)'
      }, {
        value: '2',
        label: '集群贷(木材贷)'
      }],
      value: ''
    };
  },
  created () {},
  mounted: function () {
    var _this = this;
    _this.jywyd = _this.param.jywyd;
    _this.gdxmd = _this.param.gdxmd;
    _this.fdckfd = _this.param.fdckfd;
    _this.wtdk = _this.param.wtdk;
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsubprd/selectSubPrdBySerno',
        data: _this.param.serno,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null && response.data.length > 0) {
              response.data.forEach(function (item) {
                let lmtBizTypeProp = item.lmtBizTypeProp;
                if (lmtBizTypeProp == 'P016') {
                  _this.cyr = true;
                }
                if (lmtBizTypeProp == 'P013') {
                  _this.jxd = true;
                }
                if (lmtBizTypeProp == 'P011') {
                  _this.sxkd = true;
                }
                if (lmtBizTypeProp == 'P014') {
                  _this.ysd = true;
                }
                if (lmtBizTypeProp == 'P009') {
                  _this.zxd = true;
                }
                if (lmtBizTypeProp == 'P015') {
                  if (_this.param.person) {
                    _this.dbrPersonOper = true;
                  } else {
                    _this.dbrCorp = true;
                  }
                }
                if (lmtBizTypeProp == 'P032') {
                  _this.wmd = true;
                }
                if (lmtBizTypeProp == 'P019') {
                  _this.jqd = true;
                }
              });
            }
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
    changeJqd: function () {
      var _this = this;
      if (_this.value == '1') {
        _this.jqdNormal = true;
        _this.jqdMcd = false;
      } else if (_this.value == '2') {
        _this.jqdMcd = true;
        _this.jqdNormal = false;
      }
    }
  }
};
</script>

<style></style>
