import { TestBed } from '@angular/core/testing';
import { BackendService } from './backend.service';
import { environment } from '@environments/environment.base';

describe('Backend Service', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
    });
    service = TestBed.inject(BackendService);
  });

  it('should generate endpoint', () => {
    const endpointKey = 'AUTH';
    const endpoint = service.generateUrl(endpointKey);
    const baseUrl = environment.apiURL;
    const expected = `${baseUrl}/${environment.apiEndpoints[endpointKey]}`;
    expect(endpoint).toBe(expected);
  });

  it('should generate endpoint with sub paths', () => {
    const endpointKey = 'CATEGORIES';
    const subPaths = ['test1', 'test2'];
    const endpoint = service.generateUrl(endpointKey, {}, subPaths);
    const baseUrl = environment.apiURL;
    const expectedSubPaths = subPaths.join('/');
    const expected = `${baseUrl}/${environment.apiEndpoints[endpointKey]}${expectedSubPaths}`;
    expect(endpoint).toBe(expected);
  });

  it('should generate endpoint with query params', () => {
    const endpointKey = 'CATEGORIES';
    const queryParams = {
      id: 1,
      param: 2,
    };
    const endpoint = service.generateUrl(endpointKey, queryParams);
    const baseUrl = environment.apiURL;
    const expectedParams = Object.entries(queryParams)
      .map(pair => pair.map(encodeURIComponent).join('='))
      .join('&');
    const expected = `${baseUrl}/${environment.apiEndpoints[endpointKey]}?${expectedParams}`;
    expect(endpoint).toBe(expected);
  });
});
