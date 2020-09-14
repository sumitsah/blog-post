import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';
import { ShowAuthedDirective } from './show-authed.directive';

describe('ShowAuthedDirective', () => {

  let templateRef: TemplateRef<any>;
  let authService: AuthService;
  let viewContainer: ViewContainerRef;
  it('should create an instance', () => {

    const directive = new ShowAuthedDirective(templateRef,
      authService, viewContainer);
    expect(directive).toBeTruthy();
  });
});
