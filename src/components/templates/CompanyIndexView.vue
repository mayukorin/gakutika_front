<template>
  <div>
    <h3 class="success--text mr-3 ml-1 title">面接を受ける企業一覧</h3>
    <CompanyIndexCard />
  </div>
</template>
<script>
import CompanyIndexCard from "@/components/organisms/CompanyIndexCard";
export default {
  name: "CompanyIndexView",
  components: {
    CompanyIndexCard,
  },
};
</script>
