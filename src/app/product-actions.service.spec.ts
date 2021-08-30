import { TestBed } from '@angular/core/testing';

import { ProductActionsService } from './product-actions.service';

describe('ProductActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductActionsService = TestBed.get(ProductActionsService);
    expect(service).toBeTruthy();
  });
});
