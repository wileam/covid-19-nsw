export const TOGGLES = {
  SHOW_RECOVERED: 'SHOW_RECOVERED',
  SHOW_SHARE: 'SHOW_SHARE',
  SHOW_SPONSOR: 'SHOW_SPONSOR',
  SHOW_AUS: 'SHOW_AUS',
};

export const TOGGLES_DEFAULT = {
  SHOW_RECOVERED: true,
  SHOW_SHARE: false,
  SHOW_SPONSOR: false,
  SHOW_AUS: false,
};

export const getToggle = key => {
  return localStorage.getItem(key) || new URLSearchParams(window.location.search).get(key) || TOGGLES_DEFAULT[key];
};
