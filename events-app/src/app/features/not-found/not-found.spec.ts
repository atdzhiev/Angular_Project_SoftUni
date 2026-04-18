import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLinkWithHref } from '@angular/router';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent.trim()).toBe('404');
  });

  it('should display Page Not Found subtitle', () => {
    const subtitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(subtitle.textContent.trim()).toBe('Page Not Found');
  });

  it('should have a back button with correct text', () => {
    const btn = fixture.debugElement.query(By.css('.back-btn')).nativeElement;
    expect(btn.textContent.trim()).toBe('Go Back to Events');
  });

  it('should contain routerLink to /events', () => {
    const linkDebugEl = fixture.debugElement.query(By.directive(RouterLinkWithHref));
    const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance.href).toBe('/events');
  });
});
