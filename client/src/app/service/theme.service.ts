import { Injectable } from '@angular/core';
export const defaultTheme = {
  'mainColor':'#eaeaea',
  'secondaryColor':'#fff',
  'borderColor':'#c1c1c1',
  'mainText':'#000',
  'secondaryText':'#4b5156',
  'themeDotBorder':'#24292e',
  'previewBg':'rgb(251,249,243,0.8)',
  'previewShadow':'#f0ead6',
  'btnColor':'black'
};

export const blueTheme = {
  'mainColor':'#15202B',
  'secondaryColor':'#192734',
  'borderColor':'#164D56',
  'mainText':'#fff',
  'secondaryText':'#eeeeee',
  'themeDotBorder':'#fff',
  'previewBg':'rgb(25,39,52,0.8)',
  'previewShadow':'#111921',
  'btnColor':'#17a2b8'
};

export const greenTheme = {
  'mainColor':'#606B56',
  'secondaryColor':'#515a48',
  'borderColor':'#161914',
  'mainText':'#fff',
  'secondaryText':'#eeeeee',
  'themeDotBorder':'#fff',
  'previewBg':'rgb(81,90,72,0.8)',
  'previewShadow':'#2a2f25',
  'btnColor':'#669966'
};

export const purpleTheme = {
  'mainColor':'#46344e',
  'secondaryColor':'#382a3f',
  'borderColor':'#1d1520',
  'mainText':'#fff',
  'secondaryText':'#eeeeee',
  'themeDotBorder':'#fff',
  'previewBg':'rgb(29,21,32,0.8)',
  'previewShadow':'#2b202f',
  'btnColor':'#8534a3'
};




@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  constructor() { }
  setDefault() {
    this.setTheme(defaultTheme);
  }

  setBlue() {
    this.setTheme(blueTheme);
  }

  setGreen() {
    this.setTheme(greenTheme);
  }
  setPurple() {
    this.setTheme(purpleTheme);
  }

  private setTheme(theme:any) {
    Object.keys(theme).forEach(k =>{
      document.documentElement.style.setProperty(`--${k}`, theme[k]);
    }
    );
}
}
