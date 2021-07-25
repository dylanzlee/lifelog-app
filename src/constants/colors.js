export default {
  authBGColor: '#1E2D38',
  authButtonColor: '#B3DFFF',
  colorsArr: ['#B3DFFF', '#E6E6FA', '#FFF8DC', '#E3FFB5', 
  '#AFEEEE', '#EBE163', '#C1F0BC', '#F0BCDB', '#FEFBFD', '#BCC1F0', '#F0BCC1'],
  changeLightness: (hsl, lightness) => {
    let sep = hsl.indexOf(",") > -1 ? "," : " ";
    hsl = hsl.substr(4).split(")")[0].split(sep);

    let h = hsl[0],
        s = hsl[1].substr(0,hsl[1].length - 1),
        l = lightness;
    
    return `hsl(${h}, ${s}%, ${l})`;
  },
};
