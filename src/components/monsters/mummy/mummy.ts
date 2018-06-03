import { Component, ElementRef, Renderer2, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { MonsterModel } from '../monster.model';
import { MonsterPartDirective } from '../monster-part.directive';

@Component({
  selector: 'mummy',
  templateUrl: 'mummy.html'
})
export class MummyComponent extends MonsterModel {
  constructor(private el: ElementRef, protected renderer: Renderer2,  componentFactoryResolver: ComponentFactoryResolver, injector: Injector,
  app: ApplicationRef) {
    super('mummy', el.nativeElement, componentFactoryResolver, injector, app);
  }
}
