import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";




@Injectable({
    providedIn: 'root'
})
export class GatewayService {
    
    private config: any;

    constructor(private httpClientService: HttpClient, private configService: ConfigService){}

  
    private get baseUrl(): string {
        return this.configService.serverUrl;
    }

    private getRequestUrl(url:string): string {
        return `${this.baseUrl}${url}`;
    }

    get<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
        return this.httpClientService.get<T>(this.getRequestUrl(url), {headers});
    }

    post<T>(url: string, body: any | null, headers?: HttpHeaders): Observable<T> {
        return this.httpClientService.post<T>(this.getRequestUrl(url), body, {headers});
    }

    put<T>(url: string, body:any | null, headers?: HttpHeaders): Observable<T> {
        return this.httpClientService.put<T>(this.getRequestUrl(url), body, {headers});
    }

    delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
        return this.httpClientService.delete<T>(this.getRequestUrl(url), {headers});
    }

    private getUrl(method: string) {
        return this.config.gatewayUrl + method;
    }
}