<template>
  <div>
    PokemonCard
  </div>
</template>

<script lang="ts">
import { PropType, onMounted } from 'vue';

type Props = {
  item: any,
}

export default {
  props: {
    item: {
      type: Object as PropType<any>,
      required: true
    }
  },
  setup(props: Props) {
    onMounted(() => {
      // console.log(props.item , 'props.item....');
      // console.log('onMounted..');
    });
  },
}
</script>

<style lang="scss" scoped>

</style>