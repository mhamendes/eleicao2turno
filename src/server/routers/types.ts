export interface Cand {
  seq: string;
  sqcand: string;
  n: string;
  nm: string;
  cc: string;
  nv: string;
  e: string;
  st: string;
  dvt: string;
  vap: string;
  pvap: string;
}

export interface ResponseTSE {
  cand: Cand[];
  psi: string;
}
