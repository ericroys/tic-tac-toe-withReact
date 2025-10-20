const inputclass = `w-full text-sm`;
const inputclassHidden = `invisible -z-50 absolute bottom-0 left-0 `;
const errclass = 'text-redish font-bold text-center';
const btnclass = `flex flex-wrap place-self-center font-bold m-2 mt-3 p-1 rounded bg-white disabled:bg-opacity-95 
shadow-md shadow-blue items-center hover:text-white hover:bg-black cursor-pointer`;
const lblClass = `font-bold`;
const styledIconTextTxt = 'font-extrabold text-black mr-2 drop-shadow-custom-m-gray hover:text-white';
const styledIconTextIco =
'fill-redish mb-1 ml-1 mr-2 translate-y-1 drop-shadow-custom-sm-blue'

export const defaultStyleIconText = {
  iconClass: styledIconTextIco,
  txtClass: styledIconTextTxt,
  size: 25,
};

export {
  inputclass,
  inputclassHidden,
  errclass,
  btnclass,
  lblClass,
  styledIconTextIco,
  styledIconTextTxt,
};
