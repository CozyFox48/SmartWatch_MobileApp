/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const reg_name: RegExp = /[a-zA-Z\ ]{3,15}/;

/*
 * email validation
 */
export const reg_email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const reg_password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

