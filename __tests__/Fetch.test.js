/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import Fetch from "../Fetch";
import TableMock from "../ComponentsToMock/TableMock";

afterEach(cleanup);
jest.setTimeout(2000);
test("loads and displays greeting", async () => {
  // We'll be explicit about what data Axios is to return when `get` is called.
  axiosMock.get.mockResolvedValueOnce({ data: { greeting: "hello there" } });

  // Let's render our Fetch component, passing it the url prop and destructuring
  // the `getByTestId` function so we can find individual elements.
  const url = "/greeting";
  const { getByTestId } = render(<Fetch url={url} />);

  // On first render, we expect the "loading" span to be displayed
  expect(getByTestId("loading")).toHaveTextContent("Loading data...");

  // Because the useAxios call (useEffect) happens after initial render
  // We need to handle the async nature of an AJAX call by waiting for the
  // element to be rendered.
  const resolvedSpan = await waitFor(() => getByTestId("resolved"));

  // Now with the resolvedSpan in hand, we can ensure it has the correct content
  expect(resolvedSpan).toHaveTextContent("hello there");
  // Let's also make sure our Axios mock was called the way we expect
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
});

// const columns = [
//   { field: "manuf", headerName: "Manufacturer", flex: 0.3 },
//   { field: "model", headerName: "Model", flex: 0.3 },
//   { field: "color", headerName: "Color", flex: 0.3 },
//   { field: "yofProd", headerName: "Year of Prod.", flex: 0.3 },
//   { field: "priceDay", headerName: "Price per day", flex: 0.3 },
// ];
// const cars = [
//   { manuf: "opel", model: "sdhgf", color:"asd", yofProd:"12",priceDay:"12"},
// ];
test("loads and displays carlist", async () => {
  const columns = [
    { field: "manuf", headerName: "Manufacturer", flex: 0.3 },
    { field: "model", headerName: "Model", flex: 0.3 },
    { field: "color", headerName: "Color", flex: 0.3 },
    { field: "yofProd", headerName: "Year of Prod.", flex: 0.3 },
    { field: "priceDay", headerName: "Price per day", flex: 0.3 },
  ];

  const cars = [
    {
      id: 1,
      manuf: "opel",
      model: "sdhgf",
      color: "asd",
      yofProd: "12",
      priceDay: "12",
    },
  ];

  axiosMock.get.mockResolvedValueOnce({
    data: { columns: columns, cars: cars },
  });

  // Let's render our Fetch component, passing it the url prop and destructuring
  // the `getByTestId` function so we can find individual elements.
  const url = "/car";
  const { getByTestId, debug } = render(<TableMock url={url} />);

 


  // On first render, we expect the "loading" span to be displayed
  expect(getByTestId("loading")).toHaveTextContent("Loading data...");

  // Because the useAxios call (useEffect) happens after initial render
  // We need to handle the async nature of an AJAX call by waiting for the
  // element to be rendered.
  const resolvedSpan = await waitFor(() => getByTestId("resolved"));
  debug();


  // console.log(resolvedSpan)
  
  // Now with the resolvedSpan in hand, we can ensure it has the correct content
  expect(resolvedSpan).toHaveTextContent("ManufacturerModelColoropelsdhgfasd");
  // Let's also make sure our Axios mock was called the way we expect
  // expect(axiosMock.get).toHaveBeenCalledTimes(1);
  // expect(axiosMock.get).toHaveBeenCalledWith(url);
});
// MuiDataGrid-overlay
