import { TestBed } from '@angular/core/testing';
import { EutanasiaService } from './eutanasia.service';

describe('EutanasiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EutanasiaService = TestBed.get(EutanasiaService);
    expect(service).toBeTruthy();
  });
});
