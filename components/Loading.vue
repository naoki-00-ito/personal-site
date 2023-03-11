<template>
  <div class="loader-container">
    <div class="loaders">
      <div class="ball-clip-rotate">
        <div class="ball"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "loaders.css";
$theme-color: #1976d2;
.loader-container {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.5);
  opacity: 0.7;
}

.ball-clip-rotate > div {
  border: 2px solid $theme-color;
  border-bottom-color: transparent !important;
}

.ball-clip-rotate {
  position: absolute;
  top: 50%;
  color: red;
  transform: translate(-50%, -50%);
  left: 50%;
}
</style>
