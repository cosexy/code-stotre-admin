<template>
  <div @click="open">
    <nuxt-img v-if="_image" :src="_image.path" provider="backend" class="relative z-[2] h-full w-full object-cover" />
    <Icon
      class="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 text-[35px]"
      name="ri:upload-cloud-line"
    />
  </div>
</template>

<script lang="ts" setup>
type ImageEntity = {
  id: string
  path: string
}

const props = defineProps<{
    image?: ImageEntity | any
    value?: string
}>()
const _image = ref<ImageEntity|undefined>(props.image)
const _value = ref<string|undefined>(props.value)
watch(() => props.image, (_v) => {
  _image.value = _v
})
watch(() => props.value, (_v) => {
  _value.value = _v
})

// emit v-model
const emits = defineEmits<{
    (event: 'update:value', value?: string): void
    (event: 'update:image', value?: ImageEntity): void
}>()
watch(_value, (_v1) => emits('update:value', _v1))
watch(_image, (_v1) => emits('update:image', _v1))

const { upload, onResult } = useUpload()
const { files, open, reset } = useFileDialog({
  multiple: false,
  accept: 'image/*'
})

watch(files, (files) => files?.length && upload(files.item(0)!))

const afterUpload = (files: ImageEntity[]) => {
  if (files.length) {
    _image.value = files[0]
    _value.value = _image.value.id
  }
  reset()
}

onResult(afterUpload)

</script>

<style scoped lang="scss">
._avatar {
  @apply bg-gray-100 rounded-md relative text-gray-400 cursor-pointer overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:transition before:hover:bg-primary-500;
  &:hover > svg {
    z-index: 4;
    @apply text-white transition;
  }
}
</style>
