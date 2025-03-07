import { ArrowLeft, DgptLogo } from "../../assets";
import Breakpoints from "../mediaQuery";

const SidebarHeader = ({ setShowSidebar }: any) => {
  const { sm, md, lg } = Breakpoints();
  return (
    <div
      style={{
        width: sm || md || lg ? "100%" : "368px",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px",
        padding: "16px",
        backgroundColor: "white",
        boxShadow: "0px 4px 4px 0px #2023261A", // Softer bottom shadow
      }}
    >
      <DgptLogo width={44} height={44} />
      {(!sm || !md || !lg) && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowSidebar(false)}
        >
          <ArrowLeft />
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
