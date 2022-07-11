import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000/productList';

  constructor(private http: HttpClient) {}

  postProduto(data: any) {
    return this.http.post<any>(this.API_URL, data);
  }

  getProdutos() {
    return this.http.get<any>(this.API_URL);
  }

  putProduto(data: any, id: number) {
    return this.http.put<any>(`${this.API_URL}/${id}`, data);
  }

  deleteProduto(id: number) {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
