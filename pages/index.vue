<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a href="#" class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="mr-2 h-8 w-auto" src="/images/lgbt.png" alt="logo">
        Workspace
      </a>
      <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Đăng nhập vào tài khoản của bạn
          </h1>

          <a-form ref="formRef" layout="vertical" :rules="rules" :model="form">
            <a-form-item name="email">
              <template #label>
                <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white">
                  Email ID
                </label>
              </template>

              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                class="block w-full rounded-lg bg-gray-700 p-2.5 text-white placeholder:text-gray-400 focus:outline-0 sm:text-sm"
                placeholder="name@company.com"
                required=""
              >
            </a-form-item>

            <a-form-item name="password">
              <template #label>
                <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
              </template>

              <input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                class="block w-full rounded-lg bg-gray-700 p-2.5 text-white placeholder:text-gray-400 focus:outline-0 sm:text-sm"
                placeholder="********"
                required=""
              >
            </a-form-item>

            <div class="my-4 flex items-center justify-center">
              <a href="https://www.facebook.com/guen.dev/" target="_blank" class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">Forgot password?</a>
            </div>

            <button class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4" @click="submitForm">
              Đăng Nhập
            </button>
            <p class="mt-4 text-sm font-light text-gray-400">
              Bạn chưa có tài khoản?
              <a href="https://www.facebook.com/guen.dev/" target="_blank" class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                Đăng ký
              </a>
            </p>
          </a-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// import { message } from 'ant-design-vue'

import { FormInstance } from 'ant-design-vue/lib/form'
import { NotifyEntity, NotifyType } from '~/entities/notify.entity'
import { SIGN_IN } from '~/apollo/mutations/user.mutation'
import { SignIn, SignInVariables } from '~/apollo/mutations/__generated__/SignIn'

definePageMeta({
  layout: 'blank'
})

const { fire } = useNotify<NotifyEntity>()

const form = ref({
  email: '',
  password: ''
})
const formRef = ref<FormInstance>()

const rules = computed(() => ({
  email: [
    {
      required: true,
      message: 'Vui lòng nhập email'
    },
    {
      type: 'email',
      message: 'Email không hợp lệ'
    }
  ],
  password: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu'
    },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    }
  ]
}))

const { mutate, onError, onDone } = useMutation<SignIn, SignInVariables>(SIGN_IN)

onError((error) => {
  fire({
    type: NotifyType.ERROR,
    message: error.message
  })
})

onDone(async (res) => {
  fire({
    type: NotifyType.SUCCESS,
    message: 'Đăng nhập thành công'
  })

  if (res.data?.signIn) {
    await $fetch('/api/auth', {
      method: 'POST',
      body: {
        token: res.data.signIn
      }
    })

    setTimeout(() => {
      window.location.href = '/overview'
    }, 1000)
  }
})

const submitForm = () => {
  formRef.value?.validate().then(() => {
    mutate({
      input: {
        email: form.value.email,
        password: form.value.password
      }
    })
  }).catch(() => {
    fire({
      type: NotifyType.ERROR,
      message: 'Check your form'
    })
  })
}
</script>

<style scoped></style>
