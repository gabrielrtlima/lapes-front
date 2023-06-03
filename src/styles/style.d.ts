import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string | undefined;
      primary: string;
      secondary: string;
      button: string;
      textprimary: string;
      textlink1: string;
      textlink2: string;
      success: string;
      failed: string;
      box: {
        1: string;
        2: string;
        3: string;
      };
    };
  }
}
