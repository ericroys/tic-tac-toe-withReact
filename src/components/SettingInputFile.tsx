import { useEffect, useRef, useState } from "react";
import { defaultStyleIconText, lblClass } from "../styling/styles";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AiOutlineFileAdd } from "react-icons/ai";
import { CgFileRemove } from "react-icons/cg";
import StyledIconText from "../lib/styledIconText";
import { dbGetFile } from "../controller/fileController";


/**
 * @param {string} label label for input
 * @param {string} id the id (how it's known by react-hook form)
 * @param {UseFormRegister<FieldValues>} register the register function for
 * react-hook form so the component registers properly
 * @param {UseFormRegister<FieldValues>} setValue the setValue function for 
 * react-hook form so the component can save value
 */
type SettingInputFileProps = {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

export const SettingInputFile = (props: SettingInputFileProps) => {

  const { label, id, register, setValue } = props;
  //state for previewing a file
  const [preview, setPreview] = useState<File | undefined>(undefined);
  //because of overide for file input
  let fileInputRef = useRef<HTMLInputElement | null>(null);
  const isPreview = preview && preview !== undefined ? true : false;


  //make the passed in fileData available for rendering
  useEffect(() => {
    if (!id) return;
    const fetchFile = async () => {
      const f = await dbGetFile(id);
      setPreview(f);
      setValue(id, f);
    }
    fetchFile();
  }, [id, setPreview]);

  /**
   * Handle input type file value changes
   * @param {React.ChangeEvent<HTMLInputElement>} e the event for input
   * file type changes
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    let item = null;
    if ((item = files.item(0)) === null) return;
    //set the preview
    setPreview(item);
    //set web-hook form value so it works with submit
    setValue(id, item);
  };

  const bgstyle: React.CSSProperties =
    preview ? {
      backgroundImage: `url(${URL.createObjectURL(preview)})`,
      backgroundSize: '100% 100%'
    }
      : {}

  // Function to trigger the hidden input click
  const clickFileInput = () => {
    fileInputRef.current?.click();
  }

  //function to remove file
  const clickFileRemove = () => {
    setValue(id, undefined);
    setPreview(undefined);
  }

  //deal with multi ref conflict
  const { ref: registerRef, ...rest } = register(id);

  //component 
  return (
    <div className={`flex justify-start`}>
      <div className={`flex justify-between flex-col flex-wrap sm:flex-nowrap sm:flex-row`}>
        <div className={`flex flex-col mr-1 ${preview ? 'h-15 sm:h-20' : ''}`}>
          <label htmlFor={id} className={lblClass}>
            {label}
          </label>
          <input
            {...rest}
            accept={'image/*'}
            ref={(e) => {
              register(id).ref(e);
              fileInputRef.current = e
            }}
            type={'file'}
            id={id}

            onChange={(e) => handleFileChange(e)}
            className={`hidden`}
          />
          <div className={`flex justify-start`}>
            <StyledIconText
              icon={AiOutlineFileAdd}
              text={''}
              {...defaultStyleIconText}
              onClick={clickFileInput}
            />
            {isPreview &&
              <StyledIconText
                icon={CgFileRemove}
                text={''}
                { ...defaultStyleIconText }
                onClick={clickFileRemove}
              />
            }
          </div>
        </div>
        {isPreview &&
          <div className={`h-20 w-20 m-1 rounded-md`} style={bgstyle}>
          </div>
        }
      </div>
    </div>)
}