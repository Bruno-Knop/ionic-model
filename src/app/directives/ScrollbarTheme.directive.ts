import { Directive, ElementRef, NgModule } from '@angular/core';

@Directive({
  selector: '[appScrollbarTheme]',
})
export class ScrollbarThemeDirective {
  constructor(private el: ElementRef) {
    const stylesheet = `
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        background: #d51900;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #00B6B2;
        border-radius: 20px;
        border: 3px black;
      }
      ::-webkit-scrollbar-thumb:hover {
      }
    `;

    const styleElmt = el.nativeElement.shadowRoot;

    if (styleElmt !== undefined) {
      const selectorStyle = styleElmt.querySelector('style');

      if (selectorStyle) {
        selectorStyle.append(stylesheet);
      } else {
        const barStyle = document.createElement('style');
        barStyle.append(stylesheet);
        styleElmt.appendChild(barStyle);
      }
    }
  }
}

@NgModule({
  declarations: [ScrollbarThemeDirective],
  exports: [ScrollbarThemeDirective],
})
export class ScrollbarThemeModule {}
