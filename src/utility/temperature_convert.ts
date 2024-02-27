export const temperature_converter = (celsius: number) => {
  if (celsius){
    return ((celsius * 9 / 5) + 32).toFixed(1);
  }else{
    return 0
  }
};