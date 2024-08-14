import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import SelectItem from "elements/select";
import TextFieldItem from "elements/text-field";
import { useForm } from "react-hook-form";
import { convertToRem } from "utils/convert-to-rem";
import * as yup from "yup";

const Login = () => {
  const regisLectureSchema = yup
    .object({
      inquirer: yup.string().required(),
      content: yup.string().required(),
    })
    .required();
  const { control } = useForm<any>({
    defaultValues: {},
    // mode: "onChange",
    resolver: yupResolver(regisLectureSchema),
  });

  return (
    <Box>
      <SelectItem
        label="Category"
        name="test"
        control={control}
        items={[
          { label: "category 1", value: 1 },
          { label: "category 2", value: 2 },
        ]}
      />
      <Box sx={{ marginTop: convertToRem(10) }}>
        <TextFieldItem name="test" control={control} placeholder="check" />
      </Box>
    </Box>
  );
};

export default Login;
