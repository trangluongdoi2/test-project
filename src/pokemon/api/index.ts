import Api from "@/configs/api";
import { PokemonClass, PokemonItem, PokemonType } from "./type";

export default class PokemonApi extends Api {
  async getPokemonItems() {
    const URL = 'https://api.vandvietnam.com/api/pokemon-api/pokemons';
    const [res1, res2] = await Promise.allSettled([this.get(URL), this.getPokemonByType()]);
    if (res1.status === 'rejected') {
      return [];
    }
    if (res1.status === 'fulfilled') {
      let data = res1.value.data as PokemonItem[];
      if (res2.status === 'rejected') {
        return data;
      }
      const types = res2.value as PokemonType[];
      const mapTypes: Map<number, string> = new Map();
      for (let i = 0; i < types.length; i++) {
        mapTypes.set(types[i].id, types[i].name);
      }
      // @ts-ignore
      data = data.map((item: PokemonItem) => ({
        ...item,
        type_1: mapTypes.has(item?.type_1 as number) ? mapTypes.get(item.type_1 as number) ?? null : null,
        type_2: mapTypes.has(item?.type_2 as number) ? mapTypes.get(item.type_2 as number) ?? null : null,
      }));
      return data;
    }
    return [];
  }

  async getPokemonByType() {
    const URL = 'https://api.vandvietnam.com/api/pokemon-api/types';
    const res = await this.get(URL);
    return res.data;
  }

  async getPokemonDownloadSprite(id: string) {
    const URL = `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`;
    const res = await this.get(URL);
    return res.data;
  }

  async getPokemonDetails(id: string) {
    const URL = `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}`;
    const res = await this.get(URL);
    return res.data;
  }
}
