import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class CardsService {
  constructor(private readonly httpService: HttpService) {}

  apiFetch(): any {
    return this.httpService
      .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .pipe(map((response) => response.data));
  }
}
