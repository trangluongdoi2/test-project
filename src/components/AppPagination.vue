<template>
  <div class="pagination-container">
    <app-button class="page" :disabled="currentSelectedPage === 1" @click="selectPrevPage">Prev</app-button>
    <app-button
      class="page"
      :isActive="1 === currentSelectedPage"
      @click="selectPage(1)"
    >
      1
    </app-button>
    <p class="more" v-if="(currentPageNumberDisplay[0] - 1) !== 1 && totalPages !== 1">...</p>
    <div v-for="count in currentPageNumberDisplay" :key="count">
      <app-button
        class="page"
        :isActive="count === currentSelectedPage"
        @click="selectPage(count)"
      >
        {{ count }}
      </app-button>
    </div>
    <p class="more" v-if="currentPageNumberDisplay[currentPageNumberDisplay.length - 1] + 1!== totalPagesVal && totalPages !== 1">...</p>
    <app-button
      class="page"
      v-if="totalPagesVal !== 1"
      :isActive="totalPagesVal === currentSelectedPage"
      @click="selectPage(totalPagesVal)"
    >
      {{ totalPagesVal }}
    </app-button>
    <app-button  class="page" :disabled="currentSelectedPage === totalPagesVal" @click="selectNextPage">Next</app-button>
  </div>
</template>

<script lang="ts">
import { SetupContext, computed, ref } from 'vue';

type Props = {
  totalPages: number,
  itemsPerPage: number,
  limitDisplayPage: number,
}
export default {
  props: {
    totalPages: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 30,
    },
    limitDisplayPage: {
      type: Number,
      default: 3,
    }
  },
  emits: ['prev-page', 'next-page', 'select-page'],
  setup(props: Props, { emit }: SetupContext) {
    const currentSelectedPage = ref<number>(1);
    const totalPagesVal = computed(() => props.totalPages);

    const extraNextPageCount = computed(() => {
      const maxExtraPrevPageCount = Math.ceil(props.limitDisplayPage / 2) - 1;
      return props.limitDisplayPage - maxExtraPrevPageCount - 1;
    });

    const currentPageNumberDisplay = computed(() => {
      let arr = new Array(totalPagesVal.value).fill(null).map((_, index: number) => index + 1);
      let maxExtraPrevPageCount = props.limitDisplayPage - 1;
      let actualExtraPrevPageCount = maxExtraPrevPageCount;

      if (currentSelectedPage.value - 1 > maxExtraPrevPageCount) {
        actualExtraPrevPageCount = maxExtraPrevPageCount;
      } else {
        actualExtraPrevPageCount = Math.max(currentSelectedPage.value - 1, 0);
      }
      const startIndex = currentSelectedPage.value - 1 - actualExtraPrevPageCount;
      const endIndex = startIndex + props.limitDisplayPage;
      arr = arr.slice(startIndex, endIndex).filter((page: number) => ![1, totalPagesVal.value].includes(page));
      return arr;
    });

    const selectPrevPage = () => {
      currentSelectedPage.value = Math.max(1, currentSelectedPage.value - 1);
      emit('select-page', currentSelectedPage.value);
    }

    const selectNextPage = () => {
      currentSelectedPage.value = Math.min(props.totalPages, currentSelectedPage.value + 1);
      emit('select-page', currentSelectedPage.value);
    }

    const selectPage = (page: number) => {
      currentSelectedPage.value = page;
      emit('select-page', currentSelectedPage.value);
    };

    return {
      currentSelectedPage,
      currentPageNumberDisplay,
      extraNextPageCount,
      totalPagesVal,

      selectPage,
      selectPrevPage,
      selectNextPage,
    }
  },
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 40px;
  .page {
    width: 40px;
    color: black;
  }
  .more {
    color: black;
    font-weight: bold;
  }
}
</style>