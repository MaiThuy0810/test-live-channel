import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import InputPhoneNumber from "elements/input-phone-number";
import { useForm } from "react-hook-form";
import { phoneOptionalValidator } from "types/validation";
import * as yup from "yup";
import "./style.scss";
import { convertToRem } from "utils/convert-to-rem";
import { useState } from "react";

const LabInputPhone = () => {
  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .test("phoneNumber", "Phone format is incorrect", (value?: string) =>
        phoneOptionalValidator(value)
      ),
  });

  const form = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      phoneNumber: undefined,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [value, setValue] = useState('');

  const formatPhoneNumber = (phoneNumber:any) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return formatted;
  };

  const handleChange = (e:any) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setValue(formattedValue);
  };

  const handleCaretPosition = (e:any) => {
    const input = e.target;
    const { selectionStart } = input;
    
    if (selectionStart < value.length) {
      input.setSelectionRange(selectionStart, selectionStart);
    }
  };

  return (
    <Box className="input_phone_wrapper" padding={convertToRem(20)}>
      {/* <InputPhoneNumber
        register={form.register}
        type="tel"
        name="phoneNumber"
        control={form.control}
        placeholder={"Phone number"}
      /> */}
     <input
     style={{ border:'1px solid black', color:'black', padding:'10px', borderRadius:'4px'}}
      type="text"
      value={value}
      onChange={handleChange}
      onInput={handleCaretPosition}
      maxLength={14}
    />
      <Box className="order-list">
        <h2>1.simple list</h2>
        <ol className='level1'>
          <li>BFE.dev</li>
          <li>JavaScript</li>
          <li>CSS</li>
          <li>System Design</li>
        </ol>
        <h2>2.nested</h2>
        <ol className="level1">
          <li>BFE.dev</li>
          <li>
            JavaScript
            <ol className="level2">
              <li>TypeScript</li>
              <li>Quiz</li>
              <li>
                Framework
                <ol className="level3">
                  <li>React</li>
                  <li>Vue.js</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>CSS</li>
          <li>System Design</li>
        </ol>

      </Box>
    </Box>
  );
};

export default LabInputPhone;
