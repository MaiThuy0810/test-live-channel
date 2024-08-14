import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography, useTheme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import breadcrumbsConfig from "constants/breadcrumbs-config";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbType } from "types/breadcrumb.interface";
import "./style.scss";
import { convertToRem } from "utils/convert-to-rem";

interface HeadFlag {
  flag?: boolean;
}

const Breadcrumb = ({ flag = false }: HeadFlag) => {
  const [listMap, setListMap] = useState<BreadcrumbType[]>([]);
  const theme = useTheme();

  const urlData: BreadcrumbType[] = useMemo(() => {
    const removeFirstSlash = location.pathname.substring(1);
    const pathData = removeFirstSlash.split("/");
    let currentTextData: BreadcrumbType | undefined = breadcrumbsConfig;
    return pathData.map((path) => {
      var breadcrumb = {
        text: currentTextData?.[path]?.text,
        link: currentTextData?.[path]?.link,
      };
      currentTextData = currentTextData?.[path]?.children;
      return { breadcrumb } as BreadcrumbType;
    });
  }, [location.pathname]);

  useEffect(() => {
    const fill = urlData?.filter(
      (item: BreadcrumbType) => item?.breadcrumb?.text !== undefined
    );
    setListMap(fill);
  }, [urlData]);

  return (
    <Breadcrumbs
      className="breadcrumb"
      separator={
        <div className="[&_svg]:stroke [&_svg]:color-[#090A0B] ">
          <ArrowForwardIosIcon />
        </div>
      }
      aria-label="breadcrumb"
    >
      {flag === false ? (
        listMap &&
        listMap.map((el?: BreadcrumbType, index?: number) =>
          index !== listMap.length - 1 ? (
            <Box key={el?.breadcrumb.text}>
              <Link className="text-[24px]" to={`${el?.breadcrumb?.link}`}>
                {!!el?.breadcrumb?.text ? el?.breadcrumb?.text : null}
              </Link>
            </Box>
          ) : (
            <Typography
              sx={{
                color: theme.palette.main.primary,
                fontWeight: "bold",
                fontSize: convertToRem(24),
              }}
              key={index}
            >
              {!!el?.breadcrumb?.text ? el?.breadcrumb?.text : null}
            </Typography>
          )
        )
      ) : (
        <p className="text-[20px] font-bold capitalize text-[#090A0B]">
          {listMap[0]?.breadcrumb?.text?.replace("-", " ")}
        </p>
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
