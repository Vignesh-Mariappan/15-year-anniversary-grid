import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { GRID_MAP, TEXT_GRID_MAP } from "./constants";

export default function App() {
  const [gridMap, setGridMap] = useState({ ...GRID_MAP });
  const gridContainerRef = useRef(null);
  const gridItemRef = useRef([]);
  const wishesTextRef = useRef(null);
  const [displayWishesText, setDisplayWishesText] = useState(false);

  useEffect(() => {
    var delay = 0;
    var count = 0;
    for (const key in TEXT_GRID_MAP) {
      if (count >= 2 || key === "EMPTY") {
        setTimeout(() => {
          setGridMap(GRID_MAP);

          if (key === "EMPTY") {
            setTimeout(() => {
              gridContainerRef.current.style.background = `url(/couple_pic.jpg)`;
              gridContainerRef.current.style.backgroundSize = "cover";
              gridContainerRef.current.style.backgroundPosition = "center";
              gridContainerRef.current.style.backgroundRepeat = "no-repeat";

              // add animation to grid items
              gridItemRef.current.forEach((currentItem) => {
                currentItem.classList.add("animate");
              });
            }, 500);
          }
        }, delay + 200);
      }

      if (Object.hasOwnProperty.call(TEXT_GRID_MAP, key)) {
        const textElem = TEXT_GRID_MAP[key];
        textElem.forEach((currentGridItem, index) => {
          setTimeout(() => {
            setGridMap((oldGridMap) => {
              let gridMapCopy = { ...oldGridMap };
              gridMapCopy[currentGridItem] = true;
              return gridMapCopy;
            });
          }, 200 + delay);
          delay += 200;
        });
      }

      count += 1;
    }
  }, []);

  return (
    <div className="App">
      {displayWishesText ? (
        <div className="wishes-text" ref={wishesTextRef}>
          Hearty <br /> Wishes <br /> from <br /> Shilpa <br /> & <br /> Vicky
        </div>
      ) : (
        <div className="grid-container" ref={gridContainerRef}>
          {Object.keys(gridMap).map((key, index) => {
            return (
              <div
                className="grid-item"
                ref={(el) => (gridItemRef.current[index] = el)}
                onAnimationEnd={() => {
                  //

                  setTimeout(() => {
                    if (gridContainerRef && gridContainerRef.current) {
                      gridContainerRef.current.style.animation =
                        "shrinkGridContainer 2s linear forwards";

                      setTimeout(() => {
                        setDisplayWishesText(true);
                        if (gridContainerRef && gridContainerRef.current)
                          gridContainerRef.current.style.background = "none";

                        if (wishesTextRef && wishesTextRef.current) {
                          wishesTextRef.current.style.animation =
                            "showText 2s linear forwards";
                        }
                      }, 2000);
                    }
                  }, 500);
                }}
                style={{
                  background: gridMap[key]
                    ? "oklch(0.722105 0.159514 342.009)"
                    : "oklch(0.977882 0.00418 56.3756)",
                }}
                key={key}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
}
