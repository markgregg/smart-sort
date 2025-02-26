export const ignoreCaseCompare = (text1: string, text2: string) =>
  text1.toLocaleLowerCase().includes(text2.toLocaleLowerCase());
