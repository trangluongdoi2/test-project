<template>
  <div class="pagination-container">
    <app-button :disabled="currenSelectedtPage === 1" @click="selectPrevPage">Prev</app-button>
    <p class="more" v-if="currentPageNumberDisplay[0] !== 1">...</p>
    <div v-for="count in currentPageNumberDisplay" :key="count">
      <app-button
        class="page"
        :isActive="count === currenSelectedtPage"
        @click="selectPage(count)"
      >
        {{ count }}
      </app-button>
    </div>
    <p class="more" v-if="currentPageNumberDisplay[currentPageNumberDisplay.length - 1] !== pageNumber">...</p>
    <app-button :disabled="currenSelectedtPage === pageNumber" @click="selectNextPage">Next</app-button>
  </div>
</template>

<script lang="ts">
import { SetupContext, computed, ref, watch } from 'vue';

type Props = {
  pageNumber: number,
  itemsPerPage: number,
  limitDisplayPage: number,
}
export default {
  props: {
    pageNumber: {
      type: Number,
      default: 8,
    },
    itemsPerPage: {
      type: Number,
      default: 300,
    },
    limitDisplayPage: {
      type: Number,
      default: 3,
    }
  },
  emits: ['prev-page', 'next-page', 'select-page'],
  setup(props: Props, { emit }: SetupContext) {
    const currenSelectedtPage = ref<number>(1);
    const currentPageNumberDisplay = ref<number[]>([]);

    const extraNextPageCount = computed(() => {
      const maxExtraPrevPageCount = Math.ceil(props.limitDisplayPage / 2) - 1;
      return props.limitDisplayPage - maxExtraPrevPageCount - 1;
    })

    const updateCurrentPageNumberDisplay = () => {
      currentPageNumberDisplay.value = new Array(props.pageNumber).fill(null).map((_, index: number) => index + 1);
      let maxExtraPrevPageCount = props.limitDisplayPage - 1;
      let actualExtraPrevPageCount = maxExtraPrevPageCount;

      if (currenSelectedtPage.value === 1) {
        currentPageNumberDisplay.value = currentPageNumberDisplay.value.slice(0, props.limitDisplayPage);
        return;
      }
      if (currenSelectedtPage.value === props.pageNumber) {
        currentPageNumberDisplay.value = currentPageNumberDisplay.value.slice(-props.limitDisplayPage);
        return;
      }

      if (currenSelectedtPage.value - 1 > maxExtraPrevPageCount) {
        actualExtraPrevPageCount = maxExtraPrevPageCount;
      } else {
        actualExtraPrevPageCount = Math.max(currenSelectedtPage.value - 1, 0);
      }
      const startIndex = currenSelectedtPage.value - 1 - actualExtraPrevPageCount;
      const endIndex = startIndex + props.limitDisplayPage;
      currentPageNumberDisplay.value = currentPageNumberDisplay.value.slice(startIndex, endIndex);
    }

    const selectPrevPage = () => {
      currenSelectedtPage.value = Math.max(1, currenSelectedtPage.value - 1);
      emit('select-page', currenSelectedtPage.value);
    }

    const selectNextPage = () => {
      currenSelectedtPage.value = Math.min(props.pageNumber, currenSelectedtPage.value + 1);
      emit('select-page', currenSelectedtPage.value);
    }

    const selectPage = (page: number) => {
      currenSelectedtPage.value = page;
      emit('select-page', currenSelectedtPage.value);
    };

    watch(currenSelectedtPage, () => {
      updateCurrentPageNumberDisplay();
    }, { immediate: true });

    return {
      currenSelectedtPage,
      currentPageNumberDisplay,
      extraNextPageCount,

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
  }
  .more {
    color: $white;
    font-weight: bold;
  }
}
</style>