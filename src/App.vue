<template>
  <div>
    <Header />
    <div class="container mx-auto px-8">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
};
</script>