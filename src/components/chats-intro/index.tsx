import { DgptLogo } from "../../assets";
import { useTranslation } from "react-i18next";
import Breakpoints from "../mediaQuery";

export const ChatsIntro = () => {
  const { sm, md, lg } = Breakpoints();
  const { t } = useTranslation("common");

  return (
    <>
      <DgptLogo
        width={sm || md || lg ? 45 : 80}
        height={sm || md || lg ? 45 : 80}
      />
      <div
        style={{
          fontSize: sm || md || lg ? "20px" : "32px",
          fontWeight: "500",
          marginTop: "30px",
          color: "#18191B",
        }}
      >
        {t("chats.help")}
      </div>
      {/* {!sm && (
        <>
          <div
            style={{ color: "#5C6670", fontSize: "14px", marginTop: "10px" }}
          >
            {t("chats.introInitial")}
          </div>
          <div style={{ color: "#5C6670", fontSize: "14px" }}>
            {t("chats.introEnding")}
          </div>
        </>
      )} */}
    </>
  );
};
