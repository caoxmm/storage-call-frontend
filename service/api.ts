import { getData, postData } from "./http";

const collection = "RiverEstate";

// const baseUrl =
//   "https://sandbox873f1546577fstoragecall-3000.gateway-beta.chainide.com";
// http://localhost:3000/retrieve
// http://localhost:3000/store

interface IRetrieveResult {
  result: boolean;
  data: number;
}

export interface ITrans {
  type: number;
  chainId: number;
  nonce: number;
  maxPriorityFeePerGas: {
    type: string;
    hex: string;
  };
  maxFeePerGas: {
    type: string;
    hex: string;
  };
  gasPrice: null;
  gasLimit: {
    type: string;
    hex: string;
  };
  to: string;
  value: {
    type: string;
    hex: string;
  };
  data: string;
  accessList: [];
  hash: string;
  v: number;
  r: string;
  s: string;
  from: string;
  confirmations: number;
}
interface ITransResult {
  result: boolean;
  data: ITrans;
}

export async function retrieve(baseUrl: string) {
  return getData<IRetrieveResult>(`${baseUrl}/retrieve?a=${Math.random()}`);
}

export async function store(baseUrl: string, num: number) {
  return postData<{ num: number }, ITransResult>(`${baseUrl}/store`, { num });
}
