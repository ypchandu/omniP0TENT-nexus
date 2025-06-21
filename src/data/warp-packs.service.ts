import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WarpPack {
  id: number;
  name: string;
  icon: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class WarpPacksService {
  private url = 'assets/data/warp-packs.json';

  constructor(private http: HttpClient) {}

  getWarpPacks(): Observable<WarpPack[]> {
    return this.http.get<WarpPack[]>(this.url);
  }
}
