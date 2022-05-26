<template>
  <main>
    <the-header />
    <div class="place-content-center grid">
      <section class="mx-auto container my-16">
        <base-card>
        <portal-submission/>
        </base-card>
      </section>
    </div>
  </main>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import PortalSubmission from "../components/PortalSubmission.vue"
import BaseCard from "../components/BaseCard.vue";
export default {
  name: "HomeView",
  components: {
    TheHeader,
    BaseCard,
    PortalSubmission
  },
};
</script>
