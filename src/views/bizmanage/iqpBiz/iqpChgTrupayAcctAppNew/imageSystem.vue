<template>
  <imageSystem v-if="show_img" authority="import;download;scan;delImg" :s="1" :para="imageBizParam"></imageSystem>
</template>
<script>
import imageSystem from "@/views/imageManage/imageSystem";
export default {
  components: { imageSystem },
  data() {
    return {
      show_img: false,
    };
  },
  created() {
    if (this.$route.meta.params.serno) {
      console.log("===============>>>", this.$route.meta.params);
      let params = this.$route.meta.params;

      this.imageBizParam = [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: "DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ",
        //   outsystem_code: "XXD_QTSXSQ0201",
          index: {
            businessid: params.serno,
            custtype: params.curType,
            custconductid: params.inputId,
            custconductname: params.inputIdName,
            orgid: params.inputBrId,
            orgname: params.inputBrIdName,
            opername: params.updIdName,
            custid: params.cusId,
            custname: params.cusName,
            custconduct: "",
            operid: "",
            maintaindate: "",
            contid: params.contNo,
            billno: "",
          },
        },
      ];
      this.show_img = false;
      this.$nextTick(() => {
        this.show_img = true;
      });
    }
  },
};
</script>