import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllFetchedData } from "../redux/actions/ApiFetchAction";

function ApiFetch() {
  const store = useSelector((store) => store.todoDataFromStore);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   function clickToGetData() {
  //     dispatch(getAllFetchedData());
  //   }
  // }, [dispatch]);

  const fetchHandler = () => {
    // console.log("clicked ");
    // console.log(store.ApiData);
    dispatch(getAllFetchedData());
  };

  return (
    <div className="App">
      <h1>this is a ApiFetch page...</h1>
      <button onClick={fetchHandler}>FetchApi</button>

      <table>
        <thead>
          <tr>
            <th>USER__ID</th>
            <th>ID</th>
            <th>TITLE</th>
            <th>COMPLETED__OR__NOT</th>
          </tr>
        </thead>

        <tbody>
          {store.ApiData.map((apidata) => (
            <tr key={apidata.id}>
              <td>{apidata.userId}</td>
              <td>{apidata.id}</td>
              <td>{apidata.title}</td>
              <td>{JSON.stringify(apidata.completed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiFetch;
