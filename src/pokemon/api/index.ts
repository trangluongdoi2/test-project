import Api from "@/configs/api";
import { PokemonItem, PokemonMetaItem } from "./type";
import { getBase64ImageFromUrl } from "@/common/file";
import useLocalStorage from "../store/useLocalStorage";
import { Ref } from "vue";
import { QueryConfigs } from "@/type";

const { storage } = useLocalStorage();

export class PokemonApi extends Api {
  private async setPokemonMeta(meta: any) {
    const metaConfigs: PokemonMetaItem = {
      currentPage: meta.current_page,
      lastPage: meta.last_page,
      itemPerPage: meta.per_page,
      totalItems: meta.total,
    }
    const key = 'pokemons-meta';
    await storage.setItem(key, JSON.stringify(metaConfigs));
  }

  async getPokemonMeta() {
    const key = 'pokemons-meta';
    const data =  await storage.getItem(key);
    if (data) {
      return data;
    }
  }

  private async useConvertedType(items: PokemonItem[]): Promise<PokemonItem[]> {
    const types = await this.getPokemonByType();
    const mapTypes: Map<number, string> = new Map();
    for (let i = 0; i < types.length; i++) {
      mapTypes.set(types[i].id, types[i].name);
    }
    const convertedItems = items.map((item: PokemonItem) => ({
      ...item,
      type_1: mapTypes.has(item?.type_1 as number) ? mapTypes.get(item.type_1 as number) ?? null : null,
      type_2: mapTypes.has(item?.type_2 as number) ? mapTypes.get(item.type_2 as number) ?? null : null,
    }));
    return [...convertedItems as PokemonItem[]];
  }

  async getPokemonItems(queryConfigs: Ref<QueryConfigs>) {
    const { pageNumber, pageSize, queryFilters, querySort } = queryConfigs.value;
    let arrContent: string[] = [];
    const pageNumberContent = !pageNumber ? '' : `page[number]=${pageNumber}`;
    const pageSizeContent = !pageSize ? '' : `page[size]=${pageSize}`;
    arrContent.push(pageNumberContent);
    arrContent.push(pageSizeContent);
    arrContent.push(queryFilters);
    arrContent.push(querySort);
    arrContent = arrContent.filter((part: string) => Boolean(part));
    let queryContent = arrContent?.length ? `?${arrContent.join('&')}` : '';
    const API_URL = `https://api.vandvietnam.com/api/pokemon-api/pokemons${queryContent}`;
    const res = await this.get(API_URL);
    const data = res.data as PokemonItem[];
    await this.setPokemonMeta(res.meta);
    const convertedData = await this.useConvertedType(data);
    return convertedData;
  }

  async getPokemonByType() {
    const key = 'pokemon-types';
    const data = await storage.getItem(key);
    if (data) {
      return data;
    }
    const API_URL = 'https://api.vandvietnam.com/api/pokemon-api/types';
    const res = await this.get(API_URL);
    await storage.setItem(key, JSON.stringify(res.data));
    return res.data;
  }

  async getPokemonDownloadSprite(id: string) {
    const API_URL = `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`;
    const res = await this.get(API_URL);
    return res;
  }

  async getPokemonDetails(id: string) {
    const API_URL = `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}`;
    const res = await this.get(API_URL);
    const API_URL_2 = `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`;
    const src = await getBase64ImageFromUrl(API_URL_2);
    const details = {
      ...res.data,
      src,
    }
    return details;
  }
}

export default new PokemonApi();