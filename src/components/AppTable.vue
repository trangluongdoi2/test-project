<template>
  <table class="datatable-custom" ref="tableRef">
    <thead class="datatable-custom__header">
      <tr>
        <th :style="[column.width ? `width: ${column.width}px`: '']" v-for="column in headerColumns" :key="column.field">
          <div class="datatable-custom__header-column" :class="{'column-center' : column.center}">
            <p>
              {{ column.header }}
            </p>
            <div class="datatable-custom__header-column__sort" v-if="column.sortable">
              <app-icon
                :name="sortField?.field === column.field && sortField?.orderSort === 'asc' ? 'chevron-up' : 'chevron-down'"
                width="20"
                height="20"
                @click.stop="sortItem(column.field, (sortField?.field !== column.field || sortField?.orderSort === 'desc') ? 'asc': 'desc')"
              />
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody
      class="datatable-custom__body"
      ref="tableBodyEl"
      role="table"
      :aria-rowcount="items.length"
    >
      <tr
        ref="itemRef"
        v-for="(item, index) in items"
        :key="index"
        class="datable-custom__body-row"
        v-bind="{
          'aria-rowindex': index,
        }"
        draggable="true"
        @click="selectItem(item)"
      >
        <td v-for="column in headerColumns" :key="column.field" :class="{'column-center' : column.center}">
          <slot :name="`${column.field}`" :item="item" :index="index" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import {
  defineComponent,
  SetupContext,
  PropType,
  ref,
  watch,
} from 'vue';

export type HeaderColumns = {
  field: string,
  header: string,
  sortable?: boolean,
  width?: number,
  filterable?: boolean,
  center?: boolean,
};

export type SortField = {
  field: string,
  orderSort: string,
  iconType?: 'chevron' | 'default',
};

type Props = {
  items: Record<string, any>,
  headerColumns: HeaderColumns[],
  sortField?: SortField,
  isDisabled?(item: Record<string, any>): boolean,
};

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any>,
      required: true,
    },
    headerColumns: {
      type: Array as PropType<HeaderColumns[]>,
      default: () => [],
    },
    sortField: {
      type: Object as PropType<SortField>,
      default: () => undefined,
    },
    isDisabled: {
      type: Function as PropType<(item: Record<string, any>) => boolean>,
      default: () => false,
    },
  },
  emits: [
    'select-item',
    'click-item',
    'sort-table',
  ],
  setup(props: Props, { emit }: SetupContext) {
    const isDrag = ref(false);
    const tableRef = ref<HTMLDivElement>();
    const tableBodyEl = ref<HTMLElement>();
    const itemRef = ref<HTMLElement[]>([]);

    const sortItem = (field: string, orderSort: string) => {
      emit('sort-table', { field, orderSort });
    };

    const selectItem = (item: Record<string, any>) => {
      emit('select-item', item);
    };

    const dblClickItem = (item: Record<string, any>) => {
      emit('dblclick-item', item);
    };

    // const onSortItemHeader = (name: string, sortable?: boolean) => {
    //   if (!sortable) {
    //     return;
    //   }
    //   sortItem(name, props.sortField?.orderSort || '');
    // };


    return {
      tableBodyEl,
      itemRef,
      isDrag,
      tableRef,

      selectItem,
      dblClickItem,
      sortItem,
      // onSortItemHeader,
    };
  },
});
</script>
