<template>
  <CCol class="mb-4">
    <div
      :class="['theme-color w-75 rounded mb-3', color]"
      style="padding-top: 75%"
    ></div>
    <slot></slot>
  </CCol>
</template>

<script>
export default {
  name: 'ColorTheme',
  props: {
    color: {
      type: String,
      default: undefined,
    },
  },
}
</script>
