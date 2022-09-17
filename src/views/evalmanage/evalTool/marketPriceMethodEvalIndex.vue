<template>
  <div>
    <tempetfactorypreview-index :page-params="pageParams" style="position:relative;z-index:1"></tempetfactorypreview-index>
  </div>
</template>
<script>
import tempetfactorypreviewIndex from "@/views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex";
export default {
  components: { tempetfactorypreviewIndex },
  data() {
    return {
      pageParams: { model_group_no: "CMG000133" }
    };
  },
  mounted() {
    // this.AfterInit();
  },
  methods: {
    // AfterInit() {
    //   let row = [];
    //   row["model_group_no"] = "CMG000133";
    //   this.$dialog.open("", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, row);
    // }
  }
};
</script>
