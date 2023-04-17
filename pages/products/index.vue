<template>
  <div>
    <includes-teleport to="#title">
      My Products
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-button type="primary" shape="round" @click="$router.push('/creator/project')">
        Add New
      </a-button>
    </includes-teleport>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>
