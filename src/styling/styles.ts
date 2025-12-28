const inputclass = `w-full text-sm hover:cursor-pointer 
file:rounded-md file:border-0 file:bg-black file:text-white
file:font-bold hover:file:cursor-pointer border-0 rounded-md`;
const inputclassHidden = `invisible -z-50 absolute bottom-0 left-0 `;
const errclass = 'text-redish font-bold text-center';
const btnclass = `flex flex-wrap place-self-center font-bold m-2 mt-3 p-1 rounded bg-white disabled:bg-opacity-95 
shadow-md shadow-blue items-center hover:text-white hover:bg-black cursor-pointer`;
const lblClass = `font-bold drop-shadow-custom-m-gray`;
const styledIconTextTxt = ` font-bold text-black mr-2 drop-shadow-custom-m-gray 
  `;
const styledIconTextIco =
` text-black mb-1 ml-1 mr-1 translate-y-1 drop-shadow-custom-m-gray 
  hover:cursor-pointer hover:text-blue hover:rounded-md`

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
