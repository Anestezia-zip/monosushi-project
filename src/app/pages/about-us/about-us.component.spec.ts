import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse all faqs by default', () => {
    const aboutUsComponent = new AboutUsComponent();
    expect(aboutUsComponent.faqs.every(faq => !faq.expanded)).toBeTrue();
  });

  it('should toggle accordion on click', () => {
    const index = 0;
    component.toggleAccordion(index);
    expect(component.openIndex).toEqual(index);
    expect(component.faqs[index].expanded).toBeTrue();
  });

  it('should close accordion on second click', () => {
    const index = 1;
    component.toggleAccordion(index);
    expect(component.openIndex).toEqual(index);
    expect(component.faqs[index].expanded).toBeTrue();

    component.toggleAccordion(index);
    expect(component.openIndex).toEqual(-1);
    expect(component.faqs[index].expanded).toBeFalse();
  });

  it('should add and remove transition class when toggling accordion', () => {
    const index = 2;
    const transitionClass = 'transition';
    const accordionContent = document.createElement('div');
    accordionContent.classList.add('accordion-content', 'active');
    spyOn(document, 'querySelector').and.returnValue(accordionContent);

    component.toggleAccordion(index);
    expect(accordionContent.classList.contains(transitionClass)).toBeFalse();
  });
});
