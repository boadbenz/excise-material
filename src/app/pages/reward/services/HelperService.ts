import { environment } from 'environments/environment';

export class HelperService {
  protected ApiPrefixUrl = `${environment.api}/XCS60`;
  protected timeline = `${environment.aip_timeline}/XCS60`;
}
