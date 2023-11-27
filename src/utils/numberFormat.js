const numberFormat = (number) => {
  let temp_number = number;

  temp_number = temp_number.replaceAll("-", "");
  temp_number = temp_number.replaceAll(" ", "");

  return temp_number;
};

export default numberFormat;
