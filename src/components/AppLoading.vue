<template>
  <div class="container">
    <div class="loader"></div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    width: 24px;
    padding: 4px;
    background: #07e8d6;
    aspect-ratio: 1;
    border-radius: 50%;
    mask: 
      conic-gradient(#0000,#000) subtract,
      linear-gradient(#000 0 0) content-box;
    box-sizing: border-box;
    animation: load 1s linear infinite;
  }
}

@keyframes load {
  to{transform: rotate(1turn)}
}

</style>