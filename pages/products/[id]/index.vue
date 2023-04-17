<template>
  <div>
    <includes-teleport to="#title">
      Madara - Wordpress Theme for Manga
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-popconfirm
        title="Are you sure delete this product?"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button type="danger" shape="round">
          DELETE
        </a-button>
      </a-popconfirm>
      <a-button type="primary" shape="round" class="ml-3" @click="$router.push({ name: 'creator-product-id', params: { id: $route.params.id } })">
        EDIT
      </a-button>
    </includes-teleport>

    <home-counter />
    <home-revenue class="mt-8" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>
