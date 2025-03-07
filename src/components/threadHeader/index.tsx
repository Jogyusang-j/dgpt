const ThreadHeader = ({
  showSidebar,
  menuSelected,
  menuType,
  Icon,
  title,
  count,
  threadLength,
}: any) => {
  return (
    <div
      style={{
        display: !showSidebar && menuSelected === menuType ? "none" : "flex",
        alignItems: "center",
        marginTop: "10px",
        width: "100%",
      }}
    >
      <Icon width="30" height="30" />
      <div
        style={{
          marginLeft: "10px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#5C6670",
          display: "block",
          minWidth: "100px",
        }}
      >
        {title} ({threadLength})
      </div>
      <div
        style={{
          border: "1px solid #E4EBF0",
          // width: `calc(100% - ${160}px)`,
          width: "100%",
          height: "1px",
          // marginLeft: "2px",
        }}
      ></div>
    </div>
  );
};

export default ThreadHeader;
