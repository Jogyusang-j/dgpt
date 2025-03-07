import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const ScrollPagination = ({
  data = [],
  fetch = () => null,
  child = <></>,
  hasMore = false,
  submitHandler,
}: IScrollPagination) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollheight, setScrollheight] = useState("auto");
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<any>(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollPosition;
    }
  }, [data, scrollPosition]);

  useEffect(() => {
    if (scrollRef2?.current && scrollRef?.current) {
      if (scrollRef?.current?.offsetHeight > scrollRef2?.current.offsetHeight) {
        setScrollheight("100%");
      } else {
        setScrollheight("auto");
      }
    }
  }, [data]);

  useMemo(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [submitHandler]);

  const onScrollHandler = () => {
    if (scrollableDivRef.current) {
      setScrollPosition(scrollableDivRef.current?.scrollTop);
    }
  };

  return (
    <div ref={scrollRef2} style={{ height: "100%", overflow: "auto" }}>
      <div
        ref={scrollableDivRef}
        id="scrollableDiv"
        style={{
          height: "100%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
        onScroll={onScrollHandler}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={fetch}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          hasMore={hasMore}
          loader={
            <Center>
              <Spinner m="20px" />
            </Center>
          }
          scrollableTarget="scrollableDiv"
        >
          <div style={{ height: "auto" }} ref={scrollRef}>
            {child}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
