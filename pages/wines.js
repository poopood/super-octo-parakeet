import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import styles from "../styles/Home.module.scss";
import sortMe from "../src/utils/sortme";
// import {AiOutlineArrowUp, AiOutlineArrowDown}  from 'react-icons/Ai';
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/Fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/Md";

const WinesList = ({ winesList }) => {
  const [wines, setwines] = useState(winesList);
  const [filter, setFilter] = useState("");
  const [input, setInput] = useState("");
  // const inputRef = useRef("")
  const headingRef = useRef();
  // const togRef = useRef();
  const [currentPage, setcurrentPage] = useState(1);
  let wineLength = useMemo(() => wines.length, [wines]);
  /*************************************************/
  /*=== #memoize later    */
  /**************************************************/
  let totalPages = useMemo(() => Math.ceil(wineLength / 3), [wines.length]);

  const columns = [
    { heading: "sku", label: "SKU" },
    { heading: "name", label: "Name" },
    { heading: "price", label: "CA$" },
    { heading: "available", label: "Availability", truthy: true },
  ];

  //   useEffect(() => {
  //     (async () => {
  //       let data = await dataFetcher();
  //       setwines(data);
  //     })();
  //   }, []);
  //   useEffect(() => {
  //     setcurrentPage(1);
  //   }, [input]);

  //   const dataFetcher = async () => {
  //     const res = await fetch("http://localhost:3000/api/wines");
  //     const data = await res.json();
  //     return data;
  //   };

  const searchWines = (e) => {
    // console.log(inputRef.current.value)
    setTimeout(() => {
      setInput(e.target.value);
    }, 50);
  };

  const sorter = (heading, str) => {
    console.log(heading, str);
    console.log(sortMe(wines, heading, str), "yello  ");
    console.log(filter);
    setcurrentPage(1);
  };

  //   console.log(winesList, "y");

  return (
    <div className={styles.container}>
      <h4>Wines </h4>

      {/* <div>{wines.length > 0 && wines.map(({sku, name, price}) => {
                return(
                    <div key={sku}>
                        <p>{name} -  {price}</p>
                    </div>
                )
            })}</div> */}

      <div>
        <form action="">
          <input type="text" onChange={searchWines} />
        </form>

        <table style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              {columns.map(({ heading, label }) => {
                return (
                  <th
                    className="topper"
                    ref={headingRef}
                    // onClick={() => sorter(heading)}
                    key={heading}
                    style={{
                      border: "1px solid black",
                      padding: "10px 60px",
                    }}
                  >
                    <span
                      onClick={() => {
                        sorter(heading, "asc");
                        setFilter(`${heading}-asc`);
                      }}
                      style={{ cursor: "pointer" }}
                      className={`${
                        filter === `${heading}-asc`
                          ? filter
                          : `${heading}-inactive`
                      }`}
                    >
                      <MdArrowDropUp />
                    </span>
                    <span
                      onClick={() => {
                        sorter(heading, "desc");
                        setFilter(`${heading}-desc`);
                      }}
                      style={{ cursor: "pointer" }}
                      className={`${
                        filter === `${heading}-desc`
                          ? filter
                          : `${heading}-inactive`
                      }`}
                    >
                      <MdArrowDropDown />
                    </span>
                    &nbsp;
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {wines.length > 0 &&
              wines
                .filter((wine) => {
                  if (wine === "") {
                    return wine;
                  } else if (
                    wine.name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .includes(input)
                  ) {
                    // console.log(wine.name)

                    return wine;
                  }
                })
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((wine) => {
                  return (
                    <tr key={wine.sku}>
                      {columns.map((column, i) => {
                        if (column.truthy) {
                          return wine[column.heading] ? (
                            <td
                              key={wine[column.heading]}
                              style={{
                                border: "1px solid black",
                                padding: "10px 40px",
                              }}
                            >
                              Available
                            </td>
                          ) : (
                            <td
                              key={wine[column.heading]}
                              style={{
                                border: "1px solid black",
                                padding: "10px 40px",
                              }}
                            >
                              Not Available
                            </td>
                          );
                        }

                        return (
                          <td
                            key={wine[column.heading]}
                            style={{
                              border: "1px solid black",
                              padding: "10px 40px",
                            }}
                          >
                            {wine[column.heading]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button disabled={currentPage === 1} onClick={() => setcurrentPage(1)}>
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setcurrentPage(currentPage > 1 ? currentPage - 1 : 1);
          }}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setcurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setcurrentPage(totalPages)}
        >
          Last
        </button>
      </div>

      <p>
        Pages {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export async function getServerSideProps(context) {
  let url1 = "http://localhost:3000/api/wines";

  const dataFetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  let winesList = await dataFetcher(url1);

  return {
    props: {
      winesList,
    }, // will be passed to the page component as props
  };
}

export default WinesList;
