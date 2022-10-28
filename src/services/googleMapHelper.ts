import { Client } from '@googlemaps/google-maps-services-js';

export class GoogleMapHelper {
  static client: Client;

  static getClient(): Client {
    if (!this.client) {
      this.client = new Client({});
    }
    return this.client;
  }
}
