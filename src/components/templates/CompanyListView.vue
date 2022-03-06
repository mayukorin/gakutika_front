<template>
  <div>
    <h3 class="success--text mr-3 ml-1 title">面接を受ける企業一覧</h3>
    <CompanyListCard />
  </div>
</template>
<script>
import CompanyListCard from "@/components/organisms/CompanyListCard";
export default {
  name: "CompanyListView",
  components: {
    CompanyListCard,
  },
};
</script>
